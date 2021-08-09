import { Request, Response } from "express";
import axios from 'axios'
import * as pokemonService from '../services/pokemonService'
import {getRepository} from "typeorm"
import Pokemon from '../entities/Pokemon'
import User from "../entities/User";


export async function insert(req: Request, res: Response){
   console.log('bateu aqui')
   console.log(req.body)
   

    await pokemonService.insert(req.body)

    res.sendStatus(200)

   
   
}

export async function getPokemons(req: Request, res: Response){
    console.log('bateu aqui')
    console.log(req.body)
   
    const user = res.locals.user
    console.log(user)
    
     const pokemons = await pokemonService.getPokemons(user.id)

     
 
     res.send(pokemons)
 
    
    
 }




 export async function populatePokemons(req: Request, res: Response){
    const {password} = req.body as {password: string};
    console.log('populando')
   
    for(let i = 1; i < 899; i ++){
        const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`)
        const newPokemon = {
            name: result.data.name,
            number: result.data.id,
            image: result.data.sprites.front_default,
            weight: result.data.weight,
            height: result.data.height,
            baseExp: result.data.base_experience,
            description: ""
        }
        const speciesResult = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${i}`)
        for (let j = 0; j < speciesResult.data.flavor_text_entries.length; j++) {
            if(speciesResult.data.flavor_text_entries[j].language.name === "en"){
                newPokemon.description =  speciesResult.data.flavor_text_entries[j].flavor_text.split("\n").join(" ");
            }
        }
        await getRepository(Pokemon).insert(newPokemon);
    }
    res.sendStatus(200);
}


 


export async function removePokemon(req: Request, res: Response){
   console.log(req.headers)
   console.log(req.params)
   const pokemonId = Number(req.params.id)

   const userId = res.locals.user.id
    console.log(pokemonId)
    console.log(userId)
    
  const deletionResult= await pokemonService.removePokemon(pokemonId,userId)

  if(deletionResult===200){
     return res.sendStatus(200)
  }
   
    
    
 }

 export async function addPokemon(req: Request, res: Response){
    console.log(req.headers)
   console.log(req.params)
   const pokemonId = Number(req.params.id)

   const userId = res.locals.user.id
    console.log(pokemonId)
    console.log(userId)
 
   const addResult= await pokemonService.addPokemon(pokemonId,userId)
 
   if(addResult===200){
      return res.sendStatus(200)
   }
    
     
     
  }