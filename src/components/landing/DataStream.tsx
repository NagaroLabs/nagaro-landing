import { useEffect, useRef } from 'react';

const DataStream = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;

    interface Stream {
      x: number;
      y: number;
      chars: string[];
      speed: number;
      length: number;
      opacity: number;
    }

    const streams: Stream[] = [];
    const chars = '01アイウエオカキクケコサシスセソ<>{}[]';

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initStreams();
    };

    const initStreams = () => {
      streams.length = 0;
      const columns = Math.floor(canvas.width / 30);

      for (let i = 0; i < columns; i++) {
        if (Math.random() > 0.6) {
          const length = 5 + Math.floor(Math.random() * 15);
          streams.push({
            x: i * 30 + Math.random() * 10,
            y: Math.random() * canvas.height,
            chars: Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]),
            speed: 1 + Math.random() * 3,
            length,
            opacity: 0.03 + Math.random() * 0.07,
          });
        }
      }
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      streams.forEach(stream => {
        stream.chars.forEach((char, i) => {
          const y = stream.y - i * 18;
          const opacity = stream.opacity * (1 - i / stream.length);
          
          ctx.font = '14px monospace';
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
          ctx.fillText(char, stream.x, y);

          // Randomly change characters
          if (Math.random() > 0.98) {
            stream.chars[i] = chars[Math.floor(Math.random() * chars.length)];
          }
        });

        stream.y += stream.speed;

        if (stream.y - stream.length * 18 > canvas.height) {
          stream.y = 0;
          stream.x = Math.floor(stream.x / 30) * 30 + Math.random() * 10;
        }
      });

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
      className="absolute inset-0 w-full h-full pointer-events-none opacity-30"
    />
  );
};

export default DataStream;
