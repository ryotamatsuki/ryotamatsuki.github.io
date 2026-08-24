# RYOTA LAB Project Detail Audit

監査日: 2026-08-24 (JST)

## 目的

RYOTA LAB の各カードから外部サイトへ直接飛ばすのではなく、初見利用者が「何の課題を扱うのか／何ができるのか／どう触るのか」を理解してから試せるようにするため、表示対象38件を個別に読み直した。

## 監査方法

- README が十分なリポジトリは README を一次根拠として使用した。
- README が空・未整備のものは `index.html`、Streamlit entrypoint、ゲーム本体、設定/要件、データ/レイヤ定義など実コードまで読んだ。
- GitHub Pages 作品は公開時に配信される entrypoint / generated HTML を「公開画面」の実装根拠として確認した。
- Streamlit 作品は実際の UI entrypoint とバックエンド接続コードを確認した。
- この実行環境から `ryotamatsuki.github.io` への直接ブラウザ取得はDNS/キャッシュ制約で安定しなかったため、URL到達性は既存 Link Health workflow、画面内容は公開entrypoint sourceで検証した。
- 要件書にのみ存在する将来機能は、現行機能として断定しない。
- みきゃん等の未許諾キャラクター・第三者画像を詳細UIへ新規転載しない。

## 詳細データ契約

`project-details.js` は表示対象ごとに以下を持つ。

- `problem`: 解決したい課題
- `purpose`: プロダクトの目的
- `features[]`: できること
- `howToUse[]`: 初見向け操作手順
- `dataSources[]`: データ / コンテンツ
- `tech[]`: 主な技術
- `notes`: 利用前の注意（必要な場合）

`scripts/validate-details.mjs` が38件すべての詳細情報を必須検証する。

## 個別監査

