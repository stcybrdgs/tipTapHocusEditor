import { provider } from './hocusPocus.js'
import { getFlagColor } from './mixins.js'

import { getEditorHtml, getEditorJson, getEditorText } from './tipTap'

// get button elements
const getHtmlBtn = document.querySelector('.get-html-btn')
const getJsonBtn = document.querySelector('.get-json-btn')
const getTextBtn = document.querySelector('.get-text-btn')
const updateNameField = document.querySelector('.update-name-field')

// add listeners for editor methods
getHtmlBtn.addEventListener('click', () => getEditorHtml())
getJsonBtn.addEventListener('click', () => getEditorJson())
getTextBtn.addEventListener('click', () => getEditorText())

// add listeners for provider methods
updateNameField.addEventListener('click', () => {
  provider.setAwarenessField('user', {
    name: document.querySelector('.name-field').value,
    color: getFlagColor(),
  })
})

