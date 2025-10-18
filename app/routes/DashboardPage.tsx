import React, { useState, useEffect, useRef } from 'react';
import '../components/Flower.css';
import CenterView from '../components/CenterView'; 


type PetalMessage = {
  text: string;
  image: string;
};

const petalData: PetalMessage[] = [
  { text: "Mi amor, contigo descubrí un mundo de colores que no sabía que existían. Cada día a tu lado es como ver el amanecer por primera vez.", image: "lindos.jpg" },
  { text: "Cada dia que pasa son mas motivos para pensar y demostrar lo mucho que te amo, gracias por amarme tanto como yo lo hago.", image: "lindos.jpg" },
  { text: "En tus ojos encuentro mi refugio, mi paz y mi hogar. Vi un futuro lindo y prospero a tu lado.", image: "lindos.jpg" },
  { text: "Prometo estar para ti siempre, eres el amor que siempre he soñado, eres como un ángel para mí. Cada segundo que pase te seguiré amando.", image: "lindos.jpg" },
  { text: "Este primer año es solo el comienzo de nuestra hermosa historia de amor. Tenemos toda una vida por delante para amarnos más cada día.", image: "lindos.jpg" }
];

const startDate = new Date('May 22, 2024 00:00:00').getTime();

const useTimeCounter = (start: number) => {
  const [time, setTime] = useState({ years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      const difference = new Date().getTime() - start;

      const years = Math.floor(difference / (1000 * 60 * 60 * 24 * 365.25));
      const remainingForMonths = difference % (1000 * 60 * 60 * 24 * 365.25);
      const months = Math.floor(remainingForMonths / (1000 * 60 * 60 * 24 * 30.44));
      const remainingForDays = remainingForMonths % (1000 * 60 * 60 * 24 * 30.44);
      const days = Math.floor(remainingForDays / (1000 * 60 * 60 * 24));

      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTime({ years, months, days, hours, minutes, seconds });
    }, 1000);
    return () => clearInterval(interval);
  }, [start]);

  return time;
};

const App: React.FC = () => {
  const time = useTimeCounter(startDate);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<PetalMessage | null>(null);
  const [fadeOut, setFadeOut] = useState(false);
  
  const [isCenterViewOpen, setIsCenterViewOpen] = useState(false); 

  const handleMusicToggle = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.error("Audio play failed:", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const openModal = (petalIndex: number) => {
    setModalContent(petalData[petalIndex - 1]);
    setFadeOut(false);
    setModalOpen(true);
  };

  const closeModal = () => {
    setFadeOut(true);
    setTimeout(() => {
      setModalOpen(false);
      setModalContent(null);
    }, 300); 
  };

  const handleCenterClick = () => {
    setIsCenterViewOpen(true);
  };

  const closeCenterView = () => {
    setIsCenterViewOpen(false);
  };

  return (
    <div className="flex flex-col items-center pt-16 pb-12 font-['Dancing Script'] min-h-screen">

      {}
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md shadow-sm z-50 px-4 py-3 flex justify-between items-center">
        <div className="font-['Pacifico'] text-pink-500 text-xl drop-shadow-sm">Te amo 3 millones</div>
        <div className="music-player flex items-center gap-3">
          <div className="text-xs text-pink-400">Tocar-&gt;</div>
          <button
            onClick={handleMusicToggle}
            className="music-control"
          >
            <i className={`ri-${isPlaying ? 'pause' : 'play'}-fill ri-lg leading-none`}></i>
          </button>
        </div>
      </header>

      <main className="w-full px-4 flex flex-col items-center justify-start pt-8">
        <h1 className="text-4xl font-['Pacifico'] text-pink-500 mt-0 mb-8 drop-shadow-sm">Nuestro Primer añito</h1>
        
        {}
        <div className="relative w-64 h-64 mb-4">
          <div className="petal-container absolute top-0 left-0">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className={`petal petal-${index + 1}`}
                data-petal={index + 1}
                onClick={() => openModal(index + 1)}
              />
            ))}
          </div>
          
          <button
            onClick={handleCenterClick}
            className="flower-center absolute top-1/2 left-1/2 transform -translate-x-1/2 flex items-center justify-center transition-transform hover:scale-110 focus:outline-none"
            style={{ transform: 'translate(-0%, -25%)' }} 
          >
            <i className="ri-heart-fill ri-lg text-white"></i>
          </button>
        </div>
        
        <p className="text-pink-600 font-semibold mb-8 text-lg">Toca cada pétalo</p>

        {}
        <div className="w-full bg-white/50 backdrop-blur-sm rounded-xl p-6 shadow-xl max-w-sm border border-pink-100">
            <h2 className="text-center text-2xl font-['Pacifico'] text-pink-600 mb-6">Tiempo juntos</h2>
            <div className="grid grid-cols-3 gap-3 text-center">
                {Object.entries(time).map(([unit, value]) => (
                    <div key={unit} className="time-unit bg-white p-2 rounded-xl shadow-md border border-gray-100">
                        <span className="block text-3xl font-bold text-yellow-600">{value}</span>
                        <span className="text-sm text-pink-500 capitalize">{unit}</span>
                    </div>
                ))}
            </div>
        </div>
      </main>

      {}
      {modalOpen && modalContent && (
        <div
          className={`fixed inset-0 z-[9999] flex items-center justify-center transition-opacity duration-300 ${
            fadeOut ? 'opacity-0' : 'opacity-100'
          }`}
          style={{ backgroundColor: 'rgba(252, 246, 246, 0.8)', backdropFilter: 'blur(5px)' }}
        >
          <div
            className={`relative z-10 bg-white rounded-3xl max-w-sm mx-4 shadow-2xl overflow-hidden transform transition-transform duration-300 ${
                fadeOut ? 'scale-90' : 'scale-100'
            }`}
          >
            
            <img 
                className="w-full h-auto object-cover max-h-52 rounded-t-3xl border-b-2 border-pink-100" 
                src={modalContent.image} 
                alt="Nuestro Momento"
            />

            <button 
                onClick={closeModal} 
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-white/90 rounded-full shadow-md text-pink-600 transition-transform hover:scale-110"
            >
                <i className="ri-close-line ri-xl"></i>
            </button>

            <div className="p-6 text-center">
                <h3 className="text-3xl font-['Pacifico'] text-pink-500 mb-4">
                    Nuestro Momento
                </h3>
                <p className="text-gray-700 text-lg leading-relaxed px-2">
                    {modalContent.text}
                </p>
            </div>
          </div>
        </div>
      )}
    
    {}
    {isCenterViewOpen && (
        <CenterView onClose={closeCenterView} />
    )}

      <audio ref={audioRef} loop>
        <source src="/music.m4a" type="audio/mpeg" />
        Tu navegador no soporta el elemento de audio.
      </audio>
    </div>
  );
};

export default App;