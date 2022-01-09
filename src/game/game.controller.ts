import { Controller, Get } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Game } from './game.entity';
import { GameService } from './game.service';

@ApiTags('game')
@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @ApiOkResponse({ type: () => Game })
  @Get()
  async getGame() {
    return await this.gameService.getGame();
  }

  @ApiOkResponse()
  @ApiBadRequestResponse()
  @Get('start')
  startGame() {
    return this.gameService.startGame();
  }
}
