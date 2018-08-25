(function () {
  stickybits('#nav');
  if (window.innerWidth < 900) return;
  const wrapper = document.getElementById('wrapper')
  wrapper.className += ' js-has-aside';
  const stickyItems = ['1', '2', '3', '4'];
  const stickyWrapper = document.getElementById('aside');
  for (let i = 0; i < stickyItems.length; i += 1) {
    const stickyItem = '<div class="sticky-element sticky-element--' + i + '">StickyBit Item ' + i + '<span class="stuck">is Stuck! 🔥</span></div>';
    const stickyParent = '<div class="sticky-parent sticky-parent--' + i + '">' + stickyItem + '</div>';
    stickyWrapper.innerHTML += stickyParent;
  }
  stickybits('.sticky-element', {
    stickyBitStickyOffset: 48,
    useStickyClasses: true
  });
})();
