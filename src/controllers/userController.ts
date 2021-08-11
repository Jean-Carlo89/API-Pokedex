import { Request, Response } from "express";
import { valid } from "joi";

import * as userService from "../services/userService";

export async function getUsers (req: Request, res: Response) {
  try {
    const users = await userService.getUsers();
    res.send(users);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}


interface NewUser{
  email:string,
  password:string,
  confirmPassword:string
}


export async function SignUp (req: Request, res: Response) {
  try {
    
    const {email,password,confirmPassword} = req.body as NewUser
    
    const validate = await userService.validateNewUser({email,password,confirmPassword})
      res.sendStatus(validate)
    
 
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}




export async function Login (req: Request, res: Response) {
  
   
  try {
   
    const email:string = req.body.email
    const password:string =req.body.password
    
    const validate = await userService.validateLogin(email,password)

    if(typeof(validate)==='string'){
      res.send(validate)
    }else{
      res.sendStatus(validate)
    }
    
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}


