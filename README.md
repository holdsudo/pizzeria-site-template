# Pizzeria Site Template

One-page ordering site for local pizzerias: real menu, real photos, working cart +
checkout with email order delivery, a three.js hero poster stage, and a deals ticker.
Static files only — deploys free on GitHub Pages. Ships configured as **G's Famous
Pizza (Guallpa's), Iselin NJ** as a working reference; every client-specific value
lives in **`site.config.js`** — that is the only file you edit per client.

> **Working with Claude?** Point it at [CLAUDE.md](CLAUDE.md) — a complete agent
> runbook covering what is Guallpa reference content vs. template, the photo/menu
> research techniques, the honesty rules, theming, and the full deploy pipeline.

## New client, step by step

### 1. Research (30–60 min)
- **Photos** — the client's Google Business Profile (Google Maps) almost always has
  large real photos: storefront, kitchen, food. Grab the `lh3.googleusercontent.com`
  URLs and append `=w1200-h1200-k-no` for full size. Instagram/Facebook fill the
  gaps (posters, promos, logo).
- **Menu** — if they're on Grubhub/Slice, the full menu with prices is public.
  Grubhub renders from its API; loading the restaurant page with the network tab
  open exposes `restaurant_gateway/feed/...` JSON with every category and item.
- **Voice** — pull the headline from their world: window decals, sign slogans, a
  standing deal. Real words beat invented taglines.

### 2. Fill `site.config.js`
Every key is documented inline. The blocks:
- `meta`, `brand` — name, sub-line, logo files
- `theme` — optional CSS color overrides; sample hexes from their sign/posters
- `hero` — eyebrow, two-line headline, copy, fact chips, featured poster + caption
- `ticker` — their real deal lines (window decals are perfect)
- `contact`, `links` — address, phone, Grubhub/social/review URLs
- `order` — **the email that receives orders** (FormSubmit relay), live hostnames,
  tax rate, topping upcharge, order-number prefix
- `headings`, `gallery`, `visit` — section copy and shop photos
- `menu` — categories + items. `photo` should only be set when the image genuinely
  shows that item; leave `''` for the branded mascot tile.

### 3. Replace `assets/`
Keep the filenames referenced in your config. Required at minimum:
`logo-roundel.jpg` (square logo — header, footer, favicon, menu tiles),
`logo-lockup.jpg` (wide logo — hero), one poster/promo image (hero stage),
storefront + interior shots (gallery, visit band), and food close-ups.
`vendor-three.module.min.js` stays as-is.

### 4. Update `index.html` head
The `<head>` metas are static: title, description, `og:*` tags, theme-color.
Swap Google Fonts here too if the client's brand calls for different faces.

### 5. Verify
```bash
npm install && npx playwright install chromium
npm test          # 3 smoke tests, all driven by site.config.js
npm start         # serve locally at http://127.0.0.1:4173
```

### 6. Deploy (GitHub Pages)
```bash
gh repo create <owner>/<client-slug> --public --template <owner>/pizzeria-site-template
git push
gh api repos/<owner>/<client-slug>/pages -X POST -f "source[branch]=master" -f "source[path]=/"
```
- Add the Pages hostname to `order.liveHosts` in the config (orders only send from
  live hosts; everywhere else confirms locally so demos never stall).
- **Activate order email**: the first order sent from the live site triggers a
  one-time FormSubmit activation email to the configured inbox — click it, then
  place a test order end-to-end.
- Custom domain: set the client's domain in Pages settings, point their DNS
  A records at GitHub Pages, wait for the certificate, enable Enforce HTTPS.

## Architecture
- `site.config.js` — all client data (also consumed by the tests via `require`)
- `index.html` — structure; `data-slot="path.to.key"` attributes mark config-driven text/links/images
- `script.js` — slot filling, menu render, cart, checkout, order submission
- `hero3d.js` — three.js poster stage (pointer tilt + embers; static fallback for reduced-motion/no-WebGL)
- `styles.css` — visual system on CSS variables (overridable per client via `theme`)
- `tests/site.spec.js` — Playwright smoke tests, fully config-driven
