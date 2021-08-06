import {MigrationInterface, QueryRunner} from "typeorm";

export class TablesCreation1628252920455 implements MigrationInterface {
    name = 'TablesCreation1628252920455'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pokemonsUsers" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "pokemonId" integer NOT NULL, CONSTRAINT "PK_602e702b0438adc6f010f1e140e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pokemons" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "number" integer NOT NULL, "image" character varying NOT NULL, "weight" integer NOT NULL, "height" integer NOT NULL, "baseExp" integer NOT NULL, CONSTRAINT "PK_a3172290413af616d9cfa1fdc9a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "pokemonsUsers" ADD CONSTRAINT "FK_597fa92dd8d4ebaede44e316179" FOREIGN KEY ("pokemonId") REFERENCES "pokemons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pokemonsUsers" ADD CONSTRAINT "FK_9950a15a4d2bf490a0df9e7d1ee" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pokemonsUsers" DROP CONSTRAINT "FK_9950a15a4d2bf490a0df9e7d1ee"`);
        await queryRunner.query(`ALTER TABLE "pokemonsUsers" DROP CONSTRAINT "FK_597fa92dd8d4ebaede44e316179"`);
        await queryRunner.query(`DROP TABLE "pokemons"`);
        await queryRunner.query(`DROP TABLE "pokemonsUsers"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
