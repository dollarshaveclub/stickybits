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
    - stickyVal = fixed || sticky
  */
  this.el = target;
  this.offset = (o && o.stickyBitStickyOffset) || 0;
  this.vp = (o && o.verticalPosition) || 'top';
  this.useClasses = (o && o.useStickyClasses) || false;
  this.stickyVal = 'fixed';
  this.setPosition();
  if (
    this.stickyVal === 'fixed' ||
    this.useClasses === true) {
    this.observeStickiness();
  }
  return this;
}

/*
  setPosition ✔️
  --------
  — most basic thing stickybits does
  => checks to see if position sticky is supported
  => stickybits works accordingly
*/
Stickybit.prototype.setPosition = function setPosition() {
  const prefix = ['', '-o-', '-webkit-', '-moz-', '-ms-'];
  const s = this.el.style;
  const vp = this.vp;
  for (let i = 0; i < prefix.length; i += 1) {
    s.position = `${prefix[i]}sticky`;
  }
  if (s.position !== '') {
    this.stickyVal = s.position;
    if (vp === 'top') {
      s[vp] = `${this.offset}px`;
    }
  }
  return this;
};

/*
  observeStickiness ✔️
  --------
  — observe stickybit state
  => checks to see if the element is sticky || stuck
  => based on window scroll
*/
Stickybit.prototype.observeStickiness = function observeStickiness() {
  // cache default variables
  const sv = this.stickyVal;
  const vp = this.vp;
  const offset = this.offset;
  const el = this.el;
  const s = el.style;

  // setup stickbits for dom mutations
  const parent = el.parentNode;
  const classes = el.classList;
  parent.classList.add('js-stickybit-parent');
  const stickyClass = 'js-is-sticky';
  const stuckClass = 'js-is-stuck';
  const hasStickyClass = classes.contains(stickyClass);
  const hasStuckClass = classes.contains(stuckClass);

  // setup variables to manage stickiness
  const win = window;
  let scroll;
  let stickyStart;
  let stickyStop;

  // manage stickiness
  function stickiness() {
    if (scroll < stickyStart && hasStickyClass) {
      classes.remove(stickyClass);
      if (sv === 'fixed') s.position = '';
    } else if (scroll > stickyStart && scroll < stickyStop) {
      if (!hasStickyClass) classes.add(stickyClass);
      if (hasStuckClass) {
        classes.remove(stuckClass);
        s.bottom = '';
      }
      s.position = sv;
      s[vp] = `${offset}px`;
    } else if (scroll > stickyStop && !hasStuckClass) {
      classes.remove(stickyClass);
      classes.add(stuckClass);
      if (sv !== 'fixed') return;
      s.top = '';
      s.bottom = '0';
      s.position = 'absolute';
    }
  }

  this.manageStickiness = () => {
    // variables that manage stickiness
    scroll = win.scrollY || win.pageYOffset;
    stickyStart = el.getBoundingClientRect().top;
    stickyStop = (stickyStart + parent.offsetHeight) -
      (el.offsetHeight - offset);
    // only add rAF for stickiness 💅
    // => when the dom will actually change
    if (
      (scroll < stickyStart && !hasStickyClass) ||
      ((scroll > stickyStart) && (scroll < stickyStop) && hasStickyClass && !hasStuckClass) ||
      ((scroll < stickyStop) && hasStuckClass)
    ) return;
    win.requestAnimationFrame(stickiness);
  };

  win.addEventListener('scroll', this.manageStickiness);
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
  const s = el.style;
  // cleanup s
  s.position = '';
  s[this.vp] = '';
  // cleanup CSS classes
  el.classList.remove('js-is-sticky', 'js-is-stuck');
  el.parentNode.classList.remove('js-stickybit-parent');
  // remove scroll event listener
  window.removeEventListener('scroll', this.manageStickiness);
  // turn of sticky invocation
  this.manageStickiness = false;
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
