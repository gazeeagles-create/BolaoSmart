import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header'; // Importando o componente Header
import Footer from './components/Footer'; // Importando o componente Footer
import HomePage from './pages/HomePage'; // Página inicial
import BolaoPage from './pages/BolaoPage'; // Página de bolão
import AboutPage from './pages/AboutPage'; // Página sobre
import ImageUpload from './components/ImageUpload'; // Componente de upload de imagem

// O componente App é o ponto de entrada da aplicação React
const App: React.FC = () => {
  return (
    <Router>
      {/* Cabeçalho do site */}
      <Header />

      {/* Definindo as rotas da aplicação */}
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} /> {/* Página inicial */}
          <Route path="/bolao/:id" element={<BolaoPage />} /> {/* Página do bolão */}
          <Route path="/about" element={<AboutPage />} /> {/* Página sobre */}
          <Route path="/upload" element={<ImageUpload />} /> {/* Página de upload de imagem */}
        </Routes>
      </main>

      {/* Rodapé do site */}
      <Footer />
    </Router>
  );
};

export default App;
