(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

'use strict';Object.defineProperty(exports,'__esModule',{value:!0}),exports.default=stickybits;var _managesticky=require('./managesticky'); var _managesticky2=_interopRequireDefault(_managesticky);function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}function Stickybits(a){var b=1<arguments.length&&arguments[1]!==void 0?arguments[1]:{interval:250,scrollEl:window,offset:0,verticalPosition:'top',useStickyClasses:!1,noStyles:!1,off:!1,stickyClass:'js-is-sticky',stuckClass:'js-is-stuck',parentClass:'js-stickybit-parent'},c=this.props=b;c.positionVal=this.definePosition();var d=c.verticalPosition,e=c.noStyles,f=c.positionVal;this.els='string'==typeof a?document.querySelectorAll(a):a,'length'in this.els||(this.els=[this.els]),this.instances=[];for(var g=0;g<this.els.length;g+=1){var h=this.els[g],i=h.style;'top'!==d||e||(i[d]=this.offset+'px'),'fixed'!==f||!1===c.useStickyClasses?i.position=f:this.instances.push(new _managesticky2.default(h,c));}return this}Stickybits.prototype.definePosition=function(){for(var a=['','-o-','-webkit-','-moz-','-ms-'],b=document.head.style,c=0;c<a.length;c+=1)b.position=a[c]+'sticky';return'undefined'==typeof test.position?'fixed':test.position};function stickybits(a,b){return new Stickybits(a,b)}

})));
