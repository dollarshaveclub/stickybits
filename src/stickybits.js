function Stickybit(target, o) {
  const el = target;
  const scrollTarget = (o && o.scrollTarget) || window;
  const stickyBitStickyOffset = (o && o.stickyBitStickyOffset) || 0;
  const verticalPosition = (o && o.verticalPosition) || 'top';
  const useStickyClasses = (o && o.useStickyClasses) || false;
  const elStyle = el.style;
  const browserPrefix = ['', '-o-', '-webkit-', '-moz-', '-ms-'];
  for (let i = 0; i < browserPrefix.length; i += 1) {
    elStyle.position = `${browserPrefix[i]}sticky`;
  }
  let positionStickyVal = 'fixed';
  if (elStyle.position !== '') {
    positionStickyVal = elStyle.position;
    if (verticalPosition === 'top') {
      elStyle[verticalPosition] = `${stickyBitStickyOffset}px`;
    }
    if (useStickyClasses === false) return;
  }
  const elClasses = el.classList;
  const elParent = el.parentNode;
  const stickyBitClass = 'js-is-sticky';
  const stickyBitIsStuckClass = 'js-is-stuck';
  const stickyBitStart = el.getBoundingClientRect().top;
  const stickyBitStop = (stickyBitStart + elParent.offsetHeight) - el.offsetHeight;
  elParent.classList.add('js-stickybit-parent');
  function stickiness() {
    const scroll = scrollTarget.scrollY;
    if (scroll < stickyBitStart) {
      if (elClasses.contains(stickyBitClass)) {
        elClasses.remove(stickyBitClass);
        elStyle.position = '';
      }
      return;
    } else if (scroll > stickyBitStart && scroll < stickyBitStop) {
      if (!elClasses.contains(stickyBitClass)) elClasses.add(stickyBitClass);
      if (elClasses.contains(stickyBitIsStuckClass)) {
        elClasses.remove(stickyBitIsStuckClass);
        elStyle.bottom = '';
      }
      elStyle.position = positionStickyVal;
      elStyle[verticalPosition] = `${stickyBitStickyOffset}px`;
      return;
    } else if (scroll > stickyBitStop && !elClasses.contains(stickyBitIsStuckClass)) {
      elClasses.remove(stickyBitClass);
      elClasses.add(stickyBitIsStuckClass);
      if (positionStickyVal !== 'fixed') return;
      elStyle.top = '';
      elStyle.bottom = '0';
      elStyle.position = 'absolute';
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
