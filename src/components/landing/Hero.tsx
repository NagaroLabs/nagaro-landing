import { Suspense } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import Logo3D from './Logo3D';
import nagaroLogo from '@/assets/nagaro-logo.svg';

const WHATSAPP_NUMBER = '5511999999999';
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
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-muted/30 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-tl from-muted/20 to-transparent rounded-full blur-3xl" />
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(hsl(0 0% 50%) 1px, transparent 1px),
                              linear-gradient(90deg, hsl(0 0% 50%) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
        
        {/* Curved Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-5" viewBox="0 0 1440 900" preserveAspectRatio="none">
          <path
            d="M0,400 Q360,200 720,400 T1440,400"
            fill="none"
            stroke="url(#heroGradient)"
            strokeWidth="2"
          />
          <path
            d="M0,500 Q360,300 720,500 T1440,500"
            fill="none"
            stroke="url(#heroGradient)"
            strokeWidth="1"
          />
          <defs>
            <linearGradient id="heroGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(0 0% 40%)" />
              <stop offset="50%" stopColor="hsl(0 0% 70%)" />
              <stop offset="100%" stopColor="hsl(0 0% 40%)" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* 3D Logo */}
        <div className="mb-6 animate-fade-in" style={{ animationDuration: '0.8s' }}>
          <Suspense fallback={<LogoFallback />}>
            <Logo3D />
          </Suspense>
        </div>

        {/* Tagline */}
        <div className="animate-fade-in" style={{ animationDuration: '0.8s', animationDelay: '0.1s', animationFillMode: 'both' }}>
          <span className="inline-block px-4 py-2 rounded-full border border-border/50 bg-secondary/30 text-xs font-medium text-muted-foreground tracking-wider uppercase">
            {t('hero.tagline')}
          </span>
        </div>

        {/* Main Title */}
        <h1 
          className="mt-8 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight animate-fade-in"
          style={{ animationDuration: '0.8s', animationDelay: '0.2s', animationFillMode: 'both' }}
        >
          <span className="text-foreground">{t('hero.title')}</span>
          <br />
          <span className="gradient-metallic-text text-glow">
            {t('hero.titleHighlight')}
          </span>
        </h1>

        {/* Subtitle */}
        <p 
          className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in"
          style={{ animationDuration: '0.8s', animationDelay: '0.3s', animationFillMode: 'both' }}
        >
          {t('hero.subtitle')}
        </p>

        {/* CTAs */}
        <div 
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in"
          style={{ animationDuration: '0.8s', animationDelay: '0.4s', animationFillMode: 'both' }}
        >
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group gradient-metallic text-background px-8 py-4 rounded-full text-base font-semibold hover:opacity-90 transition-all inline-flex items-center justify-center gap-2 shadow-lg whitespace-nowrap"
          >
            <span>{t('hero.cta')}</span>
            <ArrowRight size={18} className="flex-shrink-0 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#services"
            className="px-8 py-4 rounded-full text-base font-medium text-foreground border border-border/50 hover:bg-secondary/50 transition-all"
          >
            {t('hero.ctaSecondary')}
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-muted-foreground hover:text-foreground transition-colors animate-bounce"
      >
        <ChevronDown size={32} />
      </a>
    </section>
  );
};

export default Hero;
