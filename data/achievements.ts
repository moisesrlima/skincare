import { Achievement } from '../types';

export const achievements: Achievement[] = [
  {
    id: '1',
    name: 'Primeiro Passo',
    emoji: '🌱',
    description: 'Complete sua primeira rotina.',
    isUnlocked: (stats) => stats.completedDays > 0,
  },
  {
    id: '2',
    name: 'Semana Completa',
    emoji: '🔥',
    description: '7 dias de rotina consistente.',
    isUnlocked: (stats) => stats.streak >= 7,
  },
  {
    id: '3',
    name: 'Duas Semanas Firmes',
    emoji: '💪',
    description: '14 dias de rotina sem falhar.',
    isUnlocked: (stats) => stats.streak >= 14,
  },
  {
    id: '4',
    name: 'Ritmo Perfeito',
    emoji: '✨',
    description: 'Complete 15 rotinas no total.',
    isUnlocked: (stats) => stats.completedDays >= 15,
  },
  {
    id: '5',
    name: 'Mês de Cuidado',
    emoji: '🗓️',
    description: '30 dias de consistência.',
    isUnlocked: (stats) => stats.streak >= 30,
  },
  {
    id: '6',
    name: 'Veterana do Skincare',
    emoji: '👑',
    description: 'Complete 30 rotinas no total.',
    isUnlocked: (stats) => stats.completedDays >= 30,
  },
];
