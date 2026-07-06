# CLAUDE.md — How to build a client site from this template

You (Claude) are looking at a **pizzeria website template**. It ships fully configured
as a real, working reference client: **G's Famous Pizza (Guallpa's), 1522 Oak Tree Road,
Iselin NJ** — a site that is actually deployed at https://joe-miz.com/gs-famous-pizza/.
Your job when given a new pizzeria is to replace everything Guallpa-specific with the
new client's real data and ship a live site. The human will typically say something like
*"build this for XYZ Pizzeria, here are their socials"* — this file tells you exactly
what to do with that.

**Prime directive: nothing invented.** Every photo, menu item, price, deal, review
count, and slogan on the finished site must come from the client's real public
footprint. If you can't verify something, leave it out. A wrong photo is worse than
no photo. This is a sales demo shown to the business owner — they will instantly
notice a menu item they don't sell or a pie that isn't theirs.

---

## 1. What is template vs. what is Guallpa's

### Template infrastructure — KEEP, do not rewrite
| File | Role | Notes |
|---|---|---|
| `index.html` | Page structure | Config-driven via `data-slot` attributes. Only the `<head>` metas need editing per client (section 6). |
| `styles.css` | Full visual system | Colors are CSS variables overridable from config `theme`. Don't fork this file per client unless the brand truly demands new layout. |
| `script.js` | Slot-filling, menu render, cart, checkout, order submission | Reads everything from `SITE` (the config global). No client data inside. Don't edit except for bug fixes. |
| `hero3d.js` | three.js hero poster stage | Reads the poster path from config. See section 7 for the one thing you may need to tune (poster aspect ratio + ember colors). |
| `assets/vendor-three.module.min.js` | Self-hosted three.js r165 | Never replace or CDN-ify. |
| `tests/site.spec.js` | Playwright smoke tests | Fully config-driven — they `require('../site.config.js')` and derive all assertions. They pass for ANY correctly-filled config. Don't hardcode client strings in them. |
| `package.json`, `playwright.config.js`, `.gitignore` | Tooling | Keep. |

### Guallpa-specific — REPLACE for every new client
| Thing | Where | Replace with |
|---|---|---|
| `site.config.js` — every value | the whole file | New client's data (section 5) |
| All `assets/*.jpg` | `assets/` | New client's real photos (section 3–4) |
| `<head>` metas: title, description, og:*, theme-color | `index.html` | New client values (section 6) |
| Google Fonts (Anton + Barlow) | `index.html` head + `styles.css` `--display/--body/--label` | KEEP unless the client's brand clearly calls for different type (section 8) |
| Ember/glow gold hexes | `hero3d.js` | Only if the client theme isn't warm red/gold (section 7) |

Pizza-specific copy baked into the template (fine for any pizzeria, edit if the client
isn't a pizzeria): cart empty state "Your cart is ready for its first pie", checkout
heading "Schedule the handoff.", nav labels, button labels.

---

## 2. The research phase — where every Guallpa asset came from

Do this BEFORE touching any file. Budget most of your effort here; the build is fast
once you have real material. Use Playwright (installed by `npm install` +
`npx playwright install chromium`) for anything a plain `curl` can't reach.

### 2a. Photos — Google Business Profile is the goldmine
Guallpa's storefront, kitchen, interior, and all six real food photos came from their
**Google Maps listing**, not their socials. Method that works:

1. Playwright → `https://www.google.com/maps/search/<name>+<address>` (domcontentloaded,
   wait ~6s, dismiss consent button if present).
2. Collect every `lh3.googleusercontent.com` URL from `<img>` tags AND regex the raw
   HTML for `https://lh[0-9]\.googleusercontent\.com/[A-Za-z0-9_\-/=.]+`.
3. Click into the photos section / arrow through the lightbox to surface more URLs.
4. For each URL, strip everything from `=` onward and append `=w1200-h1200-k-no` —
   that returns the large original. Download with a browser User-Agent header.
5. **Look at every photo yourself** (Read tool) before using it. Classify: storefront /
   kitchen / interior / real food / menu-board / junk.

### 2b. Photos — socials (Facebook + Instagram)
Public FB pages and IG profiles are scrapeable with Playwright + a desktop Chrome UA:
scroll the page, collect `img` `src` AND the **largest `srcset` candidate** (IG hides
1080px versions in srcset), download anything >60KB. This is where you get the logo,
cover banner, and promo posters.

**Warning learned from Guallpa's:** many pizzerias' social posters contain
**AI-generated food art**. Do NOT crop food out of promo posters — you'll reintroduce
the fake-AI look the design exists to avoid. Poster graphics are fine to show *as
posters* (hero stage, gallery "culture wall" tile); they are never menu-card food.

### 2c. Photos — what's blocked (don't waste time)
Yelp (bot wall, even mobile), Tripadvisor, Foursquare all block headless scraping.
Restaurantji renders photos via JS with nothing in static HTML. Bing/DDG image search
rarely surfaces usable CDN URLs. If GBP + socials aren't enough, tell the human what's
missing and ask them to get photos from the owner — do not fake it.

### 2d. Menu — Grubhub's internal API
If the client is on Grubhub (check with a web search `"<name>" <town> grubhub`):
1. Playwright → the restaurant page, with a `page.on('response')` listener capturing
   any `api-gtm.grubhub.com` response over ~3KB.
2. The full menu lives in `restaurant_gateway/feed/<restaurantId>/<categoryId>` JSON:
   `object.data.content[]` where `type === 'MENU_ITEM'`, each entity has `item_name`,
   `item_description`, `item_price.pickup.value` (cents).
3. Category id→name mapping is in the `restaurant_gateway/info/nonvolatile/<id>`
   response. Scroll the page (and click category nav entries) to trigger every feed.
4. The JSON-LD block on the page has the Grubhub **rating and review count** — use it
   for the hero fact chips only if it's decent (Guallpa's: "4.2★ on Grubhub").
