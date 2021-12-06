import React from 'react';

import { useEffect } from "react";

export default function Card({name, image, type}) {
    return (
        <div className="card-container">
            <h3 className="card-name">{name}</h3>
            <img className ="card-body"img src={`${image}`} alt={name} width="200px" height="250px" />

            {Array.isArray(type) ?
            type.map(tipo => (
            <h4 >{tipo.name}</h4>)): 
            type ? (<h4>{type}</h4>) : (<h4 > Sin Tipo</h4>)
        }

        </div>
    );
}

