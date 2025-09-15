import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBolaoDetails } from '../services/bolaoService';
import LoadingSpinner from '../components/LoadingSpinner';

const BolaoPage = () => {
  const { id } = useParams();
  const [bolao, setBolao] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBolao = async () => {
      try {
        const response = await getBolaoDetails(id);
        setBolao(response);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBolao();
  }, [id]);

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <h1>{bolao?.nome}</h1>
      <p>{bolao?.descricao}</p>
      {/* Adicione mais detalhes aqui */}
    </div>
  );
};

export default BolaoPage;
