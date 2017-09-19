import ManageSticky from '../../src/managesticky'

test('Jest is working', () => expect(1).toBe(1))

test('Test the managesticky defaults', () => {
  // Set up our document body
  document.body.innerHTML = '<div id="manage-sticky"></div>'
  const e = document.getElementById('manage-sticky')
  const o = {
    interval: 250,
    scrollEl: window,
    offset: 0,
    verticalPosition: 'top',
    useStickyClasses: false,
    noStyles: false,
    off: false,
    stickyClass: 'js-is-sticky',
    stuckClass: 'js-is-stuck',
    parentClass: 'js-stickybit-parent',
  }
  const manage = new ManageSticky(e, o)
  // test the element
  expect(typeof manage).toBe('object')
  expect(manage.props.interval).toBe(250)
})

test('Test the managesticky custom w/o custom scrollEl', () => {
  // Set up our document body
  document.body.innerHTML = '<div id="manage-sticky"></div>'
  const e = document.getElementById('manage-sticky')
  const o = {
    interval: 300,
    scrollEl: window,
    offset: 10,
    verticalPosition: 'bottom',
    useStickyClasses: true,
    noStyles: true,
    off: false,
    stickyClass: 'sticky',
    stuckClass: 'stuck',
    parentClass: 'parent',
  }
  const manage = new ManageSticky(e, o)
  // test the element
  expect(manage.props.interval).toBe(300)
  expect(manage.props.offset).toBe(10)
  expect(manage.props.verticalPosition).toBe('bottom')
  expect(manage.props.useStickyClasses).toBe(true)
  expect(manage.props.noStyles).toBe(true)
  expect(manage.props.off).toBe(false)
  expect(manage.props.stickyClass).toBe('sticky')
  expect(manage.props.stuckClass).toBe('stuck')
  expect(manage.props.parentClass).toBe('parent')
})

// test fixed/sticky
test('Test the managesticky fixed/sticky', () => {
  // Set up our document body
  document.body.innerHTML = '<div id="manage-sticky"></div>'
  const e = document.getElementById('manage-sticky')
  const o = {
    scrollEl: window,
    positionVal: 'fixed',
  }
  const manage = new ManageSticky(e, o)
  // test the element
  expect(manage.el.id).toBe('manage-sticky')
  expect(manage.el.id).toBe('manage-sticky')
  expect(manage.props.positionVal).toBe('fixed')
  manage.props.positionVal = 'sticky'
  expect(manage.props.positionVal).toBe('sticky')
})

// test custom/scroll
test('Test the managesticky custom scroll', () => {
  // Set up our document body
  document.body.innerHTML = '<div id="custom-scroll"><div class="js-stickybit-parent"><div id="manage-sticky"></div></div></div>'
  const e = document.getElementById('manage-sticky')
  const o = {
    scrollEl: '#custom-scroll',
    positionVal: 'fixed',
    stickyClass: 'js-is-sticky',
    stuckClass: 'js-is-stuck',
    parentClass: 'js-stickybit-parent',
  }
  const manage = new ManageSticky(e, o)
  // test the element
  expect(manage.props.scrollEl).toBe('#custom-scroll')
  expect(manage.el.id).toBe('manage-sticky')
  expect(manage.props.positionVal).toBe('fixed')
})

// test no styles

// test off

// test calculations
