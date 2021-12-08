import React from "react";
import { Link } from "react-router-dom";
import "./Landing.css";
import LogoPokemon from "../Image/LogoPokemon.png";

export default function Landing() {
  return (
    <div className="landing">
      <img className="logo" src={LogoPokemon} alt="logo" />
      {/*<div className="landing-text">
                <h1>Welcome to the world of Pokemon</h1>
            </div>*/}
      <div class="container-pokeball">
        <div class="pokeball">
          <Link to="/home">
            <div class="btn-pokeball"> </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
