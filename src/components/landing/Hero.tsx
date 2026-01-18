import { Suspense, useState, useEffect } from 'react';
import { ArrowRight, ChevronDown, Sparkles } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import Logo3D from './Logo3D';
import AuroraBackground from './AuroraBackground';
import HyperSpace from './HyperSpace';
import NeuralNetwork from './NeuralNetwork';
import LightBeams from './LightBeams';
import EnergyWaves from './EnergyWaves';
import CircuitBoard from './CircuitBoard';
import GlitchTitle from './GlitchTitle';
import nagaroLogo from '@/assets/nagaro-logo.svg';

const WHATSAPP_NUMBER = '5575992539838';
const WHATSAPP_MESSAGE_PT = 'Olá! Gostaria de solicitar um orçamento para um projeto.';
const WHATSAPP_MESSAGE_EN = 'Hello! I would like to request a quote for a project.';

const LogoFallback = () => (
  <div className="h-64 sm:h-72 md:h-80 flex items-center justify-center">
    <img
      src={nagaroLogo}
      alt="Nagaro"
      className="h-32 sm:h-40 md:h-48 w-auto mx-auto glow-subtle rounded-2xl animate-pulse"
    />
  </div>
);

const Hero = () => {
  const { language, t } = useLanguage();
  const [isLoaded, setIsLoaded] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    // Dramatic entrance timing
    setTimeout(() => setIsLoaded(true), 500);
    setTimeout(() => setShowContent(true), 1200);
    setTimeout(() => setShowButtons(true), 2500);
  }, []);

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    language === 'pt' ? WHATSAPP_MESSAGE_PT : WHATSAPP_MESSAGE_EN
  )}`;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* ========== BACKGROUND LAYERS ========== */}
      
      {/* Layer 1: Hyperspace stars */}
      <div className="absolute inset-0 z-0">
        <HyperSpace />
      </div>

      {/* Layer 2: Neural Network */}
      <div className="absolute inset-0 z-[1]">
        <NeuralNetwork />
      </div>

      {/* Layer 3: Aurora effect */}
      <div className="absolute inset-0 z-[2]">
        <AuroraBackground />
      </div>

      {/* Layer 4: Light beams */}
      <div className="absolute inset-0 z-[3]">
        <LightBeams />
      </div>

      {/* Layer 5: Energy waves */}
      <div className="absolute inset-0 z-[4]">
        <EnergyWaves />
      </div>

      {/* Layer 6: Circuit board */}
      <div className="absolute inset-0 z-[5]">
        <CircuitBoard />
      </div>

      {/* Vignette overlay */}
      <div 
        className="absolute inset-0 z-[6] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 70%, rgba(0,0,0,0.8) 100%)'
        }}
      />

      {/* Top fade */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-black to-transparent z-[7]" />
      
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent z-[7]" />

      {/* ========== CONTENT ========== */}
      <div className="relative z-[10] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20 pb-24">
        
        {/* 3D Logo with dramatic entrance */}
        <div 
          className={`mb-8 transition-all duration-1500 ease-out ${
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
          }`}
        >
          <Suspense fallback={<LogoFallback />}>
            <Logo3D />
          </Suspense>
        </div>

        {/* Tagline badge */}
        <div 
          className={`transition-all duration-1000 ${
            showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 bg-white/5 backdrop-blur-xl text-xs font-medium text-white/80 tracking-[0.2em] uppercase">
            <Sparkles size={14} className="animate-pulse" />
            {t('hero.tagline')}
            <Sparkles size={14} className="animate-pulse" />
          </span>
        </div>

        {/* Main Title with Glitch Effect */}
        <div 
          className={`mt-10 transition-all duration-1000 delay-300 ${
            showContent ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight">
            <GlitchTitle 
              text={t('hero.title')} 
              highlightText={t('hero.titleHighlight')}
              className=""
            />
          </h1>
        </div>

        {/* Subtitle with typing effect */}
        <p 
          className={`mt-8 text-lg sm:text-xl md:text-2xl text-white/60 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-500 ${
            showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {t('hero.subtitle')}
        </p>

        {/* CTA Buttons with spectacular entrance */}
        <div 
          className={`mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 transition-all duration-1000 ${
            showButtons ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}
        >
          {/* Primary CTA */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative px-10 py-5 rounded-full text-lg font-bold overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-[0_0_60px_rgba(255,255,255,0.3)]"
          >
            {/* Button background layers */}
            <div className="absolute inset-0 gradient-metallic" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-white/10" />
            
            {/* Animated border */}
            <div className="absolute inset-0 rounded-full overflow-hidden">
              <div className="absolute inset-[-2px] bg-gradient-to-r from-white via-gray-400 to-white animate-spin-slow opacity-50" style={{ animationDuration: '3s' }} />
            </div>
            <div className="absolute inset-[2px] rounded-full bg-gradient-to-br from-gray-100 via-gray-300 to-gray-200" />
            
            {/* Button content */}
            <span className="relative z-10 flex items-center gap-3 text-gray-900">
              {t('hero.cta')}
              <ArrowRight size={20} className="transition-transform group-hover:translate-x-2" />
            </span>
          </a>

          {/* Secondary CTA */}
          <a
            href="#services"
            className="group relative px-10 py-5 rounded-full text-lg font-medium text-white border-2 border-white/30 hover:border-white/60 transition-all duration-500 hover:bg-white/10 backdrop-blur-sm overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              {t('hero.ctaSecondary')}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </a>
        </div>

      </div>

      {/* Spacer */}
      <div className="h-24 sm:h-32" />

      {/* Scroll Indicator */}
      <a
        href="#about"
        className={`absolute bottom-1 left-1/2 -translate-x-1/2 z-[20] text-white/50 hover:text-white transition-all duration-500 ${
          showButtons ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="flex flex-col items-center gap-3">
          <span className="text-[10px] uppercase tracking-[0.3em] font-light">Scroll</span>
          <div className="relative">
            <ChevronDown size={28} className="animate-bounce" />
            <div className="absolute inset-0 blur-md bg-white/30 animate-bounce" />
          </div>
        </div>
      </a>
    </section>
  );
};

export default Hero;
