import {Entity,PrimaryGeneratedColumn,Column,ManyToOne} from "typeorm"
import User from "./User";


@Entity("pokemons")
export default class Pokemon{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name: string;

    @Column()
    number: number;

    @Column()
    image:string;

    @Column()
    weight:number;


    @Column()
    height:number;


    @Column()
    baseExp:number;

    // @ManyToOne(()=>User,(user)=>user.pokemons)
    // user:User



}