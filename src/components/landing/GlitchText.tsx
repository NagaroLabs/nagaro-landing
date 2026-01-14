import { useState, useEffect } from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
}

const GlitchText = ({ text, className = '' }: GlitchTextProps) => {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 200);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <span className={`relative inline-block ${className}`}>
      {/* Main Text */}
      <span className="relative z-10">{text}</span>
      
      {/* Glitch Layers */}
      {isGlitching && (
        <>
          <span 
            className="absolute inset-0 text-cyan-400/70 animate-glitch-1"
            style={{ clipPath: 'inset(40% 0 20% 0)' }}
            aria-hidden="true"
          >
            {text}
          </span>
          <span 
            className="absolute inset-0 text-red-400/70 animate-glitch-2"
            style={{ clipPath: 'inset(20% 0 40% 0)' }}
            aria-hidden="true"
          >
            {text}
          </span>
        </>
      )}
    </span>
  );
};

export default GlitchText;
