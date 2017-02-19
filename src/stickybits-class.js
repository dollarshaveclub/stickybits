function StickyBit(target, opts = {}) {
  const defaults = {
    scrollTarget: window,
    stickyBitStickyOffset: '0',
    customVerticalPosition: false,
  };

  this.el = target;
  this.opts = Object.assign(opts, defaults);

  if (doesBrowserSupportSticky()) {
    this.setCustomVerticalPosition();
  } else {
    this.manageStickiness();
  }
}

StickyBit.prototype.setCustomVerticalPosition = function setCustomVerticalPosition() {
  if (this.opts.customVerticalPosition === false) {
    this.el.style.top = `${this.opts.stickyBitStickyOffset}px`;
  }
};

StickyBit.prototype.manageStickiness = function manageStickiness() {
  const el = this.el;
  const elClasses = this.el.classList;
  const elParent = el.parentNode;
  const scrollTarget = this.opts.scrollTarget;
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
      if (this.opts.customVerticalPosition === false) {
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
};

if (typeof window !== 'undefined') {
  const plugin = window.$ || window.jQuery || window.Zepto;
  if (plugin) {
    plugin.fn.stickybits = function stickybitsPlugin(opts) {
      stickybits(this, opts);
      return;
    };
  }
}

export default function stickybits(target, opts) {
  return new StickyBit(target, opts);
}

export function doesBrowserSupportSticky() {
  const testElement = document.createElement('test');
  return !!['', '-webkit-', '-moz-', '-ms-', '-o-'].find((prefix) => {
    testElement.style.position = `${prefix}sticky`;
    return testElement.style.position;
  });
}

export function applyStickySupportedHTMLAttribute() {
  if (doesBrowserSupportSticky()) {
    document.documentElement.setAttribute('data-sticky-supported', true);
  }
}

