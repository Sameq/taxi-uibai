import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "USER"})
export class User {
    @PrimaryGeneratedColumn('uuid', {name: "ID"})
    id: string;

    @Column({name: "NAME", type: "varchar2", length: 255})
    name: string;

    @Column({name: "CPF", type: "varchar2", length: 11, unique: false})
    cpf: string;

    @Column({name: "PASSWORD", type: "varchar2", length: 255})
    password: string;

    @Column({name: "NUMBER_PHONE", type: "varchar2", length: 15, nullable: false, unique: true})
    numberPhone: string;
}
