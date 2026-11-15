# Project Images & Personal Video Guide

## 1. Projects ki Multiple Images / Screenshots

Aap har project ke liye multiple dashboard screenshots / sheets add kar sakte hain (e.g. Page 1: Overview, Page 2: Risk Matrix, Page 3: Drilldown, Page 4: SQL queries).

Apni screenshots ko is folder mein copy karein:
📂 `public/assets/projects/`

### File Naming Convention:
- **Project 1 (Supply Chain):**
  - `supply-chain-1.png`
  - `supply-chain-2.png`
  - `supply-chain-3.png`
  - `supply-chain-4.png`
- **Project 2 (E-Commerce):**
  - `ecommerce-1.png`
  - `ecommerce-2.png`
  - `ecommerce-3.png`
- **Project 3 (Healthcare):**
  - `healthcare-1.png`
  - `healthcare-2.png`
  - `healthcare-3.png`
- **Project 4 (IBM HR Analytics):**
  - `hr-analytics-1.png`
  - `hr-analytics-2.png`
  - `hr-analytics-3.png`

### Activation in `src/data/portfolio.ts`:
`portfolio.ts` mein har project ke andar `images` array already configure kar diya gaya hai:
```ts
images: [
  '/assets/projects/supply-chain-1.png',
  '/assets/projects/supply-chain-2.png',
  '/assets/projects/supply-chain-3.png',
],
```
Website par project open karte hi interactive thumbnail carousel, full-resolution preview, aur fullscreen lightbox inspect mode enable ho jayega!

---

## 2. Personal Video Intro (Play Intro feature)

Aapki talking video intro Play Intro sequence ke dauran live picture-in-picture presenter camera ke tor par chalegi:

1. Apni video file ko is path par save karein:
   📂 `public/assets/intro.mp4`
2. Features enabled:
   - **Picture-in-Picture Host Cam:** Screen ke bottom-right corner par aapki live video play hogi jab intro slides chal rahi hongi.
   - **Tap to Unmute Voice:** Auto-play muted hota hai, button par tap karte hi sound on ho jayegi taake visitor aapko bolte sun sake.
   - **Expand Theater Mode:** `⤢` button daba kar video ko full theater mode mein expand kiya ja sakta hai.
   - **Synchronized Play/Pause:** Spacebar ya pause button dabane par video bhi rukegi aur resume hogi.
