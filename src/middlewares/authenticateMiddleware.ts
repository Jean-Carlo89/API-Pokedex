import{Request,Response,NextFunction} from 'express'
import * as userService from '../services/userService'


export async function authenticateMiddleware(req:Request,res:Response,next:NextFunction){
    try{
      const header = req.headers["authorization"]
      const token = header.split("Bearer ")[1]
     const user = await userService.authenticate(token)
      
     if(user===null){
      return res.sendStatus(401)
     }
  
     res.locals.user=user
      next()
    }catch(e){
      
    return res.sendStatus(401);
    }
   
  }