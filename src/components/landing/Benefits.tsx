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
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center max-w-3xl mx-auto transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="inline-block px-4 py-2 rounded-full border border-border/50 bg-secondary/30 text-xs font-medium text-muted-foreground tracking-wider uppercase">
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
                className={`group flex gap-5 transition-all duration-700 ${
                  isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Icon */}
                <div className="flex-shrink-0 w-12 h-12 rounded-xl gradient-metallic flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Icon size={24} className="text-background" />
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg className="absolute -right-32 top-1/4 w-96 h-96 opacity-5" viewBox="0 0 400 400">
          <defs>
            <linearGradient id="benefitsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(0 0% 80%)" />
              <stop offset="100%" stopColor="hsl(0 0% 40%)" />
            </linearGradient>
          </defs>
          <path
            d="M200,50 L350,150 L350,300 L200,350 L50,300 L50,150 Z"
            fill="none"
            stroke="url(#benefitsGradient)"
            strokeWidth="1"
          />
          <path
            d="M200,100 L300,175 L300,275 L200,325 L100,275 L100,175 Z"
            fill="none"
            stroke="url(#benefitsGradient)"
            strokeWidth="1"
          />
        </svg>
      </div>
    </section>
  );
};

export default Benefits;
