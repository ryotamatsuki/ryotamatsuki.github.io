(() => {
  const sourceProjects = Array.isArray(window.RYOTA_PROJECTS) ? window.RYOTA_PROJECTS : [];
  const excludedProjectIds = new Set(
    Array.isArray(window.RYOTA_EXCLUDED_PROJECT_IDS) ? window.RYOTA_EXCLUDED_PROJECT_IDS : []
  );
  const projects = sourceProjects.filter(project => !excludedProjectIds.has(project.id));
  const projectDetails = window.RYOTA_PROJECT_DETAILS && typeof window.RYOTA_PROJECT_DETAILS === "object"
    ? window.RYOTA_PROJECT_DETAILS
    : {};

  const featuredGrid = document.getElementById("featured-grid");
  const projectGrid = document.getElementById("project-grid");
  const archiveGrid = document.getElementById("archive-grid");
  const emptyState = document.getElementById("empty-state");
  const searchInput = document.getElementById("project-search");
  const filterButtons = [...document.querySelectorAll(".filter-button")];
  const archiveToggle = document.getElementById("archive-toggle");
  const detailDialog = document.getElementById("project-dialog");
  const detailContent = document.getElementById("project-dialog-content");
  const detailClose = document.getElementById("project-dialog-close");

  let activeFilter = "all";
  let query = "";
  let lastDetailTrigger = null;

  const escapeHTML = (value = "") => String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

  const visualClass = (visual) => `visual-${visual || "map"}`;
  const statusLabel = (status) => status === "live" ? "LIVE" : status === "poc" ? "PoC" : "ARCHIVE";
  const statusClass = (status) => status === "live" ? "live" : status === "poc" ? "poc" : "archive";
  const imagePosition = (project) => {
    const value = String(project.imagePosition || "center").trim();
    return /^\d{1,3}%\s+\d{1,3}%$/.test(value) ? value : "center";
  };

  const imageMarkup = (project, loading = "lazy") => project.image
    ? `<img class="project-image" src="${escapeHTML(project.image)}" alt="" loading="${loading}" style="--image-position: ${escapeHTML(imagePosition(project))}">`
    : "";

  const attributionMarkup = (project) => project.imageAttribution
    ? `<span class="image-attribution">${escapeHTML(project.imageAttribution)}</span>`
    : "";

  const visualMarkup = (project, type, loading = "lazy") => project.image
    ? `<div class="${type}-visual has-image">${imageMarkup(project, loading)}</div>`
    : `<div class="${type}-visual ${visualClass(project.visual)}"></div>`;

  const listMarkup = (items = [], ordered = false) => {
    if (!Array.isArray(items) || items.length === 0) return "";
    const tag = ordered ? "ol" : "ul";
    return `<${tag} class="${ordered ? "detail-steps" : "detail-list"}">${items
      .map(item => `<li>${escapeHTML(item)}</li>`)
      .join("")}</${tag}>`;
  };

  const chipsMarkup = (items = []) => {
    if (!Array.isArray(items) || items.length === 0) return "";
    return `<div class="detail-chips">${items
      .map(item => `<span>${escapeHTML(item)}</span>`)
      .join("")}</div>`;
  };

  const detailSearchText = (project) => {
    const detail = projectDetails[project.id] || {};
    return [
      project.title,
      project.description,
      ...(project.categories || []),
      detail.problem,
      detail.purpose,
      ...(detail.features || []),
      ...(detail.howToUse || []),
      ...(detail.dataSources || []),
      ...(detail.tech || []),
      detail.notes
    ].filter(Boolean).join(" ").toLowerCase();
  };

  function detailActionMarkup(project) {
    if (project.appUrl) {
      return `
        <a class="detail-cta detail-cta-primary" href="${escapeHTML(project.appUrl)}" target="_blank" rel="noopener">
          アプリを試す <span aria-hidden="true">↗</span>
        </a>
        <a class="detail-cta detail-cta-secondary" href="${escapeHTML(project.repoUrl)}" target="_blank" rel="noopener">
          GitHubを見る <span aria-hidden="true">↗</span>
        </a>
      `;
    }

    return `
      <a class="detail-cta detail-cta-primary" href="${escapeHTML(project.repoUrl)}" target="_blank" rel="noopener">
        GitHubで見る <span aria-hidden="true">↗</span>
      </a>
      <span class="detail-no-app">公開アプリURLは未設定です。使い方は上の手順を確認してください。</span>
    `;
  }

  function detailTemplate(project) {
    const detail = projectDetails[project.id];
    if (!detail) {
      return `
        <div class="detail-head-only">
          <div class="detail-badges">
            <span class="badge category">${escapeHTML(project.categories[0] || "Project")}</span>
            <span class="badge ${statusClass(project.status)}">${statusLabel(project.status)}</span>
          </div>
          <h2 id="project-dialog-title">${escapeHTML(project.title)}</h2>
          <p>${escapeHTML(project.description)}</p>
        </div>
        <div class="detail-actions">${detailActionMarkup(project)}</div>
      `;
    }

    return `
      <div class="detail-hero">
        <div class="detail-media">
          ${visualMarkup(project, "detail", "eager")}
          ${attributionMarkup(project)}
        </div>
        <div class="detail-head">
          <div class="detail-badges">
            <span class="badge category">${escapeHTML(project.categories[0] || "Project")}</span>
            <span class="badge ${statusClass(project.status)}">${statusLabel(project.status)}</span>
            <span class="detail-host">${escapeHTML(project.host || "GitHub")}</span>
          </div>
          <h2 id="project-dialog-title">${escapeHTML(project.title)}</h2>
          <p class="detail-lead">${escapeHTML(project.description)}</p>
        </div>
      </div>

      <div class="detail-body">
        <section class="detail-section detail-section-problem">
          <p class="detail-section-label">WHY</p>
          <h3>解決したい課題</h3>
          <p>${escapeHTML(detail.problem)}</p>
        </section>

        <section class="detail-section">
          <p class="detail-section-label">PURPOSE</p>
          <h3>このプロダクトの目的</h3>
          <p>${escapeHTML(detail.purpose)}</p>
        </section>

        <div class="detail-two-column">
          <section class="detail-section">
            <p class="detail-section-label">FEATURES</p>
            <h3>できること</h3>
            ${listMarkup(detail.features)}
          </section>

          <section class="detail-section detail-use-section">
            <p class="detail-section-label">HOW TO USE</p>
            <h3>使い方</h3>
            ${listMarkup(detail.howToUse, true)}
          </section>
        </div>

        <div class="detail-two-column detail-meta-grid">
          <section class="detail-section">
            <p class="detail-section-label">DATA</p>
            <h3>データ / コンテンツ</h3>
            ${chipsMarkup(detail.dataSources)}
          </section>

          <section class="detail-section">
            <p class="detail-section-label">TECH</p>
            <h3>主な技術</h3>
            ${chipsMarkup(detail.tech)}
          </section>
        </div>

        ${detail.notes ? `
          <aside class="detail-note">
            <strong>利用前に確認</strong>
            <p>${escapeHTML(detail.notes)}</p>
          </aside>
        ` : ""}
      </div>

      <div class="detail-actions">
        ${detailActionMarkup(project)}
      </div>
    `;
  }

  function openProjectDetail(projectId, trigger) {
    const project = projects.find(item => item.id === projectId);
    if (!project || !detailDialog || !detailContent) return;

    lastDetailTrigger = trigger || document.activeElement;
    detailContent.innerHTML = detailTemplate(project);
    document.body.classList.add("project-dialog-open");

    if (typeof detailDialog.showModal === "function") {
      detailDialog.showModal();
    } else {
      detailDialog.setAttribute("open", "");
    }
  }

  function closeProjectDetail() {
    if (!detailDialog) return;
    if (typeof detailDialog.close === "function" && detailDialog.open) {
      detailDialog.close();
    } else {
      detailDialog.removeAttribute("open");
      document.body.classList.remove("project-dialog-open");
      if (lastDetailTrigger && typeof lastDetailTrigger.focus === "function") lastDetailTrigger.focus();
    }
  }

  function renderFeatured() {
    const featured = projects
      .filter(project => project.featured && project.status !== "archive")
      .sort((a, b) => Number(a.featured) - Number(b.featured))
      .slice(0, 3);

    featuredGrid.innerHTML = featured.map(project => `
      <button
        class="featured-card detail-trigger"
        type="button"
        data-detail-id="${escapeHTML(project.id)}"
        aria-haspopup="dialog"
        aria-label="${escapeHTML(project.title)}の概要を見る"
      >
        ${visualMarkup(project, "featured", "eager")}
        ${attributionMarkup(project)}
        <div class="featured-content">
          <div class="badge-row">
            <span class="badge category">${escapeHTML(project.categories[0] || "Project")}</span>
            <span class="badge ${statusClass(project.status)}">${statusLabel(project.status)}</span>
          </div>
          <h3>${escapeHTML(project.title)}</h3>
          <p>${escapeHTML(project.description)}</p>
          <span class="open-link">概要を見る <span aria-hidden="true">→</span></span>
        </div>
      </button>
    `).join("");
  }

  function cardTemplate(project) {
    return `
      <article class="project-card" data-project-id="${escapeHTML(project.id)}">
        <button
          class="project-thumb detail-trigger"
          type="button"
          data-detail-id="${escapeHTML(project.id)}"
          aria-haspopup="dialog"
          aria-label="${escapeHTML(project.title)}の概要を見る"
        >
          ${visualMarkup(project, "thumb")}
          ${attributionMarkup(project)}
          <span class="badge status ${statusClass(project.status)}">${statusLabel(project.status)}</span>
          <span class="badge host">${escapeHTML(project.host || "GitHub")}</span>
        </button>
        <div class="project-body">
          <h3>${escapeHTML(project.title)}</h3>
          <p>${escapeHTML(project.description)}</p>
          <div class="card-actions">
            <button
              class="detail-link detail-trigger"
              type="button"
              data-detail-id="${escapeHTML(project.id)}"
              aria-haspopup="dialog"
            >
              概要を見る <span aria-hidden="true">→</span>
            </button>
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
      const queryMatch = !query || detailSearchText(project).includes(query);
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
    document.getElementById("project-count").textContent = projects.length;
    document.getElementById("live-count").textContent = projects.filter(project => project.status === "live").length;
    document.getElementById("game-count").textContent = projects.filter(project => project.categories.includes("ゲーム")).length;
  }

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      activeFilter = button.dataset.filter || "all";
      filterButtons.forEach(item => item.classList.toggle("is-active", item === button));
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

  document.addEventListener("click", event => {
    const trigger = event.target.closest(".detail-trigger");
    if (!trigger) return;
    openProjectDetail(trigger.dataset.detailId, trigger);
  });

  if (detailClose) detailClose.addEventListener("click", closeProjectDetail);

  if (detailDialog) {
    detailDialog.addEventListener("click", event => {
      if (event.target === detailDialog) closeProjectDetail();
    });
    detailDialog.addEventListener("close", () => {
      document.body.classList.remove("project-dialog-open");
      if (lastDetailTrigger && typeof lastDetailTrigger.focus === "function") {
        lastDetailTrigger.focus({ preventScroll: true });
      }
      lastDetailTrigger = null;
    });
  }

  renderFeatured();
  renderProjects();
  renderArchive();
  updateStats();
})();
