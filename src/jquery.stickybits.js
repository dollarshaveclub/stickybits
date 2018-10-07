import stickybits from './stickybits'

if (typeof window !== 'undefined') {
  const library = window.$ || window.jQuery || window.Zepto
  if (library) {
    library.fn.stickybits = function stickybitsPlugin (opts) {
      return stickybits(this, opts)
    }
  }
}
