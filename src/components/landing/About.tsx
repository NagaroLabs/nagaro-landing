import { useLanguage } from '@/contexts/LanguageContext';
import { useInView } from '@/hooks/useInView';
import WaveBackground from './WaveBackground';
import GeometricShapes from './GeometricShapes';

const About = () => {
  const { t } = useLanguage();
  const { ref, isInView } = useInView({ threshold: 0.2 });

  const stats = [
    { value: t('about.stat1.value'), label: t('about.stat1.label') },
    { value: t('about.stat2.value'), label: t('about.stat2.label') },
    { value: t('about.stat3.value'), label: t('about.stat3.label') },
  ];

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-24 sm:py-32 overflow-hidden"
    >
      {/* ========== LAYERED BACKGROUNDS ========== */}
      
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black" />
      
      {/* Animated Waves */}
      <div className="absolute inset-0 z-[1]">
        <WaveBackground opacity={0.04} />
      </div>

      {/* Floating Geometric Shapes */}
      <div className="absolute inset-0 z-[2]">
        <GeometricShapes />
      </div>

      {/* Radial spotlight */}
      <div className="absolute inset-0 z-[3] bg-[radial-gradient(ellipse_80%_50%_at_20%_40%,rgba(255,255,255,0.03),transparent)]" />

      {/* Grid overlay */}
      <div className="absolute inset-0 z-[4] opacity-[0.02]" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                         linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: '100px 100px',
      }} />

      {/* Animated glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-white/[0.02] blur-[100px] animate-pulse-slow z-[5]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-white/[0.02] blur-[100px] animate-pulse-slow z-[5]" style={{ animationDelay: '-5s' }} />

      {/* Vignette */}
      <div className="absolute inset-0 z-[6] bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.6)_100%)]" />

      {/* ========== CONTENT ========== */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div className={`transition-all duration-1000 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-xl text-xs font-medium text-white/70 tracking-[0.2em] uppercase relative overflow-hidden group">
              <span className="relative z-10">{t('about.tagline')}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </span>

            <h2 className="mt-8 text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              {t('about.title').split(' ').map((word, i) => (
                <span 
                  key={i} 
                  className={`inline-block mr-3 ${i === 0 ? 'bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent' : ''}`}
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  {word}
                </span>
              ))}
            </h2>

            <p className="mt-8 text-lg sm:text-xl text-gray-400 leading-relaxed">
              {t('about.description')}
            </p>

            <blockquote className="mt-10 relative pl-8">
              {/* Animated border line */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-white/50 via-white/20 to-transparent rounded-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-white to-transparent animate-pulse" style={{ animationDuration: '2s' }} />
              </div>
              <p className="text-lg text-white/80 italic font-light">
                "{t('about.mission')}"
              </p>
            </blockquote>
          </div>

          {/* Stats with 3D effect */}
          <div
            className={`grid grid-cols-3 gap-4 transition-all duration-1000 delay-300 ${
              isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
          >
            {stats.map((stat, index) => (
              <div
                key={index}
                className="group relative perspective-1000"
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="relative p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-white/[0.08] to-transparent border border-white/10 backdrop-blur-sm text-center transition-all duration-500 hover:scale-105 hover:border-white/20 overflow-hidden">
                  {/* Animated background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Shine effect */}
                  <div className="absolute inset-0 overflow-hidden rounded-2xl">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-br from-white via-gray-200 to-gray-500 bg-clip-text text-transparent group-hover:from-white group-hover:to-gray-300 transition-all duration-500">
                      {stat.value}
                    </div>
                    <div className="mt-2 text-xs sm:text-sm text-gray-500 uppercase tracking-widest group-hover:text-gray-400 transition-colors">
                      {stat.label}
                    </div>
                  </div>

                  {/* Corner accents */}
                  <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-white/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-tl" />
                  <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-white/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-br" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative orbital rings */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-10 pointer-events-none">
          <svg viewBox="0 0 500 500" className="w-full h-full">
            <defs>
              <linearGradient id="aboutRingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="white" stopOpacity="0.5" />
                <stop offset="50%" stopColor="white" stopOpacity="0.1" />
                <stop offset="100%" stopColor="white" stopOpacity="0.5" />
              </linearGradient>
            </defs>
            <ellipse cx="250" cy="250" rx="200" ry="80" fill="none" stroke="url(#aboutRingGradient)" strokeWidth="0.5" className="animate-spin-slow" style={{ transformOrigin: 'center', animationDuration: '20s' }} />
            <ellipse cx="250" cy="250" rx="150" ry="60" fill="none" stroke="url(#aboutRingGradient)" strokeWidth="0.5" className="animate-reverse-spin" style={{ transformOrigin: 'center', animationDuration: '15s' }} />
            <ellipse cx="250" cy="250" rx="100" ry="40" fill="none" stroke="url(#aboutRingGradient)" strokeWidth="0.5" className="animate-spin-slow" style={{ transformOrigin: 'center', animationDuration: '10s' }} />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default About;
