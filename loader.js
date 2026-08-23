// ============================================================
// loader.js - Loads all daily article files listed in
// articles/index.js, in order, then runs the page's init code.
// Works on GitHub Pages (or any static host) with no server.
// ============================================================

window.ALL_ARTICLES = [];

// Group mapping: specific article cat -> one of 4 top-level groups.
// Article objects keep their specific cat (e.g. "physics"); nav/filters use the group.
const CAT_GROUPS = {
  science: ['physics','chemistry','biology','space','biotech','fundamentals','geology','oceanography','climate','astronomy','ecology','paleontology'],
  technology: ['ai','software','research','robotics','materials','cybersecurity','quantum','semiconductors','energy','telecom','aerospace'],
  medicine: ['genomics','pharmacology','neuroscience','publichealth','oncology','immunology','cardiology','epidemiology','surgery','mentalhealth'],
  mathematics: ['math','statistics','cryptography','appliedmath','numbertheory']
};
function groupOf(cat){
  return Object.keys(CAT_GROUPS).find(g => CAT_GROUPS[g].includes(cat)) || 'science';
}

function loadArticleFiles(files){
  return files.reduce((chain, file) => chain.then(() => new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = 'articles/' + file;
    s.onload = resolve;
    s.onerror = () => reject(new Error('Missing article file: ' + file));
    document.head.appendChild(s);
  })), Promise.resolve());
}

function initSite(onReady){
  loadArticleFiles(ARTICLE_FILES)
    .then(() => onReady())
    .catch(err => {
      console.error(err);
      onReady(); // still render with whatever loaded successfully
    });
}