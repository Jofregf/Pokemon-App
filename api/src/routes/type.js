const express = require('express');
const { Type } = require("../db");
const router = express.Router();
const axios = require("axios");
router.use(express.json());



router.get('/', async (req, res, next) => {
    try {
        const typesCant = await Type.count() //! cuenta los tipos de pokemon que hay en tabla type
        if (typesCant === 0) { //! si no hay tipos en la tabla type
            const types = await axios.get('https://pokeapi.co/api/v2/type/'); //! obtiene los tipos de pokemon de la api
            let typesApi = types.data.results //! pongo los tipos en un array
            if (typesApi) { //! si no está vacio, guardo los tipos en la tabla types
                typesApi = typesApi.map (t => {
                    return {
                        id: t.id,
                        name: t.name,
                        
                    }
                })
            }
            await Type.bulkCreate(typesApi) //! creo los tipos en la tabla type
            res.send(typesApi.map(p => p.name))
        } else {
            let typesDb = await Type.findAll() //! obtengo los tipos de la tabla type
            let typesDBase = typesDb.map(t => {
                return {
                    id: t.id,
                    name: t.name,
                }

            })
            res.send(typesDBase)
        } 
    } catch (err) {
        next(err)
    }
    
});



module.exports = router;