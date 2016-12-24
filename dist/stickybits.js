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
function stickybits(target, opts) {
  if (document.querySelector(target).length > 1) throw Error('Check or selector. Also, Stickybits only works on one element per initialization. 😰');
  var el = document.querySelector(target);
  var defaults = {
    scrolltarget: window,
    vendor: ['-webkit-', '-moz-', '-ms-', '']
  };
  var scrolltarget = opts && opts.scrolltarget || defaults.scrolltarget;
  var verdor = opts && opts.vendor || defaults.vendor;
  var elStyle = el.style;
  var stickyCss = verdor.join('sticky; position: ') + 'sticky';
  // does the sticky position css rule exist? 🤔
  elStyle.position = stickyCss;
  // if the sticky position rule exists we're done 💪
  if (elStyle.position !== '') return;
  // maintain stickiness with `fixed position` 🍬
  var parent = el.parentNode;
  var parentPosition = parent.getBoundingClientRect();
  var elClasses = el.classList;
  var stickyClass = 'js-is-sticky';
  var stuckClass = 'js-is-stuck';
  var fixed = 'fixed';
  var start = parentPosition.top;
  var stop = parentPosition.top + parent.offsetHeight;
  function stickiness() {
    var scroll = scrolltarget.scrollY;
    if (scroll < start) {
      if (elClasses.contains(stickyClass)) {
        elClasses.remove(stickyClass);
        elStyle.position = '';
      }
      return;
    } else if (!elClasses.contains(stickyClass)) {
      elClasses.add(stickyClass);
      elStyle.position = fixed;
      return;
    } else if (scroll < stop && elClasses.contains(stuckClass)) {
      elClasses.remove(stuckClass);
      elStyle.position = fixed;
      return;
    } else if (scroll > stop && !elClasses.contains(stuckClass)) {
      elClasses.add(stuckClass);
      elStyle.position = 'absolute';
      return;
    }
    return;
  }
  scrolltarget.addEventListener('scroll', function () {
    return scrolltarget.requestAnimationFrame(stickiness);
  });
}

return stickybits;

})));