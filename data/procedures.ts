import { Procedure } from '../types';

export const procedures: Procedure[] = [
  // Facial
  { id: 'f1', name: 'Botox', category: 'Facial', description: 'Suaviza rugas e linhas de expressão para um visual rejuvenescido.' },
  { id: 'f2', name: 'Skin Booster', category: 'Facial', description: 'Promove hidratação profunda e melhora a textura geral da pele.' },
  { id: 'f3', name: 'Dermaplaning', category: 'Facial', description: 'Técnica de esfoliação que remove células mortas e pelos finos, uniformizando a pele.' },
  { id: 'f4', name: 'Fios Lisos de PDO', category: 'Facial', description: 'Promove um efeito lifting suave e estimula a produção natural de colágeno.' },
  { id: 'f5', name: 'Fios Espiculados de PDO', category: 'Facial', description: 'Proporciona um lifting facial com sustentação prolongada e estímulo de colágeno.' },
  { id: 'f6', name: 'Hidra Gloss Lips', category: 'Facial', description: 'Tratamento que hidrata profundamente e realça o volume natural dos lábios.' },
  { id: 'f7', name: 'Hidroxiapatita/Bioestimulador', category: 'Facial', description: 'Estimula a produção de colágeno, melhorando a firmeza e a sustentação da pele.' },
  { id: 'f8', name: 'Jato de Plasma', category: 'Facial', description: 'Remoção segura de pequenas lesões de pele como verrugas e pintas.' },
  { id: 'f9', name: 'Limpeza de Pele Profunda', category: 'Facial', description: 'Remove cravos, impurezas e células mortas, deixando a pele renovada e saudável.' },
  { id: 'f10', name: 'Microagulhamento com DMAE ou Colágeno', category: 'Facial', description: 'Melhora a textura e a firmeza da pele, tratando linhas finas e cicatrizes.' },
  { id: 'f11', name: 'Microagulhamento com PRP', category: 'Facial', description: 'Utiliza plasma rico em plaquetas para um rejuvenescimento e regeneração celular intensos.' },
  { id: 'f12', name: 'Preenchimento Bigode Chinês', category: 'Facial', description: 'Suaviza as linhas de expressão ao redor da boca com ácido hialurônico.' },
  { id: 'f13', name: 'Peeling Químico', category: 'Facial', description: 'Tratamento para acne, manchas e rejuvenescimento através da renovação celular da pele.' },
  { id: 'f14', name: 'Preenchimento Olheiras ou Boca', category: 'Facial', description: 'Hidrata, preenche e ilumina a área dos olhos ou realça o contorno dos lábios.' },
  { id: 'f15', name: 'Rinomodelação', category: 'Facial', description: 'Correção estética do nariz sem cirurgia, utilizando ácido hialurônico e botox.' },
  // Corporal
  { id: 'c1', name: 'Enzimas para Gordura e Flacidez', category: 'Corporal', description: 'Aplicações localizadas para reduzir medidas e firmar a pele.' },
  { id: 'c2', name: 'Drenagem Linfática', category: 'Corporal', description: 'Massagem que reduz a retenção de líquidos, inchaço e melhora a circulação.' },
  { id: 'c3', name: 'Ventosaterapia', category: 'Corporal', description: 'Técnica que alivia dores musculares, melhora a circulação e promove relaxamento.' },
  { id: 'c4', name: 'Tratamento Capilar', category: 'Corporal', description: 'Estimula o crescimento, fortalece os fios e devolve o brilho ao cabelo.' },
  { id: 'c5', name: 'Criolipólise', category: 'Corporal', description: 'Tecnologia que reduz a gordura localizada de forma segura e indolor através do resfriamento.' },
  { id: 'c6', name: 'Tratamento Lavieen', category: 'Corporal', description: 'Laser para rejuvenescimento, tratamento de manchas, cicatrizes e melhora da textura da pele.' },
  // Depilação a Laser
  { id: 'd1', name: 'Depilação a Laser - Áreas Pequenas', category: 'Depilação a Laser', description: 'Remoção de pelos em áreas como buço, queixo, nuca, entre outras.' },
  { id: 'd2', name: 'Depilação a Laser - Virilha', category: 'Depilação a Laser', description: 'Remoção de pelos completa ou parcial da área da virilha.' },
  { id: 'd3', name: 'Depilação a Laser - Perianal', category: 'Depilação a Laser', description: 'Remoção de pelos da região perianal para maior conforto e higiene.' },
  { id: 'd4', name: 'Depilação a Laser - Meia Perna', category: 'Depilação a Laser', description: 'Remoção de pelos da parte inferior das pernas, do joelho para baixo.' },
  { id: 'd5', name: 'Depilação a Laser - Pernas Completas', category: 'Depilação a Laser', description: 'Remoção de pelos de toda a extensão das pernas, das coxas aos pés.' },
  { id: 'd6', name: 'Depilação a Laser - Axilas', category: 'Depilação a Laser', description: 'Remoção de pelos das axilas, proporcionando liberdade e praticidade.' },
  { id: 'd7', name: 'Depilação a Laser - Rosto', category: 'Depilação a Laser', description: 'Remoção de pelos de todo o rosto, incluindo buço, queixo e bochechas.' },
  { id: 'd8', name: 'Depilação a Laser - Pescoço', category: 'Depilação a Laser', description: 'Remoção de pelos da região do pescoço, para um acabamento limpo.' },
  { id: 'd9', name: 'Depilação a Laser - Peito', category: 'Depilação a Laser', description: 'Remoção de pelos da área do peitoral.' },
  { id: 'd10', name: 'Depilação a Laser - Costas', category: 'Depilação a Laser', description: 'Remoção de pelos de toda a região das costas.' },
  { id: 'd11', name: 'Depilação a Laser - Braços', category: 'Depilação a Laser', description: 'Remoção de pelos dos braços, total ou parcial.' },
  { id: 'd12', name: 'Depilação a Laser - Lombar', category: 'Depilação a Laser', description: 'Remoção de pelos da parte inferior das costas.' },
  { id: 'd13', name: 'Depilação a Laser - Coxa', category: 'Depilação a Laser', description: 'Remoção de pelos da área das coxas.' },
  { id: 'd14', name: 'Depilação a Laser - Glúteos', category: 'Depilação a Laser', description: 'Remoção de pelos da região dos glúteos.' },
  { id: 'd15', name: 'Depilação a Laser - Abdômen', category: 'Depilação a Laser', description: 'Remoção de pelos da área abdominal.' }
];