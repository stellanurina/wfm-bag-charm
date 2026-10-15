# WFM Bag Charm Workshop — Design & Copy Handoff

## Brand
- **Organization:** Women of Faith Ministries (WFM)
- **Colors:** Pink `#F9A8C9`, Teal `#5CC5BA`, Soft Pink BG `#FDF2F8`, Dark text `#2D3748`
- **Font:** Nunito (Google Fonts) — warm, rounded, approachable
- **Style:** Soft, friendly, community feel. Rounded corners, gentle shadows. Not corporate.
- **Mood:** Joyful crafting, personal meaning, welcoming church community

---

## Event Details
| Field | Value |
|---|---|
| Date | Friday, 20 November 2026 |
| Time | 10:00 AM – 1:00 PM |
| Venue | SPH, UG Seminar Room (Sekolah Pelita Harapan) |
| Audience | Moms of SPH |
| Host | Women of Faith Ministries |
| Cost | Rp 150.000 (includes 2 bag charms) |
| Cause | 100% of net proceeds support WFM |

---

## Pricing
Fixed: **Rp 150.000** for 2 bag charms. Additional charms can be made at the workshop for Rp 50.000 each, paid on the day.

---

## Bank Details
| Field | Value |
|---|---|
| Bank | BCA |
| Account number | 237-153-1329 |
| Account holder | IRNEZ HIDAYAT |

---

## 9 Paracord Colors
1. Navy
2. Light Blue
3. Light Pink
4. Light Green
5. Purple
6. Black
7. Yellow
8. Beige
9. Red

---

## Page Flow

### Screen 1 — Main Registration Page (`index.html`)

**HERO**
- WFM logo top-left
- Hero badge: "A WFM Activity · For Moms of SPH"
- Product photo (paracord charm collection)
- Headline: **"Charmingly Yours: A WFM Workshop"**
- Subline: "Spend a creative Friday morning weaving personalized paracord bag charms. 100% of net proceeds directly support Women of Faith Ministries."
- CTA: **"Claim My Spot"** (scrolls to form)

**EVENT STRIP** (4-column info row)
- 📅 Friday, 20 November 2026
- ⏰ 10:00 AM – 1:00 PM
- 📍 UG Floor, SPH
- 💰 Rp 150.000 (2 charms included)

**WHAT YOU'LL MAKE** (3 cards)
- 🪢 **Handcrafted** — You weave your own charm from start to finish. We teach you every step.
- ✦ **Personalized** — Add a name, pick a charm (heart, star, sports ball), choose from 9 paracord colors.
- 🎁 **Take It Home** — Yours to keep, gift, or share with someone who needs a small reminder of care.

**COLOR GALLERY** (9 swatches in order): Navy, Light Blue, Light Pink, Light Green, Purple, Black, Yellow, Beige, Red

**HOW IT WORKS** (4 steps)
- 1 **Register** — Sign up below and tell us how many charms you'd like to make.
- 2 **Learn** — We walk you through the weave step by step. All materials provided.
- 3 **Take It Home** — Leave with finished charms ready to attach, gift, or share.
- 4 **Support the Ministry** — 100% of net proceeds go directly to WFM. Your morning makes a difference.

**REGISTRATION FORM** (minimal — just to capture interest)
- Your Name *
- Inviting a friend? * (Yes link / No solo)
- Fineprint: "Each registration includes 2 bag charms to make and take home. Need more? Just make extra at the workshop — Rp 50.000 per additional charm, paid on the day."
- Submit: "Claim My Spot"

> **Note:** No email, no WhatsApp, no charm count. Just name and the invite question. Payment amount and contact details are on the success screen. Names will be cross-referenced with the WhatsApp screenshot at the event to confirm payment.

**FAQ** (3 questions, accordion)
- Do I need to bring anything? — Just yourself. All materials are provided.
- Can I bring my child? — This is a moms-only workshop. Your children will be in class as usual.
- Can I make more than 2 charms? — Yes. Rp 50.000 per extra charm.

