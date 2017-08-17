(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

'use strict';Object.defineProperty(exports,'__esModule',{value:!0}),exports.default=stickybits;var _managesticky=require('./managesticky'); var _managesticky2=_interopRequireDefault(_managesticky);function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}function Stickybits(a,b){this.props='undefined'==typeof b?{}:b;var c=this.props;c.interval=b.intnerval||250,c.scrollEl=b.scrollEl||window,c.offset=b.stickyBitStickyOffset||0,c.verticalPosition=b.verticalPosition||'top',c.useStickyClasses=b.useStickyClasses||!1,c.noStyles=b.noStyles||!1,c.off=b.off||!1,c.positionVal=this.setStickyPosition();var d=c.positionVal;this.els='string'==typeof a?document.querySelectorAll(a):a,'length'in this.els||(this.els=[this.els]),this.instances=[];for(var e=0;e<this.els.length;e+=1){var f=c.verticalPosition,g=c.noStyles,h=this.els[e],i=h.style;if('top'!==f||g||(i[f]=this.offset+'px'),'fixed'!==d||!1===c.useStickyClasses)i.position=d;else{var j={noStyles:g,off:c.off,offset:c.offset,positionVal:d,scrollEl:c.scrollEl,verticalPosition:f,stickyClass:c.stickyClass||'js-is-sticky',stuckClass:c.stuckClass||'js-is-stuck',parentClass:c.parentClass||'js-stickybit-parent'};this.instances.push(new _managesticky2.default(h,j));}}return this}Stickybits.prototype.definePosition=function(){for(var a=document.createElement('test'),b=['','-o-','-webkit-','-moz-','-ms-'],c=a.styles,d=0;d<b.length;d+=1)c.position=b[d]+'sticky';return''===styles.position?'fixed':styles.position};function stickybits(a,b){return new Stickybits(a,b)}

})));
