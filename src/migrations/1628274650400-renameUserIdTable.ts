import {MigrationInterface, QueryRunner} from "typeorm";

export class renameUserIdTable1628274650400 implements MigrationInterface {
    name = 'renameUserIdTable1628274650400'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sessions" DROP CONSTRAINT "FK_57de40bc620f456c7311aa3a1e6"`);
        await queryRunner.query(`ALTER TABLE "sessions" RENAME COLUMN "userId" TO "userIdId"`);
        await queryRunner.query(`ALTER TABLE "sessions" ADD CONSTRAINT "FK_0b3f28240547daacf77f30080e9" FOREIGN KEY ("userIdId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sessions" DROP CONSTRAINT "FK_0b3f28240547daacf77f30080e9"`);
        await queryRunner.query(`ALTER TABLE "sessions" RENAME COLUMN "userIdId" TO "userId"`);
        await queryRunner.query(`ALTER TABLE "sessions" ADD CONSTRAINT "FK_57de40bc620f456c7311aa3a1e6" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
