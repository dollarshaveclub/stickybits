/*
  QUnit Tests
  ----
  -  Acceptance test oriented

*/

// generateContentBlock
var num = 1;
var content;
var main = document.getElementById('main');
var generateTestContent = function(num) {
  content = '<div id="parent-'+ num +'" class="parent parent-'+ num +'"><div id="child-'+ num +'" class="child child-'+ num +'"><p>Child '+ num +'</p></div>';
  main.innerHTML = content;
};

window.addEventListener('load', function() {
  // tests StickyBits test
  // ensures StickyBits offset is working 

  QUnit.test('Checks cleanup method', function(assert) {
    generateTestContent(num)
    const selector = document.querySelector('.child-1');
    var stickybit = stickybits('.child-1', {useStickyClasses: true});
    stickybit.cleanup();
    assert.equal(selector.parentNode.classList.contains('js-stickybit-parent'), false, 'This should work like fixed');
    stickybit = stickybits('.child-1', {useStickyClasses: true});
  });
});
