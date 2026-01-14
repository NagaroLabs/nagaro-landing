import { Zap, Scale, Sparkles, Wrench, Shield, Headphones } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useInView } from '@/hooks/useInView';

const Benefits = () => {
  const { t } = useLanguage();
  const { ref, isInView } = useInView({ threshold: 0.1 });

  const benefits = [
    {
      icon: Zap,
      title: t('benefits.1.title'),
      description: t('benefits.1.description'),
    },
    {
      icon: Scale,
      title: t('benefits.2.title'),
      description: t('benefits.2.description'),
    },
    {
      icon: Sparkles,
      title: t('benefits.3.title'),
      description: t('benefits.3.description'),
    },
    {
      icon: Wrench,
      title: t('benefits.4.title'),
      description: t('benefits.4.description'),
    },
    {
      icon: Shield,
      title: t('benefits.5.title'),
      description: t('benefits.5.description'),
    },
    {
      icon: Headphones,
      title: t('benefits.6.title'),
      description: t('benefits.6.description'),
    },
  ];

  return (
    <section
      id="benefits"
      ref={ref}
      className="relative py-24 sm:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-graphite/50 to-background" />
        
        {/* Animated Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-10" preserveAspectRatio="none">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="50%" stopColor="white" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
          {[...Array(5)].map((_, i) => (
            <line
              key={i}
              x1="0"
              y1={`${20 + i * 15}%`}
              x2="100%"
              y2={`${20 + i * 15}%`}
              stroke="url(#lineGradient)"
              strokeWidth="0.5"
              className="animate-pulse-slow"
              style={{ animationDelay: `${i * 0.5}s` }}
            />
          ))}
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center max-w-3xl mx-auto transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="inline-block px-4 py-2 rounded-full border border-border/50 bg-secondary/30 backdrop-blur-sm text-xs font-medium text-muted-foreground tracking-wider uppercase holographic">
            {t('benefits.tagline')}
          </span>

          <h2 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            {t('benefits.title')}
          </h2>

          <p className="mt-4 text-lg text-muted-foreground">
            {t('benefits.subtitle')}
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className={`group relative flex gap-5 p-6 rounded-2xl transition-all duration-700 hover:bg-white/[0.02] ${
                  isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Icon Container */}
                <div className="relative flex-shrink-0">
                  <div className="w-14 h-14 rounded-xl gradient-metallic flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <Icon size={24} className="text-background" />
                  </div>
                  
                  {/* Animated Ring */}
                  <div className="absolute inset-0 rounded-xl border-2 border-white/0 group-hover:border-white/20 group-hover:scale-125 transition-all duration-500 opacity-0 group-hover:opacity-100" />
                  
                  {/* Glow Effect */}
                  <div className="absolute inset-0 rounded-xl bg-white/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-white transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed group-hover:text-gray-400 transition-colors">
                    {benefit.description}
                  </p>
                </div>

                {/* Hover Line */}
                <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </div>
            );
          })}
        </div>
      </div>

      {/* Decorative Hexagon */}
      <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-80 h-80 opacity-5 pointer-events-none">
        <svg viewBox="0 0 400 400" className="w-full h-full animate-spin-slow">
          <defs>
            <linearGradient id="hexGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="white" />
              <stop offset="100%" stopColor="gray" />
            </linearGradient>
          </defs>
          <path
            d="M200,50 L350,125 L350,275 L200,350 L50,275 L50,125 Z"
            fill="none"
            stroke="url(#hexGradient)"
            strokeWidth="1"
          />
          <path
            d="M200,80 L320,140 L320,260 L200,320 L80,260 L80,140 Z"
            fill="none"
            stroke="url(#hexGradient)"
            strokeWidth="0.5"
          />
        </svg>
      </div>
    </section>
  );
};

export default Benefits;
