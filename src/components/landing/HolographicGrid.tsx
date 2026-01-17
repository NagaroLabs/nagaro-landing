import { useEffect, useRef } from 'react';

const HolographicGrid = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const gridSize = 50;
      const perspective = 400;
      const centerX = canvas.width / 2;
      const centerY = canvas.height;

      // Draw horizontal lines (receding into distance)
      for (let z = 0; z < 20; z++) {
        const zPos = (z * gridSize + time * 50) % (20 * gridSize);
        const scale = perspective / (perspective + zPos);
        const y = centerY - (zPos * scale) * 0.5;
        const width = canvas.width * scale * 2;
        const x = centerX - width / 2;
        
        const opacity = (1 - zPos / (20 * gridSize)) * 0.1;
        
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + width, y);
        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Draw vertical lines
      for (let i = -10; i <= 10; i++) {
        const startX = centerX + i * gridSize * 2;
        const startY = centerY;
        
        ctx.beginPath();
        ctx.moveTo(startX, startY);

        for (let z = 0; z < 20; z++) {
          const zPos = z * gridSize;
          const scale = perspective / (perspective + zPos);
          const x = centerX + (startX - centerX) * scale;
          const y = centerY - (zPos * scale) * 0.5;
          ctx.lineTo(x, y);
        }

        const gradient = ctx.createLinearGradient(startX, startY, centerX, centerY - 200);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.08)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Glow at horizon
      const glowGradient = ctx.createRadialGradient(
        centerX, centerY - 150, 0,
        centerX, centerY - 150, 300
      );
      glowGradient.addColorStop(0, 'rgba(255, 255, 255, 0.05)');
      glowGradient.addColorStop(1, 'transparent');
      ctx.fillStyle = glowGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      time += 0.01;
      animationId = requestAnimationFrame(animate);
    };

    resize();
    animate();

    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
};

export default HolographicGrid;
