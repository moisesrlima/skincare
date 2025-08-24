import React, { useMemo } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { DailyRoutine } from '../types';
import { achievements } from '../data/achievements';
import { CheckCircleIcon } from '../components/icons/Icons';

const isRoutineComplete = (routine: DailyRoutine) => {
    const morningComplete = routine.morning.every(s => s.completed);
    const nightComplete = routine.night.every(s => s.completed);
    return morningComplete && nightComplete;
};

const DashboardPage: React.FC = () => {
  const [routines] = useLocalStorage<DailyRoutine[]>('user_routines', []);

  const stats = useMemo(() => {
    const completedRoutines = routines.filter(isRoutineComplete);
    const completedDates = new Set(completedRoutines.map(r => r.date));
    const completedDays = completedDates.size;

    let streak = 0;
    const today = new Date();
    // Check today and previous days for a streak
    for (let i = 0; i < routines.length + 1; i++) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        const dateString = d.toISOString().split('T')[0];
        
        // Find if there is any routine for this day
        const routineForDate = routines.find(r => r.date === dateString);

        if (routineForDate && isRoutineComplete(routineForDate)) {
            streak++;
        } else if (i === 0 && !routineForDate) {
            // Today's routine might not exist yet, don't break streak
            continue;
        } else if (streak > 0 || (i > 0 && !routineForDate)) {
             // Break the streak if a past day is not complete or doesn't exist
            break;
        }
    }
    
    // CORRECTED LOGIC FOR HYDRATION
    const hydrationSteps = routines.flatMap(r => [
        ...r.morning.filter(s => s.name === 'Hidratação'),
        ...r.night.filter(s => s.name === 'Hidratação')
    ]);
    const completedHydrationSteps = hydrationSteps.filter(s => s.completed).length;
    const hydrationPercentage = hydrationSteps.length > 0
        ? Math.round((completedHydrationSteps / hydrationSteps.length) * 100)
        : 0;

    const solarProtectionRoutines = routines.map(r => r.morning.find(s => s.name === 'Proteção Solar')).filter(Boolean);
    const completedSolarProtection = solarProtectionRoutines.filter(s => s!.completed).length;
    const protectionPercentage = solarProtectionRoutines.length > 0
        ? Math.round((completedSolarProtection / solarProtectionRoutines.length) * 100)
        : 0;


    return { completedDays, streak, hydrationPercentage, protectionPercentage, completedDates };
  }, [routines]);
  
  const WeeklyProgressCard: React.FC = () => {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 (Sun) - 6 (Sat)
    const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
    // Start week on Sunday
    const firstDayOfWeek = new Date(today);
    firstDayOfWeek.setDate(today.getDate() - dayOfWeek);

    const days = Array.from({ length: 7 }).map((_, i) => {
        const d = new Date(firstDayOfWeek);
        d.setDate(d.getDate() + i);
        return {
            name: weekDays[i],
            date: d.toISOString().split('T')[0],
            isPast: d <= today,
        };
    });

    const pastDaysInWeek = days.filter(d => d.isPast).length;
    const completedThisWeekCount = days.filter(d => d.isPast && stats.completedDates.has(d.date)).length;
    const progressPercentage = pastDaysInWeek > 0 ? Math.round((completedThisWeekCount / pastDaysInWeek) * 100) : 0;


    return (
        <div className="bg-white p-4 rounded-xl shadow-md space-y-3 text-center">
            <h3 className="font-bold text-gray-700">Progresso Semanal</h3>
            <p className="text-3xl font-bold text-[#E18AAA]">{isNaN(progressPercentage) ? 0 : progressPercentage}%</p>
            <div className="flex justify-center items-center gap-3">
                {days.map((day, index) => (
                    <div key={index} className="flex flex-col items-center gap-2">
                        <span className={`text-xs font-bold ${day.date === today.toISOString().split('T')[0] ? 'text-[#E18AAA]' : 'text-gray-600'}`}>{day.name}</span>
                        <div className={`w-5 h-5 rounded-full ${!day.isPast ? 'bg-gray-200 opacity-50' : stats.completedDates.has(day.date) ? 'bg-pink-400' : 'bg-gray-200'}`}></div>
                    </div>
                ))}
            </div>
        </div>
    );
  };
  
  const AttributeMeter: React.FC<{label: string, value: number}> = ({label, value}) => (
      <div>
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium text-gray-700">{label}</span>
          <span className="text-sm font-bold text-[#E18AAA]">{value}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div className="bg-pink-400 h-2.5 rounded-full transition-all duration-500" style={{ width: `${value}%` }}></div>
        </div>
      </div>
  );

  return (
    <div className="space-y-6">
        <div className="text-center">
            <h2 className="text-2xl font-bold">Seu Progresso</h2>
            <p className="text-gray-600 mt-1">Continue assim! Sua pele está agradecendo.</p>
        </div>
        
        <WeeklyProgressCard />

        <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-white p-4 rounded-xl shadow-md">
                <p className="text-2xl font-bold text-[#E18AAA]">{stats.completedDays}</p>
                <p className="text-sm text-gray-600">Dias Completos</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-md">
                <p className="text-2xl font-bold text-[#E18AAA]">{stats.streak}</p>
                <p className="text-sm text-gray-600">Sequência</p>
            </div>
        </div>
        
        <div className="bg-white p-4 rounded-xl shadow-md space-y-4">
            <AttributeMeter label="Hidratação" value={stats.hydrationPercentage} />
            <AttributeMeter label="Proteção" value={stats.protectionPercentage} />
        </div>
        
        <div className="bg-white p-4 rounded-xl shadow-md">
            <h3 className="font-bold text-gray-700 mb-3">🎯 Próximos Marcos</h3>
            <div className="space-y-4">
                <div className="text-sm p-3 rounded-lg bg-pink-50">
                    <p className="font-semibold text-gray-700">7 dias consecutivos • <span className="text-pink-500 font-bold">{Math.max(0, 7 - stats.streak)} dias restantes</span></p>
                    {stats.streak >= 7 ? (
                        <p className="text-xs text-green-700 font-bold mt-1">🎁 Parabéns! Você ganhou: 1 Massagem Relaxante (sem custo). Entre em contato para agendar!</p>
                    ) : (
                        <p className="text-xs text-gray-500 mt-1">🎁 Desbloqueará: Uma surpresa especial!</p>
                    )}
                </div>
                <div className="text-sm p-3 rounded-lg bg-pink-50">
                    <p className="font-semibold text-gray-700">30 dias consecutivos • <span className="text-pink-500 font-bold">{Math.max(0, 30 - stats.streak)} dias restantes</span></p>
                     {stats.streak >= 30 ? (
                        <p className="text-xs text-green-700 font-bold mt-1">🎁 Incrível! Você ganhou: 1 Limpeza de Pele Profunda (sem custo). Entre em contato para agendar!</p>
                    ) : (
                        <p className="text-xs text-gray-500 mt-1">🎁 Desbloqueará: Uma recompensa incrível!</p>
                    )}
                </div>
            </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-md">
            <h3 className="font-bold text-gray-700 mb-3">🏆 Conquistas</h3>
            <div className="space-y-3">
                {achievements.map(ach => {
                    const unlocked = ach.isUnlocked(stats);
                    return (
                        <div key={ach.id} className={`flex items-center gap-3 transition-opacity ${unlocked ? 'opacity-100' : 'opacity-50'}`}>
                            <div className="text-2xl bg-gray-100 p-2 rounded-lg">{ach.emoji}</div>
                            <div>
                                <p className="font-semibold text-gray-800">{ach.name}</p>
                                <p className="text-sm text-gray-500">{ach.description}</p>
                            </div>
                            {unlocked && <CheckCircleIcon className="h-6 w-6 text-green-500 ml-auto" />}
                        </div>
                    )
                })}
            </div>
        </div>
    </div>
  );
};

export default DashboardPage;