export default function stickybit(target, opts) {
  if (document.querySelector(target).length > 1) throw Error('Stickybits only works on one element per initialization. 😰');

  const el = document.querySelector(target);
  const elCurrentStyles = el.getAttribute('style');
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
  const elStyles = el.style;
  let stickycss = `${['-webkit-', '-moz-', '-ms-', '-o-', ''].join('sticky; position: ')}sticky`;
  // test if sticky position exists
  elStyles.position = stickycss;
  if (elStyles.position === '') {
    stickycss = 'fixed';
  }
  const stickyStyles = `position: ${stickycss}; width: ${width}; ${position}: ${offset}; ${elCurrentStyles}`;

  // maintain stickiness
  function stickiness() {
    const scroll = window.scrollY;
    console.log(scroll, stop);
    // exit if function is less than start
    if (scroll < start) {
      if (el.getAttribute('data-sticky') === 'true') {
        el.setAttribute('data-sticky', 'false');
        elStyles.position = elStyles[offset] = '';
      }
      return;
    }
    el.setAttribute('data-sticky', 'true');
    if (scroll < stop && el.getAttribute('data-stuck') === 'true') {
      el.setAttribute('data-stuck', 'false');
    }
    // sets up sticky
    elStyles.cssText = stickyStyles;
    elStyles[position] = offset;
    // exit if already stuck
    // if (scroll > stop && el.getAttribute('data-stuck') === 'true') return;
    // // set up stuck
    // el.setAttribute('data-stuck', 'true');
    // el.style.position = 'absolute';
    // el.style.bottom = '0';
    // el.style.top = '';
    // return;
  }
  window.addEventListener('scroll', () => window.requestAnimationFrame(stickiness));
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
