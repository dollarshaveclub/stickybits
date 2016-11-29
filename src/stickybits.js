export default function stickybit(target, opts) {
  let els = typeof target === 'string' ? document.querySelectorAll(target) : target;
  if (!('length' in els)) els = [els];

  // defaults
  const defaults = {
    offset: 0,
    position: 'top',
  };
  const offset = (opts && opts.offset) || defaults.offset;
  const position = (opts && opts.position) || defaults.position;

  // control scrolling
  let current = 0;
  function stickiness() {
    const scroll = window.scrollY;
    const scrollUp = scroll < current;
    for (let i = 0; i < els.length; i + 1) {
      const el = els[i];
      const parent = el.parentNode.getBoundingClientRect();

      // set defaults that could be parent element based
      const delta = (opts && opts.delta) || el.offestHeight;
      const start = (opts && opts.start) || parent.top;
      const stop = (opts && opts.stop) || parent.top + parent.height;

      if (
        position !== 'top' &&
        position !== 'bottom'
      ) throw Error('Stickybits works with top and bottom positioning only. 😰');

      if (scroll > start) {
        el.style.position = 'sticky' || 'fixed';
        el.style[offset] = 0;
        el.setAttribute('data-sticky', true);
      } else if (scrollUp && (scroll < start)) {
        el.setAttribute('data-sticky', false);
        el.style.position = el.style[offset] = '';
      }
      if (scroll > stop && el.getAttribute('data-sticky') === true) el.setAttribute('data-stuck', true);
      console.log(
        start,
        stop,
        offset,
        position,
        delta
      );
    }
    current = scroll;
    console.log(
      current,
      scroll,
      scrollUp
    );
  }
  window.addEventListener('scroll', stickiness);
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
