import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetails } from "../actions";
import { useEffect } from "react";
import { useParams } from "react-router";
import { useState } from "react";
import './Detail.css'

export default function Details() {
  const { id } = useParams();

  const dispatch = useDispatch();

  const [details, setDetails] = useState(id);

  useEffect(() => {
    dispatch(getDetails(details));
  }, [dispatch]);

  const myDeta = useSelector((state) => state.pokeDetails);
  console.log(myDeta);

  return (
    <div className="detail-container">
      {myDeta ? (
        <div className='details-info'>
          <div className="detail-name">
            <h1>{myDeta.name}</h1>
          </div>
          <div className="detail-img">
            <img src={myDeta.img ? myDeta.img : myDeta.image} alt={myDeta.name}/>
          </div>
          <div className="detail-type">
            <div>        
            <h3 className="type-title">Type</h3>
            </div>
          
          <div>
            {Array.isArray(myDeta.types) ? (
              myDeta.types.map((t) => <h3 className="type-list">{t.name} </h3>)
            ) : (
              <h1 className="type-list">Sin Tipos</h1>
            )}
          </div>
          <div className="stats-list">
            <p>HP: {myDeta.hp} 🤍</p>
            <p>Attack: {myDeta.attack}⚔</p>
            <p>Defense: {myDeta.defense}🛡</p>
            <p>Speed: {myDeta.speed}💨</p>
            <p>Weight: {myDeta.weight}⚖</p>
            <p>Height: {myDeta.height}🔺</p>
          </div>
          </div>
        </div>
      ) : (
        <h2>Loading...</h2>
      )}
      <Link to="/home">
        <button className="btn-back">Back</button>
      </Link>
    </div>
  );
}
