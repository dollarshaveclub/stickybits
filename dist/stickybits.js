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
  if (document.querySelector(target).length > 1) throw Error('Check your selector. Stickybits only works on one element per initialization. 😰');
  var el = document.querySelector(target);
  var defaults = {
    scrolltarget: window,
    prefix: ['', '-webkit-', '-moz-', '-ms-'],
    verticalposition: 'top',
    stickyoffset: '0'
  };
  var scrolltarget = opts && opts.scrolltarget || defaults.scrolltarget;
  var prefix = opts && opts.prefix || defaults.prefix;
  // vertical position css prop (top 🔺|| bottom 🔻), relative to its parent
  // re: `top: 0; || bottom: 0;` (the prop)
  var verticalposition = opts && opts.verticalposition || defaults.verticalposition;
  // sticky offset is the css num val associated with the sticky element's vertical position
  // re: `top: 0; || top: 10px`; (the val)
  var stickyoffset = opts && opts.stickyoffset || defaults.stickyoffset;
  var elStyle = el.style;
  var elClasses = el.classList;
  // does the sticky position css rule exist? 🤔
  for (var i = 0; i < prefix.length; i += 1) {
    elStyle.position = prefix[i] + 'sticky';
  }
  // if the sticky position rule exists we're done 💪
  if (elStyle.position !== '') {
    elStyle[verticalposition] = stickyoffset;
    elClasses.add('js-sticky-support');
    return;
  }
  // maintain stickiness with `fixed position` 🍬
  var parent = el.parentNode;
  var elPosition = el.getBoundingClientRect();
  var stickyClass = 'js-is-sticky';
  var stuckClass = 'js-is-stuck';
  var fixed = 'fixed';
  var start = elPosition.top;
  var stop = elPosition.top + parent.offsetHeight;
  function stickiness() {
    var scroll = scrolltarget.scrollY;
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
      elStyle[verticalposition] = stickyoffset;
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
  scrolltarget.addEventListener('scroll', function () {
    return scrolltarget.requestAnimationFrame(stickiness);
  });
}

return stickybits;

})));