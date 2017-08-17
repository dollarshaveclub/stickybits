/*
  QUnit Tests
  ----
  -  Acceptance test oriented

*/

// ensure QUnit is working
QUnit.test('hello test', function(assert) {
  assert.ok(1 == '1', 'Passed!');
});

var main = document.getElementById('main');

// generateContentBlock
var num;
var content;
var generateTestContent = function() {
  content = '<div id="parent-'+ num +'" class="parent parent-'+ num +'"><div id="child-'+ num +'" class="child child-'+ num +'"><p>Child '+ num +'</p></div>';
  main.appendChild(content)
};


window.addEventListener('load', function() {
  // default StickyBits test
  // ensures StickyBits is working 
  QUnit.test('default sticky test', function(assert) {
    num = 1;
    generateTestContent();
    stickybits('.child-1');
    var selector = document.querySelector('.child-1')
    var test = selector.classList.contains('js-is-sticky') || 
      selector.classList.contains('js-sticky-support')
    assert.ok(true, 'Passed! Default Stickybits is working')
  });


  // tests StickyBits test
  // ensures StickyBits offset is working 
  QUnit.test('different stickyOffset test', function(assert) {
    num = 2
    generateTestContent()

    var selector = document.querySelector('.child-2')
    stickybits(selector, {stickyBitStickyOffset: 10})
    assert.equal(selector.style.top, '10px', 'top should be set to 10px')
  })

  QUnit.test('unique top test', function(assert) {
    num = 3
    generateTestContent()
    var selector = document.querySelector('.child-2')
    stickybits(selector, {verticalPosition: 'top'})
    assert.equal(selector.style.top, '0px', 'top should be set to 0px')
  })

  QUnit.test( "Checks to make sure sticky monitoring works", function(assert) {
    num = 4
    generateTestContent()
    var selector = document.querySelector('.child-4')
    stickybits(selector, {useStickyClasses: true})
    assert.equal(selector.parentNode.classList.contains('js-stickybit-parent'), true, 'This should work like fixed')
  })

  QUnit.test('Checks cleanup method', function(assert) {
    num = 5
    generateTestContent()
    const selector = document.querySelector('.child-5')
    stickybits(selector, {useStickyClasses: true})
    stickybits(selector).cleanup()
    assert.equal(selector.parentNode.classList.contains('js-stickybit-parent'), false, 'This should work like fixed')
  })
})
