import { FC, useState } from 'react';
import LoginModal from './auth/LoginModal';

// Componente do cabeçalho da aplicação
const Header: FC = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  return (
    <header className="fixed w-full bg-black/80 backdrop-blur-sm z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo/Nome do jogo */}
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-white">
            <span className="text-purple-500">The</span> Forged Souls
          </h1>
        </div>

        {/* Botões de navegação */}
        <nav className="flex items-center gap-4">
          <button
            onClick={() => setIsLoginModalOpen(true)}
            className="px-4 py-2 text-white hover:text-purple-400 transition-colors"
          >
            Entrar
          </button>
          <button
            onClick={() => window.location.href = '/cadastro'}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Cadastrar-se
          </button>
        </nav>

        {/* Modal de Login */}
        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
        />
      </div>
    </header>
  );
};

export default Header; 