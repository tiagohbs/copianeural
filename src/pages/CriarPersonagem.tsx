import { FC, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ParticleBackground from '../components/ParticleBackground';

interface PersonagemData {
  nome: string;
  classe: string;
  raca: string;
  genero: string;
  aparicao: string;
}

const CriarPersonagem: FC = () => {
  const [personagem, setPersonagem] = useState<PersonagemData>({
    nome: '',
    classe: '',
    raca: '',
    genero: '',
    aparicao: ''
  });

  const classes = [
    'Guerreiro',
    'Mago',
    'Arqueiro',
    'Ladino',
    'Clérigo',
    'Bárbaro'
  ];

  const racas = [
    'Humano',
    'Elfo',
    'Anão',
    'Orc',
    'Meio-Elfo',
    'Gnomo'
  ];

  const generos = ['Masculino', 'Feminino', 'Não-binário'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPersonagem(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você implementaria a lógica de criação do personagem
    console.log('Dados do personagem:', personagem);
    // Redirecionar para o jogo
    window.location.href = '/jogo';
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <ParticleBackground />
      <div className="relative z-10">
        <Header />
        
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-8">
              Criar Seu Personagem
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6 bg-gray-900/80 backdrop-blur-sm p-8 rounded-xl border border-purple-500/20">
              <div>
                <label htmlFor="nome" className="block text-sm font-medium text-gray-300 mb-1">
                  Nome do Personagem
                </label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={personagem.nome}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg
                           text-white placeholder-gray-400 focus:outline-none focus:border-purple-500
                           transition-colors"
                  required
                />
              </div>

              <div>
                <label htmlFor="classe" className="block text-sm font-medium text-gray-300 mb-1">
                  Classe
                </label>
                <select
                  id="classe"
                  name="classe"
                  value={personagem.classe}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg
                           text-white focus:outline-none focus:border-purple-500 transition-colors"
                  required
                >
                  <option value="">Selecione uma classe</option>
                  {classes.map(classe => (
                    <option key={classe} value={classe}>
                      {classe}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="raca" className="block text-sm font-medium text-gray-300 mb-1">
                  Raça
                </label>
                <select
                  id="raca"
                  name="raca"
                  value={personagem.raca}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg
                           text-white focus:outline-none focus:border-purple-500 transition-colors"
                  required
                >
                  <option value="">Selecione uma raça</option>
                  {racas.map(raca => (
                    <option key={raca} value={raca}>
                      {raca}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="genero" className="block text-sm font-medium text-gray-300 mb-1">
                  Gênero
                </label>
                <select
                  id="genero"
                  name="genero"
                  value={personagem.genero}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg
                           text-white focus:outline-none focus:border-purple-500 transition-colors"
                  required
                >
                  <option value="">Selecione um gênero</option>
                  {generos.map(genero => (
                    <option key={genero} value={genero}>
                      {genero}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="aparicao" className="block text-sm font-medium text-gray-300 mb-1">
                  Descrição da Aparência
                </label>
                <textarea
                  id="aparicao"
                  name="aparicao"
                  value={personagem.aparicao}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg
                           text-white placeholder-gray-400 focus:outline-none focus:border-purple-500
                           transition-colors h-32 resize-none"
                  placeholder="Descreva a aparência do seu personagem..."
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-purple-600 text-white rounded-lg
                         hover:bg-purple-700 focus:outline-none focus:ring-2
                         focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900
                         transition-colors"
              >
                Criar Personagem
              </button>
            </form>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default CriarPersonagem; 