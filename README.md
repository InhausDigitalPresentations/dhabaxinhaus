# The Road to Dhaba

Interactive horizontal-scroll presentation for Dhaba Abu Dhabi, by INHAUS.
Scroll (or use the arrow keys) to drive the taxi through 40 slides (00–39).

## Run locally

    python3 -m http.server 8492

then open http://localhost:8492

## Publish

Static site, no build step. With GitHub Pages: Settings → Pages → deploy from
the main branch, root folder. `index.html` is the entry point.

## Edit

- `js/deck.js` — all slide copy and layout (one block per slide, numbered automatically)
- `css/deck.css`, `css/style.css` — styling
- `js/road.js` — scroll engine, taxi, horn, ending
- `assets/` — photos, illustrations, logos

## Notes

- Sound: the horn plays when the taxi is clicked, and at the end once the
  viewer has clicked or pressed a key (browsers block sound before that).
- Fonts: Publish Gothic Condensed is a licensed typeface (Playtype). Check the
  licence covers web hosting before making the repository public.
- Designed for desktop screens; phone layout has not been tuned.
