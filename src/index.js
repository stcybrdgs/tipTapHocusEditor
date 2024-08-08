// import { editor } from './tipTap.js'
// import { provider, anotherProvider } from './hocusPocus.js'

import { editor, getEditorHtml, getEditorJson, getEditorText } from './tipTap'

// get button elements
const getHtmlBtn = document.querySelector('.get-html-btn')
const getJsonBtn = document.querySelector('.get-json-btn')
const getTextBtn = document.querySelector('.get-text-btn')

// add listeners mapped to editor methods in tip-tap api
getHtmlBtn.addEventListener('click', () => getEditorHtml())
getJsonBtn.addEventListener('click', () => getEditorJson())
getTextBtn.addEventListener('click', () => getEditorText())

