// src/components/FightingPokemon.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const FightingPokemon = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/type/fighting/');
        const fightingPokemon = response.data.pokemon.map(p => p.pokemon);
        setPokemon(fightingPokemon);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Fighting-Type Pokémon</h1>
      <ul>
        {pokemon.map((p) => (
          <li key={p.name}>
            <Link to={`/pokemon/${p.name}`}>{p.name}</Link>
            <Link to={`/battle/${p.name}`}>
              <button>Battle to Win</button>
            </Link>
          </li>
        ))}
      </ul>
      <Link to="/">Back to Home</Link>
    </div>
  );
};

export default FightingPokemon;
