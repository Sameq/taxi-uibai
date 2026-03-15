import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUser1773327915971 implements MigrationInterface {
    name = 'CreateUser1773327915971'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("ID" uuid NOT NULL DEFAULT uuid_generate_v4(), "NAME" character varying(255) NOT NULL, "CPF" character varying(11) NOT NULL, "PASSWORD" character varying(255) NOT NULL, "NUMBER_PHONE" character varying(15) NOT NULL, CONSTRAINT "UQ_6f41f5aa71796c67e8c5eabf8b6" UNIQUE ("NUMBER_PHONE"), CONSTRAINT "PK_5763954075431ddd0821cd906da" PRIMARY KEY ("ID"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
