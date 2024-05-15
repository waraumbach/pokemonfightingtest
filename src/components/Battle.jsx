// src/components/Battle.jsx

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const Battle = () => {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [opponent, setOpponent] = useState(null);
  const [result, setResult] = useState('');

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        setPokemon(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchRandomOpponent = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100');
        const randomOpponent = response.data.results[Math.floor(Math.random() * response.data.results.length)];
        const opponentData = await axios.get(randomOpponent.url);
        setOpponent(opponentData.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPokemon();
    fetchRandomOpponent();
  }, [name]);

  const handleBattle = () => {
    if (pokemon && opponent) {
      const pokemonPower = pokemon.base_experience;
      const opponentPower = opponent.base_experience;
      if (pokemonPower > opponentPower) {
        setResult(`${pokemon.name} wins!`);
      } else {
        setResult(`${opponent.name} wins!`);
      }
    }
  };

  if (!pokemon || !opponent) return <p>Loading...</p>;

  return (
    <div>
      <h1>Battle with {pokemon.name}</h1>
      <div>
        <h2>{pokemon.name}</h2>
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      </div>
      <div>
        <h2>Opponent: {opponent.name}</h2>
        <img src={opponent.sprites.front_default} alt={opponent.name} />
      </div>
      <button onClick={handleBattle}>Battle!</button>
      {result && <p>{result}</p>}
      <Link to="/fighting-pokemon">Back to Fighting Pokémon</Link>
    </div>
  );
};

export default Battle;
