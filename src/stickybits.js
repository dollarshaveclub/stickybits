/*
  STICKYBITS 💉
  --------
  > a lightweight alternative to `position: sticky` polyfills 🍬
  - Each method is documented
  - It does not manage polymorphic functionality (position like properties)
  * polymorphic functionality: (in the context of describing Stickybits)
    means making things like `position: sticky` be loosely supported with position fixed.
    It also means that features like `useStickyClasses` takes on styles like `position: fixed`.

  --------
  defaults 🔌
  --------
  - version = package.json version
  - userAgent = viewer agent
  - t = target = el (DOM element)
  - interval = the amount of time passed before a computed is invoked
  - noStyles = boolean
  - off = boolean
  - offset = 0 || dealer's choice
  - parentClass = 'string'
  - scrollEl = scroll element (DOM element used for scroll event)
  - stickyClass = 'string'
  - stuckClass = 'string'
  - useStickyClasses = boolean
  - verticalPosition = top || bottom

  --------
  props🔌
  --------
  - p = props {object}

  --------
  instance note
  --------
  - stickybits parent methods return this
  - stickybits instance methods return an instance item 

  --------
  nomenclature
  --------
  - target => el => e
  - props => o || p
  - instance = item
*/
function Stickybits(target, o) {
  this.version = '__VERSION__'
  this.userAgent = window.navigator.userAgent
  this.props = {
    interval: (o && o.interval) || 250,
    noStyles: (o && o.noStyles) || false,
    off: (o && o.off) || false,
    offset: (o && o.stickyBitStickyOffset) || 0,
    parentClass: (o && o.parentClass) || 'js-stickybit-parent',
    scrollEl: (o && o.scrollEl) || window,
    stickyClass: (o && o.stickyClass) || 'js-is-sticky',
    stuckClass: (o && o.stuckClass) || 'js-is-stuck',
    useStickyClasses: (o && o.useStickyClasses) || false,
    verticalPosition: (o && o.verticalPosition) || 'top',
  }
  const p = this.props
  if (p.off) return null
  /*
    define positionVal
    ----
    -  uses a computed (`.definePosition()`)
    -  defined the position
  */
  p.positionVal = this.definePosition()
  const vp = p.verticalPosition
  const ns = p.noStyles
  const pv = p.positionVal
  this.els = typeof target === 'string' ? document.querySelectorAll(target) : target
  if (!('length' in this.els)) this.els = [this.els]
  this.instances = []
  for (let i = 0; i < this.els.length; i += 1) {
    const el = this.els[i]
    const styles = el.style
    if (vp === 'top' && !ns) styles[vp] = `${p.offset}px`
    if (pv !== 'fixed' && p.useStickyClasses === false) {
      styles.position = pv
    } else {
      // const stickyManager = new ManageSticky(el, p)
      if (pv !== 'fixed') styles.position = pv
      const instance = this.addInstance(el, p)
      // instances are an array of objects
      this.instances.push(instance)
    }
  }
  return this
}

/*
  setStickyPosition ✔️
  --------
  —  most basic thing stickybits does
  => checks to see if position sticky is supported
  => defined the position to be used
  => stickybits works accordingly
*/
Stickybits.prototype.definePosition = () => {
  const prefix = ['', '-o-', '-webkit-', '-moz-', '-ms-']
  const test = document.head.style
  for (let i = 0; i < prefix.length; i += 1) {
    test.position = `${prefix[i]}sticky`
  }
  const stickyProp = typeof test.position !== 'undefined' ? test.position : 'fixed'
  test.position = ''
  return stickyProp
}

/*
  instance ✔️
  --------
  — manages instances of items
  - in
  - takes in an el and props
  - returns an item object

  ---
  - target = Stickybits el
  - o = {object} = props
    - scrollEl = 'string'
    - verticalPosition = number
    - off = boolean
    - parentClass = 'string'
    - stickyClass = 'string'
    - stuckClass = 'string'
  ---
  - defined later
    - parent = dom element
    - state = 'string'
    - offset = number
    - stickyStart = number
    - stickyStop = number
  - returns an instance object
*/
Stickybits.prototype.addInstance = function addInstance(el, props) {
  const item = {
    el,
    parent: el.parentNode,
    props,
  }
  const p = item.props
  item.parent.className += ` ${props.parentClass}`
  let se = p.scrollEl
  item.isWin = se === window
  if (!item.isWin) se = this.getClosestParent(item.el, se)
  this.computeScrollOffsets(item)
  item.state = 'default'
  this.stateContainer = () => { this.manageState(item) }
  se.addEventListener('scroll', this.stateContainer)
  return item
}

/* 
  getParent 👨‍
  ---
  - a helper function that ensure the target element's parent is selected
  - only used for non `window` scroll elements
  - supports older browsers
*/
Stickybits.prototype.getClosestParent = function getClosestParent(el, matchSelector) {
  // p = parent element
  const p = document.querySelector(matchSelector)
  let e = el
  if (e.parentElement === p) return p
  // traverse up the dom tree until we get to the parent
  while (e.parentElement !== p) e = e.parentElement
  // return parent element
  return p
}


