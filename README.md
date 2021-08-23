# Pokedex API

An  API to get information of pokemons from pokemon game franchise. get info about a pokemon, save it or remove it from your pokemons.


Try it out now at https://pokedex-azure-five.vercel.app/login

## About

This is an api with routes to get data from pokemon from a database.
Check some of the implemented features:

- Sign Up
- Login
- List all pokemons in database
- Add pokemons to your favorites list
- remove a pokemon from favorites list

Check information about pokemons and save your favorites into your list

## Technologies
The following tools and frameworks were used in the construction of the project:<br>
<p>
  <img style='margin: 5px;' src='https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white'>
  <img style='margin: 5px;' src='https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=whiteE'>
  <img style='margin: 5px;' src='https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white'>
  <img style='margin: 5px;' src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white"/>
  <img style='margin: 5px;' src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white"/>
  <img style='margin: 5px;' src="https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white"/>
</p>

## How to run

1. Clone this repository
2. create a postgres Database named pokedex
3. create a .env like .env.example with your database values
4. Install dependencies
```
npm i
```
5. To create and run migrations for your database:
```
npm run build
```
6.start server with:
```
npm run dev
```

