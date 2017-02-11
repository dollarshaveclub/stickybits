(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.stickybits = factory());
}(this, (function () { 'use strict';

/*
  Stickybits
  ----------
  📍Stickybits at it's core only does what's needed
    -  Only `position: sticky || postition: fixed` + css classes are added to the Element.
    -  Extra styling must be added to make stickybits look awesome!
*/
function stickybit(target, opts) {
  var el = target;
  var defaults = {
    scrollTarget: window,
    stickyBitStickyOffset: '0',
    fixedOnly: false,
    fixedSticky: false,
    customVerticalPosition: false
  };
  var scrollTarget = opts && opts.scrollTarget || defaults.scrollTarget;
  var browserPrefix = ['', '-o-', '-webkit-', '-moz-', '-ms-'];
  var customVerticalPosition = opts && opts.customVerticalPosition || defaults.customVerticalPosition;
  var stickyBitStickyOffset = opts && opts.stickyBitStickyOffset || defaults.stickyBitStickyOffset;
  var fixedOnly = opts && opts.fixedOnly || defaults.fixedOnly;
  var fixedSticky = opts && opts.fixedSticky || defaults.fixedSticky;
  var elStyle = el.style;
  var elClasses = el.classList;
  var positionStickySupport = false;
  var stickyValue = void 0;
  if (fixedOnly === false) {
    // does the sticky position css rule exist? 🤔
    for (var i = 0; i < browserPrefix.length; i += 1) {
      elStyle.position = browserPrefix[i] + 'sticky';
    }
    /* if `position: sticky` exists ||
       `fixedOnly` is false ||
       `fixedSticky` is false
      we're done 💪
    */
    if (elStyle.position !== '') {
      positionStickySupport = true;
      if (fixedSticky) {
        stickyValue = elStyle.position;
        console.log(stickyValue);
        elStyle.top = '';
      }
      if (customVerticalPosition === false) {
        elStyle.top = stickyBitStickyOffset + 'px';
      }
      if (fixedSticky === false) return;
    }
  }
  /*
    maintain stickiness with
    `fixed position` ||
    `or make `position: sticky` behave like fixed sticky 🍬
  */
  var elParent = el.parentNode;
  var elHeight = el.offsetHeight;
  var stickyBitClass = 'js-is-sticky';
  var stickyBitIsStuckClass = 'js-is-stuck';
  var stickyBitCss = positionStickySupport ? stickyValue : 'fixed';
  var stickyBitStart = el.getBoundingClientRect().top;
  var stickyBitStop = stickyBitStart + elParent.offsetHeight - elHeight;
  elParent.classList.add('js-stickybit-parent');
  function stickiness() {
    var scroll = scrollTarget.scrollY;
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
      elStyle.position = stickyBitCss;
      if (customVerticalPosition === false) {
        elStyle.top = stickyBitStickyOffset + 'px';
      }
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
  scrollTarget.addEventListener('scroll', function () {
    return scrollTarget.requestAnimationFrame(stickiness);
  });
}

function stickybits(target, opts) {
  var els = typeof target === 'string' ? document.querySelectorAll(target) : target;
  if (!('length' in els)) els = [els];

  for (var i = 0; i < els.length; i += 1) {
    var el = els[i];
    stickybit(el, opts);
  }
}

if (typeof window !== 'undefined') {
  var plugin = window.$ || window.jQuery || window.Zepto;
  if (plugin) {
    plugin.fn.stickybits = function stickybitsPlugin(opts) {
      stickybits(this, opts);
      return;
    };
  }
}

return stickybits;

})));
