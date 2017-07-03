/*
  STICKYBITS 💉
  --------
  a lightweight alternative to `position: sticky` polyfills 🍬
*/
function Stickybit(target, o) {
  if (typeof window === 'undefined') throw Error('stickybits requires `window`')
  /*
    defaults 🔌
    --------
    - target = el (DOM element)
    - offset = 0 || 'dealer's choice'
    - verticalPosition = top || bottom
    - useStickyClasses =
    - elStyles = CSS Styles
    - positionVal = fixed || sticky
  */
  this.el = target
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
  const classes = el.classList
  const win = window
  const rAF = win.requestAnimationFrame

  // setup css classes
  parent.classList.add('js-stickybit-parent')
  const stickyClass = 'js-is-sticky'
  const stuckClass = 'js-is-stuck'

  // manageState
  const stickyStart = parent.getBoundingClientRect().top
  const stickyStop = (stickyStart + parent.offsetHeight) -
      (el.offsetHeight - offset)
  let state = 'default'

  this.manageState = () => {
    const scroll = win.scrollY || win.pageYOffset
    const notSticky = (scroll > stickyStart) && (scroll < stickyStop) &&
      (state === 'default' || state === 'stuck')
    const isSticky = (scroll < stickyStart) && state === 'sticky'
    const isStuck = (scroll > stickyStop) && state === 'sticky'
    if (notSticky) {
      state = 'sticky'
      rAF(() => {
        classes.add(stickyClass)
        if (classes.contains(stuckClass)) classes.remove(stuckClass)
        styles.bottom = ''
        styles.position = pv
        styles[vp] = `${offset}px`
      })
    } else if (isSticky) {
      state = 'default'
      rAF(() => {
        classes.remove(stickyClass)
        if (pv === 'fixed') styles.position = ''
      })
    } else if (isStuck) {
      state = 'stuck'
      rAF(() => {
        classes.remove(stickyClass)
        classes.add(stuckClass)
        if (pv !== 'fixed') return
        styles.top = ''
        styles.bottom = '0'
        styles.position = 'absolute'
      })
    }
  }

  win.addEventListener('scroll', this.manageState)
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
  el.classList.remove('js-is-sticky', 'js-is-stuck')
  el.parentNode.classList.remove('js-stickybit-parent')
  // remove scroll event listener
  window.removeEventListener('scroll', this.manageState)
  // turn of sticky invocation
  this.manageState = false
}

function MultiBits(userInstances) {
  this.privateInstances = userInstances || []
  this.cleanup = () => this.privateInstances.forEach(instance => instance.cleanup())
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
