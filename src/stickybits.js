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
  */
  this.el = target
  this.se = (o && o.scrollEl) || window
  this.offset = (o && o.stickyBitStickyOffset) || 0
  this.vp = (o && o.verticalPosition) || 'top'
  this.useClasses = (o && o.useStickyClasses) || false
  this.styles = this.el.style
  this.positionVal = 'fixed'
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
    if (vp === 'top') {
      styles[vp] = `${this.offset}px`
    }
  }
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
  const offset = this.offset
  const styles = this.styles
  const se = this.se
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
  const stickyStart = parent.getBoundingClientRect().top
  const stickyStop = (stickyStart + parent.offsetHeight) -
      (el.offsetHeight - offset)
  let state = 'default'

  this.manageState = () => {
    const scroll = se.scrollY || se.pageYOffset
    const notSticky = (scroll > stickyStart) && (scroll < stickyStop) &&
      (state === 'default' || state === 'stuck')
    const isSticky = (scroll < stickyStart) && state === 'sticky'
    const isStuck = (scroll > stickyStop) && state === 'sticky'
    if (notSticky) {
      state = 'sticky'
      rAF(() => {
        toggleClasses(stuckClass, stickyClass)
        styles.bottom = ''
        styles.position = pv
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
        if (pv !== 'fixed') return
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
