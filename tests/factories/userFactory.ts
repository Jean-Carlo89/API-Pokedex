import { getRepository } from "typeorm";
import faker from 'faker'
import Session from '../../src/entities/Session'
import User from "../../src/entities/User";

export async function createUser () {
  const user = await getRepository(User).create({
    email: "email@email.com",
    password: "123456"
  });

  await getRepository(User).save(user);

  
  return user;
}

export async function createToken(){

    const token = faker.lorem.paragraph()

      const user = await createUser()
      const newSession =  await getRepository(Session).insert({userId:user.id,token:token})
      const id =newSession.generatedMaps[0].id

      return{id,token,user}
      
}
