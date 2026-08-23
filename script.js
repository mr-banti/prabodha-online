// ============================================================
// script.js - Front-page behavior only.
// Article data comes from articles/*.js files, combined by
// loader.js into window.ALL_ARTICLES. No localStorage, no
// per-browser data - every visitor sees the same site.
// currentCat is a GROUP (science/technology/medicine/mathematics);
// each article keeps its own specific a.cat (physics, ai, etc.)
// for display - groupOf() (from loader.js) maps between them.
// ============================================================

let currentCat = 'science';

function render(){
  const all = [...window.ALL_ARTICLES].sort((a,b) => new Date(b.date) - new Date(a.date));
  const inCat = all.filter(a => groupOf(a.cat) === currentCat);
  const pool = inCat.length ? inCat : all;
  renderHero(pool);
  renderGrid(pool);
  renderOpinion(all.filter(a => a.cat === 'physics' || a.cat === 'math' || a.cat === 'chemistry' || a.cat === 'biology'));
}

function renderHero(pool){
  const hero = document.getElementById('hero');
  const [feature, ...rest] = pool;
  if(!feature){ hero.innerHTML=''; return; }
  const side = rest.slice(0,2);
  hero.innerHTML = `
    <div class="hero-inner">
      <div>
        <div class="hero-eyebrow">${feature.cat}</div>
        <h2 class="hero-headline" data-id="${feature.id}">${feature.title}</h2>
        <p class="hero-dek">${feature.dek}</p>
        <p class="hero-meta">${feature.byline} — ${formatDate(feature.date)}</p>
      </div>
      <div class="hero-side">
        ${side.map(s => `
          <div class="hero-side-item" data-id="${s.id}">
            <div class="hero-side-cat">${s.cat}</div>
            <div class="hero-side-title">${s.title}</div>
            <p class="hero-side-dek">${s.dek}</p>
          </div>`).join('') || '<p style="color:var(--grey);font-size:.85rem;">More stories in this section soon.</p>'}
      </div>
    </div>`;
  hero.querySelectorAll('[data-id]').forEach(el => el.addEventListener('click', () => openReader(el.dataset.id)));
}

function renderGrid(pool){
  const grid = document.getElementById('editionGrid');
  const items = pool.slice(3,9);
  grid.innerHTML = items.map(a => `
    <article class="story-card" data-id="${a.id}">
      <div class="story-cat">${a.cat}</div>
      <h3 class="story-title">${a.title}</h3>
      <p class="story-excerpt">${a.dek}</p>
      <div class="story-byline">${a.byline}</div>
    </article>`).join('');
  grid.querySelectorAll('[data-id]').forEach(el => el.addEventListener('click', () => openReader(el.dataset.id)));
}

function renderOpinion(items){
  const wrap = document.getElementById('opinionList');
  wrap.innerHTML = items.slice(0,4).map(a => `
    <div class="opinion-item" data-id="${a.id}">
      <div class="opinion-cat">${a.cat}</div>
      <div class="opinion-title">${a.title}</div>
      <p class="opinion-excerpt">${a.dek}</p>
      <div class="opinion-by">${a.byline}</div>
    </div>`).join('');
  wrap.querySelectorAll('[data-id]').forEach(el => el.addEventListener('click', () => openReader(el.dataset.id)));
}

// ---------- Nav ----------
document.querySelectorAll('.section-nav a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    document.querySelectorAll('.section-nav a').forEach(a => a.classList.remove('active'));
    link.classList.add('active');
    currentCat = link.dataset.cat;
    render();
    document.querySelector('main').scrollIntoView({behavior:'smooth'});
  });
});

// ---------- Ticker ----------
function renderTicker(){
  const track = document.getElementById('tickerTrack');
  const row = TICKER_DATA.map(t => `
    <span class="tick-item">
      <span class="tick-sym">${t.sym}</span>
      <span class="tick-label">${t.label}</span>
      <span class="${t.up?'tick-up':'tick-down'}">${t.value} ${t.chg}</span>
    </span>`).join('');
  track.innerHTML = row + row;
}

// ---------- Clock ----------
function tickClock(){
  document.getElementById('live-clock').textContent = formatLiveClock(new Date());
}
setInterval(tickClock, 1000);

// ---------- Init ----------
document.getElementById('year').textContent = new Date().getFullYear();
tickClock();
renderTicker();
initSite(render); // loader.js: loads all articles/*.js, then renders