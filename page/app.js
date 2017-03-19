'use strict';

(function () {
  stickybits('#nav');
  if (window.innerWidth < 900) return;
  var stickyItems = ['1', '2', '3'];
  var stickyWrapper = document.getElementById('aside');
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = stickyItems[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var i = _step.value;

      var stickyItem = '<div class="sticky-element sticky-element--' + i + '">StickyBit #' + i + '</div>';
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

  stickybits('.sticky-element');
})();