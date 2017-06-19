<p align="center">
  <img alt="StickyBits banner" src="http://imgh.us/stickybits.svg" width="400" />
</p>
<p align="center">Make things get sticky &hellip;in a good way</p>
<hr />
<p align="center">
  <a href="https://travis-ci.org/dollarshaveclub/stickbits/">
    <img alt="Build Status" src="https://travis-ci.org/dollarshaveclub/stickybits.svg?branch=master" />
  </a>
  <a href="https://www.npmjs.com/package/stickybits">
    <img alt="npm version" src="https://badge.fury.io/js/stickybits.svg" />
  </a>
  <a href="https://github.com/dollarshaveclub/stickybits"> 
    <img alt="bower version" src="https://badge.fury.io/bo/stickybits.svg" />
  </a>
  <a href="https://greenkeeper.io/">
    <img alt="Greenkeeper" src="https://badges.greenkeeper.io/dollarshaveclub/stickybits.svg" />
  </a>
  <a href="https://twitter.com/home?status=Stickybits%2C%20A%200%20dep%2C%201kb%20JS%20plugin.%20Make%20things%20get%20sticky%20in%20a%20good%20way!%20%F0%9F%8D%AC%20https%3A%2F%2Fgithub.com%2Fdollarshaveclub%2Fstickybits%40yowainwright">
    <img alt="Share on Twitter" src="https://img.shields.io/twitter/url/http/shields.io.svg?style=social&maxAge=2592000" />
  </a>
</p>
<hr />
<h1 align="center">StickyBits 🍬</h1>

> Stickybits is a lightweight (~2KB) alternative to `position: sticky` polyfills that works perfectly for things like sticky headers.

