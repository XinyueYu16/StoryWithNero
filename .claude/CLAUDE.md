# 灰石头和芬达石 · A Bedtime Story

Pure static HTML + CSS + vanilla JS site hosted on GitHub Pages. No frameworks, no backend, no analytics.

## Design Aesthetic
- Warm parchment paper (`#f5f4f0`), like an old picture book scanned into a webpage
- Cormorant Garamond (serif titles), Inter (body), JetBrains Mono (meta)
- Restrained orange accents (`#E0814A`) used sparingly
- Mobile-first, three breakpoints: base, 680px, 960px, 1200px
- Desktop max-width 700px, body text 16-17px, line-height 1.85

## File Inventory

### Core
| File | Purpose |
|------|---------|
| `index.html` | Homepage — journey line, gallery, sounds section |
| `style.css` | Shared stylesheet (~13KB) — reset, typography, layout, chapter page, responsive |
| `transition.js` | Page-turn overlay — directional horizontal sweep, 380ms |
| `cursor.js` | Soft warm glow (180px radial gradient, fire opal orange, fades after 1.2s idle) |

### Chapters
| File | Chapter | Accent | Canvas Effect |
|------|---------|--------|---------------|
| `ch1-the-crack-in-the-mountain.html` | I. The Crack in the Mountain | `#C67A4A` warm clay | Dust motes — 4 o'clock light (12/20 particles, warm orange/gold/grey) |
| `ch2-rain.html` | II. Rain | `#8A9AA8` cool slate | Rain streaks (90/140) + concentric ripple clusters (3 rings each, lower half of screen) + dim warm motes |
| `ch3-moss.html` | III. Moss | `#879E82` sage green | Slow meandering spores (14/22) + moss patches (4/7 irregular blobs at bottom edge, minutes-scale growth) |
| `ch4-wind.html` | IV. Wind | `#B8A76E` warm grass gold | Swaying grass blades (80/120, quadratic bezier curves) + wind-borne seeds (12/18) + periodic gusts pushing right |

### Assets
- `images/ch1.jpg` through `images/ch4.jpg` — watercolor illustrations per chapter
- `ear-godspeedyou.txt` — GY!BE note density data (98 points, used for waveform on homepage)
- `灰石头和芬达石 · homepage concept.html` — original concept, preserved untouched

## Per-Chapter CSS Variables
Each chapter overrides three variables in its inline `<style>`:
```css
--ch-accent        /* accent color (rule lines, drop cap, active states) */
--ch-accent-bg     /* pale background tint */
--ch-accent-text   /* dark text variant */
```

## Canvas Architecture
Every chapter page has `<canvas id="dust-canvas">` with:
```css
position: fixed; inset: 0; pointer-events: none; z-index: 0;
```
Chapter content sits above via `.chapter { position: relative; z-index: 1; }`.

Each chapter's canvas script is an IIFE in the page's own `<script>` block. Naming pattern: `(function effectName() { ... })();`.

### Critical JS Bug Fixed
In ch4, `initGrass()` was called inside `resize()` before `grassColors` array was assigned. `var grassColors` was hoisted as `undefined`, causing a silent TypeError that killed the entire script. **Rule**: all data arrays must be defined BEFORE any function call that references them.

## Key CSS Patterns

### Drop Cap
```css
.ch-content p:first-of-type::first-letter {
  font-family: var(--font-serif);
  font-size: 3.6em; float: left;
  line-height: 0.75; margin-right: 0.08em;
  color: var(--ch-accent);
}
```

### Torn-Edge Photo Filter (Homepage Gallery)
SVG `feTurbulence` + `feDisplacementMap` filter applied to gallery images with slight rotation and drop-shadow for a pasted-scrapbook look.

### Chapter Structure
```
.chapter > a.ch-back → header.ch-header → div.ch-content → div.ch-rule → figure.ch-illustration → div.ch-rule → a.ch-back → footer.foot
```

### Gallery
Horizontal scroll with `scroll-snap-type: x mandatory`. Scrollbar hidden on mobile, shown as thin bar on desktop (960px+ breakpoint).

## Homepage Systems

### Journey Line
Vertical timeline with CSS `::before` pseudo-element line, animated via Intersection Observer (`.journey--drawn` draws the line, `.stop--visible` staggers the stops). Active stops have orange dots.

### Dust Particles (Homepage)
12 mobile / 20 desktop, warm palette, gentle upward drift with sinusoidal horizontal sway.

### Waveform
98-bar visualization of GY!BE "The Dead Flag Blues" note density, rendered inline (140×15px) next to song title.

### Gallery 3D Tilt
`mousemove` listener on `[data-tilt]` cards rotates the image 6° Y / 4° X based on cursor position.

## Adding a New Chapter
1. Copy the latest chapter HTML file
2. Change title, chapter number, date
3. Set new `--ch-accent`, `--ch-accent-bg`, `--ch-accent-text` colors matching chapter mood
4. Replace story content in `.ch-content` (use `&ldquo;`/`&rdquo;` for curly quotes)
5. Design and implement a canvas effect that matches the chapter's atmosphere
6. Update image path in `figure.ch-illustration`
7. Add new stop to journey line and new card to gallery in `index.html`
8. Add `active` class to the new journey stop
9. Ensure all data arrays in JS are defined before function calls that use them
