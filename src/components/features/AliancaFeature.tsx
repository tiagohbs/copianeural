import React, { useState } from 'react';
import { Users, UserPlus, Crown, Shield, MessageCircle, Settings } from 'lucide-react';

interface AliancaMember {
  id: string;
  name: string;
  level: number;
  role: 'Líder' | 'Oficial' | 'Membro';
  lastActive: string;
  contribution: number;
}

const AliancaFeature: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'members' | 'missions' | 'chat'>('overview');
  
  // Dados mockados para demonstração
  const aliancaInfo = {
    name: "Dragões de Éter",
    level: 15,
    members: 24,
    maxMembers: 30,
    description: "Aliança focada em exploração e conquista de territórios",
    founded: "2024-01-15"
  };

  const members: AliancaMember[] = [
    { id: '1', name: 'AetherMaster', level: 45, role: 'Líder', lastActive: 'Online', contribution: 1500 },
    { id: '2', name: 'ShadowHunter', level: 38, role: 'Oficial', lastActive: '2h atrás', contribution: 1200 },
    { id: '3', name: 'CrystalMage', level: 42, role: 'Oficial', lastActive: 'Online', contribution: 1100 },
    { id: '4', name: 'IronGuard', level: 35, role: 'Membro', lastActive: '1h atrás', contribution: 800 },
    { id: '5', name: 'WindWalker', level: 33, role: 'Membro', lastActive: '30min atrás', contribution: 750 }
  ];

  return (
    <div className="w-full">
      <div className="bg-gradient-to-br from-cyan-900 via-cyan-800 to-cyan-900 rounded-lg border border-cyan-700/50 p-8 w-full max-w-6xl mx-auto">
        <div className="w-full text-center pt-6 pb-8">
          <span className="text-lg text-cyan-200 tracking-widest uppercase font-semibold">ALIANÇA</span>
        </div>
        
        {/* Informações da Aliança */}
        <div className="bg-cyan-800/30 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-cyan-100">{aliancaInfo.name}</h2>
            <div className="flex items-center space-x-2">
              <Crown className="w-5 h-5 text-yellow-400" />
              <span className="text-cyan-200">Nível {aliancaInfo.level}</span>
            </div>
          </div>
          <p className="text-cyan-300 mb-4">{aliancaInfo.description}</p>
          <div className="flex items-center justify-between text-sm text-cyan-400">
            <span>Membros: {aliancaInfo.members}/{aliancaInfo.maxMembers}</span>
            <span>Fundada em: {aliancaInfo.founded}</span>
          </div>
        </div>

        {/* Abas de Navegação */}
        <div className="flex space-x-1 mb-6">
          {[
            { id: 'overview', label: 'Visão Geral', icon: Shield },
            { id: 'members', label: 'Membros', icon: Users },
            { id: 'missions', label: 'Missões', icon: Settings },
            { id: 'chat', label: 'Chat', icon: MessageCircle }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-cyan-600/50 text-cyan-100'
                  : 'bg-cyan-800/30 text-cyan-300 hover:bg-cyan-700/30'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Conteúdo das Abas */}
        <div className="bg-cyan-800/20 rounded-lg p-6">
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-cyan-100 mb-4">Estatísticas da Aliança</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-cyan-700/30 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-cyan-200">1,250</div>
                  <div className="text-sm text-cyan-400">Pontos Totais</div>
                </div>
                <div className="bg-cyan-700/30 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-cyan-200">8</div>
                  <div className="text-sm text-cyan-400">Territórios</div>
                </div>
                <div className="bg-cyan-700/30 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-cyan-200">156</div>
                  <div className="text-sm text-cyan-400">Missões Completas</div>
                </div>
                <div className="bg-cyan-700/30 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-cyan-200">#12</div>
                  <div className="text-sm text-cyan-400">Ranking Global</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'members' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-cyan-100">Membros da Aliança</h3>
                <button className="flex items-center space-x-2 px-3 py-2 bg-cyan-600/50 text-cyan-100 rounded-lg hover:bg-cyan-600/70 transition-colors">
                  <UserPlus className="w-4 h-4" />
                  <span>Convidar</span>
                </button>
              </div>
              <div className="space-y-2">
                {members.map((member) => (
                  <div key={member.id} className="flex items-center justify-between bg-cyan-700/20 rounded-lg p-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-cyan-600 flex items-center justify-center">
                        <span className="text-sm font-bold text-white">{member.name.charAt(0)}</span>
                      </div>
                      <div>
                        <div className="font-semibold text-cyan-100">{member.name}</div>
                        <div className="text-sm text-cyan-400">Nível {member.level}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        member.role === 'Líder' ? 'bg-yellow-600/30 text-yellow-300' :
                        member.role === 'Oficial' ? 'bg-purple-600/30 text-purple-300' :
                        'bg-cyan-600/30 text-cyan-300'
                      }`}>
                        {member.role}
                      </span>
                      <span className="text-sm text-cyan-400">{member.contribution} pts</span>
                      <span className="text-sm text-cyan-500">{member.lastActive}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'missions' && (
            <div>
              <h3 className="text-xl font-semibold text-cyan-100 mb-4">Missões da Aliança</h3>
              <div className="space-y-3">
                <div className="bg-cyan-700/20 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-cyan-100">Conquista de Território</h4>
                    <span className="text-sm text-green-400">Em Progresso</span>
                  </div>
                  <p className="text-sm text-cyan-300 mb-2">Conquistar 3 territórios em 24 horas</p>
                  <div className="w-full bg-cyan-700/30 rounded-full h-2">
                    <div className="bg-cyan-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                  <div className="text-xs text-cyan-400 mt-1">2/3 territórios conquistados</div>
                </div>
                
                <div className="bg-cyan-700/20 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-cyan-100">Coleta de Recursos</h4>
                    <span className="text-sm text-yellow-400">Disponível</span>
                  </div>
                  <p className="text-sm text-cyan-300">Coletar 1000 unidades de cristal</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'chat' && (
            <div>
              <h3 className="text-xl font-semibold text-cyan-100 mb-4">Chat da Aliança</h3>
              <div className="bg-cyan-700/20 rounded-lg p-4 h-64 overflow-y-auto mb-4">
                <div className="space-y-3">
                  <div className="flex space-x-2">
                    <span className="text-sm text-yellow-400 font-semibold">AetherMaster:</span>
                    <span className="text-sm text-cyan-200">Alguém quer fazer missão de grupo?</span>
                  </div>
                  <div className="flex space-x-2">
                    <span className="text-sm text-purple-400 font-semibold">ShadowHunter:</span>
                    <span className="text-sm text-cyan-200">Eu! Preciso de ajuda com a masmorra</span>
                  </div>
                  <div className="flex space-x-2">
                    <span className="text-sm text-cyan-400 font-semibold">CrystalMage:</span>
                    <span className="text-sm text-cyan-200">Posso ajudar também</span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Digite sua mensagem..."
                  className="flex-1 bg-cyan-700/30 border border-cyan-600/50 rounded-lg px-3 py-2 text-cyan-100 placeholder-cyan-400 focus:outline-none focus:border-cyan-500"
                />
                <button className="px-4 py-2 bg-cyan-600/50 text-cyan-100 rounded-lg hover:bg-cyan-600/70 transition-colors">
                  Enviar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AliancaFeature; 