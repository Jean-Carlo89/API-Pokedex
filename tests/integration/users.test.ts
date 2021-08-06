import supertest from "supertest";
import { getConnection, getRepository } from "typeorm";

import app, { init } from "../../src/app";
import { createUser } from "../factories/userFactory";
import { clearDatabase } from "../utils/database";

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



describe("GET /users", () => {
  it("should answer with text \"OK!\" and status 200", async () => {
    const user = await createUser();

    const response = await supertest(app).get("/users");
    
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          email: user.email
        })
      ])
    );

    expect(response.status).toBe(200);
  });
});




describe("POST /sign-up",()=>{
  it("should return status 201 if newUserCreated with success", async ()=>{
   
    
    const user={
      email: "test@email.com",
      password: "123456",
      confirmPassword : "123456"
    };
    
    const create= await supertest(app).post("/sign-up").send(user);
    

    expect(create.status).toBe(201)
   
   
    const response = await supertest(app).get("/users");
    
    expect(response.body.length).toEqual(1)


  })

  it("should return 400 if confirm password different from password",async ()=>{
    const user={
      email: "test@email.com",
      password: "123456",
      confirmPassword : "1234567"
    };

    const create= await supertest(app).post("/sign-up").send(user);
    

    expect(create.status).toBe(400)
   
  })

  it("should return 409 if email already exist",async ()=>{
   const user =await createUser()

   const newUser={
    email: user.email,
     password:"12345",
     confirmPassword:"12345"
   }

    console.log(newUser)

    const create= await supertest(app).post("/sign-up").send(newUser);
    

    expect(create.status).toBe(409)
   
  })
})


