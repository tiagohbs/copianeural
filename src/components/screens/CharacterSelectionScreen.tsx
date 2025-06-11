import React from 'react';
import { useGame } from '../../contexts/GameContext';
import { Plus, Trash2, Play, Sword, Shield, Zap, Star } from 'lucide-react';

/**
 * Tela de seleção de personagem
 * Exibe lista de personagens criados com opções de seleção e exclusão
 */
function CharacterSelectionScreen() {
  const { state, dispatch } = useGame();

  const handleSelectCharacter = (characterId: string) => {
    dispatch({ type: 'SELECT_CHARACTER', payload: characterId });
    dispatch({ type: 'SET_SCREEN', payload: 'game-hub' });
  };

  const handleDeleteCharacter = (characterId: string) => {
    if (confirm('Tem certeza que deseja excluir este personagem? Esta ação não pode ser desfeita.')) {
      dispatch({ type: 'DELETE_CHARACTER', payload: characterId });
    }
  };

  const handleCreateNew = () => {
    dispatch({ type: 'SET_SCREEN', payload: 'character-creation' });
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        {/* Cabeçalho */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-medieval font-bold bg-gradient-to-r from-cosmic-gold via-alien-crystal to-alien-glow bg-clip-text text-transparent mb-4">
            Câmara de Criogenia
          </h1>
          <p className="text-gray-400 text-lg">
            Selecione ou crie um personagem para iniciar sua jornada
          </p>
        </div>

        {/* Lista de personagens */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {state.characters.map((character) => (
            <div key={character.id} className="cosmic-panel p-6 group hover:scale-105 transition-transform duration-300">
              {/* Cabeçalho do card */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-medieval font-bold text-white truncate">
                  {character.name}
                </h3>
                <button
                  onClick={() => handleDeleteCharacter(character.id)}
                  className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 transition-all duration-300"
                  title="Excluir personagem"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              {/* Informações do personagem */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Nível:</span>
                  <span className="text-cosmic-gold font-semibold">{character.level}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">HP:</span>
                  <span className="text-green-400 font-semibold">
                    {character.health}/{character.maxHealth}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">XP:</span>
                  <span className="text-blue-400 font-semibold">
                    {character.experience}/{character.experienceToNext}
                  </span>
                </div>
              </div>

              {/* Atributos */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="flex items-center space-x-2">
                  <Sword className="w-4 h-4 text-red-400" />
                  <span className="text-sm text-gray-300">FOR: {character.attributes.forca}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-gray-300">VIT: {character.attributes.vitalidade}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm text-gray-300">AGI: {character.attributes.agilidade}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-purple-400" />
                  <span className="text-sm text-gray-300">SIN: {character.attributes.sinergiaCosmica}</span>
                </div>
              </div>

              {/* Botão de seleção */}
              <button
                onClick={() => handleSelectCharacter(character.id)}
                className="btn-cosmic w-full flex items-center justify-center space-x-2"
              >
                <Play className="w-4 h-4" />
                <span>Selecionar</span>
              </button>

              {/* Data de criação */}
              <div className="text-xs text-gray-500 text-center mt-3">
                Criado em {new Date(character.createdAt).toLocaleDateString('pt-BR')}
              </div>
            </div>
          ))}

          {/* Card para criar novo personagem */}
          <div 
            onClick={handleCreateNew}
            className="cosmic-panel p-6 cursor-pointer group hover:scale-105 transition-transform duration-300 border-2 border-dashed border-alien-crystal/30 hover:border-alien-glow/50"
          >
            <div className="flex flex-col items-center justify-center h-full min-h-[300px] space-y-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-alien-glow/20 to-cosmic-purple/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Plus className="w-8 h-8 text-alien-glow" />
              </div>
              <h3 className="text-xl font-medieval font-bold text-alien-crystal">
                Novo Personagem
              </h3>
              <p className="text-gray-400 text-center text-sm">
                Crie um novo personagem para explorar o nexus
              </p>
            </div>
          </div>
        </div>

        {/* Mensagem quando não há personagens */}
        {state.characters.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-alien-glow/20 to-cosmic-purple/20 flex items-center justify-center">
              <Plus className="w-12 h-12 text-alien-glow" />
            </div>
            <h3 className="text-2xl font-medieval font-bold text-alien-crystal mb-4">
              Nenhum Personagem Encontrado
            </h3>
            <p className="text-gray-400 mb-8">
              Crie seu primeiro personagem para começar sua jornada no nexus medieval espacial
            </p>
            <button
              onClick={handleCreateNew}
              className="btn-cosmic inline-flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Criar Primeiro Personagem</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CharacterSelectionScreen;