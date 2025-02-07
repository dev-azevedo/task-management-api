import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1738954314132 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXIST "uuid-ossp"`);
        await queryRunner.query(`
            CREATE TABLE task (
                id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                titel varchar(256) NOT NULL,
                description varchar(512) NULL, 
                status varchar(50) NOT NULL DEFAULT "TO_DO",
                expiration_date timestamp NOT NULL,
                CONSTRAINT task_pkey PRIMARY KEY (id)
                `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS task`);
    }

}
