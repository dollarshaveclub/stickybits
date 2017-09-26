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
  generateTestContent(num);
  var selector = document.querySelector('.child-1');
  stickybits(selector, {useStickyClasses: true});
  $('html, body').animate({scrollTop: '+=500px'}, 300);
  setTimeout(function() {
    QUnit.test('stickbits adds `js-is-sticky`', function(assert) {
      assert.equal(selector.classList.contains('js-is-sticky'), true, 'The stickybit should have a sticky class');
    })
    $('html, body').animate({scrollTop: '0px'}, 0);
    setTimeout(function() {
      QUnit.test('stickbits removes `js-is-sticky`', function(assert) {
        assert.equal(selector.classList.contains('js-is-sticky'), false, 'The stickybit should not have a sticky class');
      })
      $('html, body').animate({scrollTop: '+=1000px'}, 300);
      setTimeout(function() {
        QUnit.test('stickbits adds `js-is-stuck`', function(assert) {
          assert.equal(selector.classList.contains('js-is-stuck'), true, 'The stickybit should have a stuck class');
        })
        $('html, body').animate({scrollTop: '0px'}, 0);
      }, 300);
    }, 100);
  }, 300);
});
