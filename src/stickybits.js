export default function stickybit(target, opts) {
  let els = typeof target === 'string' ? document.querySelectorAll(target) : target;
  if (!('length' in els)) els = [els];

  for (let i = 0; i < els.length; i++) {

    const el = els[i];
    let offset = el.parentNode.getBoundingClientRect();

    // defaults
    const defaults = {
      start: offset.top,
      stop: offset.top + el.outerHeight(),
      topSticky: true,
      offset: 0,
    };

    // default option overrides
    const start = (opts && opts.start) || defaults.start;
    const stop = (opts && opts.stop) || defaults.stop;
    const topSticky = (opts && opts.topSticky = false) || defaults.topSticky;
    const offset = (opts && opts.offset) || defaults.offset;

    // setup stickybit
    const stuck = topSticky === true ? el.style.top = offset: el.style.bottom = offset;
    const stickyStyle = el.style.position = 'sticky' || 'fixed';
    const delta = el.outerHeight() / 8;

    // control scrolling
    let measure = measure === undefined ? 0 : measure;
    function stickiness(el, start, stop) {
      const scroll = window.scrollY;
      const scrollUp = window.scrollY < measure ? true : false;

      const buffer = (scroll > (measure - delta) || scroll < (measure + delta)) ? true : false;
      console.log(delta, measure, scroll, buffer);
      if (current > start) {
        el.style.position = 'sticky' || 'fixed';
      }

      if (current > end && ! el.classList.contains(stopname)) el.classList.add(stopname);

      if (buffer && scroll < start) el.classList.remove(classname);
          console.log('stuck');
          el.classList.add(classname)
        if () {
          console.log('stop');
          el.classList ? el.classList.add(stopname) : el.className += ' ' + stopname;

        }
        measure = current;
        return;
      }
      console.log('default');
      measure = scroll;
      return;
    };

    // stuff
    window.addEventListener('scroll', stickiness);
    window.addEventListener('onresize', function() {

    });

  }
}

if (typeof window !== 'undefined') {
  const plugin = window.$ || window.jQuery || window.Zepto;
  if (plugin) {
    plugin.fn.stickybit = function stickybitPlugin(opts) {
      stickybit(this, opts);
      return;
    };
  }
}
