import { useEffect, useRef } from 'react';

const EnergyWaves = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    let time = 0;
    const waves = 6;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height * 0.45;

      // Energy waves emanating from center
      for (let w = 0; w < waves; w++) {
        const waveOffset = (time * 0.5 + w * (Math.PI * 2 / waves)) % (Math.PI * 2);
        const radius = 50 + waveOffset * 150;
        const opacity = Math.max(0, 0.15 - waveOffset * 0.02);

        if (opacity > 0) {
          ctx.beginPath();
          
          // Create organic wave shape
          for (let angle = 0; angle <= Math.PI * 2; angle += 0.02) {
            const waveR = radius + 
              Math.sin(angle * 3 + time * 2) * 20 +
              Math.sin(angle * 7 - time) * 10;
            const x = centerX + Math.cos(angle) * waveR;
            const y = centerY + Math.sin(angle) * waveR * 0.4; // Ellipse

            if (angle === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.closePath();

          const gradient = ctx.createRadialGradient(centerX, centerY, radius * 0.5, centerX, centerY, radius * 1.5);
          gradient.addColorStop(0, 'transparent');
          gradient.addColorStop(0.5, `rgba(255, 255, 255, ${opacity})`);
          gradient.addColorStop(1, 'transparent');

          ctx.strokeStyle = gradient;
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      }

      // Central energy core
      const coreGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 80);
      coreGradient.addColorStop(0, `rgba(255, 255, 255, ${0.15 + Math.sin(time * 3) * 0.05})`);
      coreGradient.addColorStop(0.5, `rgba(200, 200, 200, ${0.08 + Math.sin(time * 3) * 0.03})`);
      coreGradient.addColorStop(1, 'transparent');

      ctx.beginPath();
      ctx.arc(centerX, centerY, 80, 0, Math.PI * 2);
      ctx.fillStyle = coreGradient;
      ctx.fill();

      // Spark particles
      for (let i = 0; i < 15; i++) {
        const sparkAngle = time * 0.5 + i * (Math.PI * 2 / 15);
        const sparkRadius = 100 + Math.sin(time * 2 + i) * 50;
        const sparkX = centerX + Math.cos(sparkAngle) * sparkRadius;
        const sparkY = centerY + Math.sin(sparkAngle) * sparkRadius * 0.4;
        const sparkSize = 2 + Math.sin(time * 4 + i) * 1;
        const sparkOpacity = 0.3 + Math.sin(time * 3 + i * 0.5) * 0.2;

        ctx.beginPath();
        ctx.arc(sparkX, sparkY, sparkSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${sparkOpacity})`;
        ctx.fill();

        // Spark trail
        const trailLength = 20;
        for (let t = 0; t < trailLength; t++) {
          const trailAngle = sparkAngle - t * 0.02;
          const trailX = centerX + Math.cos(trailAngle) * sparkRadius;
          const trailY = centerY + Math.sin(trailAngle) * sparkRadius * 0.4;
          const trailOpacity = sparkOpacity * (1 - t / trailLength) * 0.3;

          ctx.beginPath();
          ctx.arc(trailX, trailY, sparkSize * 0.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${trailOpacity})`;
          ctx.fill();
        }
      }

      time += 0.02;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

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

export default EnergyWaves;
