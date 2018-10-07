import stickybits from './stickybits'

if (typeof window !== 'undefined') {
  const library = window.u
  if (library) {
    library.prototype.stickybits = function stickybitsPlugin (opts) {
      return stickybits(this, opts)
    }
  }
}
