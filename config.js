/**
 * ╔══════════════════════════════════════════════════════════╗
 * ║          DIGITAL BUSINESS CARD — CONFIG FILE             ║
 * ║   Edit ONLY this file to fully customize your card.      ║
 * ╚══════════════════════════════════════════════════════════╝
 *
 * HOW TO USE:
 * 1. Edit the values below (name, role, links, theme, etc.)
 * 2. Save the file.
 * 3. Open index.html in your browser to preview.
 * 4. Push to GitHub Pages to go live!
 */

const CARD_CONFIG = {

  // ── Personal Info ──────────────────────────────────────────
  name: {
    first: "FAISAL",
    last:  "ALHELALI",
  },

  role:    "Mechatronics Engineering Student",
  tagline: "Building the bridge between hardware and software.",

  // Profile photo (optional). Use a URL or leave empty "" to hide.
  photo: "",

  // Monogram shown on the back of the card (e.g. "F.A." for Faisal Alhelali)
  monogram: "F.A.",


  // ── Contact Links ──────────────────────────────────────────
  // Add, remove or reorder as many links as you want.
  // Supported icon types (case-insensitive):
  //   linkedin | github | twitter | instagram | youtube |
  //   phone | email | globe | whatsapp | telegram | tiktok | custom
  //
  // For "custom", set iconSvg to any <svg> string you like.
  links: [
    {
      type:  "linkedin",
      label: "in/falhilaly",
      url:   "https://www.linkedin.com/in/falhilaly/",
    },
    {
      type:  "phone",
      label: "+966 533 301 766",
      url:   "tel:+966533301766",
    },
    {
      type:  "email",
      label: "Fahilaly@gmail.com",
      url:   "mailto:Fahilaly@gmail.com",
    },
    // Add more links here, e.g.:
    // { type: "github",    label: "github.com/fahilaly", url: "https://github.com/fahilaly" },
    // { type: "globe",     label: "myportfolio.com",     url: "https://myportfolio.com"      },
  ],


  // ── Back of Card ───────────────────────────────────────────
  // URL encoded into the QR code (usually your live card or portfolio URL)
  qrUrl: "https://fahilaly.github.io/business-card/",

  // Set to "" to hide the CV button
  cvUrl: "./CV.pdf",

  // Contact file for "Save Contact". Set to "" to hide.
  vcfUrl: "./faisal_alhelali.vcf",

  // Text shown above the QR code on the back
  backTitle:    "SCAN FOR DIGITAL CARD",
  backSubtitle: "Contact & CV",


  // ── Theme ──────────────────────────────────────────────────
  // Choose one:  "white" | "midnight" | "glass" | "neon"
  theme: "white",

  // Optional: override the accent color for any theme (hex or CSS color).
  // Leave empty "" to use the theme default.
  accentColor: "",


  // ── Card Behavior ──────────────────────────────────────────
  // Show a 3D tilt effect when hovering on desktop?
  tiltOnHover: true,

  // Show flip hint at the bottom?
  showFlipHint: true,

  // Flip hint text
  flipHintText: "Tap anywhere to flip",

};
