import { FC, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import ParticleBackground from '../ParticleBackground';

const VerificacaoScreen: FC = () => {
  const [codigo, setCodigo] = useState(['', '', '', '', '', '']);
  const [tempoRestante, setTempoRestante] = useState(300); // 5 minutos em segundos
  const [etapa, setEtapa] = useState<'verificacao' | 'sucesso'>('verificacao');
  const navigate = useNavigate();

  // Simulação de envio do código
  useEffect(() => {
    // Aqui você implementaria a lógica de envio do código
    // Exemplo: enviar email
  }, []);

  // Timer para reenvio do código
  useEffect(() => {
    if (tempoRestante > 0) {
      const timer = setInterval(() => {
        setTempoRestante(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [tempoRestante]);

  const formatarTempo = (segundos: number) => {
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = segundos % 60;
    return `${minutos}:${segundosRestantes.toString().padStart(2, '0')}`;
  };

  const handleCodigoChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const novoCodigo = [...codigo];
    novoCodigo[index] = value;
    setCodigo(novoCodigo);
    if (value && index < 5) {
      const proximoInput = document.getElementById(`codigo-${index + 1}`);
      proximoInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !codigo[index] && index > 0) {
      const inputAnterior = document.getElementById(`codigo-${index - 1}`);
      inputAnterior?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const codigoCompleto = codigo.join('');
    // Simulação de verificação bem-sucedida
    if (codigoCompleto.length === 6) {
      setEtapa('sucesso');
    }
  };

  const handleContinuar = () => {
    navigate('/selecao-personagem');
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden font-sans">
      <ParticleBackground />
      <div className="relative z-10">
        <Header />
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-md mx-auto">
            <div className="bg-gray-900/80 backdrop-blur-sm p-8 rounded-xl border border-emerald-500/20">
              {etapa === 'verificacao' ? (
                <>
                  <h1 className="text-2xl font-bold text-center mb-6">
                    Verificação em Duas Etapas
                  </h1>
                  <p className="text-gray-300 text-center mb-8">
                    Enviamos um código de verificação para o seu email.<br />
                    Por favor, insira o código abaixo.
                  </p>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex justify-center space-x-2">
                      {codigo.map((digito, index) => (
                        <input
                          key={index}
                          id={`codigo-${index}`}
                          type="text"
                          maxLength={1}
                          value={digito}
                          onChange={(e) => handleCodigoChange(index, e.target.value)}
                          onKeyDown={(e) => handleKeyDown(index, e)}
                          className="w-12 h-12 text-center text-xl bg-gray-800 border border-emerald-700 rounded-lg text-white focus:outline-none focus:border-emerald-400 transition-colors"
                          required
                        />
                      ))}
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-400">
                        {tempoRestante > 0 ? (
                          <>Código expira em {formatarTempo(tempoRestante)}</>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setTempoRestante(300)}
                            className="text-emerald-400 hover:text-emerald-300 transition-colors"
                          >
                            Reenviar código
                          </button>
                        )}
                      </p>
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3 px-4 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors font-bold font-sans shadow"
                    >
                      Verificar Código
                    </button>
                  </form>
                </>
              ) : (
                <>
                  <h1 className="text-2xl font-bold text-center mb-6 text-emerald-400">
                    Código Aceito!
                  </h1>
                  <div className="text-center space-y-6">
                    <div className="w-16 h-16 bg-green-500 rounded-full mx-auto flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-300">
                      Sua verificação foi concluída com sucesso!<br />
                      Clique em continuar para acessar a seleção de personagens.
                    </p>
                    <button
                      onClick={handleContinuar}
                      className="w-full py-3 px-4 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors font-bold font-sans shadow"
                    >
                      Continuar
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default VerificacaoScreen; 