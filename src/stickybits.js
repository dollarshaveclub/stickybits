/*
  STICKYBITS 💉
  --------
  a lightweight alternative to `position: sticky` polyfills 🍬
*/
function Stickybit(target, o) {
  /*
    defaults 🔌
    --------
    - target = el (DOM element)
    - se = scroll element (DOM element used for scroll event)
    - offset = 0 || dealer's choice
    - verticalPosition = top || bottom
    - useStickyClasses = boolean
    - noStyles = boolean
  */
  this.el = target
  this.se = (o && o.scrollEl) || window
  this.offset = (o && o.stickyBitStickyOffset) || 0
  this.vp = (o && o.verticalPosition) || 'top'
  this.useClasses = (o && o.useStickyClasses) || false
  this.ns = (o && o.noStyles) || false
  this.styles = this.el.style
  this.setStickyPosition()
  if (
    this.positionVal === 'fixed' ||
    this.useClasses === true) {
    this.manageStickiness()
  }
  return this
}

/*
  setStickyPosition ✔️
  --------
  — most basic thing stickybits does
  => checks to see if position sticky is supported
  => stickybits works accordingly
*/
Stickybit.prototype.setStickyPosition = function setStickyPosition() {
  const prefix = ['', '-o-', '-webkit-', '-moz-', '-ms-']
  const styles = this.styles
  const vp = this.vp
  for (let i = 0; i < prefix.length; i += 1) {
    styles.position = `${prefix[i]}sticky`
  }
  if (styles.position !== '') {
    this.positionVal = styles.position
    if (vp === 'top' && !this.ns) {
      styles[vp] = `${this.offset}px`
    }
  } else this.positionVal = 'fixed'
  return this
}

/*
  manageStickiness ✔️
  --------
  — manages stickybit state
  => checks to see if the element is sticky || stuck
  => based on window scroll
*/
Stickybit.prototype.manageStickiness = function manageStickiness() {
  // cache variables
  const el = this.el
  const parent = el.parentNode
  const pv = this.positionVal
  const vp = this.vp
  const styles = this.styles
  const ns = this.ns
  const se = this.se
  const isWin = se === window
  const seOffset = (!isWin && pv === 'fixed') ? se.getBoundingClientRect().top : 0
  const offset = seOffset + this.offset
  const rAF = typeof se.requestAnimationFrame !== 'undefined' ? se.requestAnimationFrame : function rAFDummy(f) { f() }

  // setup css classes
  parent.className += ' js-stickybit-parent'
  const stickyClass = 'js-is-sticky'
  const stuckClass = 'js-is-stuck'
  // r arg = removeClass
  // a arg = addClass
  function toggleClasses(r, a) {
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
  const stickyStart = isWin ? parent.getBoundingClientRect().top :
    (parent.getBoundingClientRect().top - seOffset)
  const stickyStop = (stickyStart + parent.offsetHeight) -
    (el.offsetHeight - offset)
  let state = 'default'

  this.manageState = () => {
    const scroll = isWin ? (se.scrollY || se.pageYOffset) : se.scrollTop
    const notSticky = (scroll > stickyStart) && (scroll < stickyStop) &&
      (state === 'default' || state === 'stuck')
    const isSticky = (scroll < stickyStart) && state === 'sticky'
    const isStuck = (scroll > stickyStop) && state === 'sticky'
    if (notSticky) {
      state = 'sticky'
      rAF(() => {
        toggleClasses(stuckClass, stickyClass)
        styles.position = pv
        if (ns) return
        styles.bottom = ''
        styles[vp] = `${offset}px`
      })
    } else if (isSticky) {
      state = 'default'
      rAF(() => {
        toggleClasses(stickyClass)
        if (pv === 'fixed') styles.position = ''
      })
    } else if (isStuck) {
      state = 'stuck'
      rAF(() => {
        toggleClasses(stickyClass, stuckClass)
        if (pv !== 'fixed' || ns) return
        styles.top = ''
        styles.bottom = '0'
        styles.position = 'absolute'
      })
    }
  }

  se.addEventListener('scroll', this.manageState)
  return this
}

/*
  cleanup 🛁
  --------
  - target = el (DOM element)
  - scrolltarget = window || 'dealer's chose'
  - scroll = removes scroll event listener
*/
Stickybit.prototype.cleanup = function cleanup() {
  const el = this.el
  const styles = this.styles
  // cleanup styles
  styles.position = ''
  styles[this.vp] = ''
  // cleanup CSS classes
  function removeClass(selector, c) {
    const s = selector
    const cArray = s.className.split(' ')
    const cItem = cArray.indexOf(c)
    if (cItem !== -1) cArray.splice(cItem, 1)
    s.className = cArray.join(' ')
  }
  removeClass(el, 'js-is-sticky')
  removeClass(el, 'js-is-stuck')
  removeClass(el.parentNode, 'js-stickybit-parent')
  // remove scroll event listener
  this.se.removeEventListener('scroll', this.manageState)
  // turn of sticky invocation
  this.manageState = false
}

function MultiBits(userInstances) {
  this.privateInstances = userInstances || []
  const instances = this.privateInstances
  this.cleanup = () => {
    for (let i = 0; i < instances.length; i += 1) {
      const instance = instances[i]
      instance.cleanup()
    }
  }
}

export default function stickybits(target, o) {
  let els = typeof target === 'string' ? document.querySelectorAll(target) : target
  if (!('length' in els)) els = [els]
  const instances = []
  for (let i = 0; i < els.length; i += 1) {
    const el = els[i]
    instances.push(new Stickybit(el, o))
  }
  return new MultiBits(instances)
}
