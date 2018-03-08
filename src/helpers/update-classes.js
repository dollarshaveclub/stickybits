/*
  updateClasses ⚖️
  ---
  removes/adds classes (for older browser support)
  el = element which classes
  r = removed class
  a = added class
*/
export default function updateClasses (el, r, a) {
  const cArray = el.className.split(' ')
  if (a && cArray.indexOf(a) === -1) cArray.push(a)
  const rItem = cArray.indexOf(r)
  if (rItem !== -1) cArray.splice(rItem, 1)
  el.className = cArray.join(' ')
}
