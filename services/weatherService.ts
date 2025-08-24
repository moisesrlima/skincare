
import { WeatherData } from '../types';

export const fetchWeather = async (): Promise<WeatherData> => {
  // Mock API call
  return new Promise(resolve => {
    setTimeout(() => {
      const conditions: Array<'Ensolarado' | 'Nublado' | 'Chuvoso'> = ['Ensolarado', 'Nublado', 'Chuvoso'];
      const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
      const uvIndex = Math.floor(Math.random() * 11);
      let recommendation = "Mantenha a pele hidratada.";

      if (randomCondition === 'Ensolarado' && uvIndex > 5) {
        recommendation = `Índice UV alto (${uvIndex}). Reaplique o protetor solar a cada 2 horas.`;
      } else if (randomCondition === 'Ensolarado') {
        recommendation = `Dia ensolarado! Não se esqueça do protetor solar, mesmo com UV baixo (${uvIndex}).`;
      } else if (randomCondition === 'Chuvoso') {
        recommendation = "Tempo úmido. Considere um hidratante mais leve hoje.";
      }

      resolve({
        condition: randomCondition,
        uvIndex,
        recommendation,
      });
    }, 500);
  });
};
