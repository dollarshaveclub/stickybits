import stickybits from '../../src/stickybits.js'

test('Jest paths are pointed correctly, dom is ready to go', () => {
  document.body.innerHTML = '<div id="stickybit"></div>'
  const div = document.getElementById('stickybit')
  const stickybit = stickybits
  expect(div.id).toBe('stickybit')
  expect(typeof stickybit).toBe('function')
})

test('basic stickybits setup', () => {
  document.body.innerHTML = '<div id="stickybit"></div>'
  const stickybit = stickybits('#stickybit')
  expect(typeof stickybit).toBe('object')
})

test('basic stickybits interface', () => {
  document.body.innerHTML = '<div id="stickybit"></div>'
  const stickybit = stickybits('#stickybit')
  expect(stickybit.props.scrollEl).toBe(window)
  expect(stickybit.props.stickyBitStickyOffset).toBe(0)
  expect(stickybit.props.verticalPosition).toBe('top')
  expect(stickybit.props.useStickyClasses).toBe(false)
  expect(stickybit.props.noStyles).toBe(false)
  expect(stickybit.props.stickyClass).toBe('js-is-sticky')
  expect(stickybit.props.stuckClass).toBe('js-is-stuck')
  expect(stickybit.props.parentClass).toBe('js-stickybit-parent')
  expect(stickybit.props.positionVal).toBe('sticky')
})

test('basic stickybits interface with positionVal equalling sticky', () => {
  document.body.innerHTML = '<div id="stickybit"></div>'
  const stickybit = stickybits('#stickybit')

  // api allows users to define the interface
  stickybit.props.positionVal = 'sticky'
  // stickybit should be sticky
  expect(stickybit.props.positionVal).toBe('sticky')
  stickybit.props.positionVal = stickybit.definePosition()
  // stickybit should be `sticky`
  expect(stickybit.props.positionVal).toBe('sticky')
})

test('stickybits interface with an updated object properties', () => {
  document.body.innerHTML = '<div id="stickybit"></div>'
  const stickybit = stickybits('#stickybit', {
    stickyBitStickyOffset: 10,
    verticalPosition: 'bottom',
    useStickyClasses: true,
    noStyles: true,
    stickyClass: 'sticky',
    stuckClass: 'stuck',
    parentClass: 'parent'
  })
  // interface results with custom object properties
  expect(stickybit.props.stickyBitStickyOffset).toBe(10)
  expect(stickybit.props.verticalPosition).toBe('bottom')
  expect(stickybit.props.useStickyClasses).toBe(true)
  expect(stickybit.props.noStyles).toBe(true)
  expect(stickybit.props.stickyClass).toBe('sticky')
  expect(stickybit.props.stuckClass).toBe('stuck')
  expect(stickybit.props.parentClass).toBe('parent')
  expect(stickybit.props.positionVal).toBe('sticky')
})

test('stickybits interface with custom scrollEl selector', () => {
  document.body.innerHTML = '<div id="parent"><div id="stickybit"></div></div>'
  const stickybit = stickybits('#stickybit', {
    scrollEl: '#parent'
  })
  // interface results for custom scrollEl
  expect(stickybit.props.scrollEl).toBe(document.querySelector('#parent'))
})

test('stickybits interface with custom scrollEl element', () => {
  document.body.innerHTML = '<div id="parent"><div id="stickybit"></div></div>'
  const stickybit = stickybits('#stickybit', {
    scrollEl: document.querySelector('#parent')
  })

  // interface results for custom scrollEl
  expect(stickybit.props.scrollEl).toBe(document.querySelector('#parent'))
})

test('stickybits .addInstance interface', () => {
  document.body.innerHTML = '<div id="manage-sticky"></div>'
  const e = document.getElementById('manage-sticky')
  const stickybit = stickybits('#manage-sticky', { useStickyClasses: true })
  const instance = stickybit.instances[0]
  const p = instance.props
  // test instances
  expect(typeof instance).toBe('object')
  expect(typeof p).toBe('object')
  // test new props
  expect(p.stickyClass).toBe('js-is-sticky')
  expect(p.stuckClass).toBe('js-is-stuck')
  expect(p.useStickyClasses).toBe(true)
  expect(p.verticalPosition).toBe('top')
  expect(p.positionVal).toBe('sticky')
})

test('stickybits .getClosestParent interface', () => {
  document.body.innerHTML = '<div id="parent"><div><div id="child"><div id="manage-sticky"></div></div></div></div>'
  const child = document.getElementById('child')
  const parentEl = document.getElementById('parent')
  const stickybit = stickybits('#manage-sticky')
  const parent = stickybit.getClosestParent(child, parentEl)
  expect(parent.id).toBe('parent')
})

