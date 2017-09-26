/*
  ManageSticky ✔️
  --------
  — manages Stickybits item state
  => checks to see if the element is sticky or stuck
  => based on window scroll
  => provide an interface for users to monitor the state of Stickybits
  ---
  - target = Stickybits item instance
  - o = {object}
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
*/
function ManageSticky(target, o) {
  this.el = target
  this.props = o
  this.parent = this.el.parentNode
  this.parent.className += ` ${this.props.parentClass}`
  this.isWin = this.props.scrollEl === window
  if (!this.isWin) this.props.scrollEl = this.getClosestParent(this.el, this.props.scrollEl)
  const se = this.props.scrollEl
  if (!this.props.off) {
    this.computeScrollOffsets()
    this.state = 'default'
    se.addEventListener('scroll', this.manageState)
  } else {
    // remove scroll event listener
    se.removeEventListener('scroll', this.manageState)
    // turn of sticky invocation
    this.manageState = false
  }
  return this
}

/* 
  getParent 👨‍
  ---
  - a helper function that ensure the target element's parent is selected
  - only used for non `window` scroll elements
  - supports older browsers
*/
ManageSticky.prototype.getClosestParent = function getClosestParent(t, s) {
  // parent element
  const p = document.querySelector(s)
  // initial target
  let el = t
  if (el.parentElement === p) return p
  // traverse up the dom tree until we get to the parent
  while (el.parentElement !== p) el = el.parentElement
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
ManageSticky.prototype.computeScrollOffsets = function computeScrollOffsets() {
  let i = 0
  let interval
  let scrollElOffset = 0
  /*
    checkOffset
    ---
    insures the:
    - offset 
    - stickyStart
    - stickyStop
  */
  const checkOffset = () => {
    i += 1
    if (i > 12) {
      clearInterval(interval)
      return
    }
    let stickyStart = this.parent.getBoundingClientRect().top
    if (!this.isWin && this.positionVal === 'fixed') {
      scrollElOffset = this.scrollEl.getBoundingClientRect().top
      stickyStart = (this.parent.getBoundingClientRect().top - scrollElOffset)
    }
    this.offset = scrollElOffset + this.props.offset
    this.stickyStart = stickyStart
    this.stickyStop = (this.stickyStart + this.parent.offsetHeight) -
      (this.el.offsetHeight - this.offset)
  }
  checkOffset()
  interval = setInterval(checkOffset, this.props.interval)
}

/* 
  toggleClasses ⚖️
  ---
  toggles classes (for older browser support)
*/
ManageSticky.prototype.toggleClasses = function toggleClasses(r, a) {
  const cArray = this.el.className.split(' ')
  if (a && cArray.indexOf(a) === -1) cArray.push(a)
  const rItem = cArray.indexOf(r)
  if (rItem !== -1) cArray.splice(rItem, 1)
  this.el.className = cArray.join(' ')
}

/* 
  manageState 📝
  ---
  stickyStart =>
  - checks if stickyBits is using window
    - if it is using window, it gets the top offset of the parent
    - if it is not using window,
    - it gets the top offset of the scrollEl - the top offset of the parent
*/
ManageSticky.prototype.manageState = function manageState() {
  // cache variables
  const p = this.props
  const ns = this.noStyles
  const pv = this.positionVal
  const se = this.scrollEl
  const rAF = typeof se.requestAnimationFrame !== 'undefined' ? se.requestAnimationFrame : function rAFDummy(f) { f() }
  const state = this.state
  const stickyClass = p.stickyClass
  const stickyStart = this.stickyStart
  const stickyStop = this.stickyStop
  const stuckClass = p.stuckClass
  const styles = this.el.style
  const toggleClasses = this.toggleClasses
  const vp = this.verticalPosition
  // define scroll
  const scroll = this.isWin ? (se.scrollY || se.pageYOffset) : se.scrollTop
  // define sticky state
  const notSticky = (scroll > stickyStart) && (scroll < stickyStop) &&
    (state === 'default' || state === 'stuck')
  const isSticky = (scroll < stickyStart) && state === 'sticky'
  const isStuck = (scroll > stickyStop) && state === 'sticky'
  if (notSticky) {
    this.state = 'sticky'
    rAF(() => {
      toggleClasses(stuckClass, stickyClass)
      styles.position = pv
      if (ns) return
      styles.bottom = ''
      styles[vp] = `${this.offset}px`
    })
  } else if (isSticky) {
    this.state = 'default'
    rAF(() => {
      toggleClasses(stickyClass)
      if (pv === 'fixed') styles.position = ''
    })
  } else if (isStuck) {
    this.state = 'stuck'
    rAF(() => {
      toggleClasses(stickyClass, stuckClass)
      if (pv !== 'fixed' || ns) return
      styles.top = ''
      styles.bottom = '0'
      styles.position = 'absolute'
    })
  }
}

/*
  removeClass ❎
  --------
  - removes classes (for older browser support)
*/
ManageSticky.prototype.removeClass = function removeClass(selector, c) {
  const s = selector
  const cArray = s.className.split(' ')
  const cItem = cArray.indexOf(c)
  if (cItem !== -1) cArray.splice(cItem, 1)
  s.className = cArray.join(' ')
}

/*
  cleanup 🛁
  --------
  - target = el (DOM element)
  - scrolltarget = window || 'dealer's chose'
  - scroll = removes scroll event listener
*/
ManageSticky.prototype.cleanup = function cleanup() {
  const el = this.el
  const removeClass = this.removeClass
  const p = this.props
  // cleanup styles
  el.styles.position = ''
  el.styles[this.vp] = ''
  // cleanup CSS classes
  removeClass(el, p.stickyClass)
  removeClass(el, p.stuckClass)
  removeClass(el.parentNode, p.parentClass)
}

export default ManageSticky
