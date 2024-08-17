import { provider } from './hocusClient.js'
import { editor } from './tipTap'
import tippy from 'tippy.js'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/animations/scale.css'
import 'tippy.js/themes/material.css'
import {
  getCursorFlagColor,
  addMessageToChatPanel,
  clearChatInput,
  addTextToClipboard,
} from './mixins.js'
import {
  updateNameField,
  getHtmlBtn,
  getJsonBtn,
  getTextBtn,
  outMsgBtn,
  msgBtn,
  clearContentBtn,
  chatToggleBtn,
  chatPanel,
  chatCloseBtn,
  chatMessages,
  chatSendBtn,
  chatInput,
  editorCopyBtn,
  splideList,
} from './elements.js'

let chatPanelIsOpen = false

//* Tippy Tooltips
tippy.setDefaultProps({ delay: 50 })

tippy('.editor-copy-btn', {
  content: 'Copy All Text',
  placement: 'top-start',
  animation: 'scale-subtle',
  theme: 'blueberry',
  hideOnClick: true,
  duration: [100, 50],
})

//* Provider Hooks
// use stateless messages for chat panel
provider.on('stateless', (data) => {
  data = JSON.parse(data.payload)
  const { message, socketId } = data
  addMessageToChatPanel(message, chatMessages)
  clearChatInput(chatInput)
})

//* Editor Listeners
getHtmlBtn.addEventListener('click', () => console.log(editor.getHTML()))
getJsonBtn.addEventListener('click', () => console.log(editor.getJSON()))
getTextBtn.addEventListener('click', () => console.log(editor.getText()))
clearContentBtn.addEventListener('click', () => editor.commands.clearContent())

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
chatToggleBtn.addEventListener('click', () => {
  if (chatPanelIsOpen) {
    chatPanel.classList.remove('chat-is-open')
  } else {
    chatPanel.classList.add('chat-is-open')
  }
  chatPanelIsOpen = !chatPanelIsOpen
})

chatCloseBtn.addEventListener('click', () => {
  chatPanel.classList.remove('chat-is-open')
  chatPanelIsOpen = false
})

chatSendBtn.addEventListener('click', () => {
  const chatMsg = chatInput.innerText.trim()
  provider.sendStateless(chatMsg)
})

//* Editor Actions Listeners
editorCopyBtn.addEventListener('click', () => {
  let copyText = editor.getText()
  addTextToClipboard(copyText)
  //* TODO: add a toast message
})

//* Splide Carousel
function getPhotoFileNames() {
  return ['burger_1.jpg', 'burger_2.jpg', 'grocery_5.png']
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

