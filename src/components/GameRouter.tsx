import React, { useEffect } from 'react';
import { useGame } from '../contexts/GameContext';
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import CharacterCreationScreen from './screens/CharacterCreationScreen';
import CharacterSelectionScreen from './screens/CharacterSelectionScreen';
import GameHubScreen from './screens/GameHubScreen';

/**
 * Roteador principal do jogo
 * Gerencia a navegação entre as diferentes telas
 */
function GameRouter() {
  const { state, dispatch } = useGame();

  // Carregar dados salvos ao inicializar
  useEffect(() => {
    dispatch({ type: 'LOAD_CHARACTERS' });
  }, [dispatch]);

  // Renderizar a tela atual baseada no estado
  const renderCurrentScreen = () => {
    switch (state.currentScreen) {
      case 'splash':
        return <SplashScreen />;
      case 'login':
        return <LoginScreen />;
      case 'character-creation':
        return <CharacterCreationScreen />;
      case 'character-selection':
        return <CharacterSelectionScreen />;
      case 'game-hub':
        return <GameHubScreen />;
      default:
        return <SplashScreen />;
    }
  };

  return (
    <div className="min-h-screen">
      {renderCurrentScreen()}
    </div>
  );
}

export default GameRouter;