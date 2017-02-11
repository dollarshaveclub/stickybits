# StickyBits 🍬

> StickyBits is a JavaScript Plugin that ensures elements stick to the top or bottom of a browser's viewport as desired.

**Stickybits is awesome because:**
-  it loosely mimics [position: sticky](http://caniuse.com/#search=sticky) to consistently stick elements vertically across multiple platforms 
-  does not have the _jumpiness_ that plugins that are built around `position: fixed` have 
-  it is super simple so it is very lightweight (1kb minified)
-  it is **not** a `position: sticky` polyfill

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
#### By default a selected stickybits element will:
-  stick to the top of the viewport when scrolled to vertically.
-  stick at bottom of it's parent when scrolled past the bottom of its parent.

## CSS Class Usage

3 CSS classes will be added or removed by stickybits unrelated to the basic usage.
- `js-sticky-support` is added if `position: sticky` is supported
- `js-is-sticky` if the selected element is sticky.
- `js-is-stuck` if the selected element is stopped at the bottom of its parent.

## Options

#### Vertical Layout Position

By default, a StickyBit element will stick to the top of the viewport.

To have a StickYBit stick to the bottom of the viewport:

```javascript
stickybits('selector', verticalLayoutPosition: 'bottom');
```

#### StickyBit Sticky Offset

By default, a StickyBit Element will have a `0` sticky layout offest. This means that if the element will sticky to the top of the viewport by default.

To have a stickyBit stick with a `20px` offset to its vertical layout position:

```javascript
stickybits('selector', stickyBitStickyOffset: '20');
```

#### Making a StickyBit use `position: fixed` only

By default, a StickyBit will use `position: sticky` if supported. 

To have a StickyBit used `position: fixed` only:

```javascript
stickybits('selector', fixedOnly: true);
```

#### Making a StickyBit work similarly to `position: fixed`

`position: sticky` does not work exactly like `position: fixed`. You can ready more [here](https://developer.mozilla.org/en-US/docs/Web/CSS/position). 

To make a StickyBit work *_more similarily_ to `position: fixed`:

```javascript
stickybits('selector', fixedSticky: true);
```
*\**More similarily:** Element's that are set to `position: sticky` will be relatively contained by their parent.


## Examples

TODO

## Notes

TODO
