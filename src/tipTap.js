// import { ref } from 'vue'
// import { Editor, EditorContent } from '@tiptap/vue-3'
import { Editor } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'
import Collaboration from '@tiptap/extension-collaboration'
// import { provider, anotherProvider } from './hocusPocus.js'
import { provider } from './hocusPocus.js'

const editor = new Editor({
  element: document.querySelector('.editor'),
  extensions: [
    StarterKit.configure({
      history: false,
    }),
    Collaboration.configure({
      document: provider.document,
      field: 'default',
    }),
  ],
  //   content: `
  //     <p>test</p>
  //     <p>他是我的中文老师.</p>
  //     <p>test</p>
  //     <p>你是我的朋友.</p>
  //   `,
})

// export { editor, anotherEditor }
// export { editor }
const getEditorHtml = () => console.log(editor.getHTML())
const getEditorJson = () => console.log(editor.getJSON())
const getEditorText = () => console.log(editor.getText())

editor.on('create', ({ editor }) => {
  console.log('the editor is ready')
  //   console.log('editor content:', editor.content)
})

editor.on('update', ({ editor }) => {
  console.log('The content has changed.')
})

export { editor, getEditorHtml, getEditorJson, getEditorText }

