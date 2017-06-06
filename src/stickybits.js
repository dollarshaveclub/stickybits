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
  this.el = target;
  this.scrollTarget = (o && o.scrollTarget) || window;

  /*
    defaults 🔌
    --------
    - offset = 0 || 'dealer's choice'
    - verticalPosition = top || bottom
    - useStickyClasses =
    - elStyles = CSS Styles
    - positionStickyVal = fixed || sticky
  */
  this.stickyBitStickyOffset = (o && o.stickyBitStickyOffset) || 0;
  this.verticalPosition = (o && o.verticalPosition) || 'top';
  this.useStickyClasses = (o && o.useStickyClasses) || false;
  this.elStyle = this.el.style;
  this.positionStickyVal = 'fixed';
}

/*
  setStickyPosition ✔️
  --------
  — most basic thing stickybits does
  => checks to see if position sticky is supported
  => stickybits works accordingly
*/
Stickybit.prototype.setStickyPosition = function setStickyPosition() {
  const elStyle = this.elStyle;
  const verticalPosition = this.verticalPosition;
  for (let i = 0; i < browserPrefix.length; i += 1) {
    elStyle.position = `${browserPrefix[i]}sticky`;
  }
  if (elStyle.position !== '') {
    this.positionStickyVal = elStyle.position;
    if (verticalPosition === 'top') {
      elStyle[verticalPosition] = `${this.stickyBitStickyOffset}px`;
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
  const el = this.el;
  const scrollTarget = this.scrollTarget;
  const positionStickyVal = this.positionStickyVal;
  const verticalPosition = this.verticalPosition;
  const stickyBitStickyOffset = this.stickyBitStickyOffset;
  const elStyle = this.elStyle;
  const elParent = el.parentNode;
  const elClasses = el.classList;
  const stickyBitStart = el.getBoundingClientRect().top;
  const stickyBitStop = (stickyBitStart + elParent.offsetHeight) -
    (el.offsetHeight - stickyBitStickyOffset);
  const stickyBitClass = 'js-is-sticky';
  const stickyBitIsStuckClass = 'js-is-stuck';
  elParent.classList.add('js-stickybit-parent');
  function stickiness() {
    const scroll = scrollTarget.scrollY;
    const hasStickyBitClass = elClasses.constains(stickyBitClass);
    const hasStickyBitStuckClass = elClasses.constains(stickyBitIsStuckClass);
    if (scroll < stickyBitStart) {
      if (hasStickyBitClass) {
        elClasses.remove(stickyBitClass);
        if (positionStickyVal === 'fixed') elStyle.position = '';
      }
    } else if (scroll > stickyBitStart && scroll < stickyBitStop) {
      if (hasStickyBitClass) el.classList.add(stickyBitClass);
      if (hasStickyBitStuckClass) {
        stickyBitClass.classList.remove(stickyBitIsStuckClass);
        elStyle.bottom = '';
      }
      elStyle.position = positionStickyVal;
      elStyle[verticalPosition] = `${stickyBitStickyOffset}px`;
    } else if (scroll > stickyBitStop && !hasStickyBitStuckClass) {
      elClasses.remove(stickyBitClass);
      elClasses.add(stickyBitIsStuckClass);
      if (positionStickyVal !== 'fixed') return;
      elStyle.top = '';
      elStyle.bottom = '0';
      elStyle.position = 'absolute';
    }
  }

  let invoked;

  this.checkStickiness = function checkStickiness() {
    if (invoked) return;
    invoked = true;
    stickiness();
    window.setTimeout(() => { invoked = false; }, 0);
  };

  scrollTarget.addEventListener('scroll', () =>
    scrollTarget.requestAnimationFrame(this.checkStickiness));
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
  this.scrollTarget.removeEventListener('scroll', this.checkStickiness);
};

Stickybit.prototype.init = function init() {
  this.setStickyPosition();
  if (
    this.positionStickyVal === 'fixed' ||
    this.useStickyClasses === true) {
    this.manageStickiness();
  }
  return this;
};

export default function stickybits(target, o) {
  let els = typeof target === 'string' ? document.querySelectorAll(target) : target;
  if (!('length' in els)) els = [els];
  for (let i = 0; i < els.length; i += 1) {
    const el = els[i];
    return new Stickybit(el, o).init();
  }
  return this;
}
