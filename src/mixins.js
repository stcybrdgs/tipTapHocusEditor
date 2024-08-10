/*
	generates a random integer within a range (min, max) 
	where the integer is inclusive of min and max
  - receives min, max int values
  - returns integer
*/
function getRandomIntInRange(min, max) {
  const minCeil = Math.ceil(min)
  const maxFloor = Math.floor(max + 1) // makes max inclusive
  return Math.floor(Math.random() * (maxFloor - minCeil) + minCeil)
}

/*
  generates a random rgb color
  - receives (min, max) or ()
  - returns int array [r, g, b]
  where 
  - each int is within a range (min, max) 
  - default min = 0
  - default max = 255
*/
function getRandomRgbColor(min = 0, max = 255) {
  const r = getRandomIntInRange(min, max)
  const g = getRandomIntInRange(min, max)
  const b = getRandomIntInRange(min, max)
  return [r, g, b]
}

/*
  converts an rgb color to a hex color
  - receives int array [r, g, b]
  - returns hex color as a string
  - if received int < 0 then set int = 0
  - if received int > 255 then set int = 255 
*/
function convertRgbToHex(r, g, b) {
  // correct out-of-range values
  r = r < 0 ? 0 : r > 255 ? 255 : r
  g = g < 0 ? 0 : g > 255 ? 255 : g
  b = b < 0 ? 0 : b > 255 ? 255 : b

  // convert from decimal to hexidecimal
  r = r.toString(16)
  g = g.toString(16)
  b = b.toString(16)

  // pre-pend 0s to single digits and under
  if (r.length == 1) r = '0' + r
  if (g.length == 1) g = '0' + g
  if (b.length == 1) b = '0' + b

  return '#' + r + g + b
}

/*
  returns hex color for new connection's collab cursor
  - generates hex value from random [r,g,b] within range (50, 205)
  - returns hex color as string
*/

function getCursorFlagColor() {
  const rgb = getRandomRgbColor(50, 205)
  const hex = convertRgbToHex(rgb[0], rgb[1], rgb[2])
  return hex
}

function addMessageToChatPanel(message, chatPanelElem) {
  let newDiv = document.createElement('div')
  newDiv.classList.add('chat-panel-msg')
  newDiv.textContent = message
  chatPanelElem.appendChild(newDiv)
}

export { getCursorFlagColor, addMessageToChatPanel }

