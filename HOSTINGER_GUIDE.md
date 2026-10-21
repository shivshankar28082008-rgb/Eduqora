# Hostinger Deployment Guide for Codevaible

Agar Hostinger par **Blank Page** aa raha tha, toh uske mukhya kaaran aur unka solution neeche diya gaya hai:

### 1. Problem Ka Reason (Why Blank Page Occurred)
1. **Asset Base URL Path mismatch**: Vite default me `/assets/...` generate karta hai. Jab aap Hostinger ke kisi sub-folder, `dist` folder, ya preview domain me upload karte hain, browser files ko root domain par dhoondhta hai aur 404 error aane se blank page ho jata hai. Ab ise **`./` (relative path)** kar diya gaya hai.
2. **Missing `.htaccess`**: Hostinger Apache/LiteSpeed web server use karta hai. Bina `.htaccess` ke JavaScript ES modules ka MIME type error aata hai aur page refresh ya routing par 404 blank screen ho jata hai. Ab production `.htaccess` file generate ho chuki hai.
3. **Dynamic Import Waterfall**: App component ko synchronous load kar diya gaya hai taaki hosting par kisi bhi chunk loading failure se page na atke.

---

### 2. Hostinger Par Upload Kaise Karein (Step-by-Step)

#### Step 1: Project Build Run Karein
```bash
npm run build
```
Ye command `dist/` folder banayegi jisme ye zaroori files hongi:
- `index.html`
- `assets/` (CSS aur JS bundles)
- `.htaccess` (Hostinger ke liye Apache/LiteSpeed routing aur MIME types)
- `404.html` (Fallback routing)

#### Step 2: Hostinger File Manager Kholein
1. Apne **Hostinger hPanel** me login karein.
2. **Websites** -> Apni website select karein -> **File Manager** par click karein.
3. `public_html` folder open karein.

#### Step 3: Files Upload Karein
- **Important**: Aapko `dist` folder ke **andar ki sabhi files aur folders** ko `public_html/` me upload karna hai (pura `dist` folder upload karke chhodne par URL `domain.com/dist/` ban jata hai).
- Files to upload directly inside `public_html/`:
  - `index.html`
  - `assets/` (folder aur uske andar ke sabhi `.js` aur `.css` files)
  - `.htaccess` (Agar File Manager me hidden files hide hain, toh settings me "Show Hidden Files" enable karke check karein ki `.htaccess` upload hui hai)
  - `404.html`

#### Step 4: Browser Cache Clear Karein
- Upload hone ke baad `Ctrl + Shift + R` (ya Mac par `Cmd + Shift + R`) se hard refresh karein.
- Website bina kisi blank screen ke perfectly load hogi!
