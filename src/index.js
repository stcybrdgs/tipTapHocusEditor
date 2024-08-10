import { provider } from './hocusClient.js'
import { getCursorFlagColor } from './mixins.js'
import { getEditorHtml, getEditorJson, getEditorText } from './tipTap'
import {
  updateNameField,
  getHtmlBtn,
  getJsonBtn,
  getTextBtn,
  outMsgBtn,
  msgBtn,
  chatPanelBtn,
  chatPanel,
  chatCloseBtn,
  chatSendBtn,
  chatInput,
} from './elements.js'

let chatPanelIsOpen = false
// const chatInputPlaceholder = "Type a message"

// Editor listeners
getHtmlBtn.addEventListener('click', () => getEditorHtml())
getJsonBtn.addEventListener('click', () => getEditorJson())
getTextBtn.addEventListener('click', () => getEditorText())

// Provider listeners
updateNameField.addEventListener('click', () => {
  provider.setAwarenessField('user', {
    name: document.querySelector('.name-field').value,
    color: getCursorFlagColor(),
  })
})

msgBtn.addEventListener('click', () => {
  const message = 'Incoming Message'
  const event = 'receive-message'
  provider.emit('message', { event, message })
})

outMsgBtn.addEventListener('click', () => {
  //const message = 'Outgoing Message'
  //const event = 'send-message'
  const statelessMsg = 'string from the browser'
  //const doc = provider.document
  console.log('outMsgButton -> provider: ', provider)
  provider.sendStateless(statelessMsg)
})

// Chat Panel listeners
chatPanelBtn.addEventListener('click', () => {
  if (chatPanelIsOpen) {
    chatPanel.classList.remove('open')
  } else {
    chatPanel.classList.add('open')
  }
  chatPanelIsOpen = !chatPanelIsOpen
})

chatCloseBtn.addEventListener('click', () => {
  chatPanel.classList.remove('open')
  chatPanelIsOpen = false
})

chatSendBtn.addEventListener('click', () => {
  const chatMsg = chatInput.textContent
  //console.log(chatMsg)
  provider.sendStateless(chatMsg)
})

