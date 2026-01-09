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
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center max-w-3xl mx-auto transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="inline-block px-4 py-2 rounded-full border border-border/50 bg-secondary/30 text-xs font-medium text-muted-foreground tracking-wider uppercase">
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
                className={`group relative p-8 rounded-2xl bg-secondary/20 border border-border/30 hover:border-border/50 transition-all duration-500 hover:-translate-y-1 ${
                  isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Gradient Border on Hover */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 gradient-border" />

                {/* Icon */}
                <div className="relative w-14 h-14 rounded-xl bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon size={28} className="text-foreground" />
                </div>

                {/* Content */}
                <h3 className="relative text-xl font-semibold text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="relative text-muted-foreground leading-relaxed">
                  {service.description}
                </p>

                {/* Metallic Shine Effect */}
                <div className="absolute inset-0 rounded-2xl metallic-shine opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
