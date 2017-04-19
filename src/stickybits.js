const browserPrefix = ['', '-o-', '-webkit-', '-moz-', '-ms-'];
const stickyBitClass = 'js-is-sticky';
const stickyBitIsStuckClass = 'js-is-stuck';

function Stickybit(target, o) {
  this.el = target;
  this.scrollTarget = (o && o.scrollTarget) || window;
  this.stickyBitStickyOffset = (o && o.stickyBitStickyOffset) || 0;
  this.verticalPosition = (o && o.verticalPosition) || 'top';
  this.useStickyClasses = (o && o.useStickyClasses) || false;
  this.elStyle = this.el.style;
  this.positionStickyVal = 'fixed';
}

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
};

Stickybit.prototype.manageStickiness = function manageStickiness() {
  const el = this.el;
  const scrollTarget = this.scrollTarget;
  const positionStickyVal = this.positionStickyVal;
  const verticalPosition = this.verticalPosition;
  const stickyBitStickyOffset = this.stickyBitStickyOffset;
  const elStyle = this.elStyle;
  const elClasses = el.classList;
  const elParent = el.parentNode;
  const stickyBitStart = el.getBoundingClientRect().top;
  const stickyBitStop = (stickyBitStart + elParent.offsetHeight) - (el.offsetHeight - stickyBitStickyOffset);
  elParent.classList.add('js-stickybit-parent');
  function stickiness() {
    const scroll = scrollTarget.scrollY;
    if (scroll < stickyBitStart) {
      if (elClasses.contains(stickyBitClass)) {
        elClasses.remove(stickyBitClass);
        elStyle.position = '';
      }
    } else if (scroll > stickyBitStart && scroll < stickyBitStop) {
      if (!elClasses.contains(stickyBitClass)) elClasses.add(stickyBitClass);
      if (elClasses.contains(stickyBitIsStuckClass)) {
        elClasses.remove(stickyBitIsStuckClass);
        elStyle.bottom = '';
      }
      elStyle.position = positionStickyVal;
      elStyle[verticalPosition] = `${stickyBitStickyOffset}px`;
    } else if (scroll > stickyBitStop && !elClasses.contains(stickyBitIsStuckClass)) {
      elClasses.remove(stickyBitClass);
      elClasses.add(stickyBitIsStuckClass);
      if (positionStickyVal !== 'fixed') return;
      elStyle.top = '';
      elStyle.bottom = '0';
      elStyle.position = 'absolute';
    }
  }
  let invoked;
  function checkStickiness() {
    if (invoked) return;
    invoked = true;
    stickiness();
    window.setTimeout(() => { invoked = false; }, 0);
  }
  scrollTarget.addEventListener('scroll', () => scrollTarget.requestAnimationFrame(checkStickiness));
};

export default function stickybits(target, o) {
  let els = typeof target === 'string' ? document.querySelectorAll(target) : target;
  if (!('length' in els)) els = [els];
  let stickyBit;
  for (let i = 0; i < els.length; i += 1) {
    const el = els[i];
    stickyBit = new Stickybit(el, o);
    stickyBit.setStickyPosition();
    if (
      stickyBit.positionStickyVal === 'fixed' ||
      stickyBit.useStickyClasses === true) {
      stickyBit.manageStickiness();
    }
  }
}
