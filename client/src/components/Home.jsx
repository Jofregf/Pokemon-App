import React from 'react';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getPokemons,getByName,  dbOrApi, filterByTypes, order, getTypes} from '../actions';
import { Link } from 'react-router-dom';
import Card from './Card';




export default function Home () {

    const dispatch = useDispatch();
    const allPoke = useSelector((state) => state.pokemons);
    const loading = useSelector((state) => state.loading);
    const types = useSelector((state) => state.types);
    //console.log('estos son los tipos', types);
    const [name, setName] = useState('');
    const [orden, setOrden] = useState(''); //arranca este estado local vacio
   

    useEffect(() => {
        if (!allPoke.length && !loading.loading) {
            dispatch(getPokemons())
            dispatch(getTypes())
   
        }
    },[dispatch])
    
    function handleClick(event) {
        event.preventDefault();
        dispatch(getPokemons());
    }

    //////////////////////////////////////////////////////////////////////
    //! Search bar
    /////////////////////////////////////////////////////////////////
    function handleInputChange(event) {
        event.preventDefault();
        setName(event.target.value.toLowerCase());
        setCurrentPage(0);
        console.log(name);
      }
    
      function handleSubmit(event) {
        event.preventDefault();
        dispatch(getByName(name));
        setCurrentPage(0);
        setName("");
      }
    /////////////////////////////////////////////////////////////////////
    //! PAGINACION
    /////////////////////////////////////////////////////////////////////
       
    let [currentPage, setCurrentPage] = useState(0);
    let prox = 0;
    const paginacion = () => {
        if((prox === 0) && (currentPage === 0)){
                   
            if (allPoke.length) {
                prox = prox + 9;
                return allPoke.slice(currentPage, currentPage + 9);
            }
            if(allPoke.info) return allPoke;
            return [];
        }   
        if(currentPage >= 9) {
            
            if(allPoke.length) {
                return allPoke.slice(currentPage, currentPage + 12);
            }
            if(allPoke.info) return allPoke;
            return [];
        }
    }
    
    const nextPage = () => {
        if(allPoke.length > currentPage + 12) {
            if(prox === 9) {
                currentPage = currentPage + 9;
                setCurrentPage(currentPage);
            } else {
                setCurrentPage(currentPage + 12)
            }
        }
        
    }
    
    const prevPage = () => {
        if(currentPage > 9) {
            setCurrentPage(currentPage - 12);
        }
        if(currentPage === 9) {
            setCurrentPage(currentPage -9);
        }
    }
    const arrayPokemon = paginacion();

    //////////////////////////////////////////////////////////////
    //! FILTRO CREADOS O API
    //////////////////////////////////////////////////////////////
    function handleDbOrApi(event) {
        event.preventDefault();
        dispatch(dbOrApi(event.target.value));
    }

    //////////////////////////////////////////////////////////////
    //! FILTRO POR TIPOS
    //////////////////////////////////////////////////////////////
    
    function handleFilterType(event) {
        event.preventDefault();
        dispatch(filterByTypes(event.target.value));
        setCurrentPage(0);
            
    }

    //////////////////////////////////////////////////////////////
    //! ORDENAR POR NOMBRE Y POR ATAQUE
    //////////////////////////////////////////////////////////////
      
    function handleOrder(event) {
        event.preventDefault();
        dispatch(order(event.target.value));
        setCurrentPage(0);// al hacer el ordenamiento que se setee en la primera pagina
        setOrden(`Ordenar por: ${event.target.value}`);//para cdo setea la pagina, modifique el estado local y se renderice ordenado de tal forma
    }
    
    return (
        <div>
                        
            <div className="container">
                <input id="formulario" value={name}
                type="text"
                placeholder="Buscar pokemon..."           
                onChange={e => {handleInputChange(e)}}            
                />
                <button type="submit" onClick={e => {handleSubmit(e)}}>Buscar</button>
            </div>

            <div> 
                <Link to="/create">
                    <button>Pokemon Create</button>
                </Link>  
            </div>
                        
            <div>
                <select onChange={event => handleDbOrApi(event)}>
                    <option value='all'>All</option>
                    <option value='created'>Created</option>
                    <option value='api'>Api</option>
                </select>
                
                <select onChange={event => handleOrder(event)}>
                    <option value='asc'>A-Z</option> //* el value permite que se acceda y pregunte que haga algo
                    <option value='desc'>Z-A</option>
                </select>
                
                <select onChange={event => handleOrder(event)}>
                    <option value='att-asc'>Weak</option> 
                    <option value='att-desc'>Strong</option>
                </select>
                
                <select onChange= {event => handleFilterType(event)}>
                    <option>All</option>
                    {types && types.map((type, index) => {
                        return <option key={index} value={type.name}>{type.name}</option>
                    })}
                </select>
               
                <div>   
                    <button onClick = {prevPage}>Prev</button>
                    <button onClick = {nextPage}>Next</button>
                </div>

                <div>
                    <Link to= '/pokemon'></Link>
                    <button onClick={event => {handleClick(event)}}>Reload</button>
                </div>

                
                <div className="card">
                
                {loading.loading ? <h1>Loading...</h1> :
                     arrayPokemon?.map ((poke) => {
                        return (
                        <Link to={"/home/" + poke.id}>
                       <Card name={poke.name} image={poke.image? poke.image : <img src='../Image/PokeDefault.png'/>} type={poke.types} />
                        </Link>
                        )
                    
                })}
                
                </div>
                {/*console.log(allPoke)*/}
                
            </div>
        </div>
    )
}
