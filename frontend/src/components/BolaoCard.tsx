import React from 'react';
import { Link } from 'react-router-dom';

const BolaoCard = () => {
  return (
    <div className="bolao-card">
      <h2>Bolão da Mega-Sena</h2>
      <p>Participe do nosso bolão e tenha mais chances de ganhar!</p>
      <Link to="/bolao/123">Entrar no Bolão</Link>
    </div>
  );
};

export default BolaoCard;
