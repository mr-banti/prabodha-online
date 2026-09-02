// ============================================================
// reader.js - Shared "open article" overlay logic.
// Used by both script.js (index.html) and archive.js (archive.html)
// so clicking any headline opens the same styled reading panel.
// Requires the #readerOverlay markup to be present in the page.
// ============================================================

// Formats like: 20th August 2026 · 07:43:44 · Asia/Calcutta (GMT+5:30)
function formatLiveClock(now){
  const day = now.getDate();
  const suffix = (d => d>3&&d<21?'th':['th','st','nd','rd'][d%10]||'th')(day);
  const month = now.toLocaleDateString('en-US', {month:'long'});
  const year = now.getFullYear();
  const time = now.toLocaleTimeString('en-GB', {hour:'2-digit', minute:'2-digit', second:'2-digit', hour12:false});
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const offMin = -now.getTimezoneOffset();
  const sign = offMin >= 0 ? '+' : '-';
  const abs = Math.abs(offMin);
  const gmt = `GMT${sign}${Math.floor(abs/60)}:${String(abs%60).padStart(2,'0')}`;
  return `${day}${suffix} ${month} ${year} · ${time} · ${tz} (${gmt})`;
}

function formatDate(iso){
  if(!iso) return '';
  return new Date(iso).toLocaleDateString('en-US', {month:'long', day:'numeric', year:'numeric'});
}

// Parses [[text|n]] citation markup into a clickable footnote mark
// linking to the matching numbered source.
function parseCitations(text){
  return text.replace(/\[\[(.+?)\|(\d+)\]\]/g, (m, phrase, n) =>
    `<span class="cite">${phrase}<sup class="cite-mark" data-n="${n}">${n}</sup></span>`);
}

function openReader(id){
  const a = window.ALL_ARTICLES.find(x => x.id === id);
  if(!a) return;
  document.getElementById('readerEyebrow').textContent = a.cat;
  document.getElementById('readerTitle').textContent = a.title;
  document.getElementById('readerByline').textContent = `${a.byline} — ${formatDate(a.date)}`;

  const imgHtml = a.image
    ? `<img class="reader-image" src="${a.image}" alt="${a.title}">
       ${a.imageCaption ? `<div class="reader-caption">${a.imageCaption}</div>` : ''}`
    : '';

  const bodyHtml = a.body.map(p => `<p>${parseCitations(p)}</p>`).join('');

  const sources = Array.isArray(a.sources) ? a.sources.filter(Boolean) : [];
  const sourcesHtml = sources.length ? `
    <div class="reader-sources">
      <button class="sources-toggle open" id="sourcesToggle" type="button">Sources (${sources.length}) ▾</button>
      <ol class="sources-list open" id="sourcesList">
        ${sources.map((s,i) => `<li id="source-${i+1}">${s}</li>`).join('')}
      </ol>
    </div>` : '';

  const idHtml = `<div class="reader-id">ID: ${a.id}</div>`;

  document.getElementById('readerBody').innerHTML = imgHtml + bodyHtml + sourcesHtml + idHtml;
  document.getElementById('readerOverlay').classList.add('open');

  if(sources.length){
    const toggle = document.getElementById('sourcesToggle');
    const list = document.getElementById('sourcesList');
    toggle.addEventListener('click', () => {
      list.classList.toggle('open');
      toggle.classList.toggle('open');
    });
    document.querySelectorAll('.cite-mark').forEach(mark => {
      mark.addEventListener('click', e => {
        e.stopPropagation();
        list.classList.add('open');
        toggle.classList.add('open');
        const target = document.getElementById(`source-${mark.dataset.n}`);
        if(target){
          target.scrollIntoView({behavior:'smooth', block:'center'});
          target.classList.add('source-flash');
          setTimeout(() => target.classList.remove('source-flash'), 900);
        }
      });
    });
  }
}

function closeReader(){
  document.getElementById('readerOverlay').classList.remove('open');
}

document.getElementById('readerClose').addEventListener('click', closeReader);
document.getElementById('readerOverlay').addEventListener('click', e => {
  if(e.target.id === 'readerOverlay') closeReader();
});
document.addEventListener('keydown', e => { if(e.key === 'Escape') closeReader(); });
