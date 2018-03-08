/*
  computeStickyStart ✔️
  --------
  —  most basic thing stickybits does
  => checks to see if position sticky is supported
  => defined the position to be used
  => stickybits works accordingly
*/
export default function computeStickyStart (el, parent, scrollElOffset, isCustom) {
  const stickyStart = isCustom
    ? parent.getBoundingClientRect().top - scrollElOffset
    : parent.getBoundingClientRect().top

  return stickyStart
}
