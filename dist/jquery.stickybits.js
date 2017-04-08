(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (factory());
}(this, (function () { 'use strict';

function Stickybit(target, o) {
  var el = target;
  var scrollTarget = o && o.scrollTarget || window;
  var stickyBitStickyOffset = o && o.stickyBitStickyOffset || 0;
  var verticalPosition = o && o.verticalPosition || 'top';
  var useStickyClasses = o && o.useStickyClasses || false;
  var elStyle = el.style;
  var browserPrefix = ['', '-o-', '-webkit-', '-moz-', '-ms-'];
  for (var i = 0; i < browserPrefix.length; i += 1) {
    elStyle.position = browserPrefix[i] + 'sticky';
  }
  var positionStickyVal = 'fixed';
  if (elStyle.position !== '') {
    positionStickyVal = elStyle.position;
    if (verticalPosition === 'top') {
      elStyle[verticalPosition] = stickyBitStickyOffset + 'px';
    }
    if (useStickyClasses === false) return;
  }
  var elClasses = el.classList;
  var elParent = el.parentNode;
  var stickyBitClass = 'js-is-sticky';
  var stickyBitIsStuckClass = 'js-is-stuck';
  var stickyBitStart = el.getBoundingClientRect().top;
  var stickyBitStop = stickyBitStart + elParent.offsetHeight - el.offsetHeight;
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
      elStyle.position = positionStickyVal;
      elStyle[verticalPosition] = stickyBitStickyOffset + 'px';
      return;
    } else if (scroll > stickyBitStop && !elClasses.contains(stickyBitIsStuckClass)) {
      elClasses.remove(stickyBitClass);
      elClasses.add(stickyBitIsStuckClass);
      if (positionStickyVal !== 'fixed') return;
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
function stickybits(target, o) {
  var els = typeof target === 'string' ? document.querySelectorAll(target) : target;
  if (!('length' in els)) els = [els];
  var stickyBit = void 0;
  for (var i = 0; i < els.length; i += 1) {
    var el = els[i];
    stickyBit = new Stickybit(el, o);
  }
  return stickyBit;
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

})));
