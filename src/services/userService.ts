import { Request, Response } from "express";
import { getRepository, Repository } from "typeorm";
import joi from 'joi'
import  bcrypt from "bcrypt";
import { v4 as uuid } from 'uuid';


import User from "../entities/User";
import Session from "../entities/Session"
import Joi from "joi";
import { Login } from "../controllers/userController";

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

export async function validateLogin(email:string,password:string) {
  const newUser ={
    email,
    password
  }
  
  let schema=Joi.object(
    {
      email:Joi.string().required().email(),
      password:Joi.string().min(3).required()
      
    }
  )

   const validate = schema.validate(newUser)
  
  
   if(validate.error){
      
    return 400
  }

  const token = await login(email,password)
   
  return token
}

async function login(email:string,password:string){
  
  const user = await getRepository(User).findOne({email})

  if(!user){
    return 401
  }
  
  if(bcrypt.compareSync(password,user.password)){
    const token = uuid()

    await getRepository(Session).insert({userId:user.id,token})
    return token

  }else{
    return 401
  }
  
  
}

export async function authenticate(token:string){
  const session = await getRepository(Session).findOne({where:{token},relations:["user"]})

  if(!session){
    return null
  }else{
    return session.user
  }
}