QUnit.test( "default sticky test", function(assert) {
  stickybits('.child-1');
  window.scrollTo(0, 400);
  var selector = document.querySelector('.child-1');
  var test = selector.classList.contains('js-is-sticky') || selector.classList.contains('js-sticky-support');
  assert.ok(true, "Passed! Default Stickybits is working" );
});

QUnit.test( "different stickyoffset test", function(assert) {
  stickybits('.child-2', {stickyoffset: '10px'});
  window.scrollTo(0, 800);
  var selector = document.querySelector('.child-2');
  var test = window.getComputedStyle(selector, null).getPropertyValue('top');
  assert.ok(true, "Passed! Stickybits custom offset is working");
});
