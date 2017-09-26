/*
  STICKYBITS 💉
  --------
  > a lightweight alternative to `position: sticky` polyfills 🍬
  --------
  - each method is documented above it our view the readme
  - Stickybits does not manage polymorphic functionality (position like properties)
  * polymorphic functionality: (in the context of describing Stickybits)
    means making things like `position: sticky` be loosely supported with position fixed.
    It also means that features like `useStickyClasses` takes on styles like `position: fixed`.
  --------
  defaults 🔌
  --------
  - version = `package.json` version
  - userAgent = viewer browser agent
  - target = DOM element selector
  - noStyles = boolean
  - off = boolean
  - offset = number
  - parentClass = 'string'
  - scrollEl = window || DOM element selector
  - stickyClass = 'string'
  - stuckClass = 'string'
  - useStickyClasses = boolean
  - verticalPosition = 'string'
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
  - instance => item => it
  --------
  methods
  --------
  - .definePosition = defines sticky or fixed
  - .addInstance = an array of objects for each Stickybits Target
  - .getClosestParent = gets the parent for non-window scroll
  - .computeScrollOffsets = computes scroll position
  - .toggleClasses = older browser toggler
  - .manageState = manages sticky state
  - .removeClass = older browser support class remover
  - .removeInstance = removes an instance
  - .cleanup = removes all Stickybits instances and cleans up dom from stickybits
*/
function Stickybits(target) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$noStyles = _ref.noStyles,
      noStyles = _ref$noStyles === undefined ? false : _ref$noStyles,
      _ref$stickyBitStickyO = _ref.stickyBitStickyOffset,
      stickyBitStickyOffset = _ref$stickyBitStickyO === undefined ? 0 : _ref$stickyBitStickyO,
      _ref$parentClass = _ref.parentClass,
      parentClass = _ref$parentClass === undefined ? 'js-stickybit-parent' : _ref$parentClass,
      _ref$scrollEl = _ref.scrollEl,
      scrollEl = _ref$scrollEl === undefined ? window : _ref$scrollEl,
      _ref$stickyClass = _ref.stickyClass,
      stickyClass = _ref$stickyClass === undefined ? 'js-is-sticky' : _ref$stickyClass,
      _ref$stuckClass = _ref.stuckClass,
      stuckClass = _ref$stuckClass === undefined ? 'js-is-stuck' : _ref$stuckClass,
      _ref$useStickyClasses = _ref.useStickyClasses,
      useStickyClasses = _ref$useStickyClasses === undefined ? false : _ref$useStickyClasses,
      _ref$verticalPosition = _ref.verticalPosition,
      verticalPosition = _ref$verticalPosition === undefined ? 'top' : _ref$verticalPosition;

  this.version = '2.0.0';
  this.userAgent = window.navigator.userAgent;
  this.props = {
    noStyles: noStyles,
    stickyBitStickyOffset: stickyBitStickyOffset,
    parentClass: parentClass,
    scrollEl: scrollEl,
    stickyClass: stickyClass,
    stuckClass: stuckClass,
    useStickyClasses: useStickyClasses,
    verticalPosition: verticalPosition
  };
  var p = this.props;
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
  addInstance ✔️
  --------
  — manages instances of items
  - takes in an el and props
  - returns an item object
  ---
  - target = el
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
  --------
  getParent 👨‍
  --------
  - a helper function that gets the target element's parent selected el
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
  var scrollElOffset = 0;
  var stickyStart = parent.getBoundingClientRect().top;
  if (!iw && p.positionVal === 'fixed') {
    scrollElOffset = p.scrollEl.getBoundingClientRect().top;
    stickyStart = parent.getBoundingClientRect().top - scrollElOffset;
  }
  it.offset = scrollElOffset + p.stickyBitStickyOffset;
  it.stickyStart = stickyStart;
  it.stickyStop = it.stickyStart + parent.offsetHeight - (it.el.offsetHeight - it.offset);
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

  // cache object
  var it = item;
  var e = it.el;
  var p = it.props;
  var state = it.state;
  var start = it.stickyStart;
  var stop = it.stickyStop;
  var stl = e.style;
  // cache props
  var ns = p.noStyles;
  var pv = p.positionVal;
  var se = p.scrollEl;
  var sticky = p.stickyClass;
  var stuck = p.stuckClass;
  var vp = p.verticalPosition;
  /* 
    requestAnimationFrame 
    ---
    - use rAF
    - or stub rAF
  */
  var rAF = se.requestAnimationFrame;
  if (typeof rAF !== 'undefined') rAF = function rAFDummy(f) {
    f();
  };
  /*
    define scroll vars
    ---
    - scroll
    - notSticky
    - isSticky
    - isStuck
  */
  var tC = this.toggleClasses;
  var scroll = it.isWin ? se.scrollY || se.pageYOffset : se.scrollTop;
  var notSticky = scroll > start && scroll < stop && (state === 'default' || state === 'stuck');
  var isSticky = scroll < start && state === 'sticky';
  var isStuck = scroll > stop && state === 'sticky';
  if (notSticky) {
    it.state = 'sticky';
    rAF(function () {
      tC(e, stuck, sticky);
      stl.position = pv;
      if (ns) return;
      stl.bottom = '';
      stl[vp] = _this2.offset + 'px';
    });
  } else if (isSticky) {
    it.state = 'default';
    rAF(function () {
      tC(e, sticky);
      if (pv === 'fixed') stl.position = '';
    });
  } else if (isStuck) {
    it.state = 'stuck';
    rAF(function () {
      tC(e, sticky, stuck);
      if (pv !== 'fixed' || ns) return;
      stl.top = '';
      stl.bottom = '0';
      stl.position = 'absolute';
    });
  }
  return it;
};

/*
  removeClass ❎
  --------
  - removes classes 
  - older browser support
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
  --------
  - cleanup instance 
*/
Stickybits.prototype.removeInstance = function removeInstance(instance) {
  var e = instance.el;
  var p = instance.props;
  var rC = this.removeClass;
  e.style.position = '';
  e.style[this.vp] = '';
  rC(e, p.stickyClass);
  rC(e, p.stuckClass);
  rC(e.parentNode, p.parentClass);
};

/*
  cleanup 🛁
  --------
  - cleans up each instance
  - clears instance
*/
Stickybits.prototype.cleanup = function cleanup() {
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

export default stickybits;
