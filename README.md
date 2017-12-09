<p align="center">
  <img alt="StickyBits banner" src="https://yowainwright.imgix.net/gh/stickybits.svg" width="400" />
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
  <a href="https://codecov.io/gh/dollarshaveclub/stickybits">
    <img alt="codecov" src="https://codecov.io/gh/dollarshaveclub/face-assets/branch/master/graph/badge.svg?token=94k54HtPDh" />
  </a>
  <a href="https://twitter.com/home?status=Stickybits%2C%20A%200%20dep%2C%201kb%20JS%20plugin.%20Make%20things%20get%20sticky%20in%20a%20good%20way!%20%F0%9F%8D%AC%20https%3A%2F%2Fgithub.com%2Fdollarshaveclub%2Fstickybits%40yowainwright">
    <img alt="Share on Twitter" src="https://img.shields.io/twitter/url/http/shields.io.svg?style=social&maxAge=2592000" />
  </a>
</p>
<hr />
<h1 align="center">StickyBits 🍬</h1>

> Stickybits is a lightweight alternative to `position: sticky` polyfills. It works perfectly for things like sticky headers. 

**Stickybits is awesome because:**
-  it can add a CSS Sticky Class (`.js-is-sticky`) when [position: sticky](http://caniuse.com/#search=sticky) elements become active and a CSS Stuck Class (`.js-is-stuck`) when they become stuck. See [useStickyClasses](#feature).
-  it loosely mimics [position: sticky](http://caniuse.com/#search=sticky) to consistently stick elements vertically across multiple platforms 
-  it does not have the _jumpiness_ that plugins that are built around `position: fixed` have because it tries to support `position: sticky` first.
-  in its simplest use case, a `scroll` event listener will not be used if `position: sticky` is supported.
-  it is super simple & lightweight
-  it provides a [wiki](https://github.com/dollarshaveclub/stickybits/wiki) that digs deeply into fundementals of `position: sticky` and `position: fixed` and it works with them. 

<hr />
  <p align="center">
    <a href="#install">Installation</a>&nbsp;&nbsp;
    <a href="#setup">Setup</a>&nbsp;&nbsp;
    <a href="#usage">Usage</a>&nbsp;&nbsp;
    <a href="#feature">Feature</a>&nbsp;&nbsp;
    <a href="#options">Options</a>&nbsp;&nbsp;
    <a href="#examples">Examples</a>&nbsp;&nbsp;
    <a href="#debugging">Debugging</a>&nbsp;&nbsp;
    <a href="#notes">Notes</a>&nbsp;&nbsp;
    <a href="#contributing">Contributing</a>&nbsp;&nbsp;
    <a href="https://github.com/dollarshaveclub/stickybits/wiki">Wiki</a>
  </p>
<hr />

<h2 id="install">Installing from a package manager</h2>

yarn
```sh
yarn add stickybits 
```
npm
```sh
npm i stickybits
```
bower
```sh
bower i stickybits --save
```

<h2 id="setup">Setup</h2>

Add **dist/stickybits.min.js**

Or as a module with `import stickybits from 'stickybits'`

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
.some-sticky-element.js-is-sticky {
  background-color: red;
}
.some-sticky-element.js-is-stuck {
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

### Custom Scroll Element

By default, if Stickybits uses a scroll event (if `position: sticky` is not supported or if we use the option `useStickyClasses`) it uses `window`.

To have Stickybit use an selector besides `window`:

```javascript
const scrollEl = document.getElementById('an-id');
stickybits('selector', {scrollEl: scrollEl});
```
\* **Note:** This selector is not selected automatically so the specific element need to be passed in.

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
```

### StickyBits NoStyles

To use StickyBits without inline styles except for `position: sticky` or `position: fixed`:

```javascript
stickbits('selector', {noStyles: true});
```

### StickyBits Custom CSS Classes

To use custom CSS classes for Stickybits, add the appropriate properties and values.

parentClass:

```javascript
stickbits('selector', {parentClass: 'new-parent-classname'});
```

stickyClass:

```javascript
stickbits('selector', {stickyClass: 'new-sticky-classname'});
```

stuckClass:

```javascript
stickbits('selector', {stuckClass: 'new-stuck-classname'});
```


To change all of the CSS classes
```javascript
stickbits('selector', {
  parentClass: 'new-parent-classname',
  stickyClass: 'new-sticky-classname',
  stuckClass: 'new-stuck-classname'
});
```

\* For jQuery and Zepto support, read the jQuery notes [below](#jquery).

<h2 id="examples">Examples</h2>

-  [Basic Usage](https://codepen.io/yowainwright/pen/QdedaO)
-  [Basic usage but with multiple instances of the same selector](https://codepen.io/yowainwright/pen/VPogaX)
-  [Custom vertical top offset](https://codepen.io/yowainwright/pen/YQZPqR) ie: `stickybits('selector', {stickyBitStickyOffset: 20})`
-  [UseStickyClasses](http://codepen.io/yowainwright/pen/NpzPGR) ie: `stickybits('selector', {useStickyClasses: true})`
-  [Clean Stickybits](https://codepen.io/yowainwright/pen/gRgdep) ie: `const stickything = stickybits('selector'); stickything.cleanup();`
-  [As a jQuery or Zepto Plugin](http://codepen.io/yowainwright/pen/57b852e88a644e9d919f843dc7b3b5f1) ie: `$('selector').stickybits();`

----

### Examples extended

-  [Custom vertical position (at bottom of parent element)](http://codepen.io/yowainwright/pen/e32cc7b82907ed9715a0a482ffa57596)
-  [NoStyles Stickybits](https://codepen.io/yowainwright/pen/YrQpQj) ie: `stickybits('selector', {noStyles: true});`
-  [With Custom Classes](https://codepen.io/yowainwright/pen/rGwWyW/) ie: `stickybits('selector', {parentClass: 'js-parent-test'})`
-  [ScrollEl](https://codepen.io/yowainwright/pen/EXzJeb) ie: `stickybits('selector', {scrollEl: document.querySelectorAll('a-custom-scroll-el')})`
-  If you have Stickybits examples, please submit an [issue](https://github.com/dollarshaveclub/stickybits/issues) with a link to it. 🙏

-----

Have another example or question? Feel free to [comment](https://github.com/dollarshaveclub/stickybits/issues). 🙌

<h2 id="notes">Notes</h2>

### CSS Class Usage

3 CSS classes will be added and removed by Stickybits if `position: sticky` is not supported or if the `useStickyClasses: true` option is added to the plugin call. These Classes can be modified as desired. See the _With Custom Classes_ example above.

-  `js-is-sticky` if the selected element is sticky.
-  `js-is-stuck` if the selected element is stopped at the bottom of its parent.
-  `js-stickybit-parent` so that styles can easily be added to the parent of a Stickybits element

### Not a Polyfill

Stickybits is not a Shim or Polyfill for `position: sticky` because full support would require more code. This plugin makes elements vertically sticky very similarly to `position: fixed` but in a `sticky` sort of way. Read more about position sticky [here](https://developer.mozilla.org/en-US/docs/Web/CSS/position) or follow its browser implementation [here](http://caniuse.com/#search=sticky).  

Stickybits is a no dependency JavaScript plugin. It provides the smallest API possible in both features and kb size to deliver working sticky elements. This means that opinionated featuring is left out as much as possible and that it works with minimal effort in Frameworks. 

### CSS when `position: sticky` is not supported

**Sticky Start and Sticky Stop:** Because Stickybits is minimal, when `position: sticky` is not supported Stickybits will use `position: fixed` which is relative to the browser window. If the StickyBits parent element has a height recognized by the browser, Stickybits will take care of the sticky top and sticky bottom invocation. If the parent's height is not recognized by the browser there will be issues. 

**Left and Right Positioning:** With `position: fixed` the Stickybit element will work relative to the browser window by default. To work with this issue, there are several options. Some are noted [here](https://github.com/dollarshaveclub/stickybits/issues/66). More solutions to come!

<h3 id="jquery">jQuery and Zepto Usage</h3>

Basic 

```javascript
$('selector').stickybits();
```

With `scrollEl`

```javascript
const $scrollEl = $('#scrollEl')[0];
$('selector').stickybits({scrollEl: scrollEl});
```
\* **Note:** because StickyBits is _not_ jQuery specific, in order to pass in a selector for `scrollEl`, add a `[0]` to the the selector. 

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

## Debugging

Stickybits 2.0 provides the same API but with more debugging feedback.

To view the Stickybits API in it's simpliest form:
```javascript
var stickybit = stickybits('a selection')
console.log(stickbit)
```

For more debugging and managing Stickbits, view the [wiki](https://github.com/dollarshaveclub/stickybits/wiki).

---

### Utility properties

Stickybits provides both `version` and `userAgent` properties which were added to offer insight into the browser and Stickybits.

These utility properties can be accessed as direct child properties of the instantiated Stickybits item.

```javascript
var stickybit = stickybits('a selection')
stickybit.version // will show the version of stickybits being used
stickybit.userAgent // will show which userAgent stickybits is detecting
```

## Browser Compatibility

Stickybits works in all modern browsers including Internet Explorer 9 and above. Please file and [issue](https://github.com/dollarshaveclub/stickybits/issues) with browser compatibility quirks. 

## Contributing

Please contribute to Stickybits by filing an [issue](https://github.com/dollarshaveclub/stickybits/issues), responding to [issues](https://github.com/dollarshaveclub/stickybits/issues), adding to the [wiki](https://github.com/dollarshaveclub/stickybits/wiki), or reaching out socially—etc. 

Stickybits is a utility. It may often not be needed! With shared understanding of `position: sticky` and `position: fixed` along with product awareness, Stickybits can improve as can a shared understanding of the "sticky element issue". Is this paragraph over-reaching? Yes! Help improve it. 

## Thanks

This plugin was heavily influenced by [Filament Group](https://www.filamentgroup.com/)'s awesome [Fixed-sticky](https://github.com/filamentgroup/fixed-sticky) jQuery plugin. Thanks to them for getting my mind going on this a while back. Thanks to [Peloton Cycle](https://github.com/pelotoncycle/)'s [Frame Throttle](https://github.com/pelotoncycle/frame-throttle) for an insightful solve for optimizing `frame throttling`. 

**Contributions:** Much browser and documentation debugging has be done by [K. Vanberendonck](https://github.com/donkeybonks). Architecture discussions and Pull Request help has been provided by [Jacob Kelley](https://github.com/jakiestfu), [Brian Gonzalez](https://github.com/briangonzalez/), and [Matt Young](https://github.com/someguynamedmatt). It is much appreciated! 

----

[Created](https://github.com/yowainwright/sticky-bits) and maintained by [Jeff Wainwright](https://github.com/yowainwright) with [Dollar Shave Club Engineering](https://github.com/dollarshaveclub).

