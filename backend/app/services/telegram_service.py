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
            "city": "Localhost / Internal",
            "region": "Local Network",
            "country": "Development Environment",
            "country_code": "DEV",
            "isp": "Local Loopback",
            "proxy": False
        }

    clean_ip = ip.split(",")[0].strip()

    try:
        url = f"http://ip-api.com/json/{clean_ip}?fields=status,country,countryCode,regionName,city,zip,isp,org,mobile,proxy"
        req = urllib.request.Request(url, headers={"User-Agent": "PortfolioAnalyticsBot/2.0"})
        with urllib.request.urlopen(req, timeout=3) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            if data.get("status") == "success":
                return {
                    "city": data.get("city", "Unknown City"),
                    "region": data.get("regionName", "Unknown Region"),
                    "country": data.get("country", "Unknown Country"),
                    "country_code": data.get("countryCode", ""),
                    "isp": data.get("isp", data.get("org", "Unknown ISP")),
                    "proxy": data.get("proxy", False),
                    "mobile": data.get("mobile", False)
                }
    except Exception as e:
        logger.warning(f"Geolocation lookup failed for {clean_ip}: {e}")

    return {
        "city": "Location Unavailable",
        "region": "",
        "country": "Unknown",
        "country_code": "",
        "isp": "Unknown ISP",
        "proxy": False
    }

def send_telegram_notification(text: str) -> bool:
    token = os.getenv("TELEGRAM_BOT_TOKEN", "")
    chat_id = os.getenv("TELEGRAM_CHAT_ID", "")

    if not token or not chat_id:
        return False

    url = f"https://api.telegram.org/bot{token}/sendMessage"
    payload = {
        "chat_id": chat_id,
        "text": text,
        "parse_mode": "Markdown",
        "disable_web_page_preview": True
    }

    try:
        data = json.dumps(payload).encode("utf-8")
        req = urllib.request.Request(
            url,
            data=data,
            headers={"Content-Type": "application/json"}
        )
        with urllib.request.urlopen(req, timeout=5) as response:
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
    vpn_status = "🛡️ Yes (Proxy/VPN)" if geo.get("proxy") else "No"

    msg = (
        f"📊 *[{site_tag}]*\n"
        f"👁️ *New Visitor Landed on Website!*\n\n"
        f"📍 *Page Visited:* `{visit_data.get('path', '/')}`\n"
        f"🔗 *Traffic Source:* `{visit_data.get('referrer', 'Direct / Bookmark')}`\n\n"
        f"🌍 *Geolocation Details:*\n"
        f"• *City & Region:* {geo['city']}, {geo['region']}\n"
        f"• *Country:* {geo['country']}{country_flag}\n"
        f"• *ISP / Network:* {geo['isp']}\n"
        f"• *VPN / Proxy:* {vpn_status}\n\n"
        f"💻 *Device & System Info:*\n"
        f"• *Device Type:* {visit_data.get('deviceType', 'Desktop')}\n"
        f"• *OS & Browser:* {os_name} • {browser_name}\n"
        f"• *Screen Resolution:* `{visit_data.get('screen', 'Unknown')}`\n"
        f"• *Browser Locale:* `{visit_data.get('language', 'en')}` ({visit_data.get('timezone', 'IST')})\n"
        f"• *IP Address:* `{clean_ip}`\n\n"
        f"⏰ *Time:* _{current_time}_"
    )
    return msg

def format_inquiry_alert(inquiry_data: dict, ip: str, ua_string: str) -> str:
    geo = fetch_ip_geolocation(ip)
    os_name, browser_name = parse_user_agent(ua_string)
    clean_ip = ip.split(",")[0].strip()
    current_time = get_ist_time()

    msg = (
        f"📊 *[DATA ANALYST PORTFOLIO]*\n"
        f"📩 *New Recruiter / Client Inquiry Received!*\n\n"
        f"👤 *Name:* {inquiry_data.get('name')}\n"
        f"📧 *Email:* `{inquiry_data.get('email')}`\n"
        f"🎯 *Subject:* {inquiry_data.get('subject', 'Portfolio Inquiry')}\n"
        f"💬 *Message:*\n_{inquiry_data.get('message')}_\n\n"
        f"🌍 *Sender Location & System:*\n"
        f"• *Location:* {geo['city']}, {geo['region']}, {geo['country']}\n"
        f"• *ISP:* {geo['isp']}\n"
        f"• *Device:* {os_name} • {browser_name}\n"
        f"• *IP:* `{clean_ip}`\n\n"
        f"⏰ *Time:* _{current_time}_"
    )
    return msg
