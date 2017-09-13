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

  // basic interface results
  expect(stickybit.props.scrollEl).toBe(window)
  expect(stickybit.props.interval).toBe(250)
  expect(stickybit.props.offset).toBe(0)
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

  // api now allows users to define the interface
  stickybit.props.positionVal = 'sticky'
  // stickybit should be sticky
  expect(stickybit.props.positionVal).toBe('sticky')
  stickybit.props.positionVal = stickybit.definePosition()
  // stickybit should be fixed
  expect(stickybit.props.positionVal).toBe('fixed')
})
