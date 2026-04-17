# Digital Business Card Template

A fully customizable digital business card designed for deployment on GitHub Pages. Built with HTML, CSS, and standard JavaScript with no build steps or dependencies.

## Features

- Config-driven design: Edit one file to customize your card
- 4 Built-in Themes: Studio White, Midnight, Glass, and Neon
- Mobile and NFC ready

---

## Quick Start

1. Fork this repository or download the source files.
2. Edit `config.js` to add your personal information, links, and preferred theme.
3. Deploy the repository to GitHub Pages (Settings > Pages > Deploy from main branch).
4. Share via URL, QR code, or NFC tag.

---

## Themes

Modify the `theme` property in `config.js` to change the appearance:

| Theme        | Value        | Description                             |
|:-------------|:-------------|:----------------------------------------|
| Studio White | `"white"`    | Clean, minimalistic                     |
| Midnight     | `"midnight"` | Dark theme with high contrast           |
| Glass        | `"glass"`    | Frosted glassmorphism effect            |
| Neon         | `"neon"`     | Dark theme with green accents           |

---

## Configuration

Open `config.js` and modify the `CARD_CONFIG` object. Options are documented inline.

```js
var CARD_CONFIG = {
  name: { first: "First", last: "Last" },
  role: "Your Title",
  theme: "white",    // "white" | "midnight" | "glass" | "neon"

  links: [
    { type: "linkedin", label: "in/yourname", url: "https://linkedin.com/in/yourname" },
    { type: "email",    label: "you@email.com",  url: "mailto:you@email.com" },
  ],
};
```

### Supported Link Types
`linkedin` | `github` | `twitter` | `instagram` | `youtube` | `phone` | `email` | `globe` | `whatsapp` | `telegram` | `tiktok` | `custom`

Each type assigns a specific icon. For `custom`, provide an SVG string using the `iconSvg` property.

---

## NFC Setup

1. Obtain an NFC tag (NTAG215 recommended).
2. Install an NFC writing application.
3. Write a URL record targeting your deployed GitHub Pages link.

---

## File Structure

- `config.js`: Configuration file containing user data.
- `index.html`: Base template layout.
- `style.css`: Design system and themes.
- `script.js`: Core logic for rendering and interactions.
- `README.md`: Documentation.

---

## Deployment

1. Commit and push the files to a GitHub repository.
2. Navigate to Settings > Pages.
3. Under Source, select 'Deploy from a branch'.
4. Select the `main` branch and `/ (root)` folder.
5. Save to receive your live URL.

---

## Tech Stack

- HTML5
- CSS3 (Custom properties, 3D transforms)
- Vanilla JavaScript
- QR Server API
- Google Fonts (Outfit, JetBrains Mono)

---

## License

MIT License.
