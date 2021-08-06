import "./setup";

import express from "express";
import cors from "cors";
import "reflect-metadata";
import{Request,Response,NextFunction} from 'express'

import connectDatabase from "./database";

import * as userController from "./controllers/userController";
import * as pokemonController from "./controllers/pokemonController"

const app = express();
app.use(cors());
app.use(express.json());

app.get("/users", userController.getUsers);
app.post("/sign-up", userController.SignUp)
app.post("/sign-in", userController.Login)


export async function init () {
  await connectDatabase();
}


app.get("/pokemons",pokemonController.getPokemons)
app.post("/insert", pokemonController.insert) 
app.post("/populate", pokemonController.populatePokemons)



app.use((err:any,req:Request,res:Response,next:NextFunction)=>{
  console.log(err)
  res.status(500).send('Erro desconhecido, tente mais tarde')
})

export default app;