Slice (`slicelife.com`) pages are server-rendered and easier if they use Slice instead.
No online menu at all → ask the human for a menu photo and transcribe it.

### 2e. Voice — the client's own words
Guallpa's headline "You've tried the rest. Now try the best." is painted on their
actual window. Their ticker lines are their real window decals. Their standing deal
("Buy 2 pizzas w/ toppings get a plain free") appears on their storefront and posters.
Hunt for this material in storefront photos and posts — real slogans beat anything
you'd write. Zoom into storefront photos and read the window vinyl.

### 2f. Bonus pitch material
While researching, note: dead domains on their signage (Guallpa's window advertises
a lapsed website — a killer pitch line), award badges they promote, "cash only"
mentions, years-in-business claims. Put usable ones in `hero.facts` / ticker; report
pitch angles to the human.

---

## 3. Asset manifest — exact files the site references

Keep these **exact filenames** (they're wired in `site.config.js`; you can change
paths in config, but consistency keeps repos uniform):

| File | Used by | What it must be |
|---|---|---|
| `logo-roundel.jpg` | header, footer, favicon, menu tiles | Square/circular logo mark. Crops to a circle everywhere — check nothing critical sits in the corners. |
| `logo-lockup.jpg` | hero top-left | Wide horizontal logo. Crop margins tight (Guallpa's came from their Grubhub listing image; also check FB cover). |
| `promo-worldcup.jpg` → rename per client | hero 3D stage | Their best current promo poster, portrait orientation. See section 7 for aspect. |
| `storefront-day.jpg` | gallery (tall tile) | Straight-on storefront photo. |
| `storefront-wide.jpg` | visit band background | Wide storefront/exterior; text overlays the left third, so the subject should read on the right. |
| `kitchen.jpg`, `interior-guests.jpg` | gallery | Real interior shots. |
| `poster-round32.jpg` → rename | gallery | One culture/promo poster tile. |
| `food-*.jpg` | menu cards | Real food close-ups, cropped to the single item (section 4). |

Crop with `sips` on macOS: `sips -c <height> <width> --cropOffset <y> <x> in.jpg --out out.jpg`.
Always **view every crop** after making it.

## 4. The menu-photo honesty rule (the human cares about this a lot)

A menu card gets a `photo` **only if the photo genuinely shows that exact item**.
Guallpa's has 40 items and only 7 have photos (plain 10"/16" ← real cheese pie shot;
tomato ← their tomato-basil pan; hot pepper & onion ← the jalapeño-onion pan; onion &
pepper; Hawaiian ← ham+pineapple pan; black olive ← customer photo of the olive pie).
Every other item has `photo: ''`, which renders the **branded house tile** (mascot
roundel on a checkered field — styled in `.food-art.tile`). A near-miss photo (cheese
pie on a pepperoni card) is a defect, not a nice-to-have. When in doubt: tile.

---

## 5. `site.config.js` — key by key

This is the only data file. It exports `SITE` to both `window` (browser) and
`module.exports` (tests). Fill every block:

