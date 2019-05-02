import setupDb from './db';
import "reflect-metadata"; 
import {createExpressServer} from "routing-controllers";
import ScoreController from "./entity/score//ScoreController";
import GameStateController from "./entity/gamestate/GameStateController";
import UserController from './entity/user/UserController';

const app = createExpressServer({
    controllers: [
        ScoreController,
        GameStateController,
        UserController
     ] 
 });

const bodyparser = require('body-parser')
const server = require('http').Server(app)
const io = require('socket.io')(server);

const expressPort = process.env.EXPRESS_PORT || 4000
const databasePort = process.env.DATABASE_PORT || 5000

server.listen(expressPort);

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

        socket.on('ballMovement', (data) => {
            //console.log(data)

            socket.broadcast.emit('updateOtherBalls', data.balls);
        })

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