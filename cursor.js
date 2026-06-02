/* ===================================================
   cursor trail — tiny light motes follow the mouse
   like four o'clock light touching the page
   =================================================== */
(function cursorTrail() {
  var canvas = document.createElement('canvas');
  canvas.style.cssText =
    'position:fixed;inset:0;pointer-events:none;z-index:9998;';
  document.body.appendChild(canvas);

  var ctx = canvas.getContext('2d');
  var w, h;
  var mx = -100, my = -100;
  var particles = [];
  var max = 22;

  function resize() {
    w = canvas.width  = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  document.addEventListener('mousemove', function(e) {
    mx = e.clientX;
    my = e.clientY;
  });

  // also track touch for mobile
  document.addEventListener('touchmove', function(e) {
    mx = e.touches[0].clientX;
    my = e.touches[0].clientY;
  });

  var colors = [
    { r: 228, g: 129, b: 74  },  // fire opal orange
    { r: 244, g: 180, b: 120 },  // pale gold
    { r: 180, g: 190, b: 200 },  // labradorite grey-blue
  ];

  function spawn() {
    if (mx < 0 || my < 0) return;

    var c = colors[Math.floor(Math.random() * colors.length)];
    particles.push({
      x: mx + (Math.random() - 0.5) * 6,
      y: my + (Math.random() - 0.5) * 6,
      r: Math.random() * 1.8 + 0.8,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3 - 0.15,
      life: 1,
      decay: Math.random() * 0.015 + 0.012,
      color: c
    });
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);

    if (mx > -50 && Math.random() < 0.5) spawn();
    if (mx > -50 && Math.random() < 0.3) spawn();

    for (var i = particles.length - 1; i >= 0; i--) {
      var p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.life -= p.decay;

      if (p.life <= 0) {
        particles.splice(i, 1);
        continue;
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * p.life, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(' + p.color.r + ',' + p.color.g + ',' + p.color.b + ',' + (p.life * 0.5).toFixed(2) + ')';
      ctx.fill();
    }

    if (particles.length > max) {
      particles.splice(0, particles.length - max);
    }

    requestAnimationFrame(draw);
  }
  draw();
})();
