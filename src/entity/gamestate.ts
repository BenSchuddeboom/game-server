import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsDate } from 'class-validator';

@Entity()
export default class GameState extends BaseEntity {

    @PrimaryGeneratedColumn()
    id?: number

    @Column('text')
    playerName: string

    @IsDate()
    @Column('text')
    date: string
}