- **`meta`** — page title + description (also mirror into `index.html` head, section 6).
- **`brand`** — `name` (short display name), `sub` (footer sub-line, e.g. "Family-owned
  since 1999" — only if verified), logo paths.
- **`theme`** — optional CSS variable overrides, see section 8. Empty = Guallpa palette.
- **`hero`** — `eyebrow` (location + est. year), `h1` as a **two-string array** (line 1
  cream, line 2 yellow italic-skewed), `copy` (2–3 sentences from verified facts),
  `facts` (0–3 chips: rating, award, signature claim — verified only), `poster` +
  `posterCaption` for the 3D stage.
- **`ticker`** — 4–6 short deal/info lines in the client's own words. Rendered twice
  automatically for the loop; just list each line once.
- **`contact`** — address, display phone, `phoneHref` as `tel:+1XXXXXXXXXX`, hours
  line, `orderLine` ("Pickup, delivery via Grubhub, and catering" — match reality).
- **`links`** — grubhub/facebook/instagram/yelp/tripadvisor URLs. These feed the proof
  cards AND footer AND checkout. If a client lacks one (e.g. no Tripadvisor), delete
  that entry from **`proofCards`** too — proof cards render from that array, and the
  tests iterate it, so both stay consistent automatically.
- **`order`** — `inbox`: `https://formsubmit.co/ajax/<EMAIL>`; **ask the human which
  email receives orders** — during demos it's usually their own, on handoff the
  owner's. `liveHosts`: hostname suffixes where orders actually send (everywhere else
  the checkout confirms locally so demos never stall — add the Pages host and any
  custom domain). `taxRate` (NJ = 0.06625), `toppingPrice` (derive from the real menu:
  one-topping price minus plain price), `orderPrefix` (client initials, e.g. `GFP`).
- **`headings`** — menu/gallery/proof section eyebrow+title+copy. Keep the punchy
  short-title style ("The pans.").
- **`gallery`** — 5 items (the grid is designed for 5: one `tall: true` + four
  standard). src/alt/caption each.
- **`visit`** — band copy + background photo + note.
- **`menu`** — `categories` `[{id, label}]` in the client's real order, `items`
  `[{id, photo, category, name, description, basePrice, sizes, toppings, popular?}]`.
  Use the real category names from their menu. `sizes: ['One size']` when there's
  no size choice. `toppings` = their real topping roster (derivable from their
  single-topping items). `popular: true` for verified best-sellers only.

## 6. `index.html` — the only static edits

The `<head>` is not config-driven (SEO tools read static HTML). Update: `<title>`,
`meta description`, `og:title`, `og:description`, `og:image` (use the storefront
photo), `theme-color` (your theme's deep background hex), favicon links (they point
at `logo-roundel.jpg` — fine if you kept the filename). Everything in `<body>` fills
itself from config at load — do not put client text in the body.

## 7. `hero3d.js` — the 3D poster stage

Reads `SITE.hero.poster`. Two things to check per client:
- **Poster aspect**: the plane is `PlaneGeometry(1.86, 2.48)` = 3:4 portrait, matching
  a 1080×1440 poster. If the client's best poster is square (IG post), change to
  `(2.1, 2.1)`; if 4:5, `(1.98, 2.48)`. Keep width ≲2.2 so the tilt never clips.
- **Ember + glow colors**: hardcoded warm gold (`0xe0a33b`, `0xf5c433`, and the rgba
  stops in `emberTexture()`). If you changed the theme away from red/gold, match these
  to the new accent. If the theme stays warm, leave them.
Fallback behavior (keep intact): if WebGL fails or reduced-motion is set, the static
`<img class="stage-fallback">` shows / a single frame renders. Never remove the img.

## 8. Changing the theme

`styles.css` derives everything from CSS variables; `fillSlots()` applies overrides
from `SITE.theme` at load. Available keys → variables:
`char → --char` (page bg), `char2 → --char-2` (card bg), `maroon → --maroon`,
`maroonDeep → --maroon-deep` (hero/confirmation gradients), `red → --red` +
`redHot → --red-hot` (primary buttons, ticker, active states), `gold → --gold`
(eyebrows, prices, secondary buttons), `yellow → --yellow` (h1 line 2, focus rings,
ticker stars), `milk → --milk` (text).

