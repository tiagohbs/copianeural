import React from 'react';
import { GameProvider } from './contexts/GameContext';
import GameRouter from './components/GameRouter';
import ParticleBackground from './components/ParticleBackground';

/**
 * Componente principal da aplicação RPG Medieval Espacial
 * Gerencia o contexto global do jogo e renderiza o roteador principal
 */
function App() {
  return (
    <GameProvider>
      <div className="min-h-screen relative">
        {/* Fundo de partículas animadas */}
        <ParticleBackground />
        
        {/* Roteador principal do jogo */}
        <GameRouter />
      </div>
    </GameProvider>
  );
}

export default App;