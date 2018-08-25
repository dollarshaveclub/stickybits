"use strict";

(function () {
  stickybits('#nav');
  if (window.innerWidth < 900) return;
  var wrapper = document.getElementById('wrapper');
  wrapper.className += ' js-has-aside';
  var stickyItems = ['1', '2', '3', '4'];
  var stickyWrapper = document.getElementById('aside');

  for (var i = 0; i < stickyItems.length; i += 1) {
    var stickyItem = '<div class="sticky-element sticky-element--' + i + '">StickyBit Item ' + i + '<span class="stuck">is Stuck! 🔥</span></div>';
    var stickyParent = '<div class="sticky-parent sticky-parent--' + i + '">' + stickyItem + '</div>';
    stickyWrapper.innerHTML += stickyParent;
  }

  stickybits('.sticky-element', {
    stickyBitStickyOffset: 48,
    useStickyClasses: true
  });
})();