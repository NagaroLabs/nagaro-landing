import { Code, Smartphone, LayoutDashboard, Link2, GitBranch } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useInView } from '@/hooks/useInView';
import DataStream from './DataStream';
import ParticleMesh from './ParticleMesh';

const Services = () => {
  const { t } = useLanguage();
  const { ref, isInView } = useInView({ threshold: 0.1 });

  const services = [
    {
      icon: Code,
      title: t('services.1.title'),
      description: t('services.1.description'),
      gradient: 'from-blue-500/20 to-cyan-500/20',
    },
    {
      icon: Smartphone,
      title: t('services.2.title'),
      description: t('services.2.description'),
      gradient: 'from-purple-500/20 to-pink-500/20',
    },
    {
      icon: LayoutDashboard,
      title: t('services.3.title'),
      description: t('services.3.description'),
      gradient: 'from-orange-500/20 to-yellow-500/20',
    },
    {
      icon: Link2,
      title: t('services.4.title'),
      description: t('services.4.description'),
      gradient: 'from-green-500/20 to-emerald-500/20',
    },
    {
      icon: GitBranch,
      title: t('services.5.title'),
      description: t('services.5.description'),
      gradient: 'from-red-500/20 to-rose-500/20',
    },
  ];

  return (
    <section
      id="services"
      ref={ref}
      className="relative py-24 sm:py-32 overflow-hidden"
    >
      {/* ========== LAYERED BACKGROUNDS ========== */}
      
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black" />

      {/* Data Stream Effect */}
      <div className="absolute inset-0 z-[1]">
        <DataStream />
      </div>

      {/* Interactive Particle Mesh */}
      <div className="absolute inset-0 z-[2]">
        <ParticleMesh />
      </div>

      {/* Glow spots */}
      <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-blue-500/[0.02] rounded-full blur-[150px] z-[3]" />
      <div className="absolute bottom-0 right-1/3 w-[600px] h-[600px] bg-purple-500/[0.02] rounded-full blur-[150px] z-[3]" />

      {/* Scanning line */}
      <div className="absolute inset-0 z-[4] overflow-hidden pointer-events-none">
        <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent animate-scan-vertical" style={{ animationDuration: '8s' }} />
      </div>

      {/* ========== CONTENT ========== */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center max-w-3xl mx-auto transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-xl text-xs font-medium text-white/70 tracking-[0.2em] uppercase">
            {t('services.tagline')}
          </span>

          <h2 className="mt-8 text-4xl sm:text-5xl lg:text-6xl font-bold">
            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-500 bg-clip-text text-transparent">
              {t('services.title')}
            </span>
          </h2>

          <p className="mt-6 text-lg sm:text-xl text-gray-400">
            {t('services.subtitle')}
          </p>
        </div>

        {/* Services Grid */}
        <div className="mt-20 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className={`group relative transition-all duration-700 ${
                  isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Card */}
                <div className="relative h-full p-8 rounded-3xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 backdrop-blur-sm overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:border-white/20 hover:shadow-[0_0_60px_rgba(255,255,255,0.1)]">
                  
                  {/* Animated gradient background on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                  
                  {/* Shine sweep */}
                  <div className="absolute inset-0 overflow-hidden rounded-3xl">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </div>

                  {/* Top glow line */}
                  <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="relative w-16 h-16 mb-6">
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-white/5 border border-white/10 group-hover:border-white/20 transition-colors" />
                      <div className="absolute inset-0 rounded-2xl bg-white/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="relative w-full h-full flex items-center justify-center">
                        <Icon size={28} className="text-white group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      
                      {/* Orbiting dot */}
                      <div className="absolute -inset-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="absolute w-1 h-1 bg-white rounded-full animate-orbit" style={{ animationDuration: '3s' }} />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-semibold text-white mb-4 group-hover:translate-x-1 transition-transform duration-300">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                      {service.description}
                    </p>
                  </div>

                  {/* Corner decorations */}
                  <div className="absolute top-3 right-3 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <svg viewBox="0 0 32 32" className="w-full h-full">
                      <path d="M32 0 L32 12 L20 0 Z" fill="rgba(255,255,255,0.1)" />
                    </svg>
                  </div>
                  <div className="absolute bottom-3 left-3 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rotate-180">
                    <svg viewBox="0 0 32 32" className="w-full h-full">
                      <path d="M32 0 L32 12 L20 0 Z" fill="rgba(255,255,255,0.1)" />
                    </svg>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
