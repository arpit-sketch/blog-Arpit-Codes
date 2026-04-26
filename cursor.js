document.addEventListener('DOMContentLoaded', function () {

  // ===== CURSOR =====
  var cursor     = document.getElementById('cursor');
  var cursorRing = document.getElementById('cursor-ring');
  var mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', function (e) {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
  });

  (function lag() {
    rx += (mx - rx) * 0.14;
    ry += (my - ry) * 0.14;
    cursorRing.style.left = rx + 'px';
    cursorRing.style.top  = ry + 'px';
    requestAnimationFrame(lag);
  })();

  function addHover(el) {
    el.addEventListener('mouseenter', function () { document.body.classList.add('cursor-hover'); });
    el.addEventListener('mouseleave', function () { document.body.classList.remove('cursor-hover'); });
  }

  document.querySelectorAll('a, button').forEach(addHover);

  // ===== HAMBURGER =====
  var hbg  = document.getElementById('hamburger');
  var navL = document.getElementById('nav-links');
  if (hbg && navL) {
    hbg.addEventListener('click', function () {
      hbg.classList.toggle('open');
      navL.classList.toggle('open');
    });
    navL.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        hbg.classList.remove('open');
        navL.classList.remove('open');
      });
    });
  }

  // ===== SCROLL REVEAL =====
  var revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          var delay = parseInt(e.target.dataset.delay || 0, 10);
          setTimeout(function () { e.target.classList.add('revealed'); }, delay);
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.08 });
    revealEls.forEach(function (el) { obs.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('revealed'); });
  }

  // ===== SMOOTH SCROLL =====
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var t = document.querySelector(a.getAttribute('href'));
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
    });
  });

});
