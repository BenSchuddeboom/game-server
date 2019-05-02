import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsInt } from 'class-validator';

@Entity()
export default class Score extends BaseEntity {

    @PrimaryGeneratedColumn()
    id?: number

    @IsInt()
    @Column('int')
    gameStateId: number

    @IsInt()
    @Column('int')
    userId: number

    @IsInt()
    @Column('int')
    score: number
}