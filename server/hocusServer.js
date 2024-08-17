import { Hocuspocus } from '@hocuspocus/server'
import { TiptapTransformer } from '@hocuspocus/transformer'
// import * as fs from 'fs'
// import path from 'path'
// import { fileURLToPath } from 'url'

// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)

function saveDocToLocalFile(json) {
  // TODO: FIX ISSUE - NODEMON RESTARTS on save either .json or .txt
  //
  //const saveDir = path.join(__dirname, './json')
  // const fileName = './ydocs/test.txt'
  // fs.writeFile(fileName, JSON.stringify(json), (err) => {
  //   if (err) throw err
  //   console.log('file written')
  // })
}

const PORT = process.env.PORT || 5500

let currentStates

const server = new Hocuspocus({
  port: PORT,
  name: 'todd-1',
})

function xFormYDocToJson(data) {
  return TiptapTransformer.fromYdoc(data.document)
}

function xFormJsonToYDoc(json) {
  return TiptapTransformer.toYdoc(
    json,
    'default', // editor field in tiptap
    [StarterKit] // editor extensions
  )
}

function getDocParagraphs(doc) {
  const docContent = doc.default.content
  const docParagraphs = []
  let pText = ''
  let count = 0
  docContent.forEach((p) => {
    if (p.hasOwnProperty('content') && p.content[0]?.text) {
      pText = p.content[0].text
      docParagraphs[count] = pText
    }
    count++
  })
  return docParagraphs
}

const socketIds = []

server.configure({
  // called when the server is initialized
  async onListen(data) {
    console.log(`SERVER onListen() PORT:${data.port}`)
  },

  // called when a connection is extablished
  async onConnect(data) {
    console.log('SERVER onConnect()', data.socketId)
    socketIds.push(data.socketId)
  },

  // called when a connection has been closed
  async onDisconnect(data) {
    console.log('SERVER onDisconnect()')
  },

  // called to fetch data from storage
  async onLoadDocument(data) {
    console.log('SERVER onLoadDocument()', data.documentName)
  },

  // called after onLoadDocument succeeds
  async afterLoadDocument(data) {
    console.log('SERVER afterLoadDocument()', data.documentName)
  },

  // called whenever editor changes
  async onChange(data) {
    console.log('SERVER onChange()')
    const doc = xFormYDocToJson(data)
    const docParagraphs = getDocParagraphs(doc)
    console.log('\t', docParagraphs)
  },

  // called after document has been changed (after onChange hook)
  async onStoreDocument(data) {
    console.log('SERVER onStorageDocument()')
    const json = xFormYDocToJson(data)
    saveDocToLocalFile(json)
    const docParagraphs = getDocParagraphs(json)
    docParagraphs.forEach((p) => {
      console.log(`\t p: ${p} | pType: ${typeof p}`)
    })
    console.log('\t paragraphs: ', docParagraphs)
    console.log('# paragraphs: ', docParagraphs.length)
  },

  // called when awareness changes in provider awareness api
  onAwarenessUpdate: ({ states }) => {
    currentStates = states
    console.log('SERVER onAwarenessUpdate(): ', currentStates)
    currentStates.forEach((state) => {
      if (state.hasOwnProperty('cursor')) {
        // const anchor = JSON.stringify(state.cursor.anchor)
        // const head = JSON.stringify(state.cursor.head)
        // console.log(`\tanchor: ${anchor}\n\thead: ${head}`)
      }
    })
  },

  // when an HTTP request comes in
  onRequest: (data) => {
    console.log('SERVER onRequest()', data.request)
  },

  // called before handling a message
  beforeHandleMessage(data) {
    console.log('SERVER beforeHandleMessage(): ', data.documentName)
  },

  // called before the server broadcasts a stateless message
  beforeBroadcastStateless({ payload }) {
    console.log(`SERVER beforeBroadcastStateless(): "${payload}"!`)
  },

  // called after receiving a stateless message
  async onStateless(chatMsg) {
    const myPayload = {
      message: chatMsg.payload,
      socketId: chatMsg.connection.socketId,
    }

    chatMsg.document.broadcastStateless(JSON.stringify(myPayload))
  },
})

server.listen()

