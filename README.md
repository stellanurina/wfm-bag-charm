# WFM Bag Charm Workshop — Website

A registration page for Women of Faith Ministries' paracord bag charm workshop for Moms of SPH.

**Event:** Friday, 20 November 2026, 10:00 AM – 1:00 PM, SPH, UG Seminar Room
**Price:** Rp 150.000 (2 bag charms to make and take home; extras Rp 50.000 each on the day)
**Cause:** 100% of net proceeds support WFM

---

## Tech Stack

| Layer | Choice |
|---|---|
| Pages | Pure HTML / CSS / JS — no framework |
| Hosting | Hostinger (static hosting) |
| Source control | GitHub |
| Form data | Google Sheets via Google Apps Script Web App |
| No backend | Everything runs in the browser |

---

## Setup

### 1. Set up Google Sheets

1. Create a new Google Sheet named **"WFM Bag Charm Registrations"**
2. Add a header row in Sheet1, Row 1:

   ```
   Timestamp | Name | WhatsApp | Email | Charm Count | Charm Price | Inviting a Friend | Referred By | Invite Share URL
   ```

3. Go to **Extensions → Apps Script**
4. Replace the default `Code.gs` with this:

   ```javascript
   function doPost(e) {
     var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Sheet1');
     var data = JSON.parse(e.postData.contents);

     sheet.appendRow([
       new Date(),
       data.name,
       data.whatsapp,
       data.email || '',
       data.charmCount,
       data.charmPrice,
       data.invitingFriend,
       data.referredBy || '',
       data.inviteShareUrl || ''
     ]);

     return ContentService
       .createTextOutput(JSON.stringify({ status: 'ok' }))
       .setMimeType(ContentService.MimeType.JSON);
   }
   ```

5. Click **Deploy → New deployment**
   - Type: **Web app**
   - Who has access: **Anyone** (so the form can POST without auth)
   - Execute as: **Me**
   - Click Deploy
6. Copy the **Web App URL** — it looks like:
   `https://script.google.com/macros/s/XXXXXXXXXXXX/exec`

7. Open `js/main.js` and replace the `SCRIPT_URL` constant at the top with your URL:

   ```js
   const SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_ID_HERE/exec';
   ```

---

### 2. Replace placeholder content

The bank details (BCA, 237-153-1329, IRNEZ HIDAYAT) and event details are already in the files. Update them directly in the HTML if they change.

WhatsApp contacts in the footer are already set:
- Lodi: +62 817 901 4050
- Adrianne: +62 811 928 778

---

### 3. Add images to `images/` folder

Required:
- `wfm-logo.png` — WFM logo, transparent background
- `charm-collection.jpg` — full paracord charm color collection grid
- `favicon.ico` — small WFM favicon

If images are missing, the site will still render — the broken images are hidden via `onerror` handlers.

---

### 4. Create GitHub Repo

1. Go to [github.com](https://github.com) → New Repository
2. Name it `wfm-bag-charm`
3. Push this folder to GitHub:

   ```bash
   cd wfm-bag-charm
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/[your-username]/wfm-bag-charm.git
   git push -u origin main
   ```

---

### 5. Connect GitHub to Hostinger

1. Log in to **Hostinger → hPanel**
2. Go to **Websites → Autoinstaller**
3. Find **GitHub** and click Install
4. Authorize Hostinger to access your GitHub account
5. Select the `wfm-bag-charm` repository and the `main` branch
6. Hostinger will pull the files and host them automatically

**Note:** Hostinger deploys from the `main` branch on every push. After any change:
```bash
git add .
git commit -m "Your change description"
git push
```
...Hostinger will automatically rebuild within a few minutes.

---

## Custom Domain (optional)

If you have a domain pointing to Hostinger:
- In Hostinger → Website Settings → Domain → point your subdomain (e.g. `wfm.yoursite.com`) to this folder

---

## Files Overview

| File | Purpose |
|---|---|
| `index.html` | Main registration page (landing) |
| `invite.html` | Invite landing page (with `?name=` param) |
| `success.html` | Post-registration success + payment details + share |
| `invite-success.html` | Post-invitee registration success + payment + share |
| `css/style.css` | All styles |
| `js/main.js` | Form POST, URL param handling, share URL generation, copy-to-clipboard, payment total calc, .ics generation |

---

## Updating Copy

All visible text lives directly in the HTML files — no CMS, no build step. Just edit and push:

```bash
git add .
git commit -m "Update event location"
git push
```

---

## Price Tiers (built into `js/main.js`)

```js
const PRICE_TIERS = {
  '1': 100000,
  '2': 150000,
  '3': 200000,
  '4': 250000
};
```

The success screen reads `?charm=N` from the URL and shows the matching amount. Update the values here if pricing changes.
