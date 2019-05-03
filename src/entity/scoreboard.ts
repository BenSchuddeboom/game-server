import {Entity, Column, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import { BaseEntity } from 'typeorm/repository/BaseEntity'


@Entity()
export class Scoreboard extends BaseEntity {

    @PrimaryColumn()
    socketId?: string;

    @Column('text')
    name: string;

    @Column('int')
    score: number;
}