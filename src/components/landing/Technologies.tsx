import { useLanguage } from '@/contexts/LanguageContext';
import { useInView } from '@/hooks/useInView';
import NeuralNetwork from './NeuralNetwork';

const Technologies = () => {
  const { t } = useLanguage();
  const { ref, isInView } = useInView({ threshold: 0.2 });

  const technologies = [
    { name: 'React', icon: '⚛️', color: 'from-cyan-500/20 to-blue-500/20' },
    { name: 'Next.js', icon: '▲', color: 'from-gray-500/20 to-gray-700/20' },
    { name: 'TypeScript', icon: '📘', color: 'from-blue-500/20 to-blue-700/20' },
    { name: 'Node.js', icon: '🟢', color: 'from-green-500/20 to-emerald-500/20' },
    { name: 'Python', icon: '🐍', color: 'from-yellow-500/20 to-blue-500/20' },
    { name: 'AWS', icon: '☁️', color: 'from-orange-500/20 to-yellow-500/20' },
    { name: 'PostgreSQL', icon: '🐘', color: 'from-blue-500/20 to-indigo-500/20' },
    { name: 'Docker', icon: '🐳', color: 'from-blue-400/20 to-cyan-500/20' },
    { name: 'GraphQL', icon: '◈', color: 'from-pink-500/20 to-purple-500/20' },
    { name: 'Tailwind', icon: '🎨', color: 'from-teal-500/20 to-cyan-500/20' },
  ];

  return (
    <section
      id="tech"
      ref={ref}
      className="relative py-24 sm:py-32 overflow-hidden"
    >
      {/* ========== LAYERED BACKGROUNDS ========== */}
      
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black" />

      {/* Neural Network */}
      <div className="absolute inset-0 z-[1] opacity-50">
        <NeuralNetwork />
      </div>

      {/* Radial glow */}
      <div className="absolute inset-0 z-[2] bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(255,255,255,0.03),transparent)]" />

      {/* Tech grid */}
      <div className="absolute inset-0 z-[3] opacity-[0.03]" style={{
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }} />

      {/* Floating particles */}
      <div className="absolute inset-0 z-[4]">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full animate-float-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* ========== CONTENT ========== */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center max-w-3xl mx-auto transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-xl text-xs font-medium text-white/70 tracking-[0.2em] uppercase">
            {t('tech.tagline')}
          </span>

          <h2 className="mt-8 text-4xl sm:text-5xl lg:text-6xl font-bold">
            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-500 bg-clip-text text-transparent">
              {t('tech.title')}
            </span>
          </h2>

          <p className="mt-6 text-lg sm:text-xl text-gray-400">
            {t('tech.subtitle')}
          </p>
        </div>

        {/* Tech Cloud */}
        <div className="mt-20 flex flex-wrap justify-center gap-4 lg:gap-6">
          {technologies.map((tech, index) => (
            <div
              key={tech.name}
              className={`group relative transition-all duration-700 ${
                isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
              }`}
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <div className="relative flex items-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 backdrop-blur-sm transition-all duration-500 hover:scale-110 hover:border-white/20 hover:shadow-[0_0_40px_rgba(255,255,255,0.1)] cursor-default overflow-hidden">
                
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${tech.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                {/* Shine effect */}
                <div className="absolute inset-0 overflow-hidden rounded-2xl">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </div>

                {/* Icon */}
                <span className="relative text-3xl group-hover:scale-125 transition-transform duration-500">
                  {tech.icon}
                </span>
                
                {/* Name */}
                <span className="relative text-sm font-medium text-white group-hover:text-white transition-colors">
                  {tech.name}
                </span>

                {/* Pulse effect */}
                <div className="absolute inset-0 rounded-2xl border-2 border-white/0 group-hover:border-white/10 group-hover:scale-110 group-hover:opacity-0 transition-all duration-500" />
              </div>
            </div>
          ))}
        </div>

        {/* Central orbiting effect */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none opacity-10">
          <div className="absolute inset-0 rounded-full border border-white/20 animate-spin-slow" style={{ animationDuration: '40s' }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rounded-full" />
          </div>
          <div className="absolute inset-8 rounded-full border border-white/15 animate-reverse-spin" style={{ animationDuration: '30s' }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full" />
          </div>
          <div className="absolute inset-16 rounded-full border border-white/10 animate-spin-slow" style={{ animationDuration: '20s' }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Technologies;
