# RYOTA LAB Screenshot Inventory

監査日: 2026-08-23 (JST)  
初回スクリーンショット監査: `origin/main` の `62ad0de93a94cf401a3a3c83c6c4b688612bca31` から作成した `feature/real-project-screenshots`  
リンク監査追補: 2026-08-23。`ehime-kokubunsai-ai-poc` の既存公開Streamlit URLをポートフォリオへ登録し、全14件の `appUrl` / `host` 契約を再確認した。

## 監査方針

- `projects.js` を Single Source of Truth として全14件を確認した。
- `appUrl` があるプロジェクトは、初回監査時にHTTP到達性を確認し、Cloud Browserで画面描画と主要UIを目視確認した。
- Streamlitはコールドスタートを考慮する。短時間のHTTPタイムアウトだけで停止扱いにはしない。
- `GitHub Pages` / `Streamlit` / `Web App` / `Web Game` をhostに持つカードは `appUrl` 必須とし、GitHubリポジトリへの暗黙フォールバックを禁止する。
- `host: Streamlit` の `appUrl` は `*.streamlit.app` を必須とする。
- 地図系のスクリーンショットでは、OpenStreetMapの帰属表示をカード側のデータ属性から常時表示する。
- 未許諾の第三者キャラクター、マスコット、ロゴを主役にした画像は採用しない。`みきゃん` 等の自治体公式キャラクターは使用していない。

## 全プロジェクト監査

| id | title | status / host | appUrl実査 | featured | categories | visual | screenshot suitability / decision |
|---|---|---|---|---:|---|---|---|
| `ehime-evacuation-risk-map` | 南海トラフ・本当に逃げられるかマップ | live / GitHub Pages | LIVE confirmed, HTTP 200。Cloud BrowserではWebGL無効のため地図領域が明示的フォールバック表示 | 1 | 行政・防災, GIS | map | 特定画面なら使用可。KPI・分析条件が一目で分かる実画面を採用。OSM帰属をカードに表示 |
| `ehime-mobility-resilience-lab` | Ehime Mobility Resilience Lab | live / GitHub Pages | LIVE confirmed, HTTP 200。地図・シナリオ・KPI・OSM attributionを確認 | 2 | 交通, 行政・防災, GIS | transit | そのまま使用可。Baselineの地図分析画面を採用 |
| `ehime-kokubunsai-ai-poc` | 愛顔えひめの文化祭 AI案内 | poc / Streamlit | 既存公開Streamlit URLを再登録。カードのOpen先をGitHubリポジトリから公開アプリへ修正 | — | AI, 行政・防災 | chat | 今回はリンク修正のみ。既存CSS fallbackを維持し、第三者素材を含まない実画面の再監査後に画像化する |
| `ehime-aed-rescue-map` | AED Rescue Map | live / GitHub Pages | LIVE confirmed, HTTP 200。AED・未カバー人口・次の1台候補を確認 | — | 行政・防災, GIS | aed | そのまま使用可。KPI・地図・推薦候補を含む画面を採用。OSM帰属をカードに表示 |
| `yokaizukan` | 妖怪図鑑 | live / Web App | LIVE confirmed, HTTP 200。ポータルの自作図鑑イラストと導線を確認 | — | 教育, ゲーム | yokai | 自作/生成イラストを含むポータル画面を採用。第三者公式キャラクターは確認されない |
| `ehime-quiz` | Ehime Quiz | live / Web Game | LIVE confirmed, HTTP 200 | — | ゲーム, 教育 | quiz | 画面は使用可能だが、ヒーロー内の人物ビジュアルの権利 provenance が確認できないため画像採用を見送る。CSS fallback |
| `furusatonozei` | ふるさと納税ダッシュボード | live / Web App | LIVE confirmed, HTTP 200。地図はWebGLエラー、金額分布タブは正常描画 | 3 | 行政・防災, GIS | chart | 特定画面なら使用可。WebGLに依存しない金額分布グラフ画面を採用 |
| `kumamotoshienmap` | 熊本支援マップ | live / GitHub Pages | LIVE confirmed, HTTP 200。短縮URLから確認済みのHTMLへリダイレクト | — | 行政・防災, GIS | map | 概要画面を採用。`appUrl` は確認済みの深いHTMLへ固定 |
| `hime-star-journey` | Hime Star Journey | live / Web Game | LIVE confirmed, HTTP 200。`はじめから` 後のプロローグ画面を確認 | — | ゲーム | space | タイトルではなくゲーム内プロローグ画面を採用。アプリ固有の自作キャラクターのみ |
| `ehime-tour-planner` | Ehime Tour Planner | live / Streamlit | LIVE but cold start / Streamlit。Cloud Browserでは約18秒待機後に入力UIを確認。HTTP fetchは30秒でタイムアウトしたが、公開画面は描画 | — | AI, 交通 | chat | 入力済みの公開デモ状態を採用。個人情報・秘密情報は入力していない |
| `bus-timelapse` | Bus Timelapse | poc / GitHub | repository only。GitHub APIで `homepage: null` / `has_pages: false` を再確認 | — | 交通, GIS | bus | 公開アプリがないためGitHubリポジトリへの導線を意図的に維持。CSS fallback |
| `kids-typing` | Kids Typing | live / Web Game | LIVE confirmed, HTTP 200。タイトル/プロローグ画面を確認 | — | ゲーム, 教育 | game | 特定ゲーム状態なら使用可。ただし今回はアプリ固有キャラクターの provenance を別途確認できるまでCSS fallback |
| `retro-sky-raid` | Retro Sky Raid | archive / Web Game | ARCHIVE URL confirmed, HTTP 200。難易度選択からStage 1表示まで確認 | — | ゲーム | space | 実プレイ画面を採用。Archive展開時のみ表示 |
| `solar-system` | Solar System | archive / Web App | ARCHIVE URLはHTTP 200だが、Cloud BrowserでWebGL初期化エラーとJSエラーを確認 | — | 教育, ゲーム | space | 公開状態はarchiveのまま。実画像は採用せずCSS fallback |