test('stickybits .getTopPosition interface', () => {
  document.body.innerHTML = '<div id="parent"><div><div id="child"><div id="manage-sticky"></div></div></div></div>'
  const child = document.getElementById('child')
  const parentEl = document.getElementById('parent')
  const stickybit = stickybits('#manage-sticky')
  const parentOffsetTop = stickybit.getTopPosition(parentEl)
  expect(parentOffsetTop).toBe(0)
})

test('stickybits .computeScrollOffsets interface', () => {
  document.body.innerHTML = '<div id="parent"><div id="manage-sticky"></div></div>'
  const stickybit = stickybits('#manage-sticky', { useStickyClasses: true })
  const instance = stickybit.instances[0]
  const p = instance.props
  // test instance setup
  expect(typeof instance).toBe('object')
  expect(typeof p).toBe('object')
  stickybit.computeScrollOffsets(instance)
  // test .computeScrollOffsets interface
  expect(instance.offset).toBe(0)
  expect(instance.stickyStart).toBe(0)
  expect(instance.stickyStop).toBe(0)
  expect(instance.state).toBe('default')
})

test('stickybits .toggleClasses interface', () => {
  document.body.innerHTML = '<div id="parent"><div id="manage-sticky"></div></div>'
  const stickybit = stickybits('#manage-sticky', { useStickyClasses: true })
  const el = document.getElementById('parent')
  el.classList.add('test')
  stickybit.toggleClasses(el, test, 'other-test')
  expect(el.classList.contains('other-test')).toBe(true)
})

test('stickybits .manageState `notSticky` interface', () => {
  document.body.innerHTML = '<div id="parent"><div id="manage-sticky"></div></div>'
  const stickybit = stickybits('#manage-sticky', { useStickyClasses: true })
  // test instance setup
  const instance = stickybit.instances[0]

  // test notSticky
  instance.state = 'default'
  instance.stickyStart = 0;
  stickybit.manageState(instance)
  // test instance setup
  expect(typeof instance).toBe('object')
  // test results
  expect(instance.el.style.position).toBe('sticky')
  expect(instance.state).toBe('default')
  expect(instance.stickyStart).toBe(0)
})

test('stickybits .manageState `isSticky` interface from default', () => {
  document.body.innerHTML = '<div id="parent"><div id="manage-sticky"></div></div>'
  const stickybit = stickybits('#manage-sticky', { useStickyClasses: true })
  // test instance setup
  const instance = stickybit.instances[0]

  // test notSticky
  stickybit.isWin = false
  instance.props.scrollEl = { scrollTop: 1 }
  instance.state = 'default'
  instance.stickyStart = 0
  instance.stickyStop = 200
  stickybit.manageState(instance);
  // test instance setup
  expect(typeof instance).toBe('object')
  // test results
  expect(instance.el.style.position).toBe('sticky')
  expect(instance.state).toBe('sticky')
  expect(instance.stickyStart).toBe(0)
  expect(instance.stickyStop).toBe(200)
  expect(instance.props.scrollEl.scrollTop).toBe(1)
})

test('stickybits .manageState `isSticky` interface from stuck', () => {
  document.body.innerHTML = '<div id="parent"><div id="manage-sticky"></div></div>'
  const stickybit = stickybits('#manage-sticky', { useStickyClasses: true })
  // test instance setup
  const instance = stickybit.instances[0]

  // test notSticky
  instance.state = 'stuck'
  instance.el.classList.add('js-is-stuck')
  instance.stickyStart = 1
  stickybit.manageState(instance);
  // test instance setup
  expect(typeof instance).toBe('object')
  // test results
  expect(instance.el.style.position).toBe('sticky')
  expect(instance.state).toBe('default')
  expect(instance.stickyStart).toBe(1)
})

test('stickybits .manageState `isStickyChange` interface', () => {
  document.body.innerHTML = '<div id="parent"><div id="manage-sticky"></div></div>'
  const stickybit = stickybits('#manage-sticky', { useStickyClasses: true, customStickyChangeNumber: 10 })
  // test instance setup
  const instance = stickybit.instances[0]

  // test notSticky
  const stickyChangeTest = instance.stickyChange
  stickybit.manageState(instance)
  // test instance setup
  expect(typeof instance).toBe('object')
  // test results
  expect(instance.el.style.position).toBe('sticky')
  expect(instance.props.customStickyChangeNumber).toBe(10)
  expect(instance.stickyChange).toBe(10)
})

