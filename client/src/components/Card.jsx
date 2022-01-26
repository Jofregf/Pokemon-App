import React from "react";
import "./Card.css";

export default function Card({ name, image, type }) {
  return (
    <div className="card-container">
      <h3 className="pokemon-name">{name}</h3>
      <img className="pokemon-image" src={`${image}`} alt={name} />
      <div className="card-body">
        {Array.isArray(type) ? (
          
          type.map((tipo,i) => 
          <h4 key={i} className="pokemon-type">{tipo.name}</h4>)
        ) : type ? (
          <h4 key={type}>{type}</h4>
        ) : (
          <h4>No types</h4>
        )}{" "}
      </div>
    </div>
  );
}