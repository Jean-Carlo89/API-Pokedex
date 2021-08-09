import {getRepository} from "typeorm"
import Pokemon from '../entities/Pokemon'
import PokemonUser from '../entities/pokemonsUsers'

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

interface MyPokemonsObject {
    [key: string]: any
}

export async function getPokemons(userId:number) {

    //const id =157
   const pokemons = await getRepository(Pokemon).find()

   const myPokemons = await getRepository(PokemonUser).find({where:{userId},relations:["pokemon"]})

   //console.log(myPokemons)

   const myPokemonsObject: MyPokemonsObject= {}

   myPokemons.forEach((item)=>{
    myPokemonsObject[`${item.pokemon.number}`] = true
   })
    
   //console.log(myPokemonsObject)

   const newPokemons = pokemons.map((pokemon)=>{
        if(myPokemonsObject[`${pokemon.number}`]===true){
            
            return(
                {...pokemon,inMyPokemons:true}
            )
        }

        return {...pokemon,inMyPokemons:false}
   })
   
   return newPokemons
    
   

    
}

export async function removePokemon(pokemonId:number,userId:number){
   
   const relation = await getRepository(PokemonUser).findOne({where:{userId,pokemonId}})
    console.log(relation)
   await getRepository(PokemonUser).delete({id:relation.id})
    
    return 200
}

export async function addPokemon(pokemonId:number,userId:number){
   
    await getRepository(PokemonUser).insert({userId,pokemonId})
    

    return 200
}




