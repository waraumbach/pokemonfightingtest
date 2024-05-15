
// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import FightingPokemon from './components/FightingPokemon';
import RandomFightingPokemon from './components/RandomFightingPokemon';
import PokemonDetail from './components/PokemonDetail';
import Battle from './components/Battle';


const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/fighting-pokemon">Fighting Pokémon</Link></li>
            <li><Link to="/random-fighting-pokemon">Random Fighting Pokémon</Link></li>
            

          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fighting-pokemon" element={<FightingPokemon />} />
          <Route path="/random-fighting-pokemon" element={<RandomFightingPokemon />} />
          <Route path="/pokemon/:name" element={<PokemonDetail />} />
          <Route path="/battle/:name" element={<Battle />} />
        </Routes>
      </div>
    </Router>
  );
};

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Pokémon Info App</h1>
    </div>
  );
};

export default App;
