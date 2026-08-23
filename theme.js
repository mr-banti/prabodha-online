// ============================================================
// theme.js - Light/dark mode toggle, persisted in localStorage.
// ============================================================
(function(){
  const saved = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', saved);

  function applyIcon(btn){
    const t = document.documentElement.getAttribute('data-theme');
    btn.textContent = t === 'dark' ? '☀️' : '🌙';
  }

  document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('themeToggle');
    if(!btn) return;
    applyIcon(btn);
    btn.addEventListener('click', () => {
      const cur = document.documentElement.getAttribute('data-theme');
      const next = cur === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      applyIcon(btn);
    });
  });
})();