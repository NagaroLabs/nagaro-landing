import { useEffect, useState } from 'react';

interface Orb {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
}

const GlowingOrbs = () => {
  const [orbs] = useState<Orb[]>(() => 
    Array.from({ length: 6 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 300 + 200,
      duration: Math.random() * 10 + 15,
      delay: Math.random() * -10,
      color: i % 2 === 0 
        ? 'from-white/5 via-gray-400/10 to-transparent'
        : 'from-gray-500/8 via-white/5 to-transparent',
    }))
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {orbs.map((orb) => (
        <div
          key={orb.id}
          className={`absolute rounded-full bg-gradient-radial ${orb.color} blur-3xl animate-float-orb`}
          style={{
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            width: `${orb.size}px`,
            height: `${orb.size}px`,
            transform: 'translate(-50%, -50%)',
            animationDuration: `${orb.duration}s`,
            animationDelay: `${orb.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

export default GlowingOrbs;
