import { provider } from './hocusClient.js'
import {
  getCursorFlagColor,
  addMessageToChatPanel,
  clearChatInput,
} from './mixins.js'
import { getEditorHtml, getEditorJson, getEditorText } from './tipTap'
import {
  updateNameField,
  getHtmlBtn,
  getJsonBtn,
  getTextBtn,
  outMsgBtn,
  msgBtn,
  chatPanelBtn,
  chatToggleBtn,
  chatPanel,
  chatCloseBtn,
  chatMessages,
  chatSendBtn,
  chatInput,
  splideList,
} from './elements.js'

let chatPanelIsOpen = false
// const chatInputPlaceholder = "Type a message"

//* Provider Hooks
// use stateless messages for chat panel
provider.on('stateless', (data) => {
  data = JSON.parse(data.payload)
  const { message, socketId } = data

  console.log(`
    provider onStateless()\n
    \t message: ${message} \n
    \t socketId: ${socketId}\n
    `)

  addMessageToChatPanel(message, chatMessages)
  clearChatInput(chatInput)
})

//* Editor Listeners
getHtmlBtn.addEventListener('click', () => getEditorHtml())
getJsonBtn.addEventListener('click', () => getEditorJson())
getTextBtn.addEventListener('click', () => getEditorText())

//* Provider Listeners
// update name and asign cursor color when user logs in
updateNameField.addEventListener('click', () => {
  provider.setAwarenessField('user', {
    name: document.querySelector('.name-field').value,
    color: getCursorFlagColor(),
  })
})

// emit incoming message to provider
msgBtn.addEventListener('click', () => {
  const message = 'Incoming Message'
  const event = 'receive-message'
  provider.emit('message', { event, message })
})

outMsgBtn.addEventListener('click', () => {
  const statelessMsg = 'string from the browser'
  provider.sendStateless(statelessMsg)
})

//* Chat Panel Listeners
// chatPanelBtn.addEventListener('click', () => {
//   if (chatPanelIsOpen) {
//     chatPanel.classList.remove('open')
//     chatToggleBtn.classList.remove('hide')
//   } else {
//     chatPanel.classList.add('open')
//     chatToggleBtn.classList.add('hide')
//   }
//   chatPanelIsOpen = !chatPanelIsOpen
// })

chatToggleBtn.addEventListener('click', () => {
  if (chatPanelIsOpen) {
    chatPanel.classList.remove('open')
    chatToggleBtn.classList.remove('hide')
  } else {
    chatPanel.classList.add('open')
    chatToggleBtn.classList.add('hide')
  }
  chatPanelIsOpen = !chatPanelIsOpen
})

chatCloseBtn.addEventListener('click', () => {
  chatPanel.classList.remove('open')
  chatToggleBtn.classList.remove('hide')
  chatPanelIsOpen = false
})

chatSendBtn.addEventListener('click', () => {
  const chatMsg = chatInput.textContent
  //console.log(chatMsg)
  provider.sendStateless(chatMsg)
})

//* Splide Carousel
function getPhotoFileNames() {
  return ['burger_1.jpg', 'burger_2.jpg']
}

function createSplideCarousel() {
  const photoFileNames = getPhotoFileNames()
  const basePath = './public/images/'

  photoFileNames.forEach((fileName) => {
    const filePath = basePath.concat(fileName)
    const listItem = document.createElement('li')
    const image = document.createElement('img')
    listItem.setAttribute('class', 'splide__slide')
    image.setAttribute('src', filePath)
    listItem.appendChild(image)
    splideList.appendChild(listItem)
  })
}

createSplideCarousel()