How to pick: sample hexes from the client's **sign photo and logo** (their physical
brand), not from your taste. Keep the structure dark-dominant — this design language
assumes a dark ground; a client who needs a light site needs a styles.css fork, flag
that to the human. Fonts: Anton (display) echoes tall condensed sign lettering and
suits most pizzerias; only swap the Google Fonts link + `--display/--body/--label`
if the client's logo typography clearly clashes (e.g. a script-logo old-world place →
try Abril Fatface or Passion One for display). The h1 line-2 skew (`transform:
skewX(-6deg)` on `h1 em`) echoes italic sign text — remove in styles.css if the
client's brand has no italic lean.

## 9. Build order (follow exactly)

1. `npm install && npx playwright install chromium` — then `npm test` on the untouched
   template to confirm green baseline (3 tests).
2. Research (section 2). Save raw finds outside the repo; copy only final assets in.
3. Replace `assets/` (section 3), crop + visually verify every image.
4. Rewrite `site.config.js` (section 5).
5. Update `index.html` head (section 6). Check hero3d aspect (section 7). Theme (8).
6. `npm test` — the same 3 tests must pass, now against the new config. If a test
   fails on a locator, the config and rendered site disagree — fix the config, not
   the test.
7. Visual QA with Playwright screenshots — desktop 1440×980 AND mobile 390×844:
   hero, menu, gallery, visit, checkout. Check: no horizontal overflow
   (`scrollWidth === clientWidth`), no broken images (`img.naturalWidth > 0` for all),
   3D stage engaged (`.hero-stage.is-3d`), no `pageerror`s, every photo is honest.
   **Look at the screenshots yourself.**
8. Deploy (section 10). Verify live with the same checks against the live URL.

## 10. Deploy runbook (GitHub Pages)

```bash
gh repo create <owner>/<client-slug> --public --template holdsudo/pizzeria-site-template
# work in a clone of that; or push your filled working tree to it
git push -u origin master
gh api repos/<owner>/<client-slug>/pages -X POST -f "source[branch]=master" -f "source[path]=/"
# poll .status until "built", then verify the live URL end to end
```
- **Account custom domains**: if the owner account's user site (`<owner>.github.io`
  repo) has a custom domain, ALL project pages serve under it
  (`https://<domain>/<client-slug>/`). Add whatever hostname actually serves the site
  to `order.liveHosts` and push, or live orders silently won't send.
- **Order email activation**: the first live order triggers a one-time FormSubmit
  activation email to the configured inbox. Tell the human: click it, then place a
  test order to prove the pipeline before any demo.
- **Client custom domain** (when they buy): set `cname` via
  `gh api repos/<o>/<r>/pages -X PUT -f cname=<domain>`, point the client's DNS
  A records at GitHub Pages (185.199.108–111.153), no stray AAAA records, no blocking
  CAA. Cert not issuing after DNS is right? Remove the cname (PUT `{"cname":null}`),
  wait 30s, re-add — a same-value re-save does NOT trigger issuance. When HTTPS
  returns 200, enable enforcement: PUT `{"https_enforced":true}`. Domain changes are
  sensitive — confirm with the human before touching any domain you didn't create.

## 11. Known pitfalls (all hit while building Guallpa's)

- `site.config.js` declares `const SITE` globally — **never** re-declare `SITE` in
  another classic script; you'll get "Identifier 'SITE' has already been declared"
  and the whole page dies.
- Playwright strict mode: text like prices and the order number appear in multiple
  places — the template tests already use `.first()`/`.last()` correctly; follow
  suit in any test you add.
- The tabs render with `role="tab"` — locate with `getByRole('tab')`, not `button`.
- `[hidden]` needs the `display:none !important` guard (already in styles.css) —
  don't remove it; author display rules beat the UA hidden default.
- FB photo-grid images are 315px thumbnails — too small for hero use; prefer GBP
  large variants or IG srcset 1080s.
- `sips` warns "Output file suffix should be png" on jpg crops — harmless.
- The Pages build can report `errored` a few times before flipping to `built` —
  poll, don't panic.
- Order relay: FormSubmit AJAX endpoint per email. Unactivated inboxes queue an
  activation email on first POST; nothing is delivered until it's clicked.

## 12. Definition of done

- [ ] Every photo on the site is the client's own (GBP/socials/owner-provided)
- [ ] Menu = their real menu: names, descriptions, prices, categories, toppings
- [ ] Every menu photo passes the honesty rule; everything else tiles
- [ ] Headline/ticker/deals in the client's own verified words
- [ ] `npm test` green; no page errors; no broken images; no mobile overflow
- [ ] 3D stage runs with the client's poster; fallback intact
- [ ] Live on Pages; order email activated and test order received
- [ ] Human told: live URL, order inbox status, any pitch ammo found during research
