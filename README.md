# 💳 Digital Business Card — V2 Template

A **premium, fully customizable** digital business card you can deploy for free on GitHub Pages. No frameworks, no build tools, no subscriptions — just edit one file and go live.

![Themes: White, Midnight, Glass, Neon](https://img.shields.io/badge/themes-4%20built--in-blueviolet)
![Mobile Ready](https://img.shields.io/badge/mobile-responsive-green)
![NFC Optimized](https://img.shields.io/badge/NFC-ready-blue)

---

## ⚡ Quick Start

1. **Fork** this repo (or download the `/v2/` folder).
2. **Edit** `config.js` — change your name, links, theme, and you're done.
3. **Deploy** to GitHub Pages (Settings → Pages → Deploy from `main`).
4. **Share** via NFC tag, QR code, or a simple link.

---

## 🎨 4 Built-in Themes

Change the `theme` value in `config.js` to switch instantly:

| Theme        | Value        | Vibe                                |
|:-------------|:-------------|:------------------------------------|
| Studio White | `"white"`    | Clean, matte, professional          |
| Midnight     | `"midnight"` | Dark premium with purple accents    |
| Glass        | `"glass"`    | Frosted glassmorphism on deep blue  |
| Neon         | `"neon"`     | Cyberpunk green-on-black glow       |

---

## 📝 How to Customize

Open `config.js` in any text editor. Every option is documented inline:

```js
const CARD_CONFIG = {
  name: { first: "YOUR", last: "NAME" },
  role: "Your Title",
  theme: "white",    // "white" | "midnight" | "glass" | "neon"

  links: [
    { type: "linkedin", label: "in/yourname", url: "https://linkedin.com/in/yourname" },
    { type: "phone",    label: "+1 234 567 890", url: "tel:+1234567890" },
    { type: "email",    label: "you@email.com",  url: "mailto:you@email.com" },
    // Add more: github, twitter, instagram, whatsapp, telegram, tiktok, youtube, globe
  ],
};
```

### Supported Link Types
`linkedin` · `github` · `twitter` · `instagram` · `youtube` · `phone` · `email` · `globe` · `whatsapp` · `telegram` · `tiktok` · `custom`

Each type auto-assigns an icon and color. For `custom`, you can provide your own SVG via the `iconSvg` property.

---

## 📱 NFC Setup

1. Get an **NFC tag** (NTAG215 recommended).
2. Install **NFC Tools** on your phone.
3. Write a **URL record** with your GitHub Pages link (e.g. `https://yourusername.github.io/business-card/v2/`).
4. Stick the tag on your phone case or wallet. One tap = instant card share.

---

## 📂 File Structure

```
v2/
├── config.js    ← ✏️ EDIT THIS (your info, links, theme)
├── index.html   ← Template structure (don't edit)
├── style.css    ← Design system (don't edit)
├── script.js    ← Engine (don't edit)
└── README.md    ← You're reading this
```

---

## 🚀 Deployment

### GitHub Pages (Free)
1. Push the repo to GitHub.
2. Go to **Settings → Pages**.
3. Set source to **Deploy from branch** → `main` → `/ (root)`.
4. Your card is live at `https://yourusername.github.io/repo-name/v2/`.

---

## 🛠 Tech Stack

- **HTML5** — Semantic, minimal skeleton
- **CSS3** — Custom properties, 3D transforms, glassmorphism, ambient animations
- **Vanilla JS** — Zero dependencies, config-driven rendering
- **QR Server API** — Dynamic QR code generation
- **Google Fonts** — Outfit + JetBrains Mono

---

## 📄 License

MIT — Use it however you want. Credit appreciated but not required.

---

**Built with ☕ and ambition.**
