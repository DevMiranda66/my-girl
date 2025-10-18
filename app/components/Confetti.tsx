
import React from 'react';
import './Confetti.css'; 

const Confetti: React.FC = () => {
  const confettiPieces = Array.from({ length: 50 }, (_, index) => (
    <div 
      key={index} 
      className="confetti-piece" 
      style={{
        backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`,
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 2}s`,
        animationDuration: `${2 + Math.random() * 3}s`,
        transform: `rotate(${Math.random() * 360}deg)`,
      }}
    />
  ));

  return (
    <div className="confetti-container">
      {confettiPieces}
    </div>
  );
};

export default Confetti;