# Render Deployment Guide (Hinglish)

Is guide ka use karke aap apne portfolio ke Frontend aur Backend ko **Render** par deploy kar sakte hain. Kyunki ye ek multi-folder (monorepo) project hai, hum Render par do separate services banayenge.

---

## 📋 Table of Contents
1. **GitHub Status Check**
2. **Step 1: Backend Web Service Deploy Karna**
3. **Step 2: Frontend Static Site Deploy Karna**
4. **Step 3: CORS Allowed Origin Connect Karna**
5. **⚠️ SQLite Database Limitation (Important)**

---

## 🔗 GitHub Status Check
Render direct aapke GitHub account se project pull karta hai.
1. Make sure ki aapne saare latest changes GitHub repository (`Gaurav-Portfolio`) par push kar diye hain:
   ```bash
   git status
   git add .
   git commit -m "pre-deployment config"
   git push origin main
   ```

---

## 🗄️ Step 1: Backend Deploy Karna (Web Service)
Backend ek Node.js server hai jo contact form submissions ko handle karta hai.

1. **Render Dashboard** par jayein aur **New +** -> **Web Service** par click karein.
2. Apne GitHub account ko connect karein aur apni repository `Gaurav-Portfolio` select karein.
3. Configure karein:
   - **Name:** `gaurav-portfolio-backend`
   - **Region:** Default select rehne dein (nearest value).
   - **Branch:** `main`
   - **Root Directory:** `backend` ⚠️ *(Bahut important! Isse Render sirf backend folder ko scan karega)*.
   - **Language/Runtime:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** `Free` (or $7 Starter if you want persistent disk).

4. **Environment Variables** section me click karein aur niche diye gaye details add karein:
   - `NODE_ENV` = `production`
   - `EMAIL_USER` = *Aapki Gmail id (jaise gaurav94855@gmail.com)*
   - `EMAIL_PASS` = *Aapka Gmail App Password (16-character code)*
   - `RECEIVER_EMAIL` = *Aapki Gmail id (jahan aapko emails receive karni hain)*
   - `ADMIN_TOKEN` = *Koi bhi secret key jo aap set karna chahein (messages track karne ke liye)*
   - `FRONTEND_ORIGIN` = `https://<YOUR-FRONTEND-APP-NAME>.onrender.com` *(Abhi isse blank chhod sakte hain ya temporary local host URL de sakte hain, Frontend deploy hone ke baad hum ise real frontend URL se update karenge)*.

5. **Deploy Web Service** par click karein. Deploy hone me 2-3 minutes lagenge. 
   - Deploy hone ke baad, top-left corner par aapko backend ka live URL dikhega, jaise: `https://gaurav-portfolio-backend.onrender.com`. Is URL ko copy kar lijiye.

---

## 🌐 Step 2: Frontend Deploy Karna (Static Site)
Frontend ek React + Vite application hai jise fast loading ke liye Static Site ki tarah deploy karenge.

1. Render Dashboard par jayein aur **New +** -> **Static Site** par click karein.
2. Apni repository `Gaurav-Portfolio` select karein.
3. Configure karein:
   - **Name:** `gaurav-portfolio` (Ye aapki website ka naam hoga, URL banega: `https://gaurav-portfolio.onrender.com`)
   - **Branch:** `main`
   - **Root Directory:** `frontend` ⚠️ *(Bahut important! Isse Render sirf frontend folder scan karega)*.
   - **Build Command:** `npm run build`
   - **Publish Directory:** `dist`

4. **Environment Variables** me click karein aur add karein:
   - `VITE_API_BASE_URL` = *Aapka step 1 se copy kiya hua Render backend URL (e.g. `https://gaurav-portfolio-backend.onrender.com`)*.

5. **Deploy Static Site** par click karein. Kuch hi seconds me deployment ho jayega!
   - Complete hone ke baad, aapko aapki frontend website ka live URL dikhega (e.g. `https://gaurav-portfolio.onrender.com`). Is URL ko copy kar lijiye.

---

## 🔄 Step 3: CORS Connect Karna (Important Setup)
Security (CORS) ki wajah se backend wahi requests accept karega jo frontend URL se aayengi.

1. Apne **Render Backend Dashboard** (`gaurav-portfolio-backend`) par jayein.
2. Side menu me **Settings** (ya Environment Variables) par click karein.
3. `FRONTEND_ORIGIN` variable ko edit karke wahan apne **real frontend URL** ko save kar dein:
   - Example: `FRONTEND_ORIGIN` = `https://gaurav-portfolio.onrender.com`
4. Settings save karte hi backend auto-restart ho jayega.

---

## ⚠️ SQLite Database Limitation (Free Tier)
Render ke **Free tier** par:
- Backend server temporary containers par chalta hai jo inactive hone par band ho jate hain ya update hone par restart hote hain.
- Jab server restart hota hai, tab uski local SQLite database file (`portfolio.sqlite`) reset ho jayegi aur purane contact inquiries delete ho jayenge.
- **Solution:** Kyunki humne Gmail notification config kiya hua hai, jab bhi koi message send karega toh backend direct aapke email par notification bhej dega. Data safe rahega! 
- Agar aap chahte hain ki database kabhi delete na ho, toh aap Render par free **PostgreSQL Database** connect kar sakte hain ya fir paid tier par Persistent Disk add kar sakte hain.

👍 **Congratulations!** Aapka full stack portfolio ready and live ho jayega!
