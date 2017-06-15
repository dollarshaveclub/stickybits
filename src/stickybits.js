/*
  STICKYBITS 💉
  --------
  a lightweight alternative to `position: sticky` polyfills 🍬
*/
const browserPrefix = ['', '-o-', '-webkit-', '-moz-', '-ms-'];

function Stickybit(target, o) {
  /*
    functionality setup 🔧
    --------
    - target = el (DOM element)
    - scrolltarget = window || 'dealer's chose'
  */
  if (typeof window === 'undefined') throw Error('stickybits requires `window`');
  this.el = target;

  /*
    defaults 🔌
    --------
    - offset = 0 || 'dealer's choice'
    - verticalPosition = top || bottom
    - useStickyClasses =
    - elStyles = CSS Styles
    - positionStickyVal = fixed || sticky
  */
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
  // set new vars if .manageStickiness method is used
  this.classes = this.el.classList;
  this.parent = this.el.parentNode;
  this.parent.classList.add('js-stickybit-parent');

  // optimize vars for managing stickiness
  const pv = this.positionStickyVal;
  const vp = this.vp;
  const offset = this.offset;
  const styles = this.styles;
  const classes = this.classes;
  const win = window;
  const stickyBitStart = this.el.getBoundingClientRect().top;
  const stickyBitStop = (stickyBitStart + this.parent.offsetHeight) -
    (this.el.offsetHeight - offset);
  const stickyClass = 'js-is-sticky';
  const stuckClass = 'js-is-stuck';

  // manage stickiness
  function stickiness() {
    const scroll = win.scrollY || win.scrollTop;
    const hasStickyClass = classes.constains(stickyClass);
    const hasStuckClass = classes.constains(stuckClass);
    if (scroll < stickyBitStart) {
      if (hasStickyClass) {
        classes.remove(stickyClass);
        if (pv === 'fixed') styles.position = '';
      }
    } else if (scroll > stickyBitStart && scroll < stickyBitStop) {
      if (hasStickyClass) classes.add(stickyClass);
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
    stickiness();
    win.setTimeout(() => { invoked = false; }, 0);
  };

  win.addEventListener('scroll', () =>
    win.requestAnimationFrame(this.checkStickiness));
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
  el.classList.remove('js-is-sticky', 'js-is-stuck');
  el.parentNode.classList.remove('js-stickybit-parent');
  window.removeEventListener('scroll', this.checkStickiness);
};

export default function stickybits(target, o) {
  let els = typeof target === 'string' ? document.querySelectorAll(target) : target;
  if (!('length' in els)) els = [els];
  const instances = [];
  for (let i = 0; i < els.length; i += 1) {
    const el = els[i];
    instances.push(new Stickybit(el, o));
  }
  function MultiBits(userInstances) {
    this.privateInstances = userInstances || [];
    this.cleanup = () => this.privateInstances.forEach(instance => instance.cleanup());
  }
  return new MultiBits(instances);
}
