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
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className={`transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full gradient-metallic mb-8 glow-subtle">
            <MessageCircle size={36} className="text-background" />
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
              className="group inline-flex items-center gap-3 gradient-metallic text-background px-10 py-5 rounded-full text-lg font-semibold hover:opacity-90 transition-all shadow-lg hover:shadow-xl"
            >
              {t('cta.button')}
              <ArrowRight size={22} className="transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute left-1/4 top-1/4 w-64 h-64 rounded-full bg-gradient-to-br from-muted/20 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute right-1/4 bottom-1/4 w-64 h-64 rounded-full bg-gradient-to-tl from-muted/20 to-transparent blur-3xl pointer-events-none" />
      </div>
    </section>
  );
};

export default CTASection;
