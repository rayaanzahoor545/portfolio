# Project Images & Video Intro Guide for Rayaan Ali

Aapke portfolio mein **Multiple Project Images (Galleries)** aur **Video Intro (Play Intro Presenter)** full configure ho chuka hai.

---

## 1. Projects ki Multiple Images / Screenshots Kaise Upload Karein?

Apne 4 projects ke screenshots is folder (`public/assets/projects/`) mein save karein:

### Project 1: Global Supply Chain Analytics & Risk Intelligence
- `supply-chain-1.png` (Main Executive Dashboard)
- `supply-chain-2.png` (Supplier Performance & Risk Matrix)
- `supply-chain-3.png` (Inventory Stock-Out & SKU Breakdown)
- `supply-chain-4.png` (Replenishment Lead-Time Analysis)

### Project 2: E-Commerce Business Intelligence & Performance Analytics
- `ecommerce-1.png` (Olist Executive Sales & Profitability Dashboard)
- `ecommerce-2.png` (Customer Retention & Order Funnel Analysis)
- `ecommerce-3.png` (Seller & Delivery Logistics Performance)
- `ecommerce-4.png` (Python EDA & Dimensional Modeling)

### Project 3: Healthcare Operations & Patient Flow Analytics
- `healthcare-1.png` (Patient Throughput & Triage Dashboard)
- `healthcare-2.png` (Departmental Bed Occupancy & Capacity)
- `healthcare-3.png` (Clinical Wait Times & Emergency Bottlenecks)
- `healthcare-4.png` (Tableau / Power BI Operational Scorecard)

### Project 4: IBM HR Analytics & Employee Attrition Analysis
- `hr-analytics-1.png` (Workforce Overview & Attrition Scorecard)
- `hr-analytics-2.png` (Overtime, Compensation & Resignation Matrix)
- `hr-analytics-3.png` (Departmental Turnover & Flight-Risk Cohorts)
- `hr-analytics-4.png` (MySQL Relational Query & Tableau Dashboard)

> **Note:** Yeh paths already `src/data/portfolio.ts` mein pre-wire hain! Aap jaise hi images is folder mein daalenge, "View Project" modal ke andar interactive multi-image carousel / thumbnail gallery aur fullscreen zoom automatically activate ho jayenge. Jab tak files add nahi hoten, ek sleek cinematic blueprint showcase display hota rahega.

---

## 2. Intro Video (Play Intro) Kaise Add Karein?

Aap jo bolte hue apni intro video lagana chahte hain:
1. Apni video file ka format **MP4** ya **WebM** rakhein.
2. File ka name `intro-video.mp4` rakhein.
3. Use `public/assets/` folder mein paste kar dein:
   `public/assets/intro-video.mp4`

### Features jo ab "Play Intro" mein chalte hain:
- **Synced Video Presenter:** Jab viewer "▶ Play Intro" click karega, to cinematic highlight slides ke sath side / corner par aapki video play hogi.
- **Mute / Unmute Toggle:** Browser restrictions ke mutabiq video pehle mute chalti hai aur viewer ek click se audio unmute (`🔊`) kar sakta hai.
- **Spotlight Mode:** Viewer `⛶` button daba kar aapki video ko center stage (badi screen) par la sakta hai.
- **Minimize Mode:** Viewer chahe to video ko tuck-in kar sakta hai.
- **Fallback Ready:** Jab tak aap `intro-video.mp4` nahi rakhte, tab tak ek professional live presenter placeholder card with voice-waveform show hota hai. Jaise hi file drop hogi, aapki video live ho jayegi!
