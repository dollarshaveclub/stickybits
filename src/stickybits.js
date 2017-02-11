
/*
  Stickybits
  ----------
  📍Stickybits at it's core only does what's needed
    -  Only `position: sticky || postition: fixed` + css classes are added to the Element.
    -  Extra styling must be added to make stickybits look awesome!
*/
function stickybit(target, opts) {
  const el = target;
  const defaults = {
    scrollTarget: window,
    verticalLayoutPosition: 'top',
    stickyBitStickyOffset: '0',
    fixedOnly: false,
    fixedSticky: false,
  };
  const scrollTarget = (opts && opts.scrollTarget) || defaults.scrollTarget;
  const browserPrefix = ['', '-o-', '-webkit-', '-moz-', '-ms-'];
  const verticalLayoutPosition = (opts && opts.verticalLayoutPosition) || defaults.verticalLayoutPosition;
  const stickyBitStickyOffset = (opts && opts.stickyBitStickyOffset) || defaults.stickyBitStickyOffset;
  const fixedOnly = (opts && opts.fixedOnly) || defaults.fixedOnly;
  const fixedSticky = (opts && opts.fixedSticky) || defaults.fixedSticky;
  const elStyle = el.style;
  const elClasses = el.classList;
  if (fixedOnly === true) {
    // does the sticky position css rule exist? 🤔
    for (let i = 0; i < browserPrefix.length; i += 1) {
      elStyle.position = `${browserPrefix[i]}sticky`;
    }
    /* if `position: sticky` exists ||
       `fixedOnly` is false ||
       `fixedSticky` is false
      we're done 💪
    */
    if (elStyle.position !== '') {
      elStyle[verticalLayoutPosition] = stickyBitStickyOffset;
      elClasses.add('js-sticky-support');
      if (fixedSticky === false) return;
    }
  }
  /*
    maintain stickiness with
    `fixed position` ||
    `or make `position: sticky` behave like fixed sticky 🍬
  */
  const elParent = el.parentNode;
  const elHeight = el.offsetHeight;
  const stickyBitClass = 'js-is-sticky';
  const stickyBitIsStuckClass = 'js-is-stuck';
  const fixed = 'fixed';
  const stickyBitStart = el.getBoundingClientRect().top;
  const stickyBitStop = (stickyBitStart + elParent.offsetHeight) - elHeight;
  elParent.classList.add('js-stickybit-parent');
  function stickiness() {
    const scroll = scrollTarget.scrollY;
    if (scroll < stickyBitStart) {
      if (elClasses.contains(stickyBitClass)) {
        elClasses.remove(stickyBitClass);
        elStyle.position = '';
      }
      return;
    } else if (scroll > stickyBitStart && scroll < stickyBitStop) {
      if (!elClasses.contains(stickyBitClass)) elClasses.add(stickyBitClass);
      if (elClasses.contains(stickyBitIsStuckClass)) {
        elClasses.remove(stickyBitIsStuckClass);
        elStyle.bottom = '';
      }
      elStyle.position = fixed;
      elStyle[verticalLayoutPosition] = stickyBitStickyOffset;
      return;
    } else if (scroll > stop && !elClasses.contains(stickyBitIsStuckClass)) {
      elClasses.remove(stickyBitClass);
      elClasses.add(stickyBitIsStuckClass);
      elStyle.top = '';
      elStyle.bottom = '0';
      elStyle.position = 'absolute';
      return;
    }
    return;
  }
  scrollTarget.addEventListener('scroll', () => scrollTarget.requestAnimationFrame(stickiness));
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
