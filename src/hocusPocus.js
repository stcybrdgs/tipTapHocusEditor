// import { ref } from 'vue'
import {
  HocuspocusProvider,
  HocuspocusProviderWebsocket,
} from '@hocuspocus/provider'

// const PORT = process.env.PORT || 3500

const socket = new HocuspocusProviderWebsocket({
  url: 'ws://127.0.0.1:5500',
})

// const $states1 = ref({})
// const $states2 = ref({})

const provider = new HocuspocusProvider({
  websocketProvider: socket,
  name: 'hocuspocus-demo',
  broadcast: true,
  // onAwarenessUpdate: ({ states }) => {
  //   $states1.value = states
  // },
  onAwarenessUpdate: () => {
    console.log('update provider')
  },
})
provider.subscribeToBroadcastChannel()

// const anotherProvider = new HocuspocusProvider({
//   websocketProvider: socket,
//   name: 'hocuspocus-demo2',
//   broadcast: true,
//   // onAwarenessUpdate: ({ states }) => {
//   //   $states2.value = states
//   // },
//   onAwarenessUpdate: () => {
//     console.log('update anotherProvider')
//   },
// })
// anotherProvider.subscribeToBroadcastChannel()

// export { provider, anotherProvider }
export { provider }

