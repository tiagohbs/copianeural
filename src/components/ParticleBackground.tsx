import React, { useEffect, useRef } from 'react';

/**
 * Componente de fundo com partículas animadas
 * Cria um efeito visual de partículas flutuantes no estilo espacial
 */
function ParticleBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Criar partículas
    const createParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // Posição aleatória
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      
      // Tamanho aleatório
      const size = Math.random() * 3 + 1;
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';
      
      // Duração da animação aleatória
      particle.style.animationDuration = (Math.random() * 4 + 3) + 's';
      particle.style.animationDelay = Math.random() * 2 + 's';
      
      container.appendChild(particle);
      
      // Remover partícula após um tempo
      setTimeout(() => {
        if (container.contains(particle)) {
          container.removeChild(particle);
        }
      }, 8000);
    };

    // Criar partículas iniciais
    for (let i = 0; i < 50; i++) {
      setTimeout(createParticle, i * 100);
    }

    // Continuar criando partículas
    const interval = setInterval(createParticle, 200);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <div ref={containerRef} className="particle-bg" />;
}

export default ParticleBackground;