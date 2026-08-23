# RYOTA LAB

Personal product portfolio for Civic Tech, AI, Data Visualization and Games.

- Production site: https://ryotamatsuki.github.io/
- Data-driven project cards: `projects.js`
- Layout / responsive UI: `styles.css`
- Rendering / filtering / search: `app.js`

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

## Design principles

- Featured projects use a fixed 3-card Bento composition.
- All other projects use a responsive auto-fit grid.
- Cards have fixed thumbnail proportions and clamped content structure.
- Archive projects are kept out of the main grid.
- No framework/runtime dependency is required.
