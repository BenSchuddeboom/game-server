const express = require('express')
const bodyparser = require('body-parser')
const socket = require('socket.io')

const port = process.env.PORT || 4000

const app = express()
const server = app.listen(port, () => {
    console.log('Server ready and listening on port ' + port)
})
const io = socket(server)

app.use(
    bodyparser.json()
)

const players = {}

io.on('connection', (socket) => {
    console.log(`User [${socket.id}] connected. `)

    socket.on('disconnect', () => {
        console.log(`User [${socket.id}] disconnected. `)
        delete players[socket.id]
        io.emit('disconnect', socket.id)
    })

    players[socket.id] = {
        rotation: 0,
        x: Math.floor(Math.random() * 700) + 50,
        y: Math.floor(Math.random() * 500) + 50,
        playerId: socket.id
    }

    socket.emit('currentPlayers', players)
    socket.broadcast.emit('newPlayer', players[socket.id])
    console.log(players[socket.id])
})
