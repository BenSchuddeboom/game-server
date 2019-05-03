import { JsonController, Get, Param, Post, HttpCode, Body, Put } from 'routing-controllers'
import { Scoreboard } from './scoreboard';

@JsonController()
export default class ScoreboardController {

    @Get('/scores/:id')
    getScore(
        @Param('id') id: number
    ){
        return Scoreboard.findOne(id)
    }

    @Get('/scores')
    async allScores() {
      const score = await Scoreboard.find()
      return { score } 
    }

    @Post('/scores')
    @HttpCode(201)
    createScore(
      @Body() score: Scoreboard
    ) {
      return score.save()
    }

    //increment player score by id
    @Put('/scores/:socketId')
    @HttpCode(201)
    async incrementScore(
      @Param('socketId') socketId: number
    ){
      const player = await Scoreboard.findOne(socketId)
      
      if (player) {
        player.score += 1

        await player.save()
      }
      return { player }
    }
}