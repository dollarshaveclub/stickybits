export default function stickybit(target, opts) {
  if (document.querySelector(target).length > 1) throw Error('Stickybits only works on one element per initialization. 😰');
  const el = document.querySelector(target);
  const parent = el.parentNode;
  const parentPosition = parent.getBoundingClientRect();

  // defaults
  const defaults = {
    delta: el.offestHeight,
    offset: 0,
    position: 'top',
    start: parentPosition.top,
    stop: parentPosition.top + parent.offestHeight,
  };

  const offset = (opts && opts.offset) || defaults.offset;
  const position = (opts && opts.position) || defaults.position;
  const delta = (opts && opts.delta) || defaults.delta;
  const start = (opts && opts.start) || defaults.start;
  const stop = (opts && opts.stop) || defaults.stop;

  console.log(offset, position, el, parent, position, delta, start, stop);

  if (
    position !== 'top' &&
    position !== 'bottom'
  ) throw Error('Stickybits works with top and bottom positioning only. 😰');

  // maintain stickiness
  let current = 0;
  function stickiness() {
    const scroll = window.scrollY;
    const scrollUp = scroll < current;
    console.log(current, scroll, scrollUp);
    if (scroll > start) {
      el.style.position = 'sticky';
      if (el.style.position === '') el.style.position = 'fixed';
      el.style[offset] = 0;
      el.setAttribute('data-sticky', true);
    } else if (scrollUp && (scroll < start)) {
      el.setAttribute('data-sticky', false);
      el.style.position = el.style[offset] = '';
    }
    if (scroll > stop && el.getAttribute('data-sticky') === true) el.setAttribute('data-stuck', true);
    current = scroll;
    return;
  }
  window.addEventListener('scroll', () => stickiness);
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
