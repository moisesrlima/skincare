import React, { useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { ProgressEntry } from '../types';
import { CameraIcon, PlusIcon } from '../components/icons/Icons';

const AddProgressModal: React.FC<{ onClose: () => void; onSave: (entry: Omit<ProgressEntry, 'id' | 'date'>) => void; }> = ({ onClose, onSave }) => {
  const [image, setImage] = useState<string | null>(null);
  const [ratings, setRatings] = useState({ hydration: 3, radiance: 3, texture: 3 });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSave = () => {
    if (image) {
      onSave({ imageUrl: image, ratings });
    }
  };

  const RatingSlider: React.FC<{label: string, value: number, onChange: (value: number) => void}> = ({ label, value, onChange }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-500">1</span>
        <input type="range" min="1" max="5" value={value} onChange={(e) => onChange(parseInt(e.target.value, 10))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#E18AAA]" />
        <span className="text-xs text-gray-500">5</span>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm">
        <h2 className="text-lg font-bold mb-4">Novo Registro</h2>
        <div className="space-y-4">
          <label htmlFor="photo-upload" className="cursor-pointer block w-full h-40 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-50">
            {image ? <img src={image} alt="Preview" className="h-full w-full object-cover rounded-lg"/> : <div className="text-center"><CameraIcon className="h-12 w-12 mx-auto" /><p>Adicionar Foto</p></div>}
          </label>
          <input id="photo-upload" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
          
          <RatingSlider label="Hidratação" value={ratings.hydration} onChange={v => setRatings(p => ({...p, hydration: v}))} />
          <RatingSlider label="Luminosidade" value={ratings.radiance} onChange={v => setRatings(p => ({...p, radiance: v}))} />
          <RatingSlider label="Textura" value={ratings.texture} onChange={v => setRatings(p => ({...p, texture: v}))} />
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg">Cancelar</button>
          <button onClick={handleSave} disabled={!image} className="px-4 py-2 bg-[#E18AAA] text-white rounded-lg disabled:bg-gray-300">Salvar</button>
        </div>
      </div>
    </div>
  );
};

const PrivacyCard: React.FC = () => (
  <div className="bg-pink-100 border-l-4 border-pink-400 text-pink-800 p-4 rounded-lg shadow-md" role="alert">
    <div className="flex items-start">
      <div className="text-2xl mr-3 pt-1">ℹ️</div>
      <div>
        <p className="font-bold">Sua Privacidade em Primeiro Lugar</p>
        <p className="text-sm">
          Fique tranquila! Todas as suas fotos e anotações são salvas apenas no seu dispositivo. O app funciona offline e nós não temos acesso a nenhum dos seus dados. Você tem total controle e pode compartilhar seu progresso pessoalmente na clínica, se desejar.
        </p>
      </div>
    </div>
  </div>
);

const ProgressPage: React.FC = () => {
  const [progress, setProgress] = useLocalStorage<ProgressEntry[]>('user_progress', []);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSaveProgress = (newEntryData: Omit<ProgressEntry, 'id' | 'date'>) => {
    const newEntry: ProgressEntry = {
      ...newEntryData,
      id: new Date().toISOString(),
      date: new Date().toISOString(),
    };
    setProgress(prev => [newEntry, ...prev]);
    setIsModalOpen(false);
  };
  
  return (
    <div className="space-y-4">
      {isModalOpen && <AddProgressModal onClose={() => setIsModalOpen(false)} onSave={handleSaveProgress} />}
      
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Diário</h2>
        <button onClick={() => setIsModalOpen(true)} className="bg-[#E18AAA] text-white p-2 rounded-full shadow-lg hover:bg-[#c56e89] transition-colors">
            <PlusIcon className="h-6 w-6" />
        </button>
      </div>

      <PrivacyCard />

      {progress.length === 0 ? (
        <div className="text-center py-10 px-4 bg-white rounded-lg shadow-md">
            <CameraIcon className="h-16 w-16 mx-auto text-gray-300" />
            <p className="mt-4 text-gray-500">Nenhum registro ainda.</p>
            <p className="text-sm text-gray-400">Clique no botão '+' para adicionar sua primeira foto e acompanhar sua evolução.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {progress.map(entry => (
            <div key={entry.id} className="bg-white rounded-lg overflow-hidden shadow-md group relative">
              <img src={entry.imageUrl} alt={`Progresso em ${new Date(entry.date).toLocaleDateString()}`} className="w-full h-48 object-cover"/>
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-xs">
                {new Date(entry.date).toLocaleDateString('pt-BR')}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProgressPage;