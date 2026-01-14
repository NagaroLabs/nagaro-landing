import { useEffect, useState } from 'react';

interface GlitchTitleProps {
  text: string;
  highlightText: string;
  className?: string;
}

const GlitchTitle = ({ text, highlightText, className = '' }: GlitchTitleProps) => {
  const [glitchActive, setGlitchActive] = useState(false);
  const [scrambledText, setScrambledText] = useState(text);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*';
    let iteration = 0;
    const originalText = text;

    const interval = setInterval(() => {
      setScrambledText(
        originalText
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration) return originalText[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      if (iteration >= originalText.length) {
        clearInterval(interval);
        setIsRevealed(true);
      }

      iteration += 1 / 2;
    }, 40);

    return () => clearInterval(interval);
  }, [text]);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 150);
    }, 4000);

    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <div className={`relative ${className}`}>
      {/* Main text */}
      <div className="relative">
        <span className={`block transition-all duration-100 ${glitchActive ? 'translate-x-[2px] text-red-500/30' : ''}`}>
          {scrambledText}
        </span>
        
        {/* Glitch layers */}
        {glitchActive && (
          <>
            <span 
              className="absolute inset-0 text-cyan-400/50"
              style={{ 
                transform: 'translate(-3px, -1px)',
                clipPath: 'inset(20% 0 30% 0)',
              }}
            >
              {text}
            </span>
            <span 
              className="absolute inset-0 text-red-400/50"
              style={{ 
                transform: 'translate(3px, 1px)',
                clipPath: 'inset(50% 0 20% 0)',
              }}
            >
              {text}
            </span>
          </>
        )}
      </div>

      {/* Highlight text with special effect */}
      <div className={`mt-2 transition-all duration-1000 ${isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <span className="relative inline-block">
          <span className="gradient-metallic-text text-glow animate-shimmer">
            {highlightText}
          </span>
          
          {/* Underline animation */}
          <span 
            className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent"
            style={{
              width: isRevealed ? '100%' : '0%',
              transition: 'width 1.5s ease-out 0.5s',
            }}
          />
        </span>
      </div>
    </div>
  );
};

export default GlitchTitle;
