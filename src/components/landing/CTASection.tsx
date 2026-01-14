import { ArrowRight, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useInView } from '@/hooks/useInView';

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
      className="relative py-24 sm:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background to-graphite/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(0_0%_20%_/_0.3),_transparent_70%)]" />
        
        {/* Animated Rays */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 w-[200%] h-px bg-gradient-to-r from-transparent via-white to-transparent"
              style={{
                transform: `translate(-50%, -50%) rotate(${i * 22.5}deg)`,
                animation: `pulse-slow ${3 + i * 0.5}s ease-in-out infinite`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className={`transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full gradient-metallic mb-8 glow-pulse relative">
            <MessageCircle size={40} className="text-background relative z-10" />
            
            {/* Animated Rings */}
            <div className="absolute inset-0 rounded-full border-2 border-white/20 animate-ping" style={{ animationDuration: '2s' }} />
            <div className="absolute -inset-2 rounded-full border border-white/10 animate-ping" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }} />
          </div>

          {/* Title */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            {t('cta.title')}
          </h2>

          {/* Subtitle */}
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('cta.subtitle')}
          </p>

          {/* CTA Button */}
          <div className="mt-10">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-3 gradient-metallic text-background px-12 py-6 rounded-full text-lg font-semibold transition-all shadow-lg hover:shadow-[0_0_50px_rgba(255,255,255,0.3)] overflow-hidden"
            >
              {/* Button Content */}
              <span className="relative z-10">{t('cta.button')}</span>
              <ArrowRight size={24} className="relative z-10 transition-transform group-hover:translate-x-2" />
              
              {/* Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              
              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-full bg-white/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </a>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute left-1/4 top-1/4 w-64 h-64 rounded-full bg-gradient-to-br from-muted/20 to-transparent blur-3xl pointer-events-none animate-float-orb" />
        <div className="absolute right-1/4 bottom-1/4 w-64 h-64 rounded-full bg-gradient-to-tl from-muted/20 to-transparent blur-3xl pointer-events-none animate-float-orb" style={{ animationDelay: '-7s' }} />
      </div>
    </section>
  );
};

export default CTASection;
