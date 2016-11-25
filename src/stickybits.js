export default function stickybit(target, opts) {
  let els = typeof target === 'string' ? document.querySelectorAll(target) : target;
  if (!('length' in els)) els = [els];
  const total = els.length;
  for (let i = 0; i < total; i + 1) {
    const el = els[i];
    const parent = el.parentNode.getBoundingClientRect();

    // defaults
    const defaults = {
      start: parent.top,
      stop: parent.top + el.outerHeight(),
      offset: 0,
      stickyPosition: 'top',
    };

    // default option overrides
    const start = (opts && opts.start) || defaults.start;
    const stop = (opts && opts.stop) || defaults.stop;
    const offset = (opts && opts.offset) || defaults.offset;
    // stickyPosition can be only be either top or bottom
    const stickyPosition = (opts && opts.stickyPosition) || defaults.topSticky;

    if (
      stickyPosition !== 'top' ||
      stickyPosition !== 'bottom'
    ) throw Error('Stickybits works with top and bottom positioning only. 😰');

    // setup stickybit
    const delta = el.outerHeight() / 8;

    // control scrolling
    // measure defines the measure of scroll
    let measure;
    const stickiness = function stickinessFunc() {
      const scroll = window.scrollY;
      const scrollUp = window.scrollY < measure;
      const buffer = (scroll > (measure - delta) || scroll < (measure + delta));
      console.log(delta, measure, scroll, buffer);
      if (scroll > start) {
        el.style.position = 'sticky' || 'fixed';
        el.style[offset] = 0;
        el.setAttribute('data-sticky', true);
        if (buffer && scrollUp && (scroll < stop) && el.getAttribute('data-stuck') === true) {
          el.setAttribute('data-stuck', false);
          el.style.position = 'absolute';
        }
      } else if (buffer && scrollUp && (scroll < start)) {
        el.setAttribute('data-sticky', false);
        el.style.position = el.style[offset] = '';
      }
      if (scroll > stop && el.getAttribute('data-sticky') === true) el.setAttribute('data-stuck', true);
      measure = scroll;
      console.log(measure, window.scrollY);
      return;
    };

    // stuff
    window.addEventListener('scroll', stickiness);
    window.addEventListener('onresize', () => {
      console.log('will do stuff');
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
