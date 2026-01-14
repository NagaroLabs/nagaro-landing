import { useEffect, useRef, useState } from 'react';

const CircuitBoard = () => {
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

    interface Circuit {
      x: number;
      y: number;
      path: { x: number; y: number }[];
      progress: number;
      speed: number;
      color: string;
    }

    const circuits: Circuit[] = [];
    const gridSize = 40;

    const createCircuit = (): Circuit => {
      const startX = Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize;
      const startY = Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize;
      
      const path: { x: number; y: number }[] = [{ x: startX, y: startY }];
      let currentX = startX;
      let currentY = startY;

      // Generate random path
      for (let i = 0; i < 10 + Math.random() * 15; i++) {
        const direction = Math.floor(Math.random() * 4);
        const length = gridSize * (Math.floor(Math.random() * 3) + 1);

        switch (direction) {
          case 0: currentX += length; break;
          case 1: currentX -= length; break;
          case 2: currentY += length; break;
          case 3: currentY -= length; break;
        }

        path.push({ x: currentX, y: currentY });
      }

      return {
        x: startX,
        y: startY,
        path,
        progress: 0,
        speed: 0.005 + Math.random() * 0.01,
        color: `rgba(255, 255, 255, ${0.1 + Math.random() * 0.2})`,
      };
    };

    // Initialize circuits
    for (let i = 0; i < 15; i++) {
      circuits.push(createCircuit());
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.02)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw static grid dots
      ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
      for (let x = 0; x < canvas.width; x += gridSize) {
        for (let y = 0; y < canvas.height; y += gridSize) {
          ctx.beginPath();
          ctx.arc(x, y, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      circuits.forEach((circuit, index) => {
        circuit.progress += circuit.speed;

        if (circuit.progress >= 1) {
          circuits[index] = createCircuit();
          return;
        }

        // Calculate current position along path
        const totalSegments = circuit.path.length - 1;
        const currentSegment = Math.floor(circuit.progress * totalSegments);
        const segmentProgress = (circuit.progress * totalSegments) % 1;

        if (currentSegment >= circuit.path.length - 1) return;

        const from = circuit.path[currentSegment];
        const to = circuit.path[currentSegment + 1];

        // Draw path up to current position
        ctx.beginPath();
        ctx.moveTo(circuit.path[0].x, circuit.path[0].y);
        
        for (let i = 1; i <= currentSegment; i++) {
          ctx.lineTo(circuit.path[i].x, circuit.path[i].y);
        }

        const currentX = from.x + (to.x - from.x) * segmentProgress;
        const currentY = from.y + (to.y - from.y) * segmentProgress;
        ctx.lineTo(currentX, currentY);

        const gradient = ctx.createLinearGradient(
          circuit.path[0].x, circuit.path[0].y,
          currentX, currentY
        );
        gradient.addColorStop(0, 'transparent');
        gradient.addColorStop(0.8, circuit.color);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0.5)');

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Draw head glow
        ctx.beginPath();
        ctx.arc(currentX, currentY, 3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.fill();

        // Draw node points
        for (let i = 0; i <= currentSegment; i++) {
          ctx.beginPath();
          ctx.arc(circuit.path[i].x, circuit.path[i].y, 2, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
          ctx.fill();
        }
      });

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
      className="absolute inset-0 pointer-events-none opacity-60"
    />
  );
};

export default CircuitBoard;
