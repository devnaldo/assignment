# Verdant Grove — Apartment Project Website

**Live site:** https://devnaldo.github.io/assignment/

A single-page marketing site for a premium 2 & 3 BHK apartment project:
sticky navigation, full-bleed hero, highlights, project overview, residences,
amenities, gallery, location, enquiry form and footer.

Built with **plain HTML5, CSS3 and one small vanilla JavaScript file**. No
framework, no build step, no dependencies, no `npm install`.

> **Verdant Grove is placeholder content.** The project name, address,
> phone number, floor plans, developer and RERA number are all stand-ins so
> the layout can be reviewed. Every place that needs real copy is marked
> with an `<!-- EDIT: ... -->` comment in `index.html`.

---

## Running it

There is nothing to compile. Either option works:

**1. Open the file directly**

```bash
open index.html          # macOS
xdg-open index.html      # Linux
start index.html         # Windows
```

**2. Serve it locally** (recommended — matches how it will be hosted and
lets you test on a phone over your network)

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

Any static host works as-is: GitHub Pages, Netlify, Vercel, S3, or a plain
Apache/Nginx folder. Just upload `index.html`, `style.css`, `script.js` and
`images/` together.

---

## Structure

```
apartment-website/
├── index.html          All page markup, section by section
├── style.css           All styling, organised in 15 numbered sections
├── script.js           Mobile menu + scroll reveal
├── images/             7 project renders, 1280×720 JPEG
│   ├── 1.jpg           Hero
│   ├── 2.jpg           Gallery — Phase I frontage
│   ├── 3.jpg           Gallery — central garden court
│   ├── 4.jpg           Gallery — courtyard and stilt parking
│   ├── 5.jpg           Amenities
│   ├── 6.jpg           Gallery — master layout
│   └── 7.jpg           Overview
├── AGENTS.md           Project brief and build rules
├── README.md
└── .gitignore
```

### `index.html`

Semantic one-page document: `header` → `main` → ten numbered sections →
`footer`. Each section opens with a banner comment describing the layout and
its breakpoint behaviour. Navigation is in-page anchors (`#overview`,
`#residences`, …).

| Order | Section | Anchor |
|---|---|---|
| 01 | Header and navigation | — |
| 02 | Hero | `#home` |
| 03 | Project highlights | `#highlights` |
| 04 | Project overview | `#overview` |
| 05 | Residences (2 BHK / 3 BHK) | `#residences` |
| 06 | Amenities | `#amenities` |
| 07 | Gallery | `#gallery` |
| 08 | Location and connectivity | `#location` |
| 09 | Enquiry form | `#enquiry` |
| 10 | Footer | — |

### `style.css`

Reads top to bottom in the same order as the page. The contents list at the
top of the file is accurate and can be used to jump to a section.

```
01. Design tokens          08. Residences
02. Reset and base         09. Amenities
03. Layout helpers         10. Gallery
04. Header and nav         11. Location
05. Hero                   12. Enquiry form
06. Highlights             13. Footer
07. Overview               14. Scroll reveal
                           15. Motion preferences
```

All colours, fonts, spacing and easings live in `:root` at the top. Section
specific `@media` blocks sit next to the component they belong to, so a
breakpoint fix stays in one place instead of being scattered.

### `script.js`

Two independent IIFEs, both optional progressive enhancements:

1. **Mobile menu** — opens/closes the drawer under 768px, closes on link tap
   and on `Escape` (restoring focus to the button), locks body scroll while
   open, and resets if the viewport crosses into desktop.
2. **Scroll reveal** — an `IntersectionObserver` adds `.is-visible` to
   `.reveal` elements once, with an 80ms stagger between siblings. The
   animation itself is CSS.

With JavaScript disabled the page still renders completely: the `js` class
that hides `.reveal` elements is only added by an inline script, so nothing
is ever left invisible.

---

## Editing guide

Search `index.html` for `EDIT:` to find every placeholder. The main ones:

| What | Where |
|---|---|
| Project name, tagline, meta description | `<head>`, header logo, footer logo |
| Phone, email, address, opening hours | Header, enquiry panel, footer `<address>` |
| Developer name, RERA number | Footer |
| Floor plan sketches | Two inline `<svg class="residence__plan">` blocks |
| Map | `.map-card` (CSS-drawn placeholder; swap for a static image) |
| Form handler | `<form class="enquiry__form" action="#">` — point at your endpoint |
| Social links | `.socials a href="#"` in the footer |
| Privacy / Terms | `.footer__legal` |

### Changing the colours

Edit the token block, not individual rules:

```css
:root {
  --green: #1F3D2B;      /* primary brand colour */
  --ivory: #FAF6EC;      /* page background */
  --gold: #C9A96E;       /* accents, borders, buttons */
  --ink: #1A1A1A;        /* body text */
  --gold-ink: #87693B;   /* gold that is small enough to need contrast */
}
```

`--gold-ink` exists because `#C9A96E` on ivory is only ~2.1:1 contrast,
which fails WCAG AA for small text. The darker tone measures 4.7:1 on ivory
and 5.0:1 on the card background. Keep small gold type on that token.

### Changing the type

Fonts are loaded from Google Fonts in `<head>`. To swap them, update the
`<link>` and the two font tokens:

```css
--font-serif: "Playfair Display", Georgia, serif;   /* headings */
--font-sans: "Poppins", system-ui, sans-serif;      /* body */
```

---

## Design system

**Colours** — forest green `#1F3D2B`, ivory `#FAF6EC`, champagne gold
`#C9A96E`, near-black `#1A1A1A`.

**Type** — Playfair Display for headings, Poppins for body, with a
`300/400/500` weight range.

**Spacing** — nine tokens from `--space-3xs` (0.25rem) to `--space-3xl`
(6rem). Section rhythm comes from `--section-space:
clamp(4.5rem, 8vw, 7.5rem)`, so it compresses on phones and breathes on
desktop without a media query.

**Breakpoints** — mobile-first, `768px` (tablet: inline nav, two columns) and
`1024px` (desktop: gallery mosaic, side-by-side sections). A few
`max-width: 767.98px` rules handle the drawer and touch-only states.

**Motion** — `--ease` for hovers, `--ease-out` for the gallery zoom and
scroll reveal. All of it is disabled under `prefers-reduced-motion`.

---

## Accessibility notes

- Skip link to `#main`, visible on keyboard focus.
- Sticky header is accounted for with `scroll-padding-top`, so anchored
  sections never land underneath it.
- The menu button is a real `<button>` with `aria-expanded` / `aria-controls`.
- Cards, gallery tiles and form fields have visible `:focus-visible` rings.
- Every image has descriptive `alt` text; decorative SVGs are `aria-hidden`.
- Tap targets are ≥44px, with the deliberate exception of the inline phone
  and email links (40px) and the desktop nav links (32px box, 52px hit area).
- Colour contrast: body text and buttons meet WCAG AA; small gold labels use
  the darker `--gold-ink`.

## Browser support

Current Chrome, Edge, Firefox and Safari. The layout relies on CSS Grid,
custom properties, `clamp()` and `aspect-ratio`; the reveal uses
`IntersectionObserver`. Both fall back to fully visible content on anything
older.
