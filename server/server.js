import { Hocuspocus } from '@hocuspocus/server'

const PORT = process.env.PORT || 5500

const server = new Hocuspocus({
  port: PORT,
})

server.listen()

console.log(`Server is listening to PORT ${PORT}`)

