import { useState } from 'react';
import { useGame } from '../../contexts/GameContext';
import { Character, CharacterAttributes } from '../../types/game';
import { Zap, Shield, Sword, Star, ArrowLeft, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/**
 * Tela de criação de personagem
 * Permite distribuir atributos e criar novo personagem
 */
function CharacterCreationScreen() {
  const { dispatch } = useGame();
  const navigate = useNavigate();
  const [characterName, setCharacterName] = useState('');
  const [attributes, setAttributes] = useState<CharacterAttributes>({
    forca: 1,
    vitalidade: 1,
    agilidade: 1,
    sinergiaCosmica: 1
  });

  // Pontos disponíveis para distribuir
  const totalPoints = 20;
  const usedPoints = Object.values(attributes).reduce((sum, value) => sum + value, 0);
  const remainingPoints = totalPoints - usedPoints;

  const handleAttributeChange = (attribute: keyof CharacterAttributes, change: number) => {
    const newValue = attributes[attribute] + change;
    
    // Validações
    if (newValue < 1 || newValue > 10) return;
    if (change > 0 && remainingPoints <= 0) return;

    setAttributes(prev => ({
      ...prev,
      [attribute]: newValue
    }));
  };

  const handleCreateCharacter = () => {
    if (!characterName.trim()) {
      alert('Por favor, digite um nome para seu personagem');
      return;
    }

    if (remainingPoints > 0) {
      alert('Você ainda tem pontos para distribuir');
      return;
    }

    // Criar novo personagem
    const newCharacter: Character = {
      id: Date.now().toString(),
      name: characterName.trim(),
      level: 1,
      experience: 0,
      experienceToNext: 100,
      health: 100 + (attributes.vitalidade * 10),
      maxHealth: 100 + (attributes.vitalidade * 10),
      attributes,
      createdAt: new Date()
    };

    dispatch({ type: 'ADD_CHARACTER', payload: newCharacter });
    navigate('/selecao-personagem');
  };

  const attributeInfo = [
    {
      key: 'forca' as keyof CharacterAttributes,
      name: 'Força',
      description: 'Exoesqueleto físico - Aumenta dano corpo a corpo',
      icon: Sword,
      color: 'text-red-400'
    },
    {
      key: 'vitalidade' as keyof CharacterAttributes,
      name: 'Vitalidade',
      description: 'Resistência Bio-Arcana - Aumenta HP e resistência',
      icon: Shield,
      color: 'text-green-400'
    },
    {
      key: 'agilidade' as keyof CharacterAttributes,
      name: 'Agilidade',
      description: 'Reflexo Neural - Aumenta velocidade e esquiva',
      icon: Zap,
      color: 'text-yellow-400'
    },
    {
      key: 'sinergiaCosmica' as keyof CharacterAttributes,
      name: 'Sinergia Cósmica',
      description: 'Habilidades especiais - Poderes únicos e magia',
      icon: Star,
      color: 'text-purple-400'
    }
  ];

  return (
    <div className="min-h-screen p-4 flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700/50 rounded-lg shadow-2xl w-full max-w-2xl p-8 relative z-10">
        {/* Cabeçalho */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/selecao-personagem')}
            className="flex items-center text-gray-400 hover:text-emerald-400 transition-colors z-20 relative"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Voltar
          </button>
          <h2 className="text-3xl font-bold text-emerald-400">
            Criação Neural
          </h2>
          <div className="w-20" /> {/* Spacer */}
        </div>

        {/* Nome do personagem */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Nome do Personagem
          </label>
          <input
            type="text"
            value={characterName}
            onChange={(e) => setCharacterName(e.target.value)}
            className="bg-slate-900/50 border border-slate-600/50 rounded-lg px-4 py-2 w-full focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300 placeholder-slate-500 text-white relative z-10"
            placeholder="Digite o nome do seu personagem"
            maxLength={20}
            autoFocus
          />
        </div>

        {/* Pontos restantes */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 bg-black/30 px-4 py-2 rounded-lg border border-emerald-500/30">
            <Star className="w-5 h-5 text-yellow-400" />
            <span className="text-lg font-semibold text-white">
              Pontos Restantes: <span className="text-yellow-400">{remainingPoints}</span>
            </span>
          </div>
        </div>

        {/* Atributos */}
        <div className="grid gap-6 mb-8">
          {attributeInfo.map((attr) => {
            const IconComponent = attr.icon;
            const currentValue = attributes[attr.key];
            
            return (
              <div key={attr.key} className="bg-black/20 p-4 rounded-lg border border-emerald-500/20 relative z-10">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <IconComponent className={`w-6 h-6 ${attr.color}`} />
                    <div>
                      <h3 className="font-semibold text-white">{attr.name}</h3>
                      <p className="text-sm text-gray-400">{attr.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleAttributeChange(attr.key, -1)}
                      disabled={currentValue <= 1}
                      className="w-8 h-8 rounded-full bg-red-600/20 border border-red-500/30 text-red-400 hover:bg-red-600/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center relative z-20"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-bold text-lg text-white">{currentValue}</span>
                    <button
                      onClick={() => handleAttributeChange(attr.key, 1)}
                      disabled={currentValue >= 10 || remainingPoints <= 0}
                      className="w-8 h-8 rounded-full bg-green-600/20 border border-green-500/30 text-green-400 hover:bg-green-600/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center relative z-20"
                    >
                      +
                    </button>
                  </div>
                </div>
                
                {/* Barra de progresso do atributo */}
                <div className="w-full bg-black/50 rounded-full h-2 mt-3">
                  <div 
                    className={`h-full rounded-full transition-all duration-300 ${
                      attr.key === 'forca' ? 'bg-red-500' :
                      attr.key === 'vitalidade' ? 'bg-green-500' :
                      attr.key === 'agilidade' ? 'bg-yellow-500' :
                      'bg-purple-500'
                    }`}
                    style={{ width: `${(currentValue / 10) * 100}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Botão de criar */}
        <button
          onClick={handleCreateCharacter}
          disabled={!characterName.trim() || remainingPoints > 0}
          className="px-6 py-3 rounded-lg font-semibold bg-gradient-to-r from-emerald-600/80 to-teal-600/80 hover:from-emerald-500/80 hover:to-teal-500/80 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-emerald-500/30 border border-emerald-500/30 w-full text-white disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 relative z-20"
        >
          <Check className="w-5 h-5" />
          <span>Criar Personagem</span>
        </button>
      </div>
    </div>
  );
}

export default CharacterCreationScreen;