import React from 'react';
import { Page } from '../types';
import { HomeIcon, CalendarIcon, SparklesIcon, ShoppingBagIcon, FlagIcon, CameraIcon } from './icons/Icons';

interface BottomNavProps {
  activePage: Page;
  setActivePage: (page: Page) => void;
}

const NavItem: React.FC<{
    icon: React.ReactNode;
    label: string;
    isActive: boolean;
    onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => {
    const activeClass = isActive ? 'text-[#E18AAA]' : 'text-gray-400';
    return (
        <button onClick={onClick} className={`flex flex-col items-center justify-center w-full pt-2 pb-1 transition-colors duration-200 ${activeClass} hover:text-[#E18AAA]`}>
            {icon}
            <span className="text-xs mt-1">{label}</span>
        </button>
    );
};

const BottomNav: React.FC<BottomNavProps> = ({ activePage, setActivePage }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-white shadow-[0_-2px_5px_rgba(0,0,0,0.1)] flex justify-around items-center z-20">
      <NavItem
        icon={<HomeIcon />}
        label="Rotina"
        isActive={activePage === 'routine'}
        onClick={() => setActivePage('routine')}
      />
      <NavItem
        icon={<CameraIcon className="h-6 w-6"/>}
        label="Diário"
        isActive={activePage === 'diary'}
        onClick={() => setActivePage('diary')}
      />
      <NavItem
        icon={<FlagIcon />}
        label="Progresso"
        isActive={activePage === 'progress'}
        onClick={() => setActivePage('progress')}
      />
      <NavItem
        icon={<SparklesIcon />}
        label="Serviços"
        isActive={activePage === 'procedures'}
        onClick={() => setActivePage('procedures')}
      />
      <NavItem
        icon={<ShoppingBagIcon />}
        label="Achadinhos"
        isActive={activePage === 'shop'}
        onClick={() => setActivePage('shop')}
      />
      <NavItem
        icon={<CalendarIcon />}
        label="Agendar"
        isActive={activePage === 'booking'}
        onClick={() => setActivePage('booking')}
      />
    </div>
  );
};

export default BottomNav;