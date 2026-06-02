/* ===================================================
   cursor glow — a soft warm light following the mouse
   like four o'clock sun through a crack in the mountain
   =================================================== */
(function cursorGlow() {
  var el = document.createElement('div');
  el.style.cssText =
    'position:fixed;inset:0;pointer-events:none;z-index:9998;' +
    'background:radial-gradient(circle 180px at 50% 50%,' +
      'rgba(228,129,74,0.06) 0%,' +
      'rgba(228,129,74,0.03) 40%,' +
      'transparent 70%);' +
    'opacity:0;transition:opacity 0.4s;';
  document.body.appendChild(el);

  var timeout;
  document.addEventListener('mousemove', function(e) {
    el.style.background =
      'radial-gradient(circle 180px at ' + e.clientX + 'px ' + e.clientY + 'px,' +
        'rgba(228,129,74,0.06) 0%,' +
        'rgba(228,129,74,0.03) 40%,' +
        'transparent 70%)';
    el.style.opacity = '1';
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      el.style.opacity = '0';
    }, 1200);
  });
})();
