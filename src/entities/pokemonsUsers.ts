import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import Pokemon from './Pokemon'
import User from './User'

@Entity("pokemonsUsers")
export default class PokemonUser{

    @PrimaryGeneratedColumn()
    id:number

    @Column()
    userId:number

    @Column()
    pokemonId:number

    @ManyToOne(()=>Pokemon,(pokemon)=>pokemon.pokemonsUsers)
    pokemon:Pokemon

    @ManyToOne(()=>User,(user)=>user.pokemonsUsers)
    user:User
}