/*
  STICKYBITS 💉
  --------
  a lightweight alternative to `position: sticky` polyfills 🍬
*/
function Stickybit(target, o) {
  if (typeof window === 'undefined') throw Error('stickybits requires `window`');
  /*
    defaults 🔌
    --------
    - target = el (DOM element)
    - offset = 0 || 'dealer's choice'
    - verticalPosition = top || bottom
    - useStickyClasses =
    - elStyles = CSS Styles
    - positionStickyVal = fixed || sticky
  */
  this.el = target;
  this.offset = (o && o.stickyBitStickyOffset) || 0;
  this.vp = (o && o.verticalPosition) || 'top';
  this.useClasses = (o && o.useStickyClasses) || false;
  this.styles = this.el.style;
  this.positionStickyVal = 'fixed';
  this.setStickyPosition();
  if (
    this.positionStickyVal === 'fixed' ||
    this.useClasses === true) {
    this.manageStickiness();
  }
  return this;
}

/*
  setStickyPosition ✔️
  --------
  — most basic thing stickybits does
  => checks to see if position sticky is supported
  => stickybits works accordingly
*/
Stickybit.prototype.setStickyPosition = function setStickyPosition() {
  const browserPrefix = ['', '-o-', '-webkit-', '-moz-', '-ms-'];
  const styles = this.styles;
  const vp = this.vp;
  for (let i = 0; i < browserPrefix.length; i += 1) {
    styles.position = `${browserPrefix[i]}sticky`;
  }
  if (styles.position !== '') {
    this.positionStickyVal = styles.position;
    if (vp === 'top') {
      styles[vp] = `${this.offset}px`;
    }
  }
  return this;
};

/*
  manageStickiness ✔️
  --------
  — manages stickybit state
  => checks to see if the element is sticky || stuck
  => based on window scroll
*/
Stickybit.prototype.manageStickiness = function manageStickiness() {
  const parent = this.el.parentNode;
  const pv = this.positionStickyVal;
  const vp = this.vp;
  const offset = this.offset;
  const styles = this.styles;
  const classes = this.el.classList;
  const win = window;
  parent.classList.add('js-stickybit-parent');
  const stickyBitStart = this.el.getBoundingClientRect().top;
  const stickyBitStop = (stickyBitStart + parent.offsetHeight) -
    (this.el.offsetHeight - offset);
  const stickyClass = 'js-is-sticky';
  const stuckClass = 'js-is-stuck';

  // manage stickiness
  function stickiness() {
    const scroll = win.scrollY || win.pageYOffset;
    const hasStickyClass = classes.contains(stickyClass);
    const hasStuckClass = classes.contains(stuckClass);
    if (scroll < stickyBitStart) {
      if (hasStickyClass) {
        classes.remove(stickyClass);
        if (pv === 'fixed') styles.position = '';
      }
    } else if (scroll > stickyBitStart && scroll < stickyBitStop) {
      if (!hasStickyClass) classes.add(stickyClass);
      if (hasStuckClass) {
        classes.remove(stuckClass);
        styles.bottom = '';
      }
      styles.position = pv;
      styles[vp] = `${offset}px`;
    } else if (scroll > stickyBitStop && !hasStuckClass) {
      classes.remove(stickyClass);
      classes.add(stuckClass);
      if (pv !== 'fixed') return;
      styles.top = '';
      styles.bottom = '0';
      styles.position = 'absolute';
    }
  }

  let invoked;

  this.checkStickiness = function checkStickiness() {
    if (invoked) return;
    invoked = true;
    win.requestAnimationFrame(stickiness);
    win.setTimeout(() => { invoked = false; }, 0);
  };

  win.addEventListener('scroll', this.checkStickiness);
  return this;
};

/*
  cleanup 🛁
  --------
  - target = el (DOM element)
  - scrolltarget = window || 'dealer's chose'
  - scroll = removes scroll event listener
*/
Stickybit.prototype.cleanup = function cleanup() {
  const el = this.el;
  const styles = this.styles;
  // cleanup styles
  styles.position = '';
  styles[this.vp] = '';
  // cleanup CSS classes
  el.classList.remove('js-is-sticky', 'js-is-stuck');
  el.parentNode.classList.remove('js-stickybit-parent');
  // remove scroll event listener
  window.removeEventListener('scroll', this.checkStickiness);
  // turn of sticky invocation
  this.checkStickiness = false;
};

function MultiBits(userInstances) {
  this.privateInstances = userInstances || [];
  this.cleanup = () => this.privateInstances.forEach(instance => instance.cleanup());
}

export default function stickybits(target, o) {
  let els = typeof target === 'string' ? document.querySelectorAll(target) : target;
  if (!('length' in els)) els = [els];
  const instances = [];
  for (let i = 0; i < els.length; i += 1) {
    const el = els[i];
    instances.push(new Stickybit(el, o));
  }
  return new MultiBits(instances);
}
