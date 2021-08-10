import { any, string } from "joi";
import supertest from "supertest";
import { getConnection, getRepository } from "typeorm";
import bcrypt from 'bcrypt'
import app, { init } from "../../src/app";
import { createUser } from "../factories/userFactory";
import { clearDatabase } from "../utils/database";
import { getPriority } from "os";
import Session from "../../src/entities/Session";
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
        
        const user = await createUser()
        console.log(user)
       const newSession =  await getRepository(Session).insert({userId:user.id,token:'tokentest'})
       console.log(newSession)



      
    
     
    });
  });
  