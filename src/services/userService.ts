import { Request, Response } from "express";
import { getRepository, Repository } from "typeorm";
import joi from 'joi'
import  bcrypt from "bcrypt";


import User from "../entities/User";
import Joi from "joi";



export async function getUsers () {
  const repository =  getRepository(User)
  const users = await repository.find({
    select: ["id", "email"]
  });
  
  return users;
}




interface NewUser{
  email:string,
  password:string,
  confirmPassword:string
}

export async function validateNewUser(newUser:NewUser){
  const{email, password} = newUser
    let schema=Joi.object(
      {
        email:Joi.string().required().email(),
        password:Joi.string().min(3).required(),
        confirmPassword:Joi.string().required().valid(Joi.ref('password')),
      }
    )

     const validate = schema.validate(newUser)
    
    
    
     const  hashedPassword = bcrypt.hashSync(password,12)
    
      
    
     if(validate.error){
       
       console.log('passou aqui')
       console.log(validate.error)
      return 400
     }else{
       
       return await saveNewUser(email,hashedPassword)
     }


}

async function saveNewUser(email:string,password:string) {
  const repository =  getRepository(User)
  const alreadyExist = await repository.findOne({where:{email}})
  
  if(alreadyExist){
    return 409
  }
    
  await repository.insert({email,password})
  
 return 201
  
  
   
}