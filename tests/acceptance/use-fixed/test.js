/*
  QUnit Tests
  ----
  - monitors useFixed

*/

// ensure QUnit is working
QUnit.test('hello test', function (assert) {
  assert.ok(1 == '1', 'Passed!');
});

var main = document.getElementById('main');

// generateContentBlock
var content;
var num;
var generateTestContent = function (num) {
  content = '<div id="parent-' + num + '" class="parent parent-' + num + '"><div id="child-' + num + '" class="child child-' + num + '"><p>Child ' + num + '</p></div></div>';
  return content;
};

window.addEventListener('load', function () {
  // default StickyBits test
  // ensures StickyBits is working
  QUnit.test('Test update', function (assert) {
    var numbers = ['1'];
    var content = [];
    for (var i = 0; numbers.length > i; i += 1) {
      num = numbers[i];
      var el = generateTestContent(num);
      content.push(el);
    }
    main.innerHTML = content.join('');
    var stickies = stickybits('.child', { useFixed: true });
    var stickyItems = document.querySelectorAll('[style*="position"]');
    var instance = stickies.instances[0];
    var stickyStart = instance.stickyStart
    var main = document.getElementById('main')
    assert.equal(stickyItems.length, 1, 'There is 1 sticky item');
    assert.equal(stickyItems[0].style.position, 'fixed', 'The stickybit position is fixed');
  });
})
