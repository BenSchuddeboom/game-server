import { JsonController, Get, Param, Post, HttpCode, Body, Put } from 'routing-controllers'
import { Scoreboard } from './scoreboard';

@JsonController()
export default class ScoreboardController {

    @Get('/scores/:userBySocket')
    async getScore(
        @Param('userBySocket') userBySocket: number
    ){ 
        const score = await Scoreboard.findOne(userBySocket)
        if (score) {
          return score
        }
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

    @Put('/scores/:userBySocket')
    async incrementScore(
      @Param('userBySocket') userBySocket: string
    ){
      const player = await Scoreboard.findOne(userBySocket)

      if (player) {
        player.score += 1
        await player.save()
      } else {
      return console.log('end of incrementScore block')
    }
  }
    
}