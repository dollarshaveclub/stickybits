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
function supportsSticky() {
  var el = document.createElement('test');
  var browserPrefix = ['', '-o-', '-webkit-', '-moz-', '-ms-'];
  var elStylePosition = el.style;
  for (var i = 0; i < browserPrefix.length; i += 1) {
    elStylePosition = browserPrefix[i] + 'sticky';
  }
  var htmlEl = document.documentElement;
  if (elStylePosition !== '') {
    htmlEl.setAttribute('data-sticky-style', elStylePosition);
    return;
  }
  return;
}
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
  var customVerticalPosition = opts && opts.customVerticalPosition || defaults.customVerticalPosition;
  var stickyBitStickyOffset = opts && opts.stickyBitStickyOffset || defaults.stickyBitStickyOffset;
  var fixedOnly = opts && opts.fixedOnly || defaults.fixedOnly;
  var fixedSticky = opts && opts.fixedSticky || defaults.fixedSticky;
  var elStyle = el.style;
  var stickyPosition = document.documentElement.getAttribute('data-sticky-style') || 'fixed';
  if (fixedSticky === false) {
    if (customVerticalPosition === false) {
      elStyle.top = stickyBitStickyOffset + 'px';
    }
    elStyle.position = stickyPosition;
    return;
  }
  if (fixedOnly === true) {
    stickyPosition = 'fixed';
  }
  var elClasses = el.classList;
  var elParent = el.parentNode;
  var elHeight = el.offsetHeight;
  var stickyBitClass = 'js-is-sticky';
  var stickyBitIsStuckClass = 'js-is-stuck';
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
      elStyle.position = stickyPosition;
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
  return;
}
function stickybits(target, opts) {
  supportsSticky();
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
