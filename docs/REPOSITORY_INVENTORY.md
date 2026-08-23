# RYOTA LAB Public Repository Inventory

監査日: 2026-08-23 (JST)

## 目的

RYOTA LAB の掲載漏れを防ぐため、`ryotamatsuki` 所有の**公開リポジトリ**を母集団として棚卸しした。非公開リポジトリの名称・内容はこの公開文書には記録しない。

## 集計

- 公開リポジトリ: 49件（RYOTA LAB 自身を含む）
- RYOTA LAB 掲載カード: 41件
- 棚卸し前から掲載済み: 14件
- 今回追加: 27件
- カード化しない公開リポジトリ: 8件

カードは、現在触ってほしいものを `LIVE` / `PoC`、古い試作・比較用バージョン・テスト名の成果物を `ARCHIVE` として分離する。公開物を網羅しつつ、メイン一覧を過密にしないことを優先した。

## 今回追加した27件

### 現行 / PoC

| repository | portfolio title | status | 公開形態 |
|---|---|---|---|
| `360panorama` | 道後公園 時空360 | live | GitHub Pages |
| `star-wing` | STAR WING | live | GitHub Pages / Web Game |
| `localgovernant` | LOCAL GOVERNMENT INC. | poc | GitHub repository / local Node app |
| `ehime-tcg` | 愛媛TCG Web MVP | poc | GitHub repository / local Web MVP |
| `sarashina-chat` | Sarashina Chat | poc | GitHub repository;公開デプロイURLは今回確定できず |

### Archive / experiments

| repository | portfolio title | 公開形態 |
|---|---|---|
| `aidai` | 食事データダッシュボード | GitHub repository / Streamlit source |
| `city_annalist` | みんなのまちAI風 MVP | GitHub repository / Streamlit + FastAPI source |
| `minnnanomachiai` | みんなのまちAI風 | GitHub repository / Streamlit + FastAPI source |
| `3d_tsunami` | 津波浸水想定区域 3D | GitHub Pages |
| `airportgolf` | 松山空港・ゴルフ場 到達圏マップ | GitHub Pages |
| `cancertest` | がん検診対応医療機関マップ | GitHub Pages |
| `childcarematsuyama` | 松山 子育て施設 到達圏マップ | GitHub Pages |
| `codextest_a` | 愛媛県公式YouTube 分析ダッシュボード | GitHub Pages |
| `imabarityme` | 今治 観光到達圏マップ | GitHub Pages |
| `kamijimatest` | 上島町 観光PR Prototype | GitHub Pages |
| `kamijimatoshi_v2` | 上島町 投資誘致サイト Prototype | GitHub Pages |
| `lpsample` | 愛媛かんきつ LP Prototype A | GitHub Pages |
| `map-of-salesman-in-matsuyama-and-toon` | 松山・東温 巡回ルートマップ | GitHub Pages |
| `matsuyamastationaroundmap` | JR松山駅周辺 整備マップ | GitHub Pages |
| `openstreet` | OpenStreet × おでかけウォッチャー Map | GitHub Pages |
| `orange` | 愛媛柑橘 LP Prototype B | GitHub Pages |
| `qgisgaikokujin` | 外国人関連データ WebGIS v1 | GitHub Pages |
| `qgisgaikokujin2` | 外国人関連データ WebGIS v2 | GitHub Pages |
| `ryota.openstreet` | OpenStreet Map Variant | GitHub Pages |
| `sample_antigrabity` | Super Pixel Adventure | GitHub repository / static game source |
| `webgis` | GIS Visualization Tool | GitHub Pages |
| `writepaper_public_co-creation_hubs` | Public Co-creation Hubs Research | GitHub repository / research files |

## カード化しなかった8件

以下は「作った公開物の掲載漏れ」ではなく、自己参照・空・fork・完全重複と判断した。削除や非公開化は行っていない。

