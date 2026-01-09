import { Quote } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useInView } from '@/hooks/useInView';

const Testimonials = () => {
  const { t } = useLanguage();
  const { ref, isInView } = useInView({ threshold: 0.2 });

  const testimonials = [
    {
      text: t('testimonials.1.text'),
      author: t('testimonials.1.author'),
      role: t('testimonials.1.role'),
    },
    {
      text: t('testimonials.2.text'),
      author: t('testimonials.2.author'),
      role: t('testimonials.2.role'),
    },
    {
      text: t('testimonials.3.text'),
      author: t('testimonials.3.author'),
      role: t('testimonials.3.role'),
    },
  ];

  return (
    <section
      id="testimonials"
      ref={ref}
      className="relative py-24 sm:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-graphite/30 to-background" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center max-w-3xl mx-auto transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="inline-block px-4 py-2 rounded-full border border-border/50 bg-secondary/30 text-xs font-medium text-muted-foreground tracking-wider uppercase">
            {t('testimonials.tagline')}
          </span>

          <h2 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            {t('testimonials.title')}
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`relative p-8 rounded-2xl bg-secondary/20 backdrop-blur-sm border border-border/30 transition-all duration-700 hover:border-border/50 ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Quote Icon */}
              <Quote size={32} className="text-muted-foreground/30 mb-4" />

              {/* Text */}
              <p className="text-foreground/90 leading-relaxed mb-6">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full gradient-metallic flex items-center justify-center text-background font-bold">
                  {testimonial.author.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-foreground">
                    {testimonial.author}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </div>
                </div>
              </div>

              {/* Gradient Border */}
              <div className="absolute inset-0 rounded-2xl gradient-border opacity-30" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
