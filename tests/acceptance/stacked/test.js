/*
  QUnit Tests
  ----
  - monitors multiple stickybits

*/

// ensure QUnit is working
QUnit.test('hello test', function(assert) {
  assert.ok(1 == '1', 'Passed!');
});

var main = document.getElementById('main');

// generateContentBlock
var content;
var num;
var generateTestContent = function(num) {
  content = '<div id="parent-'+ num +'" class="parent parent-'+ num +'"><div id="child-'+ num +'" class="child child-'+ num +'"><p>Child '+ num +'</p></div></div>';
  return content;
};

window.addEventListener('load', function() {
  // default StickyBits test
  // ensures StickyBits is working 
  QUnit.test('Test multiple stickybits', function(assert) {
    var numbers = ['1', '2', '3'];
    var content = [];
    for (var i = 0; numbers.length > i; i += 1) {
      num = numbers[i];
      var el = generateTestContent(num);
      content.push(el);
    }
    main.innerHTML = content.join('');
    var stickies = stickybits('.child', {useStickyClasses: true});
    var stickyItems = document.querySelectorAll('[style*="position"]');
    assert.equal(stickyItems.length, 3, 'There are 3 sticky items');
  });
})
