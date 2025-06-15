import React, { useState } from 'react';
import { Target, Clock, Star, Award, Map, CheckCircle, AlertCircle, TrendingUp } from 'lucide-react';

interface Mission {
  id: string;
  title: string;
  description: string;
  type: 'Diária' | 'Semanal' | 'Épica' | 'Evento';
  difficulty: 'Fácil' | 'Médio' | 'Difícil' | 'Épico';
  rewards: {
    experience: number;
    gold: number;
    items?: string[];
  };
  progress: {
    current: number;
    required: number;
  };
  timeLeft?: string;
  status: 'Disponível' | 'Em Progresso' | 'Completa' | 'Expirada';
}

const MissoesFeature: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly' | 'epic' | 'event'>('daily');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  // Dados mockados para demonstração
  const missions: Mission[] = [
    {
      id: '1',
      title: 'Caçador de Monstros',
      description: 'Derrote 50 monstros de qualquer tipo',
      type: 'Diária',
      difficulty: 'Fácil',
      rewards: {
        experience: 500,
        gold: 200,
        items: ['Poção de Cura x3']
      },
      progress: {
        current: 35,
        required: 50
      },
      timeLeft: '8h 30min',
      status: 'Em Progresso'
    },
    {
      id: '2',
      title: 'Explorador das Profundezas',
      description: 'Complete 10 masmorras',
      type: 'Semanal',
      difficulty: 'Médio',
      rewards: {
        experience: 2000,
        gold: 800,
        items: ['Cristal de Poder x2', 'Chave Dourada x1']
      },
      progress: {
        current: 7,
        required: 10
      },
      timeLeft: '3d 12h',
      status: 'Em Progresso'
    },
    {
      id: '3',
      title: 'Mestre do Comércio',
      description: 'Venda itens no valor de 10,000 ouro',
      type: 'Diária',
      difficulty: 'Médio',
      rewards: {
        experience: 800,
        gold: 500
      },
      progress: {
        current: 0,
        required: 10000
      },
      timeLeft: '12h 45min',
      status: 'Disponível'
    },
    {
      id: '4',
      title: 'Conquistador de Territórios',
      description: 'Conquiste 5 territórios para sua aliança',
      type: 'Épica',
      difficulty: 'Difícil',
      rewards: {
        experience: 5000,
        gold: 2000,
        items: ['Título: Conquistador', 'Armadura Épica x1']
      },
      progress: {
        current: 2,
        required: 5
      },
      timeLeft: '5d 18h',
      status: 'Em Progresso'
    },
    {
      id: '5',
      title: 'Festival da Lua',
      description: 'Participe do evento especial e colete 100 cristais lunares',
      type: 'Evento',
      difficulty: 'Médio',
      rewards: {
        experience: 1500,
        gold: 1000,
        items: ['Manto da Lua x1', 'Cristal Lunar x5']
      },
      progress: {
        current: 100,
        required: 100
      },
      timeLeft: '1d 6h',
      status: 'Completa'
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Fácil': return 'text-green-300';
      case 'Médio': return 'text-yellow-300';
      case 'Difícil': return 'text-orange-300';
      case 'Épico': return 'text-purple-300';
      default: return 'text-gray-300';
    }
  };

  const getDifficultyBg = (difficulty: string) => {
    switch (difficulty) {
      case 'Fácil': return 'bg-green-600/30';
      case 'Médio': return 'bg-yellow-600/30';
      case 'Difícil': return 'bg-orange-600/30';
      case 'Épico': return 'bg-purple-600/30';
      default: return 'bg-gray-600/30';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Disponível': return 'text-blue-300';
      case 'Em Progresso': return 'text-yellow-300';
      case 'Completa': return 'text-green-300';
      case 'Expirada': return 'text-red-300';
      default: return 'text-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Disponível': return AlertCircle;
      case 'Em Progresso': return Clock;
      case 'Completa': return CheckCircle;
      case 'Expirada': return AlertCircle;
      default: return AlertCircle;
    }
  };

  const filteredMissions = missions.filter(mission => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'available') return mission.status === 'Disponível';
    if (selectedFilter === 'in-progress') return mission.status === 'Em Progresso';
    if (selectedFilter === 'completed') return mission.status === 'Completa';
    return true;
  });

  const getProgressPercentage = (current: number, required: number) => {
    return Math.min((current / required) * 100, 100);
  };

  return (
    <div className="flex justify-center items-center w-full min-h-[500px]">
      <div className="bg-gradient-to-br from-yellow-900 via-yellow-800 to-yellow-900 rounded-lg border border-yellow-700/50 p-8 w-full max-w-6xl" style={{ minHeight: '500px' }}>
        <div className="w-full text-center pt-6 pb-8">
          <span className="text-lg text-yellow-200 tracking-widest uppercase font-semibold">MISSÕES</span>
        </div>

        {/* Estatísticas das Missões */}
        <div className="bg-yellow-800/30 rounded-lg p-6 mb-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-200">12</div>
              <div className="text-sm text-yellow-400">Missões Ativas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-200">8,450</div>
              <div className="text-sm text-yellow-400">XP Ganho Hoje</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-200">3,200</div>
              <div className="text-sm text-yellow-400">Ouro Ganho Hoje</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-200">156</div>
              <div className="text-sm text-yellow-400">Total Completas</div>
            </div>
          </div>
        </div>

        {/* Abas de Navegação */}
        <div className="flex space-x-1 mb-6">
          {[
            { id: 'daily', label: 'Diárias', icon: Clock },
            { id: 'weekly', label: 'Semanais', icon: Calendar },
            { id: 'epic', label: 'Épicas', icon: Star },
            { id: 'event', label: 'Eventos', icon: Award }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-yellow-600/50 text-yellow-100'
                  : 'bg-yellow-800/30 text-yellow-300 hover:bg-yellow-700/30'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Filtros */}
        <div className="bg-yellow-800/20 rounded-lg p-4 mb-6">
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'Todas' },
              { id: 'available', label: 'Disponíveis' },
              { id: 'in-progress', label: 'Em Progresso' },
              { id: 'completed', label: 'Completas' }
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                  selectedFilter === filter.id
                    ? 'bg-yellow-600/50 text-yellow-100'
                    : 'bg-yellow-700/30 text-yellow-300 hover:bg-yellow-600/30'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Lista de Missões */}
        <div className="bg-yellow-800/20 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-yellow-100 mb-4">Missões Disponíveis</h3>
          <div className="space-y-4">
            {filteredMissions.map((mission) => {
              const StatusIcon = getStatusIcon(mission.status);
              const progressPercentage = getProgressPercentage(mission.progress.current, mission.progress.required);
              
              return (
                <div key={mission.id} className={`${getDifficultyBg(mission.difficulty)} rounded-lg p-4 border border-yellow-600/30`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <Target className="w-5 h-5 text-yellow-300" />
                        <h4 className="font-semibold text-yellow-100">{mission.title}</h4>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(mission.difficulty)} ${getDifficultyBg(mission.difficulty)}`}>
                          {mission.difficulty}
                        </span>
                        <span className="px-2 py-1 rounded text-xs font-medium bg-yellow-600/30 text-yellow-300">
                          {mission.type}
                        </span>
                      </div>
                      <p className="text-sm text-yellow-300 mb-3">{mission.description}</p>
                      
                      {/* Barra de Progresso */}
                      <div className="mb-3">
                        <div className="flex items-center justify-between text-sm text-yellow-400 mb-1">
                          <span>Progresso: {mission.progress.current}/{mission.progress.required}</span>
                          <span>{Math.round(progressPercentage)}%</span>
                        </div>
                        <div className="w-full bg-yellow-700/30 rounded-full h-2">
                          <div 
                            className="bg-yellow-500 h-2 rounded-full transition-all duration-300" 
                            style={{ width: `${progressPercentage}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Recompensas */}
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center space-x-1">
                          <TrendingUp className="w-4 h-4 text-green-400" />
                          <span className="text-green-400">{mission.rewards.experience} XP</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Award className="w-4 h-4 text-yellow-400" />
                          <span className="text-yellow-400">{mission.rewards.gold} Ouro</span>
                        </div>
                        {mission.rewards.items && (
                          <div className="flex items-center space-x-1">
                            <Package className="w-4 h-4 text-blue-400" />
                            <span className="text-blue-400">{mission.rewards.items.length} Itens</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end space-y-2 ml-4">
                      <div className="flex items-center space-x-1">
                        <StatusIcon className="w-4 h-4" />
                        <span className={`text-sm ${getStatusColor(mission.status)}`}>
                          {mission.status}
                        </span>
                      </div>
                      {mission.timeLeft && (
                        <div className="flex items-center space-x-1 text-xs text-yellow-500">
                          <Clock className="w-3 h-3" />
                          <span>{mission.timeLeft}</span>
                        </div>
                      )}
                      {mission.status === 'Disponível' && (
                        <button className="px-4 py-2 bg-yellow-600/50 text-yellow-100 rounded-lg hover:bg-yellow-600/70 transition-colors text-sm">
                          Aceitar
                        </button>
                      )}
                      {mission.status === 'Em Progresso' && (
                        <button className="px-4 py-2 bg-yellow-600/50 text-yellow-100 rounded-lg hover:bg-yellow-600/70 transition-colors text-sm">
                          Continuar
                        </button>
                      )}
                      {mission.status === 'Completa' && (
                        <button className="px-4 py-2 bg-green-600/50 text-green-100 rounded-lg hover:bg-green-600/70 transition-colors text-sm">
                          Reclamar
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente Calendar para o ícone
const Calendar: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

// Componente Package para o ícone
const Package: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
  </svg>
);

export default MissoesFeature; 