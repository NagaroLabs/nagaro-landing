import { useEffect, useRef } from 'react';

interface LightBeam {
  x: number;
  y: number;
  angle: number;
  length: number;
  width: number;
  speed: number;
  opacity: number;
  hue: number;
}

const LightBeams = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const beamsRef = useRef<LightBeam[]>([]);
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

    // Initialize beams
    const createBeam = (): LightBeam => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      angle: Math.random() * Math.PI * 2,
      length: Math.random() * 400 + 200,
      width: Math.random() * 80 + 20,
      speed: Math.random() * 0.002 + 0.001,
      opacity: Math.random() * 0.08 + 0.02,
      hue: 0, // Grayscale
    });

    beamsRef.current = Array.from({ length: 8 }, createBeam);

    let time = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      beamsRef.current.forEach((beam, index) => {
        beam.angle += beam.speed;
        beam.opacity = 0.03 + Math.sin(time * 0.5 + index) * 0.02;

        const endX = beam.x + Math.cos(beam.angle) * beam.length;
        const endY = beam.y + Math.sin(beam.angle) * beam.length;

        // Create gradient along beam
        const gradient = ctx.createLinearGradient(beam.x, beam.y, endX, endY);
        gradient.addColorStop(0, `rgba(255, 255, 255, 0)`);
        gradient.addColorStop(0.3, `rgba(255, 255, 255, ${beam.opacity})`);
        gradient.addColorStop(0.7, `rgba(200, 200, 200, ${beam.opacity * 0.5})`);
        gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);

        ctx.save();
        ctx.translate(beam.x, beam.y);
        ctx.rotate(beam.angle);

        // Draw beam with blur effect
        ctx.beginPath();
        ctx.moveTo(0, -beam.width / 2);
        ctx.lineTo(beam.length, -beam.width / 4);
        ctx.lineTo(beam.length, beam.width / 4);
        ctx.lineTo(0, beam.width / 2);
        ctx.closePath();

        ctx.fillStyle = gradient;
        ctx.filter = 'blur(20px)';
        ctx.fill();
        ctx.filter = 'none';

        ctx.restore();
      });

      // Add lens flares
      const centerX = canvas.width / 2;
      const centerY = canvas.height * 0.4;
      
      for (let i = 0; i < 5; i++) {
        const flareX = centerX + Math.sin(time * 0.3 + i * 1.5) * 200;
        const flareY = centerY + Math.cos(time * 0.4 + i * 1.2) * 100;
        const flareSize = 50 + Math.sin(time * 2 + i) * 30;
        const flareOpacity = 0.03 + Math.sin(time * 1.5 + i) * 0.02;

        const flareGradient = ctx.createRadialGradient(flareX, flareY, 0, flareX, flareY, flareSize);
        flareGradient.addColorStop(0, `rgba(255, 255, 255, ${flareOpacity})`);
        flareGradient.addColorStop(0.5, `rgba(200, 200, 200, ${flareOpacity * 0.5})`);
        flareGradient.addColorStop(1, 'transparent');

        ctx.beginPath();
        ctx.arc(flareX, flareY, flareSize, 0, Math.PI * 2);
        ctx.fillStyle = flareGradient;
        ctx.fill();
      }

      time += 0.01;
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

export default LightBeams;
