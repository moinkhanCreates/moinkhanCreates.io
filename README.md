# Moin Khan — Professional Portfolio

> **AI/ML Engineer & Full-Stack MERN Developer | IoT & Embedded Systems Specialist**

A production-grade, FAANG-level portfolio website built with semantic HTML5, modern CSS3, and vanilla JavaScript. Zero dependencies except for icon fonts and Google Fonts CDN.

---

## 🚀 Quick Start

### Option 1: GitHub Pages (Recommended — Free Forever)
1. Create a new repository on GitHub (e.g., `moinkhan-create.github.io`)
2. Upload all files from this folder to the repository
3. Go to **Settings → Pages → Source** and select `main` branch
4. Your portfolio will be live at `https://moinkhan-create.github.io`

### Option 2: Netlify (Drag & Drop)
1. Go to [netlify.com](https://netlify.com) and sign up (free)
2. Drag and drop this entire folder into the deploy area
3. Get a free `.netlify.app` domain or connect your custom domain

### Option 3: Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in this folder
3. Follow prompts — deployed instantly

### Option 4: Local Preview
Simply open `index.html` in any modern browser. No build step required.

---

## 📁 File Structure

```
moin-portfolio/
├── index.html          # Main HTML (semantic, accessible)
├── css/
│   └── style.css       # All styles (mobile-first, 60KB)
├── js/
│   └── main.js         # All functionality (19KB, modular)
├── assets/
│   └── profile.jpg     # ⬅️ PUT YOUR PHOTO HERE
└── README.md           # This file
```

---

## 🎨 Customization Guide

### 1. Add Your Photo
Replace `assets/profile.jpg` with your actual photo (recommended: square, 800x800px minimum).
The HTML already has a fallback with your initials — once the image file exists, uncomment this line in `index.html`:

```html
<!-- <img src="./assets/profile.jpg" alt="Moin Khan" class="profile-photo"> -->
```

And comment out the `.photo-fallback` div below it.

### 2. Update LeetCode Link
Search for `leetcode.com/u/moinkhan-create/` in `index.html` and update with your actual username.

### 3. Add Project Repository Links
Each project card has a GitHub link pointing to your profile. Update individual project links by changing:
```html
<a href="https://github.com/moinkhan-create" ...>
```
to specific repo URLs like:
```html
<a href="https://github.com/moinkhan-create/aeroshield-2.0" ...>
```

### 4. Contact Form
The contact form uses Formspree. Replace `YOUR_FORM_ID` in this line:
```html
<form ... action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```
Get your free Formspree ID at [formspree.io](https://formspree.io)

### 5. Colors & Theme
All colors are CSS custom properties in `css/style.css` at the top:
```css
:root {
  --accent-amber: #f59e0b;    /* Primary accent */
  --accent-emerald: #10b981;  /* Secondary accent */
  --accent-rose: #f43f5e;     /* Tertiary accent */
  /* ... */
}
```

---

## ⚡ Performance Features

- **Canvas particle system** with `requestAnimationFrame` and visibility API pausing
- **Intersection Observer** for scroll-triggered animations (no scroll event spam)
- **Debounced resize handlers** for canvas recalculation
- **Lazy-loaded sections** with `.section-reveal` class
- **Preconnect hints** for Google Fonts and CDNs
- **Semantic HTML5** for SEO and accessibility
- **Print styles** included for resume printing

---

## 📱 Responsive Breakpoints

| Breakpoint | Target |
|------------|--------|
| `> 1200px` | Desktop large |
| `900px` | Tablet / Nav collapse |
| `768px` | Mobile / Timeline stack |
| `600px` | Small mobile / Skills grid |

---

## 🔒 Security Notes

- No external JavaScript dependencies (except Devicon & Fonts via CDN)
- Form uses POST method with proper action URL
- All links use `rel="noopener noreferrer"` for tab security
- Meta tags configured for SEO and social sharing

---

## 🛠 Tech Stack Used in This Portfolio

- **HTML5** — Semantic structure, accessibility attributes
- **CSS3** — Custom properties, Grid, Flexbox, backdrop-filter, animations
- **Vanilla JS** — ES6+ classes, modules, IntersectionObserver
- **Canvas API** — 2D particle system with mouse interaction
- **Devicon** — Technology icon font
- **Google Fonts** — Inter, Space Grotesk, JetBrains Mono

---

## 📄 License

This portfolio template is built exclusively for **Moin Khan**. 
© 2026 — All rights reserved.

---

**Built with precision. Open for AI/ML and MERN Full-Stack internships.**
