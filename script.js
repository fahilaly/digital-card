/**
 * ═══════════════════════════════════════════════════════════
 *  DIGITAL BUSINESS CARD — V2 ENGINE
 *  Reads config.js and dynamically builds the entire card.
 * ═══════════════════════════════════════════════════════════
 */

(function () {
  "use strict";

  // Allow overwriting config via URL parameter "data"
  // e.g. ?data=eyJuYW1lIjp7ImZpcnN0IjoiSm9obiJ9fQ==
  const urlParams = new URLSearchParams(window.location.search);
  const dataParam = urlParams.get("data");
  if (dataParam) {
    try {
      // Decode base64 to string, then parse JSON
      const decodedStr = atob(dataParam);
      const urlConfig = JSON.parse(decodedStr);
      // Merge urlConfig deeply or shallowly with window.CARD_CONFIG
      window.CARD_CONFIG = Object.assign(window.CARD_CONFIG || {}, urlConfig);
    } catch (e) {
      console.error("Invalid data URL parameter. Reverting to default config.");
    }
  }

  const C = typeof CARD_CONFIG !== 'undefined' ? CARD_CONFIG : null;
  if (!C) {
    console.error("config.js not loaded — make sure it's included before script.js");
    return;
  }

  /* ── Icon SVGs ────────────────────────────────────────────
     Inline SVGs so we don't rely on external CDNs.         */
  const ICONS = {
    linkedin: `<svg viewBox="0 0 24 24" class="filled"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>`,
    github: `<svg viewBox="0 0 24 24" class="filled"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>`,
    twitter: `<svg viewBox="0 0 24 24"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>`,
    instagram: `<svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>`,
    youtube: `<svg viewBox="0 0 24 24" class="filled"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`,
    phone: `<svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
    email: `<svg viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="22,7 12,13 2,7"/></svg>`,
    globe: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
    whatsapp: `<svg viewBox="0 0 24 24" class="filled"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`,
    telegram: `<svg viewBox="0 0 24 24" class="filled"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>`,
    tiktok: `<svg viewBox="0 0 24 24" class="filled"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>`,
    fileText: `<svg viewBox="0 0 24 24"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>`,
    download: `<svg viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`,
    custom: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>`,
  };

  /* ───────────────────────────────────────────────────────── */
  /*  Apply Theme                                              */
  /* ───────────────────────────────────────────────────────── */
  function applyTheme() {
    const theme = (C.theme || "white").toLowerCase();
    document.documentElement.setAttribute("data-theme", theme);

    // Apply custom accent if provided
    if (C.accentColor) {
      document.documentElement.style.setProperty("--accent", C.accentColor);
    }

    // Page title
    document.title = `${C.name.first} ${C.name.last} — Digital Card`;
  }

  /* ───────────────────────────────────────────────────────── */
  /*  Build Front Face                                         */
  /* ───────────────────────────────────────────────────────── */
  function buildFront() {
    // Photo
    const photoArea = document.getElementById("photo-area");
    if (C.photo) {
      const img = document.createElement("img");
      img.src = C.photo;
      img.alt = `${C.name.first} ${C.name.last}`;
      img.className = "profile-photo";
      photoArea.appendChild(img);
    }

    // Name
    document.getElementById("card-name").innerHTML =
      `${C.name.first}<br>${C.name.last}`;

    // Role
    document.getElementById("card-role").textContent = C.role || "";

    // Tagline
    const tagEl = document.getElementById("card-tagline");
    if (C.tagline) {
      tagEl.textContent = C.tagline;
    } else {
      tagEl.style.display = "none";
    }

    // Contact Links
    const container = document.getElementById("contact-links");
    (C.links || []).forEach((link) => {
      const a = document.createElement("a");
      a.href = link.url;
      a.className = "contact-link";

      // Don't flip the card when clicking a link
      a.addEventListener("click", (e) => e.stopPropagation());

      // Open external links in new tab (but not tel: / mailto:)
      if (!link.url.startsWith("tel:") && !link.url.startsWith("mailto:")) {
        a.target = "_blank";
        a.rel = "noopener noreferrer";
      }

      const type = (link.type || "custom").toLowerCase();
      const iconSvg = link.iconSvg || ICONS[type] || ICONS.custom;
      const colorClass = `link-color-${type}`;

      a.innerHTML = `
        <div class="link-icon ${colorClass}">${iconSvg}</div>
        <span class="link-label">${link.label}</span>
      `;

      container.appendChild(a);
    });
  }

  /* ───────────────────────────────────────────────────────── */
  /*  Build Back Face                                          */
  /* ───────────────────────────────────────────────────────── */
  function buildBack() {
    // Monogram
    const mono = document.getElementById("card-monogram");
    if (C.monogram) {
      mono.textContent = C.monogram;
    } else {
      mono.style.display = "none";
    }

    // Titles
    document.getElementById("back-title").textContent = C.backTitle || "SCAN FOR DIGITAL CARD";
    document.getElementById("back-subtitle").textContent = C.backSubtitle || "";

    // QR Code
    const theme = (C.theme || "white").toLowerCase();
    const qrFg = getComputedStyle(document.documentElement).getPropertyValue("--qr-fg").trim() || "111111";
    const qrBg = getComputedStyle(document.documentElement).getPropertyValue("--qr-bg").trim() || "ffffff";
    // Sanitize hex for URL
    const fg = qrFg.replace("#", "");
    const bg = qrBg.replace("#", "");

    const qrImg = document.getElementById("qr-code");
    if (C.qrUrl) {
      qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(C.qrUrl)}&bgcolor=${bg}&color=${fg}&margin=0`;
    } else {
      qrImg.parentElement.style.display = "none";
    }

    // Action Buttons
    const btnContainer = document.getElementById("action-buttons");
    if (C.cvUrl) {
      const cvBtn = document.createElement("a");
      cvBtn.href = C.cvUrl;
      cvBtn.className = "action-btn";
      cvBtn.addEventListener("click", (e) => e.stopPropagation());
      cvBtn.innerHTML = `${ICONS.fileText} VIEW CV`;
      btnContainer.appendChild(cvBtn);
    }
    if (C.vcfUrl) {
      const vcfBtn = document.createElement("a");
      vcfBtn.href = C.vcfUrl;
      vcfBtn.className = "action-btn";
      vcfBtn.download = true;
      vcfBtn.addEventListener("click", (e) => e.stopPropagation());
      vcfBtn.innerHTML = `${ICONS.download} SAVE CONTACT`;
      btnContainer.appendChild(vcfBtn);
    }
  }

  /* ───────────────────────────────────────────────────────── */
  /*  Flip Hint                                                */
  /* ───────────────────────────────────────────────────────── */
  function buildFlipHint() {
    const hint = document.getElementById("flip-hint");
    if (C.showFlipHint === false) {
      hint.style.display = "none";
    } else {
      hint.textContent = C.flipHintText || "Tap anywhere to flip";
    }
  }

  /* ───────────────────────────────────────────────────────── */
  /*  Card Flip Logic                                          */
  /* ───────────────────────────────────────────────────────── */
  function initFlip() {
    const card = document.getElementById("card");
    card.addEventListener("click", () => {
      card.classList.toggle("is-flipped");
    });
  }

  /* ───────────────────────────────────────────────────────── */
  /*  3D Tilt on Hover (Desktop)                               */
  /* ───────────────────────────────────────────────────────── */
  function initTilt() {
    if (!C.tiltOnHover) return;
    if (window.matchMedia("(hover: none)").matches) return; // no hover on touch

    const card = document.getElementById("card");
    const scene = card.parentElement;

    scene.addEventListener("mousemove", (e) => {
      if (card.classList.contains("is-flipped")) return;
      const rect = scene.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const rotateY = (x - 0.5) * 16;
      const rotateX = (0.5 - y) * 12;
      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    scene.addEventListener("mouseleave", () => {
      if (!card.classList.contains("is-flipped")) {
        card.style.transform = "rotateX(0) rotateY(0)";
      }
    });
  }

  /* ───────────────────────────────────────────────────────── */
  /*  Toast                                                    */
  /* ───────────────────────────────────────────────────────── */
  window.showToast = function (msg) {
    const toast = document.getElementById("toast");
    toast.textContent = msg;
    toast.classList.add("visible");
    setTimeout(() => toast.classList.remove("visible"), 2500);
  };

  /* ───────────────────────────────────────────────────────── */
  /*  Init                                                     */
  /* ───────────────────────────────────────────────────────── */
  document.addEventListener("DOMContentLoaded", () => {
    applyTheme();
    buildFront();
    buildBack();
    buildFlipHint();
    initFlip();
    initTilt();
  });
})();
