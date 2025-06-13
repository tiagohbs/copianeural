import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ParticleBackground from '../components/ParticleBackground';
import { useGame } from '../contexts/GameContext';
import { Character } from '../types/game';

interface PersonagemData {
  nome: string;
  classe: string;
  raca: string;
  genero: string;
  aparicao: string;
}

const CriarPersonagem: FC = () => {
  const navigate = useNavigate();
  const { dispatch } = useGame();
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

  const generos = ['Masculino', 'Feminino'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPersonagem(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar se todos os campos obrigatórios estão preenchidos
    if (!personagem.nome || !personagem.classe || !personagem.raca || !personagem.genero || !personagem.aparicao) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    // Criar personagem no formato do contexto global
    const novoPersonagem: Character = {
      id: Date.now().toString(),
      name: personagem.nome,
      level: 1,
      experience: 0,
      experienceToNext: 100,
      health: 100,
      maxHealth: 100,
      attributes: {
        forca: 5,
        vitalidade: 5,
        agilidade: 5,
        sinergiaCosmica: 5
      },
      createdAt: new Date()
    };
    dispatch({ type: 'ADD_CHARACTER', payload: novoPersonagem });
    navigate('/selecao-personagem');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-emerald-950 to-slate-900 text-white relative overflow-hidden font-sans">
      <ParticleBackground />
      <div className="relative z-10">
        <Header />
        
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-emerald-400 via-green-300 to-emerald-600 bg-clip-text text-transparent font-sans">
              Criar Seu Personagem
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6 bg-emerald-950/80 backdrop-blur-sm p-8 rounded-xl border border-emerald-500/20 shadow-lg">
              <div>
                <label htmlFor="nome" className="block text-sm font-medium text-emerald-200 mb-1 font-sans">
                  Nome do Personagem
                </label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={personagem.nome}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-emerald-900 border border-emerald-700 rounded-lg text-white placeholder-emerald-400 focus:outline-none focus:border-emerald-400 transition-colors font-sans"
                  required
                />
              </div>

              <div>
                <label htmlFor="classe" className="block text-sm font-medium text-emerald-200 mb-1 font-sans">
                  Classe
                </label>
                <select
                  id="classe"
                  name="classe"
                  value={personagem.classe}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-emerald-900 border border-emerald-700 rounded-lg text-white focus:outline-none focus:border-emerald-400 transition-colors font-sans"
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
                <label htmlFor="raca" className="block text-sm font-medium text-emerald-200 mb-1 font-sans">
                  Raça
                </label>
                <select
                  id="raca"
                  name="raca"
                  value={personagem.raca}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-emerald-900 border border-emerald-700 rounded-lg text-white focus:outline-none focus:border-emerald-400 transition-colors font-sans"
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
                <label htmlFor="genero" className="block text-sm font-medium text-emerald-200 mb-1 font-sans">
                  Gênero
                </label>
                <select
                  id="genero"
                  name="genero"
                  value={personagem.genero}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-emerald-900 border border-emerald-700 rounded-lg text-white focus:outline-none focus:border-emerald-400 transition-colors font-sans"
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
                <label htmlFor="aparicao" className="block text-sm font-medium text-emerald-200 mb-1 font-sans">
                  Descrição da Aparência
                </label>
                <textarea
                  id="aparicao"
                  name="aparicao"
                  value={personagem.aparicao}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-emerald-900 border border-emerald-700 rounded-lg text-white placeholder-emerald-400 focus:outline-none focus:border-emerald-400 transition-colors h-32 resize-none font-sans"
                  placeholder="Descreva a aparência do seu personagem..."
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-emerald-950 transition-colors font-bold font-sans shadow"
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