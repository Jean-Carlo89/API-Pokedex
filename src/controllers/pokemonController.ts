import { Request, Response } from "express";
import {getRepository} from "typeorm"
import Pokemon from '../entities/Pokemon'

interface newPokemon{
    
    id:number;

    
    name: string;

   
    number: number;

   
    image:string;

   
    weight:number;


   
    height:number;


   
    baseExp:number;
}



export async function insert(req: Request, res: Response){
   console.log(req.body)
   
   for(let i=0;i<req.body.length; i++){

    await getRepository(Pokemon).insert(req.body[i])
   }
   
   
}