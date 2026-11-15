# Project Images / Screenshots

Aap apne 4 projects ki screenshots ya pictures yahan save kar sakte hain:

1. `supply-chain.png` -> Global Supply Chain Analytics & Risk Intelligence
2. `ecommerce-analytics.png` -> E-Commerce Business Intelligence & Performance Analytics
3. `healthcare-analytics.png` -> Healthcare Operations & Patient Flow Analytics
4. `hr-analytics.png` -> IBM HR Analytics: Employee Attrition & Workforce Trends

### How to enable images in code:
`src/data/portfolio.ts` mein har project ke andar `image` field available hai:
```ts
{
  id: 'supply-chain-analytics',
  title: 'Global Supply Chain Analytics & Risk Intelligence',
  ...
  image: '/assets/projects/supply-chain.png', // yahan image ka path daal dein
  ...
}
```
Jab tak aap image nahi daalte, tab tak system automatic cinematic generative artwork / visual motif show karega. Image ka path enter karte hi project card aur modal dono mein aapki screenshot / photo render ho jayegi!
