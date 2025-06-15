import React from 'react';

const CombatAreaMercado: React.FC = () => (
  <div className="flex justify-center items-center w-full min-h-[500px]">
    <div className="bg-gradient-to-br from-amber-900 via-amber-800 to-amber-900 rounded-lg border border-amber-700/50 p-8 w-full max-w-6xl flex flex-col items-center" style={{ minHeight: '500px' }}>
      <div className="w-full text-center pt-6 pb-8">
        <span className="text-lg text-amber-200 tracking-widest uppercase font-semibold">ÁREA DE MERCADO</span>
      </div>
      <div className="flex-1 w-full flex flex-col items-center justify-center">
        <p className="text-amber-200 text-xl">Compre, venda e troque itens valiosos!</p>
      </div>
    </div>
  </div>
);

export default CombatAreaMercado; 