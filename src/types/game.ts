/**
 * Tipos e interfaces para o sistema de jogo RPG Medieval Espacial
 */

// Telas disponíveis no jogo
export type GameScreen = 
  | 'splash' 
  | 'login' 
  | 'character-creation' 
  | 'character-selection' 
  | 'game-hub'
  | 'battle'
  | 'missions'
  | 'inventory';

// Dados do usuário
export interface User {
  id: string;
  email: string;
  username: string;
  createdAt: Date;
}

// Atributos do personagem
export interface CharacterAttributes {
  forca: number;          // Exoesqueleto físico
  vitalidade: number;     // Resistência Bio-Arcana
  agilidade: number;      // Reflexo Neural
  sinergiaCosmica: number; // Habilidades especiais
}

// Personagem do jogador
export interface Character {
  id: string;
  name: string;
  level: number;
  experience: number;
  experienceToNext: number;
  health: number;
  maxHealth: number;
  attributes: CharacterAttributes;
  createdAt: Date;
}

// Notificações do sistema
export interface Notification {
  id: string;
  type: 'success' | 'warning' | 'error' | 'info';
  title: string;
  message: string;
  timestamp: Date;
}

// Mensagens do chat
export interface Message {
  id: string;
  type: 'global' | 'private' | 'system';
  sender: string;
  content: string;
  timestamp: Date;
}

// Estado global do jogo
export interface GameState {
  currentScreen: GameScreen;
  isLoading: boolean;
  user: User | null;
  characters: Character[];
  selectedCharacter: Character | null;
  notifications: Notification[];
  messages: Message[];
}

// Ações do reducer
export type GameAction =
  | { type: 'SET_SCREEN'; payload: GameScreen }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'ADD_CHARACTER'; payload: Character }
  | { type: 'DELETE_CHARACTER'; payload: string }
  | { type: 'SELECT_CHARACTER'; payload: string }
  | { type: 'LOAD_CHARACTERS' }
  | { type: 'ADD_NOTIFICATION'; payload: Notification }
  | { type: 'REMOVE_NOTIFICATION'; payload: string };