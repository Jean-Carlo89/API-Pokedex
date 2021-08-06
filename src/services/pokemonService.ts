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


export async function insert(pokemons:newPokemon[]) {

    const hasPokemon = await getRepository(Pokemon).find()
    if(hasPokemon.length>0){
        return
    }
    
    for(let i=0;i<pokemons.length; i++){

            await getRepository(Pokemon).insert(pokemons[i])
        }

    
}


export async function getPokemons() {

   const pokemons = getRepository(Pokemon).find()

   return pokemons
    
   

    
}