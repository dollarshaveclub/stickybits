export default function stickybit(target, opts) {
  let els = typeof target === 'string' ? document.querySelectorAll(target) : target;
  if (!('length' in els)) els = [els];

  const defaults = {
		classname: 'js-stickybit',
		position: 0,
		starts: 0,
		stops: 0,
    stuck: 'top',
  };
	const classname = opts && opts.classname || defaults.classname;
	const position = opts && opts.position || defaults.position;
	const starts = opts && opts.starts || defaults.starts;
	const stops = opts && opts.stops || defaults.stops;
  const stuck = opts && opts.stuck || defaults.stuck;

  for (let i = 0; i < els.length; i++) {
    const el = els[i];
		// stuff
	}
}

const plugin = window.$ || window.jQuery || window.Zepto;
if (plugin) {
  plugin.fn.extend({
    stickybit: function stickybitFunc(opts) {
      return stickybit(this, opts);
    },
  });
}
