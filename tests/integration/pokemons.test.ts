import { any, string } from "joi";
import supertest from "supertest";
import { getConnection, getRepository } from "typeorm";
import faker from 'faker'
import app, { init } from "../../src/app";
import { createToken, createUser } from "../factories/userFactory";
import {populatePokemons} from "../factories/pokemonFactory"
import { clearDatabase } from "../utils/database";
import { getPriority } from "os";
import Session from "../../src/entities/Session";
import User from "../../src/entities/User"
import PokemonUser from '../../src/entities/pokemonsUsers'
import { ALL } from "dns";

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await clearDatabase();
});

afterAll(async () => {
  await clearDatabase();
  await getConnection().close();
});

const agent = supertest(app)


describe("GET /pokemons", () => {
    it("should answer with 401 if invalid token", async () => {
        
      const create = await createToken()
      
      const result= await supertest(app).get("/pokemons").set('Authorization',`Bearer asdsadasdasd` )
      expect(result.status).toBe(401)
      await getRepository(Session).delete({id:create.id})
    });

    it("should answer with 200 if valid info", async () => {
        
      const create = await createToken()
      await populatePokemons(3)
      
      const result= await supertest(app).get("/pokemons").set('Authorization',`Bearer ${create.token}` )
      expect(result.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
            number: expect.any(Number),
            image: expect.any(String),
            weight: expect.any(Number),
            height: expect.any(Number),
            baseExp: expect.any(Number),
           description: expect.any(String),
            inMyPokemons:expect.any(Boolean)
          })
        ])
      )
       
      expect(result.status).toBe(200)
      await getRepository(Session).delete({id:create.id})
    });


  });

  describe("POST/my-pokemons/:id/add", ()=>{
    it("should return 401 if invalid token", async()=>{
      const create = await createToken()
      const pokemonId = await populatePokemons(1)
      const result= await supertest(app).post(`/my-pokemons/${pokemonId}/add`).set('Authorization',`Bearer asdsadasdasd` )
      expect(result.status).toBe(401)
      await getRepository(Session).delete({id:create.id})
    })

    it("should return 200 if valid data", async ()=>{
      const create = await createToken()
      const pokemonId = await populatePokemons(1)
      const result= await supertest(app).post(`/my-pokemons/${pokemonId}/add`).set('Authorization',`Bearer ${create.token}` )
      expect(result.status).toBe(200)
      await getRepository(Session).delete({id:create.id})

       const relation = await getRepository(PokemonUser).findOne({where:{pokemonId}})
       await getRepository(PokemonUser).delete({id:relation.id})
    })
  })

  describe("POST/my-pokemons/:id/remove", ()=>{
    it("should return 401 if invalid token", async()=>{
      const create = await createToken()
      const pokemonId = await populatePokemons(1)
      const result= await supertest(app).post(`/my-pokemons/${pokemonId}/remove`).set('Authorization',`Bearer asdsadasdasd` )
      expect(result.status).toBe(401)
      await getRepository(Session).delete({id:create.id})
    })

    it("should return 200 if valid data", async ()=>{
      const create = await createToken()
      const pokemonId = await populatePokemons(1)
      await getRepository(PokemonUser).insert({userId:create.user.id,pokemonId})
       const result= await supertest(app).post(`/my-pokemons/${pokemonId}/remove`).set('Authorization',`Bearer ${create.token}` )
       expect(result.status).toBe(200)
       await getRepository(Session).delete({id:create.id})

    })
  })
  