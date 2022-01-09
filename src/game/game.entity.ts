import { ApiProperty } from '@nestjs/swagger';
import { BasicUserType, User } from 'src/users/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Game {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  playerCount: number;

  @ApiProperty()
  @Column()
  isStarted: boolean;

  @OneToMany(() => User, (user) => user.game, {
    // cascade: true,
  })
  @ApiProperty({ type: () => [BasicUserType] })
  users: User[];
}
