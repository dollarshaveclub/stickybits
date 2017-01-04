// Stickybits
// ----------
/*
  📍the basic stickybits only does what's needed
    -  Only the sticky position and css classes are added to the Element.
    -  Any extra styling must be added to make stickybits look awesome!
*/
function stickybit(target, opts) {
  const el = target;
  const defaults = {
    scrolltarget: window,
    prefix: ['', '-webkit-', '-moz-', '-ms-'],
    verticalposition: 'top',
    stickyoffset: '0',
    oldschool: false,
  };
  const scrolltarget = (opts && opts.scrolltarget) || defaults.scrolltarget;
  const prefix = (opts && opts.prefix) || defaults.prefix;
  // vertical position css prop (top 🔺|| bottom 🔻), relative to its parent
  // re: `top: 0; || bottom: 0;` (the prop)
  const verticalposition = (opts && opts.verticalposition) || defaults.verticalposition;
  // sticky offset is the css num val associated with the sticky element's vertical position
  // re: `top: 0; || top: 10px`; (the val)
  const stickyoffset = (opts && opts.stickyoffset) || defaults.stickyoffset;
  // set `oldschool:  true` if you want a stickybit to be `position: fixed`
  const oldSchool = (opts && opts.oldSchool) || defaults.oldSchool;
  const elStyle = el.style;
  const elClasses = el.classList;
  // does the sticky position css rule exist? 🤔
  for (let i = 0; i < prefix.length; i += 1) {
    elStyle.position = `${prefix[i]}sticky`;
  }
  // if the sticky position rule exists we're done 💪
  if (elStyle.position !== '') {
    elStyle[verticalposition] = stickyoffset;
    elClasses.add('js-sticky-support');
    if (oldSchool === false) return;
  }
  // maintain stickiness with `fixed position` 🍬
  const parent = el.parentNode;
  const elPosition = el.getBoundingClientRect();
  const stickyClass = 'js-is-sticky';
  const stuckClass = 'js-is-stuck';
  const fixed = 'fixed';
  const start = elPosition.top;
  const stop = elPosition.top + parent.offsetHeight;
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
      if (elClasses.contains(stuckClass)) {
        elClasses.remove(stuckClass);
        elStyle.bottom = '';
      }
      elStyle.position = fixed;
      elStyle[verticalposition] = stickyoffset;
      return;
    } else if (scroll > stop && !elClasses.contains(stuckClass)) {
      elClasses.remove(stickyClass);
      elClasses.add(stuckClass);
      elStyle.top = '';
      elStyle.bottom = '0';
      elStyle.position = 'absolute';
      return;
    }
    return;
  }
  scrolltarget.addEventListener('scroll', () => scrolltarget.requestAnimationFrame(stickiness));
}

export default function stickybits(target, opts) {
  let els = typeof target === 'string' ? document.querySelectorAll(target) : target;
  if (!('length' in els)) els = [els];

  for (let i = 0; i < els.length; i += 1) {
    const el = els[i];
    stickybit(el, opts);
  }
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
