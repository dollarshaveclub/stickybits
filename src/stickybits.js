import computeStickyStart from './helpers/compute-sticky-start'
import definePosition from './helpers/define-position'
import getClosestParent from './helpers/get-closest-parent'
import updateClasses from './helpers/update-classes'

/*
  STICKYBITS 💉
  --------
  > a lightweight alternative to `position: sticky` polyfills 🍬
  --------
  - each method is documented above it our view the readme
  - Stickybits does not manage polymorphic functionality (position like properties)
  * polymorphic functionality: (in the context of describing Stickybits)
    means making things like `position: sticky` be loosely supported with position fixed.
    It also means that features like `useStickyClasses` takes on styles like `position: fixed`.
  --------
  defaults 🔌
  --------
  - version = `package.json` version
  - userAgent = viewer browser agent
  - target = DOM element selector
  - noStyles = boolean
  - offset = number
  - parentClass = 'string'
  - scrollEl = window || DOM element selector
  - stickyClass = 'string'
  - stuckClass = 'string'
  - useStickyClasses = boolean
  - verticalPosition = 'string'
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
  - instance => item => it
  --------
  methods
  --------
  - .addInstance = an array of objects for each Stickybits Target
  - .define = computes scroll position
  - .manageState = manages sticky state
  - .removeInstance = removes an instance
  - .cleanup = removes all Stickybits instances and cleans up dom from stickybits
*/
function Stickybits (target, obj) {
  const o = typeof obj !== 'undefined' ? obj : {}
  this.version = 'VERSION'
  this.userAgent = window.navigator.userAgent || 'no `userAgent` provided by the browser'
  this.props = {
    customStickyChangeNumber: o.customStickyChangeNumber || null,
    noStyles: o.noStyles || false,
    stickyBitStickyOffset: o.stickyBitStickyOffset || 0,
    parentClass: o.parentClass || 'js-stickybit-parent',
    scrollEl: document.querySelector(o.scrollEl) || window,
    stickyClass: o.stickyClass || 'js-is-sticky',
    stuckClass: o.stuckClass || 'js-is-stuck',
    stickyChangeClass: o.stickyChangeClass || 'js-is-sticky--change',
    useStickyClasses: o.useStickyClasses || false,
    verticalPosition: o.verticalPosition || 'top',
  }
  const p = this.props
  /*
    define positionVal
    ----
    -  uses a computed (`.definePosition()`)
    -  defined the position
  */
  p.positionVal = definePosition()
  const vp = p.verticalPosition
  const ns = p.noStyles
  const pv = p.positionVal
  this.els = typeof target === 'string' ? document.querySelectorAll(target) : target
  if (!('length' in this.els)) this.els = [this.els]
  this.instances = []
  for (let i = 0; i < this.els.length; i += 1) {
    const el = this.els[i]
    const styles = el.style
    // set vertical position
    styles[vp] = vp === 'top' && !ns ? `${p.stickyBitStickyOffset}px` : ''
    styles.position = pv !== 'fixed' ? pv : ''
    if (pv === 'fixed' || p.useStickyClasses) {
      const instance = this.addInstance(el, p)
      // instances are an array of objects
      this.instances.push(instance)
    }
  }
  return this
}

/*
  addInstance ✔️
  --------
  — manages instances of items
  - takes in an el and props
  - returns an item object
  ---
  - target = el
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
Stickybits.prototype.addInstance = function addInstance (el, props) {
  const item = {
    el,
    parent: el.parentNode,
    props,
  }
  this.isWin = this.props.scrollEl === window
  const se = this.isWin ? window : getClosestParent(item.el, item.props.scrollEl)
  this.defineScrollOffsets(item)
  item.parent.className += ` ${props.parentClass}`
  item.state = 'default'
  item.stateContainer = () => this.manageState(item)
  se.addEventListener('scroll', item.stateContainer)
  return item
}

/*
  defineScrollOffsets 📊
  ---
  defineScrollOffsets for Stickybits
  - defines
    - offset
    - start
    - stop
*/
Stickybits.prototype.defineScrollOffsets = function defineScrollOffsets (item) {
  const it = item
  const p = it.props
  const el = it.el
  const parent = it.parent
  const isCustom = !this.isWin && p.positionVal === 'fixed'
  const isBottom = p.verticalPosition !== 'bottom'
  const scrollElOffset = isCustom ? p.scrollEl.getBoundingClientRect().top : 0
  const stickyStart = computeStickyStart(el, parent, scrollElOffset, isCustom)
  const stickyChangeOffset = p.customStickyChangeNumber !== null
    ? p.customStickyChangeNumber
    : el.offsetHeight
  it.offset = scrollElOffset + p.stickyBitStickyOffset
  it.stickyStart = isBottom ? stickyStart - it.offset : 0
  it.stickyChange = it.stickyStart + stickyChangeOffset
  it.stickyStop = isBottom
    ? (stickyStart + parent.offsetHeight) - (it.el.offsetHeight + it.offset)
    : stickyStart + parent.offsetHeight
  return it
}

