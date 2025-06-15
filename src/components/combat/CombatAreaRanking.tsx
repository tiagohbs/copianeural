import React from 'react';

const CombatAreaRanking: React.FC = () => (
  <div className="flex justify-center items-center w-full min-h-[500px]">
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-lg border border-slate-700/50 p-8 w-full max-w-6xl flex flex-col items-center" style={{ minHeight: '500px' }}>
      <div className="w-full text-center pt-6 pb-8">
        <span className="text-lg text-slate-200 tracking-widest uppercase font-semibold">ÁREA DE RANKING</span>
      </div>
      <div className="flex-1 w-full flex flex-col items-center justify-center">
        <p className="text-slate-200 text-xl">Veja os melhores jogadores do Nexus!</p>
      </div>
    </div>
  </div>
);

export default CombatAreaRanking; 