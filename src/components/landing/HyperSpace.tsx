import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  z: number;
  prevX: number;
  prevY: number;
}

const HyperSpace = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const animationRef = useRef<number>();
  const speedRef = useRef(0.5);
  const targetSpeedRef = useRef(0.5);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const centerX = width / 2;
    const centerY = height / 2;
    const numStars = 400;

    // Initialize stars
    const initStar = (): Star => ({
      x: (Math.random() - 0.5) * width * 2,
      y: (Math.random() - 0.5) * height * 2,
      z: Math.random() * 1500 + 500,
      prevX: 0,
      prevY: 0,
    });

    starsRef.current = Array.from({ length: numStars }, initStar);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', resize);

    // Speed variation
    const speedInterval = setInterval(() => {
      targetSpeedRef.current = Math.random() * 2 + 0.5;
    }, 3000);

    const animate = () => {
      // Smooth speed transition
      speedRef.current += (targetSpeedRef.current - speedRef.current) * 0.02;

      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.fillRect(0, 0, width, height);

      starsRef.current.forEach((star) => {
        // Store previous position for trail
        star.prevX = (star.x / star.z) * 500 + centerX;
        star.prevY = (star.y / star.z) * 500 + centerY;

        // Move star towards viewer
        star.z -= speedRef.current * 15;

        // Reset star if too close
        if (star.z < 1) {
          star.x = (Math.random() - 0.5) * width * 2;
          star.y = (Math.random() - 0.5) * height * 2;
          star.z = 1500;
          star.prevX = (star.x / star.z) * 500 + centerX;
          star.prevY = (star.y / star.z) * 500 + centerY;
        }

        // Project to 2D
        const x = (star.x / star.z) * 500 + centerX;
        const y = (star.y / star.z) * 500 + centerY;

        // Calculate size and opacity based on depth
        const size = Math.max(0.5, (1 - star.z / 1500) * 3);
        const opacity = Math.min(1, (1 - star.z / 1500) * 1.5);

        // Draw star trail
        if (speedRef.current > 0.8) {
          const gradient = ctx.createLinearGradient(star.prevX, star.prevY, x, y);
          gradient.addColorStop(0, 'transparent');
          gradient.addColorStop(1, `rgba(255, 255, 255, ${opacity})`);

          ctx.beginPath();
          ctx.moveTo(star.prevX, star.prevY);
          ctx.lineTo(x, y);
          ctx.strokeStyle = gradient;
          ctx.lineWidth = size;
          ctx.stroke();
        }

        // Draw star
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fill();
      });

      // Central glow
      const centerGlow = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 100);
      centerGlow.addColorStop(0, `rgba(255, 255, 255, ${0.05 + speedRef.current * 0.02})`);
      centerGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = centerGlow;
      ctx.fillRect(centerX - 100, centerY - 100, 200, 200);

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      clearInterval(speedInterval);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none opacity-60"
    />
  );
};

export default HyperSpace;
