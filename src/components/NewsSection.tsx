import { FC } from 'react';

// Interface para o tipo de notícia
interface Noticia {
  id: number;
  data: string;
  titulo: string;
  descricao: string;
}

// Dados mockados de exemplo
const noticiasExemplo: Noticia[] = [
  {
    id: 1,
    data: '15/03/2024',
    titulo: 'Nova Atualização: Sistema de Combate Aprimorado',
    descricao: 'Introduzimos um sistema de combate totalmente renovado com novas mecânicas e animações.'
  },
  {
    id: 2,
    data: '10/03/2024',
    titulo: 'Evento Especial: Festival da Primavera',
    descricao: 'Participe do nosso evento sazonal com recompensas exclusivas e desafios especiais.'
  },
  {
    id: 3,
    data: '05/03/2024',
    titulo: 'Novo Personagem: Guardião Neural',
    descricao: 'Conheça o mais novo personagem jogável com habilidades únicas e história cativante.'
  }
];

const NewsSection: FC = () => {
  return (
    <section id="noticias" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
          Últimas Notícias
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {noticiasExemplo.map((noticia) => (
            <article
              key={noticia.id}
              className="bg-gray-800 rounded-lg overflow-hidden transform hover:scale-105 transition-transform"
            >
              <div className="p-6">
                <time className="text-purple-400 text-sm">{noticia.data}</time>
                <h3 className="text-xl font-semibold text-white mt-2 mb-3">
                  {noticia.titulo}
                </h3>
                <p className="text-gray-300">
                  {noticia.descricao}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => window.location.href = '/noticias'}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg
                     hover:bg-purple-700 transition-colors inline-flex items-center gap-2"
          >
            Ver todas as notícias
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default NewsSection; 