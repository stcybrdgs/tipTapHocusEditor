import {
  HocuspocusProvider,
  HocuspocusProviderWebsocket,
} from '@hocuspocus/provider'

const socket = new HocuspocusProviderWebsocket({
  url: 'ws://127.0.0.1:5500',
})

const provider = new HocuspocusProvider({
  websocketProvider: socket,
  name: 'todd-editor',
  broadcast: true,
  onConnect: () => {
    console.log('provider onConnect() !')
  },
  onAwarenessUpdate: ({ states }) => {
    console.log('provider onAwarenessUpdate()', states)
  },
  onMessage: (data) => {
    console.log(data)
  },
  onOutgoingMessage: ({ event, message }) => {
    console.log(`provider onOutgoingMessage(): \n\t ${event} | ${message}`)
  },
  // use stateless messages for chat panel
  onStateless: (data) => {
    data = JSON.parse(data.payload)
    const { message, socketId } = data

    console.log(`
      provider onStateless()\n
      \t message: ${message} \n
      \t socketId: ${socketId}\n
      `)
  },
})
provider.subscribeToBroadcastChannel()

export { provider }

