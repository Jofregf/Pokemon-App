import React from "react";
import { Link } from "react-router-dom";
import "./Landing.css";
import LogoPokemon from "../Image/LogoPokemon.png";

export default function Landing() {
  return (
    <div className="landing">
      <img className="logo" src={LogoPokemon} alt="logo" />
      {/*<div classNameName="landing-text">
                <h1>Welcome to the world of Pokemon</h1>
            </div>*/}
      <div className="container-pokeball">
        <div className="pokeball">
          <Link to="/home">
            <div className="btn-pokeball"> </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
