(function () {
  var body = document.body;
  var menuBtn = document.querySelector('.menu-btn');
  var scrim = document.querySelector('.nav-scrim');
  var navLinks = document.querySelectorAll('.sidenav__links a');

  function openNav () { body.classList.add('nav-open'); }
  function closeNav () { body.classList.remove('nav-open'); }
  function toggleNav () { body.classList.toggle('nav-open'); }

  if (menuBtn) menuBtn.addEventListener('click', toggleNav);
  if (scrim) scrim.addEventListener('click', closeNav);

  navLinks.forEach(function (link) {
    link.addEventListener('click', closeNav);
  });

  // Highlight the current section in the side nav as the visitor scrolls.
  var sections = Array.prototype.slice.call(document.querySelectorAll('main [id]'));
  if (sections.length && 'IntersectionObserver' in window) {
    var byId = {};
    navLinks.forEach(function (link) {
      byId[link.getAttribute('href').replace('#', '')] = link;
    });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var link = byId[entry.target.id];
        if (!link) return;
        if (entry.isIntersecting) {
          navLinks.forEach(function (l) { l.classList.remove('is-active'); });
          link.classList.add('is-active');
        }
      });
    }, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });

    sections.forEach(function (section) { observer.observe(section); });
  }

  // Pause the walkthrough video when it scrolls out of view, resume when back.
  var clip = document.querySelector('.visit__frame video');
  if (clip && 'IntersectionObserver' in window) {
    var clipObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          clip.play().catch(function () {});
        } else {
          clip.pause();
        }
      });
    }, { threshold: 0.35 });
    clipObserver.observe(clip);
  }
})();
