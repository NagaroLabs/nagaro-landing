import { LanguageProvider } from '@/contexts/LanguageContext';
import Header from '@/components/landing/Header';
import Hero from '@/components/landing/Hero';
import About from '@/components/landing/About';
import Services from '@/components/landing/Services';
import Technologies from '@/components/landing/Technologies';
import Benefits from '@/components/landing/Benefits';
import CTASection from '@/components/landing/CTASection';
import Footer from '@/components/landing/Footer';

const LandingContent = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Technologies />
        <Benefits />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

const Index = () => {
  return (
    <LanguageProvider>
      <LandingContent />
    </LanguageProvider>
  );
};

export default Index;
