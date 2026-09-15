// Runtime / deployment metadata that changes more frequently than the audited
// baseline catalog. Load after projects.js and project-details.js, before app.js.
(() => {
  const projects = Array.isArray(window.RYOTA_PROJECTS) ? window.RYOTA_PROJECTS : [];
  const details = window.RYOTA_PROJECT_DETAILS && typeof window.RYOTA_PROJECT_DETAILS === "object"
    ? window.RYOTA_PROJECT_DETAILS
    : (window.RYOTA_PROJECT_DETAILS = {});

  const patchProject = (id, patch) => {
    const project = projects.find(item => item.id === id);
    if (project) Object.assign(project, patch);
  };

  const addProject = (project) => {
    if (!projects.some(item => item.id === project.id)) projects.push(project);
  };

  const setDetail = (id, detail) => {
    details[id] = { ...(details[id] || {}), ...detail };
  };

  // Selected Work is re-evaluated as of 2026-09-15. The previous three remain
  // in the main catalog, but the top Bento now demonstrates 3D/GIS, applied AI,
  // and general-purpose interactive Web/3D production.
  ["ehime-evacuation-risk-map", "ehime-mobility-resilience-lab", "furusatonozei"].forEach(id => {
    patchProject(id, { featured: false });
  });

  // Existing projects whose implementation or deployment materially changed
  // after the August inventory.
  patchProject("ehime-kokubunsai-ai-poc", {
    description: "自然文を構造化し、固定Toolで事実を確定するイベント探索AI PoC。",
    host: "Streamlit",
    featured: 2,
    appUrl: "https://ehime-kokubunsai-ai-poc-9uqr82g7mpllijkeewhky8.streamlit.app/"
  });
  patchProject("ehime-tour-planner", {
    description: "Hybrid RAGと小型日本語LLMで、根拠URL付きの愛媛旅行プランを組み立てるAI PoC。",
    host: "Streamlit",
    appUrl: "https://ehime-tour-planner-iicqpkkbfs9zrcjba6a9at.streamlit.app/"
  });
  patchProject("ehime-evacuation-risk-map", {
    description: "沿岸14市町の津波曝露・徒歩避難・収容負荷を1,090メッシュで分析し、感度分析まで行うWebGIS。"
  });
  patchProject("ehime-mobility-resilience-lab", {
    description: "実GTFS・人口・目的地を使い、運休時のAccessibility・Equity・Criticality・頑健性を検証するWebGIS。"
  });
  patchProject("sarashina-chat", {
    status: "poc",
    host: "Streamlit",
    appUrl: "https://sarashina-chat-mdzjqhfkcqfcab7f7k6xry.streamlit.app/"
  });
  patchProject("bus-timelapse", {
    status: "poc",
    host: "Streamlit",
    appUrl: "https://bus-timelapse-nuvoqgec2jgpjcrjkjmd72.streamlit.app/"
  });
  patchProject("aidai", {
    status: "poc",
    host: "Streamlit",
    appUrl: "https://nbzesaufldq9tx8bk3odsn.streamlit.app/"
  });

  addProject({
    id: "ai-agent-mini-platformer",
    title: "Mini Platformer",
    description: "Streamlit上で遊べる、左右移動とジャンプのシンプルなミニ・プラットフォームゲーム。",
    categories: ["ゲーム"],
    status: "poc",
    host: "Streamlit",
    featured: false,
    visual: "game",
    appUrl: "https://aiagent-7yqnb8czd6n.streamlit.app/",
    repoUrl: "https://github.com/ryotamatsuki/AI_agent"
  });

  addProject({
    id: "ai-counselor",
    title: "メンタルケアボット",
    description: "複数の専門家視点を統合する対話フローを試したStreamlitベースのAI相談UI実験。",
    categories: ["AI"],
    status: "poc",
    host: "Streamlit",
    featured: false,
    visual: "chat",
    appUrl: "https://aicounselor-taaybua6bln.streamlit.app/",
    repoUrl: "https://github.com/ryotamatsuki/AI_counselor"
  });

  addProject({
    id: "lawsy",
    title: "Lawsy — Making Law Easy",
    description: "法令情報の調査とDeep Research型の探索を支援するStreamlitアプリの公開デプロイ。",
    categories: ["AI", "行政・防災"],
    status: "poc",
    host: "Streamlit",
    featured: false,
    visual: "chat",
    appUrl: "https://ctywvud7zrh2r5jkwaqjqr.streamlit.app/",
    repoUrl: "https://github.com/ryotamatsuki/lawsy"
  });

  addProject({
    id: "ehime-civil-works-monitor",
    title: "Ehime Civil Works Monitor",
    description: "愛媛県内169事業を、地図・一次資料・現在値・年度予算・変更履歴から追う非公式WebGIS。",
    categories: ["行政・防災", "GIS"],
    status: "live",
    host: "GitHub Pages",
    featured: false,
    visual: "map",
    appUrl: "https://ryotamatsuki.github.io/ehime-civil-works-monitor/",
    repoUrl: "https://github.com/ryotamatsuki/ehime-civil-works-monitor"
  });

  addProject({
    id: "economic-theory-research-dashboard",
    title: "Economic Theory Research Portfolio",
    description: "理論研究・訂正論文の現在地、科学的判定、投稿状況を公開用にサニタイズして俯瞰するダッシュボード。",
    categories: ["Research"],
    status: "live",
    host: "GitHub Pages",
    featured: false,
    visual: "chart",
    appUrl: "https://ryotamatsuki.github.io/economic-theory-research-dashboard/",
    repoUrl: "https://github.com/ryotamatsuki/economic-theory-research-dashboard"
  });

  addProject({
    id: "plateau-matsuyama",
    title: "松山 3D ハザードマップ",
    description: "PLATEAU建物とDEM・ジオイド補正地形に、洪水・津波・土砂災害を重ねるCesiumJS WebGIS。",
    categories: ["行政・防災", "GIS"],
    status: "live",
    host: "GitHub Pages",
    featured: 1,
    visual: "map",
    appUrl: "https://ryotamatsuki.github.io/plateau_matsuyama/",
    repoUrl: "https://github.com/ryotamatsuki/plateau_matsuyama"
  });

  addProject({
    id: "micro-racer-workshop",
    title: "MICRO RACER WORKSHOP",
    description: "4機種×9カテゴリのパーツを組み替え、3コースでCPUと競うミニ四駆風3Dブラウザゲーム。",
    categories: ["ゲーム"],
    status: "live",
    host: "Web Game",
    featured: false,
    visual: "game",
    appUrl: "https://ryotamatsuki.github.io/racegame/",
    repoUrl: "https://github.com/ryotamatsuki/racegame"
  });

  addProject({
    id: "micro-racer-astra",
    title: "MICRO RACER / ASTRA WORKSHOP",
    description: "4周・4レーン循環と共通走行物理を備えた、MICRO RACERの別実装・改良版3Dレースゲーム。",
    categories: ["ゲーム"],
    status: "live",
    host: "Web Game",
    featured: false,
    visual: "game",
    appUrl: "https://ryotamatsuki.github.io/racegameastra/",
    repoUrl: "https://github.com/ryotamatsuki/racegameastra"
  });

  addProject({
    id: "stillwater-lake",
    title: "静かな湖畔 — Stillwater",
    description: "森林・湿地・湖・小島を自由に歩き、舟でも移動できるThree.js製3D散策ワールド。",
    categories: ["ゲーム"],
    status: "live",
    host: "Web Game",
    featured: false,
    visual: "game",
    appUrl: "https://ryotamatsuki.github.io/-astra-wetland-lake/",
    repoUrl: "https://github.com/ryotamatsuki/-astra-wetland-lake"
  });

  addProject({
    id: "rural-house-walk",
    title: "郷野の家 — Rural House Walk",
    description: "昭和中期の日本の木造住宅と田園生活を着想源にした、完全オリジナルの3D住宅散策アプリ。",
    categories: ["ゲーム"],
    status: "live",
    host: "Web Game",
    featured: false,
    visual: "game",
    appUrl: "https://ryotamatsuki.github.io/house-/",
    repoUrl: "https://github.com/ryotamatsuki/house-"
  });

  addProject({
    id: "matsuyama-castle-3d-walk",
    title: "松山城 3D WALK",
    description: "公的資料と権利確認済み資料を基に、本丸・天守内部を一人称で歩ける検証型3D Webアプリ。",
    categories: ["教育", "ゲーム"],
    status: "live",
    host: "Web Game",
    featured: 3,
    visual: "game",
    appUrl: "https://ryotamatsuki.github.io/matsuyamacastle-/",
    repoUrl: "https://github.com/ryotamatsuki/matsuyamacastle-"
  });

  addProject({
    id: "neon-rift",
    title: "NEON RIFT",
    description: "3エリアと巨大機戦、二段ジャンプ・無敵ダッシュ・自動照準を備えたオリジナル2Dアクション。",
    categories: ["ゲーム"],
    status: "live",
    host: "Web Game",
    featured: false,
    visual: "game",
    appUrl: "https://ryotamatsuki.github.io/yokoschlool/",
    repoUrl: "https://github.com/ryotamatsuki/yokoschlool"
  });

  setDetail("ehime-kokubunsai-ai-poc", {
    problem: "イベント情報を一覧や検索フォームだけで探すと、日時・地域・料金・対象・屋内外など複数条件を自然に組み合わせにくい。",
    purpose: "自然文を検証済みの意味表現へ変換し、LLMに事実を生成させず、決定論的な検索・推薦Toolからイベント候補と事実を返すAI案内PoCを検証します。",
    features: ["日付・地域・料金・対象・屋内外等を組み合わせる構造化検索", "曖昧な探索だけをPlanner→固定Tool→Writerへ渡すbounded Agentic Search", "Semantic CommandとFlow Registryによる自然文の構造化", "イベント名・日時・場所・料金・件数をJSONとPython側で確定", "検索・参加案内・推薦・候補外生成防止を含む100件超のQA"],
    howToUse: ["探したいイベント条件を自然文で入力します。", "条件に合う候補と、構造化データから確定した日時・場所・料金等を確認します。", "『その中で無料だけ』『2番目はどこ？』のように会話を続けて絞り込みます。"],
    dataSources: ["PoC用の架空イベント30件", "PoC用一般FAQ", "検索用メタデータ"],
    tech: ["Python", "Streamlit", "Modal", "Sarashina2.2-3B-Instruct", "Agentic Search", "Semantic Command"],
    notes: "技術検証用PoCで、イベント30件とURLは架空です。愛媛県・愛顔えひめの文化祭2028の公式サービスではありません。"
  });

  setDetail("ehime-tour-planner", {
    problem: "観光プラン生成では、検索根拠を保ったまま複数日の旅程を組み、部分修正にも耐えつつURL hallucinationを抑える必要があります。",
    purpose: "BM25と日本語dense retrievalをRRFで統合するHybrid RAGと小型日本語LLMを組み合わせ、根拠URLを保持した愛媛旅行プラン生成を検証します。",
    features: ["BM25 + Ruri-v3-30m + Reciprocal Rank FusionによるHybrid RAG", "LangGraphによる決定的Workflow", "vLLM Structured OutputsとPydanticによる構造・意味検証", "4日以上の旅程分割と日単位Patch再生成", "検索で得たURL以外をPython側で除去"],
    howToUse: ["日数・興味・旅の条件を入力して旅程生成を実行します。初回入力では推論用GPUのコールドスタートが発生する場合があります。", "日ごとのスポット、説明、根拠リンクを確認します。", "必要なら『2日目をゆったり』など修正条件を指定し、該当部分だけ作り直します。"],
    dataSources: ["いよ観ネット等の公開Web情報", "Tavily検索結果", "ユーザーが入力した旅行条件"],
    tech: ["Python", "Streamlit", "LangGraph", "BM25", "Ruri-v3-30m", "Modal", "vLLM", "Sarashina2.2-3B-Instruct", "Pydantic"],
    notes: "PoCのため推論用GPUを常時起動しておらず、コールドスタート時は待ち時間が発生します。営業時間・休館日・運賃・交通障害・天候等は旅行前に根拠リンク先の最新情報を再確認してください。"
  });

  setDetail("ehime-evacuation-risk-map", {
    problem: "津波浸水域、人口、避難場所、徒歩経路、避難先の収容力が別々に公開されており、地域ごとの避難困難度を一体で検討しにくい。",
    purpose: "愛媛県沿岸14市町を500mメッシュで分析し、津波曝露、徒歩アクセス、経路曝露、収容負荷を重ねて政策上の優先候補を探索します。",
    features: ["津波分析対象1,090メッシュの統合分析", "市町境を越える避難先を含む歩行ネットワークルーティング", "経路上の津波浸水曝露と避難需要・収容負荷の計算", "5要素スコアと12シナリオのSensitivity / Robustness", "欠損・経路未成立を低リスクへ丸めないQA設計"],
    howToUse: ["地図上で沿岸地域と分析メッシュを確認します。", "各メッシュの津波曝露、徒歩経路、避難先、収容負荷、スコア状態を確認します。", "感度分析で重み変更に対する優先順位の頑健性を確認します。"],
    dataSources: ["愛媛県・市町の防災公開資料", "国勢調査等の人口データ", "OpenStreetMap歩行ネットワーク", "公表避難場所・収容人数"],
    tech: ["Python", "GIS", "Network analysis", "GitHub Actions", "GitHub Pages", "Playwright"],
    notes: "公開データによる政策分析PoCです。実際の避難行動や安全を保証せず、災害時の判断には自治体の最新公式情報を使用してください。"
  });

  setDetail("ehime-mobility-resilience-lab", {
    problem: "交通網の一部が止まったとき、単純な路線図だけでは誰がどの時間帯にどの目的地へ行きにくくなるかを定量的に把握できません。",
    purpose: "実GTFS・道路・人口・病院・避難所等を組み合わせ、運休やネットワーク障害時のAccessibility、Criticality、Equityと結論の頑健性を検証します。",
    features: ["大洲市ぐるりんおおず実GTFSを用いたBaseline / 運休Stress Test", "06:00〜21:00の時間帯別AccessibilityとRoute / Trip Criticality", "病院・避難所等の目的地切替と65+ / 75+ / 85+ Equity分析", "7条件×16時間帯のCriticality頑健性検証", "公式値・加工値・モデル推計値・ユーザー仮定のprovenance区分"],
    howToUse: ["Baselineで平常時の到達可能性を確認します。", "運休・障害シナリオへ切り替え、時間帯や目的地ごとの影響を比較します。", "Criticality、Equity、Robustnessを確認し、どの条件で結論が変わるかを確認します。"],
    dataSources: ["実GTFS", "OpenStreetMap", "100m人口", "公式確認した病院・避難所等"],
    tech: ["Python", "GTFS", "Network analysis", "WebGIS", "JavaScript", "GitHub Pages"],
    notes: "南海トラフ等の実被害を予測するシステムではありません。未計算・未確認データをゼロ影響や実績値として表示しない方針です。"
  });

  setDetail("ai-agent-mini-platformer", {
    problem: "短い操作説明だけで遊べる小規模ブラウザゲームを、Streamlit上でも成立させられるかを試すための実験です。",
    purpose: "左右移動とジャンプだけの最小プラットフォーマーをStreamlitへ組み込み、公開デプロイまで含めた軽量ゲームUIを検証します。",
    features: ["矢印キーによる左右移動", "Spaceキーによるジャンプ", "Streamlit上でブラウザから直接プレイ"],
    howToUse: ["アプリを開き、ゲーム画面をクリックしてフォーカスします。", "矢印キーで移動し、Spaceキーでジャンプします。"],
    dataSources: ["ゲーム内のステージ・物理定義"],
    tech: ["Python", "Streamlit", "Browser game"],
    notes: "forkベースの実験です。RYOTA LABでは公開Streamlitデプロイへの入口として掲載しています。"
  });

  setDetail("ai-counselor", {
    problem: "相談内容を単一の回答スタイルだけで処理せず、複数の専門家役の視点を一つの対話UIへ統合する実装を試す必要がありました。",
    purpose: "Streamlitと生成AI APIを組み合わせ、相談タイプ・入力フォーム・会話履歴・まとめ表示を備えた対話アプリの構成を検証します。",
    features: ["相談タイプと選択式フォーム", "会話履歴を保持するチャットUI", "複数視点を統合した回答生成", "会話内容のまとめレポート"],
    howToUse: ["相談タイプを選び、必要に応じて選択式フォームへ入力します。", "メッセージ欄から相談内容を送り、会話を続けます。", "必要に応じてまとめレポートを確認します。"],
    dataSources: ["利用者が入力した相談内容", "会話履歴"],
    tech: ["Python", "Streamlit", "Gemini API", "Session State"],
    notes: "forkベースの実験的アプリです。医療機関による診断・治療や緊急対応の代替ではなく、個人情報・機密情報の入力は避けてください。"
  });

  setDetail("lawsy", {
    problem: "法令調査では条文・関連制度・周辺情報が分散し、通常のキーワード検索だけでは調査の文脈を組み立てにくい場合があります。",
    purpose: "法令Deep Researchを志向するOSSアプリをStreamlitで動かし、検索と生成AIを組み合わせた法令調査UIを試せる入口を提供します。",
    features: ["法令・関連情報の検索フロー", "生成AIを用いたDeep Research型の整理", "Streamlitによる対話型UI"],
    howToUse: ["調べたい法令・制度上の論点を入力します。", "提示された検索・整理結果を確認し、必要に応じて追加の観点で調べます。"],
    dataSources: ["法令・Web検索で取得する公開情報"],
    tech: ["Python", "Streamlit", "LLM", "Web Search"],
    notes: "forkベースです。法的判断を確定するサービスではないため、実務利用時は必ず法令原文・所管省庁資料等の一次情報を確認してください。"
  });

  setDetail("ehime-civil-works-monitor", {
    problem: "公共土木事業は事業名、位置、総事業費、進捗、B/C、年度予算、過去時点の資料が分散し、同じ事業を継続的に追うのが難しい。",
    purpose: "愛媛県内の公共土木事業をProject単位でreconcileし、地図と一次資料を起点に現在値・履歴・変更・年度予算を確認できる非公式WebGISを構築します。",
    features: ["道路・河川・砂防・港湾・農業農村・治山・漁港等169 Projectのcanonical inventory", "Cost / Schedule / Progressの履歴と変更ラベル", "R5〜R8のproject-level年度予算監査と累計投資・B/C表示", "Project / Work Package / Assetを区別したreconciliation", "フィールド単位の出典・provenanceと再現可能なvalidator"],
    howToUse: ["地図・検索・カテゴリ・Data Depthから事業を選びます。", "詳細ページで現在値、履歴、年度予算、一次資料を確認します。", "変更ラベルと概略位置は元資料・accuracy表記を確認した上で読みます。"],
    dataSources: ["愛媛県・国土交通省・市町等の一次資料", "公共事業評価資料", "R5〜R8予算・配分資料", "国土地理院地図"],
    tech: ["TypeScript", "WebGIS", "Python validators", "Vitest", "ESLint", "GitHub Actions", "GitHub Pages"],
    notes: "2026年9月時点で169 Projectを掲載していますが、愛媛県内公共事業の公式な全件数を意味しません。概略点を含み、不明値は推測せずnull等で保持します。"
  });

  setDetail("economic-theory-research-dashboard", {
    problem: "複数の理論研究・訂正論文を並行して進めると、研究上の現在地、科学的判定、投稿状況、次のゲートを一覧で把握しにくくなります。",
    purpose: "公開可能な情報だけにサニタイズし、研究ポートフォリオの進捗・優先度・研究フローを一つのWebダッシュボードで俯瞰できるようにします。",
    features: ["研究案件の一覧・フィルタ", "研究・投稿パイプラインの可視化", "要対応項目と現在地の表示", "各研究の詳細ページへの遷移"],
    howToUse: ["上部のPortfolio Snapshotで全体の状況を確認します。", "優先区分・種別・ステージ等で絞り込みます。", "個別案件を開き、公開可能な範囲の進捗と次の作業を確認します。"],
    dataSources: ["公開用にサニタイズした研究ポートフォリオJSON"],
    tech: ["HTML", "CSS", "JavaScript", "GitHub Pages"],
    notes: "公開版では内部の投稿ID等を公開せず、研究管理情報をサニタイズして表示しています。"
  });

  setDetail("plateau-matsuyama", {
    problem: "2D地図だけでは、建物・地形と洪水、津波、土砂災害の位置関係を立体的に把握しにくい。",
    purpose: "松山市のPLATEAU建物LOD1と国土地理院DEM・ジオイドモデル・ハザード配信をCesiumJS上で統合し、3Dで地域の地形と災害リスクを探索できるようにします。",
    features: ["PLATEAU松山市2020年度LOD1建物の3D表示", "DEM10BとGSIGEO2011による位置依存の標高・ジオイド補正", "洪水・津波・土砂災害レイヤー切替", "建物属性・背景地図・透明度・主要地点移動", "スマートフォン向け設定パネルとローカル標高キャッシュ"],
    howToUse: ["3D地図を操作して確認したい地域へ移動します。", "ハザードレイヤーと背景地図を切り替え、建物・地形との位置関係を確認します。", "必要に応じて建物を選択して属性を確認します。"],
    dataSources: ["PLATEAU 松山市2020年度3D Tiles", "国土地理院DEM10B", "GSIGEO2011 Ver.2.2", "国土地理院ハザード配信"],
    tech: ["CesiumJS", "3D Tiles", "Python", "GitHub Actions", "GitHub Pages"],
    notes: "建物は2020年度時点で、ハザードの基準時点とは一致しません。測量・構造物高さの精密計測・実際の避難判断には使用せず、最新の公式情報を確認してください。"
  });

  setDetail("micro-racer-workshop", {
    problem: "パーツ交換の見た目だけでなく、ギヤ比・タイヤ径・重量・抵抗・コース形状まで走行差へ反映する模型レースゲームをブラウザで成立させる必要がありました。",
    purpose: "4機種と9カテゴリのパーツを組み替え、同じ装着データから3D表現と走行パラメータを更新するミニ四駆風ワークショップ兼レースゲームを作ります。",
    features: ["4機種と9カテゴリのパーツ交換", "分解・再組立・車輪テスト", "3コース・4レーン・CPU3台とのレース", "5種類のカメラ", "ローカル保存とスマホ操作"],
    howToUse: ["ガレージでマシンとパーツを選び、必要なら分解表示や車輪テストを行います。", "コースを選びCPU3台とのレースまたはタイムアタックを開始します。", "結果を見ながらセッティングを調整します。"],
    dataSources: ["ゲーム内のパーツ・コース・物理パラメータ"],
    tech: ["React", "TypeScript", "Three.js", "Vite", "Playwright", "Web Audio"],
    notes: "外部3Dモデルや画像素材に依存せず、車体・コース・背景は手続き生成しています。"
  });

  setDetail("micro-racer-astra", {
    problem: "複数レーンの距離差や接触時の完走判定があると、レース結果がセッティング性能ではなく実装上の不公平に左右されます。",
    purpose: "MICRO RACERの別実装として、全車が4周で4レーンを一度ずつ通る循環方式と共通物理を採用し、より公平な自動レースを検証します。",
    features: ["4機種・27パーツ・3コース", "4周で全4レーンを巡回するレーンチェンジ", "CPUとプレイヤーで共通の走行物理", "5カメラとローカル保存", "desktop/mobileのPlaywright受入試験"],
    howToUse: ["ガレージでパーツを比較して装着します。", "レースを開始すると各車が周回ごとにレーンを移り、4周で全レーンを走ります。", "結果を確認し、パーツ構成を変えて再試行します。"],
    dataSources: ["ゲーム内のマシン・パーツ・コース・物理定義"],
    tech: ["React", "TypeScript", "Three.js", "Vite", "Playwright"],
    notes: "2026年9月にGitHub Pages公開と公開URLのブラウザ受入確認まで実施した改良版です。"
  });

  setDetail("stillwater-lake", {
    problem: "静かな自然環境を、既成の3D素材に頼らずブラウザだけで自由散策できるワールドとして構成する実験を行いました。",
    purpose: "森林・湿地・湖・小島・小屋・舟を含む3D環境を手続き生成し、PCとスマートフォンで散策できる軽量なThree.jsワールドを作ります。",
    features: ["森林と湿地に囲まれた湖畔の自由散策", "7つの視点への移動と歩行/眺望モード", "舟で小島へ渡る移動", "反射水面・草木の風揺れ・魚・鳥・煙などの環境表現", "LODと自動畫質調整"],
    howToUse: ["PCはWASD/矢印キー、スマホは左スティックで移動します。", "画面ドラッグで視点を動かし、散策案内から視点へ移動できます。", "桟橋先端では舟に乗って小島へ渡れます。"],
    dataSources: ["手続き生成した地形・GLB・環境パラメータ"],
    tech: ["React", "Three.js", "Vite", "Procedural 3D", "GitHub Pages"],
    notes: "自動検査と公開は完了していますが、実機GPUごとのFPSを保証するものではありません。"
  });

  setDetail("rural-house-walk", {
    problem: "日本の田園住宅の雰囲気を、特定作品の間取り・外観・意匠を複製せず、完全オリジナルの3D空間として散策できる形にする必要がありました。",
    purpose: "昭和中期の木造住宅・田園生活に見られる一般的要素を組み合わせ、住宅内部、縁側、庭、畑、小道をブラウザで歩ける独自3Dワールドとして制作します。",
    features: ["一人称で住宅内外を自由移動", "建具の開閉", "縁側・庭・畑・物置・家具を含む生活空間", "PCとスマートフォンの両操作", "シーン形状と簡易テクスチャをコード生成"],
    howToUse: ["PCはWASD/矢印キー、スマホは仮想スティックで移動します。", "マウスまたはスワイプで視点を動かします。", "建具の近くではFキーを使って開閉します。"],
    dataSources: ["コード生成したオリジナル3D形状・簡易テクスチャ"],
    tech: ["Three.js", "HTML", "CSS", "JavaScript", "GitHub Pages"],
    notes: "特定の映画・アニメ・キャラクター・実在展示施設の名称、間取り、外観、家具配置、意匠を複製していない独自設計です。"
  });

  setDetail("matsuyama-castle-3d-walk", {
    problem: "松山城天守をWeb上で歩ける形にする際、見栄えだけでなく、再利用可能な資料だけを用い、史実確認済み部分と推定部分を区別する必要があります。",
    purpose: "公的資料の事実記述とPublic Domain / CC BY資料を建築構造の証拠として使い、本丸・内庭・穴蔵・木造各階を一人称で歩ける検証型3D Webアプリと再生成可能なモデルを公開します。",
    features: ["本丸から天守3階までの一人称ウォークスルー", "PCのWASD/マウスとスマートフォンの仮想操作", "Vite / TypeScript / Three.jsによる軽量3D実装", "部位ごとのAccuracy A-ratio / B / C管理", "GLBモデル・source manifest・権利監査・再現性検証を公開"],
    howToUse: ["PCはWASDとマウス、スマートフォンは左スティックと右ドラッグで移動します。", "本丸から入口・穴蔵へ進み、階段を歩いて各階を巡ります。", "再現精度を確認したい場合はGitHubのAccuracy・Evidence・Rights文書を参照します。"],
    dataSources: ["松山市等の公的資料に記載された建築事実", "Public Domain / CC0 / CC BYの権利確認済み資料", "自作のprocedural 3Dモデル"],
    tech: ["Vite", "TypeScript", "Three.js", "GLB", "Playwright", "GitHub Actions", "GitHub Pages"],
    notes: "実物の測量モデルではありません。正確な柱芯・階高・窓bay座標・階段位置等にはC判定の推定が残り、B-GRADE VERIFICATION PASSは未宣言です。"
  });

  setDetail("neon-rift", {
    problem: "外部ゲーム素材や重いゲームエンジンに依存せず、PCとスマートフォンの双方で成立する横スクロールアクションをブラウザだけで構成する必要がありました。",
    purpose: "オリジナルの描画・効果音・ゲームロジックを使い、移動・二段ジャンプ・無敵ダッシュ・射撃・アイテム・ボス戦を備えた2Dアクションを公開します。",
    features: ["3エリアと各エリアの巨大機戦", "二段ジャンプ・無敵ダッシュ・自動射撃/自動照準", "拡散弾・貫通弾とシールド回復アイテム", "PCと縦横スマートフォン向け操作", "実ゲームロジックを使った進行・入力・ダメージ回帰テスト"],
    howToUse: ["PCはA/Dまたは左右キーで移動し、Space/Wで二段ジャンプ、Shift/Xでダッシュします。", "スマートフォンでは左右・JUMP・DASHボタンを使い、横画面を推奨します。", "各エリアを進み、チェックポイントと巨大機戦を攻略します。"],
    dataSources: ["本プロジェクト用に新規制作したゲームロジック・図形描画・Web Audio効果音"],
    tech: ["HTML", "CSS", "JavaScript", "Canvas 2D", "Pointer Events", "Web Audio", "GitHub Pages"],
    notes: "コード・図形キャラクター・背景・敵・エフェクト・合成効果音は本プロジェクト用のオリジナルです。実機iPhone / Androidの最終確認は別途必要です。"
  });

  setDetail("sarashina-chat", {
    howToUse: ["Streamlit公開アプリを開きます。", "チャット欄へ日本語を入力し、Modal上のSarashina推論バックエンドから返る回答を確認します。", "必要に応じてサイドバーから会話履歴をリセットします。"],
    notes: "試験用チャットです。公開Streamlitから直接試せますが、個人情報・機密情報・未公開情報を入力しないでください。"
  });

  setDetail("bus-timelapse", {
    howToUse: ["Streamlit公開アプリを開きます。", "対象路線・時刻などを選び、時刻表から補間されたバスの動きを地図上で再生します。", "リアルタイム位置ではなくダイヤ上の運行計画として確認します。"],
    notes: "公開Streamlitは静的GTFSに基づくタイムラプスです。リアルタイムの車両位置を示すものではありません。"
  });

  setDetail("aidai", {
    howToUse: ["Streamlit公開アプリを開きます。", "Raw Data、Calorie Distribution、Nutrition Totals、Meal Behavior等のタブを切り替えます。", "食事記録と食行動ログを時系列で比較します。"],
    notes: "公開Streamlitから直接閲覧できます。分析用の試作ダッシュボードであり、医療・栄養指導を行うものではありません。"
  });
})();