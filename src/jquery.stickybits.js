import stickybits from './stickybits'

if (typeof window !== 'undefined') {
  const plugin = window.$ || window.jQuery || window.Zepto
  if (plugin) {
    plugin.fn.stickybits = function stickybitsPlugin(opts) {
      stickybits(this, opts)
    }
  }
}
