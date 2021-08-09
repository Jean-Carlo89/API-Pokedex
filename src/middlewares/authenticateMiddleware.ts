import{Request,Response,NextFunction} from 'express'
import * as userService from '../services/userService'


export async function authenticateMiddleware(req:Request,res:Response,next:NextFunction){
    console.log(req.headers)
    const header = req.headers["authorization"]
    const token = header.split("Bearer ")[1]
   console.log(token)
  
   const validSession = await userService.authenticate(token)
    
   if(!validSession){
    return res.sendStatus(401)
   }
    next()
  }