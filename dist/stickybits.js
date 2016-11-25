(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.stickybits = factory());
}(this, (function () { 'use strict';

function stickybit(target, opts) {
  var els = typeof target === 'string' ? document.querySelectorAll(target) : target;
  if (!('length' in els)) els = [els];
  var total = els.length;

  var _loop = function _loop(i) {
    var el = els[i];
    var parent = el.parentNode.getBoundingClientRect();

    // defaults
    var defaults = {
      start: parent.top,
      stop: parent.top + el.outerHeight(),
      offset: 0,
      stickyPosition: 'top'
    };

    // default option overrides
    var start = opts && opts.start || defaults.start;
    var stop = opts && opts.stop || defaults.stop;
    var offset = opts && opts.offset || defaults.offset;
    // stickyPosition can be only be either top or bottom
    var stickyPosition = opts && opts.stickyPosition || defaults.topSticky;

    if (stickyPosition !== 'top' || stickyPosition !== 'bottom') throw Error('Stickybits works with top and bottom positioning only. 😰');

    // setup stickybit
    var delta = el.outerHeight() / 8;

    // control scrolling
    // measure defines the measure of scroll
    var measure = void 0;
    var stickiness = function stickinessFunc() {
      var scroll = window.scrollY;
      var scrollUp = window.scrollY < measure;
      var buffer = scroll > measure - delta || scroll < measure + delta;
      console.log(delta, measure, scroll, buffer);
      if (scroll > start) {
        el.style.position = 'sticky' || 'fixed';
        el.style[offset] = 0;
        el.setAttribute('data-sticky', true);
        if (buffer && scrollUp && scroll < stop && el.getAttribute('data-stuck') === true) {
          el.setAttribute('data-stuck', false);
          el.style.position = 'absolute';
        }
      } else if (buffer && scrollUp && scroll < start) {
        el.setAttribute('data-sticky', false);
        el.style.position = el.style[offset] = '';
      }
      if (scroll > stop && el.getAttribute('data-sticky') === true) el.setAttribute('data-stuck', true);
      measure = scroll;
      console.log(measure, window.scrollY);
      return;
    };

    // stuff
    window.addEventListener('scroll', stickiness);
    window.addEventListener('onresize', function () {
      console.log('will do stuff');
    });
  };

  for (var i = 0; i < total; i + 1) {
    _loop(i);
  }
}

return stickybit;

})));