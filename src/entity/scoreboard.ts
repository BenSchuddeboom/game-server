import {Entity, Column, PrimaryColumn} from "typeorm";
import { BaseEntity } from 'typeorm/repository/BaseEntity'


@Entity()
export class Scoreboard extends BaseEntity {

    @PrimaryColumn()
    id: number;

    @Column('text')
    name: string;

    @Column()
    score: number;
}