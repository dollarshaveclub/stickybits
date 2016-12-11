export default function stickybit(target, opts) {
  if (document.querySelector(target).length > 1) throw Error('Stickybits only works on one element per initialization. 😰');
  const el = document.querySelector(target);
  const elStyle = el.getAttribute('style');
  const parent = el.parentNode;
  const parentPosition = parent.getBoundingClientRect();
  const stickyEl = el.style;
  const stickyStyle = ['-webkit-', '-moz-', '-ms-', '-o-', ''].join('sticky; position: ');

  // defaults
  const defaults = {
    // delta: el.offsetHeight,
    offset: 0,
    position: 'top',
    start: parentPosition.top,
    stop: parentPosition.top + parent.offsetHeight,
    width: '100%',
  };

  // const delta = (opts && opts.delta) || defaults.delta;
  const offset = (opts && opts.offset) || defaults.offset;
  const position = (opts && opts.position) || defaults.position;
  const start = (opts && opts.start) || defaults.start;
  const stop = (opts && opts.stop) || defaults.stop;
  const width = (opts && opts.width) || defaults.width;

  if (
    position !== 'top' &&
    position !== 'bottom'
  ) throw Error('Stickybits works with top and bottom positioning only. 😰');

  // maintain stickiness
  let current = 0;
  function stickiness() {
    const scroll = window.scrollY;
    const scrollUp = scroll < current;
    if (scroll > start) {
      stickyEl.cssText = `${elStyle}position: ${stickyStyle} sticky; width: ${width}; ${position}: ${offset}`;
      if (stickyEl.position === '') {
        stickyEl.position = 'fixed';
      }
      stickyEl[offset] = 0;
      el.setAttribute('data-sticky', true);
    } else if (scrollUp && (scroll < start)) {
      el.setAttribute('data-sticky', false);
      stickyEl.position = stickyEl[offset] = '';
    }
    if (scroll > stop && el.getAttribute('data-sticky') === true) el.setAttribute('data-stuck', true);
    current = scroll;
    return;
  }
  window.addEventListener('scroll', () => stickiness());
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
