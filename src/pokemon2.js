import axios from 'axios'
import { response } from 'express'

const api = 'https://pokeapi.co/api/v2/'

 // let pokemons = [] 

   let itemsThen1=[]
 await getPokemons()
  async function getPokemons(){
    try{
           
      
    
        await axios.get(`${api}pokemon/?offset=0&limit=2"`)
            .then((response)=>{
              const x = response.data.results
            
              itemsThen1=response.data.results
            })
      
          console.log('first')
      console.log(itemsThen1)

     await Promise.all(itemsThen1.forEach( (item)=>{
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
            
             pokemons.push(pokemon)
 
        })
      })
     )
      

      console.log(pokemons)
         
   
           
      
         
          
          
      

            
     
     
   
   
      //await Promise.all(
     
    //   await x.forEach(async (item)=> {
    //     axios.get(`${item.url}`)
    //    .then((response)=>{
          
    //       const r= response.data
    //        const pokemon={}
          
    //        pokemon["id"]=r.id
    //        pokemon["name"]=r.forms[0].name
    //        pokemon["image"]=r.sprites.front_default
    //        pokemon["weight"]=r.weight
    //        pokemon["height"]=r.height
    //        pokemon["baseExp"]=r.base_experience
  
    //        pokemons.push(pokemon)
           
          
  
    //    })
       
    // });
  
  
    
    
    
//  )
    }catch(err){
      console.log(err)
    }
    
   
  }
  
  

