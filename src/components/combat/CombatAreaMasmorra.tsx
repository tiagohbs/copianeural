import React from 'react';

const CombatAreaMasmorra: React.FC = () => (
  <div className="flex justify-center items-center w-full min-h-[500px]">
    <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 rounded-lg border border-purple-700/50 p-8 w-full max-w-6xl flex flex-col items-center" style={{ minHeight: '500px' }}>
      <div className="w-full text-center pt-6 pb-8">
        <span className="text-lg text-purple-200 tracking-widest uppercase font-semibold">ÁREA DE MASMORRA</span>
      </div>
      <div className="flex-1 w-full flex flex-col items-center justify-center">
        <p className="text-purple-200 text-xl">Explore masmorras misteriosas e enfrente desafios únicos!</p>
      </div>
    </div>
  </div>
);

export default CombatAreaMasmorra; 