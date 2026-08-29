import os
import json
import urllib.request
import logging
from datetime import datetime, timezone, timedelta

logger = logging.getLogger(__name__)

def get_ist_time():
    ist = timezone(timedelta(hours=5, minutes=30))
    return datetime.now(ist).strftime("%d %b %Y, %I:%M:%S %p IST")

def parse_user_agent(ua_string: str):
    ua = ua_string.lower() if ua_string else ""
    
    os_name = "Unknown OS"
    if "windows nt 10.0" in ua: os_name = "Windows 10/11"
    elif "windows" in ua: os_name = "Windows"
    elif "macintosh" in ua or "mac os x" in ua: os_name = "macOS"
    elif "android" in ua: os_name = "Android"
    elif "iphone" in ua: os_name = "iOS (iPhone)"
    elif "ipad" in ua: os_name = "iOS (iPad)"
    elif "linux" in ua: os_name = "Linux"

    browser_name = "Unknown Browser"
    if "edg/" in ua: browser_name = "Microsoft Edge"
    elif "chrome/" in ua and "safari" in ua and "opr" not in ua and "edg" not in ua: browser_name = "Google Chrome"
    elif "safari/" in ua and "chrome" not in ua: browser_name = "Apple Safari"
    elif "firefox/" in ua: browser_name = "Mozilla Firefox"
    elif "opr/" in ua or "opera" in ua: browser_name = "Opera"
    elif "brave" in ua: browser_name = "Brave"

    return os_name, browser_name

def fetch_ip_geolocation(ip: str):
    if not ip or ip in ["127.0.0.1", "localhost", "::1", "unknown"]:
        return {
            "city": "Localhost",
            "region": "Development",
            "country": "Local Environment",
            "country_code": "IN",
            "zip": "",
            "lat": None,
            "lon": None,
            "isp": "Local Loopback",
            "proxy": False,
            "mobile": False
        }

    clean_ip = ip.split(",")[0].strip()

    # Primary Geolocation API: ip-api.com
    try:
        url = f"http://ip-api.com/json/{clean_ip}?fields=status,country,countryCode,regionName,city,zip,lat,lon,isp,org,mobile,proxy"
        req = urllib.request.Request(url, headers={"User-Agent": "PortfolioTracker/3.0"})
        with urllib.request.urlopen(req, timeout=3) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            if data.get("status") == "success":
                return {
                    "city": data.get("city") or "Unknown City",
                    "region": data.get("regionName") or "",
                    "country": data.get("country") or "India",
                    "country_code": data.get("countryCode") or "IN",
                    "zip": data.get("zip") or "",
                    "lat": data.get("lat"),
                    "lon": data.get("lon"),
                    "isp": data.get("isp") or data.get("org") or "Internet Provider",
                    "proxy": data.get("proxy", False),
                    "mobile": data.get("mobile", False)
                }
    except Exception as e:
        logger.warning(f"Primary Geolocation lookup failed for {clean_ip}: {e}")

    # Fallback Geolocation API: ipwho.is
    try:
        url = f"https://ipwho.is/{clean_ip}"
        req = urllib.request.Request(url, headers={"User-Agent": "PortfolioTracker/3.0"})
        with urllib.request.urlopen(req, timeout=3) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            if data.get("success"):
                return {
                    "city": data.get("city") or "Unknown City",
                    "region": data.get("region") or "",
                    "country": data.get("country") or "India",
                    "country_code": data.get("country_code") or "IN",
                    "zip": data.get("postal") or "",
                    "lat": data.get("latitude"),
                    "lon": data.get("longitude"),
                    "isp": data.get("connection", {}).get("isp") or "Internet Provider",
                    "proxy": False,
                    "mobile": False
                }
    except Exception as e:
        logger.warning(f"Fallback Geolocation lookup failed for {clean_ip}: {e}")

    return {
        "city": "Unknown Location",
        "region": "",
        "country": "India",
        "country_code": "IN",
        "zip": "",
        "lat": None,
        "lon": None,
        "isp": "Internet Provider",
        "proxy": False,
        "mobile": False
    }

