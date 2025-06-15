import React from 'react';

const CombatAreaExplorar: React.FC = () => (
  <div className="flex justify-center items-center w-full min-h-[500px]">
    <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 rounded-lg border border-blue-700/50 p-8 w-full max-w-6xl flex flex-col items-center" style={{ minHeight: '500px' }}>
      <div className="w-full text-center pt-6 pb-8">
        <span className="text-lg text-blue-200 tracking-widest uppercase font-semibold">ÁREA DE EXPLORAÇÃO</span>
      </div>
      <div className="flex-1 w-full flex flex-col items-center justify-center">
        <p className="text-blue-200 text-xl">Descubra novos territórios e segredos do universo!</p>
      </div>
    </div>
  </div>
);

export default CombatAreaExplorar; 