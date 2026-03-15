import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn('uuid', {name: "ID"})
    id: string;

    @Column({name: "NAME", type: "varchar", length: 255})
    name: string;

    @Column({name: "CPF", type: "varchar", length: 11, unique: false})
    cpf: string;

    @Column({name: "PASSWORD", type: "varchar", length: 255})
    password: string;

    @Column({name: "NUMBER_PHONE", type: "varchar", length: 15, nullable: false, unique: true})
    numberPhone: string;
}
