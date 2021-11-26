const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
//const axios = require('axios')

const router = Router();
const pokemonRouter = require('./pokemon.js');
const typeRouter = require('./type.js');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
//! aca estamos generando los middlewares para cada ruta
router.use('/pokemon', pokemonRouter);
router.use('/type', typeRouter);

module.exports = router;
