import React, { useEffect, useRef, useState } from "react";
import CenterView from "../components/CenterView";
import "../components/Flower.css";

type PetalMessage = {
  text: string;
  image: string;
};

const petalData: PetalMessage[] = [
  {
    text: "Gracias por todo lo vivido. Cada recuerdo aqui se queda para siempre.",
    image: "lindos.jpg",
  },
  {
    text: "Fueron dias que marcaron mi vida, y no se van a borrar.",
    image: "lindos.jpg",
  },
  {
    text: "Aun con el final, valoro cada momento compartido.",
    image: "lindos.jpg",
  },
  {
    text: "Te deseo paz, alegria y cosas bonitas en tu camino.",
    image: "lindos.jpg",
  },
  {
    text: "Este capitulo se cierra, pero el agradecimiento se queda.",
    image: "lindos.jpg",
  },
];

const startDate = new Date("2024-05-22T00:00:00").getTime();
const endDate = new Date("2025-12-15T23:59:59").getTime();

const getFrozenElapsedTime = (start: number, end: number) => {
  const now = Math.min(Date.now(), end);
  const difference = Math.max(0, now - start);

  const years = Math.floor(difference / (1000 * 60 * 60 * 24 * 365.25));
  const remainingForMonths = difference % (1000 * 60 * 60 * 24 * 365.25);
  const months = Math.floor(remainingForMonths / (1000 * 60 * 60 * 24 * 30.44));
  const remainingForDays = remainingForMonths % (1000 * 60 * 60 * 24 * 30.44);
  const days = Math.floor(remainingForDays / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  return { years, months, days, hours, minutes, seconds };
};

const useTimeCounter = (start: number, end: number) => {
  const [time, setTime] = useState(() => getFrozenElapsedTime(start, end));

  useEffect(() => {
    setTime(getFrozenElapsedTime(start, end));

    if (Date.now() >= end) {
      return;
    }

    const interval = setInterval(() => {
      const nextTime = getFrozenElapsedTime(start, end);
      setTime(nextTime);

      if (Date.now() >= end) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [start, end]);

  return time;
};

const DashboardPage: React.FC = () => {
  const time = useTimeCounter(startDate, endDate);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<PetalMessage | null>(null);
  const [fadeOut, setFadeOut] = useState(false);
  const [isCenterViewOpen, setIsCenterViewOpen] = useState(false);

  const handleMusicToggle = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((e) => console.error("Audio play failed:", e));
    }

    setIsPlaying(!isPlaying);
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

  return (
    <div className="flex min-h-screen flex-col items-center pb-12 pt-16 font-['Dancing Script']">
      <header className="fixed top-0 z-50 flex w-full items-center justify-between bg-white/80 px-4 py-3 shadow-sm backdrop-blur-md">
        <div className="text-xl font-['Pacifico'] text-pink-500 drop-shadow-sm">Te amo 3 millones</div>
        <div className="music-player flex items-center gap-3">
          <div className="text-xs text-pink-400">Tocar-&gt;</div>
          <button onClick={handleMusicToggle} className="music-control">
            <i className={`ri-${isPlaying ? "pause" : "play"}-fill ri-lg leading-none`}></i>
          </button>
        </div>
      </header>

      <main className="flex w-full flex-col items-center justify-start px-4 pt-8">
        <div className="mb-5 w-full max-w-lg rounded-2xl border border-pink-200 bg-gradient-to-r from-pink-500 via-rose-400 to-orange-300 p-5 text-white shadow-2xl">
          <p className="text-sm uppercase tracking-[0.25em] opacity-90">Capitulo cerrado</p>
          <h1 className="mt-1 text-4xl font-['Pacifico'] drop-shadow-sm">Se acabo todo</h1>
          <p className="mt-2 text-lg leading-snug">
            El contador se detuvo para siempre el 15 de diciembre de 2025.
          </p>
        </div>

        <div className="relative mb-4 h-64 w-64">
          <div className="petal-container absolute left-0 top-0">
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
            onClick={() => setIsCenterViewOpen(true)}
            className="flower-center absolute left-1/2 top-1/2 flex -translate-x-1/2 items-center justify-center transition-transform hover:scale-110 focus:outline-none"
            style={{ transform: "translate(-0%, -25%)" }}
          >
            <i className="ri-heart-fill ri-lg text-white"></i>
          </button>
        </div>

        <p className="mb-8 text-lg font-semibold text-pink-600">Toca cada petalo</p>

        <div className="w-full max-w-sm rounded-xl border border-pink-100 bg-white/50 p-6 shadow-xl backdrop-blur-sm">
          <h2 className="mb-2 text-center text-2xl font-['Pacifico'] text-pink-600">Tiempo compartido</h2>
          <p className="mb-6 text-center text-sm text-pink-500">Congelado en la fecha final: 15/12/2025</p>
          <div className="grid grid-cols-3 gap-3 text-center">
            {Object.entries(time).map(([unit, value]) => (
              <div key={unit} className="time-unit rounded-xl border border-gray-100 bg-white p-2 shadow-md">
                <span className="block text-3xl font-bold text-yellow-600">{value}</span>
                <span className="capitalize text-sm text-pink-500">{unit}</span>
              </div>
            ))}
          </div>
        </div>
      </main>

      {modalOpen && modalContent && (
        <div
          className={`fixed inset-0 z-[9999] flex items-center justify-center transition-opacity duration-300 ${
            fadeOut ? "opacity-0" : "opacity-100"
          }`}
          style={{ backgroundColor: "rgba(252, 246, 246, 0.8)", backdropFilter: "blur(5px)" }}
        >
          <div
            className={`relative z-10 mx-4 max-w-sm transform overflow-hidden rounded-3xl bg-white shadow-2xl transition-transform duration-300 ${
              fadeOut ? "scale-90" : "scale-100"
            }`}
          >
            <img
              className="max-h-52 h-auto w-full rounded-t-3xl border-b-2 border-pink-100 object-cover"
              src={modalContent.image}
              alt="Nuestro Momento"
            />

            <button
              onClick={closeModal}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-pink-600 shadow-md transition-transform hover:scale-110"
            >
              <i className="ri-close-line ri-xl"></i>
            </button>

            <div className="p-6 text-center">
              <h3 className="mb-4 text-3xl font-['Pacifico'] text-pink-500">Nuestro Momento</h3>
              <p className="px-2 text-lg leading-relaxed text-gray-700">{modalContent.text}</p>
            </div>
          </div>
        </div>
      )}

      {isCenterViewOpen && <CenterView onClose={() => setIsCenterViewOpen(false)} />}

      <audio ref={audioRef} loop>
        <source src="/music.m4a" type="audio/mpeg" />
        Tu navegador no soporta el elemento de audio.
      </audio>
    </div>
  );
};

export default DashboardPage;
