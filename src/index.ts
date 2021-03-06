import "reflect-metadata";
import { createExpressServer } from "routing-controllers";
import setupDb from './db'
import ScoreboardController from './entity/controller'
import * as request from "superagent";

const URL = 'http://balls-mp.herokuapp.com'
    //172.16.30.249 -- Albert
    //172.16.30.221 -- Ben

const app = createExpressServer({
    controllers: [
        ScoreboardController
    ]
 });
 
const bodyparser = require('body-parser');
const server = require('http').Server(app);
const io = require('socket.io')(server);

const expressPort = process.env.EX_PORT || 4000
const databasePort = process.env.DB_PORT || 5000

server.listen(expressPort, console.log('server running.'))


app.use(
    bodyparser.json()
)

const players = {}

const cookie = {
  x: Math.floor(Math.random() * 1925) + 50,
  y: Math.floor(Math.random() * 1425) + 50
};

io.on('connection', (socket) => {
        console.log(`User [${socket.id}] connected. `)

        players[socket.id] = {
            x: Math.floor(Math.random() * 1925) + 50,
            y: Math.floor(Math.random() * 1425) + 50,
            playerId: socket.id,
            score: 0,
            name: null
        }

        socket.emit('currentPlayers', players)
        socket.broadcast.emit('newPlayer', players[socket.id])
        socket.emit('spawnCookie', cookie)
        //console.log(players)

        socket.on('disconnect', () => {
            console.log(`User [${socket.id}] disconnected. `)
            delete players[socket.id]
            io.emit('disconnect', socket.id)
            io.emit('setPlayers', players)
        })

    socket.on('playerMovement', (movementData) => {
        players[socket.id].x = movementData.x;
        players[socket.id].y = movementData.y;

        socket.broadcast.emit('playerMoved', players[socket.id]);
    });

    socket.on('cookieCollected', function () {
        players[socket.id].score += 1

        request
            .put(`${URL}/scores/${socket.id}`)
            //.catch(i => console.log('request catch is angry at you.'))

        cookie.x = Math.floor(Math.random() * 1925) + 50;
        cookie.y = Math.floor(Math.random() * 1425) + 50;
        io.emit('spawnCookie', cookie);
        //not sure if we need this scoreupdate emit, but hey.
        io.emit('setPlayers', players);
        
        console.log(players)
    });

    socket.on('username', function (data) {
        players[socket.id].name = data.username
        io.emit('setPlayers', players)
        console.log(players)

        request
            .post(`${URL}/scores`)
            .set('Content-Type', 'application/json')
            .send({ name: data.username })
            .send({ socketId: socket.id })
            .send({ score: '0' })
            .catch(console.error)
    })
})

setupDb()
  .then(_ => {
    io.listen(databasePort)
    console.log(`Listening on port ${databasePort}`)
  })
  .catch(err => console.error(err))
