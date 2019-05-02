import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsInt } from 'class-validator';
import User from '../user/user';

@Entity()
export default class GameState extends BaseEntity {

    @PrimaryGeneratedColumn()
    id?: number

    // this one needs to be set automatically, later. -Albert
    @IsInt()
    @Column('int', { nullable: true })
    playerAmount: number

    @Column('text')
    status: string

    @Column({type: 'text', array: true})
    @OneToMany(type => User, user => user.gameState)
    user: User[];

}