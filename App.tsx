import React, { useState } from 'react';
import BottomNav from './components/BottomNav';
import RoutinePage from './pages/RoutinePage';
import ProgressPage from './pages/ProgressPage';
import BookingPage from './pages/BookingPage';
import ProceduresPage from './pages/ProceduresPage';
import ShopPage from './pages/ShopPage';
import DashboardPage from './pages/DashboardPage';
import { Page } from './types';
import useLocalStorage from './hooks/useLocalStorage';
import { CogIcon, SparklesIcon } from './components/icons/Icons';

const SettingsModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  setUserName: (name: string) => void;
}> = ({ isOpen, onClose, userName, setUserName }) => {
  const [name, setName] = useState(userName);

  if (!isOpen) return null;

  const handleSave = () => {
    setUserName(name);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm shadow-xl">
        <h2 className="text-lg font-bold mb-4">Preferências</h2>
        <div className="space-y-2">
            <label htmlFor="name-input" className="block text-sm font-medium text-gray-700">Seu nome</label>
            <input 
                id="name-input"
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                placeholder="Como podemos te chamar?"
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-[#E18AAA] focus:border-transparent"
            />
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg">Cancelar</button>
          <button onClick={handleSave} className="px-4 py-2 bg-[#E18AAA] text-white rounded-lg">Salvar</button>
        </div>
      </div>
    </div>
  );
};


const App: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>('routine');
  const [userName, setUserName] = useLocalStorage<string>('user_name', '');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const renderPage = () => {
    switch (activePage) {
      case 'routine':
        return <RoutinePage userName={userName} />;
      case 'diary':
        return <ProgressPage />;
      case 'progress':
        return <DashboardPage />;
      case 'procedures':
        return <ProceduresPage />;
      case 'shop':
        return <ShopPage />;
      case 'booking':
        return <BookingPage />;
      default:
        return <RoutinePage userName={userName} />;
    }
  };

  return (
    <div className="bg-pink-50 min-h-screen font-sans text-gray-800">
      <div className="pb-20">
        <header className="bg-white shadow-md sticky top-0 z-10 p-3 flex justify-between items-center">
            <div className="flex items-center gap-2">
                <div className="text-[#E18AAA]">
                    <SparklesIcon />
                </div>
                <h1 className="text-lg font-bold text-[#b35f78]">Innova Skincare</h1>
            </div>
            <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600 hidden sm:block">Olá, {userName || 'Querida'}</span>
                <button onClick={() => setIsSettingsOpen(true)} className="text-gray-500 hover:text-[#E18AAA]">
                    <CogIcon />
                </button>
            </div>
        </header>
        <main className="p-4">
            {renderPage()}
        </main>
      </div>
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} userName={userName} setUserName={setUserName} />
      <BottomNav activePage={activePage} setActivePage={setActivePage} />
    </div>
  );
};

export default App;