def send_telegram_notification(text: str) -> bool:
    token = os.getenv("TELEGRAM_BOT_TOKEN", "8992926370:AAGogt3wrygo2YEocPd3rIW6Uxzto0LCdcM")
    chat_id = os.getenv("TELEGRAM_CHAT_ID", "1352837172")

    if not token or not chat_id:
        return False

    url = f"https://api.telegram.org/bot{token}/sendMessage"
    payload = {
        "chat_id": chat_id,
        "text": text,
        "parse_mode": "HTML",
        "disable_web_page_preview": False
    }

    try:
        data = json.dumps(payload).encode("utf-8")
        req = urllib.request.Request(
            url,
            data=data,
            headers={"Content-Type": "application/json"}
        )
        with urllib.request.urlopen(req, timeout=6) as response:
            res_data = json.loads(response.read().decode("utf-8"))
            return res_data.get("ok", False)
    except Exception as e:
        logger.error(f"❌ Telegram API Error: {e}")
        return False

def format_visitor_alert(visit_data: dict, ip: str, ua_string: str) -> str:
    geo = fetch_ip_geolocation(ip)
    os_name, browser_name = parse_user_agent(ua_string)
    clean_ip = ip.split(",")[0].strip()
    current_time = get_ist_time()
    site_tag = visit_data.get("siteName", "Data Analyst Portfolio").upper()

    country_flag = f" ({geo['country_code']})" if geo['country_code'] else ""
    net_type = "📱 Mobile Cellular (4G/5G)" if geo.get("mobile") else "💻 Broadband / WiFi"
    vpn_status = "🛡️ Yes (Proxy/VPN)" if geo.get("proxy") else "No"
    
    loc_parts = [p for p in [geo['city'], geo['region'], geo['zip']] if p]
    location_str = ", ".join(loc_parts) if loc_parts else "Location Detected"

    map_line = ""
    lat = geo.get("lat")
    lon = geo.get("lon")
    if lat and lon:
        map_line = f'📍 <a href="https://maps.google.com/?q={lat},{lon}"><b>Open Live Location on Google Maps</b></a>'

    msg = f"""📊 <b>[{site_tag}]</b>
👁️ <b>Live Visitor Alert - Website Opened!</b>

🔗 <b>Page Visited:</b> <code>{visit_data.get('path', '/')}</code>
🚦 <b>Traffic Source:</b> <code>{visit_data.get('referrer', 'Direct / URL Entered')}</code>

🌍 <b>Location & Network:</b>
• <b>City/Area:</b> {location_str}
• <b>Country:</b> {geo['country']}{country_flag}
• <b>ISP:</b> {geo['isp']}
• <b>Network Type:</b> {net_type}
• <b>Proxy/VPN:</b> {vpn_status}
{map_line}

💻 <b>Visitor Device:</b>
• <b>Device:</b> {visit_data.get('deviceType', 'Desktop')} ({os_name} • {browser_name})
• <b>Screen:</b> <code>{visit_data.get('screen', 'Unknown')}</code>
• <b>Timezone:</b> <code>{visit_data.get('timezone', 'Asia/Kolkata')}</code>
• <b>IP Address:</b> <code>{clean_ip}</code>

⏰ <b>Time:</b> <i>{current_time}</i>"""
    return msg

def format_inquiry_alert(inquiry_data: dict, ip: str, ua_string: str) -> str:
    geo = fetch_ip_geolocation(ip)
    os_name, browser_name = parse_user_agent(ua_string)
    clean_ip = ip.split(",")[0].strip()
    current_time = get_ist_time()

    loc_parts = [p for p in [geo['city'], geo['region'], geo['country']] if p]
    location_str = ", ".join(loc_parts)

    map_line = ""
    lat = geo.get("lat")
    lon = geo.get("lon")
    if lat and lon:
        map_line = f'📍 <a href="https://maps.google.com/?q={lat},{lon}"><b>View Sender Location on Google Maps</b></a>'

    msg = f"""📊 <b>[DATA ANALYST PORTFOLIO]</b>
📩 <b>New Recruiter / Client Inquiry Received!</b>

👤 <b>Name:</b> {inquiry_data.get('name')}
📧 <b>Email:</b> <code>{inquiry_data.get('email')}</code>
🎯 <b>Subject:</b> {inquiry_data.get('subject', 'Portfolio Inquiry')}
💬 <b>Message:</b>
<i>{inquiry_data.get('message')}</i>

🌍 <b>Sender Details:</b>
• <b>Location:</b> {location_str}
• <b>ISP:</b> {geo['isp']}
• <b>Device:</b> {os_name} • {browser_name}
• <b>IP Address:</b> <code>{clean_ip}</code>
{map_line}

⏰ <b>Time:</b> <i>{current_time}</i>"""
    return msg
