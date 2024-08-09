import { provider } from './hocusClient.js'
import { getCursorFlagColor } from './mixins.js'

import { getEditorHtml, getEditorJson, getEditorText } from './tipTap'

// get button elements
const getHtmlBtn = document.querySelector('.get-html-btn')
const getJsonBtn = document.querySelector('.get-json-btn')
const getTextBtn = document.querySelector('.get-text-btn')
const updateNameField = document.querySelector('.update-name-field')
const msgBtn = document.querySelector('.msg-btn')
const outMsgBtn = document.querySelector('.out-msg-btn')

// add listeners for editor methods
getHtmlBtn.addEventListener('click', () => getEditorHtml())
getJsonBtn.addEventListener('click', () => getEditorJson())
getTextBtn.addEventListener('click', () => getEditorText())

// add listeners for provider methods
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
  const message = 'Outgoing Message'
  const event = 'send-message'
  const statelessMsg = 'string from the browser'
  const doc = provider.document
  console.log('outMsgButton -> provider: ', provider)
  provider.sendStateless(statelessMsg)
})

