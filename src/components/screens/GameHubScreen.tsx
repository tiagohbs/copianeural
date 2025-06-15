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
import CombatAreaCaca from '../combat/CombatAreaCaca';
import CombatAreaTorneio from '../combat/CombatAreaTorneio';
import CombatAreaMasmorra from '../combat/CombatAreaMasmorra';
import CombatAreaExplorar from '../combat/CombatAreaExplorar';
import CombatAreaMissoes from '../combat/CombatAreaMissoes';
import CombatAreaMercado from '../combat/CombatAreaMercado';
import CombatAreaAlianca from '../combat/CombatAreaAlianca';
import CombatAreaRanking from '../combat/CombatAreaRanking';

/**
 * Tela principal do jogo (Game Hub)
 * Layout redesenhado baseado na interface fornecida
 */
function GameHubScreen() {
  const { state, dispatch } = useGame();
  const character = state.selectedCharacter;
  const [isBattleModalOpen, setIsBattleModalOpen] = useState(false);
  const [selectedMode, setSelectedMode] = useState('CAÇA');
  const [pendingMode, setPendingMode] = useState('');

  // Cores temáticas para cada modo
  const modeColors = {
    'CAÇA': 'bg-gradient-to-br from-green-900 via-green-800 to-green-900',
    'TORNEIO': 'bg-gradient-to-br from-red-900 via-red-800 to-red-900',
    'MASMORRA': 'bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900',
    'EXPLORAR': 'bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900',
    'MISSÕES': 'bg-gradient-to-br from-yellow-900 via-yellow-800 to-yellow-900',
    'MERCADO': 'bg-gradient-to-br from-amber-900 via-amber-800 to-amber-900',
    'ALIANÇA': 'bg-gradient-to-br from-cyan-900 via-cyan-800 to-cyan-900',
    'RANKING': 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900',
    'GRUPO': 'bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-900',
    'SOLO': 'bg-gradient-to-br from-orange-900 via-orange-800 to-orange-900',
    '': 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900',
  };

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

  // Função para selecionar modo (exceto torneio)
  const handleSelectMode = (mode) => {
    setSelectedMode(mode);
  };

  // Função para abrir modal do torneio
  const handleOpenTorneio = () => {
    setPendingMode('TORNEIO');
    setIsBattleModalOpen(true);
  };

  // Função para fechar modal do torneio e aplicar cor
  const handleCloseBattleModal = (mode) => {
    setIsBattleModalOpen(false);
    if (mode) {
      setSelectedMode(mode);
    } else if (pendingMode) {
      setSelectedMode(pendingMode);
    }
    setPendingMode('');
  };

  // Nome do modo selecionado para exibir no topo
  const displayMode = selectedMode || 'Selecione um modo de jogo';

  // Renderização condicional da área de combate
  function renderCombatArea() {
    switch (selectedMode) {
      case 'CAÇA':
        return <CombatAreaCaca />;
      case 'TORNEIO':
      case 'GRUPO':
      case 'SOLO':
        return <CombatAreaTorneio />;
      case 'MASMORRA':
        return <CombatAreaMasmorra />;
      case 'EXPLORAR':
        return <CombatAreaExplorar />;
      case 'MISSÕES':
        return <CombatAreaMissoes />;
      case 'MERCADO':
        return <CombatAreaMercado />;
      case 'ALIANÇA':
        return <CombatAreaAlianca />;
      case 'RANKING':
        return <CombatAreaRanking />;
      default:
        return null;
    }
  }

  return (
    <div className={`min-h-screen ${modeColors[selectedMode] || modeColors['']}`}>
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
          {/* Nome do modo centralizado no header */}
          <div className="flex-1 flex justify-center">
            <h2 className="text-2xl font-bold text-white tracking-widest drop-shadow-lg uppercase">{displayMode}</h2>
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

      {/* Botões secundários abaixo do header */}
      <div className="bg-slate-800/50 border-b border-slate-700/30 p-3">
        <div className="max-w-7xl mx-auto flex justify-center gap-4">
          <button 
            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${selectedMode==='MISSÕES' ? 'bg-gradient-to-r from-yellow-600/80 to-yellow-700/80 text-white' : 'bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 hover:text-white'}`} 
            onClick={() => handleSelectMode('MISSÕES')}
          >
            <Map className="w-4 h-4" />
            <span>MISSÕES</span>
          </button>
          <button 
            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${selectedMode==='MERCADO' ? 'bg-gradient-to-r from-amber-600/80 to-amber-700/80 text-white' : 'bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 hover:text-white'}`} 
            onClick={() => handleSelectMode('MERCADO')}
          >
            <ShoppingCart className="w-4 h-4" />
            <span>MERCADO</span>
          </button>
          <button 
            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${selectedMode==='ALIANÇA' ? 'bg-gradient-to-r from-cyan-600/80 to-cyan-700/80 text-white' : 'bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 hover:text-white'}`} 
            onClick={() => handleSelectMode('ALIANÇA')}
          >
            <Users className="w-4 h-4" />
            <span>ALIANÇA</span>
          </button>
          <button 
            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${selectedMode==='RANKING' ? 'bg-gradient-to-r from-slate-600/80 to-slate-700/80 text-white' : 'bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 hover:text-white'}`} 
            onClick={() => handleSelectMode('RANKING')}
          >
            <Trophy className="w-4 h-4" />
            <span>RANKING</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4">
        <div className="flex flex-col h-[calc(100vh-200px)] justify-center">
          {/* Área Central Expandida */}
          <div className="flex-1 flex flex-col items-center justify-center">
            {renderCombatArea()}
          </div>
          
          {/* Botões principais de modo de jogo */}
          <div className="w-full flex flex-wrap justify-center gap-4 mt-8">
            <button 
              className={`p-4 min-w-[140px] rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${selectedMode==='CAÇA' ? 'bg-gradient-to-r from-green-600/80 to-green-700/80 text-white' : 'bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 hover:text-white'}`} 
              onClick={() => handleSelectMode('CAÇA')}
            >
              <Search className="w-5 h-5" />
              <span>CAÇA</span>
            </button>
            <button 
              className={`p-4 min-w-[140px] rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${selectedMode==='TORNEIO' ? 'bg-gradient-to-r from-red-600/80 to-red-700/80 text-white' : 'bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 hover:text-white'}`} 
              onClick={handleOpenTorneio}
            >
              <Sword className="w-5 h-5" />
              <span>TORNEIO</span>
            </button>
            <button 
              className={`p-4 min-w-[140px] rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${selectedMode==='MASMORRA' ? 'bg-gradient-to-r from-purple-600/80 to-purple-700/80 text-white' : 'bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 hover:text-white'}`} 
              onClick={() => handleSelectMode('MASMORRA')}
            >
              <Target className="w-5 h-5" />
              <span>MASMORRA</span>
            </button>
            <button 
              className={`p-4 min-w-[140px] rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${selectedMode==='EXPLORAR' ? 'bg-gradient-to-r from-blue-600/80 to-blue-700/80 text-white' : 'bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 hover:text-white'}`} 
              onClick={() => handleSelectMode('EXPLORAR')}
            >
              <Map className="w-5 h-5" />
              <span>EXPLORAR</span>
            </button>
          </div>
        </div>
      </div>

      {/* Modal de Batalha */}
      <BattleModal 
        isOpen={isBattleModalOpen} 
        onClose={() => handleCloseBattleModal()} 
        setMode={(mode) => handleCloseBattleModal(mode)}
      />
    </div>
  );
}

export default GameHubScreen;