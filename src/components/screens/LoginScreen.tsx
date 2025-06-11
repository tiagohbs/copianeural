import React, { useState } from 'react';
import { useGame } from '../../contexts/GameContext';
import { User, Lock, Sparkles } from 'lucide-react';

/**
 * Tela de login e registro
 * Interface holográfica com design medieval-espacial
 */
function LoginScreen() {
  const { dispatch } = useGame();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação básica
    if (!formData.email || !formData.password) {
      alert('Por favor, preencha todos os campos');
      return;
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      alert('As senhas não coincidem');
      return;
    }

    // Simular login/registro
    const user = {
      id: Date.now().toString(),
      email: formData.email,
      username: formData.email.split('@')[0],
      createdAt: new Date()
    };

    dispatch({ type: 'SET_USER', payload: user });
    dispatch({ type: 'SET_SCREEN', payload: 'character-selection' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="cosmic-panel w-full max-w-md p-8">
        {/* Cabeçalho */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-alien-glow to-cosmic-purple rounded-full mb-4 animate-glow">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-medieval font-bold text-alien-crystal mb-2">
            {isLogin ? 'Acesso Neural' : 'Registro Cósmico'}
          </h2>
          <p className="text-gray-400 text-sm">
            {isLogin ? 'Conecte-se à rede mental alienígena' : 'Crie sua identidade no nexus'}
          </p>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email Quântico
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="input-cosmic w-full pl-10"
                placeholder="seu@email.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Código de Acesso
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="input-cosmic w-full pl-10"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Confirmar Código
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="input-cosmic w-full pl-10"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="btn-cosmic w-full text-white font-semibold"
          >
            {isLogin ? 'Conectar ao Nexus' : 'Criar Identidade'}
          </button>
        </form>

        {/* Alternar entre login e registro */}
        <div className="mt-6 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-alien-crystal hover:text-alien-glow transition-colors duration-300 text-sm"
          >
            {isLogin 
              ? 'Não possui acesso? Criar nova identidade' 
              : 'Já possui acesso? Conectar ao nexus'
            }
          </button>
        </div>

        {/* Decoração */}
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-alien-glow rounded-full animate-pulse" />
        <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-cosmic-gold rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
    </div>
  );
}

export default LoginScreen;