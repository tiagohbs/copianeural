import { FC } from 'react';

const HeroSection: FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-purple-900 overflow-hidden">
      {/* Imagem de fundo com overlay */}
      <div 
        className="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center opacity-20"
        style={{ backgroundImage: "url('/hero-bg.jpg')" }}
      />
      
      {/* Conteúdo principal */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
          <span className="text-purple-500">The</span> Forged Souls
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Entre em um mundo onde almas forjadas em batalha encontram seu destino.
          Uma jornada épica de coragem e superação.
        </p>
        
        <button
          onClick={() => window.location.href = '/jogar'}
          className="px-8 py-4 bg-purple-600 text-white text-xl rounded-lg 
                   hover:bg-purple-700 transform hover:scale-105 transition-all
                   shadow-lg hover:shadow-purple-500/50"
        >
          Jogar Agora
        </button>
        
        {/* Botão de scroll suave */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <button
            onClick={() => {
              document.getElementById('noticias')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-white/70 hover:text-white transition-colors"
          >
            <span className="block mb-2">Ver mais</span>
            <svg
              className="w-6 h-6 mx-auto animate-bounce"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 