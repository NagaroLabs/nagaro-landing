import { useEffect, useRef } from 'react';

const GeometricShapes = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    interface Shape {
      x: number;
      y: number;
      size: number;
      rotation: number;
      rotationSpeed: number;
      type: 'triangle' | 'square' | 'hexagon' | 'circle';
      opacity: number;
      speed: number;
    }

    const shapes: Shape[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initShapes();
    };

    const initShapes = () => {
      shapes.length = 0;
      const types: Shape['type'][] = ['triangle', 'square', 'hexagon', 'circle'];
      
      for (let i = 0; i < 15; i++) {
        shapes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: 20 + Math.random() * 60,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.02,
          type: types[Math.floor(Math.random() * types.length)],
          opacity: 0.02 + Math.random() * 0.05,
          speed: 0.2 + Math.random() * 0.5,
        });
      }
    };

    const drawShape = (shape: Shape) => {
      ctx.save();
      ctx.translate(shape.x, shape.y);
      ctx.rotate(shape.rotation);
      ctx.strokeStyle = `rgba(255, 255, 255, ${shape.opacity})`;
      ctx.lineWidth = 1;

      switch (shape.type) {
        case 'triangle':
          ctx.beginPath();
          ctx.moveTo(0, -shape.size);
          ctx.lineTo(shape.size * 0.866, shape.size * 0.5);
          ctx.lineTo(-shape.size * 0.866, shape.size * 0.5);
          ctx.closePath();
          ctx.stroke();
          break;

        case 'square':
          ctx.strokeRect(-shape.size / 2, -shape.size / 2, shape.size, shape.size);
          break;

        case 'hexagon':
          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const angle = (i * Math.PI) / 3;
            const x = Math.cos(angle) * shape.size;
            const y = Math.sin(angle) * shape.size;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.closePath();
          ctx.stroke();
          break;

        case 'circle':
          ctx.beginPath();
          ctx.arc(0, 0, shape.size / 2, 0, Math.PI * 2);
          ctx.stroke();
          break;
      }

      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      shapes.forEach(shape => {
        shape.rotation += shape.rotationSpeed;
        shape.y -= shape.speed;
        
        if (shape.y < -shape.size) {
          shape.y = canvas.height + shape.size;
          shape.x = Math.random() * canvas.width;
        }

        drawShape(shape);
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

export default GeometricShapes;
