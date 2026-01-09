import { useLanguage } from '@/contexts/LanguageContext';
import { useInView } from '@/hooks/useInView';

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
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-graphite/50 to-background" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div className={`transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <span className="inline-block px-4 py-2 rounded-full border border-border/50 bg-secondary/30 text-xs font-medium text-muted-foreground tracking-wider uppercase">
              {t('about.tagline')}
            </span>

            <h2 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
              {t('about.title')}
            </h2>

            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              {t('about.description')}
            </p>

            <blockquote className="mt-8 pl-6 border-l-2 border-primary/50">
              <p className="text-foreground/90 italic">
                "{t('about.mission')}"
              </p>
            </blockquote>
          </div>

          {/* Stats */}
          <div
            className={`grid grid-cols-3 gap-4 transition-all duration-700 delay-200 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            {stats.map((stat, index) => (
              <div
                key={index}
                className="relative p-6 rounded-2xl bg-secondary/30 border border-border/30 gradient-border text-center"
              >
                <div className="text-3xl sm:text-4xl font-bold gradient-metallic-text">
                  {stat.value}
                </div>
                <div className="mt-2 text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative Element */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-96 opacity-10 pointer-events-none">
          <svg viewBox="0 0 400 400" className="w-full h-full">
            <defs>
              <linearGradient id="aboutGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(0 0% 80%)" />
                <stop offset="100%" stopColor="hsl(0 0% 40%)" />
              </linearGradient>
            </defs>
            <circle cx="200" cy="200" r="150" fill="none" stroke="url(#aboutGradient)" strokeWidth="0.5" />
            <circle cx="200" cy="200" r="100" fill="none" stroke="url(#aboutGradient)" strokeWidth="0.5" />
            <circle cx="200" cy="200" r="50" fill="none" stroke="url(#aboutGradient)" strokeWidth="0.5" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default About;
