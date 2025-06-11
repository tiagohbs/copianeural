import React, { useEffect, useState } from 'react';
import { useGame } from '../../contexts/GameContext';
import { Zap, Shield, Sword } from 'lucide-react';

/**
 * Tela de carregamento inicial
 * Exibe logotipo animado e indicador de progresso
 */
function SplashScreen() {
  const { dispatch } = useGame();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simular carregamento
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          // Navegar para tela de login após carregamento
          setTimeout(() => {
            dispatch({ type: 'SET_SCREEN', payload: 'login' });
          }, 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative">
      {/* Logotipo principal */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-6">
          <div className="relative">
            {/* Símbolo alienígena medieval */}
            <div className="w-32 h-32 relative animate-float">
              <div className="absolute inset-0 bg-gradient-to-br from-alien-glow to-cosmic-purple rounded-full animate-glow" />
              <div className="absolute inset-2 bg-cosmic-darkBlue rounded-full flex items-center justify-center">
                <div className="flex space-x-2">
                  <Sword className="w-8 h-8 text-cosmic-gold animate-pulse" />
                  <Shield className="w-8 h-8 text-alien-crystal animate-pulse" style={{ animationDelay: '0.5s' }} />
                  <Zap className="w-8 h-8 text-alien-glow animate-pulse" style={{ animationDelay: '1s' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <h1 className="text-6xl font-medieval font-bold bg-gradient-to-r from-cosmic-gold via-alien-crystal to-alien-glow bg-clip-text text-transparent mb-4">
          NEXUS
        </h1>
        <h2 className="text-2xl font-tech text-alien-crystal mb-2">
          MEDIEVAL ESPACIAL
        </h2>
        <p className="text-gray-400 font-tech">
          Onde a magia antiga encontra a tecnologia cósmica
        </p>
      </div>

      {/* Indicador de carregamento */}
      <div className="w-80 mb-8">
        <div className="flex justify-between text-sm text-gray-400 mb-2">
          <span>Inicializando sistemas...</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-black/50 rounded-full h-2 border border-alien-crystal/30">
          <div 
            className="h-full bg-gradient-to-r from-cosmic-purple to-alien-glow rounded-full transition-all duration-300 relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse" />
          </div>
        </div>
      </div>

      {/* Runas flutuantes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute text-alien-glow/20 text-4xl animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          >
            ⟐
          </div>
        ))}
      </div>
    </div>
  );
}

export default SplashScreen;