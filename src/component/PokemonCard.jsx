import React from 'react';
import './poke.css';
const PokemonCard = (props) => {
    
return(
   
        <div className="card" >
            <div className="card_img">
                <img src={props.pokemon.sprites.front_default} alt=""/>
            </div>
            <div className="card_name">
            {props.pokemon.name}
            </div>

        </div>
     
)


}


export default PokemonCard;