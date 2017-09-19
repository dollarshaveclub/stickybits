/*
  ManageSticky ✔️
  --------
  — manages Stickybits item state
  => checks to see if the element is sticky or stuck
  => based on window scroll
  => provide an interface for users to monitor the state of Stickybits
*/
function ManageSticky(target, o) {
  /*
    -  target = Stickybits item instance
    -  o = {object}
       -  scrollEl
       -  verticalPosition
       -  off
       -  parentClass
       -  stickyClass
       -  stuckClass
       -  

  */

  this.el = target
  this.props = o

  /* 
    getParent
    ---
    a helper function that ensure the target element's parent is selected
  */
  const getClosest = (t, s) => {
    const e = document.querySelector(s)
    if (t.parentElement === e) return e
    while (t.parentElement !== e) {
      return e
    }
  }
  let se = window
  if (this.props.scrollEl !== window) se = getClosest(this.el, this.props.scrollEl)
  const el = this.el
  const p = this.props
  const isWin = se === window
  // select the parent
  this.parent = el.parentNode
  this.parent.className += ` ${p.parentClass}`
  const parent = this.parent


  if (!p.off) {
    // compute scroll offsets
    let i = 0
    let interval
    const computeScrollOffsets = () => {
      i += 1
      if (i > 12) {
        clearInterval(interval)
        return
      }
      const scrollElOffset = (!isWin && this.positionVal === 'fixed') ?
        se.getBoundingClientRect().top : 0
      this.offset = scrollElOffset + o.offset
      this.stickyStart = isWin ? parent.getBoundingClientRect().top :
        (parent.getBoundingClientRect().top - this.scrollElOffset)
      this.stickyStop = (this.stickyStart + parent.offsetHeight) -
      (el.offsetHeight - this.offset)
    }
    computeScrollOffsets()
    interval = setInterval(computeScrollOffsets, 250)
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

// r arg = removeClass
// a arg = addClass
ManageSticky.prototype.toggleClasses = function toggleClasses(r, a) {
  const el = this.el
  const cArray = el.className.split(' ')
  if (a && cArray.indexOf(a) === -1) cArray.push(a)
  const rItem = cArray.indexOf(r)
  if (rItem !== -1) cArray.splice(rItem, 1)
  el.className = cArray.join(' ')
}

// manageState
/* stickyStart =>
  -  checks if stickyBits is using window
      -  if it is using window, it gets the top offset of the parent
      -  if it is not using window,
         -  it gets the top offset of the scrollEl - the top offset of the parent
*/
ManageSticky.prototype.manageState = () => {
  // cached variables
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
  // todo computed
  const scroll = this.isWin ? (se.scrollY || se.pageYOffset) : se.scrollTop
  // define stick type
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
  return this
}

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
  const styles = el.styles
  const removeClass = this.removeClass
  const p = this.props
  // cleanup styles
  styles.position = ''
  styles[this.vp] = ''
  // cleanup CSS classes
  removeClass(el, p.stickyClass)
  removeClass(el, p.stuckClass)
  removeClass(el.parentNode, p.parentClass)
}

export default ManageSticky
