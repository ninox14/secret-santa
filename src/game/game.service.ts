import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { getRandomNumber, ShuffleArray } from 'src/utility/utility';
import { Repository } from 'typeorm';
import { Game } from './game.entity';

@Injectable()
export class GameService {
  private currentGame: Game | null = null;
  constructor(
    @InjectRepository(Game) private gameRepo: Repository<Game>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {
    if (!this.currentGame) {
      this.getGame();
    }
  }

  async getGame() {
    const activeGame = await this.getGameState();
    if ((!this.currentGame || this.currentGame.isStarted) && !activeGame) {
      this.currentGame = await this.createGame();
    } else {
      this.currentGame = activeGame;
    }
    return this.currentGame;
  }

  async addUser(user: User) {
    const isAnyPlayers = !!this.currentGame.users;

    if (this.currentGame.playerCount === 500) {
      throw new BadRequestException(
        'Game has 500 players you must start the game',
      );
    }

    if (!isAnyPlayers) {
      this.currentGame.users = [user];
    } else {
      this.currentGame.users.push(user);
    }
    this.currentGame.playerCount++;
    const savedResponse = await this.gameRepo.save(this.currentGame);
    this.currentGame = savedResponse;
    return savedResponse;
  }

  private createGame() {
    const newGame = this.gameRepo.create({
      isStarted: false,
      playerCount: 0,
    });
    return this.gameRepo.save(newGame);
  }

  private getGameState() {
    return this.gameRepo.findOne(
      {
        isStarted: false,
      },
      { relations: ['users'] },
    );
  }

  async startGame() {
    this.currentGame.isStarted = true;
    const gameState = await this.getGameState();

    if (this.currentGame.playerCount < 3) {
      throw new BadRequestException('Game has less than 3 players');
    }
    try {
      const usersArr = await this.shuffleGifters(gameState.users);
      gameState.isStarted = true;
      gameState.users = usersArr;
      await this.gameRepo.save(gameState);
      this.currentGame = await this.createGame();
      return gameState;
    } catch (err) {
      throw err;
    }
  }
  private async shuffleGifters(arr: User[]) {
    const shuffledArray = ShuffleArray(arr).map((user) => {
      return { ...user };
    });
    const copyArr = arr;
    copyArr.map((user) => {
      let giftToUser = shuffledArray.pop();
      if (giftToUser.id === user.id) {
        shuffledArray.splice(
          getRandomNumber(shuffledArray.length - 1),
          0,
          giftToUser,
        );
        giftToUser = shuffledArray.pop();
      }
      user.giftTo = giftToUser;
      this.userRepo.save(user);
    });
    return copyArr;
  }
}
