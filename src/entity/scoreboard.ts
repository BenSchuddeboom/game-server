import {Entity, Column, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import { BaseEntity } from 'typeorm/repository/BaseEntity'


@Entity()
export class Scoreboard extends BaseEntity {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column('text')
    socketId: string;

    @Column('text')
    name: string;

    @Column()
    score?: number;
}