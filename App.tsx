import React, { useState, useEffect } from 'react';
import BottomNav from './components/BottomNav';
import RoutinePage from './pages/RoutinePage';
import ProgressPage from './pages/ProgressPage';
import BookingPage from './pages/BookingPage';
import ProceduresPage from './pages/ProceduresPage';
import ShopPage from './pages/ShopPage';
import DashboardPage from './pages/DashboardPage';
import OnboardingModal from './components/OnboardingModal';
import { Page, RoutineStep } from './types';
import useLocalStorage from './hooks/useLocalStorage';
import { CogIcon, SparklesIcon, TrashIcon } from './components/icons/Icons';

type RoutineStepTemplate = Omit<RoutineStep, 'completed'>;

const SettingsModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  setUserName: (name: string) => void;
  morningSteps: RoutineStepTemplate[];
  setMorningSteps: React.Dispatch<React.SetStateAction<RoutineStepTemplate[]>>;
  nightSteps: RoutineStepTemplate[];
  setNightSteps: React.Dispatch<React.SetStateAction<RoutineStepTemplate[]>>;
  onResetClick: () => void;
}> = ({ isOpen, onClose, userName, setUserName, morningSteps, setMorningSteps, nightSteps, setNightSteps, onResetClick }) => {
  const [name, setName] = useState(userName);
  const [newMorningStep, setNewMorningStep] = useState("");
  const [newNightStep, setNewNightStep] = useState("");

  useEffect(() => {
    setName(userName);
  }, [userName, isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    setUserName(name);
    onClose();
  };
  
  const handleAddStep = (period: 'morning' | 'night') => {
    if (period === 'morning' && newMorningStep.trim()) {
      const newStep = { id: `m-${Date.now()}`, name: newMorningStep.trim(), description: 'Passo personalizado' };
      setMorningSteps(prev => [...prev, newStep]);
      setNewMorningStep("");
    } else if (period === 'night' && newNightStep.trim()) {
      const newStep = { id: `n-${Date.now()}`, name: newNightStep.trim(), description: 'Passo personalizado' };
      setNightSteps(prev => [...prev, newStep]);
      setNewNightStep("");
    }
  };

  const handleDeleteStep = (period: 'morning' | 'night', stepId: string) => {
    if (period === 'morning') {
      setMorningSteps(prev => prev.filter(step => step.id !== stepId));
    } else {
      setNightSteps(prev => prev.filter(step => step.id !== stepId));
    }
  };
  
  const RoutineEditor: React.FC<{
    title: string;
    steps: RoutineStepTemplate[];
    newStepValue: string;
    onNewStepChange: (value: string) => void;
    onAdd: () => void;
    onDelete: (id: string) => void;
  }> = ({ title, steps, newStepValue, onNewStepChange, onAdd, onDelete}) => (
    <div>
        <h3 className="text-md font-semibold mb-2 text-gray-800">{title}</h3>
        <ul className="space-y-2 mb-2">
            {steps.map(step => (
                <li key={step.id} className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
                    <span className="text-sm text-gray-700">{step.name}</span>
                    <button onClick={() => onDelete(step.id)} className="text-red-500 hover:text-red-700 p-1">
                        <TrashIcon className="h-4 w-4" />
                    </button>
                </li>
            ))}
        </ul>
        <div className="flex gap-2">
            <input 
                type="text" 
                value={newStepValue} 
                onChange={e => onNewStepChange(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && onAdd()}
                placeholder="Adicionar novo passo..."
                className="flex-grow p-2 border rounded-md text-sm focus:ring-2 focus:ring-[#E18AAA] focus:border-transparent"
            />
            <button onClick={onAdd} className="px-3 py-2 bg-[#E18AAA] text-white rounded-md text-sm font-semibold">Adicionar</button>
        </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl flex flex-col">
        <h2 className="text-xl font-bold mb-4">Preferências</h2>
        <div className="space-y-4 flex-grow overflow-y-auto pr-2" style={{maxHeight: '70vh'}}>
            <div>
                <label htmlFor="name-input" className="block text-sm font-medium text-gray-700 mb-1">Seu nome</label>
                <input 
                    id="name-input"
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Como podemos te chamar?"
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-[#E18AAA] focus:border-transparent"
                />
            </div>
            <hr />
            <RoutineEditor
                title="Editar Rotina da Manhã"
                steps={morningSteps}
                newStepValue={newMorningStep}
                onNewStepChange={setNewMorningStep}
                onAdd={() => handleAddStep('morning')}
                onDelete={(id) => handleDeleteStep('morning', id)}
            />
             <hr />
            <RoutineEditor
                title="Editar Rotina da Noite"
                steps={nightSteps}
                newStepValue={newNightStep}
                onNewStepChange={setNewNightStep}
                onAdd={() => handleAddStep('night')}
                onDelete={(id) => handleDeleteStep('night', id)}
            />
            <hr className="my-4"/>
            <div>
                <h3 className="text-md font-semibold mb-2 text-red-600">Zona de Perigo</h3>
                <p className="text-xs text-gray-500 mb-2">A ação abaixo não pode ser desfeita. Tenha certeza antes de continuar.</p>
                <button
                    onClick={onResetClick}
                    className="w-full px-4 py-2 bg-red-100 text-red-700 border border-red-200 rounded-lg text-sm font-semibold hover:bg-red-200 transition-colors"
                >
                    Resetar aplicativo
                </button>
            </div>
        </div>
        <div className="mt-6 flex justify-end gap-3 border-t pt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg">Fechar</button>
          <button onClick={handleSave} className="px-4 py-2 bg-[#E18AAA] text-white rounded-lg">Salvar</button>
        </div>
      </div>
    </div>
  );
};

const ResetConfirmationModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}> = ({ isOpen, onClose, onConfirm }) => {
  const [confirmText, setConfirmText] = useState('');
  const isConfirmed = confirmText === 'resetar';

  useEffect(() => {
    if (isOpen) {
      setConfirmText('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[60] p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm shadow-xl flex flex-col">
        <h2 className="text-xl font-bold text-red-600 mb-2">Atenção!</h2>
        <p className="text-sm text-gray-700 mb-4">
          Esta ação é irreversível. Todos os seus dados, incluindo rotinas, progresso e conquistas, serão apagados permanentemente.
        </p>
        <label htmlFor="confirm-input" className="block text-sm font-medium text-gray-700 mb-1">
          Para confirmar, digite "<b>resetar</b>" abaixo:
        </label>
        <input
          id="confirm-input"
          type="text"
          value={confirmText}
          onChange={(e) => setConfirmText(e.target.value)}
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
        />
        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg">Cancelar</button>
          <button
            onClick={onConfirm}
            disabled={!isConfirmed}
            className="px-4 py-2 bg-red-600 text-white rounded-lg disabled:bg-red-300 disabled:cursor-not-allowed"
          >
            Resetar Aplicativo
          </button>
        </div>
      </div>
    </div>
  );
};


const App: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>('routine');
  const [userName, setUserName] = useLocalStorage<string>('user_name', '');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [hasVisited, setHasVisited] = useLocalStorage('has_visited', false);
  const [showApp, setShowApp] = useState(hasVisited);

  const defaultMorningSteps: RoutineStepTemplate[] = [
    { id: 'm1', name: 'Limpeza', description: 'Use um sabonete facial suave.' },
    { id: 'm2', name: 'Tonificação', description: 'Aplique um tônico para equilibrar o pH.' },
    { id: 'm3', name: 'Sérum', description: 'Use um sérum de tratamento específico.' },
    { id: 'm4', name: 'Hidratação', description: 'Aplique um creme hidratante.' },
    { id: 'm5', name: 'Proteção Solar', description: 'Finalize com protetor solar FPS 30+.' },
  ];

  const defaultNightSteps: RoutineStepTemplate[] = [
    { id: 'n1', name: 'Limpeza', description: 'Use um sabonete facial suave.' },
    { id: 'n2', name: 'Tonificação', description: 'Aplique um tônico para equilibrar o pH.' },
    { id: 'n3', name: 'Sérum', description: 'Use um sérum de tratamento específico.' },
    { id: 'n4', name: 'Hidratação', description: 'Aplique um creme hidratante.' },
  ];
  
  const [morningSteps, setMorningSteps] = useLocalStorage<RoutineStepTemplate[]>('morning_steps', defaultMorningSteps);
  const [nightSteps, setNightSteps] = useLocalStorage<RoutineStepTemplate[]>('night_steps', defaultNightSteps);


  useEffect(() => {
      if (hasVisited) {
          setShowApp(true);
      }
  }, [hasVisited]);

  const handleStartChallenge = () => {
      setHasVisited(true);
      setShowApp(true);
  };
  
  const handleResetApp = () => {
    localStorage.clear();
    window.location.reload();
  };

  if (!showApp) {
      return <OnboardingModal onStart={handleStartChallenge} />;
  }

  const renderPage = () => {
    switch (activePage) {
      case 'routine':
        return <RoutinePage userName={userName} morningSteps={morningSteps} nightSteps={nightSteps} />;
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
        return <RoutinePage userName={userName} morningSteps={morningSteps} nightSteps={nightSteps} />;
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
      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
        userName={userName} 
        setUserName={setUserName}
        morningSteps={morningSteps}
        setMorningSteps={setMorningSteps}
        nightSteps={nightSteps}
        setNightSteps={setNightSteps}
        onResetClick={() => {
            setIsSettingsOpen(false);
            setIsResetModalOpen(true);
        }}
      />
       <ResetConfirmationModal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onConfirm={handleResetApp}
      />
      <BottomNav activePage={activePage} setActivePage={setActivePage} />
    </div>
  );
};

export default App;