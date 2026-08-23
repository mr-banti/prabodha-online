// ============================================================
// archive.js - Every article across every daily file, newest first.
// A new day's file appears here automatically once it's added
// to articles/index.js - nothing else to change.
// formatDate/openReader/closeReader come from reader.js (shared).
// groupOf() (from loader.js) maps each article's specific cat
// (physics, ai, etc.) to its group (science/technology/medicine/mathematics).
// ============================================================

function renderArchive(){
  const search = document.getElementById('searchInput').value.trim().toLowerCase();
  const cat = document.getElementById('catFilter').value;
  const dateVal = document.getElementById('dateFilter').value;
  const list = document.getElementById('archiveList');

  let items = [...window.ALL_ARTICLES].sort((a,b) => new Date(b.date) - new Date(a.date));
  if(cat) items = items.filter(a => groupOf(a.cat) === cat);
  if(search) items = items.filter(a => a.title.toLowerCase().includes(search));
  if(dateVal) items = items.filter(a => a.date === dateVal);

  if(!items.length){
    list.innerHTML = '<p class="archive-empty">No articles match.</p>';
    return;
  }

  list.innerHTML = items.map(a => `
    <div class="archive-row" data-id="${a.id}">
      <div class="archive-row-main">
        <div class="archive-row-cat">${a.cat}</div>
        <div class="archive-row-title">${a.title}</div>
        <p class="archive-row-dek">${a.dek}</p>
        <div class="archive-row-by">${a.byline}</div>
      </div>
      <div class="archive-row-date">${formatDate(a.date)}</div>
    </div>`).join('');

  list.querySelectorAll('.archive-row').forEach(row => {
    row.addEventListener('click', () => openReader(row.dataset.id));
  });
}

document.getElementById('searchInput').addEventListener('input', renderArchive);
document.getElementById('catFilter').addEventListener('change', renderArchive);
document.getElementById('dateFilter').addEventListener('change', renderArchive);

function tickArchiveClock(){
  document.getElementById('archive-live-clock').textContent = formatLiveClock(new Date());
}
setInterval(tickArchiveClock, 1000);
tickArchiveClock();

initSite(renderArchive); // loader.js: loads all articles/*.js, then renders