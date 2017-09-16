import stickybits from '../../src/stickybits.js'

test('Jest is working', () => expect(1).toBe(1))

test('Jest paths are pointed correctly, dom is ready to go', () => {
  // Set up our document body
  document.body.innerHTML = '<div id="stickybit"></div>'
  const div = document.getElementById('stickybit')
  const stickybit = stickybits
  // test the element
  expect(div.id).toBe('stickybit')
  expect(typeof stickybit).toBe('function')
})

test('basic stickybits setup', () => {
  // mock the stickybit
  document.body.innerHTML = '<div id="stickybit"></div>'
  const stickybit = stickybits('#stickybit')
  expect(typeof stickybit).toBe('object')
})

test('basic stickybits interface', () => {

  document.body.innerHTML = '<div id="stickybit"></div>'
  const stickybit = stickybits('#stickybit')

  // interface results
  expect(stickybit.props.scrollEl).toBe(window)
  expect(stickybit.props.interval).toBe(250)
  expect(stickybit.props.offset).toBe(0)
  expect(stickybit.props.verticalPosition).toBe('top')
  expect(stickybit.props.useStickyClasses).toBe(false)
  expect(stickybit.props.noStyles).toBe(false)
  expect(stickybit.props.off).toBe(false)
  expect(stickybit.props.stickyClass).toBe('js-is-sticky')
  expect(stickybit.props.stuckClass).toBe('js-is-stuck')
  expect(stickybit.props.parentClass).toBe('js-stickybit-parent')
  expect(stickybit.props.positionVal).toBe('fixed')
})

test('basic stickybits interface with positionVal equalling sticky', () => {
  
  document.body.innerHTML = '<div id="stickybit"></div>'
  const stickybit = stickybits('#stickybit')

  // api allows users to define the interface
  stickybit.props.positionVal = 'sticky'
  // stickybit should be sticky
  expect(stickybit.props.positionVal).toBe('sticky')
  stickybit.props.positionVal = stickybit.definePosition()
  // stickybit should be fixed
  expect(stickybit.props.positionVal).toBe('fixed')
})

test('stickybits interface with an updated object properties', () => {
  
  document.body.innerHTML = '<div id="stickybit"></div>'
  const stickybit = stickybits('#stickybit', {
    interval: 300,
    offset: 10,
    verticalPosition: 'bottom',
    useStickyClasses: true,
    noStyles: true,
    off: true,
    stickyClass: 'sticky',
    stuckClass: 'stuck',
    parentClass: 'parent'
  })

  // interface results with custom object properties
  expect(stickybit.props.interval).toBe(300)
  expect(stickybit.props.offset).toBe(10)
  expect(stickybit.props.verticalPosition).toBe('bottom')
  expect(stickybit.props.useStickyClasses).toBe(true)
  expect(stickybit.props.noStyles).toBe(true)
  expect(stickybit.props.off).toBe(true)
  expect(stickybit.props.stickyClass).toBe('sticky')
  expect(stickybit.props.stuckClass).toBe('stuck')
  expect(stickybit.props.parentClass).toBe('parent')
  expect(stickybit.props.positionVal).toBe('fixed')
})

test('stickybits interface w/o custom scrollEl', () => {
  
  document.body.innerHTML = '<div id="parent"><div id="stickybit"></div></div>'
  const stickybit = stickybits('#stickybit', {
    scrollEl: '#parent'
  })

  // interface results for custom scrollEl
  expect(stickybit.props.scrollEl).toBe('#parent')
})
