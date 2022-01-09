import { ApiHideProperty, ApiProperty, OmitType } from '@nestjs/swagger';
import { Game } from 'src/game/game.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  wishes: string;

  @ApiProperty({ type: User })
  @OneToOne(() => User, (user) => user.id)
  gifter: User;

  @ApiProperty()
  @Column({ nullable: true })
  giftToId: string;

  @ApiProperty({ type: () => BasicUserType, required: false })
  @OneToOne(() => User, (user) => user.gifter, {
    /*  cascade: true */
  })
  @JoinColumn()
  giftTo: User;

  @ApiProperty()
  @Column({ nullable: true })
  gameId: string;

  @ApiHideProperty()
  @ManyToOne(() => Game, (game) => game.id)
  game: Game;
}
export class GetUserResponse extends OmitType(User, [
  'game',
  'gifter',
] as const) {}

export class BasicUserType extends OmitType(GetUserResponse, [
  'giftTo',
] as const) {}
