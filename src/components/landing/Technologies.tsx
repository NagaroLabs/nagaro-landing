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
      
      {/* Tech Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="techPattern" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="1" fill="white" />
              <line x1="50" y1="0" x2="50" y2="100" stroke="white" strokeWidth="0.2" opacity="0.3" />
              <line x1="0" y1="50" x2="100" y2="50" stroke="white" strokeWidth="0.2" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#techPattern)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center max-w-3xl mx-auto transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="inline-block px-4 py-2 rounded-full border border-border/50 bg-secondary/30 backdrop-blur-sm text-xs font-medium text-muted-foreground tracking-wider uppercase holographic">
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
              className={`group relative flex items-center gap-3 px-6 py-4 rounded-full futuristic-card border border-border/30 hover:border-white/30 transition-all duration-500 cursor-default hover:scale-105 ${
                isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
              }`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              {/* Icon */}
              <span className="text-2xl group-hover:scale-125 transition-transform duration-300 group-hover:animate-bounce">
                {tech.icon}
              </span>
              
              {/* Name */}
              <span className="text-sm font-medium text-foreground group-hover:text-white transition-colors">
                {tech.name}
              </span>

              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-full bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
              
              {/* Shine Effect */}
              <div className="absolute inset-0 rounded-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </div>
            </div>
          ))}
        </div>

        {/* Decorative Elements */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-gradient-to-r from-muted/10 to-transparent blur-3xl pointer-events-none animate-pulse-slow" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-96 h-96 rounded-full bg-gradient-to-l from-muted/10 to-transparent blur-3xl pointer-events-none animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>
    </section>
  );
};

export default Technologies;
