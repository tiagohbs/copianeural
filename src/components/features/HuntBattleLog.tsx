import React, { useEffect, useRef, useState } from "react";

interface HuntBattleLogProps {
  log: string[];
}

const HuntBattleLog: React.FC<HuntBattleLogProps> = ({ log }) => {
  return (
    <div className="mt-6 bg-[#1e2e1e]/80 rounded-lg p-4 max-h-40 overflow-y-auto shadow-inner border border-green-700">
      <h3 className="text-green-300 font-bold mb-2 text-sm tracking-wide">Log de Batalha</h3>
      <ul className="space-y-1 text-green-100 text-xs font-mono">
        {log.length === 0 && <li className="text-green-500 italic">Aguardando ação...</li>}
        {log.map((entry, idx) => (
          <li key={idx} className="whitespace-pre-line">{entry}</li>
        ))}
      </ul>
    </div>
  );
};

const HUNT_ACTIONS = [
  "Você atacou e causou 12 de dano!",
  "O inimigo defendeu e recebeu apenas 4 de dano.",
  "Você usou habilidade especial: Golpe Flamejante!",
  "O inimigo foi derrotado!"
];

const LOG_MAX = 5; // Quantidade máxima de mensagens visíveis
const LOG_LIFETIME = 2500; // Tempo de exibição de cada mensagem (ms)

export const HuntBattleLogAuto: React.FC = () => {
  const [log, setLog] = useState<string[]>([]);
  const logTimers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const actionIndex = useRef(0);

  // Adiciona uma nova ação ao log a cada intervalo
  useEffect(() => {
    const interval = setInterval(() => {
      setLog((prev) => {
        const nextAction = HUNT_ACTIONS[actionIndex.current % HUNT_ACTIONS.length];
        actionIndex.current++;
        // Adiciona nova mensagem
        return [...prev, nextAction].slice(-LOG_MAX);
      });
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  // Remove mensagens antigas automaticamente
  useEffect(() => {
    if (log.length === 0) return;
    // Limpa timers antigos
    logTimers.current.forEach(clearTimeout);
    logTimers.current = log.map((_, idx) =>
      setTimeout(() => {
        setLog((prev) => prev.length > 0 ? prev.slice(1) : prev);
      }, LOG_LIFETIME * (idx + 1))
    );
    return () => {
      logTimers.current.forEach(clearTimeout);
      logTimers.current = [];
    };
  }, [log]);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="mt-6 bg-[#1e2e1e]/80 rounded-lg p-4 max-h-40 min-h-32 w-full max-w-md overflow-y-hidden shadow-inner border border-green-700 transition-all duration-300">
        <h3 className="text-green-300 font-bold mb-2 text-sm tracking-wide">Log de Batalha</h3>
        <ul className="space-y-1 text-green-100 text-xs font-mono min-h-[80px]">
          {log.length === 0 && <li className="text-green-500 italic">Aguardando ação...</li>}
          {log.map((entry, idx) => (
            <li key={idx} className="whitespace-pre-line animate-fade-in-out">{entry}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// Componente de teste para simular ações de combate
export const HuntBattleLogDemo: React.FC = () => {
  const [log, setLog] = useState<string[]>([]);

  const actions = [
    "Você atacou e causou 12 de dano!",
    "O inimigo defendeu e recebeu apenas 4 de dano.",
    "Você usou habilidade especial: Golpe Flamejante!",
    "O inimigo foi derrotado!"
  ];

  const handleSimulate = () => {
    if (log.length < actions.length) {
      setLog([...log, actions[log.length]]);
    }
  };

  const handleReset = () => setLog([]);

  return (
    <div>
      <HuntBattleLog log={log} />
      <div className="flex gap-2 mt-2">
        <button onClick={handleSimulate} className="px-3 py-1 bg-green-700 text-white rounded hover:bg-green-800 transition">Simular ação</button>
        <button onClick={handleReset} className="px-3 py-1 bg-slate-600 text-white rounded hover:bg-slate-700 transition">Limpar log</button>
      </div>
    </div>
  );
};

export default HuntBattleLog;
