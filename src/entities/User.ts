import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import PokemonUser from './pokemonsUsers'

@Entity("users")
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique:true})
  email: string;

  @Column()
  password: string;

  @OneToMany(()=>PokemonUser, pokemonUser=>pokemonUser.user)
  pokemonsUsers:PokemonUser[]
}
