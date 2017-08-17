(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

'use strict';var _stickybits=require('./stickybits'); var _stickybits2=_interopRequireDefault(_stickybits);function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}if('undefined'!=typeof window){var plugin=window.$||window.jQuery||window.Zepto;plugin&&(plugin.fn.stickybits=function(a){(0,_stickybits2.default)(this,a);});}

})));
