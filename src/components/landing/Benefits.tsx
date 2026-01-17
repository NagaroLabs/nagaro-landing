import { Zap, Scale, Sparkles, Wrench, Shield, Headphones } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useInView } from '@/hooks/useInView';
import PulsingRings from './PulsingRings';
import HolographicGrid from './HolographicGrid';

const Benefits = () => {
  const { t } = useLanguage();
  const { ref, isInView } = useInView({ threshold: 0.1 });

  const benefits = [
    {
      icon: Zap,
      title: t('benefits.1.title'),
      description: t('benefits.1.description'),
      color: 'yellow',
    },
    {
      icon: Scale,
      title: t('benefits.2.title'),
      description: t('benefits.2.description'),
      color: 'blue',
    },
    {
      icon: Sparkles,
      title: t('benefits.3.title'),
      description: t('benefits.3.description'),
      color: 'purple',
    },
    {
      icon: Wrench,
      title: t('benefits.4.title'),
      description: t('benefits.4.description'),
      color: 'orange',
    },
    {
      icon: Shield,
      title: t('benefits.5.title'),
      description: t('benefits.5.description'),
      color: 'green',
    },
    {
      icon: Headphones,
      title: t('benefits.6.title'),
      description: t('benefits.6.description'),
      color: 'cyan',
    },
  ];

  return (
    <section
      id="benefits"
      ref={ref}
      className="relative py-24 sm:py-32 overflow-hidden"
    >
      {/* ========== LAYERED BACKGROUNDS ========== */}
      
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black" />

      {/* Holographic Grid */}
      <div className="absolute inset-0 z-[1]">
        <HolographicGrid />
      </div>

      {/* Pulsing Rings */}
      <div className="absolute inset-0 z-[2]">
        <PulsingRings />
      </div>

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.01] rounded-full blur-[200px] z-[3]" />

      {/* Noise texture overlay */}
      <div className="absolute inset-0 z-[4] opacity-[0.015]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }} />

      {/* ========== CONTENT ========== */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center max-w-3xl mx-auto transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-xl text-xs font-medium text-white/70 tracking-[0.2em] uppercase">
            {t('benefits.tagline')}
          </span>

          <h2 className="mt-8 text-4xl sm:text-5xl lg:text-6xl font-bold">
            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-500 bg-clip-text text-transparent">
              {t('benefits.title')}
            </span>
          </h2>

          <p className="mt-6 text-lg sm:text-xl text-gray-400">
            {t('benefits.subtitle')}
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="mt-20 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className={`group relative transition-all duration-700 ${
                  isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="relative p-8 rounded-3xl transition-all duration-500 hover:bg-white/[0.03]">
                  {/* Connecting line effect */}
                  <div className="absolute left-8 top-20 bottom-0 w-px bg-gradient-to-b from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Icon container */}
                  <div className="relative mb-6">
                    <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:border-white/20 transition-all duration-500">
                      <Icon size={28} className="text-white" />
                      
                      {/* Glow effect */}
                      <div className="absolute inset-0 rounded-2xl bg-white/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                    {/* Pulse ring on hover */}
                    <div className="absolute inset-0 rounded-2xl border-2 border-white/0 group-hover:border-white/20 group-hover:scale-150 group-hover:opacity-0 transition-all duration-1000" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:translate-x-2 transition-transform duration-300">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                    {benefit.description}
                  </p>

                  {/* Bottom line */}
                  <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Decorative element */}
        <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-96 h-96 opacity-5 pointer-events-none">
          <svg viewBox="0 0 400 400" className="w-full h-full animate-spin-slow" style={{ animationDuration: '30s' }}>
            <defs>
              <linearGradient id="benefitsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="white" />
                <stop offset="100%" stopColor="gray" />
              </linearGradient>
            </defs>
            <path
              d="M200,30 L370,115 L370,285 L200,370 L30,285 L30,115 Z"
              fill="none"
              stroke="url(#benefitsGradient)"
              strokeWidth="1"
            />
            <path
              d="M200,60 L340,130 L340,270 L200,340 L60,270 L60,130 Z"
              fill="none"
              stroke="url(#benefitsGradient)"
              strokeWidth="0.5"
            />
            <path
              d="M200,90 L310,145 L310,255 L200,310 L90,255 L90,145 Z"
              fill="none"
              stroke="url(#benefitsGradient)"
              strokeWidth="0.25"
            />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
