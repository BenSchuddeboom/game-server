import { JsonController, Get, Param, Post, HttpCode, Body, Params } from 'routing-controllers'
import Score from './score';

@JsonController()
export default class ScoreController {

    @Get('/score/:id')
    getScore(
        @Param('id') id: number
    ){
        return Score.findOne(id)
    }

    @Get('/scores')
    async allAds() {
      const scores = await Score.find()
      return { scores } 
    }

    //WIP
    @Post('/scores/:id/:score')
    @HttpCode(201)
    createScore(
      @Param('id') id: number,
      @Param('score') score: number,
    ) {

      //temp
      //return scores.save()
    }
    
}