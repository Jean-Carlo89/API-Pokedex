import {MigrationInterface, QueryRunner} from "typeorm";

export class AddDescription1628679693845 implements MigrationInterface {
    name = 'AddDescription1628679693845'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pokemons" RENAME COLUMN "inMyPokemons" TO "description"`);
        await queryRunner.query(`ALTER TABLE "pokemons" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "pokemons" ADD "description" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pokemons" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "pokemons" ADD "description" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "pokemons" RENAME COLUMN "description" TO "inMyPokemons"`);
    }

}