**Stickybits is awesome because:**
-  it can add a CSS Sticky Class (`.js-is-sticky`) when [position: sticky](http://caniuse.com/#search=sticky) elements become active and a CSS Stuck Class (`.js-is-stuck`) when they become stuck. See [useStickyClasses](#feature).
-  it loosely mimics [position: sticky](http://caniuse.com/#search=sticky) to consistently stick elements vertically across multiple platforms 
-  does not have the _jumpiness_ that plugins that are built around `position: fixed` have because it tries to support `position: sticky` first.
-  in its simplest use case, a `scroll` event listener will not be used if `position: sticky` is supported.
-  it is super simple & lightweight (2kb minified)

<hr />
  <p align="center">
    <a href="#install">Installation</a>&nbsp;&nbsp;
    <a href="#setup">Setup</a>&nbsp;&nbsp;
    <a href="#usage">Usage</a>&nbsp;&nbsp;
    <a href="#feature">Feature</a>&nbsp;&nbsp;
    <a href="#options">Options</a>&nbsp;&nbsp;
    <a href="#examples">Examples</a>&nbsp;&nbsp;
    <a href="#notes">Notes</a>
  </p>
<hr />

<h2 id="install">Installing from a package manager</h2>

yarn
```sh
yarn add stickybits
```
npm
```sh
npm install stickybits --save
```
bower
```sh
bower install stickybits --save
```

<h2 id="setup">Setup</h2>

Add **dist/stickybits.min.js**.

<h2 id="usage">Basic Usage</h2>

```javascript
stickybits('selector');
```

#### By default, a selected stickybits element will:

-  Stick elements to the top of the viewport when scrolled to vertically.
-  Stick elements at the bottom of their parent element when scrolled past.

<h2 id="feature"><code>useStickyClasses</code> Feature</h2>

> Stickybits allows customers to add CSS to elements when they become sticky and when they become stuck at the bottom of their parent element.

By default, if `position: sticky` is supported, StickyBits will exit allowing the browser to manage stickiness and avoid adding a `scroll` event listener.

If the `useStickyClasses` argument is set to `true` then even if a browser supports `position: sticky`, StickyBits will still add a `scroll` event listener to [add and remove sticky CSS Classes](#notes). This option is available so that CSS styles can use when StickyBits elements become sticky or stuck at the bottom of their parent.

To use `useStickyClasses`:

```javascript
stickybits('selector', {useStickyClasses: true});
```

Then, in css you can do:

```css
.some-sticky-element .js-is-sticky {
  background-color: red;
}
.some-sticky-element .js-is-stuck {
  background-color: green;
}
```

View [add css classes](#notes) for more information on StickyBits CSS Classes.

<h2 id="options">Options</h2>

### Vertical Layout Position

By default, a StickyBits element will stick to the top of the viewport when vertically scrolled to.

Stickybits loosely works for `bottom` positioning as well. 

To have a StickyBits element stick to the `bottom`:

```javascript
stickybits('selector', {verticalPosition: 'bottom'});
```

### StickyBit Sticky Offset

By default, a StickyBits element will have a `0px` sticky layout top offset. This means that the element will stick flush to the top of the viewport.

To have a StickyBits element stick with a `20px` offset to its vertical layout position:

```javascript
stickybits('selector', {stickyBitStickyOffset: 20});
```

### StickyBits Cleanup

To _cleanup_ an instance of Stickybits:

```javascript
const stickybitsInstancetoBeCleanedup = stickbits('selector');
stickybitsInstancetoBeCleanedup.cleanup();
````

For jQuery and Zepto support, read in the jQuery notes [below](#jquery).

<h2 id="examples">Examples</h2>

-  [Basic Usage](http://codepen.io/yowainwright/pen/e68dcc768322fef0c72588576bbc1bfa)
-  [Basic usage but with multiple instances of the same selector](http://codepen.io/yowainwright/pen/8965fb5fd72300b38294b31963b27c68)
-  [Custom vertical top offset](https://codepen.io/yowainwright/pen/YQZPqR) ie: `stickybits('selector', {stickyBitStickyOffset: 20})`
-  [Custom vertical position](http://codepen.io/yowainwright/pen/e32cc7b82907ed9715a0a482ffa57596) ie: `stickybits('selector', {customVerticalPosition: true})`
-  [UseStickyClasses](http://codepen.io/yowainwright/pen/NpzPGR) ie: `stickybits('selector', {useStickyClasses: true})`
-  [Clean Stickybits](https://codepen.io/yowainwright/pen/470824238eb548e5f308089c0343afbe) ie: `const stickything = stickybits('selector'); stickything.cleanup();`
-  [As a jQuery or Zepto Plugin](http://codepen.io/yowainwright/pen/57b852e88a644e9d919f843dc7b3b5f1) ie: `$('selector').stickybits();`

-----

Have another example or question? Feel free to [comment](https://github.com/dollarshaveclub/stickybits/issues). 🙌

<h2 id="notes">Notes</h2>

### CSS Class Usage

3 CSS classes will be added and removed by Stickybits if `position: sticky` is not supported or if the `useStickyClasses: true` option is added to the plugin call.

-  `js-is-sticky` if the selected element is sticky.
-  `js-is-stuck` if the selected element is stopped at the bottom of its parent.
-  `js-stickybit-parent` so that styles can easily be added to the parent of a Stickybits element

### Not a Polyfill

We strayed away from calling Stickybits a Shim or Polyfill for `position: sticky` because full support would require more code. This plugin simply makes elements vertically sticky very similarly to `position: fixed` but in a `sticky` sort of way. Read more about position sticky [here](https://developer.mozilla.org/en-US/docs/Web/CSS/position) or follow its browser implementation [here](http://caniuse.com/#search=sticky).  

<h3 id="jquery">jQuery and Zepto Usage</h3>

Basic 

```javascript
$('selector').stickybits();
```

With `useStickyClasses`

```javascript
$('selector').stickybits({useStickyClasses: true});
```

With `customVerticalPosition`

```javascript
$('selector').stickybits({customVerticalPosition: true});
```

With `stickyBitStickyOffset`

```javascript
$('selector').stickybits({stickyBitStickyOffset: 20});
```

### Thanks

This plugin was heavily influenced by [Filament Group](https://www.filamentgroup.com/)'s awesome [Fixed-sticky](https://github.com/filamentgroup/fixed-sticky) jQuery plugin. Thanks to them for getting my mind going on this a while back. Thanks to [Peloton Cycle](https://github.com/pelotoncycle/)'s [Frame Throttle](https://github.com/pelotoncycle/frame-throttle) for an insightful solve for optimizing `frame throttling`. 
