import { FC } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import NewsSection from './components/NewsSection';
import FeaturesSection from './components/FeaturesSection';
import Footer from './components/Footer';
import CriarPersonagem from './pages/CriarPersonagem';
import CharacterSelectionScreen from './components/screens/CharacterSelectionScreen';
import GameHubScreen from './components/screens/GameHubScreen';
import LoginScreen from './components/screens/LoginScreen';
import CharacterCreationScreen from './components/screens/CharacterCreationScreen';
import VerificacaoScreen from './components/screens/VerificacaoScreen';

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
          <Route path="/cadastro" element={<LoginScreen />} />
          <Route path="/verificacao" element={<VerificacaoScreen />} />
          <Route path="/criar-personagem" element={<CharacterCreationScreen />} />
          <Route path="/selecao-personagem" element={<CharacterSelectionScreen />} />
          <Route path="/jogo" element={<GameHubScreen />} />
          {/* Adicione mais rotas conforme necessário */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;