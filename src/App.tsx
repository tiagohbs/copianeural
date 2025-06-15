import { FC } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import NewsSection from './components/NewsSection';
import FeaturesSection from './components/FeaturesSection';
import Footer from './components/Footer';
import CharacterSelectionScreen from './components/screens/CharacterSelectionScreen';
import LoginScreen from './components/screens/LoginScreen';
import CharacterCreationScreen from './components/screens/CharacterCreationScreen';
import VerificacaoScreen from './components/screens/VerificacaoScreen';
import GameLayout from './components/layout/GameLayout';

// Importações das telas de combate
import HuntScreen from './components/screens/combat/HuntScreen';
import TournamentScreen from './components/screens/combat/TournamentScreen';
import DungeonScreen from './components/screens/combat/DungeonScreen';
import ExploreScreen from './components/screens/combat/ExploreScreen';

// Importações das telas de funcionalidades
import MissionsScreen from './components/screens/features/MissionsScreen';
import MarketScreen from './components/screens/features/MarketScreen';
import AllianceScreen from './components/screens/features/AllianceScreen';
import RankingScreen from './components/screens/features/RankingScreen';

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
          {/* Rotas públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/cadastro" element={<LoginScreen />} />
          <Route path="/verificacao" element={<VerificacaoScreen />} />
          <Route path="/criar-personagem" element={<CharacterCreationScreen />} />
          <Route path="/selecao-personagem" element={<CharacterSelectionScreen />} />
          
          {/* Rotas do jogo com layout fixo */}
          <Route path="/game" element={<GameLayout />}>
            {/* Rota padrão - redireciona para caça */}
            <Route index element={<HuntScreen />} />
            
            {/* Rotas de combate */}
            <Route path="hunt" element={<HuntScreen />} />
            <Route path="tournament" element={<TournamentScreen />} />
            <Route path="dungeon" element={<DungeonScreen />} />
            <Route path="explore" element={<ExploreScreen />} />
            
            {/* Rotas de funcionalidades */}
            <Route path="missions" element={<MissionsScreen />} />
            <Route path="market" element={<MarketScreen />} />
            <Route path="alliance" element={<AllianceScreen />} />
            <Route path="ranking" element={<RankingScreen />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;