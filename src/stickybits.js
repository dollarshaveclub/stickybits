function Stickybit(target, o) {
  const opts = {
    scrollTarget: window,
    stickyBitStickyOffset: 0,
    customVerticalPosition: false,
  };
  this.el = target;
  this.scrollTarget = (o && o.scrollTarget) || opts.scrollTarget;
  this.stickyBitStickyOffset = (o && o.stickyBitStickyOffset) || opts.stickyBitStickyOffset;
  this.customVerticalPosition = (o && o.customVerticalPosition) || opts.customVerticalPosition;
  const browserPrefix = ['', '-o-', '-webkit-', '-moz-', '-ms-'];
  for (let i = 0; i < browserPrefix.length; i += 1) {
    this.el.style.position = `${browserPrefix[i]}sticky`;
  }
  if (this.el.style.position !== '') {
    if (this.customVerticalPosition === false) {
      this.el.style.top = `${this.stickyBitStickyOffset}px`;
    }
    return;
  }
  const elClasses = this.el.classList;
  const elParent = this.el.parentNode;
  const scrollTarget = this.scrollTarget;
  const stickyBitClass = 'js-is-sticky';
  const stickyBitIsStuckClass = 'js-is-stuck';
  const stickyBitStart = this.el.getBoundingClientRect().top;
  const stickyBitStop = (stickyBitStart + elParent.offsetHeight) - this.el.offsetHeight;
  elParent.classList.add('js-stickybit-parent');
  function stickiness() {
    const scroll = scrollTarget.scrollY;
    if (scroll < stickyBitStart) {
      if (elClasses.contains(stickyBitClass)) {
        elClasses.remove(stickyBitClass);
        this.el.style.position = '';
      }
      return;
    } else if (scroll > stickyBitStart && scroll < stickyBitStop) {
      if (!elClasses.contains(stickyBitClass)) elClasses.add(stickyBitClass);
      if (elClasses.contains(stickyBitIsStuckClass)) {
        elClasses.remove(stickyBitIsStuckClass);
        this.el.style.bottom = '';
      }
      this.el.style.position = 'fixed';
      if (this.customVerticalPosition === false) {
        this.el.style.top = `${this.opts.stickyBitStickyOffset}px`;
      }
      return;
    } else if (scroll > stop && !elClasses.contains(stickyBitIsStuckClass)) {
      elClasses.remove(stickyBitClass);
      elClasses.add(stickyBitIsStuckClass);
      this.el.style.top = '';
      this.el.style.bottom = '0';
      this.el.style.position = 'absolute';
      return;
    }
    return;
  }
  scrollTarget.addEventListener('scroll', () => scrollTarget.requestAnimationFrame(stickiness));
}
export default function stickybits(target, o) {
  let els = typeof target === 'string' ? document.querySelectorAll(target) : target;
  if (!('length' in els)) els = [els];
  let stickyBit;
  for (let i = 0; i < els.length; i += 1) {
    const el = els[i];
    stickyBit = new Stickybit(el, o);
  }
  return stickyBit;
}
