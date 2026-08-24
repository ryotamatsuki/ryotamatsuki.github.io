// Runtime / deployment caveats that may change more frequently than the audited
// product descriptions in project-details.js. Load this file after project-details.js.
(() => {
  const details = window.RYOTA_PROJECT_DETAILS;
  const tourPlanner = details?.["ehime-tour-planner"];
  if (!tourPlanner) return;

  tourPlanner.howToUse = [
    "日数・興味・旅の条件を入力して旅程生成を実行します。初回入力では推論用GPUとLLMを起動するコールドスタートが発生するため、生成開始まで4〜5分程度待つ必要があります。",
    "生成中は画面を閉じずにそのまま待ちます。モデルが起動状態なら、2回目以降の生成は初回より大幅に短くなり、数十秒程度で返ることがあります。",
    "日ごとのスポット、説明、根拠リンクを確認します。",
    "必要なら「2日目をゆったり」など修正条件を指定し、該当部分だけ作り直します。"
  ];

  tourPlanner.notes = "このアプリはPoCで、コストを抑えるため推論用GPUを常時起動していません。そのため初回入力、または長時間アクセスがなかった後は、モデル起動のコールドスタートで4〜5分程度かかります。故障やフリーズではなく検証環境の仕様です。起動状態が維持されていれば2回目以降は大幅に短縮します。旅行前には営業時間・休館日・運賃・交通障害・天候などを各リンク先の最新情報で再確認してください。";
})();
