import { Editor } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Collaboration from '@tiptap/extension-collaboration'
import CollaborationCursor from '@tiptap/extension-collaboration-cursor'
import { provider } from './hocusClient.js'
import { getCursorFlagColor } from './mixins.js'
let editorPastedText = []

const editor = new Editor({
  element: document.querySelector('.editor'),
  extensions: [
    StarterKit.configure({
      codeBlock: false,
      blockquote: false,
      bulletList: false,
      hardBreak: false,
      heading: false,
      horizontalRule: false,
      listItem: false,
      orderedList: false,
      code: false,
      dropCursor: false,
      gapCursor: false,
      history: false,
    }),
    Placeholder.configure({
      placeholder: 'Describe your photo...',
    }),
    Collaboration.configure({
      // provider.document is the Y.js doc
      // created by default on provider create
      document: provider.document,
      field: 'default',
    }),
    CollaborationCursor.configure({
      provider,
      user: { name: provider.name, color: getCursorFlagColor() },
    }),
  ],
  parseOptions: { preserveWhitespace: 'full' },
  enablePasteRules: true,
  autofocus: false,
  editorProps: {
    transformPastedText(text, plain, view) {
      console.log('tranformPastedText()')
      editorPastedText = text.split('\n')
      console.log('\teditorPastedText: ', editorPastedText)
      return text
    },
  },
})

editor.on('create', ({ editor }) => console.log('the editor is ready'))
//editor.on('update', ({ editor }) => console.log('The content has changed.'))

export { editor }

