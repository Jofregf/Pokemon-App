import React from 'react';
import { useState, useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {createPokemon, getTypes} from '../actions/index';
import { useDispatch, useSelector } from 'react-redux';

function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = 'Name is required';

  } else if (!input.hp || isNaN(input.hp)) {
    errors.hp = 'HP is required';

  } else if (!input.attack || isNaN(input.attack)) {
    errors.attack = 'Attack is required';

  } else if (!input.defense || isNaN(input.defense)) {
    errors.defense = 'Defense is required';

  } else if (!input.speed || isNaN(input.speed)) {
    errors.speed = 'Speed is required';

  } else if (!input.height || isNaN(input.height)) {
    errors.height = 'Height is required';

  } else if (!input.weight || isNaN(input.weight)) {
    errors.weight = 'Weight is required';

  } else if (!input.type) {
    errors.type = 'Type is required';
  }
    return errors;
    
}

const eliminarSeleccion = (input, sel) => {
    if (input.includes(sel)) {
        const array1 = input.filter(num => num !== sel)
        return array1
    } else {
        const array2 = input.concat(sel)
        return array2
    }

}


export default function Create() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const types = useSelector((state) => state.types);
    const[errors, setErrors] = useState({});

    const [input, setInput] = useState({ //esto es lo que necesitará el post
        name: '',
        hp: 0,
        attack: 0, 
        defense: 0,
        speed: 0,
        height: 0,
        weight: 0,
        image: '',
        types: []

    });

    
    function handleType(event) {
        setInput({
            ...input,
            types: eliminarSeleccion(input.types, event.target.value)
        });
    }

    function handleChange(event) {
        setInput({
            ...input,
            [event.target.name]: event.target.value
        })
        setErrors(validate({
            ...input,
            [event.target.name]: event.target.value
        }))
        //console.log(input,'desde pokemoncreate')
    }

    
    function handleSubmit(event) {
        event.preventDefault();
        //console.log(input);
        dispatch(createPokemon(input));
        alert('Pokemon created');
        setInput({
            name: '',
            hp: 0,
            attack: 0,
            defense: 0,
            speed: 0,
            height: 0,
            weight: 0,
            image: '',
            types: []
        });
        navigate('/home');

    }

    useEffect(() => {
        dispatch(getTypes());
        
    }, []);
    
    return (
        <div>
            <div>
                <Link to='/home'>Back</Link>
            </div>
            <div>
            <h1>Create your Pokemon</h1>
            </div>
            <div>
            <form onSubmit = {(event) => handleSubmit(event)}>
                <div>
                    <label>Name</label>
                    <input
                    type="text"
                    value={input.name}
                    name = 'name'
                    onChange={(event) => handleChange(event)}
                    />
                    {errors.name && <p>{errors.name}</p>}
                </div>
                <div>
                    <label>HP</label>
                    <input
                    type="number"
                    value={input.hp}
                    name = 'hp'
                    onChange={(event) => handleChange(event)}
                    />
                    {errors.hp && <p>{errors.hp}</p>}
                </div>
                <div>
                    <label>Attack</label>
                    <input
                    type="number"
                    value={input.attack}
                    name = 'attack'
                    onChange={(event) => handleChange(event)}
                    />
                    {errors.attack && <p>{errors.attack}</p>}
                </div>
                <div>
                    <label>Defense</label>
                    <input
                    type="number"
                    value={input.defense}
                    name = 'defense'
                    onChange={(event) => handleChange(event)}
                    />
                    {errors.defense && <p>{errors.defense}</p>}
                </div>
                <div>
                    <label>Speed</label>
                    <input
                    type="number"
                    value={input.speed}
                    name = 'speed'
                    onChange={(event) => handleChange(event)}
                    />
                    {errors.speed && <p>{errors.speed}</p>}
                </div>
                <div>
                    <label>Height</label>
                    <input
                    type="number"
                    value={input.height}
                    name = 'height'
                    onChange={(event) => handleChange(event)}
                    />
                    {errors.height && <p>{errors.height}</p>}
                </div>
                <div>
                    <label>Weight</label>
                    <input
                    type="number"
                    value={input.weight}
                    name = 'weight'
                    onChange={(event) => handleChange(event)}
                    />
                    {errors.weight && <p>{errors.weight}</p>}
                </div>
                <div>
                    <label>Image</label>
                    <input
                    type="url"
                    value={input.image}
                    name = 'image'
                    onChange={(event) => handleChange(event)}
                    />
                </div>
                <div>
                    
                   {types.map((t) => (
                       <div className="checkbox-types">
                           <div className='check'>
                       <input type="checkbox" value={t.id}
                       onChange={(event) => handleType(event)}/>
                          {t.name}
                          </div>
                          </div>
                   ))}
                    
                </div>
                <div>
                    <button type="submit">Create</button>
                </div>



               
            </form>
            </div>

            {console.log(input, 'desde pokemoncreate')}
        </div>

       
    )
}