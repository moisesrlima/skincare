import React from 'react';
import { shopItems } from '../data/shopItems';
import { ShopItem } from '../types';
import { ShareIcon } from '../components/icons/Icons';

const ShopItemCard: React.FC<{ item: ShopItem }> = ({ item }) => {
  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const shareData = {
      title: item.name,
      text: `Confira este achadinho da Shopee: ${item.name}`,
      url: item.shopeeLink,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error("Erro ao compartilhar:", err);
      }
    } else {
      navigator.clipboard.writeText(item.shopeeLink);
      alert('Link do produto copiado para a área de transferência!');
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col justify-between border border-transparent hover:border-pink-300 hover:shadow-lg transition-all duration-300">
      <div>
        <a href={item.shopeeLink} target="_blank" rel="noopener noreferrer">
            <div className="relative">
                <img src={item.imageUrl} alt={item.name} className="w-full h-40 object-cover" />
                {item.discount && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">{item.discount}</div>
                )}
            </div>
          <div className="p-4">
            <h3 className="font-semibold text-sm text-gray-800 h-10 overflow-hidden">{item.name}</h3>
            <div className="mt-2 flex items-baseline gap-2">
                <p className="text-lg font-bold text-[#E18AAA]">{item.price}</p>
                {item.originalPrice && <p className="text-sm text-gray-400 line-through">{item.originalPrice}</p>}
            </div>
          </div>
        </a>
      </div>
      <div className="p-4 pt-0 flex items-center gap-2">
        <a 
          href={item.shopeeLink} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex-grow bg-[#E18AAA] text-white text-center font-bold py-2 px-4 rounded-lg text-sm hover:bg-[#c56e89] transition-colors"
        >
          Ver na Shopee
        </a>
        <button 
          onClick={handleShare} 
          className="p-2 text-gray-500 hover:bg-pink-50 hover:text-[#E18AAA] rounded-full transition-colors"
          aria-label="Compartilhar"
        >
          <ShareIcon className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

const ShopPage: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Achadinhos da Shopee</h2>
        <p className="text-gray-600">Produtos testados e aprovados pela Dra. Marilane!</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {shopItems.map(item => (
          <ShopItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default ShopPage;