import { JsonController, Get, Param, Post, HttpCode, Body, Put } from 'routing-controllers'
import GameState from './gamestate';
import { getConnection } from 'typeorm';

@JsonController()
export default class GameStateController {

    @Get('/gamestate/:id')
    getGameState(
        @Param('id') id: number
    ){
        return GameState.findOne(id)
    }

    @Get('/gamestates')
    async allAds() {
      const gamestates = await GameState.find()
      return { gamestates } 
    }

    @Post('/gamestates')
    @HttpCode(201)
    createGameState(
      @Body() gamestates: GameState
    ) {
      return gamestates.save()
    }
    
    //posting works, but should be more automated
    @Put('/user/:id/join/:game')
    async joinGame(
        @Param('id') id: number,
        @Param('game') game: number
    ) {
        const user = await getConnection()
            .createQueryBuilder()
            .update(GameState)
            .set({ status: "sleeping" })
            .where("id = :id", { id: 1 })
            .execute();

            return user
    }
}