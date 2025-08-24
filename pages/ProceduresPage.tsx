import React, { useState, useMemo } from 'react';
import { procedures } from '../data/procedures';
import { Procedure } from '../types';
import { SearchIcon, WhatsAppIcon } from '../components/icons/Icons';

const ProcedureCard: React.FC<{ procedure: Procedure }> = ({ procedure }) => {
  const whatsappNumber = "556184260528";
  const message = `Olá! 👋 Tenho interesse no procedimento "${procedure.name}" e gostaria de mais informações.`;
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-pink-100 flex flex-col justify-between">
      <div>
        <h3 className="font-bold text-md text-[#b35f78]">{procedure.name}</h3>
        <p className="text-sm text-gray-600 mt-1">{procedure.description}</p>
      </div>
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex items-center gap-2 self-start bg-green-50 text-green-700 font-semibold py-1 px-3 rounded-full text-sm hover:bg-green-100 transition-colors"
      >
        <WhatsAppIcon className="h-4 w-4" />
        Saber mais
      </a>
    </div>
  );
};


const ProceduresPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | Procedure['category']>('all');

  const categories: ['all', ...Procedure['category'][]] = useMemo(() => {
    const uniqueCategories = [...new Set(procedures.map(p => p.category))];
    return ['all', ...uniqueCategories];
  }, []);

  const filteredProcedures = useMemo(() => {
    return procedures.filter(procedure => {
      const matchesCategory = activeCategory === 'all' || procedure.category === activeCategory;
      const matchesSearch = procedure.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            procedure.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, activeCategory]);

  const CategoryButton: React.FC<{ category: typeof activeCategory, name: string }> = ({ category, name }) => (
    <button
      onClick={() => setActiveCategory(category)}
      className={`px-3 py-1 text-sm font-medium rounded-full transition-colors ${
        activeCategory === category
          ? 'bg-[#E18AAA] text-white'
          : 'bg-white text-gray-700 border'
      }`}
    >
      {name}
    </button>
  );

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-center">Nossos Serviços</h2>
      
      <div className="relative">
        <input
          type="text"
          placeholder="Buscar por um serviço..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-[#E18AAA] focus:border-transparent"
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <SearchIcon className="text-gray-400" />
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2">
        <CategoryButton category="all" name="Todos" />
        <CategoryButton category="Facial" name="Facial" />
        <CategoryButton category="Corporal" name="Corporal" />
        <CategoryButton category="Depilação a Laser" name="Depilação" />
      </div>

      {filteredProcedures.length > 0 ? (
        <div className="space-y-3">
          {filteredProcedures.map(procedure => (
            <ProcedureCard key={procedure.id} procedure={procedure} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 px-4 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700">Nenhum serviço encontrado</h3>
            <p className="mt-2 text-gray-500">
                Não encontrou o que procurava? Nossa equipe está pronta para ajudar você a encontrar o tratamento ideal.
            </p>
            <a 
                href="https://wa.me/556184260528"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition-colors"
            >
                <WhatsAppIcon />
                Conversar no WhatsApp
            </a>
        </div>
      )}
    </div>
  );
};

export default ProceduresPage;
