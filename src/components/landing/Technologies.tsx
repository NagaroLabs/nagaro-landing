import { useLanguage } from '@/contexts/LanguageContext';
import { useInView } from '@/hooks/useInView';

const Technologies = () => {
  const { t } = useLanguage();
  const { ref, isInView } = useInView({ threshold: 0.2 });

  const technologies = [
    { name: 'React', icon: '⚛️' },
    { name: 'Next.js', icon: '▲' },
    { name: 'TypeScript', icon: '📘' },
    { name: 'Node.js', icon: '🟢' },
    { name: 'Python', icon: '🐍' },
    { name: 'AWS', icon: '☁️' },
    { name: 'PostgreSQL', icon: '🐘' },
    { name: 'Docker', icon: '🐳' },
    { name: 'GraphQL', icon: '◈' },
    { name: 'Tailwind', icon: '🎨' },
  ];

  return (
    <section
      id="tech"
      ref={ref}
      className="relative py-24 sm:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-graphite/30 to-background" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center max-w-3xl mx-auto transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="inline-block px-4 py-2 rounded-full border border-border/50 bg-secondary/30 text-xs font-medium text-muted-foreground tracking-wider uppercase">
            {t('tech.tagline')}
          </span>

          <h2 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            {t('tech.title')}
          </h2>

          <p className="mt-4 text-lg text-muted-foreground">
            {t('tech.subtitle')}
          </p>
        </div>

        {/* Tech Grid */}
        <div className="mt-16 flex flex-wrap justify-center gap-4">
          {technologies.map((tech, index) => (
            <div
              key={tech.name}
              className={`group flex items-center gap-3 px-6 py-4 rounded-full bg-secondary/30 border border-border/30 hover:border-border/50 hover:bg-secondary/50 transition-all duration-300 cursor-default ${
                isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
              }`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <span className="text-2xl group-hover:scale-110 transition-transform">{tech.icon}</span>
              <span className="text-sm font-medium text-foreground">{tech.name}</span>
            </div>
          ))}
        </div>

        {/* Decorative Elements */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-gradient-to-r from-muted/10 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-96 h-96 rounded-full bg-gradient-to-l from-muted/10 to-transparent blur-3xl pointer-events-none" />
      </div>
    </section>
  );
};

export default Technologies;
