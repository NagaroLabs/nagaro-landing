import { ArrowRight, MessageCircle, Rocket } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useInView } from '@/hooks/useInView';
import AuroraBackground from './AuroraBackground';
import LightBeams from './LightBeams';

const WHATSAPP_NUMBER = '5575992539838';
const WHATSAPP_MESSAGE_PT = 'Olá! Gostaria de saber mais sobre os serviços da Nagaro.';
const WHATSAPP_MESSAGE_EN = 'Hello! I would like to know more about Nagaro services.';

const CTASection = () => {
  const { language, t } = useLanguage();
  const { ref, isInView } = useInView({ threshold: 0.3 });

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    language === 'pt' ? WHATSAPP_MESSAGE_PT : WHATSAPP_MESSAGE_EN
  )}`;

  return (
    <section
      ref={ref}
      className="relative py-32 sm:py-40 overflow-hidden"
    >
      {/* ========== LAYERED BACKGROUNDS ========== */}
      
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black" />

      {/* Aurora effect */}
      <div className="absolute inset-0 z-[1] opacity-60">
        <AuroraBackground />
      </div>

      {/* Light beams */}
      <div className="absolute inset-0 z-[2] opacity-40">
        <LightBeams />
      </div>

      {/* Radial glow */}
      <div className="absolute inset-0 z-[3] bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,rgba(255,255,255,0.05),transparent)]" />

      {/* Animated rays */}
      <div className="absolute inset-0 z-[4] overflow-hidden opacity-20">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 w-[200%] h-[2px] bg-gradient-to-r from-transparent via-white/30 to-transparent"
            style={{
              transform: `translate(-50%, -50%) rotate(${i * 30}deg)`,
              animation: `pulse-slow ${4 + i * 0.3}s ease-in-out infinite`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>

      {/* Central glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/[0.03] rounded-full blur-[100px] z-[5]" />

      {/* ========== CONTENT ========== */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className={`transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          {/* Animated Icon */}
          <div className="relative inline-flex items-center justify-center mb-10">
            {/* Outer rings */}
            <div className="absolute w-32 h-32 rounded-full border border-white/10 animate-ping" style={{ animationDuration: '3s' }} />
            <div className="absolute w-40 h-40 rounded-full border border-white/5 animate-ping" style={{ animationDuration: '4s', animationDelay: '1s' }} />
            
            {/* Main icon container */}
            <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-white/20 to-white/5 border border-white/20 flex items-center justify-center backdrop-blur-sm">
              <Rocket size={36} className="text-white animate-pulse" />
              
              {/* Glow */}
              <div className="absolute inset-0 rounded-full bg-white/10 blur-xl" />
            </div>

            {/* Orbiting particles */}
            <div className="absolute w-36 h-36 animate-spin-slow" style={{ animationDuration: '8s' }}>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rounded-full" />
            </div>
            <div className="absolute w-44 h-44 animate-reverse-spin" style={{ animationDuration: '12s' }}>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white/70 rounded-full" />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              {t('cta.title')}
            </span>
          </h2>

          {/* Subtitle */}
          <p className="mt-8 text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {t('cta.subtitle')}
          </p>

          {/* CTA Button */}
          <div className="mt-12">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-4 px-12 py-6 rounded-full text-lg font-semibold overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-[0_0_80px_rgba(255,255,255,0.3)]"
            >
              {/* Button background layers */}
              <div className="absolute inset-0 bg-gradient-to-r from-white via-gray-200 to-gray-300 rounded-full" />
              
              {/* Animated gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-gray-100 via-white to-gray-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Shine sweep */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              
              {/* Inner border glow */}
              <div className="absolute inset-[2px] rounded-full bg-gradient-to-br from-white to-gray-200" />
              
              {/* Content */}
              <span className="relative z-10 flex items-center gap-3 text-gray-900">
                <MessageCircle size={22} />
                {t('cta.button')}
                <ArrowRight size={22} className="transition-transform group-hover:translate-x-2" />
              </span>
            </a>
          </div>

          {/* Trust indicators */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>Resposta em até 24h</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              <span>Orçamento sem compromisso</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
              <span>Consultoria gratuita</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute left-10 top-1/3 w-64 h-64 rounded-full bg-gradient-to-br from-blue-500/5 to-transparent blur-3xl pointer-events-none animate-float-orb" />
      <div className="absolute right-10 bottom-1/3 w-64 h-64 rounded-full bg-gradient-to-tl from-purple-500/5 to-transparent blur-3xl pointer-events-none animate-float-orb" style={{ animationDelay: '-5s' }} />
    </section>
  );
};

export default CTASection;
