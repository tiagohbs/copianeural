import React from 'react';

const CombatAreaCaca: React.FC = () => (
  <div className="flex justify-center items-center w-full min-h-[500px]">
    <div className="bg-slate-800/30 rounded-lg border border-slate-700/50 p-8 w-full max-w-6xl flex flex-col items-center" style={{ minHeight: '500px' }}>
      <div className="w-full text-center pt-6 pb-8">
        <span className="text-lg text-slate-300 tracking-widest uppercase font-semibold">ÁREA DE CAÇA</span>
      </div>
      <div className="flex-1 w-full flex flex-col items-center justify-center">
        <img src="/modelo-de-combate.png" alt="Modelo de Combate" className="max-w-full max-h-[400px] object-contain rounded-lg shadow-lg" />
      </div>
    </div>
  </div>
);

export default CombatAreaCaca; 