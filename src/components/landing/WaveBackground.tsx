import { useEffect, useRef } from 'react';

interface WaveBackgroundProps {
  color?: string;
  opacity?: number;
}

const WaveBackground = ({ color = '#ffffff', opacity = 0.03 }: WaveBackgroundProps) => {
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

    const drawWave = (yOffset: number, amplitude: number, frequency: number, speed: number, waveOpacity: number) => {
      ctx.beginPath();
      ctx.moveTo(0, canvas.height);

      for (let x = 0; x <= canvas.width; x += 5) {
        const y = yOffset + Math.sin(x * frequency + time * speed) * amplitude +
                  Math.sin(x * frequency * 0.5 + time * speed * 1.3) * amplitude * 0.5;
        ctx.lineTo(x, y);
      }

      ctx.lineTo(canvas.width, canvas.height);
      ctx.closePath();

      const gradient = ctx.createLinearGradient(0, yOffset - amplitude, 0, canvas.height);
      gradient.addColorStop(0, `${color}${Math.round(waveOpacity * 255).toString(16).padStart(2, '0')}`);
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.fill();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Multiple waves with different properties
      drawWave(canvas.height * 0.3, 40, 0.008, 0.8, opacity);
      drawWave(canvas.height * 0.5, 50, 0.006, 1.0, opacity * 0.8);
      drawWave(canvas.height * 0.7, 35, 0.01, 1.2, opacity * 0.6);
      drawWave(canvas.height * 0.85, 25, 0.012, 0.6, opacity * 0.4);

      time += 0.02;
      animationId = requestAnimationFrame(animate);
    };

    resize();
    animate();

    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, [color, opacity]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
};

export default WaveBackground;
