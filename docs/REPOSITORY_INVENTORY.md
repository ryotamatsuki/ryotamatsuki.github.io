# RYOTA LAB Public Repository Inventory

監査日: 2026-08-23 (JST)
最終整理: 2026-08-23 (JST)

## 目的

RYOTA LAB の掲載漏れを防ぐため、`ryotamatsuki` 所有の公開リポジトリを母集団として棚卸しした。非公開リポジトリの名称・内容はこの公開文書には記録しない。

## 集計

- 公開リポジトリ: 49件（RYOTA LAB 自身を含む）
- RYOTA LAB 表示対象: 38件
- 棚卸し時に一度カード化した作品: 41件
- ユーザー判断で掲載対象外: 3件
- 自己参照・空・fork・完全重複によりカード化しないもの: 8件

カードは、現在触ってほしいものを `LIVE` / `PoC`、古い試作・比較用バージョン・テスト名の成果物を `ARCHIVE` として分離する。

## ユーザー判断でRYOTA LABから除外した3件

以下は公開リポジトリ自体を削除したのではなく、RYOTA LABの表示対象から除外したもの。

| repository | 理由 |
|---|---|
| `kamijimatest` | 明示的な観光PRテスト。外部観光サイト画像の直接参照もあり、ポートフォリオ掲載対象外と判断 |
| `kamijimatoshi_v2` | ページ内に「テストサイト」と明記。公式HP由来画像を加工した動画も含むため掲載対象外と判断 |
| `minnnanomachiai` | `city_annalist` と同じ「みんなのまちAI風」系統の重複実装。1本に整理するため除外 |

`city_annalist` を残した理由は、データ出典・evidence/reproducibility・testsを含み、同テーマの公開成果物として説明責任と再現性が高いため。

## 現行 / PoCで追加した主な作品

| repository | portfolio title | status | 公開形態 |
|---|---|---|---|
| `360panorama` | 道後公園 時空360 | live | GitHub Pages |
| `star-wing` | STAR WING | live | GitHub Pages / Web Game |
| `localgovernant` | LOCAL GOVERNMENT INC. | poc | GitHub repository / local Node app |
| `ehime-tcg` | 愛媛TCG Web MVP | poc | GitHub repository / local Web MVP |
| `sarashina-chat` | Sarashina Chat | poc | GitHub repository; 公開デプロイURLは未確定 |

## Archive / experimentsで残す主な作品

`aidai`, `city_annalist`, `3d_tsunami`, `airportgolf`, `cancertest`, `childcarematsuyama`, `codextest_a`, `imabarityme`, `lpsample`, `map-of-salesman-in-matsuyama-and-toon`, `matsuyamastationaroundmap`, `openstreet`, `orange`, `qgisgaikokujin`, `qgisgaikokujin2`, `ryota.openstreet`, `sample_antigrabity`, `webgis`, `writepaper_public_co-creation_hubs` など。

## 自己参照・空・fork・完全重複でカード化しない8件

| repository | 理由 |
|---|---|
| `ryotamatsuki.github.io` | RYOTA LAB 自身。自己参照カードは作らない |
| `2d_rpg` | repository size 0。公開成果物本体なし |
| `budoto` | repository size 0。公開成果物本体なし |
| `AI_agent` | fork。自作成果物として数えない |
| `AI_counselor` | fork。自作成果物として数えない |
| `lawsy` | fork。自作成果物として数えない |
| `airportgolf1` | `airportgolf` と `index.html` が同一blob SHAの完全重複 |
| `test` | `map-of-salesman-in-matsuyama-and-toon` と旧 `index.html` が同一blob SHAの完全重複 |

## 継続確認候補

- `codextest_a`: repository名はtest系だが、独立したYouTube分析ダッシュボードとして残す。
- `ryota.openstreet`: `openstreet` と近いが完全一致ではないため現時点では両方残す。
- `qgisgaikokujin` / `qgisgaikokujin2`: v1/v2として残す。将来v1を整理可能。
- `cancertest`: 古い `http://maps.google.com/...` マーカー参照がありMixed Content確認候補。
- `lpsample` / `orange`: 外部画像URLを含むため、RYOTA LABではCSS fallbackを使用する。
- `aidai` / `sarashina-chat`: 確実な現行 `streamlit.app` URLを特定できないためGitHubをOpen先とする。

## `map-of-salesman-in-matsuyama-and-toon` 修正

旧 `index.html` 冒頭には、Googleストレージ容量警告の文字列が `<!DOCTYPE html>` より前に混入していた。これはHTML5文書として不正なentrypointだったため、元のFolium生成物を `legacy-map.html` として保存し、正常な `index.html` から不要プレフィックスを除去して読み込む方式へ修正する。これにより巨大な生成済み地図データを書き換えず、表示互換性を維持する。

## 権利・素材方針

- RYOTA LABの棚卸し追加では新しい第三者スクリーンショットを無断転載しない。
- 未許諾の自治体公式キャラクター、マスコット、第三者ロゴ・外部写真を新規カード画像として利用しない。
- 既存の `BRAND_ASSET_POLICY.md` を維持する。

## 到達性の扱い

GitHub APIのPages設定、リポジトリ内実装、既存デプロイ情報を突き合わせて登録する。外部URLの継続確認はLink Health workflowで扱う。
