import React from 'react';
import { X, Sword, Users, Compass } from 'lucide-react';

interface BattleModalProps {
  isOpen: boolean;
  onClose: () => void;
  setMode?: (mode: string) => void;
}

/**
 * Modal de seleção de batalha
 * Design atualizado para combinar com o novo layout
 */
function BattleModal({ isOpen, onClose, setMode }: BattleModalProps) {
  if (!isOpen) return null;

  const battleOptions = [
    {
      title: 'Grupo',
      description: 'Forme uma equipe com outros jogadores para enfrentar desafios cooperativos e chefes épicos. Requer estratégia e trabalho em equipe!',
      icon: Users,
      color: 'from-emerald-600/80 to-emerald-700/80',
      hoverColor: 'hover:from-emerald-500/80 hover:to-emerald-600/80',
      action: () => console.log('Modo Grupo selecionado')
    },
    {
      title: 'Solo',
      description: 'Enfrente batalhas sozinho, prove sua força e conquiste recompensas exclusivas para guerreiros solitários!',
      icon: Sword,
      color: 'from-red-600/80 to-red-700/80',
      hoverColor: 'hover:from-red-500/80 hover:to-red-600/80',
      action: () => console.log('Modo Solo selecionado')
    }
  ];

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleOptionClick = (action: () => void, mode: string) => {
    action();
    if (setMode) setMode(mode);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-slate-800/95 backdrop-blur-md border border-slate-700/50 rounded-lg w-full max-w-2xl p-8 relative animate-scale-in">
        {/* Botão de fechar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg bg-slate-700/50 border border-slate-600/50 text-slate-400 hover:text-white hover:bg-slate-600/50 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Cabeçalho */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-600/80 to-red-700/80 rounded-full mb-4">
            <Sword className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">
            Arena de Combate
          </h2>
          <p className="text-slate-400">
            Escolha seu tipo de batalha no nexus medieval espacial
          </p>
        </div>

        {/* Opções de batalha */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {battleOptions.map((option, index) => {
            const IconComponent = option.icon;
            return (
              <button
                key={index}
                onClick={() => handleOptionClick(option.action, option.title.toUpperCase())}
                className={`bg-slate-700/30 border border-slate-600/50 rounded-lg p-6 group hover:scale-105 transition-all duration-300 text-left ${option.hoverColor}`}
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${option.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-2">
                      {option.title}
                    </h3>
                    <p className="text-slate-400 text-sm">
                      {option.description}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default BattleModal;