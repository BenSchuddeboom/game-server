import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, AfterInsert } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsInt } from 'class-validator';
import GameState from '../gamestate/gamestate';

@Entity()
export default class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id?: number

    @Column('text')
    playerName: string

    @IsInt()
    @Column('int')
    socketId: number

    @IsInt()
    @Column('int')
    scoreId: number

    @IsInt()
    @Column('int')
    posX: number

    @IsInt()
    @Column('int')
    posY: number

    @ManyToOne(type => GameState, gamestate => gamestate.user)
    gameState: GameState;

    @AfterInsert()
    public handleAfterInsert() {
      console.log(`INSERTED USER WITH ID: ${this.id}`);
    }
}