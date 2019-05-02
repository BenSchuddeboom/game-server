import { JsonController, Get, Param, Post, HttpCode, Body, Put } from 'routing-controllers'
import {getConnection} from "typeorm";
import User from './user';
import GameState from '../gamestate/gamestate';
import Score from '../score/score';

@JsonController()
export default class UserController {

    //this works
    @Get('/user/:id')
    getUser(
        @Param('id') id: number
    ){
        return User.findOne(id)
    }

    @Get('/users')
    async allUsers() {
      const users = await User.find()
      return { users } 
    }

    //posting works, but should be more automated
    @Post('/users')
    @HttpCode(201)
    async createUser(
      @Body() users: User
    ) {
        return users.save()
    }

    // PUT user positions >> functional.
    @Put('/user/:id/:posX/:posY')
    @HttpCode(201)
    async putPosition(
        @Param('id') id: number,
        @Param('posX') posX: number,
        @Param('posY') posY: number,
    ) {
        const user = await User.findOne(id)

        if (user) {
            user.posX = posX
            user.posY = posY

            await user.save()
        }
        //const score = await Score.findOne(scoreId)
        return { user }
    }

    //GET user positions >> werkt.
    @Get('/user/:id/pos')
    async getPosition(
        @Param('id') id: number
    ) {
        const user = await User.findOne(id)
        if (user) {
            const posX = user.posX
            const posY = user.posY

            return { posX, posY }
        }
    }
}