## 採用アセット

`assets/projects/` に以下のWebPを配置した。すべて公開画面をブラウザで一度撮影し、幅1280px・メタデータ除去・quality 82で最適化している。

- `ehime-evacuation-risk-map.webp`
- `ehime-mobility-resilience-lab.webp`
- `ehime-aed-rescue-map.webp`
- `yokaizukan.webp`
- `furusatonozei.webp`
- `kumamotoshienmap.webp`
- `hime-star-journey.webp`
- `ehime-tour-planner.webp`
- `retro-sky-raid.webp`

合計容量は約664KB。カード表示は共通の `aspect-ratio: 16 / 9` と `object-fit: cover` を使用し、個別CSSではなく `projects.js` の `imagePosition` で焦点位置を指定する。

## Rights audit

- `BRAND_ASSET_POLICY.md` を作業開始時に確認済み。
- みきゃん、ダークみきゃん、こみきゃん、その他自治体公式キャラクターは不使用。
- 許諾未確認の企業キャラクターや第三者ロゴを主役にした画像は不使用。
- `ehime-quiz` の人物ヒーロー画像は provenance が確認できないため、カード画像として採用しなかった。
- 地図系3件は `imageAttribution: "© OpenStreetMap contributors"` を設定し、カード上にも帰属表示を残す。
- 地図以外の画像は第三者URLから参照せず、撮影した公開プロダクト画面をローカルWebP化している。

## Featured再評価

Featuredは3件を維持し、避難・交通・ふるさと納税の3件とする。`ehime-kokubunsai-ai-poc` に公開Streamlit URLがあることは今回の追補で訂正したが、Featuredの選定は公開可否だけでなく、現行3件の視覚的多様性とポートフォリオ全体のバランスを優先して維持する。

## Fallback一覧

以下は無理に画像化せず、既存のCSS/self-created visualを使用する。

- `ehime-kokubunsai-ai-poc`
- `ehime-quiz`
- `bus-timelapse`
- `kids-typing`
- `solar-system`

画像がない場合も共通の描画経路でカードが成立し、プロジェクトの追加・削除でCSSを編集する必要はない。
