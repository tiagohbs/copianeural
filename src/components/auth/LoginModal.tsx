import { FC, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [lembrarEmail, setLembrarEmail] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você implementará a lógica de login
    console.log({ email, senha, lembrarEmail });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay com blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                     w-full max-w-md bg-gray-900 rounded-xl shadow-2xl z-50
                     border border-purple-500/20"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">
                  Entrar em <span className="text-purple-500">The Forged Souls</span>
                </h2>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg
                             text-white placeholder-gray-400 focus:outline-none focus:border-purple-500
                             transition-colors"
                    placeholder="seu@email.com"
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
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg
                             text-white placeholder-gray-400 focus:outline-none focus:border-purple-500
                             transition-colors"
                    placeholder="••••••••"
                    required
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={lembrarEmail}
                      onChange={(e) => setLembrarEmail(e.target.checked)}
                      className="w-4 h-4 text-purple-500 border-gray-700 rounded
                               focus:ring-purple-500 focus:ring-offset-gray-900"
                    />
                    <span className="text-sm text-gray-300">Lembrar meu email</span>
                  </label>

                  <a
                    href="/recuperar-senha"
                    className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    Esqueceu a senha?
                  </a>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-purple-600 text-white rounded-lg
                           hover:bg-purple-700 focus:outline-none focus:ring-2
                           focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900
                           transition-colors"
                >
                  Entrar
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-400">
                  Não tem uma conta?{' '}
                  <a
                    href="/cadastro"
                    className="text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    Cadastre-se
                  </a>
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default LoginModal; 