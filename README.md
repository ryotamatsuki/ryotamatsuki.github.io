# RYOTA LAB

Personal product portfolio for Civic Tech, AI, Data Visualization and Games.

- Production site: https://ryotamatsuki.github.io/
- Data-driven project cards: `projects.js`
- Layout / responsive UI: `styles.css`
- Rendering / filtering / search: `app.js`
- Screenshot inventory and rights decisions: `docs/SCREENSHOT_INVENTORY.md`
- Screenshot capture settings: `scripts/screenshot-config.json`

## Adding a project

Add one object to `window.RYOTA_PROJECTS` in `projects.js`. The grid uses CSS `auto-fit`, so adding or removing cards does not require layout edits.

Required fields:

- `id`
- `title`
- `description`
- `categories`
- `status`: `live`, `poc`, or `archive`
- `host`
- `visual`
- `repoUrl`

Optional:

- `appUrl`
- `featured`: `1`–`3` for the selected-work Bento area
- `image`: local WebP screenshot path under `assets/projects/`
- `imagePosition`: focal point such as `50% 40%`
- `imageAttribution`: visible attribution for map screenshots when required

When adding an image, first confirm that the screen contains no unlicensed third-party character, mascot, logo, personal information, API key, or private URL. Read `BRAND_ASSET_POLICY.md` and update `docs/SCREENSHOT_INVENTORY.md` when the source or rights decision changes.

## Design principles

- Featured projects use a fixed 3-card Bento composition.
- All other projects use a responsive auto-fit grid.
- Cards have fixed thumbnail proportions and clamped content structure.
- Archive projects are kept out of the main grid.
- No framework/runtime dependency is required.

## Local QA

```sh
npm install
npm run qa
```

`npm run qa` validates project IDs, status values, repository links, featured count, local WebP assets, HTML IDs, and local asset references. If Playwright and its browser are installed, `npm run capture:screenshots` uses `scripts/screenshot-config.json` to reproduce the approved capture states; optimize reviewed PNGs to WebP before promoting them to `assets/projects/`.
