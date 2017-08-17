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
  */
  this.props = typeof o !== 'undefined' ? o : {}
  const p = this.props
  p.interval = o.intnerval || 250
  p.scrollEl = o.scrollEl || window
  p.offset = o.stickyBitStickyOffset || 0
  p.verticalPosition = o.verticalPosition || 'top'
  p.useStickyClasses = o.useStickyClasses || false
  p.noStyles = o.noStyles || false
  p.off = o.off || false
  /*
    define positionVal
    ----
    -  uses a computed (`.setStickyPosition()`)
    -  defined the position
  */
  p.positionVal = this.setStickyPosition()
  const pv = p.positionVal
  this.els = typeof target === 'string' ? document.querySelectorAll(target) : target
  if (!('length' in this.els)) this.els = [this.els]
  this.instances = []
  for (let i = 0; i < this.els.length; i += 1) {
    const vp = p.verticalPosition
    const ns = p.noStyles
    const el = this.els[i]
    const styles = el.style
    if (vp === 'top' && !ns) styles[vp] = `${this.offset}px`
    if (pv !== 'fixed' || p.useStickyClasses === false) {
      styles.position = pv
    } else {
      const elProps = {
        noStyles: ns,
        off: p.off,
        offset: p.offset,
        positionVal: pv,
        scrollEl: p.scrollEl,
        verticalPosition: vp,
        // stickyClass definitions are added here as they're potentially not needed
        stickyClass: p.stickyClass || 'js-is-sticky',
        stuckClass: p.stuckClass || 'js-is-stuck',
        parentClass: p.parentClass || 'js-stickybit-parent',
      }
      this.instances.push(new ManageSticky(el, elProps))
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
  const test = document.createElement('test')
  const prefix = ['', '-o-', '-webkit-', '-moz-', '-ms-']
  const styles = test.styles
  for (let i = 0; i < prefix.length; i += 1) {
    styles.position = `${prefix[i]}sticky`
  }
  return styles.position !== '' ? styles.position : 'fixed'
}

export default function stickybits(target, o) {
  return new Stickybits(target, o)
}
