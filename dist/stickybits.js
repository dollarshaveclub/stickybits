(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.stickybits = factory());
}(this, (function () { 'use strict';

var _this2 = undefined;

/*
  STICKYBITS 💉
  --------
  >  a lightweight alternative to `position: sticky` polyfills 🍬
  -  Each method is documented
  -  Key functionalities within methods with methods is documented
  -  Stickybits 2.0 consists of 2 prototypes to improve user experience for developers
     -  ManageSticky prototype supports *`polymorphic functionality` for Stickybits Item
        -  it can/could be treeshaken out
     -  Stickybits prototype supports core functionality
        -  It does not manage polymorphic functionality (position like properties)

  * polymorphic functionality: (in the context of describing Stickybits)
    means making things like `position: sticky` be loosely supported with position fixed.
    It also means that features like `useStickyClasses` takes on styles like `position: fixed`.

/*
  ManageSticky ✔️
  --------
  — manages Stickybits item state
  => checks to see if the element is sticky or stuck
  => based on window scroll
  => provide an interface for users to monitor the state of Stickybits
*/
function ManageSticky(target, o) {
  var _this = this;

  /*
    -  target = Stickybits item instance
    -  o = {object}
       -  scrollEl
       -  verticalPosition
       -  off
   */
  this.el = target;
  this.interval = o.interval;
  this.scrollEl = o.scrollEl;
  this.verticalPosition = o.verticalPosition;
  this.noStyles = o.noStyles;
  this.positionVal = o.positionVal;

  // check if Stickybits is using the `window`
  var el = this.el;
  var se = this.scrollEl;
  var isWin = se === window;
  this.parent = el.parentNode;

  // setup css classes
  this.parentClass = 'js-stickybit-parent';
  this.stickyClass = 'js-is-sticky';
  this.stuckClass = 'js-is-stuck';
  this.parent.className += ' ' + this.parentClass;

  if (!o.off) {
    // compute scroll offsets
    var i = 0;
    var interval = void 0;
    var computeScrollOffsets = function computeScrollOffsets() {
      i += 1;
      if (i > 12) {
        clearInterval(interval);
        return;
      }
      var scrollElOffset = !isWin && _this.positionVal === 'fixed' ? se.getBoundingClientRect().top : 0;
      _this.offset = scrollElOffset + o.offset;
      _this.stickyStart = isWin ? parent.getBoundingClientRect().top : parent.getBoundingClientRect().top - _this.scrollElOffset;
      _this.stickyStop = _this.stickyStart + _this.parent.offsetHeight - (_this.el.offsetHeight - _this.offset);
    };
    computeScrollOffsets();
    interval = setInterval(computeScrollOffsets, 250);
    this.state = 'default';
    se.addEventListener('scroll', this.manageState);
  } else {
    // remove scroll event listener
    se.removeEventListener('scroll', this.manageState
    // turn of sticky invocation
    );this.manageState = false;
  }
  return this;
}

// r arg = removeClass
// a arg = addClass
ManageSticky.prototype.toggleClasses = function toggleClasses(r, a) {
  var el = this.el;
  var cArray = el.className.split(' ');
  if (a && cArray.indexOf(a) === -1) cArray.push(a);
  var rItem = cArray.indexOf(r);
  if (rItem !== -1) cArray.splice(rItem, 1);
  el.className = cArray.join(' ');
};

// manageState
/* stickyStart =>
  -  checks if stickyBits is using window
      -  if it is using window, it gets the top offset of the parent
      -  if it is not using window,
         -  it gets the top offset of the scrollEl - the top offset of the parent
*/
ManageSticky.prototype.manageState = function () {
  // cached variables
  var ns = _this2.noStyles;
  var pv = _this2.positionVal;
  var se = _this2.scrollEl;
  var rAF = typeof se.requestAnimationFrame !== 'undefined' ? se.requestAnimationFrame : function rAFDummy(f) {
    f();
  };
  var state = _this2.state;
  var stickyClass = _this2.stickyClass;
  var stickyStart = _this2.stickyStart;
  var stickyStop = _this2.stickyStop;
  var stuckClass = _this2.stuckClass;
  var styles = _this2.el.style;
  var toggleClasses = _this2.toggleClasses;
  var vp = _this2.verticalPosition;
  // define scroll
  // todo computed
  var scroll = _this2.isWin ? se.scrollY || se.pageYOffset : se.scrollTop;
  // define stick type
  var notSticky = scroll > stickyStart && scroll < stickyStop && (state === 'default' || state === 'stuck');
  var isSticky = scroll < stickyStart && state === 'sticky';
  var isStuck = scroll > stickyStop && state === 'sticky';

  if (notSticky) {
    _this2.state = 'sticky';
    rAF(function () {
      toggleClasses(stuckClass, stickyClass);
      styles.position = pv;
      if (ns) return;
      styles.bottom = '';
      styles[vp] = _this2.offset + 'px';
    });
  } else if (isSticky) {
    _this2.state = 'default';
    rAF(function () {
      toggleClasses(stickyClass);
      if (pv === 'fixed') styles.position = '';
    });
  } else if (isStuck) {
    _this2.state = 'stuck';
    rAF(function () {
      toggleClasses(stickyClass, stuckClass);
      if (pv !== 'fixed' || ns) return;
      styles.top = '';
      styles.bottom = '0';
      styles.position = 'absolute';
    });
  }
  return _this2;
};

ManageSticky.prototype.removeClass = function removeClass(selector, c) {
  var s = selector;
  var cArray = s.className.split(' ');
  var cItem = cArray.indexOf(c);
  if (cItem !== -1) cArray.splice(cItem, 1);
  s.className = cArray.join(' ');
};

/*
  cleanup 🛁
  --------
  - target = el (DOM element)
  - scrolltarget = window || 'dealer's chose'
  - scroll = removes scroll event listener
*/
ManageSticky.prototype.cleanup = function cleanup() {
  var el = this.el;
  var removeClass = this.removeClass;
  var styles = el.styles;
  // cleanup styles
  styles.position = '';
  styles[this.vp] = '';
  // cleanup CSS classes
  removeClass(el, 'js-is-sticky');
  removeClass(el, 'js-is-stuck');
  removeClass(el.parentNode, 'js-stickybit-parent');
};

function Stickybits(target, o) {
  /*
    defaults 🔌
    --------
    -  target = el (DOM element)
    -  interval = the amount of time passed before a computed is invoked
    -  scrollEl = scroll element (DOM element used for scroll event)
    -  offset = 0 || dealer's choice
    -  verticalPosition = top || bottom
    -  useStickyClasses = boolean
    -  noStyles = boolean
    -  off = boolean
  */
  this.props = typeof o !== 'undefined' ? o : {};
  this.props.interval = o.intnerval || 250;
  this.props.scrollEl = o.scrollEl || window;
  this.props.offset = o.stickyBitStickyOffset || 0;
  this.props.verticalPosition = o.verticalPosition || 'top';
  this.props.useStickyClasses = o.useStickyClasses || false;
  this.props.noStyles = o.noStyles || false;
  this.props.off = o.off || false;
  /*
    define positionVal
    ----
    -  uses a computed (`.setStickyPosition()`)
    -  defined the position
  */
  this.props.positionVal = this.setStickyPosition();
  var pv = this.props.positionVal;
  this.els = typeof target === 'string' ? document.querySelectorAll(target) : target;
  if (!('length' in this.els)) this.els = [this.els];
  this.instances = [];
  for (var i = 0; i < this.els.length; i += 1) {
    var vp = this.props.verticalPosition;
    var ns = this.props.noStyles;
    var el = this.els[i];
    var styles = el.style;
    if (vp === 'top' && !ns) styles[vp] = this.offset + 'px';
    if (pv !== 'fixed' || this.props.useStickyClasses === false) {
      styles.position = pv;
    } else {
      var elProps = {
        noStyles: ns,
        off: this.props.off,
        offset: this.props.offset,
        positionVal: pv,
        scrollEl: this.props.scrollEl,
        verticalPosition: vp
      };
      this.instances.push(new ManageSticky(el, elProps));
    }
  }
  return this;
}

/*
  setStickyPosition ✔️
  --------
  —  most basic thing stickybits does
  => checks to see if position sticky is supported
  => defined the position to be used
  => stickybits works accordingly
*/
Stickybits.prototype.definePosition = function () {
  var test = document.createElement('test');
  var prefix = ['', '-o-', '-webkit-', '-moz-', '-ms-'];
  var styles = test.styles;
  for (var i = 0; i < prefix.length; i += 1) {
    styles.position = prefix[i] + 'sticky';
  }
  return styles.position !== '' ? styles.position : 'fixed';
};

function stickybits(target, o) {
  return new Stickybits(target, o);
}

return stickybits;

})));
