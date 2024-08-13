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
  autofocus: true,
  content: '<p>Type some stuff...</p>',
})

editor.on('create', ({ editor }) => {
  console.log('the editor is ready')
})

editor.on('update', ({ editor }) => {
  console.log('The content has changed.')
})

export { editor }