| id | repository | 主に読んだもの | 公開形態 | 詳細記述の根拠 |
|---|---|---|---|---|
| `ehime-evacuation-risk-map` | `ehime-evacuation-risk-map` | `README.md` | GitHub Pages / generated WebGIS | README・分析/QA構成 |
| `ehime-mobility-resilience-lab` | `ehime-mobility-resilience-lab` | `README.md` | GitHub Pages | README・公開UI構成 |
| `ehime-kokubunsai-ai-poc` | `ehime-kokubunsai-ai-poc` | `README.md` | Streamlit | README・Streamlit/Semantic workflow |
| `ehime-aed-rescue-map` | `ehime-aed-rescue-map` | `README.md` | GitHub Pages | README・分析仕様 |
| `yokaizukan` | `yokaizukan` | `README.md` | GitHub Pages | README・JSON/UI構成 |
| `ehime-quiz` | `ehime_quiz` | `README.md` | GitHub Pages | README・クイズUI |
| `furusatonozei` | `furusatonozei` | `README.md` | GitHub Pages | README・build/validation |
| `kumamotoshienmap` | `kumamotoshienmap` | `index.html / package.json / data & scripts` | GitHub Pages | 公開入口・更新/検証スクリプト |
| `hime-star-journey` | `hime-star-journey` | `README.md` | GitHub Pages | README・ゲーム進行 |
| `ehime-tour-planner` | `ehime-tour-planner` | `README.md` | Streamlit | README・RAG/生成workflow |
| `360panorama` | `360panorama` | `README.md` | GitHub Pages | README・Pannellum操作 |
| `star-wing` | `star-wing` | `index.html / ロードマップ.md` | GitHub Pages | HUD/Touch UI・戦闘ロードマップ |
| `localgovernant` | `localgovernant` | `README.md` | Repository / local app | 起動・ゲームループ・3D/保存仕様 |
| `ehime-tcg` | `ehime-tcg` | `README.md` | Repository / local Web MVP | カード/対戦/素材ポリシー |
| `sarashina-chat` | `sarashina-chat` | `streamlit_app.py / modal backend files` | Repository / Streamlit source | 実UI entrypoint |
| `bus-timelapse` | `bus-timelapse` | `yoken.md / app.py / generated demo` | Repository / PoC | 要件と現行ファイルを区別 |
| `kids-typing` | `kids_typing` | `REQUIREMENTS.md / index.html / game.js` | GitHub Pages | 学習設計・実ゲームUI |
| `retro-sky-raid` | `retro-sky-raid` | `README.md / game.js / index.html` | GitHub Pages | PC/Touch操作・3ステージ |
| `solar-system` | `solar_system` | `README.md` | GitHub Pages | 3Dビューアー操作 |
| `aidai` | `aidai` | `app.py / CSV` | Repository / Streamlit source | 実タブ・集計コード |
| `city-annalist` | `city_annalist` | `README.md / app / services / tests` | Repository / local app | Explore/Scenario/Budget Draft |
| `3d-tsunami` | `3d_tsunami` | `index.html / scene files` | GitHub Pages | Qgis2threejs UI |
| `airportgolf` | `airportgolf` | `index.html` | GitHub Pages | Mapbox Isochrone controls |
| `cancertest` | `cancertest` | `index.html` | GitHub Pages | Leaflet UI・施設属性 |
| `childcarematsuyama` | `childcarematsuyama` | `index.html` | GitHub Pages | Mapbox controls・施設種別 |
| `codextest-a` | `codextest_a` | `index.html / main.js` | GitHub Pages | YouTube API入力・集計UI |
| `imabarityme` | `imabarityme` | `index.html` | GitHub Pages | Mapbox Isochrone controls |
| `lpsample` | `lpsample` | `index.html` | GitHub Pages | LP構成・外部画像参照 |
| `map-of-salesman-in-matsuyama-and-toon` | `map-of-salesman-in-matsuyama-and-toon` | `index.html / legacy-map.html` | GitHub Pages | 修正済みentrypoint・Folium地図 |
| `matsuyamastationaroundmap` | `matsuyamastationaroundmap` | `index.html / qgis2web assets` | GitHub Pages | 主体フィルタ・整備ステップ |
| `openstreet` | `openstreet` | `large generated index.html / repository inventory` | GitHub Pages | 大容量静的地図・地点重畳 |
| `orange` | `orange` | `index.html` | GitHub Pages | LP構成・外部画像参照 |
| `qgisgaikokujin` | `qgisgaikokujin` | `index.html / layers/layers.js` | GitHub Pages | 役所/医療/学校レイヤー |
| `qgisgaikokujin2` | `qgisgaikokujin2` | `index.html / data files` | GitHub Pages | Leaflet版UI/レイヤー |
| `ryota-openstreet` | `ryota.openstreet` | `large generated index.html / README.md` | GitHub Pages | 旧静的地図バリアント |
| `sample-antigrabity` | `sample_antigrabity` | `index.html / game.js` | Repository / static game source | ゲーム画面・操作 |
| `webgis` | `webgis` | `index.html` | GitHub Pages | Upload/Style/Classify/Label/Filter UI |
| `writepaper-public-co-creation-hubs` | `writepaper_public_co-creation_hubs` | `解説レポート_opus.md / paper PDF & sources` | Repository / research | 研究動機・モデル・政策含意 |

## UI方針

- Featured / 通常カードの主クリックは外部URLではなく `概要を見る`。
- 詳細モーダルで課題・目的・機能・使い方・データ・技術・注意事項を確認後、`アプリを試す` または `GitHubで見る` を選ぶ。
- 公開アプリのない repository-only PoC は、ローカル起動手順を `howToUse` に書き、存在しないデプロイURLを作らない。
- Desktop は中央モーダル、Mobile は画面下端に寄せたほぼ全画面のsheetとして表示する。
- native `<dialog>` を使用し、Escape、閉じるボタン、backdrop click、閉じた後のfocus returnを実装する。

## 維持ルール

新しいカードを追加したときは `projects.js` だけでなく `project-details.js` に詳細を追加する。詳細が欠けた場合は `npm run qa` が失敗する。
