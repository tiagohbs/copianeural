import React from 'react';

const CombatAreaMissoes: React.FC = () => (
  <div className="flex justify-center items-center w-full min-h-[500px]">
    <div className="bg-gradient-to-br from-yellow-900 via-yellow-800 to-yellow-900 rounded-lg border border-yellow-700/50 p-8 w-full max-w-6xl flex flex-col items-center" style={{ minHeight: '500px' }}>
      <div className="w-full text-center pt-6 pb-8">
        <span className="text-lg text-yellow-200 tracking-widest uppercase font-semibold">ÁREA DE MISSÕES</span>
      </div>
      <div className="flex-1 w-full flex flex-col items-center justify-center">
        <p className="text-yellow-200 text-xl">Complete missões para evoluir seu personagem!</p>
      </div>
    </div>
  </div>
);

export default CombatAreaMissoes; 