import { Editor } from '@tiptap/core'
//import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Collaboration from '@tiptap/extension-collaboration'
import CollaborationCursor from '@tiptap/extension-collaboration-cursor'
import { provider } from './hocusClient.js'
import { getCursorFlagColor, pasteTextIntoEditor } from './mixins.js'

const editor = new Editor({
  element: document.querySelector('.editor'),
  extensions: [
    // StarterKit.configure({
    //   history: false,
    // }),
    Document,
    Paragraph,
    Text,
    Placeholder.configure({
      placeholder: 'Describe your photo...',
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
  parseOptions: {
    preserveWhitespace: 'full',
  },
  editorProps: {
    // clipboardTextParser(text) {
    //   const textArr = text.split(/\n/)
    //   let htmlString = ''
    //   textArr.forEach((line) => {
    //     htmlString = htmlString.concat(`<p>${line}</p>`)
    //   })
    //   const parser = new DOMParser()
    //   return parser.parseFromString(htmlString, 'text/html')
    // },
  },
  content: `<p>Type some stuff...</p>`,
  autofocus: true,
})

editor.on('create', ({ editor }) => {
  console.log('the editor is ready')
})

editor.on('update', ({ editor }) => {
  console.log('The content has changed.')
})

export { editor }