/*
  manageState 📝
  ---
  - defines the state
    - normal
    - sticky
    - stuck
*/
Stickybits.prototype.manageState = function manageState (item) {
  // cache object
  const it = item
  const e = it.el
  const p = it.props
  const state = it.state
  const start = it.stickyStart
  const change = it.stickyChange
  const stop = it.stickyStop
  const stl = e.style
  // cache props
  const ns = p.noStyles
  const pv = p.positionVal
  const se = p.scrollEl
  const sticky = p.stickyClass
  const stickyChange = p.stickyChangeClass
  const stuck = p.stuckClass
  const vp = p.verticalPosition
  /*
    requestAnimationFrame
    ---
    - use rAF
    - or stub rAF
  */
  const rAFStub = function rAFDummy (f) { f() }
  const rAF = !this.isWin
    ? rAFStub
    : window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    rAFStub

  /*
    define scroll vars
    ---
    - scroll
    - notSticky
    - isSticky
    - isStuck
  */
  const uC = updateClasses
  const scroll = (this.isWin || se.getBoundingClientRect().top)
    ? window.scrollY || window.pageYOffset
    : se.scrollTop
  const notSticky = scroll > start && scroll < stop && (state === 'default' || state === 'stuck')
  const isSticky = scroll <= start && state === 'sticky'
  const isStuck = scroll >= stop && state === 'sticky'
  const isStickyChange = scroll >= change && scroll <= stop
  const isNotStickyChange = scroll < change || scroll > stop
  const stub = 'stub' // a stub css class to remove
  /*
    Unnamed arrow functions within this block
    ---
    - help wanted or discussion
    - view test.stickybits.js
      - `stickybits .manageState  `position: fixed` interface` for more awareness 👀
  */
  rAF(() => {
    if (notSticky) {
      it.state = 'sticky'
      uC(e, stuck, sticky)
      stl.position = pv
      if (ns) return
      stl.bottom = ''
      stl[vp] = `${p.stickyBitStickyOffset}px`
    } else if (isSticky) {
      it.state = 'default'
      uC(e, sticky)
      if (pv === 'fixed') stl.position = ''
    } else if (isStuck) {
      it.state = 'stuck'
      uC(e, sticky, stuck)
      if (pv !== 'fixed' || ns) return
      stl.top = ''
      stl.bottom = '0'
      stl.position = 'absolute'
    }
    if (isNotStickyChange) uC(e, stickyChange)
    else if (isStickyChange) uC(e, stub, stickyChange)
  })

  return it
}

/*
  removes an instance 👋
  --------
  - cleanup instance
*/
Stickybits.prototype.removeInstance = function removeInstance (instance) {
  const e = instance.el
  const p = instance.props
  const uC = updateClasses
  e.style.position = ''
  e.style[p.verticalPosition] = ''
  uC(e, p.stickyClass)
  uC(e, p.stuckClass)
  uC(e.parentNode, p.parentClass)
}

/*
  cleanup 🛁
  --------
  - cleans up each instance
  - clears instance
*/
Stickybits.prototype.cleanup = function cleanup () {
  for (let i = 0; i < this.instances.length; i += 1) {
    const instance = this.instances[i]
    instance.props.scrollEl.removeEventListener('scroll', instance.stateContainer)
    this.removeInstance(instance)
  }
  this.manageState = false
  this.instances = []
}

/*
  export
  --------
  exports StickBits to be used 🏁
*/
export default function stickybits (target, o) {
  return new Stickybits(target, o)
}
