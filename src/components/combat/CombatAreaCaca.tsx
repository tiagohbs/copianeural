import React from 'react';
import { HuntBattleLogAuto } from '../features/HuntBattleLog';
import ProceduralTerrainWithPlayer from './ProceduralTerrainWithPlayer';

const CombatAreaCaca: React.FC = () => {
  return (
    <div className="w-full">
      <div className="bg-slate-800/30 rounded-lg border border-slate-700/50 p-8 w-full max-w-6xl mx-auto flex flex-col items-center">
        <div className="w-full text-center pt-6 pb-8">
          <span className="text-lg text-slate-300 tracking-widest uppercase font-semibold">
            ÁREA DE CAÇA
          </span>
        </div>
        <div className="flex-1 w-full flex flex-col items-center justify-center">
          {/* Terreno procedural com movimentação do personagem */}
          <ProceduralTerrainWithPlayer />
          {/* Log de batalha automático abaixo do terreno */}
          <HuntBattleLogAuto />
        </div>
      </div>
    </div>
  );
};

export default CombatAreaCaca;