import "./setup";

import express from "express";
import cors from "cors";
import "reflect-metadata";
import{Request,Response,NextFunction} from 'express'

import connectDatabase from "./database";

import * as userController from "./controllers/userConroller";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/users", userController.getUsers);

export async function init () {
  await connectDatabase();
}

app.use((err:any,req:Request,res:Response,next:NextFunction)=>{
  res.status(500).send('Erro desconhecido, tente mais tarde')
})

export default app;
