import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useGame } from '../../contexts/GameContext';
import { 
  Sword, 
  Map, 
  MessageCircle, 
  Settings, 
  LogOut,
  Trophy,
  Users,
  ShoppingCart,
  Target,
  Search
} from 'lucide-react';

const GameLayout: React.FC = () => {
  const { state, dispatch } = useGame();
  const navigate = useNavigate();
  const location = useLocation();
  const character = state.selectedCharacter;
  const [selectedMode, setSelectedMode] = useState('CAÇA');

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

  // Verificar se há personagem selecionado
  useEffect(() => {
    if (!character) {
      dispatch({ type: 'SET_SCREEN', payload: 'character-selection' });
    }
  }, [character, dispatch]);

  // Sincronizar estado com a URL atual
  useEffect(() => {
    const path = location.pathname;
    if (path.includes('/hunt')) setSelectedMode('CAÇA');
    else if (path.includes('/tournament')) setSelectedMode('TORNEIO');
    else if (path.includes('/dungeon')) setSelectedMode('MASMORRA');
    else if (path.includes('/explore')) setSelectedMode('EXPLORAR');
    else if (path.includes('/missions')) setSelectedMode('MISSÕES');
    else if (path.includes('/market')) setSelectedMode('MERCADO');
    else if (path.includes('/alliance')) setSelectedMode('ALIANÇA');
    else if (path.includes('/ranking')) setSelectedMode('RANKING');
    else if (path === '/game' || path === '/game/') {
      setSelectedMode('CAÇA');
      navigate('/game/hunt', { replace: true });
    }
  }, [location.pathname, navigate]);

  // Se não há personagem, não renderizar o layout
  if (!character) {
    return null;
  }

  const handleLogout = () => {
    if (confirm('Deseja realmente sair do jogo?')) {
      dispatch({ type: 'SET_USER', payload: null });
      dispatch({ type: 'SELECT_CHARACTER', payload: '' });
      dispatch({ type: 'SET_SCREEN', payload: 'login' });
    }
  };

  // Função para selecionar modo de jogo
  const handleSelectMode = (mode: string) => {
    setSelectedMode(mode);
    // Navegar para a rota correspondente
    switch (mode) {
      case 'CAÇA':
        navigate('/game/hunt');
        break;
      case 'TORNEIO':
        navigate('/game/tournament');
        break;
      case 'MASMORRA':
        navigate('/game/dungeon');
        break;
      case 'EXPLORAR':
        navigate('/game/explore');
        break;
      default:
        navigate('/game/hunt');
    }
  };

  // Função para selecionar funcionalidade
  const handleSelectFeature = (feature: string) => {
    setSelectedMode(feature);
    switch (feature) {
      case 'MISSÕES':
        navigate('/game/missions');
        break;
      case 'MERCADO':
        navigate('/game/market');
        break;
      case 'ALIANÇA':
        navigate('/game/alliance');
        break;
      case 'RANKING':
        navigate('/game/ranking');
        break;
    }
  };

  // Nome do modo selecionado para exibir no topo
  const displayMode = selectedMode || 'Selecione um modo de jogo';

  return (
    <div className={`min-h-screen flex flex-col ${(modeColors as Record<string, string>)[selectedMode] || modeColors['']}`}>
      {/* Header Fixo */}
      <div className="bg-slate-800/90 backdrop-blur-sm border-b border-slate-700/50 p-4 flex-shrink-0">
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
            <button 
              onClick={handleLogout}
              className="p-2 rounded-lg bg-slate-700/50 text-slate-300 hover:text-white hover:bg-slate-600/50 transition-colors"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Botões secundários abaixo do header */}
      <div className="bg-slate-800/50 border-b border-slate-700/30 p-3 flex-shrink-0">
        <div className="max-w-7xl mx-auto flex justify-center gap-4">
          <button 
            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${selectedMode==='MISSÕES' ? 'bg-gradient-to-r from-yellow-600/80 to-yellow-700/80 text-white' : 'bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 hover:text-white'}`} 
            onClick={() => handleSelectFeature('MISSÕES')}
          >
            <Map className="w-4 h-4" />
            <span>MISSÕES</span>
          </button>
          <button 
            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${selectedMode==='MERCADO' ? 'bg-gradient-to-r from-amber-600/80 to-amber-700/80 text-white' : 'bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 hover:text-white'}`} 
            onClick={() => handleSelectFeature('MERCADO')}
          >
            <ShoppingCart className="w-4 h-4" />
            <span>MERCADO</span>
          </button>
          <button 
            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${selectedMode==='ALIANÇA' ? 'bg-gradient-to-r from-cyan-600/80 to-cyan-700/80 text-white' : 'bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 hover:text-white'}`} 
            onClick={() => handleSelectFeature('ALIANÇA')}
          >
            <Users className="w-4 h-4" />
            <span>ALIANÇA</span>
          </button>
          <button 
            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${selectedMode==='RANKING' ? 'bg-gradient-to-r from-slate-600/80 to-slate-700/80 text-white' : 'bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 hover:text-white'}`} 
            onClick={() => handleSelectFeature('RANKING')}
          >
            <Trophy className="w-4 h-4" />
            <span>RANKING</span>
          </button>
        </div>
      </div>

      {/* Área de Conteúdo Principal */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-7xl">
            <Outlet />
          </div>
        </div>
      </div>
      
      {/* Barra de Navegação Inferior Fixa */}
      <div className="bg-slate-800/90 backdrop-blur-sm border-t border-slate-700/50 p-4 flex-shrink-0">
        <div className="max-w-7xl mx-auto">
          <div className="w-full flex flex-wrap justify-center gap-4">
            <button 
              className={`p-4 min-w-[140px] rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${selectedMode==='CAÇA' ? 'bg-gradient-to-r from-green-600/80 to-green-700/80 text-white' : 'bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 hover:text-white'}`} 
              onClick={() => handleSelectMode('CAÇA')}
            >
              <Search className="w-5 h-5" />
              <span>CAÇA</span>
            </button>
            <button 
              className={`p-4 min-w-[140px] rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${selectedMode==='TORNEIO' ? 'bg-gradient-to-r from-red-600/80 to-red-700/80 text-white' : 'bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 hover:text-white'}`} 
              onClick={() => handleSelectMode('TORNEIO')}
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
    </div>
  );
};

export default GameLayout; 