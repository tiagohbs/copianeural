import React, { useState } from 'react';
import { useGame } from '../../contexts/GameContext';
import { Character, CharacterAttributes } from '../../types/game';
import { Zap, Shield, Sword, Star, ArrowLeft, Check } from 'lucide-react';

/**
 * Tela de criação de personagem
 * Permite distribuir atributos e criar novo personagem
 */
function CharacterCreationScreen() {
  const { dispatch } = useGame();
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
    dispatch({ type: 'SET_SCREEN', payload: 'character-selection' });
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
    <div className="min-h-screen p-4 flex items-center justify-center">
      <div className="cosmic-panel w-full max-w-2xl p-8">
        {/* Cabeçalho */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => dispatch({ type: 'SET_SCREEN', payload: 'character-selection' })}
            className="flex items-center text-gray-400 hover:text-alien-glow transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Voltar
          </button>
          <h2 className="text-3xl font-medieval font-bold text-alien-crystal">
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
            className="input-cosmic w-full"
            placeholder="Digite o nome do seu personagem"
            maxLength={20}
            autoFocus
          />
        </div>

        {/* Pontos restantes */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 bg-black/30 px-4 py-2 rounded-lg border border-alien-crystal/30">
            <Star className="w-5 h-5 text-cosmic-gold" />
            <span className="text-lg font-semibold">
              Pontos Restantes: <span className="text-cosmic-gold">{remainingPoints}</span>
            </span>
          </div>
        </div>

        {/* Atributos */}
        <div className="grid gap-6 mb-8">
          {attributeInfo.map((attr) => {
            const IconComponent = attr.icon;
            const currentValue = attributes[attr.key];
            
            return (
              <div key={attr.key} className="bg-black/20 p-4 rounded-lg border border-alien-crystal/20">
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
                      className="w-8 h-8 rounded-full bg-red-600/20 border border-red-500/30 text-red-400 hover:bg-red-600/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-bold text-lg">{currentValue}</span>
                    <button
                      onClick={() => handleAttributeChange(attr.key, 1)}
                      disabled={currentValue >= 10 || remainingPoints <= 0}
                      className="w-8 h-8 rounded-full bg-green-600/20 border border-green-500/30 text-green-400 hover:bg-green-600/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
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
          className="btn-cosmic w-full text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          <Check className="w-5 h-5" />
          <span>Criar Personagem</span>
        </button>
      </div>
    </div>
  );
}

export default CharacterCreationScreen;