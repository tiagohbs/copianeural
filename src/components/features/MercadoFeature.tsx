import React, { useState } from 'react';
import { ShoppingCart, Search, Coins, Package, Clock } from 'lucide-react';

interface MarketItem {
  id: string;
  name: string;
  description: string;
  price: number;
  seller: string;
  rarity: 'Comum' | 'Incomum' | 'Raro' | 'Épico' | 'Lendário';
  type: 'Arma' | 'Armadura' | 'Consumível' | 'Material' | 'Especial';
  timeLeft: string;
  image?: string;
}

const MercadoFeature: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'buy' | 'sell' | 'history'>('buy');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('price');

  // Dados mockados para demonstração
  const marketItems: MarketItem[] = [
    {
      id: '1',
      name: 'Espada de Cristal',
      description: 'Espada mágica forjada com cristais raros',
      price: 2500,
      seller: 'AetherMaster',
      rarity: 'Raro',
      type: 'Arma',
      timeLeft: '2h 30min'
    },
    {
      id: '2',
      name: 'Poção de Cura Maior',
      description: 'Restaura 500 pontos de vida',
      price: 150,
      seller: 'CrystalMage',
      rarity: 'Incomum',
      type: 'Consumível',
      timeLeft: '45min'
    },
    {
      id: '3',
      name: 'Armadura de Dragão',
      description: 'Armadura resistente feita com escamas de dragão',
      price: 5000,
      seller: 'IronGuard',
      rarity: 'Épico',
      type: 'Armadura',
      timeLeft: '5h 15min'
    },
    {
      id: '4',
      name: 'Cristal de Poder',
      description: 'Material raro para encantamentos',
      price: 800,
      seller: 'ShadowHunter',
      rarity: 'Raro',
      type: 'Material',
      timeLeft: '1h 20min'
    },
    {
      id: '5',
      name: 'Anel da Invisibilidade',
      description: 'Permite ficar invisível por 30 segundos',
      price: 12000,
      seller: 'WindWalker',
      rarity: 'Lendário',
      type: 'Especial',
      timeLeft: '8h 45min'
    }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Comum': return 'text-gray-300';
      case 'Incomum': return 'text-green-300';
      case 'Raro': return 'text-blue-300';
      case 'Épico': return 'text-purple-300';
      case 'Lendário': return 'text-yellow-300';
      default: return 'text-gray-300';
    }
  };

  const getRarityBg = (rarity: string) => {
    switch (rarity) {
      case 'Comum': return 'bg-gray-600/30';
      case 'Incomum': return 'bg-green-600/30';
      case 'Raro': return 'bg-blue-600/30';
      case 'Épico': return 'bg-purple-600/30';
      case 'Lendário': return 'bg-yellow-600/30';
      default: return 'bg-gray-600/30';
    }
  };

  const filteredItems = marketItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.type === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="w-full">
      <div className="bg-gradient-to-br from-amber-900 via-amber-800 to-amber-900 rounded-lg border border-amber-700/50 p-8 w-full max-w-6xl mx-auto">
        <div className="w-full text-center pt-6 pb-8">
          <span className="text-lg text-amber-200 tracking-widest uppercase font-semibold">MERCADO</span>
        </div>

        {/* Estatísticas do Mercado */}
        <div className="bg-amber-800/30 rounded-lg p-6 mb-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-200">1,247</div>
              <div className="text-sm text-amber-400">Itens à Venda</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-200">89,450</div>
              <div className="text-sm text-amber-400">Transações Hoje</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-200">2.3M</div>
              <div className="text-sm text-amber-400">Ouro Circulando</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-200">15.2%</div>
              <div className="text-sm text-amber-400">Taxa de Vendas</div>
            </div>
          </div>
        </div>

        {/* Abas de Navegação */}
        <div className="flex space-x-1 mb-6">
          {[
            { id: 'buy', label: 'Comprar', icon: ShoppingCart },
            { id: 'sell', label: 'Vender', icon: Package },
            { id: 'history', label: 'Histórico', icon: Clock }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-amber-600/50 text-amber-100'
                  : 'bg-amber-800/30 text-amber-300 hover:bg-amber-700/30'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Filtros e Busca */}
        <div className="bg-amber-800/20 rounded-lg p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-amber-400" />
              <input
                type="text"
                placeholder="Buscar itens..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-amber-700/30 border border-amber-600/50 rounded-lg text-amber-100 placeholder-amber-400 focus:outline-none focus:border-amber-500"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 bg-amber-700/30 border border-amber-600/50 rounded-lg text-amber-100 focus:outline-none focus:border-amber-500"
            >
              <option value="all">Todas as Categorias</option>
              <option value="Arma">Armas</option>
              <option value="Armadura">Armaduras</option>
              <option value="Consumível">Consumíveis</option>
              <option value="Material">Materiais</option>
              <option value="Especial">Especiais</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-amber-700/30 border border-amber-600/50 rounded-lg text-amber-100 focus:outline-none focus:border-amber-500"
            >
              <option value="price">Preço</option>
              <option value="rarity">Raridade</option>
              <option value="time">Tempo Restante</option>
            </select>
          </div>
        </div>

        {/* Conteúdo das Abas */}
        <div className="bg-amber-800/20 rounded-lg p-6">
          {activeTab === 'buy' && (
            <div>
              <h3 className="text-xl font-semibold text-amber-100 mb-4">Itens Disponíveis</h3>
              <div className="grid gap-4">
                {filteredItems.map((item) => (
                  <div key={item.id} className={`${getRarityBg(item.rarity)} rounded-lg p-4 border border-amber-600/30`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-lg bg-amber-600/50 flex items-center justify-center">
                          <Package className="w-6 h-6 text-amber-200" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-amber-100">{item.name}</h4>
                          <p className="text-sm text-amber-300">{item.description}</p>
                          <div className="flex items-center space-x-4 mt-1">
                            <span className={`text-xs font-medium ${getRarityColor(item.rarity)}`}>
                              {item.rarity}
                            </span>
                            <span className="text-xs text-amber-400">{item.type}</span>
                            <span className="text-xs text-amber-500">Vendedor: {item.seller}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-2 mb-2">
                          <Coins className="w-4 h-4 text-yellow-400" />
                          <span className="text-lg font-bold text-amber-200">{item.price.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-xs text-amber-400">
                          <Clock className="w-3 h-3" />
                          <span>{item.timeLeft}</span>
                        </div>
                        <button className="mt-2 px-4 py-2 bg-amber-600/50 text-amber-100 rounded-lg hover:bg-amber-600/70 transition-colors">
                          Comprar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'sell' && (
            <div>
              <h3 className="text-xl font-semibold text-amber-100 mb-4">Vender Item</h3>
              <div className="bg-amber-700/20 rounded-lg p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-amber-200 mb-2">Selecionar Item</label>
                    <select className="w-full px-4 py-2 bg-amber-700/30 border border-amber-600/50 rounded-lg text-amber-100 focus:outline-none focus:border-amber-500">
                      <option>Selecione um item do seu inventário</option>
                      <option>Espada de Ferro</option>
                      <option>Poção de Mana</option>
                      <option>Cristal de Energia</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-amber-200 mb-2">Preço (Ouro)</label>
                    <input
                      type="number"
                      placeholder="Digite o preço"
                      className="w-full px-4 py-2 bg-amber-700/30 border border-amber-600/50 rounded-lg text-amber-100 placeholder-amber-400 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-amber-200 mb-2">Duração da Oferta</label>
                    <select className="w-full px-4 py-2 bg-amber-700/30 border border-amber-600/50 rounded-lg text-amber-100 focus:outline-none focus:border-amber-500">
                      <option>6 horas</option>
                      <option>12 horas</option>
                      <option>24 horas</option>
                      <option>48 horas</option>
                    </select>
                  </div>
                  <button className="w-full px-6 py-3 bg-amber-600/50 text-amber-100 rounded-lg hover:bg-amber-600/70 transition-colors font-semibold">
                    Colocar à Venda
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div>
              <h3 className="text-xl font-semibold text-amber-100 mb-4">Histórico de Transações</h3>
              <div className="space-y-3">
                <div className="bg-amber-700/20 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-amber-100">Compra - Espada de Cristal</div>
                      <div className="text-sm text-amber-400">Vendedor: AetherMaster</div>
                    </div>
                    <div className="text-right">
                      <div className="text-amber-200 font-semibold">-2,500 ouro</div>
                      <div className="text-sm text-amber-500">Há 2 horas</div>
                    </div>
                  </div>
                </div>
                <div className="bg-amber-700/20 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-amber-100">Venda - Poção de Cura</div>
                      <div className="text-sm text-amber-400">Comprador: ShadowHunter</div>
                    </div>
                    <div className="text-right">
                      <div className="text-green-400 font-semibold">+150 ouro</div>
                      <div className="text-sm text-amber-500">Há 5 horas</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MercadoFeature; 