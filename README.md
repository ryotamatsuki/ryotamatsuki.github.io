# RYOTA LAB

Personal product portfolio for Civic Tech, AI, Data Visualization and Games.

- Production site: https://ryotamatsuki.github.io/
- Data-driven project cards: `projects.js`
- Grounded project detail content: `project-details.js`
- Project detail evidence audit: `docs/PROJECT_DETAIL_AUDIT.md`
- Public repository coverage audit: `docs/REPOSITORY_INVENTORY.md`
- Layout / responsive UI: `styles.css` + `details.css`
- Rendering / filtering / search / modal: `app.js`
- Screenshot inventory and rights decisions: `docs/SCREENSHOT_INVENTORY.md`
- Screenshot capture settings: `scripts/screenshot-config.json`

## Project experience

Project cards do not send first-time visitors directly into an unfamiliar external app. `概要を見る` opens a native `<dialog>` inside RYOTA LAB with:

- 解決したい課題
- このプロダクトの目的
- できること
- 使い方
- データ / コンテンツ
- 主な技術
- 利用前の注意（必要な場合）

Only after reading the overview does the visitor choose `アプリを試す` or `GitHubを見る`. Repository-only projects show their local run steps instead of inventing a deployment URL.

## Adding a project

Add one object to `window.RYOTA_PROJECTS` in `projects.js`. The grid uses CSS `auto-fit`, so adding or removing cards does not require layout edits. When a new public repository or deployment is created, also update `docs/REPOSITORY_INVENTORY.md` so the portfolio and audit trail stay aligned.

Required project fields:

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

Every displayed project also requires one `window.RYOTA_PROJECT_DETAILS[id]` entry in `project-details.js` with:

- `problem`
- `purpose`
- `features[]`
- `howToUse[]`
- `dataSources[]`
- `tech[]`
- optional `notes`

`npm run validate:details` fails if any displayed card lacks grounded detail content or if stale/orphan detail content remains.

Streamlit entries must use their public `*.streamlit.app` URL. This prevents app cards from silently falling back to the GitHub repository when a deployment exists.

When adding an image, first confirm that the screen contains no unlicensed third-party character, mascot, logo, personal information, API key, or private URL. Read `BRAND_ASSET_POLICY.md` and update `docs/SCREENSHOT_INVENTORY.md` when the source or rights decision changes.

## Coverage policy

- Public, independently meaningful works are represented in `projects.js`.
- Old prototypes, test-named but functional works, versioned experiments and research artifacts live under `archive` rather than disappearing from the portfolio.
- Empty repositories, forks, exact duplicate repositories and RYOTA LAB itself are not rendered as project cards.
- Private repository names and metadata are never copied into the public inventory.
- Owner-rejected projects are filtered via `window.RYOTA_EXCLUDED_PROJECT_IDS` and do not require detail entries.

## Design principles

- Featured projects use a fixed 3-card Bento composition.
- All other projects use a responsive auto-fit grid.
- Cards have fixed thumbnail proportions and clamped content structure.
- Card primary interaction is `概要を見る`; the external app CTA lives in the detail dialog.
- Desktop uses a centered detail modal; mobile uses a near-fullscreen bottom sheet.
- The native dialog supports Escape, backdrop close, explicit close control and focus return.
- Archive projects are kept out of the main grid.
- No application framework/runtime dependency is required.

## Local QA

```sh
npm install
npm run qa
```

`npm run qa` validates project IDs, status values, repository links, app-link contracts, featured count, detail coverage/content, local WebP assets, HTML IDs, detail dialog assets and local references. If Playwright and its browser are installed, `npm run capture:screenshots` uses `scripts/screenshot-config.json` to reproduce the approved capture states; optimize reviewed PNGs to WebP before promoting them to `assets/projects/`.
