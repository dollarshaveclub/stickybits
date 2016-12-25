// Stickybits
// ----------
/*
  📍the basic stickybits only does what's needed
    -  Only the sticky position and css classes are added to the Element.
    -  Any extra styling must be added to make stickybits look awesome!
*/
export default function stickybits(target, opts) {
  if (document.querySelector(target).length > 1) throw Error('Check your selector. Stickybits only works on one element per initialization. 😰');
  const el = document.querySelector(target);
  const defaults = {
    scrolltarget: window,
    vendor: ['-webkit-', '-moz-', '-ms-', ''],
  };
  const scrolltarget = (opts && opts.scrolltarget) || defaults.scrolltarget;
  const verdor = (opts && opts.vendor) || defaults.vendor;
  const elStyle = el.style;
  const stickyCss = `${verdor.join('sticky; position: ')}sticky`;
  // does the sticky position css rule exist? 🤔
  elStyle.position = stickyCss;
  // if the sticky position rule exists we're done 💪
  if (elStyle.position !== '') return;
  // maintain stickiness with `fixed position` 🍬
  const parent = el.parentNode;
  const parentPosition = parent.getBoundingClientRect();
  const elClasses = el.classList;
  const stickyClass = 'js-is-sticky';
  const stuckClass = 'js-is-stuck';
  const fixed = 'fixed';
  const start = parentPosition.top;
  const stop = parentPosition.top + parent.offsetHeight;
  function stickiness() {
    const scroll = scrolltarget.scrollY;
    if (scroll < start) {
      if (elClasses.contains(stickyClass)) {
        elClasses.remove(stickyClass);
        elStyle.position = '';
      }
      return;
    } else if (scroll > start && scroll < stop) {
      if (!elClasses.contains(stickyClass)) elClasses.add(stickyClass);
      if (elClasses.contains(stuckClass)) elClasses.remove(stuckClass);
      elStyle.position = fixed;
      return;
    } else if (scroll > stop && !elClasses.contains(stuckClass)) {
      elClasses.remove(stickyClass);
      elClasses.add(stuckClass);
      elStyle.position = 'absolute';
      return;
    }
    return;
  }
  scrolltarget.addEventListener('scroll', () => scrolltarget.requestAnimationFrame(stickiness));
}

if (typeof window !== 'undefined') {
  const plugin = window.$ || window.jQuery || window.Zepto;
  if (plugin) {
    plugin.fn.stickybits = function stickybitsPlugin(opts) {
      stickybits(this, opts);
      return;
    };
  }
}
