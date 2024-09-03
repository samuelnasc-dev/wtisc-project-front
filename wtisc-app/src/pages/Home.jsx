import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Bem-vindo à Maratona de Fundamentos de Programação</h1>
      <p>Explore as funcionalidades do evento.</p>
      <Link to="/users">Ver Lista de Usuários</Link>
    </div>
  );
};

export default Home;