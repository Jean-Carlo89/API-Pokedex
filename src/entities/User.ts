
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import PokemonUser from './pokemonsUsers'
import Session from './Session'

@Entity("users")
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique:true})
  email: string;

  @Column()
  password: string;

  @OneToMany(()=>PokemonUser, (pokemonUser)=>pokemonUser.user)
  pokemonsUsers:PokemonUser[]

  @OneToMany(()=>Session, (sessions)=>sessions.user)
  sessions:Session[]
}
