import { useEffect, useRef, useMemo } from 'react';
import * as THREE from 'three';

const AuroraBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', resize);

    let time = 0;

    const drawAurora = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.03)';
      ctx.fillRect(0, 0, width, height);

      // Multiple aurora layers
      for (let layer = 0; layer < 5; layer++) {
        const layerOffset = layer * 0.3;
        const opacity = 0.02 + layer * 0.005;
        
        ctx.beginPath();
        ctx.moveTo(0, height * 0.3);

        for (let x = 0; x <= width; x += 5) {
          const y = height * 0.3 + 
            Math.sin((x * 0.003) + time * (0.5 + layerOffset)) * 50 +
            Math.sin((x * 0.007) + time * (0.3 + layerOffset)) * 30 +
            Math.sin((x * 0.001) + time * (0.7 + layerOffset)) * 100 +
            layer * 30;
          ctx.lineTo(x, y);
        }

        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();

        const gradient = ctx.createLinearGradient(0, height * 0.2, 0, height * 0.8);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${opacity})`);
        gradient.addColorStop(0.3, `rgba(200, 200, 200, ${opacity * 0.7})`);
        gradient.addColorStop(0.6, `rgba(150, 150, 150, ${opacity * 0.4})`);
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      // Shimmering particles
      for (let i = 0; i < 20; i++) {
        const x = (Math.sin(time * 0.5 + i * 0.5) * 0.5 + 0.5) * width;
        const y = (Math.sin(time * 0.3 + i * 0.7) * 0.3 + 0.3) * height;
        const size = Math.sin(time * 2 + i) * 1.5 + 2;
        const opacity = Math.sin(time * 3 + i * 0.5) * 0.3 + 0.4;

        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fill();
      }

      time += 0.008;
      animationRef.current = requestAnimationFrame(drawAurora);
    };

    drawAurora();

    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

export default AuroraBackground;
