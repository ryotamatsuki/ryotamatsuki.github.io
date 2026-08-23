(() => {
  const projects = Array.isArray(window.RYOTA_PROJECTS) ? window.RYOTA_PROJECTS : [];
  const featuredGrid = document.getElementById("featured-grid");
  const projectGrid = document.getElementById("project-grid");
  const archiveGrid = document.getElementById("archive-grid");
  const emptyState = document.getElementById("empty-state");
  const searchInput = document.getElementById("project-search");
  const filterButtons = [...document.querySelectorAll(".filter-button")];
  const archiveToggle = document.getElementById("archive-toggle");

  let activeFilter = "all";
  let query = "";

  const escapeHTML = (value = "") => String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

  const visualClass = (visual) => `visual-${visual || "map"}`;
  const statusLabel = (status) => status === "live" ? "LIVE" : status === "poc" ? "PoC" : "ARCHIVE";

  function mainUrl(project) {
    return project.appUrl || project.repoUrl || "#";
  }

  function renderFeatured() {
    const featured = projects
      .filter(p => p.featured && p.status !== "archive")
      .sort((a, b) => Number(a.featured) - Number(b.featured))
      .slice(0, 3);

    featuredGrid.innerHTML = featured.map(project => `
      <a class="featured-card" href="${escapeHTML(mainUrl(project))}" target="_blank" rel="noopener" aria-label="${escapeHTML(project.title)}を開く">
        <div class="featured-visual ${visualClass(project.visual)}"></div>
        <div class="featured-content">
          <div class="badge-row">
            <span class="badge category">${escapeHTML(project.categories[0] || "Project")}</span>
            <span class="badge ${project.status === "live" ? "live" : "poc"}">${statusLabel(project.status)}</span>
          </div>
          <h3>${escapeHTML(project.title)}</h3>
          <p>${escapeHTML(project.description)}</p>
          <span class="open-link">Open <span aria-hidden="true">→</span></span>
        </div>
      </a>
    `).join("");
  }

  function cardTemplate(project) {
    const openUrl = mainUrl(project);
    return `
      <article class="project-card" data-project-id="${escapeHTML(project.id)}">
        <a class="project-thumb" href="${escapeHTML(openUrl)}" target="_blank" rel="noopener" aria-label="${escapeHTML(project.title)}を開く">
          <div class="thumb-art ${visualClass(project.visual)}"></div>
          <span class="badge status ${project.status === "live" ? "live" : "poc"}">${statusLabel(project.status)}</span>
          <span class="badge host">${escapeHTML(project.host || "GitHub")}</span>
        </a>
        <div class="project-body">
          <h3>${escapeHTML(project.title)}</h3>
          <p>${escapeHTML(project.description)}</p>
          <div class="card-actions">
            <a href="${escapeHTML(openUrl)}" target="_blank" rel="noopener">Open <span aria-hidden="true">→</span></a>
            <a class="github-link" href="${escapeHTML(project.repoUrl)}" target="_blank" rel="noopener" aria-label="${escapeHTML(project.title)}のGitHubリポジトリ">◉ GitHub</a>
          </div>
        </div>
      </article>
    `;
  }

  function renderProjects() {
    const visible = projects.filter(project => {
      if (project.status === "archive") return false;
      const filterMatch = activeFilter === "all" || project.categories.includes(activeFilter);
      const haystack = `${project.title} ${project.description} ${project.categories.join(" ")}`.toLowerCase();
      const queryMatch = !query || haystack.includes(query);
      return filterMatch && queryMatch;
    });

    projectGrid.innerHTML = visible.map(cardTemplate).join("");
    emptyState.hidden = visible.length > 0;
  }

  function renderArchive() {
    const archived = projects.filter(project => project.status === "archive");
    archiveGrid.innerHTML = archived.map(cardTemplate).join("");
  }

  function updateStats() {
    const publicProjects = projects.filter(p => p.status !== "archive");
    document.getElementById("project-count").textContent = publicProjects.length;
    document.getElementById("live-count").textContent = publicProjects.filter(p => p.status === "live").length;
    document.getElementById("game-count").textContent = publicProjects.filter(p => p.categories.includes("ゲーム")).length;
  }

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      activeFilter = button.dataset.filter || "all";
      filterButtons.forEach(b => b.classList.toggle("is-active", b === button));
      renderProjects();
    });
  });

  searchInput.addEventListener("input", event => {
    query = String(event.target.value || "").trim().toLowerCase();
    renderProjects();
  });

  archiveToggle.addEventListener("click", () => {
    const expanded = archiveToggle.getAttribute("aria-expanded") === "true";
    archiveToggle.setAttribute("aria-expanded", String(!expanded));
    archiveGrid.hidden = expanded;
    archiveToggle.querySelector(".archive-cta").innerHTML = expanded
      ? '一覧を見る <span aria-hidden="true">→</span>'
      : '閉じる <span aria-hidden="true">↑</span>';
  });

  renderFeatured();
  renderProjects();
  renderArchive();
  updateStats();
})();
