import { useEffect, useRef } from 'react';

const PulsingRings = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    interface Ring {
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      speed: number;
      opacity: number;
    }

    const rings: Ring[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initRings();
    };

    const initRings = () => {
      rings.length = 0;
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      for (let i = 0; i < 5; i++) {
        rings.push({
          x: centerX,
          y: centerY,
          radius: i * 50,
          maxRadius: Math.max(canvas.width, canvas.height),
          speed: 0.5 + i * 0.1,
          opacity: 0.1 - i * 0.015,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      rings.forEach(ring => {
        ring.radius += ring.speed;
        
        if (ring.radius > ring.maxRadius) {
          ring.radius = 0;
        }

        const opacity = ring.opacity * (1 - ring.radius / ring.maxRadius);
        
        ctx.beginPath();
        ctx.arc(ring.x, ring.y, ring.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Inner glow
        ctx.beginPath();
        ctx.arc(ring.x, ring.y, ring.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.3})`;
        ctx.lineWidth = 3;
        ctx.stroke();
      });

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

export default PulsingRings;
