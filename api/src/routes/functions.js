//aca agregare las funciones necesarias para las rutas
//* BUSCO LOS ID DE LOS POKEMON EN DATA BASE
// const getIdDb = async () => {
    
//     const resDb= await Pokemon.findByPk(id, {include : Type})
//     console.log(resDb)
//     pokeId = {
//         id: resDb.id,
//         name: resDb.name,
//         types: resDb.types.map(t => t.name),   
//         image: resDb.image,
//         hp: resDb.hp,
//         attack: resDb.attack,
//         defense: resDb.defense,
//         speed: resDb.speed,
//         height: resDb.height,
//         weight: resDb.weight
//     }
//     console.log (pokeId);
//     return pokeId;
// }


// // //* BUSCO LOS ID DE LOS POKEMON EN API
// const getIdApi = async () => {
//     const idApi = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
//     const pokeId = {
//         id: idApi.data.id,
//         name: idApi.data.name,
//         types: idApi.data.types.map(t => t.type.name),
//         image: idApi.data.sprites.other.home.front_default,
//         hp: idApi.data.stats[0].base_stat,
//         attack: idApi.data.stats[1].base_stat,
//         defense: idApi.data.stats[2].base_stat,
//         speed: idApi.data.stats[5].base_stat,
//         height: idApi.data.height,
//         weight: idApi.data.weight

//     }
//     return pokeId;
// }

// //* TRAER LOS POKEMON CUYO ID ME PASEN X PARAMS
// router.get('/:id', async (req, res, next) => {
//     const {id} = req.params;
//     if(id.length > 7) {
//     console.log ('No mi ciela')
//     console.log(id)
//     } else {
//         let idApi = await getIdApi();
//                 console.log(idApi)
//                 res.json(idApi);
//     }
//     // try {
//     //     if (id.length > 7) {
//     //         let idDb = await getIdDb();
//     //         console.log(idDb)
//     //         res.json(idDb);
//     //     } else {
//     //         let idApi = await getIdApi();
//     //         console.log(idApi)
//     //         res.json(idApi);
//     //     }
//     // } catch (error) {
//     //     res.status(404).send("Pokemon's Id not found");
        
//     // }
// })