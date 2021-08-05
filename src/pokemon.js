// import axios from 'axios'

// const api = 'https://pokeapi.co/api/v2/'

//   let pokemons = [] 
// pokemons =await getPokemons()

// test()

// async function test(){
//     const x = await getPokemons()
//     console.log(x)
// }

// async function getPokemons(){
 
//  try{
//     await axios.get(`${api}pokemon/?offset=0&limit=2"`)
    
//    .then((res)=>{

   
//        res.data.results.forEach((item)=> {
//             axios.get(`${item.url}`)
//            .then((response)=>{
              
//               const r= response.data
//                const pokemon={}
              
//                pokemon["id"]=r.id
//                pokemon["name"]=r.forms[0].name
//                pokemon["image"]=r.sprites.front_default
//                pokemon["weight"]=r.weight
//                pokemon["height"]=r.height
//                pokemon["baseExp"]=r.base_experience
               
               

//                 axios.get(`https://pokeapi.co/api/v2/characteristic/${r.id}/`)  
//                .then((res)=>{
                   
//                    pokemon["description"]=res.data.descriptions[2].description
                   
//                    pokemons.push(pokemon)

//                })
               
            
            
   
//            })
           
//        });
       
       
//    })
   
//    console.log(pokemons)
//    return pokemons

//  }catch(err){
//     console.log(err)
// }

    
// }


// pokemons.forEach(()=>{
//     Selection...
// })
 


import axios from 'axios'

const api = 'https://pokeapi.co/api/v2/'

  let pokemons = [] 
pokemons =await getPokemons()

test()

async function test(){
    const x = await getPokemons()
    console.log(x)
}

async function getPokemons(){
 
 try{
    await axios.get(`${api}pokemon/?offset=0&limit=2"`)
    
   .then(async (res)=>{

   
       res.data.results.forEach((item)=> {
            axios.get(`${item.url}`)
           .then((response)=>{
              
              const r= response.data
               const pokemon={}
              
               pokemon["id"]=r.id
               pokemon["name"]=r.forms[0].name
               pokemon["image"]=r.sprites.front_default
               pokemon["weight"]=r.weight
               pokemon["height"]=r.height
               pokemon["baseExp"]=r.base_experience
               
               

                axios.get(`https://pokeapi.co/api/v2/characteristic/${r.id}/`)  
               .then((res)=>{
                   
                   pokemon["description"]=res.data.descriptions[2].description
                   
                   pokemons.push(pokemon)

               })
               
            
            
   
           })
           
       });
       
       
   })
   
   console.log(pokemons)
   return pokemons

 }catch(err){
    console.log(err)
}

    
}