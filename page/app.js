"use strict";

(function () {
  var stickyNav = stickybits('#nav', {
    useGetBoundingClientRect: true
  });
  console.info(stickyNav);
  if (window.innerWidth < 900) return;
  var wrapper = document.getElementById('wrapper');
  wrapper.className += ' js-has-aside';
  var stickyWrapper = document.getElementById('aside');

  for (var i = 1; i < 5; i += 1) {
    var stickyItem = '<div class="sticky-element sticky-element--' + i + '">StickyBit Item ' + i + '<span class="stuck">is Stuck! 🔥</span></div>';
    var stickyParent = '<div class="sticky-parent sticky-parent--' + i + '">' + stickyItem + '</div>';
    stickyWrapper.innerHTML += stickyParent;
  }

  var stickyItems = stickybits('.sticky-element', {
    stickyBitStickyOffset: 48,
    useStickyClasses: true,
    useGetBoundingClientRect: true
  });
  console.info(stickyItems);
})();