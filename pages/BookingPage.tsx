import React from 'react';

const BookingPage: React.FC = () => {
  return (
    <div className="space-y-6 text-center">
      <div className="bg-white p-6 rounded-xl shadow-md">
        <img 
          src="https://i.postimg.cc/Z9DRV2yB/465676579-1813738112496772-6561004736957982359-n.jpg" 
          alt="Clínica Innova" 
          className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-pink-100 object-cover"
        />
        <h2 className="text-2xl font-bold text-gray-800">Agende sua Avaliação</h2>
        <p className="text-gray-600 mt-2">
          Dê o próximo passo na sua jornada de cuidados com a pele. A Dra. Marilane Rabelo e a equipe da Clínica Innova estão prontas para criar um plano personalizado para você.
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
        <a 
          href="https://wa.me/556184260528" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="block w-full bg-[#E18AAA] text-white font-bold py-3 px-4 rounded-lg text-lg hover:bg-[#c56e89] transition-transform transform hover:scale-105"
        >
          Agendar na Clínica Innova
        </a>
        <p className="text-sm text-gray-500">Você será redirecionada para o nosso WhatsApp para agendarmos o melhor horário.</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-xl font-bold text-gray-800">Conheça Nossos Serviços</h3>
        <p className="text-gray-600 mt-2 mb-4">
          Oferecemos uma gama de tratamentos de estética avançada para realçar sua beleza natural.
        </p>
        <div className="flex flex-wrap justify-center gap-2">
            <span className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm">Criolipólise</span>
            <span className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm">Lavieen Day</span>
            <span className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm">Botox</span>
            <span className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm">Preenchimento</span>
            <span className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm">Bioestimuladores</span>
        </div>
        <p className="text-xs text-gray-400 mt-4">
          Explore todos os nossos serviços na aba 'Serviços' e entre em contato para saber mais.
        </p>
      </div>
    </div>
  );
};

export default BookingPage;