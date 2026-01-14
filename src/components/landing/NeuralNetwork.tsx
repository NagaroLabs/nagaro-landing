import { useEffect, useRef } from 'react';

const NeuralNetwork = () => {
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

    interface Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      pulse: number;
      pulseSpeed: number;
    }

    interface Signal {
      fromNode: number;
      toNode: number;
      progress: number;
      speed: number;
    }

    const nodeCount = 50;
    const nodes: Node[] = [];
    const signals: Signal[] = [];

    // Initialize nodes
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 3 + 2,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.05 + 0.02,
      });
    }

    let time = 0;

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw nodes
      nodes.forEach((node, i) => {
        // Update position
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off walls
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        node.pulse += node.pulseSpeed;

        // Draw connections
        nodes.forEach((other, j) => {
          if (i >= j) return;
          const dx = other.x - node.x;
          const dy = other.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            const opacity = (1 - dist / 150) * 0.3;
            
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();

            // Occasionally create signal
            if (Math.random() < 0.001 && signals.length < 20) {
              signals.push({
                fromNode: i,
                toNode: j,
                progress: 0,
                speed: Math.random() * 0.02 + 0.01,
              });
            }
          }
        });

        // Draw node
        const pulseSize = node.radius + Math.sin(node.pulse) * 1;
        const pulseOpacity = 0.5 + Math.sin(node.pulse) * 0.3;

        // Outer glow
        const glow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, pulseSize * 4);
        glow.addColorStop(0, `rgba(255, 255, 255, ${pulseOpacity * 0.2})`);
        glow.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.arc(node.x, node.y, pulseSize * 4, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(node.x, node.y, pulseSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${pulseOpacity})`;
        ctx.fill();
      });

      // Update and draw signals
      signals.forEach((signal, index) => {
        signal.progress += signal.speed;

        if (signal.progress >= 1) {
          signals.splice(index, 1);
          return;
        }

        const fromNode = nodes[signal.fromNode];
        const toNode = nodes[signal.toNode];
        const x = fromNode.x + (toNode.x - fromNode.x) * signal.progress;
        const y = fromNode.y + (toNode.y - fromNode.y) * signal.progress;

        // Draw signal
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${1 - signal.progress})`;
        ctx.fill();

        // Signal trail
        for (let t = 0; t < 5; t++) {
          const trailProgress = signal.progress - t * 0.02;
          if (trailProgress < 0) continue;
          const trailX = fromNode.x + (toNode.x - fromNode.x) * trailProgress;
          const trailY = fromNode.y + (toNode.y - fromNode.y) * trailProgress;
          ctx.beginPath();
          ctx.arc(trailX, trailY, 2 - t * 0.3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${(1 - signal.progress) * (1 - t / 5) * 0.5})`;
          ctx.fill();
        }
      });

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
      className="absolute inset-0 pointer-events-none opacity-50"
    />
  );
};

export default NeuralNetwork;
