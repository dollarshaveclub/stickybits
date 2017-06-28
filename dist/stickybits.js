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
function Stickybit(target, o) {
  if (typeof window === 'undefined') throw Error('stickybits requires `window`');
  /*
    defaults 🔌
    --------
    - target = el (DOM element)
    - offset = 0 || 'dealer's choice'
    - verticalPosition = top || bottom
    - useStickyClasses =
    - elStyles = CSS Styles
    - stickyVal = fixed || sticky
  */
  this.el = target;
  this.offset = o && o.stickyBitStickyOffset || 0;
  this.vp = o && o.verticalPosition || 'top';
  this.useClasses = o && o.useStickyClasses || false;
  this.stickyVal = 'fixed';
  this.setPosition();
  if (this.stickyVal === 'fixed' || this.useClasses === true) {
    this.observeStickiness();
  }
  return this;
}

/*
  setPosition ✔️
  --------
  — most basic thing stickybits does
  => checks to see if position sticky is supported
  => stickybits works accordingly
*/
Stickybit.prototype.setPosition = function setPosition() {
  var prefix = ['', '-o-', '-webkit-', '-moz-', '-ms-'];
  var s = this.el.style;
  var vp = this.vp;
  for (var i = 0; i < prefix.length; i += 1) {
    s.position = prefix[i] + 'sticky';
  }
  if (s.position !== '') {
    this.stickyVal = s.position;
    if (vp === 'top') {
      s[vp] = this.offset + 'px';
    }
  }
  return this;
};

/*
  observeStickiness ✔️
  --------
  — observe stickybit state
  => checks to see if the element is sticky || stuck
  => based on window scroll
*/
Stickybit.prototype.observeStickiness = function observeStickiness() {
  // cache default variables
  var sv = this.stickyVal;
  var vp = this.vp;
  var offset = this.offset;
  var el = this.el;
  var s = el.style;

  // setup stickbits for dom mutations
  var parent = el.parentNode;
  var classes = el.classList;
  parent.classList.add('js-stickybit-parent');
  var stickyClass = 'js-is-sticky';
  var stuckClass = 'js-is-stuck';
  var hasStickyClass = classes.contains(stickyClass);
  var hasStuckClass = classes.contains(stuckClass);

  // setup variables to manage stickiness
  var win = window;
  var scroll = void 0;
  var stickyStart = void 0;
  var stickyStop = void 0;

  // manage stickiness
  function stickiness() {
    if (scroll < stickyStart && hasStickyClass) {
      classes.remove(stickyClass);
      if (sv === 'fixed') s.position = '';
    } else if (scroll > stickyStart && scroll < stickyStop) {
      if (!hasStickyClass) classes.add(stickyClass);
      if (hasStuckClass) {
        classes.remove(stuckClass);
        s.bottom = '';
      }
      s.position = sv;
      s[vp] = offset + 'px';
    } else if (scroll > stickyStop && !hasStuckClass) {
      classes.remove(stickyClass);
      classes.add(stuckClass);
      if (sv !== 'fixed') return;
      s.top = '';
      s.bottom = '0';
      s.position = 'absolute';
    }
  }

  this.manageStickiness = function () {
    // variables that manage stickiness
    scroll = win.scrollY || win.pageYOffset;
    stickyStart = el.getBoundingClientRect().top;
    stickyStop = stickyStart + parent.offsetHeight - (el.offsetHeight - offset);
    // only add rAF for stickiness 💅
    // => when the dom will actually change
    if (scroll < stickyStart && !hasStickyClass || scroll > stickyStart && scroll < stickyStop && hasStickyClass && !hasStuckClass || scroll < stickyStop && hasStuckClass) return;
    win.requestAnimationFrame(stickiness);
  };

  win.addEventListener('scroll', this.manageStickiness);
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
  var s = el.style;
  // cleanup s
  s.position = '';
  s[this.vp] = '';
  // cleanup CSS classes
  el.classList.remove('js-is-sticky', 'js-is-stuck');
  el.parentNode.classList.remove('js-stickybit-parent');
  // remove scroll event listener
  window.removeEventListener('scroll', this.manageStickiness);
  // turn of sticky invocation
  this.manageStickiness = false;
};

function MultiBits(userInstances) {
  var _this = this;

  this.privateInstances = userInstances || [];
  this.cleanup = function () {
    return _this.privateInstances.forEach(function (instance) {
      return instance.cleanup();
    });
  };
}

function stickybits(target, o) {
  var els = typeof target === 'string' ? document.querySelectorAll(target) : target;
  if (!('length' in els)) els = [els];
  var instances = [];
  for (var i = 0; i < els.length; i += 1) {
    var el = els[i];
    instances.push(new Stickybit(el, o));
  }
  return new MultiBits(instances);
}

return stickybits;

})));
