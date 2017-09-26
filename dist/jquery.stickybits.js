(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

/*
  STICKYBITS 💉
  --------
  > a lightweight alternative to `position: sticky` polyfills 🍬
  - Each method is documented
  - It does not manage polymorphic functionality (position like properties)
  * polymorphic functionality: (in the context of describing Stickybits)
    means making things like `position: sticky` be loosely supported with position fixed.
    It also means that features like `useStickyClasses` takes on styles like `position: fixed`.

  --------
  defaults 🔌
  --------
  - version = package.json version
  - userAgent = viewer agent
  - t = target = el (DOM element)
  - interval = the amount of time passed before a computed is invoked
  - noStyles = boolean
  - off = boolean
  - offset = 0 || dealer's choice
  - parentClass = 'string'
  - scrollEl = scroll element (DOM element used for scroll event)
  - stickyClass = 'string'
  - stuckClass = 'string'
  - useStickyClasses = boolean
  - verticalPosition = top || bottom

  --------
  props🔌
  --------
  - p = props {object}

  --------
  instance note
  --------
  - stickybits parent methods return this
  - stickybits instance methods return an instance item 

  --------
  nomenclature
  --------
  - target => el => e
  - props => o || p
  - instance = item
*/
function Stickybits(target, o) {
  this.version = '2.0.0';
  this.userAgent = window.navigator.userAgent;
  this.props = {
    interval: o && o.interval || 250,
    noStyles: o && o.noStyles || false,
    off: o && o.off || false,
    offset: o && o.stickyBitStickyOffset || 0,
    parentClass: o && o.parentClass || 'js-stickybit-parent',
    scrollEl: o && o.scrollEl || window,
    stickyClass: o && o.stickyClass || 'js-is-sticky',
    stuckClass: o && o.stuckClass || 'js-is-stuck',
    useStickyClasses: o && o.useStickyClasses || false,
    verticalPosition: o && o.verticalPosition || 'top'
  };
  var p = this.props;
  if (p.off) return null;
  /*
    define positionVal
    ----
    -  uses a computed (`.definePosition()`)
    -  defined the position
  */
  p.positionVal = this.definePosition();
  var vp = p.verticalPosition;
  var ns = p.noStyles;
  var pv = p.positionVal;
  this.els = typeof target === 'string' ? document.querySelectorAll(target) : target;
  if (!('length' in this.els)) this.els = [this.els];
  this.instances = [];
  for (var i = 0; i < this.els.length; i += 1) {
    var el = this.els[i];
    var styles = el.style;
    if (vp === 'top' && !ns) styles[vp] = p.offset + 'px';
    if (pv !== 'fixed' && p.useStickyClasses === false) {
      styles.position = pv;
    } else {
      // const stickyManager = new ManageSticky(el, p)
      if (pv !== 'fixed') styles.position = pv;
      var instance = this.addInstance(el, p);
      // instances are an array of objects
      this.instances.push(instance);
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
  var prefix = ['', '-o-', '-webkit-', '-moz-', '-ms-'];
  var test = document.head.style;
  for (var i = 0; i < prefix.length; i += 1) {
    test.position = prefix[i] + 'sticky';
  }
  var stickyProp = typeof test.position !== 'undefined' ? test.position : 'fixed';
  test.position = '';
  return stickyProp;
};

/*
  instance ✔️
  --------
  — manages instances of items
  - in
  - takes in an el and props
  - returns an item object

  ---
  - target = Stickybits el
  - o = {object} = props
    - scrollEl = 'string'
    - verticalPosition = number
    - off = boolean
    - parentClass = 'string'
    - stickyClass = 'string'
    - stuckClass = 'string'
  ---
  - defined later
    - parent = dom element
    - state = 'string'
    - offset = number
    - stickyStart = number
    - stickyStop = number
  - returns an instance object
*/
Stickybits.prototype.addInstance = function addInstance(el, props) {
  var _this = this;

  var item = {
    el: el,
    parent: el.parentNode,
    props: props
  };
  var p = item.props;
  item.parent.className += ' ' + props.parentClass;
  var se = p.scrollEl;
  item.isWin = se === window;
  if (!item.isWin) se = this.getClosestParent(item.el, se);
  this.computeScrollOffsets(item);
  item.state = 'default';
  this.stateContainer = function () {
    _this.manageState(item);
  };
  se.addEventListener('scroll', this.stateContainer);
  return item;
};

/* 
  getParent 👨‍
  ---
  - a helper function that ensure the target element's parent is selected
  - only used for non `window` scroll elements
  - supports older browsers
*/
Stickybits.prototype.getClosestParent = function getClosestParent(el, matchSelector) {
  // p = parent element
  var p = document.querySelector(matchSelector);
  var e = el;
  if (e.parentElement === p) return p;
  // traverse up the dom tree until we get to the parent
  while (e.parentElement !== p) {
    e = e.parentElement;
  } // return parent element
  return p;
};

/* 
  computeScrollOffsets 📊
  ---
  computeScrollOffsets for Stickybits
  - defines
    - offset
    - start
    - stop
*/
Stickybits.prototype.computeScrollOffsets = function computeScrollOffsets(item) {
  var it = item;
  var p = it.props;
  var parent = it.parent;
  var iw = it.isWin;
  var i = 0;
  var interval = void 0;
  var scrollElOffset = 0;
  var checkOffset = function checkOffset() {
    i += 1;
    if (i > 12) {
      clearInterval(interval);
      return;
    }
    var stickyStart = parent.getBoundingClientRect().top;
    if (!iw && p.positionVal === 'fixed') {
      scrollElOffset = p.scrollEl.getBoundingClientRect().top;
      stickyStart = parent.getBoundingClientRect().top - scrollElOffset;
    }
    it.offset = scrollElOffset + p.offset;
    it.stickyStart = stickyStart;
    it.stickyStop = it.stickyStart + parent.offsetHeight - (it.el.offsetHeight - it.offset);
  };
  checkOffset();
  interval = setInterval(checkOffset, p.interval);
  return it;
};

/* 
  toggleClasses ⚖️
  ---
  toggles classes (for older browser support)
  r = removed class
  a = added class
*/
Stickybits.prototype.toggleClasses = function toggleClasses(el, r, a) {
  var e = el;
  var cArray = e.className.split(' ');
  if (a && cArray.indexOf(a) === -1) cArray.push(a);
  var rItem = cArray.indexOf(r);
  if (rItem !== -1) cArray.splice(rItem, 1);
  e.className = cArray.join(' ');
};

/* 
  manageState 📝
  ---
  - defines the state
    - normal
    - sticky
    - stuck
*/
Stickybits.prototype.manageState = function manageState(item) {
  var _this2 = this;

  var it = item;
  console.log(it);
  var e = it.el;
  var p = it.props;
  var ns = p.noStyles;
  var pv = p.positionVal;
  var se = p.scrollEl;
  var rAF = typeof se.requestAnimationFrame !== 'undefined' ? se.requestAnimationFrame : function rAFDummy(f) {
    f();
  };
  var state = it.state;
  var stickyClass = p.stickyClass;
  var stickyStart = it.stickyStart;
  var stickyStop = it.stickyStop;
  var stuckClass = p.stuckClass;
  var styles = it.el.style;
  var toggleClasses = this.toggleClasses;
  var vp = p.verticalPosition;
  var scroll = it.isWin ? se.scrollY || se.pageYOffset : se.scrollTop;
  var notSticky = scroll > stickyStart && scroll < stickyStop && (state === 'default' || state === 'stuck');
  var isSticky = scroll < stickyStart && state === 'sticky';
  var isStuck = scroll > stickyStop && state === 'sticky';
  if (notSticky) {
    it.state = 'sticky';
    rAF(function () {
      toggleClasses(e, stuckClass, stickyClass);
      styles.position = pv;
      if (ns) return;
      styles.bottom = '';
      styles[vp] = _this2.offset + 'px';
    });
  } else if (isSticky) {
    it.state = 'default';
    rAF(function () {
      toggleClasses(e, stickyClass);
      if (pv === 'fixed') styles.position = '';
    });
  } else if (isStuck) {
    it.state = 'stuck';
    rAF(function () {
      toggleClasses(e, stickyClass, stuckClass);
      if (pv !== 'fixed' || ns) return;
      styles.top = '';
      styles.bottom = '0';
      styles.position = 'absolute';
    });
  }
  return it;
};

/*
  removeClass ❎
  --------
  - removes classes (for older browser support)
*/
Stickybits.prototype.removeClass = function removeClass(el, className) {
  var e = el;
  var cArray = e.className.split(' ');
  var cItem = cArray.indexOf(className);
  if (cItem !== -1) cArray.splice(cItem, 1);
  e.className = cArray.join(' ');
};

/*
  removes an instance 👋

*/
Stickybits.prototype.removeInstance = function removeInstance(instance) {
  var e = instance.el;
  var p = instance.props;
  var removeClass = this.removeClass;
  e.style.position = '';
  e.style[this.vp] = '';
  removeClass(e, p.stickyClass);
  removeClass(e, p.stuckClass);
  removeClass(e.parentNode, p.parentClass);
};

/*
  cleanup 🛁
  --------
  - target = el (DOM element)
  - scrolltarget = window || 'dealer's chose'
  - scroll = removes scroll event listener
*/
Stickybits.prototype.cleanup = function cleanup() {
  var p = this.props;
  p.off = true;
  for (var i = 0; i < this.instances.length; i += 1) {
    var instance = this.instances[i];
    this.removeInstance(instance);
  }
  this.stateManager = false;
  this.instances = [];
};

/*
  export 
  --------
  exports StickBits to be used 🏁
*/
function stickybits(target, o) {
  return new Stickybits(target, o);
}

if (typeof window !== 'undefined') {
  var plugin = window.$ || window.jQuery || window.Zepto;
  if (plugin) {
    plugin.fn.stickybits = function stickybitsPlugin(opts) {
      stickybits(this, opts);
    };
  }
}

})));
