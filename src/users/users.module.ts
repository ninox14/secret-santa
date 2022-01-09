import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { GameModule } from 'src/game/game.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), GameModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