**FOOTER** — WFM logo + tagline + WhatsApp contact

---

### Screen 2 — Success Screen (`success.html`)

- Green tick icon
- Headline: **"You're in!"**
- Subline: "We'll send a WhatsApp reminder the day before the event. See you at SPH!"
- Event card: Friday 20 Nov 2026, 10:00 AM – 1:00 PM, UG Floor SPH
- **PAYMENT SECTION** (highlighted teal card):
  - "Transfer to Complete Your Registration"
  - "100% of net proceeds go directly to Women of Faith Ministries."
  - Total to transfer: auto-calculated from charm count
  - Bank: BCA
  - Account number: 237-153-1329 (with copy button)
  - Account holder: IRNEZ HIDAYAT
  - "Already paid? You're all set — see you on 20 November."
- Add to Calendar button
- Share section: "Invite a friend?" + copyable personal link

---

### Screen 3 — Invite Landing Page (`invite.html?name=`)
**Note:** If no `name` param, redirect to `index.html`

- Invite banner: "[Name] invited you to this event"
- Hero with same Charmingly Yours headline and updated subline: "[Name] thought you'd love this — a creative Friday morning of personalized paracord bag charm making, hosted by Women of Faith Ministries. 100% of net proceeds support WFM."
- Same event strip, what you'll make, color gallery, how it works, form, FAQ
- Hidden field `referred_by` populated with inviter's name

---

### Screen 4 — Invite Success Screen (`invite-success.html`)

- Green tick, "You're registered!"
- Subline: "We'll see you on 20 November. A WhatsApp reminder will land the day before."
- Event card
- Same payment section as success screen
- Add to Calendar button
- Share section: "Now it's your turn to invite. Share the craft love — pass it on to another SPH mom who'd enjoy a morning of making."

---

## Google Sheets Data Fields

| Column | Source |
|---|---|
| Timestamp | Auto (Google Apps Script) |
| Name | Form field |
| WhatsApp | Form field |
| Email | Form field (optional) |
| Charm Count | Form field (1–4) |
| Charm Price | Calculated from count (100k/150k/200k/250k) |
| Inviting a Friend | Yes / No |
| Referred By | Hidden field (invite flow only) |
| Invite Share URL | `yoursite.com/invite.html?name=[name]` |

---

## WhatsApp Poster (1080×1080 px)

- **Top:** WFM logo + "WOMEN OF FAITH MINISTRY ACTIVITY" badge
- **Hero image:** Colorful paracord collection grid
- **Headline:** "Charmingly Yours: A WFM Workshop"
- **Subline:** "100% Non-Profit."
- **Event block:**
  - 📅 Friday 20 Nov 2026
  - ⏰ 10:00 AM – 1:00 PM
  - 💛 Rp 150.000 (2 charms included), all residual proceeds directed to the Ministry
  - 📍 UG Floor, SPH
- **Body copy:** "🌸 Charmingly Yours: A WFM Bag Charm Workshop 🌸 — Calling all SPH Moms! Take a well-deserved morning break to unwind, connect, and craft customized paracord bag charms..."
- **Note line:** "Bring your child's name (or a word that means something to you)"
- **CTA:** "Register now → [URL]"
- **Bottom:** WFM logo + tagline + contact

---

## Files in Repo
```
wfm-bag-charm/
├── index.html              # Main registration page
├── invite.html             # Invite landing page
├── success.html            # Main registration success
├── invite-success.html     # Invitee registration success
├── css/
│   └── style.css           # All styles
├── js/
│   └── main.js             # Form handling, Google Sheets POST, share URL logic, payment calc
├── README.md               # Deployment guide
└── SPEC.md                 # This file
```

---

## Deploy Stack
- **Hosting:** Hostinger (static HTML hosting)
- **Source:** GitHub repo — push to `main` branch, Hostinger pulls on deploy
- **Forms:** Google Apps Script Web App — receives POST, writes to Google Sheet
- **No backend required** — pure HTML/CSS/JS
