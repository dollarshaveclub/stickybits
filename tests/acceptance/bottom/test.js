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
  var selector = document.querySelector('.child-1');
  stickybits(selector, {useStickyClasses: true});
  $('html, body').animate({scrollTop: '+=1000px'}, 300);
  setTimeout(function() {
    QUnit.test('stickbits adds `js-is-stuck`', function(assert) {
      assert.equal(selector.classList.contains('js-is-stuck'), true, 'The stickybit should have a stucky class');
    })
  }, 300);
});
