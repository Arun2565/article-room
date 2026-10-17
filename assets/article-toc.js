(function(){
  var panel = document.getElementById('tocPanel');
  if (!panel) return;
  var here = (location.pathname.split('/').pop() || '').split('#')[0];
  var wraps = panel.querySelectorAll('.toc-chapter-wrap');
  var hash = location.hash;

  wraps.forEach(function(wrap){
    var link = wrap.querySelector('.toc-chapter');
    if (!link) return;
    var href = (link.getAttribute('href') || '').split('#')[0].split('/').pop();
    var subs = wrap.querySelector('.toc-subs');
    var arrow = wrap.querySelector('.toc-arrow');
    var isCurrent = href === here;

    if (isCurrent) {
      link.classList.add('is-current');
      if (subs && subs.style.display === 'none') {
        subs.style.display = 'block';
        if (arrow) arrow.classList.add('open');
      }
      var active = subs && subs.querySelector(hash);
      if (active) active.classList.add('is-active');
      var first = subs && subs.querySelector('.toc-heading');
      if (first && !hash) first.classList.add('is-active');
    }
  });

  panel.addEventListener('click', function(e){
    var h = e.target.closest('.toc-heading');
    if (!h) return;
    var subs = h.closest('.toc-subs');
    if (!subs) return;
    subs.querySelectorAll('.is-active').forEach(function(n){ n.classList.remove('is-active'); });
    h.classList.add('is-active');
  });

  window.addEventListener('hashchange', function(){
    panel.querySelectorAll('.toc-heading.is-active').forEach(function(n){
      n.classList.remove('is-active');
    });
    var t = hash ? panel.querySelector(hash) : null;
    if (t) t.classList.add('is-active');
  });
})();
