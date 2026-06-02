/* ===================================================
   page-turn transition — a page sweeping across
   like turning a page in an old picture book
   =================================================== */
(function pageTurn() {
  var sweeping = false;

  document.addEventListener('click', function(e) {
    if (sweeping) return;

    var link = e.target.closest('a');
    if (!link) return;

    var href = link.getAttribute('href');
    if (!href || href.startsWith('http') || href.startsWith('#') || href.startsWith('mailto:')) return;
    if (!/\.html$/.test(href)) return;

    e.preventDefault();
    sweeping = true;

    // back = returning toward index (sweep left → right)
    var isBack = href === 'index.html' || href === 'index_beautify.html' || href === '/';

    var overlay = document.createElement('div');
    overlay.style.cssText =
      'position:fixed;inset:0;z-index:9999;pointer-events:none;' +
      'background:' + (isBack
        ? 'linear-gradient(to right, rgba(0,0,0,0.03) 0%, #f2ede4 6%, #f8f6f2 100%)'
        : 'linear-gradient(to left,  rgba(0,0,0,0.03) 0%, #f2ede4 6%, #f8f6f2 100%)') + ';' +
      'transform:translateX(' + (isBack ? '-100%' : '100%') + ');' +
      'transition:transform 0.4s cubic-bezier(0.4,0,0.2,1);';
    document.body.appendChild(overlay);

    requestAnimationFrame(function() {
      requestAnimationFrame(function() {
        overlay.style.transform = 'translateX(0)';
      });
    });

    setTimeout(function() {
      window.location.href = href;
    }, 380);
  });
})();
