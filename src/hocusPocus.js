import {
  HocuspocusProvider,
  HocuspocusProviderWebsocket,
} from '@hocuspocus/provider'

const socket = new HocuspocusProviderWebsocket({
  url: 'ws://127.0.0.1:5500',
})

const provider = new HocuspocusProvider({
  websocketProvider: socket,
  name: 'hocuspocus-demo',
  broadcast: true,
  onAwarenessUpdate: ({ states }) => {
    console.log('update provider', states)
  },
})
provider.subscribeToBroadcastChannel()

export { provider }

