import React, { useState } from 'react';
import { Trophy, Crown, Medal, TrendingUp, Users, Target, Star, Award } from 'lucide-react';

interface RankingPlayer {
  id: string;
  name: string;
  level: number;
  experience: number;
  alliance?: string;
  rank: number;
  category: 'Nível' | 'PvP' | 'Riqueza' | 'Missões' | 'Aliança';
  stats: {
    wins?: number;
    losses?: number;
    gold?: number;
    missionsCompleted?: number;
    alliancePoints?: number;
  };
  avatar?: string;
}

const RankingFeature: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'level' | 'pvp' | 'wealth' | 'missions' | 'alliance'>('level');
  const [timeFilter, setTimeFilter] = useState<'weekly' | 'monthly' | 'all-time'>('weekly');

  // Dados mockados para demonstração
  const rankingData: RankingPlayer[] = [
    {
      id: '1',
      name: 'AetherMaster',
      level: 85,
      experience: 2450000,
      alliance: 'Dragões de Éter',
      rank: 1,
      category: 'Nível',
      stats: { gold: 125000 }
    },
    {
      id: '2',
      name: 'ShadowHunter',
      level: 82,
      experience: 2180000,
      alliance: 'Dragões de Éter',
      rank: 2,
      category: 'Nível',
      stats: { gold: 98000 }
    },
    {
      id: '3',
      name: 'CrystalMage',
      level: 80,
      experience: 1950000,
      alliance: 'Mestres do Cristal',
      rank: 3,
      category: 'Nível',
      stats: { gold: 87000 }
    },
    {
      id: '4',
      name: 'IronGuard',
      level: 78,
      experience: 1820000,
      alliance: 'Guardiões de Ferro',
      rank: 4,
      category: 'Nível',
      stats: { gold: 76000 }
    },
    {
      id: '5',
      name: 'WindWalker',
      level: 76,
      experience: 1680000,
      alliance: 'Dragões de Éter',
      rank: 5,
      category: 'Nível',
      stats: { gold: 72000 }
    },
    // Dados PvP
    {
      id: '6',
      name: 'BattleMaster',
      level: 75,
      experience: 1650000,
      alliance: 'Guerreiros Imortais',
      rank: 1,
      category: 'PvP',
      stats: { wins: 245, losses: 23 }
    },
    {
      id: '7',
      name: 'AetherMaster',
      level: 85,
      experience: 2450000,
      alliance: 'Dragões de Éter',
      rank: 2,
      category: 'PvP',
      stats: { wins: 198, losses: 45 }
    },
    // Dados Riqueza
    {
      id: '8',
      name: 'GoldMiner',
      level: 70,
      experience: 1450000,
      alliance: 'Mercadores Dourados',
      rank: 1,
      category: 'Riqueza',
      stats: { gold: 250000 }
    },
    // Dados Missões
    {
      id: '9',
      name: 'QuestMaster',
      level: 72,
      experience: 1580000,
      alliance: 'Aventureiros',
      rank: 1,
      category: 'Missões',
      stats: { missionsCompleted: 456 }
    },
    // Dados Aliança
    {
      id: '10',
      name: 'Dragões de Éter',
      level: 85,
      experience: 2450000,
      rank: 1,
      category: 'Aliança',
      stats: { alliancePoints: 12500 }
    }
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return Crown;
      case 2: return Medal;
      case 3: return Star;
      default: return Trophy;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return 'text-yellow-400';
      case 2: return 'text-gray-300';
      case 3: return 'text-amber-600';
      default: return 'text-slate-300';
    }
  };

  const getRankBg = (rank: number) => {
    switch (rank) {
      case 1: return 'bg-yellow-600/20';
      case 2: return 'bg-gray-600/20';
      case 3: return 'bg-amber-600/20';
      default: return 'bg-slate-600/20';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Nível': return TrendingUp;
      case 'PvP': return Target;
      case 'Riqueza': return Award;
      case 'Missões': return Star;
      case 'Aliança': return Users;
      default: return Trophy;
    }
  };

  const filteredRankings = rankingData.filter(player => {
    if (activeCategory === 'level') return player.category === 'Nível';
    if (activeCategory === 'pvp') return player.category === 'PvP';
    if (activeCategory === 'wealth') return player.category === 'Riqueza';
    if (activeCategory === 'missions') return player.category === 'Missões';
    if (activeCategory === 'alliance') return player.category === 'Aliança';
    return true;
  });

  const getPlayerStats = (player: RankingPlayer) => {
    switch (player.category) {
      case 'Nível':
        return `Nível ${player.level} • ${player.experience.toLocaleString()} XP`;
      case 'PvP':
        return `${player.stats.wins}V/${player.stats.losses}D • ${Math.round((player.stats.wins! / (player.stats.wins! + player.stats.losses!)) * 100)}% Win Rate`;
      case 'Riqueza':
        return `${player.stats.gold?.toLocaleString()} Ouro`;
      case 'Missões':
        return `${player.stats.missionsCompleted} Missões Completas`;
      case 'Aliança':
        return `${player.stats.alliancePoints?.toLocaleString()} Pontos`;
      default:
        return '';
    }
  };

  return (
    <div className="w-full">
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-lg border border-slate-700/50 p-8 w-full max-w-6xl mx-auto">
        <div className="w-full text-center pt-6 pb-8">
          <span className="text-lg text-slate-200 tracking-widest uppercase font-semibold">RANKING</span>
        </div>

        {/* Estatísticas do Ranking */}
        <div className="bg-slate-800/30 rounded-lg p-6 mb-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-200">1,247</div>
              <div className="text-sm text-slate-400">Jogadores Ativos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-200">85</div>
              <div className="text-sm text-slate-400">Nível Máximo</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-200">156</div>
              <div className="text-sm text-slate-400">Alianças</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-200">2.5M</div>
              <div className="text-sm text-slate-400">Total de XP</div>
            </div>
          </div>
        </div>

        {/* Categorias de Ranking */}
        <div className="flex space-x-1 mb-6">
          {[
            { id: 'level', label: 'Nível', icon: TrendingUp },
            { id: 'pvp', label: 'PvP', icon: Target },
            { id: 'wealth', label: 'Riqueza', icon: Award },
            { id: 'missions', label: 'Missões', icon: Star },
            { id: 'alliance', label: 'Alianças', icon: Users }
          ].map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id as any)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                activeCategory === category.id
                  ? 'bg-slate-600/50 text-slate-100'
                  : 'bg-slate-800/30 text-slate-300 hover:bg-slate-700/30'
              }`}
            >
              <category.icon className="w-4 h-4" />
              <span>{category.label}</span>
            </button>
          ))}
        </div>

        {/* Filtros de Tempo */}
        <div className="bg-slate-800/20 rounded-lg p-4 mb-6">
          <div className="flex justify-center space-x-2">
            {[
              { id: 'weekly', label: 'Esta Semana' },
              { id: 'monthly', label: 'Este Mês' },
              { id: 'all-time', label: 'Sempre' }
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => setTimeFilter(filter.id as any)}
                className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                  timeFilter === filter.id
                    ? 'bg-slate-600/50 text-slate-100'
                    : 'bg-slate-700/30 text-slate-300 hover:bg-slate-600/30'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Lista de Rankings */}
        <div className="bg-slate-800/20 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-slate-100 mb-4">
            Ranking de {activeCategory === 'level' ? 'Nível' : 
                       activeCategory === 'pvp' ? 'PvP' : 
                       activeCategory === 'wealth' ? 'Riqueza' : 
                       activeCategory === 'missions' ? 'Missões' : 'Alianças'}
          </h3>
          
          <div className="space-y-3">
            {filteredRankings.slice(0, 10).map((player) => {
              const RankIcon = getRankIcon(player.rank);
              
              return (
                <div key={player.id} className={`${getRankBg(player.rank)} rounded-lg p-4 border border-slate-600/30`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <RankIcon className={`w-6 h-6 ${getRankColor(player.rank)}`} />
                        <span className={`text-lg font-bold ${getRankColor(player.rank)}`}>
                          #{player.rank}
                        </span>
                      </div>
                      
                      <div className="w-12 h-12 rounded-full bg-slate-600 flex items-center justify-center">
                        <span className="text-sm font-bold text-white">
                          {player.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-slate-100">{player.name}</h4>
                        <p className="text-sm text-slate-400">{getPlayerStats(player)}</p>
                        {player.alliance && (
                          <p className="text-xs text-slate-500">Aliança: {player.alliance}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      {player.category === 'PvP' && (
                        <div className="text-right">
                          <div className="text-sm text-slate-300">
                            {player.stats.wins}V - {player.stats.losses}D
                          </div>
                          <div className="text-xs text-slate-500">
                            {Math.round((player.stats.wins! / (player.stats.wins! + player.stats.losses!)) * 100)}% Win Rate
                          </div>
                        </div>
                      )}
                      
                      {player.category === 'Riqueza' && (
                        <div className="text-right">
                          <div className="text-lg font-bold text-yellow-400">
                            {player.stats.gold?.toLocaleString()}
                          </div>
                          <div className="text-xs text-slate-500">Ouro</div>
                        </div>
                      )}
                      
                      {player.category === 'Missões' && (
                        <div className="text-right">
                          <div className="text-lg font-bold text-blue-400">
                            {player.stats.missionsCompleted}
                          </div>
                          <div className="text-xs text-slate-500">Missões</div>
                        </div>
                      )}
                      
                      {player.category === 'Aliança' && (
                        <div className="text-right">
                          <div className="text-lg font-bold text-purple-400">
                            {player.stats.alliancePoints?.toLocaleString()}
                          </div>
                          <div className="text-xs text-slate-500">Pontos</div>
                        </div>
                      )}
                      
                      {player.category === 'Nível' && (
                        <div className="text-right">
                          <div className="text-lg font-bold text-green-400">
                            Nível {player.level}
                          </div>
                          <div className="text-xs text-slate-500">
                            {player.experience.toLocaleString()} XP
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Seu Ranking */}
          <div className="mt-6 pt-6 border-t border-slate-600/30">
            <h4 className="text-lg font-semibold text-slate-100 mb-3">Seu Ranking</h4>
            <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-500/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Trophy className="w-5 h-5 text-slate-400" />
                    <span className="text-slate-300 font-semibold">#127</span>
                  </div>
                  
                  <div className="w-10 h-10 rounded-full bg-slate-600 flex items-center justify-center">
                    <span className="text-sm font-bold text-white">V</span>
                  </div>
                  
                  <div>
                    <h5 className="font-semibold text-slate-100">Você</h5>
                    <p className="text-sm text-slate-400">Nível 45 • 125,000 XP</p>
                    <p className="text-xs text-slate-500">Aliança: Dragões de Éter</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-lg font-bold text-green-400">Nível 45</div>
                  <div className="text-xs text-slate-500">125,000 XP</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RankingFeature; 