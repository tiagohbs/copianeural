import { FC, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ParticleBackground from '../components/ParticleBackground';

interface SenhaStrength {
  score: number;
  feedback: string;
}

const Cadastro: FC = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    dataNascimento: '',
    aceiteTermos: false
  });

  const [senhaStrength, setSenhaStrength] = useState<SenhaStrength>({
    score: 0,
    feedback: ''
  });

  // Função para calcular a força da senha
  const calcularForcaSenha = (senha: string): SenhaStrength => {
    let score = 0;
    const feedback: string[] = [];

    if (senha.length < 8) {
      feedback.push('A senha deve ter pelo menos 8 caracteres');
    } else {
      score += 1;
    }

    if (/[A-Z]/.test(senha)) {
      score += 1;
    } else {
      feedback.push('Adicione letras maiúsculas');
    }

    if (/[a-z]/.test(senha)) {
      score += 1;
    } else {
      feedback.push('Adicione letras minúsculas');
    }

    if (/[0-9]/.test(senha)) {
      score += 1;
    } else {
      feedback.push('Adicione números');
    }

    if (/[^A-Za-z0-9]/.test(senha)) {
      score += 1;
    } else {
      feedback.push('Adicione caracteres especiais');
    }

    return {
      score,
      feedback: feedback.join(', ')
    };
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));

    if (name === 'senha') {
      setSenhaStrength(calcularForcaSenha(value));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.senha !== formData.confirmarSenha) {
      alert('As senhas não coincidem!');
      return;
    }
    if (senhaStrength.score < 3) {
      alert('A senha não é forte o suficiente!');
      return;
    }
    // Aqui você implementará a lógica de cadastro
    console.log('Dados do formulário:', formData);
    // Redirecionar para a página de verificação
    window.location.href = '/verificacao';
  };

  const getStrengthColor = (score: number) => {
    switch (score) {
      case 0:
      case 1:
        return 'bg-red-500';
      case 2:
        return 'bg-yellow-500';
      case 3:
        return 'bg-orange-500';
      case 4:
        return 'bg-green-500';
      case 5:
        return 'bg-emerald-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <ParticleBackground />
      <div className="relative z-10">
        <Header />
        
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-8">
              Criar Conta em <span className="text-purple-500">The Forged Souls</span>
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6 bg-gray-900/80 backdrop-blur-sm p-8 rounded-xl border border-purple-500/20">
              <div>
                <label htmlFor="nome" className="block text-sm font-medium text-gray-300 mb-1">
                  Nome Completo
                </label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg
                           text-white placeholder-gray-400 focus:outline-none focus:border-purple-500
                           transition-colors"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg
                           text-white placeholder-gray-400 focus:outline-none focus:border-purple-500
                           transition-colors"
                  required
                />
              </div>

              <div>
                <label htmlFor="dataNascimento" className="block text-sm font-medium text-gray-300 mb-1">
                  Data de Nascimento
                </label>
                <input
                  type="date"
                  id="dataNascimento"
                  name="dataNascimento"
                  value={formData.dataNascimento}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg
                           text-white placeholder-gray-400 focus:outline-none focus:border-purple-500
                           transition-colors"
                  required
                />
              </div>

              <div>
                <label htmlFor="senha" className="block text-sm font-medium text-gray-300 mb-1">
                  Senha
                </label>
                <input
                  type="password"
                  id="senha"
                  name="senha"
                  value={formData.senha}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg
                           text-white placeholder-gray-400 focus:outline-none focus:border-purple-500
                           transition-colors"
                  required
                />
                {formData.senha && (
                  <div className="mt-2">
                    <div className="h-1 w-full bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${getStrengthColor(senhaStrength.score)} transition-all duration-300`}
                        style={{ width: `${(senhaStrength.score / 5) * 100}%` }}
                      />
                    </div>
                    {senhaStrength.feedback && (
                      <p className="text-sm text-gray-400 mt-1">{senhaStrength.feedback}</p>
                    )}
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="confirmarSenha" className="block text-sm font-medium text-gray-300 mb-1">
                  Confirmar Senha
                </label>
                <input
                  type="password"
                  id="confirmarSenha"
                  name="confirmarSenha"
                  value={formData.confirmarSenha}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg
                           text-white placeholder-gray-400 focus:outline-none focus:border-purple-500
                           transition-colors"
                  required
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="aceiteTermos"
                  name="aceiteTermos"
                  checked={formData.aceiteTermos}
                  onChange={handleChange}
                  className="w-4 h-4 text-purple-500 border-gray-700 rounded
                           focus:ring-purple-500 focus:ring-offset-gray-900"
                  required
                />
                <label htmlFor="aceiteTermos" className="text-sm text-gray-300">
                  Eu li e aceito os{' '}
                  <a href="/termos" className="text-purple-400 hover:text-purple-300">
                    Termos de Uso
                  </a>
                  {' '}e{' '}
                  <a href="/privacidade" className="text-purple-400 hover:text-purple-300">
                    Política de Privacidade
                  </a>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg
                         transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500
                         focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                Criar Conta
              </button>
            </form>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Cadastro; 