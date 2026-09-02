# PRABODHA - Daily Edition

A static, self-hosted newspaper site for science, technology, medicine and mathematics coverage. Built for GitHub Pages - no backend, no database, no tracking.

## Pages

| File | Purpose |
|---|---|
| `index.html` | Front page - hero story, grid, ticker, opinion rail |
| `archive.html` | Full searchable/filterable list of every article ever filed |
| `about.html` | Mission, sections, and live stats |
<!-- | `editor.html` | Newsroom desk - draft an article and generate its file | -->

## Architecture

- **Content**: each day's articles live in `articles/*.js`, listed in `articles/index.js`. Every file pushes objects into a global `window.ALL_ARTICLES` array.
- **Loading**: `loader.js` loads all files in `articles/index.js` in order, then runs the page's render function (`initSite(callback)`). It also exposes `groupOf(cat)`, which maps a specific category (e.g. `physics`, `ai`) to one of four top-level sections: `science`, `technology`, `medicine`, `mathematics`.
- **Reader overlay**: `reader.js` is shared by `index.html` and `archive.html`. It renders the full-article panel, parses inline citation markup (`[[text|1]]`), and provides `formatDate()` and `formatLiveClock()` helpers used across pages.
- **Theme**: `theme.js` toggles light/dark mode via `data-theme` on `<html>`, persisted in `localStorage`.
- **No localStorage for content** - articles are the same for every visitor since they're static files, not per-browser data.

## File-by-file

- `style.css` - shared base styles: theme variables, masthead, ticker, cards, reader overlay.
- `script.js` - front-page rendering (hero, grid, opinion rail), section nav, ticker, live clock.
- `archive.css` / `archive.js` - archive page styling and search/filter/sort logic.
- `about.css` / `about.js` - About page styling and live stats (article count, earliest edition date).
<!-- - `editor.css` / `editor.js` - newsroom desk styling and the article-drafting form, which generates a downloadable `articles/YYYY-MM-DD.js` file. -->
- `ticker-data.js` - static top-10 tech/science market-cap data (update manually).
- `loader.js` - shared article-loading and category-grouping logic.
- `reader.js` - shared article-reader overlay, citation parsing, date/clock formatting.
- `theme.js` - light/dark theme toggle.

## Publishing a new article

Since GitHub Pages is static, publishing is a manual commit step:

1. Open `editor.html`, fill in the dispatch, and click **Generate File**. This downloads a file like `2026-08-20.js`.
2. Move the downloaded file into `articles/`.
3. Open `articles/index.js` and add the filename to the list.
4. Commit and push. The article now appears on the front page and in the archive for every visitor.

### Citations

In the dispatch body, wrap cited text as:

```
[[this claim|1]]
```

where `1` matches a numbered line in the Sources field. Citations render as clickable footnote marks that jump to the matching source in the reader overlay.

## Categories

Articles use a specific category (stored on the article) that rolls up into one of four groups via `CAT_GROUPS` in `loader.js`:

- **Science** - physics, chemistry, biology, space, biotech, fundamentals, geology, oceanography, climate, astronomy, ecology, paleontology
- **Technology** - ai, software, research, robotics, materials, cybersecurity, quantum, semiconductors, energy, telecom, aerospace
- **Medicine** - genomics, pharmacology, neuroscience, publichealth, oncology, immunology, cardiology, epidemiology, surgery, mentalhealth
- **Mathematics** - math, statistics, cryptography, appliedmath, numbertheory

## Local development

No build step. Just serve the folder statically, e.g.:



Then open `index.html` (some browsers block `file://` script loading via `loader.js`, so a local server is recommended).

## Notes

- The live clock across pages (masthead, archive, editor) formats as: `20th August 2026 · 07:43:44 · Asia/Calcutta (GMT+5:30)` via `formatLiveClock()` in `reader.js`.
- Theme colors are defined once in `style.css` under `:root` and `[data-theme="dark"]`, and reused by every page's stylesheet.


## Tech Stack

Plain HTML, CSS, and vanilla JavaScript — no frameworks, no build tools, no server required. Fonts loaded from Google Fonts (Fraunces, Source Serif 4, JetBrains Mono).


# Copyright and License Notice

Copyright © 2026 Tanmay Saha. All rights reserved.

## Source Code

This project's source code is proprietary and is **not licensed for reuse, modification, redistribution, sublicensing, publication, or commercial use**.

No permission is granted to copy, reproduce, modify, merge, adapt, distribute, sublicense, sell, publish, or incorporate any portion of this source code into another project, software, product, or service without prior **written permission from the copyright holder**.

Viewing, accessing, or downloading the source code does not grant any license or other rights to use the source code beyond what is expressly permitted by the copyright holder.

## Project Name, Trademarks, and Branding

The project's name, trademarks, logo, favicon, branding, visual identity, and related materials are **not licensed for use**.

No permission is granted to use these materials to represent, advertise, promote, or imply an official association with, endorsement by, sponsorship by, or affiliation with the original project or its author.

## Original Creative Content

The project's original written content, articles, documentation, illustrations, graphics, artwork, photographs, images, and other creative assets are Copyright © 2026 Tanmay Saha. All rights reserved.

These materials may not be copied, reproduced, modified, adapted, distributed, republished, or used in another project or brand without prior written permission.

## Third-Party Materials

Third-party software, libraries, dependencies, fonts, images, or other materials included in or used by this project remain subject to their respective licenses and copyright notices. Nothing in this notice is intended to override those licenses.

## Permission Requests

If you wish to use, modify, redistribute, incorporate, or commercially exploit any portion of this project's source code or copyrighted materials, you must obtain prior written permission from Tanmay Saha.

Unless such permission is expressly granted in writing, **all rights are reserved**.


The use of the source code under the MIT License does not grant any rights to
the project's name, logo, trademarks, branding, or other copyrighted creative
assets.

The MIT License does not grant permission to imply endorsement, sponsorship,
or official association with the original project or its author.
