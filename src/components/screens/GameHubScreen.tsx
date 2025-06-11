import React, { useState } from 'react';
import { useGame } from '../../contexts/GameContext';
import BattleModal from '../modals/BattleModal';
import { 
  Sword, 
  Map, 
  Package, 
  MessageCircle, 
  Settings, 
  LogOut,
  Heart,
  Star,
  Zap,
  Trophy,
  Users,
  ShoppingCart,
  Target,
  Search
} from 'lucide-react';

/**
 * Tela principal do jogo (Game Hub)
 * Layout redesenhado baseado na interface fornecida
 */
function GameHubScreen() {
  const { state, dispatch } = useGame();
  const character = state.selectedCharacter;
  const [isBattleModalOpen, setIsBattleModalOpen] = useState(false);

  if (!character) {
    dispatch({ type: 'SET_SCREEN', payload: 'character-selection' });
    return null;
  }

  const handleLogout = () => {
    if (confirm('Deseja realmente sair do jogo?')) {
      dispatch({ type: 'SET_USER', payload: null });
      dispatch({ type: 'SELECT_CHARACTER', payload: '' });
      dispatch({ type: 'SET_SCREEN', payload: 'login' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="bg-slate-800/90 backdrop-blur-sm border-b border-slate-700/50 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
              <span className="text-lg font-bold text-white">
                {character.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">{character.name}</h1>
              <div className="flex items-center space-x-4 text-sm text-slate-300">
                <span>Nível {character.level}</span>
                <span>•</span>
                <span>{character.health}/{character.maxHealth} HP</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="p-2 rounded-lg bg-slate-700/50 text-slate-300 hover:text-white hover:bg-slate-600/50 transition-colors">
              <Settings className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-lg bg-slate-700/50 text-slate-300 hover:text-white hover:bg-slate-600/50 transition-colors">
              <MessageCircle className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-lg bg-slate-700/50 text-slate-300 hover:text-white hover:bg-slate-600/50 transition-colors">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-12 gap-4 h-[calc(100vh-120px)]">
          {/* Menu Lateral Esquerdo */}
          <div className="col-span-2 space-y-2">
            <button 
              onClick={() => setIsBattleModalOpen(true)}
              className="w-full p-4 bg-gradient-to-r from-red-600/80 to-red-700/80 hover:from-red-500/80 hover:to-red-600/80 rounded-lg text-white font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <Sword className="w-5 h-5" />
              <span>TORNEIO</span>
            </button>
            
            <button className="w-full p-4 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg text-slate-300 hover:text-white font-semibold transition-all duration-300 flex items-center justify-center space-x-2">
              <Target className="w-5 h-5" />
              <span>MASMORRA</span>
            </button>
            
            <button className="w-full p-4 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg text-slate-300 hover:text-white font-semibold transition-all duration-300 flex items-center justify-center space-x-2">
              <Search className="w-5 h-5" />
              <span>CAÇA</span>
            </button>
            
            <button className="w-full p-4 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg text-slate-300 hover:text-white font-semibold transition-all duration-300 flex items-center justify-center space-x-2">
              <Map className="w-5 h-5" />
              <span>EXPLORAR</span>
            </button>
          </div>

          {/* Área Central */}
          <div className="col-span-7 bg-slate-800/30 rounded-lg border border-slate-700/50 p-6">
            <div className="text-center text-slate-400 mb-4">
              <h2 className="text-lg font-semibold mb-2">ÁREA DE COMBATE DO PERSONAGEM</h2>
            </div>
            
            {/* Área de visualização do personagem */}
            <div className="bg-slate-900/50 rounded-lg h-64 mb-6 flex items-center justify-center border border-slate-700/30">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                  <span className="text-3xl font-bold text-white">
                    {character.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <p className="text-slate-400">Personagem: {character.name}</p>
              </div>
            </div>

            {/* Barras de Status */}
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm text-slate-300 mb-1">
                  <span>VIDA</span>
                  <span>{character.health}/{character.maxHealth}</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-3">
                  <div 
                    className="h-full bg-gradient-to-r from-red-500 to-red-600 rounded-full transition-all duration-500"
                    style={{ width: `${(character.health / character.maxHealth) * 100}%` }}
                  />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm text-slate-300 mb-1">
                  <span>MANA</span>
                  <span>100/100</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-3">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full w-full" />
                </div>
              </div>
            </div>

            {/* Botão de Atributos */}
            <div className="mt-6 text-center">
              <button className="px-6 py-2 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg text-slate-300 hover:text-white border border-slate-600/50 transition-colors">
                ATRIBUTOS E INVENTÁRIO
              </button>
            </div>
          </div>

          {/* Menu Lateral Direito */}
          <div className="col-span-3 space-y-4">
            {/* Avatar do Jogador */}
            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
              <div className="text-center mb-4">
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-slate-600 to-slate-700 mb-2"></div>
                <p className="text-slate-300 text-sm">MAIN PLANETÁRIO</p>
              </div>
            </div>

            {/* Chat Global */}
            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50 flex-1">
              <h3 className="text-slate-300 font-semibold mb-3 text-center">CHAT GLOBAL</h3>
              <div className="bg-slate-900/50 rounded-lg h-32 mb-3 p-3 text-xs text-slate-400">
                <div className="space-y-1">
                  <p><span className="text-emerald-400">Sistema:</span> Bem-vindo ao nexus</p>
                  <p><span className="text-blue-400">Jogador1:</span> Alguém para raid?</p>
                  <p><span className="text-purple-400">Admin:</span> Evento especial ativo</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Digite sua mensagem..."
                  className="flex-1 px-3 py-2 bg-slate-900/50 border border-slate-600/50 rounded text-slate-300 text-xs placeholder-slate-500 focus:border-emerald-500/50 focus:outline-none"
                />
                <button className="px-3 py-2 bg-emerald-600/80 hover:bg-emerald-500/80 rounded text-white text-xs font-semibold transition-colors">
                  →
                </button>
              </div>
            </div>

            {/* Menu de Navegação */}
            <div className="space-y-2">
              <button className="w-full p-3 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg text-slate-300 hover:text-white font-semibold transition-all duration-300 flex items-center justify-center space-x-2">
                <Map className="w-4 h-4" />
                <span>MISSÕES</span>
              </button>
              
              <button className="w-full p-3 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg text-slate-300 hover:text-white font-semibold transition-all duration-300 flex items-center justify-center space-x-2">
                <ShoppingCart className="w-4 h-4" />
                <span>MERCADO</span>
              </button>
              
              <button className="w-full p-3 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg text-slate-300 hover:text-white font-semibold transition-all duration-300 flex items-center justify-center space-x-2">
                <Users className="w-4 h-4" />
                <span>ALIANÇA</span>
              </button>
              
              <button className="w-full p-3 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg text-slate-300 hover:text-white font-semibold transition-all duration-300 flex items-center justify-center space-x-2">
                <Trophy className="w-4 h-4" />
                <span>RANKING</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Batalha */}
      <BattleModal 
        isOpen={isBattleModalOpen} 
        onClose={() => setIsBattleModalOpen(false)} 
      />
    </div>
  );
}

export default GameHubScreen;