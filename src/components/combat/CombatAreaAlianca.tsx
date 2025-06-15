import React from 'react';

const CombatAreaAlianca: React.FC = () => (
  <div className="flex justify-center items-center w-full min-h-[500px]">
    <div className="bg-gradient-to-br from-cyan-900 via-cyan-800 to-cyan-900 rounded-lg border border-cyan-700/50 p-8 w-full max-w-6xl flex flex-col items-center" style={{ minHeight: '500px' }}>
      <div className="w-full text-center pt-6 pb-8">
        <span className="text-lg text-cyan-200 tracking-widest uppercase font-semibold">ÁREA DE ALIANÇA</span>
      </div>
      <div className="flex-1 w-full flex flex-col items-center justify-center">
        <p className="text-cyan-200 text-xl">Gerencie sua aliança e coopere com outros jogadores!</p>
      </div>
    </div>
  </div>
);

export default CombatAreaAlianca; 