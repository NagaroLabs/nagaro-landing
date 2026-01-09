import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import nagaroLogo from '@/assets/nagaro-logo.jpg';

const WHATSAPP_NUMBER = '5511999999999'; // Replace with actual number
const WHATSAPP_MESSAGE_PT = 'Olá! Gostaria de saber mais sobre os serviços da Nagaro.';
const WHATSAPP_MESSAGE_EN = 'Hello! I would like to know more about Nagaro services.';

const Header = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#about', label: t('nav.about') },
    { href: '#services', label: t('nav.services') },
    { href: '#tech', label: t('nav.tech') },
    { href: '#benefits', label: t('nav.benefits') },
  ];

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    language === 'pt' ? WHATSAPP_MESSAGE_PT : WHATSAPP_MESSAGE_EN
  )}`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/80 backdrop-blur-xl border-b border-border/50'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#" className="flex items-center">
            <img
              src={nagaroLogo}
              alt="Nagaro"
              className="h-10 w-auto"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Side */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Language Switcher */}
            <div className="flex items-center gap-1 bg-secondary/50 rounded-full p-1">
              <button
                onClick={() => setLanguage('pt')}
                className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
                  language === 'pt'
                    ? 'bg-foreground text-background'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                PT
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
                  language === 'en'
                    ? 'bg-foreground text-background'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                EN
              </button>
            </div>

            {/* CTA Button */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="gradient-metallic text-background px-5 py-2.5 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              {t('header.cta')}
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-foreground"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-background/95 backdrop-blur-xl border-t border-border/50 animate-fade-in">
            <nav className="flex flex-col py-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="px-4 py-4 flex items-center gap-4">
                <div className="flex items-center gap-1 bg-secondary/50 rounded-full p-1">
                  <button
                    onClick={() => setLanguage('pt')}
                    className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all ${
                      language === 'pt'
                        ? 'bg-foreground text-background'
                        : 'text-muted-foreground'
                    }`}
                  >
                    PT
                  </button>
                  <button
                    onClick={() => setLanguage('en')}
                    className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all ${
                      language === 'en'
                        ? 'bg-foreground text-background'
                        : 'text-muted-foreground'
                    }`}
                  >
                    EN
                  </button>
                </div>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gradient-metallic text-background px-5 py-2.5 rounded-full text-sm font-semibold"
                >
                  {t('header.cta')}
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
