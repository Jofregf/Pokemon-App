import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetails } from "../actions";
import { useEffect } from "react";
import { useParams } from "react-router";
import { useState } from "react";


export default function Details () {
    


    const { id } = useParams();

    const dispatch = useDispatch();
    
    const [details, setDetails] = useState(id);

    useEffect(() => {
        dispatch(getDetails(details));
    }, [dispatch]);

    const myDeta = useSelector(state => state.pokeDetails);
    console.log(myDeta);

    return (
        
        <div>
        
            { 
            myDeta?
            <div>
            <h1>{myDeta.name}</h1>
            <img src={myDeta.img? myDeta.img : myDeta.image}/>
            <h3>Type:
            {Array.isArray(myDeta.types) ?
            myDeta.types.map(t => (
            <h3>{t.name} </h3>)) : <h1>Sin Tipos</h1>}</h3>
            <p>HP: {myDeta.hp}</p>
            <p>Attack: {myDeta.attack}</p>
            <p>Defense: {myDeta.defense}</p>
            <p>Speed: {myDeta.speed}</p>
            <p>Weight: {myDeta.weight}</p>
            <p>Height: {myDeta.height}</p>
            </div> : <h2>Loading...</h2>
            
            }
            <Link to="/home">
                <button>Back</button>
            </Link>
             
               
            
        </div>
        
    )

}
