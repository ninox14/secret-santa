import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from 'ormconfig';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { GameModule } from './game/game.module';

@Module({
  imports: [TypeOrmModule.forRoot(config), UsersModule, GameModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
