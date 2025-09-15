import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <h1>BolãoSmart</h1>
      <nav>
        <Link to="/">Início</Link>
        <Link to="/about">Sobre</Link>
      </nav>
    </header>
  );
};

export default Header;
