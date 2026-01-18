import { useLanguage } from "@/contexts/LanguageContext";
import { useInView } from "@/hooks/useInView";

const About = () => {
  const { t } = useLanguage();
  const { ref, isInView } = useInView({ threshold: 0.2 });

  const stats = [
    { value: t("about.stat1.value"), label: t("about.stat1.label") },
    { value: t("about.stat2.value"), label: t("about.stat2.label") },
    { value: t("about.stat3.value"), label: t("about.stat3.label") },
  ];

  return (
    <section id="about" ref={ref} className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-graphite/50 to-background" />

      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, white 1px, transparent 1px),
                           radial-gradient(circle at 75% 75%, white 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div
            className={`transition-all duration-700 ${isInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
          >
            <span className="inline-block px-4 py-2 rounded-full border border-border/50 bg-secondary/30 backdrop-blur-sm text-xs font-medium text-muted-foreground tracking-wider uppercase holographic">
              {t("about.tagline")}
            </span>

            <h2 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">{t("about.title")}</h2>

            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">{t("about.description")}</p>

            <blockquote className="mt-8 pl-6 border-l-2 border-gradient-to-b from-white/50 to-white/10 relative">
              {/* Animated Quote Line */}
              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-white/60 via-white/30 to-transparent">
                <div className="absolute top-0 w-full h-8 bg-white/80 blur-sm animate-pulse" />
              </div>
              <p className="text-foreground/90 italic">"{t("about.mission")}"</p>
            </blockquote>
          </div>

          {/* Stats */}
          <div
            className={`grid grid-cols-3 gap-4 transition-all duration-700 delay-200 ${
              isInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            {stats.map((stat, index) => (
              <div
                key={index}
                className="group relative p-6 rounded-2xl futuristic-card border border-border/30 hover:border-white/20 text-center transition-all duration-500 hover:-translate-y-1"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-2xl bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl pointer-events-none" />

                {/* Stat Value */}
                <div className="relative z-10 text-3xl sm:text-4xl font-bold gradient-metallic-text text-glow">
                  <span className="inline-block  transition-transform duration-500">
                    {stat.value}
                  </span>
                </div>

                {/* Stat Label */}
                <div className="relative z-10 mt-2 text-sm text-muted-foreground group-hover:text-gray-300 transition-colors">
                  {stat.label}
                </div>

                {/* Corner Decorations */}
                <div className="absolute top-2 left-2 w-3 h-3 border-l border-t border-white/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                <div className="absolute bottom-2 right-2 w-3 h-3 border-r border-b border-white/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>
            ))}
          </div>
        </div>

        {/* Decorative Element */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-96 opacity-10 pointer-events-none">
          <svg viewBox="0 0 400 400" className="w-full h-full">
            <defs>
              <linearGradient id="aboutGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(0 0% 80%)" />
                <stop offset="100%" stopColor="hsl(0 0% 40%)" />
              </linearGradient>
            </defs>
            <circle
              cx="200"
              cy="200"
              r="150"
              fill="none"
              stroke="url(#aboutGradient)"
              strokeWidth="0.5"
              className="animate-spin-slow"
              style={{ transformOrigin: "center" }}
            />
            <circle
              cx="200"
              cy="200"
              r="100"
              fill="none"
              stroke="url(#aboutGradient)"
              strokeWidth="0.5"
              className="animate-reverse-spin"
              style={{ transformOrigin: "center" }}
            />
            <circle
              cx="200"
              cy="200"
              r="50"
              fill="none"
              stroke="url(#aboutGradient)"
              strokeWidth="0.5"
              className="animate-spin-slower"
              style={{ transformOrigin: "center" }}
            />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default About;
