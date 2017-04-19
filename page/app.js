'use strict';

(function () {
  stickybits('#nav');
  if (window.innerWidth < 900) return;
  document.getElementById('wrapper').classList.add('js-has-aside');
  var stickyItems = ['1', '2', '3', '4'];
  var stickyWrapper = document.getElementById('aside');
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = stickyItems[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var i = _step.value;

      var stickyItem = '<div class="sticky-element sticky-element--' + i + '">StickyBit Item ' + i + ' <span class="stuck">is Stuck! \uD83D\uDD25</span></div>';
      var stickyParent = '<div class="sticky-parent sticky-parent--' + i + '">' + stickyItem + '</div>';
      stickyWrapper.innerHTML += stickyParent;
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  stickybits('.sticky-element', {
    stickyBitStickyOffset: 48,
    useStickyClasses: true
  });
})();