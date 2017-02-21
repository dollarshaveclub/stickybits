<p align="center">
  <img alt="StickyBits banner" src="https://cloud.githubusercontent.com/assets/1074042/22852626/b53c2918-eff4-11e6-8505-58bd36510649.jpg" />
</p>
<p align="center">Make things get sticky in a good way</p>
<hr />
<p align="center">
  <a href="https://travis-ci.org/dollarshaveclub/stickbits/">
    <img alt="Build Status" src="https://travis-ci.org/dollarshaveclub/stickybits.svg?branch=master" />
  </a>
  <a href="https://www.npmjs.com/package/stickybits">
    <img alt="npm version" src="https://badge.fury.io/js/stickybits.svg" />
  </a>
  <a href="https://github.com/dollarshaveclub/stickybits"> 
    <img alt="Bower version" src="https://badge.fury.io/bo/stickybits.svg" />
  </a>
  <a href="https://twitter.com/home?status=Stickybits%2C%20A%200%20dep%2C%201kb%20JS%20plugin.%20Make%20things%20get%20sticky%20in%20a%20good%20way!%20%F0%9F%8D%AC%20https%3A%2F%2Fgithub.com%2Fdollarshaveclub%2Fstickybits%40yowainwright">
    <img alt="Share on Twitter" src="https://img.shields.io/twitter/url/http/shields.io.svg?style=social&maxAge=2592000" />
  </a>
</p>
<hr />
<h1 align="center">StickyBits 🍬</h1>

> StickyBits is a JavaScript Plugin that ensures elements stick to the top or bottom of a browser's viewport as desired.

**Stickybits is awesome because:**
-  it loosely mimics [position: sticky](http://caniuse.com/#search=sticky) to consistently stick elements vertically across multiple platforms 
-  does not have the _jumpiness_ that plugins that are built around `position: fixed` have because it tries to support `position: fixed` first.
-  it is super simple & lightweight (2kb minified)
<hr />
  <p align="center">
    <a href="#install">Installation</a>
    <a href="#setup">Setup</a>
    <a href="#usage">Usage</a>
    <a href="#options">Options</a>
    <a href="#examples">Examples</a>
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
#### By default a selected stickybits element will:
-  stick elements to the top of the viewport when scrolled to vertically.
-  stick elements at the bottom of their parent when scrolled past.

#### CSS Class Usage
3 CSS classes will be added or removed by stickybits unrelated to the basic usage.
- `js-is-sticky` if the selected element is sticky.
- `js-is-stuck` if the selected element is stopped at the bottom of its parent.
= `js-stickybit-parent` so that styles can easily be added to the parent of a Stickbit

<h2 id="options">Options</h2>

#### Vertical Layout Position

By default, a StickyBit element will stick to the top of the viewport when vertically scrolled to.

To have a StickyBit not have the inline css property `top` style:

```javascript
stickybits('selector', {customVerticalPosition: true});
```

#### StickyBit Sticky Offset

By default, a StickyBit element will have a `0px` sticky layout offset. This means that if the element will sticky to the top of the viewport by default.

To have a stickyBit stick with a `20px` offset to its vertical layout position:

```javascript
stickybits('selector', {stickyBitStickyOffset: 20});
```

<h2 id="examples">Examples</h2>

-  [Basic Usage](http://codepen.io/yowainwright/pen/e68dcc768322fef0c72588576bbc1bfa)
-  [Basic usage but with multiple instances of the same selector](http://codepen.io/yowainwright/pen/8965fb5fd72300b38294b31963b27c68)
-  [Custom vertical top offset](http://codepen.io/yowainwright/pen/eeafd2ab68d468d3cd19a4361aff6aa6) ie: `stickybits('selector', {stickyBitStickyOffset: 20})`
-  [Custom vertical position](http://codepen.io/yowainwright/pen/e32cc7b82907ed9715a0a482ffa57596) ie: `stickybits('selector', {customVerticalPosition: true})`
-  [As a jQuery or Zepto Plugin](http://codepen.io/yowainwright/pen/57b852e88a644e9d919f843dc7b3b5f1) ie: $('selector').stickybits();
<hr />
Have another example or question? Feel free to [comment](https://github.com/dollarshaveclub/stickybits/issues). 🙌

<h2 id="notes">Notes</h2>

We strayed away from calling Stickybits a Shim or Polyfill for `position: sticky` because full support would require more code. This plugin simply makes elements vertically sticky very similarly to `position: sticky`. Read more about position sticky [here](https://developer.mozilla.org/en-US/docs/Web/CSS/position) or follow it's browser implementation [here](http://caniuse.com/#search=sticky).  

This plugin was heavily influenced by [Filament Group](https://www.filamentgroup.com/)'s awesome [Fixed-sticky](https://github.com/filamentgroup/fixed-sticky) jQuery plugin.
