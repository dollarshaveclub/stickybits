import stickybits from './stickybits'

if (typeof window !== 'undefined') {
  const plugin = window.u
  if (plugin) {
    plugin.prototype.stickybits = function stickybitsPlugin (opts) {
      return stickybits(this, opts)
    }
  }
}