/* 
  computeScrollOffsets 📊
  ---
  computeScrollOffsets for Stickybits
  - defines
    - offset
    - start
    - stop
*/
Stickybits.prototype.computeScrollOffsets = function computeScrollOffsets(item) {
  const it = item
  const p = it.props
  const parent = it.parent
  const iw = it.isWin
  let i = 0
  let interval
  let scrollElOffset = 0
  const checkOffset = () => {
    i += 1
    if (i > 12) {
      clearInterval(interval)
      return
    }
    let stickyStart = parent.getBoundingClientRect().top
    if (!iw && p.positionVal === 'fixed') {
      scrollElOffset = p.scrollEl.getBoundingClientRect().top
      stickyStart = (parent.getBoundingClientRect().top - scrollElOffset)
    }
    it.offset = scrollElOffset + p.offset
    it.stickyStart = stickyStart
    it.stickyStop = (it.stickyStart + parent.offsetHeight) -
      (it.el.offsetHeight - it.offset)
  }
  checkOffset()
  interval = setInterval(checkOffset, p.interval)
  return it
}

/* 
  toggleClasses ⚖️
  ---
  toggles classes (for older browser support)
  r = removed class
  a = added class
*/
Stickybits.prototype.toggleClasses = function toggleClasses(el, r, a) {
  const e = el
  const cArray = e.className.split(' ')
  if (a && cArray.indexOf(a) === -1) cArray.push(a)
  const rItem = cArray.indexOf(r)
  if (rItem !== -1) cArray.splice(rItem, 1)
  e.className = cArray.join(' ')
}

/* 
  manageState 📝
  ---
  - defines the state
    - normal
    - sticky
    - stuck
*/
Stickybits.prototype.manageState = function manageState(item) {
  const it = item
  const e = it.el
  const p = it.props
  const ns = p.noStyles
  const pv = p.positionVal
  const se = p.scrollEl
  const rAF = typeof se.requestAnimationFrame !== 'undefined' ? se.requestAnimationFrame : function rAFDummy(f) { f() }
  const state = it.state
  const stickyClass = p.stickyClass
  const stickyStart = it.stickyStart
  const stickyStop = it.stickyStop
  const stuckClass = p.stuckClass
  const styles = it.el.style
  const toggleClasses = this.toggleClasses
  const vp = p.verticalPosition
  const scroll = it.isWin ? (se.scrollY || se.pageYOffset) : se.scrollTop
  const notSticky = (scroll > stickyStart) && (scroll < stickyStop) &&
    (state === 'default' || state === 'stuck')
  const isSticky = (scroll < stickyStart) && state === 'sticky'
  const isStuck = (scroll > stickyStop) && state === 'sticky'
  if (notSticky) {
    it.state = 'sticky'
    rAF(() => {
      toggleClasses(e, stuckClass, stickyClass)
      styles.position = pv
      if (ns) return
      styles.bottom = ''
      styles[vp] = `${this.offset}px`
    })
  } else if (isSticky) {
    it.state = 'default'
    rAF(() => {
      toggleClasses(e, stickyClass)
      if (pv === 'fixed') styles.position = ''
    })
  } else if (isStuck) {
    it.state = 'stuck'
    rAF(() => {
      toggleClasses(e, stickyClass, stuckClass)
      if (pv !== 'fixed' || ns) return
      styles.top = ''
      styles.bottom = '0'
      styles.position = 'absolute'
    })
  }
  return it
}

/*
  removeClass ❎
  --------
  - removes classes (for older browser support)
*/
Stickybits.prototype.removeClass = function removeClass(el, className) {
  const e = el
  const cArray = e.className.split(' ')
  const cItem = cArray.indexOf(className)
  if (cItem !== -1) cArray.splice(cItem, 1)
  e.className = cArray.join(' ')
}

/*
  removes an instance 👋

*/
Stickybits.prototype.removeInstance = function removeInstance(instance) {
  const e = instance.el
  const p = instance.props
  const removeClass = this.removeClass
  e.style.position = ''
  e.style[this.vp] = ''
  removeClass(e, p.stickyClass)
  removeClass(e, p.stuckClass)
  removeClass(e.parentNode, p.parentClass)
}

/*
  cleanup 🛁
  --------
  - target = el (DOM element)
  - scrolltarget = window || 'dealer's chose'
  - scroll = removes scroll event listener
*/
Stickybits.prototype.cleanup = function cleanup() {
  const p = this.props
  p.off = true
  for (let i = 0; i < this.instances.length; i += 1) {
    const instance = this.instances[i]
    this.removeInstance(instance)
  }
  this.stateManager = false
  this.instances = []
}

/*
  export 
  --------
  exports StickBits to be used 🏁
*/
export default function stickybits(target, o) {
  return new Stickybits(target, o)
}
