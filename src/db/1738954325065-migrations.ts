import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1738954325065 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        
        queryRunner.query(`
            CREATE TABLE IF NOT EXISTS user (
                id uuid NOT NULL DEFAULT uuid_generate_v4(),
                username varchar(256) NOT NULL,
                password varchar(256) NOT NULL,
                CONSTRAINT user_pkey PRIMARY KEY (id)
                CONSTRAINT username_unique UNIQUE (username)
            )`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS user`);
    }

}
