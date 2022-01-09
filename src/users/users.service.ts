import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GameService } from 'src/game/game.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private readonly gameService: GameService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const newUser = this.usersRepository.create(createUserDto);
    await this.gameService.addUser(newUser);
    // return this.gameService.addUser(newUser);
    return this.usersRepository.save(newUser);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find({ relations: ['giftTo'] });
  }

  findOne(id: string) {
    return this.findByID(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findByID(id);
    const updatedUser = { ...user, ...updateUserDto };
    // return this.usersRepository.update(id, updateUserDto);
    return this.usersRepository.save(updatedUser);
  }

  async remove(id: string) {
    const user = await this.findByID(id);
    return this.usersRepository.remove(user);
  }

  private async findByID(id: string) {
    try {
      const user = await this.usersRepository.findOneOrFail(id, {
        relations: ['giftTo'],
      });
      return user;
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }
}
