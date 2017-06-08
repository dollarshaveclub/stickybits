(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.stickybits = factory());
}(this, (function () { 'use strict';

/*
  STICKYBITS 💉
  --------
  a lightweight alternative to `position: sticky` polyfills 🍬
*/
var browserPrefix = ['', '-o-', '-webkit-', '-moz-', '-ms-'];

function Stickybit(target, o) {
  /*
    functionality setup 🔧
    --------
    - target = el (DOM element)
    - scrolltarget = window || 'dealer's chose'
  */
  this.el = target;
  this.st = o && o.scrollTarget || window;

  /*
    defaults 🔌
    --------
    - offset = 0 || 'dealer's choice'
    - verticalPosition = top || bottom
    - useStickyClasses =
    - elStyles = CSS Styles
    - positionStickyVal = fixed || sticky
  */
  this.offset = o && o.stickyBitStickyOffset || 0;
  this.vp = o && o.verticalPosition || 'top';
  this.useClasses = o && o.useStickyClasses || false;
  this.styles = this.el.style;
  this.positionStickyVal = 'fixed';
}

/*
  setStickyPosition ✔️
  --------
  — most basic thing stickybits does
  => checks to see if position sticky is supported
  => stickybits works accordingly
*/
Stickybit.prototype.setStickyPosition = function setStickyPosition() {
  var styles = this.styles;
  var vp = this.vp;
  for (var i = 0; i < browserPrefix.length; i += 1) {
    styles.position = browserPrefix[i] + 'sticky';
  }
  if (styles.position !== '') {
    this.positionStickyVal = styles.position;
    if (vp === 'top') {
      styles[vp] = this.offset + 'px';
    }
  }
  return this;
};

/*
  manageStickiness ✔️
  --------
  — manages stickybit state
  => checks to see if the element is sticky || stuck
  => based on window scroll
*/
Stickybit.prototype.manageStickiness = function manageStickiness() {
  var _this = this;

  // set new vars if .manageStickiness method is used
  this.classes = this.el.classList;
  this.parent = this.el.parentNode;
  this.parent.classList.add('js-stickybit-parent');

  // optimize vars for managing stickiness
  var st = this.st;
  var pv = this.positionStickyVal;
  var vp = this.vp;
  var offset = this.offset;
  var styles = this.styles;
  var classes = this.classes;
  var stickyBitStart = this.el.getBoundingClientRect().top;
  var stickyBitStop = stickyBitStart + this.parent.offsetHeight - (this.el.offsetHeight - offset);
  var stickyClass = 'js-is-sticky';
  var stuckClass = 'js-is-stuck';

  // manage stickiness
  function stickiness() {
    var scroll = st.scrollY;
    var hasStickyClass = classes.constains(stickyClass);
    var hasStuckClass = classes.constains(stuckClass);
    if (scroll < stickyBitStart) {
      if (hasStickyClass) {
        classes.remove(stickyClass);
        if (pv === 'fixed') styles.position = '';
      }
    } else if (scroll > stickyBitStart && scroll < stickyBitStop) {
      if (hasStickyClass) classes.add(stickyClass);
      if (hasStuckClass) {
        classes.remove(stuckClass);
        styles.bottom = '';
      }
      styles.position = pv;
      styles[vp] = offset + 'px';
    } else if (scroll > stickyBitStop && !hasStuckClass) {
      classes.remove(stickyClass);
      classes.add(stuckClass);
      if (pv !== 'fixed') return;
      styles.top = '';
      styles.bottom = '0';
      styles.position = 'absolute';
    }
  }

  var invoked = void 0;

  this.checkStickiness = function checkStickiness() {
    if (invoked) return;
    invoked = true;
    stickiness();
    window.setTimeout(function () {
      invoked = false;
    }, 0);
  };

  st.addEventListener('scroll', function () {
    return st.requestAnimationFrame(_this.checkStickiness);
  });
  return this;
};

/*
  cleanup 🛁
  --------
  - target = el (DOM element)
  - scrolltarget = window || 'dealer's chose'
  - scroll = removes scroll event listener
*/
Stickybit.prototype.cleanup = function cleanup() {
  var el = this.el;
  el.classList.remove('js-is-sticky', 'js-is-stuck');
  el.parentNode.classList.remove('js-stickybit-parent');
  this.st.removeEventListener('scroll', this.checkStickiness);
};

Stickybit.prototype.init = function init() {
  this.setStickyPosition();
  if (this.positionStickyVal === 'fixed' || this.useClasses === true) {
    this.manageStickiness();
  }
  return this;
};

function stickybits(target, o) {
  var els = typeof target === 'string' ? document.querySelectorAll(target) : target;
  if (!('length' in els)) els = [els];
  for (var i = 0; i < els.length; i += 1) {
    var el = els[i];
    return new Stickybit(el, o).init();
  }
  return this;
}

return stickybits;

})));
