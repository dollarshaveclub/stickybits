const stickybits = require('../../src/stickybits.js')

test('Jest is working', () => expect(1).toBe(1))

test('Jest paths are pointed correctly, dom is ready to go', () => {
  // Set up our document body
  document.body.innerHTML = '<div id="stickybit"></div>'
  const div = document.getElementById('stickybit')
  const stickybit = stickybits
  // test the element
  expect(div.id).toBe('stickybit')
  expect(typeof stickybits).toBe('object')
})
