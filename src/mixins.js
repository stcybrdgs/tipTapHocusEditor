/*
	generates a random integer within a range (min, max) 
	where the integer is inclusive of min and max
  - receives min, max int values
  - returns integer
*/
const getRandomIntInRange = (min, max) => {
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
const getRandomRgbColor = (min = 0, max = 255) => {
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
const convertRgbToHex = (r, g, b) => {
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

const getCursorFlagColor = () => {
  const rgb = getRandomRgbColor(50, 205)
  const hex = convertRgbToHex(rgb[0], rgb[1], rgb[2])
  return hex
}

const addMessageToChatPanel = (message, chatMessagesElem) => {
  if (message.length) {
    const newParagraph = document.createElement('p')

    const msgArr = message.split('\n')

    msgArr.forEach((line) => {
      if (line === '') {
        const newBreak = document.createElement('br')
        newParagraph.appendChild(newBreak)
      } else {
        const newSpan = document.createElement('span')
        newSpan.style.display = 'block'
        newSpan.textContent = line
        newParagraph.appendChild(newSpan)
      }
    })

    newParagraph.classList.add('chat-panel-msg')
    chatMessagesElem.appendChild(newParagraph)
    chatMessagesElem.scrollTop = chatMessagesElem.scrollHeight
  }
}

const clearChatInput = (chatInputElem) => {
  chatInputElem.textContent = ''
}

/*
  - receives the text from editor.getText()
  - removes the duplicate '\n' characters
  - returns the modified text
*/
const removeDoubleReturnsFromText = (text) => {
  if (text.length > 1) {
    let textArr = text.split('')
    let index = 1
    while (index < text.length) {
      const prevChar = textArr[index - 1]
      const currChar = textArr[index]
      if (prevChar === '\n' && currChar === '\n') {
        textArr[index] = ''
      }
      index++
    }
    text = textArr.join('')
  }
  return text
}

/*
  - receives from editor.getText()
  - passes text to removeDoubleReturnsFromText()
  - copies modified text to the clipboard
  - returns nothing to caller
*/
const addTextToClipboard = async (text) => {
  text = removeDoubleReturnsFromText(text)
  try {
    await navigator.clipboard.writeText(text)
    console.log('copied! ')
  } catch (error) {
    console.error(error.message)
  }
}

/*
  may use function to copy png images to clipboard;
  will need to change type
*/
//const addDataToClipboard = async(data) =>{
// const type = 'text/plain'
// const blob = new Blob([text], { type })
// const data = [new ClipboardItem({ [type]: blob })]
// await navigator.clipboard.write(data)
//}

const getParagraphInfoFromPastedText = (text) => {
  const emptyIndexes = []
  const textArr = text.split('\n')
  let index = 0
  while (index < textArr.length) {
    if (textArr[index] === '') {
      emptyIndexes.push(index)
    }
    index++
  }

  return {
    text,
    emptyIndexes,
    totalParagraphs: index,
    totalEmpty: emptyIndexes.length,
  }
}

const getMaxOfArray = (numArray) => {
  return Math.max.apply(null, numArray)
}

export {
  getCursorFlagColor,
  addMessageToChatPanel,
  clearChatInput,
  addTextToClipboard,
  getParagraphInfoFromPastedText,
  getSelectedText,
  // getParagraphInfoFromeditorPastedText,
  // getMaxOfArray,
}

