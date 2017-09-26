/*
  QUnit Tests
  ----
  - monitors `useStickyClasses` 

*/

// ensure QUnit is working
QUnit.test('hello test', function(assert) {
  assert.ok(1 == '1', 'Passed!');
});

var main = document.getElementById('main');

// generateContentBlock
var num = 1;
var content;
var generateTestContent = function(num) {
  content = '<div id="parent-'+ num +'" class="parent parent-'+ num +'"><div id="child-'+ num +'" class="child child-'+ num +'"><p>Child '+ num +'</p></div>';
  return main.innerHTML = content;
};


window.addEventListener('load', function() {
  // tests StickyBits test
  // ensures StickyBits offset is working 
  QUnit.test('different stickyOffset test', function(assert) {
    generateTestContent(num)
    var selector = document.querySelector('.child-1')
    stickybits(selector, {useStickyClasses: true})
    window.scrollTo(window.scrollX, window.scrollY + 400);
    assert.equal(selector.classList.contains('js-is-sticky'), true, 'The stickybit should have a sticky class')
  })
})
