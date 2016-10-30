(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.stickybits = factory());
}(this, (function () { 'use strict';

function stickybit(target, opts) {
  var els = typeof target === 'string' ? document.querySelectorAll(target) : target;
  if (!('length' in els)) els = [els];

  var defaults = {
    classname: 'js-stickybit',
    position: 0,
    starts: 0,
    stops: 0,
    stuck: 'top'
  };
  var classname = opts && opts.classname || defaults.classname;
  var position = opts && opts.position || defaults.position;
  var starts = opts && opts.starts || defaults.starts;
  var stops = opts && opts.stops || defaults.stops;
  var stuck = opts && opts.stuck || defaults.stuck;

  for (var i = 0; i < els.length; i++) {
    var el = els[i];
    // stuff
  }
}

var plugin = window.$ || window.jQuery || window.Zepto;
if (plugin) {
  plugin.fn.extend({
    stickybit: function stickybitFunc(opts) {
      return stickybit(this, opts);
    }
  });
}

return stickybit;

})));