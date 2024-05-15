// src/components/RandomFightingPokemon.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RandomFightingPokemon = () => {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRandomPokemon = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/type/fighting/');
        const fightingPokemon = response.data.pokemon.map(p => p.pokemon);
        const randomPokemon = fightingPokemon[Math.floor(Math.random() * fightingPokemon.length)];
        const randomPokemonData = await axios.get(randomPokemon.url);
        setPokemon(randomPokemonData.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRandomPokemon();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Random Fighting-Type Pokémon</h1>
      {pokemon && (
        <div>
          <h2>{pokemon.name}</h2>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          <p>Height: {pokemon.height}</p>
          <p>Weight: {pokemon.weight}</p>
          
        </div>
      )}
    </div>
  );
};

export default RandomFightingPokemon;