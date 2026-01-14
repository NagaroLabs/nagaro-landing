import { useEffect, useRef } from 'react';

const DigitalRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ<>{}[]|/\\';
    const charArray = chars.split('');
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    
    const drops: number[] = new Array(columns).fill(1);
    const speeds: number[] = new Array(columns).fill(0).map(() => Math.random() * 0.5 + 0.5);
    const opacities: number[] = new Array(columns).fill(0).map(() => Math.random() * 0.3 + 0.1);

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < drops.length; i++) {
        const char = charArray[Math.floor(Math.random() * charArray.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Gradient effect for each character
        const gradient = ctx.createLinearGradient(x, y - fontSize, x, y);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${opacities[i] * 0.5})`);
        gradient.addColorStop(1, `rgba(180, 180, 180, ${opacities[i]})`);
        
        ctx.fillStyle = gradient;
        ctx.font = `${fontSize}px monospace`;
        ctx.fillText(char, x, y);

        // Head of the stream is brighter
        if (Math.random() > 0.98) {
          ctx.fillStyle = `rgba(255, 255, 255, ${opacities[i] * 2})`;
          ctx.fillText(char, x, y);
        }

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
          opacities[i] = Math.random() * 0.3 + 0.1;
        }

        drops[i] += speeds[i];
      }
    };

    const interval = setInterval(draw, 50);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none opacity-30"
    />
  );
};

export default DigitalRain;