test('stickybits .manageState `isStuck` interface', () => {
  document.body.innerHTML = '<div id="parent"><div id="manage-sticky"></div></div>'
  const stickybit = stickybits('#manage-sticky', { useStickyClasses: true })
  // test instance setup
  const instance = stickybit.instances[0]
  // test notSticky
  stickybit.isWin = false
  instance.props.scrollEl = { scrollTop: 500 }
  instance.state = 'stuck'
  instance.el.classList.add('js-is-stuck')
  instance.stickyStart = 0
  instance.stickyStop = 200
  stickybit.manageState(instance);
  // test instance setup
  expect(typeof instance).toBe('object')
  // test results
  expect(instance.el.style.position).toBe('sticky')
  expect(instance.state).toBe('stuck')
  expect(instance.props.scrollEl.scrollTop).toBe(500)
  expect(instance.stickyStart).toBe(0)
  expect(instance.stickyStop).toBe(200)
})

/*
  Fixed Position Testing
  --------
  This is brittle
  - will probably abstract out arrow functions within rAF
  - help/discussion wanted
*/
test('stickybits .manageState  `position: fixed` interface', () => {
  document.body.innerHTML = '<div id="parent"><div id="manage-sticky"></div></div>'
  const stickybit = stickybits('#manage-sticky', { useStickyClasses: true })
  // test instance setup
  const instance = stickybit.instances[0]
  // test notSticky
  instance.props.positionVal = 'fixed'
  instance.state = 'default'
  instance.stickyStart = 0
  stickybit.manageState(instance);
  // test instance setup
  expect(typeof instance).toBe('object')
  // test results
  expect(instance.props.positionVal).toBe('fixed')
  expect(instance.state).toBe('default')
  expect(instance.stickyStart).toBe(0)
})

test('stickybits .removeClass interface', () => {
  document.body.innerHTML = '<div id="parent"><div id="manage-sticky"></div></div>'
  const stickybit = stickybits('#manage-sticky', { useStickyClasses: true })
  const el = document.getElementById('parent')
  el.classList.add('test')
  stickybit.toggleClasses(el, 'test')
  expect(el.classList.contains('test')).toBe(false)
})

test('stickybits .removeInstance interface', () => {
  document.body.innerHTML = '<div id="parent"><div id="manage-sticky"></div></div>'
  const stickybit = stickybits('#manage-sticky', { useStickyClasses: true })
  const instance = stickybit.instances[0]
  const el = instance.el
  const parent = el.parentElement
  // setup
  el.classList.add('test')
  el.style.position = 'fixed'
  el.style.top = '0px'
  el.classList.add('js-is-sticky')
  parent.classList.add('js-stickybit-parent')
  // invoke removeInstance
  stickybit.removeInstance(instance)
  expect(instance.el.position).toBe(undefined)
  expect(instance.el.top).toBe(undefined)
  expect(instance.el.classList.contains('js-is-sticky')).toBe(false)
  expect(instance.el.parentElement.classList.contains('js-stickybit-parent')).toBe(false)
})

test('stickybits .cleanup interface', () => {
  document.body.innerHTML = '<div id="parent"><div id="manage-sticky"></div></div>'
  const stickybit = stickybits('#manage-sticky', { useStickyClasses: true })
  // invoke .cleanup
  stickybit.cleanup()
  expect(stickybit.manageState).toBe(false)
  expect(stickybit.instances).toEqual([])
})

test('stickybits .update interface', () => {
  document.body.innerHTML = '<div id="parent"><div id="manage-sticky"></div></div>'
  const stickybit = stickybits('#manage-sticky', { useStickyClasses: true })
  const instance = stickybit.instances[0]
  instance.stickyStart = 200
  expect(stickybit.instances[0].stickyStart).toBe(200)
  stickybit.update()
  expect(stickybit.instances[0].stickyStart).toBe(0)
})

test('stickybits .update interface', () => {
  document.body.innerHTML = '<div id="parent"><div id="manage-sticky"></div></div>'
  const stickybit = stickybits('#manage-sticky', { useStickyClasses: true, stickyBitStickyOffset: 20 })
  const instance = stickybit.instances[0]
  expect(stickybit.instances[0].props.stickyBitStickyOffset).toBe(20)
  stickybit.update({ stickyBitStickyOffset: 30 })
  expect(stickybit.instances[0].props.stickyBitStickyOffset).toBe(30)
})

test('stickybits .useFixed interface', () => {
  document.body.innerHTML = '<div id="parent"><div id="manage-sticky"></div></div>'
  const stickybit = stickybits('#manage-sticky', { useFixed: true })
  const instance = stickybit.instances[0]
  expect(instance.props.useFixed).toBe(true)
})
