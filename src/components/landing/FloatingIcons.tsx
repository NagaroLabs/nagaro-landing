import { Code, Cpu, Database, Globe, Layers, Shield, Zap, Cloud, Terminal, Wifi } from 'lucide-react';

const FloatingIcons = () => {
  const icons = [
    { Icon: Code, x: '10%', y: '20%', delay: 0, size: 24 },
    { Icon: Cpu, x: '85%', y: '15%', delay: 1.5, size: 28 },
    { Icon: Database, x: '15%', y: '70%', delay: 3, size: 22 },
    { Icon: Globe, x: '80%', y: '65%', delay: 4.5, size: 26 },
    { Icon: Layers, x: '25%', y: '40%', delay: 2, size: 20 },
    { Icon: Shield, x: '75%', y: '35%', delay: 5, size: 24 },
    { Icon: Zap, x: '5%', y: '50%', delay: 1, size: 22 },
    { Icon: Cloud, x: '90%', y: '45%', delay: 3.5, size: 26 },
    { Icon: Terminal, x: '30%', y: '85%', delay: 2.5, size: 20 },
    { Icon: Wifi, x: '70%', y: '80%', delay: 4, size: 22 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {icons.map(({ Icon, x, y, delay, size }, index) => (
        <div
          key={index}
          className="absolute animate-float-icon"
          style={{
            left: x,
            top: y,
            animationDelay: `${delay}s`,
          }}
        >
          <div className="relative">
            <Icon 
              size={size} 
              className="text-white/10 hover:text-white/30 transition-colors duration-500"
              strokeWidth={1}
            />
            <div className="absolute inset-0 blur-xl bg-white/5 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default FloatingIcons;
