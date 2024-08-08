import { Hocuspocus } from '@hocuspocus/server'

const PORT = process.env.PORT || 5500

// Configure the server …
const server = new Hocuspocus({
  port: PORT,
})

// … and run it!
server.listen()

console.log(`Server is listening to PORT ${PORT}`)

