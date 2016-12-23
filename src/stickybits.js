export default function stickybit(target, opts) {
  if (document.querySelector(target).length > 1) throw Error('Stickybits only works on one element per initialization. 😰');

  const el = document.querySelector(target);
  const currentCss = el.getAttribute('style');
  const parent = el.parentNode;
  const parentPosition = parent.getBoundingClientRect();

  // defaults
  const defaults = {
    offset: 0,
    position: 'top',
    start: parentPosition.top,
    stop: parentPosition.top + parent.offsetHeight,
    width: '100%',
  };
  // offset = the stickybit sticky position offset
  const offset = (opts && opts.offset) || defaults.offset;
  const position = (opts && opts.position) || defaults.position;
  const start = (opts && opts.start) || defaults.start;
  const stop = (opts && opts.stop) || defaults.stop;
  const width = (opts && opts.width) || defaults.width;

  if (
    position !== 'top' &&
    position !== 'bottom'
  ) throw Error('Stickybits works with top and bottom positioning only. 😰');
  const css = el.style;
  let stickycss = `${['-webkit-', '-moz-', '-ms-', '-o-', ''].join('sticky; position: ')}sticky`;
  // test if sticky position exists
  css.position = stickycss;
  if (css.position === '') {
    stickycss = 'fixed';
  }
  const csstext = `position: ${stickycss}; width: ${width}; ${position}: ${offset}; ${currentCss}`;

  // maintain stickiness
  function stickiness() {
    const scroll = window.scrollY;
    // exit if function is less than start
    if (scroll < start) {
      if (el.getAttribute('data-sticky') === true) {
        el.setAttribute('data-sticky', false);
        css.position = css[offset] = '';
      }
      return;
    }
    // exit if already sticky
    if (el.getAttribute('data-sticky') === true && scroll < stop) return;
    // sets up sticky
    css.cssText = csstext;
    css[position] = offset;
    el.setAttribute('data-sticky', true);
    // exit if already stuck
    if (scroll > stop && el.getAttribute('data-stuck') === true) return;
    // set up stuck
    el.setAttribute('data-stuck', true);
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
