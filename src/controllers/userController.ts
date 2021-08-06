import { Request, Response } from "express";

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
    console.log(req.body)
    const {email,password,confirmPassword} = req.body as NewUser
    
    const validate = await userService.validateNewUser({email,password,confirmPassword})

    if(validate){
      return res.sendStatus(201)
    }
 
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

