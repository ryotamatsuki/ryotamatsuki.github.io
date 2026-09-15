# RYOTA LAB Catalog Refresh — 2026-09-15

更新日: 2026-09-15 (JST)

## Scope

2026-09-11のカタログ更新後に追加・更新された公開アプリ／ページを再確認し、RYOTA LABのruntime catalogとSelected Workを時点修正した。

今回の基準は、単なる新しさではなく次の5軸を重視する。

1. 完成度・公開状態
2. 技術的な幅
3. 実務・受託案件につながる能力の証明
4. 初見で価値が伝わること
5. RYOTA LABらしさ（地域課題を実際に触れるプロダクトへ変換すること）

## Featured / Selected Work

従来のFeatured:

1. 南海トラフ・本当に逃げられるかマップ
2. Ehime Mobility Resilience Lab
3. ふるさと納税ダッシュボード

2026-09-15以降のFeatured:

1. **松山 3D ハザードマップ** — PLATEAU / CesiumJS / DEM / ジオイド補正 / ハザード統合
2. **愛顔えひめの文化祭 AI案内** — 自然文構造化 / bounded Agentic Search / Semantic Command / 決定論的Tool実行
3. **松山城 3D WALK** — Three.js一人称3D / 公開資料・open-license evidence / 再生成可能GLB / accuracy audit

旧Featured3件は削除せず、通常のプロジェクト一覧に残す。

選定理由は、トップ3枠だけで「3D/GIS・データ統合」「生成AIの業務実装型PoC」「一般向けWeb/3D制作」の幅が伝わる構成にするため。

## New public apps after the 2026-09-11 refresh

### 松山城 3D WALK

- repository: `ryotamatsuki/matsuyamacastle-`
- public app: `https://ryotamatsuki.github.io/matsuyamacastle-/`
- GitHub repository metadataでPages有効を確認
- Vite / TypeScript / Three.js
- 本丸・内庭・穴蔵・木造各階を一人称で移動
- 3D model / rights audit / evidence matrix / accuracy classification / reproducibilityを公開
- 実測モデルではなく、B / C accuracyを明示する検証型復元

### NEON RIFT

- repository: `ryotamatsuki/yokoschlool`
- public app: `https://ryotamatsuki.github.io/yokoschlool/`
- GitHub repository metadataでPages有効を確認
- Canvas 2D / JavaScript / Pointer Events / Web Audio
- 3エリア、巨大機戦、二段ジャンプ、ダッシュ、自動照準、アイテム
- PC / mobile操作と回帰テストを実装

## Existing projects materially refreshed

### 愛顔えひめの文化祭 AI案内

単純なAIチャットとしてではなく、現在の実装に合わせて説明を更新。

- 構造化検索
- bounded Agentic Search
- Semantic Command / Flow Registry
- LLMは事実・件数を確定せず、固定Python ToolとJSONが確定
- 検索・推薦・候補外生成防止等のQA

### Ehime Tour Planner

現在のv2 architectureへ更新。

- Hybrid RAG: BM25 + Ruri-v3-30m + RRF
- LangGraph deterministic workflow
- Modal / vLLM / Sarashina2.2-3B-Instruct
- Structured Outputs + Pydantic validation
- partial patch regeneration

### Ehime Civil Works Monitor

現在のcanonical inventoryへ更新。

- 169 Project
- road / river / sabo / port / coast / agriculture / forestry / fishing-port等
- Project / Work Package / Asset reconciliation
- R5–R8 project-level annual budget audit
- provenance / validators / change detection

### 松山 3D ハザードマップ

現在の標高処理を反映。

- PLATEAU松山市2020年度LOD1
- 国土地理院DEM10B
- GSIGEO2011 Ver.2.2
- `h = H + N`による位置依存ジオイド補正
- 洪水・津波・土砂災害レイヤ

### 南海トラフ・本当に逃げられるかマップ

Analysis Core v4 / STEP 5時点へ更新。

- 沿岸14市町
- 津波分析対象1,090メッシュ
- cross-border shelter routing
- route tsunami exposure
- demand / capacity pressure
- 12 weight scenariosによるSensitivity / Robustness

### Ehime Mobility Resilience Lab

A1.13時点へ更新。

- 実GTFSベースのStress Test
- time-dependent Accessibility / Criticality
- destination switching
- 65+ / 75+ / 85+ Equity
- 7条件 × 16時間帯のRobustness / Uncertainty

## New repositories not added as standalone app cards

2026-09-11以降には研究論文リポジトリも追加されているが、単独の公開アプリ／ページではないものは今回のRYOTA LABアプリカタログには追加しない。研究活動への入口は既存の `Economic Theory Research Portfolio` を維持する。

例:

- `dynamic-tariff-choice-generative-ai`
- `public-climate-protection-private-production-redundancy`
- `supplier-competition-regional-policy-coordination`

## Catalog policy

- `projects.js` を監査済みbaselineとして維持する。
- 直近のdeployment / app追加 / Featured再評価は `project-detail-overrides.js` で反映する。
- forkベースのAI Agent / AI Counselor / Lawsyは、RYOTA LAB上でもfork由来であることを明示し、代表作にはしない。
- 公開アプリのない論文・研究リポジトリを、アプリとして見せるためだけに架空のdeployment URLへ結びつけない。
- Selected Workは最大3件とし、同系統のGISだけで占有しない。
