import React from 'react';
import { SparklesIcon } from './icons/Icons';

interface OnboardingModalProps {
  onStart: () => void;
}

const OnboardingModal: React.FC<OnboardingModalProps> = ({ onStart }) => {
  return (
    <div className="fixed inset-0 bg-pink-50 flex flex-col items-center justify-center p-6 text-center z-50">
      <div className="w-full max-w-md mx-auto">
        <div className="text-[#E18AAA] flex justify-center mb-4">
          <SparklesIcon />
        </div>
        <h1 className="text-3xl font-bold text-[#b35f78] mb-3">
          Bem-vinda à sua Jornada de Skincare!
        </h1>
        <p className="text-gray-600 mb-6">
          Este é o seu novo diário de cuidados com a pele, um espaço para criar rotinas, acompanhar seu progresso e celebrar cada conquista.
        </p>
        
        <div className="bg-white p-6 rounded-xl shadow-lg border border-pink-100 mb-8">
            <h2 className="text-xl font-bold text-[#E18AAA] mb-2">O Desafio Pele Radiante</h2>
            <p className="text-sm text-gray-700">
                Aceite o desafio de cuidar da sua pele todos os dias. Complete suas rotinas, desbloqueie conquistas e ganhe recompensas especiais da Clínica Innova. Sua pele dos sonhos está a apenas um passo de distância!
            </p>
        </div>

        <button 
          onClick={onStart} 
          className="w-full bg-[#E18AAA] text-white font-bold py-3 px-6 rounded-lg text-lg hover:bg-[#c56e89] transition-transform transform hover:scale-105 shadow-lg"
        >
          Começar o Desafio!
        </button>
      </div>
    </div>
  );
};

export default OnboardingModal;