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
  //* Note: the onStateless hook is registered in index.js
})
provider.subscribeToBroadcastChannel()

export { provider }

