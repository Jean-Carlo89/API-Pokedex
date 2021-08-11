import { getRepository } from "typeorm";
import faker from "faker"
import Pokemon from "../../src/entities/Pokemon";
import User from "../../src/entities/User";

export async function populatePokemons(qty:number){
    const pokemons:Pokemon[] = []
    for(let i=0;i<qty;i++){
        const pokemon = getRepository(Pokemon).create();
        pokemon.name = faker.name.findName();
        pokemon.number = faker.datatype.number();
        pokemon.image = faker.image.imageUrl();
        pokemon.weight = faker.datatype.number();
        pokemon.height = faker.datatype.number();
        pokemon.baseExp = faker.datatype.number();
        pokemon.description = faker.lorem.paragraph();
        pokemons.push(pokemon)
    }
   const newPokemon=  await getRepository(Pokemon).insert(pokemons)

    const id =newPokemon.generatedMaps[0].id
    return id
}