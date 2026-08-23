// ============================================================
// about.js - Populates the About page stats once articles load.
// ============================================================

function renderAboutStats(){
  const all = window.ALL_ARTICLES || [];
  document.getElementById('statArticles').textContent = all.length;

  const dates = all.map(a => new Date(a.date)).filter(d => !isNaN(d));
  const earliest = dates.length ? new Date(Math.min(...dates)) : new Date();
  document.getElementById('statDate').textContent =
    earliest.toLocaleDateString('en-US', {month:'short', year:'numeric'});
}

document.getElementById('year').textContent = new Date().getFullYear();
initSite(renderAboutStats); // loader.js: loads all articles/*.js, then renders
