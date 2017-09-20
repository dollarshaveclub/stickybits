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
var numbers = [1, 2, 3];
var content;
var num;
var generateTestContent = function(num) {
  content = '<div id="parent-'+ num +'" class="parent parent-'+ num +'"><div id="child-'+ num +'" class="child child-'+ num +'"><p>Child '+ num +'</p></div>';
  return main.innerHTML = content;
};

for (var i = 0; numbers.length < i; i += 1) {
  num = numbers[i];
  generateTestContent(num);
}


window.addEventListener('load', function() {
  // default StickyBits test
  // ensures StickyBits is working 
  QUnit.test('Test multiple stickbits', function(assert) {
    stickybits('.child');
    var stickyItems = document.querySelectorAll('[styles=*"sticky"]');
    assert.equal(stickyItems, 3, 'There are 3 stick items');
  });
})
