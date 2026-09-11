# RYOTA LAB Catalog Refresh — 2026-09-11

## Scope

2026-08-23 の公開リポジトリ棚卸し後に追加・公開されたアプリと、公開URLが新たに確認できた Streamlit アプリを RYOTA LAB の実行時カタログへ反映した。

## Streamlit deployments

| project | public app | catalog treatment |
|---|---|---|
| `AI_agent` | `https://aiagent-7yqnb8czd6n.streamlit.app/` | PoCとして追加。forkベースであることを詳細欄に明記 |
| `AI_counselor` | `https://aicounselor-taaybua6bln.streamlit.app/` | PoCとして追加。forkベースであることを詳細欄に明記 |
| `aidai` | `https://nbzesaufldq9tx8bk3odsn.streamlit.app/` | ArchiveからPoCへ移し、Open先をStreamlitへ変更 |
| `bus-timelapse` | `https://bus-timelapse-nuvoqgec2jgpjcrjkjmd72.streamlit.app/` | Open先をStreamlitへ変更 |
| `ehime-kokubunsai-ai-poc` | `https://ehime-kokubunsai-ai-poc-9uqr82g7mpllijkeewhky8.streamlit.app/` | 既存URLを確認・維持 |
| `ehime-tour-planner` | `https://ehime-tour-planner-iicqpkkbfs9zrcjba6a9at.streamlit.app/` | 既存URLを確認・維持 |
| `lawsy` | `https://ctywvud7zrh2r5jkwaqjqr.streamlit.app/` | PoCとして追加。forkベースであることを詳細欄に明記 |
| `sarashina-chat` | `https://sarashina-chat-mdzjqhfkcqfcab7f7k6xry.streamlit.app/` | Open先をStreamlitへ変更 |

## Newly surfaced public apps

- `ehime-civil-works-monitor` — Ehime Civil Works Monitor
- `economic-theory-research-dashboard` — Economic Theory Research Portfolio
- `plateau_matsuyama` — 松山 3D ハザードマップ
- `racegame` — MICRO RACER WORKSHOP
- `racegameastra` — MICRO RACER / ASTRA WORKSHOP
- `-astra-wetland-lake` — 静かな湖畔 — Stillwater
- `house-` — 郷野の家 — Rural House Walk

## QA policy

`project-detail-overrides.js` は今後、短期的に変わる公開URL・稼働状態・新規デプロイを反映する runtime catalog patch として扱う。`validate-projects.mjs`、`validate-details.mjs`、`validate-links.mjs` も同ファイルを実行してから検証し、画面に表示される実効カタログとCIの検証対象を一致させる。

旧 `REPOSITORY_INVENTORY.md` の 2026-08-23 集計値は当時のスナップショットとして保持し、本追補以後の現行カタログ件数とは一致しない。
