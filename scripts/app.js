(function() {
  stickybits('#nav');
  if (window.innerWidth < 900) return;
  document.getElementById('wrapper').classList.add('js-has-aside');
  const stickyItems = ['1', '2', '3', '4', '5', '6', '8', '9', '10'];
  const stickyWrapper = document.getElementById('aside');
  for (let i of stickyItems) {
    const stickyItem = `<div class="sticky-element sticky-element--${i}">StickyBit Item ${i} <span class="stuck">is Stuck! 🔥</span></div>`;
    const stickyParent = `<div class="sticky-parent sticky-parent--${i}">${stickyItem}</div>`;
    stickyWrapper.innerHTML += stickyParent;
  }
  stickybits('.sticky-element', {
    stickyBitStickyOffset: 48,
    useStickyClasses: true
  });
})();





