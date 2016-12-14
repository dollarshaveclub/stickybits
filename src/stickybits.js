export default function stickybit(target, opts) {
  if (document.querySelector(target).length > 1) throw Error('Stickybits only works on one element per initialization. 😰');
  const el = document.querySelector(target);
  const elStyle = el.getAttribute('style');
  const parent = el.parentNode;
  const parentPosition = parent.getBoundingClientRect();
  const stickyEl = el.style; // Change variable name?
  const stickyStyle = ['-webkit-', '-moz-', '-ms-', '-o-', ''].join('sticky; position: ');

  // defaults
  const defaults = {
    // delta: el.offsetHeight, // Need this still?
    offset: 0,
    position: 'top',
    start: parentPosition.top, // Maybe a different name?
    stop: parentPosition.top + parent.offsetHeight,
    width: '100%', // Can we get rid of this or automate it? If someone wants to hardcode a width on their element, they can with CSS
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
  function stickiness(e) {
    const scroll = window.scrollY;
    const scrollUp = scroll < current;

    // Make updates first and then see what needs to be done below.
    if (scroll > stop && el.getAttribute('data-sticky') === true) el.setAttribute('data-stuck', true);
    current = scroll;

    // Return early if we can, check all conditions (i.e. something isn't changing, sticky -> sticy)
    if (el.stuck && !el.needsToChange) return;

    // Checking if we're not stuck already, etc
    if (scroll > start && !stuck) {
      stickyEl.cssText = `${elStyle}position: ${stickyStyle} sticky; width: ${width}; ${position}: ${offset}`;
      if (stickyEl.position === '') {
        stickyEl.position = 'fixed';
      }
      stickyEl.position = position; // WIP Code?
      el.setAttribute('data-sticky', true);
    } else if (scrollUp && (scroll < start)) {
      el.setAttribute('data-sticky', false);
      stickyEl.position = stickyEl[offset] = '';
    }
    return;
  }
  // rAf
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
