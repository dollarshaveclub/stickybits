# StickyBits 🍬

StickyBits is a JavaScript Plugin ensuring sticky elements stick as desired within a browser html document when scrolling vertically. 

**Stickybits is awesome because:**
-  it loosely mimics [position: sticky](https://www.sitepoint.com/css-position-sticky-introduction-polyfills/) to consistently stick elements across multiple platforms 
-  does not jump in certain browsers because it will use `sticky` then `fixed` position as supported 
-  is super simple so it is very lightweight (1kb minified).
-  is **not** a `position: sticky` polyfill which allows it to work more simply but do the sticky stuff you want

## Installing from a package manager

npm
```sh
npm install stickybits --save
```
bower
```sh
bower install stickybits --save
```
yarn
```sh
yarn add stickybits
```

## Setup

Add **dist/stickybits.min.js**.

## Basic Usage

```javascript
stickybits('selector');
```
**By default a stickybits element will:**
-  become sticky when scrolled to vertically.
-  become stuck to the bottom of it's parent when scrolled to the bottom of its parent;

## Developers Choice

3 CSS classes will be added or removed by stickybits unrelated to the basic usage.
- `js-sticky-support` if `position: sticky` is supported
- `js-is-sticky` if a `fixed` element is sticky.
- `js-is-stuck` if a `fixed` element is stucky at the bottom of it's parent.

## Options

TODO

## Examples

TODO

## Notes

TODO