| repository | 理由 |
|---|---|
| `ryotamatsuki.github.io` | RYOTA LAB 自身。自己参照カードは作らない |
| `2d_rpg` | repository size 0。公開成果物本体なし |
| `budoto` | repository size 0。公開成果物本体なし |
| `AI_agent` | fork。RYOTA LABでは自作成果物として数えない |
| `AI_counselor` | fork。RYOTA LABでは自作成果物として数えない |
| `lawsy` | fork。RYOTA LABでは自作成果物として数えない |
| `airportgolf1` | `airportgolf` と `index.html` が同一blob SHAの完全重複 |
| `test` | `map-of-salesman-in-matsuyama-and-toon` と `index.html` が同一blob SHAの完全重複 |

## ユーザー判断が必要な候補

今回は独自内容があるため**勝手に除外せず、すべて Archive に掲載した**。不要ならこの一覧から削除する。

1. `kamijimatest`
   - repository description自体がテスト用途。
   - ページは動的に観光カードを生成するが、一部画像を外部の観光サイトURLから直接参照している。
   - RYOTA LAB側では画像を転載せずCSS fallbackのみ使用。

2. `kamijimatoshi_v2`
   - ページ内に「テストサイト」と明記。
   - Hero動画は上島町公式HP由来画像をVeo3で動画化した旨がページに記載されているため、公開継続・ポートフォリオ掲載とも権利面を人間判断した方がよい。
   - RYOTA LAB側では当該動画・画像を転載しない。

3. `codextest_a`
   - repository名はtest系だが、愛媛県公式YouTube分析ダッシュボードとして独立したUI・API入力・集計表示を持つためArchiveへ掲載。

4. `ryota.openstreet`
   - `openstreet` と見た目・凡例・データ構成が非常に近い。blobは完全一致ではないため機械的な重複除外はしなかった。

5. `qgisgaikokujin` / `qgisgaikokujin2`
   - 同テーマのv1/v2として両方残した。旧版を不要と判断するならv1を削除可能。

6. `city_annalist` / `minnnanomachiai`
   - 同じ「みんなのまちAI風」コンセプトの別実装・版として両方残した。

7. `map-of-salesman-in-matsuyama-and-toon`
   - 実体はFoliumルート地図だが、`index.html` 冒頭にGoogleストレージ警告文が混入している。地図本体と別に修正候補。

8. `cancertest`
   - 地図本体は存在するが、マーカーアイコンに `http://maps.google.com/...` を使う古い実装があり、HTTPS環境では一部Mixed Contentの影響を受ける可能性がある。

9. `lpsample` / `orange`
   - 外部画像URLを含む古いLP試作。RYOTA LABのカードではそれらを転載せずCSS fallbackのみ使う。

10. `aidai` / `sarashina-chat`
   - Streamlitソースは公開されているが、今回のGitHub棚卸しでは確実な公開 `streamlit.app` URLを特定できなかったため、GitHubリポジトリをOpen先とした。

## 権利・素材方針

- RYOTA LABの新規カードには今回新しいスクリーンショットを追加していない。
- 未許諾の自治体公式キャラクター、マスコット、第三者ロゴ・外部写真をサムネイルとして転載していない。
- 既存の `BRAND_ASSET_POLICY.md` を維持する。
- `kamijimatest`、`kamijimatoshi_v2`、`lpsample`、`orange` はリンク先ページ側に外部由来素材があるため、カード画像化する前に別途rights reviewを行う。

## 到達性の扱い

GitHub APIの `has_pages`、リポジトリ内の実装ファイル、既存デプロイ情報を突き合わせて登録した。この実行環境からGitHub Pages全URLをブラウザ実査する経路は安定しなかったため、外部URLの継続監視は既存の週次/手動 Link Health workflowに委ねる。

新規追加後も `projects.js` の静的契約により、GitHub Pages / Streamlit / Web App / Web Game のカードは `appUrl` 必須、GitHub repository-onlyカードだけ `appUrl: null` を許容する。
