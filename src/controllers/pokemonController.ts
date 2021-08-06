import { Request, Response } from "express";

import * as pokemonService from '../services/pokemonService'



export async function insert(req: Request, res: Response){
   console.log('bateu aqui')
   console.log(req.body)
   

    await pokemonService.insert(req.body)

    res.sendStatus(200)

   
   
}

export async function getPokemons(req: Request, res: Response){
    console.log('bateu aqui')
    console.log(req.body)
    
    
     const pokemons = await pokemonService.getPokemons()
 
     res.send(pokemons)
 
    
    
 }