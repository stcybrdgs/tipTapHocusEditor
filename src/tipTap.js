import { Editor } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'
import Collaboration from '@tiptap/extension-collaboration'
import CollaborationCursor from '@tiptap/extension-collaboration-cursor'
import { provider } from './hocusClient.js'
import { getCursorFlagColor } from './mixins.js'

const editor = new Editor({
  element: document.querySelector('.editor'),
  extensions: [
    StarterKit.configure({
      history: false,
    }),
    Collaboration.configure({
      // provider.document is the actual Y.js doc
      // created by default when the provider is created
      document: provider.document,
      field: 'default',
    }),
    CollaborationCursor.configure({
      provider,
      user: { name: provider.name, color: getCursorFlagColor() },
    }),
  ],
  content: '',
})

const getEditorHtml = () => console.log(editor.getHTML())
const getEditorJson = () => console.log(editor.getJSON())
const getEditorText = () => console.log(editor.getText())

editor.on('create', ({ editor }) => {
  console.log('the editor is ready')
})

editor.on('update', ({ editor }) => {
  console.log('The content has changed.')
})

export { editor, getEditorHtml, getEditorJson, getEditorText }

