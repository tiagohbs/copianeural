import { FC } from 'react';

// Interface para o tipo de feature
interface Feature {
  id: number;
  titulo: string;
  descricao: string;
  icone: string;
}

// Dados mockados de exemplo
const features: Feature[] = [
  {
    id: 1,
    titulo: 'Novos Personagens',
    descricao: 'Explore um elenco diverso de personagens, cada um com habilidades únicas e histórias cativantes.',
    icone: '👥'
  },
  {
    id: 2,
    titulo: 'Sistema Neural Avançado',
    descricao: 'Experimente um sistema de IA revolucionário que adapta o jogo ao seu estilo de jogo.',
    icone: '🧠'
  },
  {
    id: 3,
    titulo: 'Comunidade Ativa',
    descricao: 'Junte-se a milhares de jogadores em nossa comunidade vibrante no Discord.',
    icone: '💬'
  }
];

const FeaturesSection: FC = () => {
  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-16">
          Recursos e Novidades
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8
                       border border-purple-500/20 hover:border-purple-500/40
                       transform hover:scale-105 transition-all"
            >
              <div className="text-4xl mb-4">{feature.icone}</div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {feature.titulo}
              </h3>
              <p className="text-gray-300">
                {feature.descricao}
              </p>
            </div>
          ))}
        </div>

        {/* Seção de Discord */}
        <div className="mt-20 text-center">
          <div className="bg-purple-900/30 backdrop-blur-sm rounded-xl p-8 max-w-2xl mx-auto
                        border border-purple-500/20">
            <h3 className="text-2xl font-bold text-white mb-4">
              Junte-se à Nossa Comunidade
            </h3>
            <p className="text-gray-300 mb-6">
              Entre em nosso servidor Discord para ficar por dentro das novidades,
              participar de eventos e conhecer outros jogadores.
            </p>
            <button
              onClick={() => window.open('https://discord.gg/seu-link-aqui', '_blank')}
              className="px-6 py-3 bg-[#5865F2] text-white rounded-lg
                       hover:bg-[#4752C4] transition-colors inline-flex items-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
              Entrar no Discord
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection; 