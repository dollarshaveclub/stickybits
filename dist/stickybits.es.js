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
       -  parentClass
       -  stickyClass
       -  stuckClass
  */

  this.el = target;
  this.props = o;

  /* 
    getParent
    ---
    a helper function that ensure the target element's parent is selected
  */
  var getClosestParent = function getClosestParent(t, s) {
    // parent element
    var p = document.querySelector(s);
    // initial target
    var el = t;
    if (el.parentElement === p) return p;
    while (el.parentElement !== p) {
      el = el.parentElement;
    }return p;
  };
  var se = window;
  if (this.props.scrollEl !== window) se = getClosestParent(this.el, this.props.scrollEl);
  var el = this.el;
  var p = this.props;
  var isWin = se === window;
  // select the parent
  this.parent = el.parentNode;
  this.parent.className += ' ' + p.parentClass;
  var parent = this.parent;

  if (!p.off) {
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
      _this.stickyStop = _this.stickyStart + parent.offsetHeight - (el.offsetHeight - _this.offset);
    };
    computeScrollOffsets();
    interval = setInterval(computeScrollOffsets, 250);
    this.state = 'default';
    se.addEventListener('scroll', this.manageState);
  } else {
    // remove scroll event listener
    se.removeEventListener('scroll', this.manageState);
    // turn of sticky invocation
    this.manageState = false;
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
// is chain required?
ManageSticky.prototype.manageState = function manageState() {
  var _this2 = this;

  // cached variables
  var p = this.props;
  var ns = this.noStyles;
  var pv = this.positionVal;
  var se = this.scrollEl;
  var rAF = typeof se.requestAnimationFrame !== 'undefined' ? se.requestAnimationFrame : function rAFDummy(f) {
    f();
  };
  var state = this.state;
  var stickyClass = p.stickyClass;
  var stickyStart = this.stickyStart;
  var stickyStop = this.stickyStop;
  var stuckClass = p.stuckClass;
  var styles = this.el.style;
  var toggleClasses = this.toggleClasses;
  var vp = this.verticalPosition;
  // define scroll
  // todo computed
  var scroll = this.isWin ? se.scrollY || se.pageYOffset : se.scrollTop;
  // define stick type
  var notSticky = scroll > stickyStart && scroll < stickyStop && (state === 'default' || state === 'stuck');
  var isSticky = scroll < stickyStart && state === 'sticky';
  var isStuck = scroll > stickyStop && state === 'sticky';

  if (notSticky) {
    this.state = 'sticky';

    rAF(function () {
      toggleClasses(stuckClass, stickyClass);
      styles.position = pv;
      if (ns) return;
      styles.bottom = '';
      styles[vp] = _this2.offset + 'px';
    });
  } else if (isSticky) {
    this.state = 'default';
    rAF(function () {
      toggleClasses(stickyClass);
      if (pv === 'fixed') styles.position = '';
    });
  } else if (isStuck) {
    this.state = 'stuck';
    rAF(function () {
      toggleClasses(stickyClass, stuckClass);
      if (pv !== 'fixed' || ns) return;
      styles.top = '';
      styles.bottom = '0';
      styles.position = 'absolute';
    });
  }
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
  var styles = el.styles;
  var removeClass = this.removeClass;
  var p = this.props;
  // cleanup styles
  styles.position = '';
  styles[this.vp] = '';
  // cleanup CSS classes
  removeClass(el, p.stickyClass);
  removeClass(el, p.stuckClass);
  removeClass(el.parentNode, p.parentClass);
};

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
*/

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
    -  stickyClass = 'string'
    -  stuckClass = 'string'
    -  parentClass = 'string'
  */
  // assign and cache props
  this.props = {
    interval: o && o.interval || 250,
    scrollEl: o && o.scrollEl || window,
    offset: o && o.offset || 0,
    verticalPosition: o && o.verticalPosition || 'top',
    useStickyClasses: o && o.useStickyClasses || false,
    noStyles: o && o.noStyles || false,
    off: o && o.off || false,
    stickyClass: o && o.stickyClass || 'js-is-sticky',
    stuckClass: o && o.stuckClass || 'js-is-stuck',
    parentClass: o && o.parentClass || 'js-stickybit-parent'
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
    if (vp === 'top' && !ns) styles[vp] = this.offset + 'px';
    if (pv !== 'fixed' || p.useStickyClasses === false) styles.position = pv;else {
      var stickyManager = new ManageSticky(el, p);
      this.instances.push(stickyManager);
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
  return typeof test.position !== 'undefined' ? test.position : 'fixed';
};

function stickybits(target, o) {
  return new Stickybits(target, o);
}

export default stickybits;
