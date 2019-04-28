const express = require('express')
const bodyparser = require('body-parser')
const socket = require('socket.io')

const port = process.env.PORT || 4000

const app = express()
const server = app.listen(4000, () => {
    console.log('Server ready and listening on port 4000.')
})
const io = socket(server)

app.use(
    bodyparser.json()
)

io.on('connection', (socket) => {
    console.log(`User [${socket.id}] connected. `)
})
