/*
  --------
  getParent 👨‍
  --------
  - a helper function that gets the target element's parent selected el
  - only used for non `window` scroll elements
  - supports older browsers
*/
export default function getClosestParent (el, match) {
  // p = parent element
  const p = match
  let e = el
  if (e.parentElement === p) return p
  // traverse up the dom tree until we get to the parent
  while (e.parentElement !== p) e = e.parentElement
  // return parent element
  return p
}
