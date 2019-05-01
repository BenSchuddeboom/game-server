import setupDb from './db'

const express = require('express')
const bodyparser = require('body-parser')
const socket = require('socket.io')

const expressPort = process.env.EXPRESS_PORT || 4000
// temp different port for Db
const databasePort = process.env.DATABASE_PORT || 5000

const app = express()

const server = app.listen(expressPort, () => {
    console.log('Server ready and listening on port ' + expressPort)
})

const io = socket(server)

app.use(
    bodyparser.json()
)

const players = {}

io.on('connection', (socket) => {
        console.log(`User [${socket.id}] connected. `)

        players[socket.id] = {
            x: Math.floor(Math.random() * 700) + 50,
            y: Math.floor(Math.random() * 500) + 50,
            playerId: socket.id
        }

        socket.emit('currentPlayers', players)
        socket.broadcast.emit('newPlayer', players[socket.id])
        console.log(players)

        socket.on('disconnect', () => {
            console.log(`User [${socket.id}] disconnected. `)
            delete players[socket.id]
            io.emit('disconnect', socket.id)
        })

    socket.on('playerMovement', (movementData) => {
        players[socket.id].x = movementData.x;
        players[socket.id].y = movementData.y;

        socket.broadcast.emit('playerMoved', players[socket.id]);
    });
})

setupDb()
    .then(_ =>
        app.listen(databasePort, () => console.log(`listenening on port: ${databasePort}`)))
    .catch(error => console.log('index.ts ', error))