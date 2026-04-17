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

var CARD_CONFIG = {

  // ── Personal Info ──────────────────────────────────────────
  name: {
    first: "JOHN",
    last:  "DOE",
  },

  role:    "Software Developer",
  tagline: "Building beautiful and robust digital solutions.",

  // Profile photo (optional). Use a URL or leave empty "" to hide.
  photo: "",

  // Monogram shown on the back of the card (e.g. "J.D." for John Doe)
  monogram: "J.D.",


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
      label: "in/johndoe",
      url:   "https://www.linkedin.com/in/johndoe/",
    },
    {
      type:  "github",
      label: "github.com/johndoe",
      url:   "https://github.com/johndoe",
    },
    {
      type:  "email",
      label: "hello@johndoe.com",
      url:   "mailto:hello@johndoe.com",
    },
    // Add more links here, e.g.:
    // { type: "phone",     label: "+1 234 567 890",      url: "tel:+1234567890"        },
    // { type: "globe",     label: "johndoe.com",         url: "https://johndoe.com"    },
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
