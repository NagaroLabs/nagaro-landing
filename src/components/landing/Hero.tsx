import { Suspense } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import Logo3D from './Logo3D';
import ParticleField from './ParticleField';
import GlowingOrbs from './GlowingOrbs';
import CyberGrid from './CyberGrid';
import FloatingIcons from './FloatingIcons';
import MorphingShape from './MorphingShape';
import nagaroLogo from '@/assets/nagaro-logo.svg';

const WHATSAPP_NUMBER = '5575992539838';
const WHATSAPP_MESSAGE_PT = 'Olá! Gostaria de solicitar um orçamento para um projeto.';
const WHATSAPP_MESSAGE_EN = 'Hello! I would like to request a quote for a project.';

// Fallback for 3D loading
const LogoFallback = () => (
  <div className="h-48 sm:h-56 md:h-64 flex items-center justify-center">
    <img
      src={nagaroLogo}
      alt="Nagaro"
      className="h-24 sm:h-32 md:h-40 w-auto mx-auto glow-subtle rounded-2xl animate-pulse"
    />
  </div>
);

const Hero = () => {
  const { language, t } = useLanguage();

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    language === 'pt' ? WHATSAPP_MESSAGE_PT : WHATSAPP_MESSAGE_EN
  )}`;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 sm:pt-28 pb-24 sm:pb-28">
      {/* Background Layers */}
      <div className="absolute inset-0">
        {/* Particle Network */}
        <ParticleField />
        
        {/* Glowing Orbs */}
        <GlowingOrbs />
        
        {/* Cyber Grid */}
        <CyberGrid />
        
        {/* Floating Tech Icons */}
        <FloatingIcons />
        
        {/* Morphing Shape */}
        <MorphingShape />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background z-10" />
        
        {/* Radial Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(100,100,100,0.15)_0%,_transparent_50%)]" />
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* 3D Logo */}
        <div className="mb-6 animate-scale-in" style={{ animationDuration: '1s' }}>
          <Suspense fallback={<LogoFallback />}>
            <Logo3D />
          </Suspense>
        </div>

        {/* Tagline */}
        <div className="animate-fade-in" style={{ animationDuration: '0.8s', animationDelay: '0.3s', animationFillMode: 'both' }}>
          <span className="inline-block px-4 py-2 rounded-full border border-border/50 bg-secondary/30 backdrop-blur-sm text-xs font-medium text-muted-foreground tracking-wider uppercase holographic">
            {t('hero.tagline')}
          </span>
        </div>

        {/* Main Title */}
        <h1 
          className="mt-8 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight"
        >
          <span 
            className="block text-foreground animate-slide-in-left"
            style={{ animationDuration: '0.8s', animationDelay: '0.5s', animationFillMode: 'both' }}
          >
            {t('hero.title')}
          </span>
          <span 
            className="block gradient-metallic-text text-glow animate-slide-in-right mt-2"
            style={{ animationDuration: '0.8s', animationDelay: '0.7s', animationFillMode: 'both' }}
          >
            {t('hero.titleHighlight')}
          </span>
        </h1>

        {/* Subtitle */}
        <p 
          className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in"
          style={{ animationDuration: '0.8s', animationDelay: '0.9s', animationFillMode: 'both' }}
        >
          {t('hero.subtitle')}
        </p>

        {/* CTAs */}
        <div 
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in"
          style={{ animationDuration: '0.8s', animationDelay: '1.1s', animationFillMode: 'both' }}
        >
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group cyber-button gradient-metallic text-background px-8 py-4 rounded-full text-base font-semibold transition-all inline-flex items-center justify-center gap-2 shadow-lg hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] whitespace-nowrap glow-pulse"
          >
            <span>{t('hero.cta')}</span>
            <ArrowRight size={18} className="flex-shrink-0 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#services"
            className="group px-8 py-4 rounded-full text-base font-medium text-foreground border border-border/50 hover:border-white/30 hover:bg-white/5 transition-all backdrop-blur-sm relative overflow-hidden"
          >
            <span className="relative z-10">{t('hero.ctaSecondary')}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-muted-foreground hover:text-foreground transition-colors group"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Scroll</span>
          <ChevronDown size={32} className="animate-bounce" />
        </div>
      </a>
      
      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />
    </section>
  );
};

export default Hero;
