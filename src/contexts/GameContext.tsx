import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { GameState, GameAction, Character } from '../types/game';

// Estado inicial do jogo
const initialState: GameState = {
  currentScreen: 'splash',
  isLoading: false,
  user: null,
  characters: [],
  selectedCharacter: null,
  notifications: [],
  messages: []
};

// Contexto do jogo
const GameContext = createContext<{
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
} | null>(null);

/**
 * Reducer para gerenciar o estado do jogo
 */
function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'SET_SCREEN':
      return { ...state, currentScreen: action.payload };
    
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    
    case 'SET_USER':
      return { ...state, user: action.payload };
    
    case 'ADD_CHARACTER':
      const newCharacters = [...state.characters, action.payload];
      // Salvar no localStorage
      localStorage.setItem('rpg_characters', JSON.stringify(newCharacters));
      return { ...state, characters: newCharacters };
    
    case 'DELETE_CHARACTER':
      const filteredCharacters = state.characters.filter(char => char.id !== action.payload);
      localStorage.setItem('rpg_characters', JSON.stringify(filteredCharacters));
      return { ...state, characters: filteredCharacters };
    
    case 'SELECT_CHARACTER':
      localStorage.setItem('rpg_selected_character', action.payload);
      return { 
        ...state, 
        selectedCharacter: state.characters.find(char => char.id === action.payload) || null 
      };
    
    case 'LOAD_CHARACTERS':
      const savedCharacters = localStorage.getItem('rpg_characters');
      const savedSelectedId = localStorage.getItem('rpg_selected_character');
      const characters = savedCharacters ? JSON.parse(savedCharacters) : [];
      const selectedCharacter = savedSelectedId 
        ? characters.find((char: Character) => char.id === savedSelectedId) || null
        : null;
      
      return { 
        ...state, 
        characters,
        selectedCharacter
      };
    
    case 'ADD_NOTIFICATION':
      return { 
        ...state, 
        notifications: [...state.notifications, action.payload] 
      };
    
    case 'REMOVE_NOTIFICATION':
      return { 
        ...state, 
        notifications: state.notifications.filter(notif => notif.id !== action.payload) 
      };
    
    default:
      return state;
  }
}

/**
 * Provider do contexto do jogo
 */
export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}

/**
 * Hook para usar o contexto do jogo
 */
export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame deve ser usado dentro de um GameProvider');
  }
  return context;
}