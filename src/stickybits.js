/*
  STICKYBITS 💉
  --------
  >  a lightweight alternative to `position: sticky` polyfills 🍬
  -  Each method is documented
  -  Key functionalities within methods with methods is documented
  -  Stickybits 2.0 consists of 2 prototypes to improve user experience for developers
     -  ManageSticky prototype supports *`polymorphic functionality` for Stickybits Item
        -  it can/could be treeshaken out
     -  Stickybits prototype supports core functionality
        -  It does not manage polymorphic functionality (position like properties)

  * polymorphic functionality: (in the context of describing Stickybits)
    means making things like `position: sticky` be loosely supported with position fixed.
    It also means that features like `useStickyClasses` takes on styles like `position: fixed`.
*/

import ManageSticky from './managesticky'


function Stickybits(target, o) {
  /*
    defaults 🔌
    --------
    -  target = el (DOM element)
    -  interval = the amount of time passed before a computed is invoked
    -  scrollEl = scroll element (DOM element used for scroll event)
    -  offset = 0 || dealer's choice
    -  verticalPosition = top || bottom
    -  useStickyClasses = boolean
    -  noStyles = boolean
    -  off = boolean
    -  stickyClass = 'string'
    -  stuckClass = 'string'
    -  parentClass = 'string'
  */
  // assign and cache props
  this.props = {
    interval: (o && o.interval) || 250,
    scrollEl: (o && o.scrollEl) || window,
    offset: (o && o.offset) || 0,
    verticalPosition: (o && o.verticalPosition) || 'top',
    useStickyClasses: (o && o.useStickyClasses) || false,
    noStyles: (o && o.noStyles) || false,
    off: (o && o.off) || false,
    stickyClass: (o && o.stickyClass) || 'js-is-sticky',
    stuckClass: (o && o.stuckClass) || 'js-is-stuck',
    parentClass: (o && o.parentClass) || 'js-stickybit-parent',
  }
  const p = this.props
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
    if (vp === 'top' && !ns) styles[vp] = `${this.offset}px`
    if (pv !== 'fixed' || p.useStickyClasses === false) styles.position = pv
    else {
      const stickyManager = new ManageSticky(el, p)
      this.instances.push(stickyManager)
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
  return typeof test.position !== 'undefined' ? test.position : 'fixed'
}

export default function stickybits(target, o) {
  return new Stickybits(target, o)
}
