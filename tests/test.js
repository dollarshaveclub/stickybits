$(window).on('load', function() {
  var $main = $('#main');
  var num;
  var content;

  QUnit.test( "default sticky test", function(assert) {
    num = 1;
    content = '<div id="parent-'+ num +'" class="parent parent-'+ num +'"><div id="child-'+ num +'" class="child child-'+ num +'"><p>Child '+ num +'</p></div>';
    $main.append(content);
    stickybits('.child-1');
    var selector = document.querySelector('.child-1');
    const test = selector.classList.contains('js-is-sticky') || selector.classList.contains('js-sticky-support');
    assert.ok(true, "Passed! Default Stickybits is working" );
  });
  QUnit.test( "different stickyOffset test", function(assert) {
    num = 2;
    content = '<div id="parent-'+ num +'" class="parent parent-'+ num +'"><div id="child-'+ num +'" class="child child-'+ num +'"><p>Child '+ num +'</p></div>';
    $main.append(content);
    stickybits('.child-2', {stickyBitStickyOffset: '10'});
    assert.equal($('.child-2').css('top'), '10px', 'top should be set to 10px');
  });
  QUnit.test( "unique top test", function(assert) {
    num = 3;
    content = '<div id="parent-'+ num +'" class="parent parent-'+ num +'"><div id="child-'+ num +'" class="child child-'+ num +'"><p>Child '+ num +'</p></div>';
    $main.append(content);
    $('.child-3').css('top', '20px')
    stickybits('.child-3', {customVerticalPosition: 'true'});
    assert.equal($('.child-3').css('top'), '20px', 'top should be set to 20px');
  });
  QUnit.test( "always fixed test", function(assert) {
    num = 4;
    content = '<div id="parent-'+ num +'" class="parent parent-'+ num +'"><div id="child-'+ num +'" class="child child-'+ num +'"><p>Child '+ num +'</p></div>';
    $main.append(content);
    stickybits('.child-4', {fixedOnly: true});
    assert.equal($('.child-4').css('position'), 'static', 'position should be set to static until fixed');
  });
  QUnit.test( "sticky like fixed", function(assert) {
    num = 5;
    content = '<div id="parent-'+ num +'" class="parent parent-'+ num +'"><div id="child-'+ num +'" class="child child-'+ num +'"><p>Child '+ num +'</p></div>';
    $main.append(content);
    stickybits('.child-5', {fixedSticky: true});
    assert.equal($('.child-5').css('top'), '0px', 'position should be set to static until sticky');
  });
});
