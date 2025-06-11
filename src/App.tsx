import { FC } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import NewsSection from './components/NewsSection';
import FeaturesSection from './components/FeaturesSection';
import Footer from './components/Footer';
import Cadastro from './pages/Cadastro';
import Verificacao from './pages/Verificacao';
import CriarPersonagem from './pages/CriarPersonagem';

/**
 * Componente principal da aplicação RPG Medieval Espacial
 * Gerencia o contexto global do jogo e renderiza o roteador principal
 */
const Home: FC = () => {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <NewsSection />
        <FeaturesSection />
      </main>
      <Footer />
    </>
  );
};

const App: FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-black text-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/verificacao" element={<Verificacao />} />
          <Route path="/criar-personagem" element={<CriarPersonagem />} />
          {/* Adicione mais rotas conforme necessário */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;