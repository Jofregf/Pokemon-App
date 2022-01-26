import axios from 'axios';

//* aca unimos back y front

export function getPokemons () {
    return async function (dispatch) {
        try {
            
            dispatch({ type: "LOADING", payload: 'Buscando Pokémon...' })
            let response = await axios.get('http://localhost:3001/pokemon')
              dispatch({ type: "GET_POKEMONS", payload: response.data })
        } catch (error) {
            console.log(error)
            
        }
               
    }

}

export function getByName (payload) {
    return async function (dispatch) {
        try {
            const pokeName = await axios.get('http://localhost:3001/pokemon/?name=' + payload);
            dispatch ({
                type: 'GET_BY_NAME',
                payload: pokeName.data
            });
        } catch (error) {
            console.log(error)
        }
    }
}

export function getDetails (id) {
   
    return async function (dispatch) {
        try {
            const pokeDetails = await axios.get('http://localhost:3001/pokemon/' + id);
            console.log(pokeDetails.data, 'desde action2')
            dispatch ({
                type: 'GET_DETAILS',
                payload: pokeDetails.data
            });
        } catch (error) {
            console.log(error)
        }
    }
}

export function getTypes () {
    return async function (dispatch) {
        try {
            const pokeTypes = await axios.get('http://localhost:3001/type');
            dispatch ({
                type: 'GET_TYPES',
                payload: pokeTypes.data
            });
        } catch (error) {
            console.log(error)
        }
    }
}



export function createPokemon(pokemon) {
    return async function (dispatch) {
        try {
            dispatch({ type: "LOADING", payload: 'Creando Pokémon...' })
            const newPokemon = await axios.post('http://localhost:3001/pokemon', pokemon);
            dispatch({
                type: "CREATE_POKEMON",
                payload: newPokemon.data 
            });
        } 
        catch (error) {
            console.log(error.message)
        }
    }
}


export function dbOrApi (payload) {
    return async function (dispatch) {
        try {
            dispatch ({
                type: 'DB_OR_API',
                payload,
            });
        }
        catch (error) {
            console.log(error)
        }
    };
}

export function filterByTypes (payload) {
    
    return async function (dispatch) {
        try {
            dispatch ({
                type: 'FILTER_BY_TYPES',
                payload
            });
        }
        catch (error) {
            console.log(error)
        }    
      
    }
}

export function order(payload) {
    return async function (dispatch) {
        try {
            dispatch ({
                type: 'ORDER',
                payload,
            });
        }
        catch (error) {
            console.log(error)
        }    
    }
}

export function filterSpeed(payload) {
    return async function (dispatch) {
        try {
            dispatch ({
                type: 'FILTER_SPEED',
                payload
            })
        }
        catch (error) {
        console.log(error)
        }
    }
}