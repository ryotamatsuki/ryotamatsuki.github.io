# RYOTA LAB

Personal product portfolio for Civic Tech, AI, Data Visualization and Games.

- Production site: https://ryotamatsuki.github.io/
- Data-driven project cards: `projects.js`
- Public repository coverage audit: `docs/REPOSITORY_INVENTORY.md`
- Layout / responsive UI: `styles.css`
- Rendering / filtering / search: `app.js`
- Screenshot inventory and rights decisions: `docs/SCREENSHOT_INVENTORY.md`
- Screenshot capture settings: `scripts/screenshot-config.json`

## Adding a project

Add one object to `window.RYOTA_PROJECTS` in `projects.js`. The grid uses CSS `auto-fit`, so adding or removing cards does not require layout edits. When a new public repository or deployment is created, also update `docs/REPOSITORY_INVENTORY.md` so the portfolio and audit trail stay aligned.

Required fields:

- `id`
- `title`
- `description`
- `categories`
- `status`: `live`, `poc`, or `archive`
- `host`
- `visual`
- `repoUrl`

Optional / conditional:

- `appUrl`: required when `host` is `GitHub Pages`, `Streamlit`, `Web App`, or `Web Game`; only repository-only `GitHub` entries may omit it
- `featured`: `1`–`3` for the selected-work Bento area
- `image`: local WebP screenshot path under `assets/projects/`
- `imagePosition`: focal point such as `50% 40%`
- `imageAttribution`: visible attribution for map screenshots when required

Streamlit entries must use their public `*.streamlit.app` URL. This prevents the card's Open action from silently falling back to the GitHub repository when an app deployment exists.

When adding an image, first confirm that the screen contains no unlicensed third-party character, mascot, logo, personal information, API key, or private URL. Read `BRAND_ASSET_POLICY.md` and update `docs/SCREENSHOT_INVENTORY.md` when the source or rights decision changes.

## Coverage policy

- Public, independently meaningful works are represented in `projects.js`.
- Old prototypes, test-named but functional works, versioned experiments and research artifacts live under `archive` rather than disappearing from the portfolio.
- Empty repositories, forks, exact duplicate repositories and RYOTA LAB itself are not rendered as project cards.
- Private repository names and metadata are never copied into the public inventory.
- Ambiguous legacy/test works remain in Archive until the owner explicitly decides to remove them.

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

`npm run qa` validates project IDs, status values, repository links, app-link contracts, featured count, local WebP assets, HTML IDs, and local asset references. If Playwright and its browser are installed, `npm run capture:screenshots` uses `scripts/screenshot-config.json` to reproduce the approved capture states; optimize reviewed PNGs to WebP before promoting them to `assets/projects/`.
