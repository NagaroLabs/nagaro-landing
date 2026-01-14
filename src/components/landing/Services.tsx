import { Code, Smartphone, LayoutDashboard, Link2, GitBranch } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useInView } from '@/hooks/useInView';

const Services = () => {
  const { t } = useLanguage();
  const { ref, isInView } = useInView({ threshold: 0.1 });

  const services = [
    {
      icon: Code,
      title: t('services.1.title'),
      description: t('services.1.description'),
    },
    {
      icon: Smartphone,
      title: t('services.2.title'),
      description: t('services.2.description'),
    },
    {
      icon: LayoutDashboard,
      title: t('services.3.title'),
      description: t('services.3.description'),
    },
    {
      icon: Link2,
      title: t('services.4.title'),
      description: t('services.4.description'),
    },
    {
      icon: GitBranch,
      title: t('services.5.title'),
      description: t('services.5.description'),
    },
  ];

  return (
    <section
      id="services"
      ref={ref}
      className="relative py-24 sm:py-32 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/[0.02] rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/[0.02] rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center max-w-3xl mx-auto transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="inline-block px-4 py-2 rounded-full border border-border/50 bg-secondary/30 backdrop-blur-sm text-xs font-medium text-muted-foreground tracking-wider uppercase holographic">
            {t('services.tagline')}
          </span>

          <h2 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            {t('services.title')}
          </h2>

          <p className="mt-4 text-lg text-muted-foreground">
            {t('services.subtitle')}
          </p>
        </div>

        {/* Services Grid */}
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className={`group relative p-8 rounded-2xl futuristic-card border border-border/30 hover:border-white/20 transition-all duration-500 hover:-translate-y-2 ${
                  isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Animated Border */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent animate-border-flow" style={{ padding: '1px' }} />
                </div>

                {/* Icon Container */}
                <div className="relative w-16 h-16 rounded-xl gradient-metallic flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 glow-pulse">
                  <Icon size={28} className="text-background" />
                  
                  {/* Icon Glow */}
                  <div className="absolute inset-0 rounded-xl bg-white/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Content */}
                <h3 className="relative text-xl font-semibold text-foreground mb-3 group-hover:text-white transition-colors">
                  {service.title}
                </h3>
                <p className="relative text-muted-foreground leading-relaxed group-hover:text-gray-300 transition-colors">
                  {service.description}
                </p>

                {/* Corner Accent */}
                <div className="absolute top-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <svg viewBox="0 0 64 64" className="w-full h-full">
                    <path d="M64 0 L64 16 L48 0 Z" fill="rgba(255,255,255,0.1)" />
                  </svg>
                </div>

                {/* Scan Line Effect */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-scan-line" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
