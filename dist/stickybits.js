(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.stickybits = factory());
}(this, (function () { 'use strict';

// Stickybits
// ----------
/*
  📍the basic stickybits only does what's needed
    -  Only the sticky position and css classes are added to the Element.
    -  Any extra styling must be added to make stickybits look awesome!
*/
function stickybit(target, opts) {
  var el = target;
  var defaults = {
    scrollTarget: window,
    prefix: ['', '-webkit-', '-moz-', '-ms-'],
    verticalPosition: 'top',
    stickyOffset: '0',
    fixedOnly: false,
    oldSchool: false
  };
  var scrollTarget = opts && opts.scrollTarget || defaults.scrollTarget;
  var prefix = opts && opts.prefix || defaults.prefix;
  // vertical position css prop (top 🔺|| bottom 🔻), relative to its parent
  // re: `top: 0; || bottom: 0;` (the prop)
  var verticalPosition = opts && opts.verticalPosition || defaults.verticalPosition;
  // sticky offset is the css num val associated with the sticky element's vertical position
  // re: `top: 0; || top: 10px`; (the val)
  var stickyOffset = opts && opts.stickyOffset || defaults.stickyOffset;
  // set fixedOnly to not use `position: sticky;
  // -  optimal if you use position sticky elseware with stickybits in the same app
  var fixedOnly = opts && opts.fixedOnly || defaults.fixedOnly;
  // set `oldschool:  true` if you want a stickybit to behave more closely to fixed position
  // -  beneficial b/c of position sticky (no jitter)
  // -  item will only be set to position sticky when the `start variable` threshold is passed
  var oldSchool = opts && opts.oldSchool || defaults.oldSchool;
  var elStyle = el.style;
  var elClasses = el.classList;
  if (fixedOnly === true) {
    // does the sticky position css rule exist? 🤔
    for (var i = 0; i < prefix.length; i += 1) {
      elStyle.position = prefix[i] + 'sticky';
    }
    // if the sticky position rule exists we're done 💪
    if (elStyle.position !== '') {
      elStyle[verticalPosition] = stickyOffset;
      elClasses.add('js-sticky-support');
      if (oldSchool === false) return;
    }
  }
  // maintain stickiness with `fixed position` 🍬
  var parent = el.parentNode;
  var elHeight = el.offsetHeight;
  var stickyClass = 'js-is-sticky';
  var stuckClass = 'js-is-stuck';
  var fixed = 'fixed';
  var start = el.getBoundingClientRect().top;
  var stop = start + parent.offsetHeight - elHeight;
  function stickiness() {
    var scroll = scrollTarget.scrollY;
    if (scroll < start) {
      if (elClasses.contains(stickyClass)) {
        elClasses.remove(stickyClass);
        elStyle.position = '';
      }
      return;
    } else if (scroll > start && scroll < stop) {
      if (!elClasses.contains(stickyClass)) elClasses.add(stickyClass);
      if (elClasses.contains(stuckClass)) {
        elClasses.remove(stuckClass);
        elStyle.bottom = '';
      }
      elStyle.position = fixed;
      elStyle[verticalPosition] = stickyOffset;
      return;
    } else if (scroll > stop && !elClasses.contains(stuckClass)) {
      elClasses.remove(stickyClass);
      elClasses.add(stuckClass);
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
