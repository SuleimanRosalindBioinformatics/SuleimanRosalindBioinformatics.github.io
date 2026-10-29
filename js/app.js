/**
 * SuleimanRosalindBioinformatics - Main Application Controller
 */

const App = (() => {
  let allProblems = [];
  let filteredProblems = [];
  let currentTrack = 'all';
  let currentTier = 'all';
  let currentDomain = 'all';
  let searchQuery = '';
  let displayLimit = 24;

  const elements = {
    problemsGrid: document.getElementById('problems-grid'),
    searchFilter: document.getElementById('search-filter'),
    trackButtons: document.querySelectorAll('.track-btn'),
    tierButtons: document.querySelectorAll('.tier-btn'),
    domainSelect: document.getElementById('domain-select'),
    resultsCount: document.getElementById('results-count'),
    loadMoreBtn: document.getElementById('load-more-btn'),
    loadMoreWrapper: document.getElementById('load-more-wrapper'),
    themeToggle: document.getElementById('theme-toggle'),
    modal: document.getElementById('problem-modal'),
    modalClose: document.getElementById('modal-close'),
    modalBody: document.getElementById('modal-body'),
    studioTabs: document.querySelectorAll('.studio-tab-btn'),
    studioPanes: document.querySelectorAll('.studio-pane')
  };

  // Initialize
  async function init() {
    initTheme();
    initStudioTabs();
    initModal();
    initFilters();

    try {
      const res = await fetch('data/problems.json');
      allProblems = await res.json();
      filteredProblems = [...allProblems];
      renderProblems();
    } catch (err) {
      console.error('Failed to load problems dataset:', err);
      if (elements.problemsGrid) {
        elements.problemsGrid.innerHTML = `
          <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--rose-primary);">
            Failed to load problem database. If viewing locally, please run through a local web server (e.g., <code>python3 -m http.server</code>).
          </div>
        `;
      }
    }
  }

  // Theme Handling
  function initTheme() {
    const saved = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', saved);

    if (elements.themeToggle) {
      elements.themeToggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
      });
    }
  }

  // Studio Tab Switching
  function initStudioTabs() {
    elements.studioTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetId = tab.getAttribute('data-tab');
        elements.studioTabs.forEach(t => t.classList.remove('active'));
        elements.studioPanes.forEach(p => p.classList.remove('active'));

        tab.classList.add('active');
        const activePane = document.getElementById(targetId);
        if (activePane) activePane.classList.add('active');
      });
    });
  }

  // Filter Listeners
  function initFilters() {
    if (elements.searchFilter) {
      elements.searchFilter.addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase().trim();
        applyFilters();
      });
    }

    elements.trackButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        elements.trackButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentTrack = btn.getAttribute('data-track');
        applyFilters();
      });
    });

    elements.tierButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        elements.tierButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentTier = btn.getAttribute('data-tier');
        applyFilters();
      });
    });

    if (elements.domainSelect) {
      elements.domainSelect.addEventListener('change', (e) => {
        currentDomain = e.target.value;
        applyFilters();
      });
    }

    if (elements.loadMoreBtn) {
      elements.loadMoreBtn.addEventListener('click', () => {
        displayLimit += 24;
        renderProblems();
      });
    }
  }

  function applyFilters() {
    displayLimit = 24;
    filteredProblems = allProblems.filter(p => {
      // Track match
      const trackMatch = currentTrack === 'all' || p.track === currentTrack;
      // Tier match
      const tierMatch = currentTier === 'all' || p.tier === currentTier;
      // Domain match
      const domainMatch = currentDomain === 'all' || p.domain === currentDomain;
      // Search match
      const queryMatch = !searchQuery || 
        p.title.toLowerCase().includes(searchQuery) ||
        p.id.toLowerCase().includes(searchQuery) ||
        p.domain.toLowerCase().includes(searchQuery) ||
        p.track.toLowerCase().includes(searchQuery);

      return trackMatch && tierMatch && domainMatch && queryMatch;
    });

    renderProblems();
  }

  // Render Problems Cards
  function renderProblems() {
    if (!elements.problemsGrid) return;

    if (elements.resultsCount) {
      elements.resultsCount.textContent = `Showing ${Math.min(displayLimit, filteredProblems.length)} of ${filteredProblems.length} problems (${allProblems.length} total solved)`;
    }

    if (filteredProblems.length === 0) {
      elements.problemsGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; color: var(--text-muted);">
          <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">🔍</div>
          <h3>No matching problems found</h3>
          <p>Try modifying your search keywords or resetting your filter criteria.</p>
        </div>
      `;
      if (elements.loadMoreWrapper) elements.loadMoreWrapper.style.display = 'none';
      return;
    }

    const visibleProblems = filteredProblems.slice(0, displayLimit);
    const html = visibleProblems.map(p => `
      <div class="problem-card" onclick="App.openModal('${p.id}')">
        <div>
          <div class="card-top">
            <span class="problem-id">${p.id}</span>
            <span class="badge-tier tier-${p.tier}">${p.tier}</span>
          </div>
          <h4 class="problem-title">${escapeHtml(p.title)}</h4>
          <div class="problem-meta">
            <span class="tag-pill">${escapeHtml(p.track)}</span>
            <span class="tag-pill" style="color:var(--cyan-primary);">${p.domain}</span>
          </div>
        </div>
        <div class="card-actions" onclick="event.stopPropagation()">
          <button class="card-btn card-btn-primary" onclick="App.openModal('${p.id}')">Details</button>
          <a href="${p.github_url}" target="_blank" rel="noopener noreferrer" class="card-btn card-btn-code">GitHub Code &rarr;</a>
        </div>
      </div>
    `).join('');

    elements.problemsGrid.innerHTML = html;

    if (elements.loadMoreWrapper) {
      elements.loadMoreWrapper.style.display = displayLimit < filteredProblems.length ? 'block' : 'none';
    }
  }

  // Modal Handling
  function initModal() {
    if (elements.modalClose) {
      elements.modalClose.addEventListener('click', closeModal);
    }
    if (elements.modal) {
      elements.modal.addEventListener('click', (e) => {
        if (e.target === elements.modal) closeModal();
      });
    }
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && elements.modal.classList.contains('active')) {
        closeModal();
      }
    });
  }

  function openModal(problemId) {
    const p = allProblems.find(item => item.id === problemId);
    if (!p || !elements.modalBody) return;

    elements.modalBody.innerHTML = `
      <div style="display:flex; align-items:center; gap:0.75rem; margin-bottom:1rem;">
        <span class="problem-id" style="font-size:1rem; padding:0.3rem 0.75rem;">${p.id}</span>
        <span class="badge-tier tier-${p.tier}">${p.tier} Tier</span>
        <span class="tag-pill" style="color:var(--cyan-primary);">${escapeHtml(p.track)}</span>
      </div>
      <h2 style="font-size:1.5rem; font-weight:800; margin-bottom:1rem; line-height:1.3;">${escapeHtml(p.title)}</h2>
      
      <div style="background:var(--bg-input); padding:1rem; border-radius:var(--radius-md); border:1px solid var(--bg-card-border); margin-bottom:1.5rem; font-size:0.875rem;">
        <div style="margin-bottom:0.5rem;"><strong>Domain Classification:</strong> <span style="color:var(--cyan-primary);">${p.domain}</span></div>
        <div style="margin-bottom:0.5rem;"><strong>Local Directory:</strong> <code>${escapeHtml(p.dir_name)}</code></div>
        <div style="margin-bottom:0.5rem;"><strong>Status:</strong> <span style="color:var(--green-primary); font-weight:bold;">100% Solved &amp; Verified</span></div>
        <div><strong>Codebase Access:</strong> <span style="color:#fca5a5; font-weight:bold;">Private 🔒 (Access by request)</span></div>
      </div>

      <div style="margin-bottom:1.25rem;">
        <h4 style="font-size:0.9rem; text-transform:uppercase; letter-spacing:0.05em; color:var(--text-muted); margin-bottom:0.5rem;">Execution Command:</h4>
        <div style="background:rgba(0,0,0,0.4); padding:0.75rem 1rem; border-radius:var(--radius-sm); font-family:var(--font-mono); font-size:0.85rem; border:1px solid var(--bg-card-border); word-break:break-all;">
          python3 "${escapeHtml(p.dir_name)}/main.py"
        </div>
      </div>

      <div style="background:rgba(239,68,68,0.08); border:1px solid rgba(239,68,68,0.3); border-radius:var(--radius-sm); padding:0.75rem 1rem; margin-bottom:1.5rem; font-size:0.8rem; color:#fca5a5;">
        🔒 <strong>Private Access:</strong> Source codes, datasets (<code>rosalind_*.txt</code>) and wiki notes are private. To request repository access, contact: <a href="mailto:suleyman.hacizade1@gmail.com?subject=Access%20Request%20-%20Problem%20${p.id}" style="color:#38bdf8; text-decoration:underline; font-weight:600;">suleyman.hacizade1@gmail.com</a>
      </div>

      <div style="display:flex; gap:0.75rem; flex-wrap:wrap;">
        <a href="${p.github_url}" target="_blank" rel="noopener noreferrer" class="btn-secondary" style="flex:1; justify-content:center;">
          Open in GitHub Repository &rarr;
        </a>
        <a href="mailto:suleyman.hacizade1@gmail.com?subject=Access%20Request%20-%20Problem%20${p.id}" class="btn-primary" style="flex:1; justify-content:center; background:#ef4444; border-color:#dc2626;">
          📧 Request Access via Email
        </a>
      </div>
    `;

    elements.modal.classList.add('active');
  }

  function closeModal() {
    if (elements.modal) elements.modal.classList.remove('active');
  }

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  return { init, openModal, closeModal };
})();

document.addEventListener('DOMContentLoaded', App.init);
