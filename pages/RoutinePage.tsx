import React, { useState, useEffect, useCallback } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { DailyRoutine, RoutineStep } from '../types';
import { SunIcon, MoonIcon } from '../components/icons/Icons';

const WelcomeCard: React.FC<{ userName: string }> = ({ userName }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Bom dia';
    if (hour < 18) return 'Boa tarde';
    return 'Boa noite';
  };

  const formattedDate = currentTime.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });
  const formattedTime = currentTime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="p-5 rounded-xl shadow-lg text-white bg-gradient-to-br from-[#E18AAA] to-[#b35f78]">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold">{getGreeting()}, {userName || 'Querida'}!</h2>
          <p className="text-sm opacity-90 capitalize">{formattedDate}</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-mono font-semibold">{formattedTime}</p>
        </div>
      </div>
    </div>
  );
};

const defaultSteps: RoutineStep[] = [
  { id: '1', name: 'Limpeza', description: 'Use um sabonete facial suave.', completed: false },
  { id: '2', name: 'Tonificação', description: 'Aplique um tônico para equilibrar o pH.', completed: false },
  { id: '3', name: 'Sérum', description: 'Use um sérum de tratamento específico.', completed: false },
  { id: '4', name: 'Hidratação', description: 'Aplique um creme hidratante.', completed: false },
  { id: '5', name: 'Proteção Solar', description: 'Finalize com protetor solar FPS 30+.', completed: false },
];

const getTodayDateString = () => new Date().toISOString().split('T')[0];

const WeeklyStreakTracker: React.FC<{ routines: DailyRoutine[] }> = ({ routines }) => {
    const today = new Date();
    // Get the last 7 days, with today being the last one.
    const last7Days = Array.from({ length: 7 }).map((_, i) => {
        const d = new Date();
        d.setDate(today.getDate() - (6 - i));
        return d.toISOString().split('T')[0];
    });

    const completedDays = new Set(
        routines
            .filter(r => {
                const morningComplete = r.morning.every(s => s.completed);
                const nightComplete = r.night.every(s => s.completed);
                return morningComplete && nightComplete;
            })
            .map(r => r.date)
    );

    const completedCount = last7Days.filter(dateString => completedDays.has(dateString)).length;
    const progressPercentage = Math.round((completedCount / 7) * 100);

    return (
        <div className="text-center">
            <p className="text-3xl font-bold text-[#E18AAA]">{progressPercentage}%</p>
            <div className="flex justify-center items-center gap-3 mt-2">
                {last7Days.map((dateString, index) => {
                    const isCompleted = completedDays.has(dateString);
                    return (
                        <div 
                            key={index} 
                             className={`w-5 h-5 rounded-full transition-colors duration-300 ${
                                 isCompleted ? 'bg-pink-400' : 'bg-gray-200'
                             }`}
                        ></div>
                    );
                })}
            </div>
        </div>
    );
};


const RoutinePage: React.FC<{ userName: string }> = ({ userName }) => {
  const [routines, setRoutines] = useLocalStorage<DailyRoutine[]>('user_routines', []);
  const [activeTab, setActiveTab] = useState<'morning' | 'night'>('morning');

  const todayDate = getTodayDateString();
  
  const getTodaysRoutine = useCallback(() => {
    let todayRoutine = routines.find(r => r.date === todayDate);
    if (!todayRoutine) {
      todayRoutine = {
        date: todayDate,
        morning: defaultSteps.map(s => ({ ...s, completed: false })),
        night: defaultSteps.filter(s => s.name !== 'Proteção Solar').map(s => ({ ...s, completed: false })),
      };
      // Prevent stale closure by reading routines from function scope
      setRoutines(prevRoutines => {
        const updatedRoutines = [...prevRoutines.slice(-30), todayRoutine!];
        return updatedRoutines;
      });
    }
    return todayRoutine;
  }, [routines, setRoutines, todayDate]);

  const [todayRoutine, setTodayRoutine] = useState(getTodaysRoutine);

  useEffect(() => {
    setTodayRoutine(getTodaysRoutine());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todayDate, routines]); // Rerun if routines change to get latest


  const handleToggleStep = (stepId: string) => {
    const updatedTodayRoutine = { ...todayRoutine };
    const stepList = activeTab === 'morning' ? updatedTodayRoutine.morning : updatedTodayRoutine.night;
    const stepIndex = stepList.findIndex(s => s.id === stepId);

    if (stepIndex > -1) {
      stepList[stepIndex].completed = !stepList[stepIndex].completed;
      
      setTodayRoutine(updatedTodayRoutine);
      
      setRoutines(prevRoutines => {
          const routineIndex = prevRoutines.findIndex(r => r.date === todayDate);
          const newRoutines = [...prevRoutines];
          if (routineIndex > -1) {
            newRoutines[routineIndex] = updatedTodayRoutine;
          } else {
            // This case should be handled by getTodaysRoutine, but as a fallback:
            newRoutines.push(updatedTodayRoutine);
          }
          return newRoutines;
      });
    }
  };

  const currentSteps = todayRoutine.morning && activeTab === 'morning' ? todayRoutine.morning : todayRoutine.night;
  const completedCount = currentSteps.filter(s => s.completed).length;
  const progress = (completedCount / currentSteps.length) * 100;

  const dailyTips = [
    "Beba 2 litros de água para uma pele radiante de dentro para fora.",
    "Nunca durma de maquiagem. A pele precisa respirar e se renovar.",
    "Troque suas fronhas regularmente para evitar o acúmulo de bactérias.",
    "Lembre-se do pescoço e colo! Eles também precisam de cuidados."
  ];
  const todayTip = dailyTips[new Date().getDate() % dailyTips.length];

  return (
    <div className="space-y-6">
      <WelcomeCard userName={userName} />
      <div className="bg-white p-4 rounded-xl shadow-md space-y-3">
          <h2 className="text-lg font-bold text-gray-700 text-center">Progresso Semanal</h2>
          <WeeklyStreakTracker routines={routines} />
      </div>

      <div className="bg-white p-4 rounded-xl shadow-md">
          <h3 className="font-bold text-gray-700">Missão do Dia ✨</h3>
          <p className="text-sm text-gray-600 mt-2">{todayTip}</p>
      </div>
      
      <div>
        <div className="flex bg-gray-200 rounded-lg p-1">
            <button onClick={() => setActiveTab('morning')} className={`w-1/2 p-2 rounded-md font-semibold flex items-center justify-center gap-2 transition-all ${activeTab === 'morning' ? 'bg-[#E18AAA] text-white shadow' : 'text-gray-600'}`}>
                <SunIcon /> Manhã
            </button>
            <button onClick={() => setActiveTab('night')} className={`w-1/2 p-2 rounded-md font-semibold flex items-center justify-center gap-2 transition-all ${activeTab === 'night' ? 'bg-[#E18AAA] text-white shadow' : 'text-gray-600'}`}>
                <MoonIcon /> Noite
            </button>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-md mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                <div className="bg-pink-400 h-2.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
            </div>
            <ul className="space-y-3">
                {currentSteps.map(step => (
                    <li key={step.id} onClick={() => handleToggleStep(step.id)} className="flex items-center cursor-pointer p-3 bg-gray-50 rounded-lg">
                        <input type="checkbox" checked={step.completed} readOnly className="h-6 w-6 rounded-full border-gray-300 text-[#E18AAA] focus:ring-[#E18AAA]"/>
                        <div className="ml-3">
                            <p className={`font-semibold ${step.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>{step.name}</p>
                            <p className="text-sm text-gray-500">{step.description}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
      </div>
    </div>
  );
};

export default RoutinePage;