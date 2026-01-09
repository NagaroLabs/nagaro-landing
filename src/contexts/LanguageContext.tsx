import React, { createContext, useContext, useState, useCallback } from 'react';

type Language = 'pt' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  pt: {
    // Header
    'nav.about': 'Sobre',
    'nav.services': 'Serviços',
    'nav.tech': 'Tecnologias',
    'nav.benefits': 'Diferenciais',
    'nav.testimonials': 'Depoimentos',
    'nav.contact': 'Contato',
    'header.cta': 'Falar com a Nagaro',

    // Hero
    'hero.tagline': 'Software House de Excelência',
    'hero.title': 'Transformamos ideias em',
    'hero.titleHighlight': 'software de alto padrão',
    'hero.subtitle': 'Desenvolvemos soluções sob medida com arquitetura escalável, código limpo e tecnologia de ponta para impulsionar o seu negócio.',
    'hero.cta': 'Solicitar Orçamento',
    'hero.ctaSecondary': 'Conheça nossos serviços',

    // About
    'about.tagline': 'Quem Somos',
    'about.title': 'Excelência técnica que transforma negócios',
    'about.description': 'A Nagaro é uma software house especializada em criar soluções tecnológicas sob medida para empresas que buscam inovação e resultados. Combinamos expertise técnica de alto nível com uma abordagem centrada no cliente para entregar produtos digitais que realmente fazem a diferença.',
    'about.mission': 'Nossa missão é desenvolver software que não apenas funciona, mas que escala, evolui e se torna um diferencial competitivo para nossos clientes.',
    'about.stat1.value': '50+',
    'about.stat1.label': 'Projetos Entregues',
    'about.stat2.value': '98%',
    'about.stat2.label': 'Satisfação',
    'about.stat3.value': '5+',
    'about.stat3.label': 'Anos de Experiência',

    // Services
    'services.tagline': 'Nossos Serviços',
    'services.title': 'Soluções completas para seu negócio digital',
    'services.subtitle': 'Oferecemos um portfólio completo de serviços de desenvolvimento, desde a concepção até a entrega e manutenção.',
    'services.1.title': 'Software Sob Medida',
    'services.1.description': 'Desenvolvemos sistemas personalizados que atendem exatamente às necessidades do seu negócio, com arquitetura robusta e escalável.',
    'services.2.title': 'Aplicativos Web e Mobile',
    'services.2.description': 'Criamos aplicações modernas e responsivas para web e mobile, com experiência do usuário impecável.',
    'services.3.title': 'Dashboards e Sistemas Internos',
    'services.3.description': 'Construímos painéis administrativos e sistemas de gestão que otimizam processos e aumentam a produtividade.',
    'services.4.title': 'Integrações e Automação',
    'services.4.description': 'Conectamos sistemas e automatizamos fluxos de trabalho para eliminar tarefas manuais e reduzir erros.',
    'services.5.title': 'Consultoria e Arquitetura',
    'services.5.description': 'Oferecemos consultoria especializada em arquitetura de software, code review e melhores práticas de desenvolvimento.',

    // Tech
    'tech.tagline': 'Tecnologias',
    'tech.title': 'Stack moderna e robusta',
    'tech.subtitle': 'Utilizamos as melhores tecnologias do mercado para entregar soluções performáticas e seguras.',

    // Benefits
    'benefits.tagline': 'Diferenciais',
    'benefits.title': 'Por que escolher a Nagaro?',
    'benefits.subtitle': 'Nossa abordagem combina excelência técnica com compromisso inabalável com a qualidade.',
    'benefits.1.title': 'Velocidade de Entrega',
    'benefits.1.description': 'Metodologias ágeis e processos otimizados para entregar valor rapidamente.',
    'benefits.2.title': 'Arquitetura Escalável',
    'benefits.2.description': 'Sistemas projetados para crescer junto com o seu negócio.',
    'benefits.3.title': 'Código Limpo',
    'benefits.3.description': 'Padrões elevados de qualidade e boas práticas de desenvolvimento.',
    'benefits.4.title': 'Manutenibilidade',
    'benefits.4.description': 'Código organizado e documentado para fácil manutenção e evolução.',
    'benefits.5.title': 'Segurança',
    'benefits.5.description': 'Implementamos as melhores práticas de segurança em todas as camadas.',
    'benefits.6.title': 'Suporte Contínuo',
    'benefits.6.description': 'Acompanhamento e suporte técnico após a entrega do projeto.',

    // Testimonials
    'testimonials.tagline': 'Depoimentos',
    'testimonials.title': 'O que nossos clientes dizem',
    'testimonials.1.text': 'A Nagaro entregou um sistema que superou todas as nossas expectativas. A qualidade do código e a atenção aos detalhes são impressionantes.',
    'testimonials.1.author': 'Carlos Mendes',
    'testimonials.1.role': 'CTO, TechVentures',
    'testimonials.2.text': 'Profissionalismo e expertise técnica de alto nível. Recomendo para qualquer empresa que busca um parceiro de tecnologia confiável.',
    'testimonials.2.author': 'Ana Silva',
    'testimonials.2.role': 'CEO, StartupX',
    'testimonials.3.text': 'O aplicativo que desenvolveram para nós transformou completamente a forma como operamos. ROI em menos de 6 meses.',
    'testimonials.3.author': 'Roberto Lima',
    'testimonials.3.role': 'Diretor de Operações, LogiCorp',

    // CTA
    'cta.title': 'Pronto para transformar sua ideia em realidade?',
    'cta.subtitle': 'Entre em contato e descubra como a Nagaro pode impulsionar o seu negócio com tecnologia de ponta.',
    'cta.button': 'Falar com a Nagaro',

    // Footer
    'footer.description': 'Software house especializada em soluções tecnológicas sob medida.',
    'footer.services': 'Serviços',
    'footer.company': 'Empresa',
    'footer.contact': 'Contato',
    'footer.rights': '© 2026 Nagaro. Todos os direitos reservados.',
  },
  en: {
    // Header
    'nav.about': 'About',
    'nav.services': 'Services',
    'nav.tech': 'Technologies',
    'nav.benefits': 'Benefits',
    'nav.testimonials': 'Testimonials',
    'nav.contact': 'Contact',
    'header.cta': 'Talk to Nagaro',

    // Hero
    'hero.tagline': 'Excellence in Software Development',
    'hero.title': 'We transform ideas into',
    'hero.titleHighlight': 'high-quality software',
    'hero.subtitle': 'We develop custom solutions with scalable architecture, clean code, and cutting-edge technology to drive your business forward.',
    'hero.cta': 'Request a Quote',
    'hero.ctaSecondary': 'Explore our services',

    // About
    'about.tagline': 'Who We Are',
    'about.title': 'Technical excellence that transforms businesses',
    'about.description': 'Nagaro is a software house specialized in creating tailored technological solutions for companies seeking innovation and results. We combine high-level technical expertise with a client-centered approach to deliver digital products that truly make a difference.',
    'about.mission': 'Our mission is to develop software that not only works but scales, evolves, and becomes a competitive advantage for our clients.',
    'about.stat1.value': '50+',
    'about.stat1.label': 'Projects Delivered',
    'about.stat2.value': '98%',
    'about.stat2.label': 'Satisfaction',
    'about.stat3.value': '5+',
    'about.stat3.label': 'Years of Experience',

    // Services
    'services.tagline': 'Our Services',
    'services.title': 'Complete solutions for your digital business',
    'services.subtitle': 'We offer a complete portfolio of development services, from conception to delivery and maintenance.',
    'services.1.title': 'Custom Software',
    'services.1.description': 'We develop personalized systems that exactly meet your business needs, with robust and scalable architecture.',
    'services.2.title': 'Web and Mobile Apps',
    'services.2.description': 'We create modern and responsive applications for web and mobile, with impeccable user experience.',
    'services.3.title': 'Dashboards & Internal Systems',
    'services.3.description': 'We build administrative panels and management systems that optimize processes and increase productivity.',
    'services.4.title': 'Integrations & Automation',
    'services.4.description': 'We connect systems and automate workflows to eliminate manual tasks and reduce errors.',
    'services.5.title': 'Consulting & Architecture',
    'services.5.description': 'We offer specialized consulting in software architecture, code review, and development best practices.',

    // Tech
    'tech.tagline': 'Technologies',
    'tech.title': 'Modern and robust stack',
    'tech.subtitle': 'We use the best technologies on the market to deliver performant and secure solutions.',

    // Benefits
    'benefits.tagline': 'Benefits',
    'benefits.title': 'Why choose Nagaro?',
    'benefits.subtitle': 'Our approach combines technical excellence with an unwavering commitment to quality.',
    'benefits.1.title': 'Fast Delivery',
    'benefits.1.description': 'Agile methodologies and optimized processes to deliver value quickly.',
    'benefits.2.title': 'Scalable Architecture',
    'benefits.2.description': 'Systems designed to grow alongside your business.',
    'benefits.3.title': 'Clean Code',
    'benefits.3.description': 'High quality standards and development best practices.',
    'benefits.4.title': 'Maintainability',
    'benefits.4.description': 'Organized and documented code for easy maintenance and evolution.',
    'benefits.5.title': 'Security',
    'benefits.5.description': 'We implement security best practices across all layers.',
    'benefits.6.title': 'Ongoing Support',
    'benefits.6.description': 'Follow-up and technical support after project delivery.',

    // Testimonials
    'testimonials.tagline': 'Testimonials',
    'testimonials.title': 'What our clients say',
    'testimonials.1.text': 'Nagaro delivered a system that exceeded all our expectations. The code quality and attention to detail are impressive.',
    'testimonials.1.author': 'Carlos Mendes',
    'testimonials.1.role': 'CTO, TechVentures',
    'testimonials.2.text': 'High-level professionalism and technical expertise. I recommend them for any company looking for a reliable technology partner.',
    'testimonials.2.author': 'Ana Silva',
    'testimonials.2.role': 'CEO, StartupX',
    'testimonials.3.text': 'The app they developed for us completely transformed how we operate. ROI in less than 6 months.',
    'testimonials.3.author': 'Roberto Lima',
    'testimonials.3.role': 'Operations Director, LogiCorp',

    // CTA
    'cta.title': 'Ready to turn your idea into reality?',
    'cta.subtitle': 'Get in touch and discover how Nagaro can boost your business with cutting-edge technology.',
    'cta.button': 'Talk to Nagaro',

    // Footer
    'footer.description': 'Software house specialized in tailored technological solutions.',
    'footer.services': 'Services',
    'footer.company': 'Company',
    'footer.contact': 'Contact',
    'footer.rights': '© 2026 Nagaro. All rights reserved.',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('pt');

  const t = useCallback((key: string): string => {
    return translations[language][key as keyof typeof translations['pt']] || key;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
