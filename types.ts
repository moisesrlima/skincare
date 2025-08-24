export interface RoutineStep {
  id: string;
  name: string;
  description: string;
  completed: boolean;
}

export interface DailyRoutine {
  date: string; // YYYY-MM-DD
  morning: RoutineStep[];
  night: RoutineStep[];
}

export interface ProgressEntry {
  id: string;
  date: string; // ISO string
  imageUrl: string; // data URL
  ratings: {
    hydration: number; // 1-5
    radiance: number; // 1-5
    texture: number; // 1-5
  };
}

export interface WeatherData {
  condition: 'Ensolarado' | 'Nublado' | 'Chuvoso';
  uvIndex: number;
  recommendation: string;
}

export type Page = 'routine' | 'diary' | 'progress' | 'procedures' | 'shop' | 'booking';

export interface Procedure {
  id: string;
  name: string;
  category: 'Facial' | 'Corporal' | 'Depilação a Laser';
  description: string;
}

export interface ShopItem {
  id: string;
  name: string;
  imageUrl: string;
  price: string;
  originalPrice?: string;
  discount?: string;
  shopeeLink: string;
}

export interface Achievement {
  id: string;
  name: string;
  emoji: string;
  description: string;
  isUnlocked: (stats: { completedDays: number; streak: number }) => boolean;
}