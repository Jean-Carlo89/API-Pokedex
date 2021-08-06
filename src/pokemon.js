import axios from 'axios'

const api = 'https://pokeapi.co/api/v2/'

  let pokemons = [] 

  getPokemons()



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




async function getPokemons(){
 
    try{
      const pokemons = await axios.get(`${api}pokemon/?offset=0&limit=2"`)
       //console.log(pokemons.data.results)


        array2(pokemons)
    //    pokemons.data.results.array.forEach(item => {
           
    //    });
      
   
    }catch(err){
       console.log(err)
   }
   
       
   }

   async function array2(params) {
       console.log('params')
       console.log(params.data.results)

      const pokeInfo= await Promise.all(
        params.data.results.map(async (item)=>{
            return(
           await  axios.get(`${item.url}`)
            ) 
        })
      ) 

      pokeInfo.forEach((item)=>{
        //  console.log(item.data.sprites.front_default)


            const pokemon={}
        
            pokemon["id"]=item.data.id
            pokemon["name"]=item.data.name
            pokemon["image"]=item.data.sprites.front_default
            pokemon["weight"]=item.data.weight
            pokemon["height"]=item.data.height
            pokemon["baseExp"]=item.data.base_experience

            pokemons.push(pokemon)
      })

     // console.log(pokemons)

      const descriptions = await Promise.all(
        pokemons.map(async (item)=>{
            return(
               await axios.get(`https://pokeapi.co/api/v2/characteristic/${item.id}/`)
            )   
             
    
          })
        )

        descriptions.forEach((item,index)=>{
            console.log(item.data.descriptions[item.data.descriptions.length-1])

            pokemons[`${index}`]["description"]=item.data.descriptions[item.data.descriptions.length-1].description
        })

       console.log(pokemons)
        
        

      
   }
   
   

