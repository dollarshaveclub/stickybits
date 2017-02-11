<figure align="center">
  <img alt="StickyBits banner" src="https://cloud.githubusercontent.com/assets/1074042/22852626/b53c2918-eff4-11e6-8505-58bd36510649.jpg" />
  <figcaption>Make things get sticky in a good way</figcaption>
</figure>
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
-  does not have the _jumpiness_ that plugins that are built around `position: fixed` have 
-  it is super simple so it is very lightweight (1kb minified)
-  it is **not** a `position: sticky` polyfill

## Installing from a package manager

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

## Setup

Add **dist/stickybits.min.js**.

## Basic Usage

```javascript
stickybits('selector');
```
#### By default a selected stickybits element will:
-  stick to the top of the viewport when scrolled to vertically.
-  stick at bottom of it's parent when scrolled past the bottom of its parent.

## CSS Class Usage

2 CSS classes will be added or removed by stickybits unrelated to the basic usage.
- `js-is-sticky` if the selected element is sticky.
- `js-is-stuck` if the selected element is stopped at the bottom of its parent.

## Options

#### Vertical Layout Position

By default, a StickyBit element will stick to the top of the viewport when vertically scrolled to.

To have a StickyBit not have the inline css property `top` style:

```javascript
stickybits('selector', customVerticalPosition: true);
```

#### StickyBit Sticky Offset

By default, a StickyBit Element will have a `0px` sticky layout offest. This means that if the element will sticky to the top of the viewport by default.

To have a stickyBit stick with a `20px` offset to its vertical layout position:

```javascript
stickybits('selector', stickyBitStickyOffset: '20');
```

#### Making a StickyBit use `position: fixed` only

By default, a StickyBit will use `position: sticky` if supported. 

To have a StickyBit use `position: fixed` only:

```javascript
stickybits('selector', fixedOnly: true);
```

#### Making a StickyBit work similarly to `position: fixed`

`position: sticky` does not work exactly like `position: fixed`. Read more [here](https://developer.mozilla.org/en-US/docs/Web/CSS/position). 

To make a StickyBit work *_more similarily_ to `position: fixed`:

```javascript
stickybits('selector', fixedSticky: true);
```
*\**More similarily:** Element's that are set to `position: sticky` will be relatively contained by their parent.


## Examples

TODO

## Notes

TODO
