import React from 'react';

const CombatAreaTorneio: React.FC = () => (
  <div className="flex justify-center items-center w-full min-h-[500px]">
    <div className="bg-gradient-to-br from-red-900 via-red-800 to-red-900 rounded-lg border border-red-700/50 p-8 w-full max-w-6xl flex flex-col items-center" style={{ minHeight: '500px' }}>
      <div className="w-full text-center pt-6 pb-8">
        <span className="text-lg text-red-200 tracking-widest uppercase font-semibold">ÁREA DE TORNEIO</span>
      </div>
      <div className="flex-1 w-full flex flex-col items-center justify-center">
        <p className="text-red-200 text-xl">Bem-vindo ao Torneio! Prepare-se para batalhas épicas.</p>
      </div>
    </div>
  </div>
);

export default CombatAreaTorneio; 