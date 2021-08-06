import {MigrationInterface, QueryRunner} from "typeorm";

export class AddTokenInSessionsTable1628274365473 implements MigrationInterface {
    name = 'AddTokenInSessionsTable1628274365473'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sessions" ADD "token" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sessions" DROP COLUMN "token"`);
    }

}
