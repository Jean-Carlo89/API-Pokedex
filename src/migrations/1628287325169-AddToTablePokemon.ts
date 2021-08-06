import {MigrationInterface, QueryRunner} from "typeorm";

export class AddToTablePokemon1628287325169 implements MigrationInterface {
    name = 'AddToTablePokemon1628287325169'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pokemons" ADD "inMyPokemons" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pokemons" DROP COLUMN "inMyPokemons"`);
    }

}
