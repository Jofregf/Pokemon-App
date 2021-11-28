// const { Router } = require("express");
const express = require("express")
const router = express.Router()
const { Pokemon, Type, pokemon_type} = require("../db")
const axios = require("axios")
const {v4: uuidv4} = require('uuid');
//TODO revisar para pasar las funciones y solo dejar las rutas en este archivo!!!!
//router.use(express.json())

//* TRAIGO LOS 40 POKEMON DE LA API 
const getApiInfo = async () => {
    let apiUrl = (await axios.get('https://pokeapi.co/api/v2/pokemon?limit=40')).data.results
    //console.log(apiUrl)
    let newPokeApi = [];
    for (let i = 0; i < apiUrl.length; i++) {
        newPokeApi.push(axios.get(apiUrl[i].url))
    }
    let apiResult = (await Promise.all(newPokeApi)).map(p => 
        {
        return {
            id: p.data.id,
            name: p.data.name,
            types: p.data.types.map(t => t.type.name),
            image: p.data.sprites.other.home.front_default,
            hp: p.data.stats[0].base_stat,
            attack: p.data.stats[1].base_stat,
            defense: p.data.stats[2].base_stat,
            speed: p.data.stats[5].base_stat,
            height: p.data.height,
            weight: p.data.weight
        }
    });
    //console.log(apiResult)    
    return apiResult;
    
}
//* POKEMON DE LA BASE DE DATOS
const getDbInfo = async () => {
    let dbInfo = await Pokemon.findAll({
        include: 
            {
                model: Type,
                attributes: ['name'],
                through: {
                    attributes: [],
                }
            }
    })  
        
    return dbInfo;
}
//* ASOCIO LOS POKEMON DE LA API Y LA DE LA BASE DE DATOS
const getAllPokemon = async () => {
    let apiInfo = await getApiInfo();
    let dbInfo = await getDbInfo();
    let infoTotal = dbInfo.concat(apiInfo);
    return infoTotal;

}
//* TRAIGO TODOS LOS POKEMON TANTO DE API COMO DE BASE DE DATOS
// router.get('/', async (req, res, next) => {
//     try {
//         const allPoke = await getAllPokemon();
//         res.send (allPoke);
//     } 
//     catch (error) {
//         next();
//     }
// })

//*PARA RELACIONAR LAS TABLAS DE ID POKEMON Y ID DE TYPE
router.post('/:pokemonId/type/:typeId', async (req, res, next) => {
    try {
        const {pokemonId, typeId} = req.params; //! destructuring de datos que me pasan por parametros
        const pokemon = await Pokemon.findByPk(pokemonId); //! busco el pokemon por id
        await pokemon.addType(typeId); //! agrego el tipo al pokemon usando mixin de secualize
        res.status(201).send(pokemon)
    }
    catch (error) {
        next(error)
    }       
});



router.get('/:id', async (req, res, next) => {
    const {id} = req.params
    let pokeId;
   
       if(id.length > 6) {
           try {
               const resDb= await Pokemon.findByPk(id, {include : Type})
               pokeId = {
                   id: resDb.id,
                   name: resDb.name,
                   types: resDb.types.map(t => t.name),   
                   image: resDb.image,
                   hp: resDb.hp,
                   attack: resDb.attack,
                   defense: resDb.defense,
                   speed: resDb.speed,
                   height: resDb.height,
                   weight: resDb.weight

                }
                res.json(pokeId)

               
           } 
           catch (error) {
               res.status(404).send({msg:'ID Pokemon not found'})
               
            }
                    
        } 
        else {
            try {
                const resPoke= await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
                pokeId = {
                    id: resPoke.data.id,
                    name: resPoke.data.name,
                    types: resPoke.data.types.map(t => t.type.name),
                    image: resPoke.data.sprites.other.home.front_default,
                    hp: resPoke.data.stats[0].base_stat,
                    attack: resPoke.data.stats[1].base_stat,
                    defense: resPoke.data.stats[2].base_stat,
                    speed: resPoke.data.stats[5].base_stat,
                    height: resPoke.data.height,
                    weight: resPoke.data.weight
                
                }
           
                res.status(200).send(pokeId)
            } 
            catch (err) {
                res.status(404).send({msg:'ID Pokemon not found'})
            }
        }
})

router.get('/', async(req,res)=>{
    const {name}= req.query
    try {
        
        if (name) {
            const pokeBd = await Pokemon.findAll({
                where: {
                    name: name,
                },
                include: {
                    model: Type,
                },
            })
            if (pokeBd != 0) {
                let respBd = pokeBd.map(p => {
                    return {
                        id: p.id,
                        name: p.name,
                        types: p.types.map(t => t.name),
                        image: p.image,
                        hp: p.hp,
                        attack: p.attack,
                        defense: p.defense,
                        speed: p.speed,
                        height: p.height,
                        weight: p.weight
                    }
                })
            res.status(200).send(respBd)
            }
            else {
                const pokeApi = (await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`))
                let respApi = [
                    {
                        id: pokeApi.data.id,
                        name: pokeApi.data.name,
                        types: pokeApi.data.types.map(t => t.type.name),
                        image: pokeApi.data.sprites.other.home.front_default,
                        hp: pokeApi.data.stats[0].base_stat,
                        attack: pokeApi.data.stats[1].base_stat,
                        defense: pokeApi.data.stats[2].base_stat,
                        speed: pokeApi.data.stats[5].base_stat,
                        height: pokeApi.data.height,
                        weight: pokeApi.data.weight
                    }
                ]
                res.status(200).send(respApi)
            
            }
        }
        else {
                          
            try {
                const allPoke = await getAllPokemon();
                res.json(allPoke);
            } 
            catch (error) {
                next(error);
            }
        }
    }
    catch (error) {
        res.status(404).send({msg:"Pokemon's name not found"})
    }
  
});



//* PARA AGREGAR LOS POKEMON QUE CREO A LA BASE DE DATOS
router.post('/', async (req, res, next) => {
    try {
        const {name, hp, attack, defense, speed, height, weight, image} = req.body
        const newPokemon = await Pokemon.create({
            name,
            hp,
            attack,
            defense,
            speed,
            height,
            weight,
            image
          
        })
        res.send(newPokemon)

    } catch (error) {
        next(error)
    }
})

module.exports = router

//*DROP TABLE IF EXISTS nombre; para borrar una tabla que dice que no existe