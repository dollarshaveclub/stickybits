/*
  QUnit Tests
  ----
  - monitors multiple stickybits

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
    var stickies = stickybits('.child', { useStickyClasses: true });
    var stickyItems = document.querySelectorAll('[style*="position"]');
    var instance = stickies.instances[0];
    var stickyStart = instance.stickyStart
    var main = document.getElementById('main')
    assert.equal(stickyItems.length, 1, 'There are 3 sticky items');
    assert.equal(stickyStart, 400, 'The stickyStart is 400');
    main.style.top = 500;
    stickies.update();
    assert.equal(stickyStart, 500, 'The stickyStart is 500');
  });
})
