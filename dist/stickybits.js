(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.stickybit = factory());
}(this, (function () { 'use strict';

function stickybit(target, opts) {
  if (document.querySelector(target).length > 1) throw Error('Stickybits only works on one element per initialization. 😰');

  var el = document.querySelector(target);
  var elCurrentStyles = el.getAttribute('style');
  var parent = el.parentNode;
  var parentPosition = parent.getBoundingClientRect();

  // defaults
  var defaults = {
    offset: 0,
    position: 'top',
    start: parentPosition.top,
    stop: parentPosition.top + parent.offsetHeight,
    width: '100%'
  };
  // offset = the stickybit sticky position offset
  var offset = opts && opts.offset || defaults.offset;
  var position = opts && opts.position || defaults.position;
  var start = opts && opts.start || defaults.start;
  var stop = opts && opts.stop || defaults.stop;
  var width = opts && opts.width || defaults.width;

  if (position !== 'top' && position !== 'bottom') throw Error('Stickybits works with top and bottom positioning only. 😰');
  var elStyles = el.style;
  var stickycss = ['-webkit-', '-moz-', '-ms-', '-o-', ''].join('sticky; position: ') + 'sticky';
  // test if sticky position exists
  elStyles.position = stickycss;
  if (elStyles.position === '') {
    stickycss = 'fixed';
  }
  var stickyStyles = 'position: ' + stickycss + '; width: ' + width + '; ' + position + ': ' + offset + '; ' + elCurrentStyles;

  // maintain stickiness
  function stickiness() {
    var scroll = window.scrollY;
    console.log(scroll, stop);
    // exit if function is less than start
    if (scroll < start) {
      if (el.getAttribute('data-sticky') === 'true') {
        el.setAttribute('data-sticky', 'false');
        elStyles.position = elStyles[offset] = '';
      }
      return;
    }
    el.setAttribute('data-sticky', 'true');
    if (scroll < stop && el.getAttribute('data-stuck') === 'true') {
      el.setAttribute('data-stuck', 'false');
    }
    // sets up sticky
    elStyles.cssText = stickyStyles;
    elStyles[position] = offset;
    // exit if already stuck
    // if (scroll > stop && el.getAttribute('data-stuck') === 'true') return;
    // // set up stuck
    // el.setAttribute('data-stuck', 'true');
    // el.style.position = 'absolute';
    // el.style.bottom = '0';
    // el.style.top = '';
    // return;
  }
  window.addEventListener('scroll', function () {
    return window.requestAnimationFrame(stickiness);
  });
}

return stickybit;

})));