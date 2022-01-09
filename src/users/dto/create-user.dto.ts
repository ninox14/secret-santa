import { ApiHideProperty, ApiProperty, OmitType } from '@nestjs/swagger';
import { IsAlpha, IsEmpty, IsJSON } from 'class-validator';
import { Game } from 'src/game/game.entity';
import { User } from '../user.entity';

export class CreateUserDto {
  @IsAlpha()
  @ApiProperty()
  name: string;

  @IsJSON()
  @ApiProperty()
  wishes: string;

  @ApiHideProperty()
  @IsEmpty()
  giftTo: User;

  @ApiHideProperty()
  @IsEmpty()
  game: Game;

  @ApiHideProperty()
  @IsEmpty()
  giter: User;

  @ApiHideProperty()
  @IsEmpty()
  giftToId: string;
}

export class CreateUserResponseDto extends OmitType(CreateUserDto, [
  'game',
  'giftTo',
] as const) {}
