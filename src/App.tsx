import { LazyMotion, MotionConfig, domAnimation } from 'framer-motion';
import { useState } from 'react';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { Navbar } from './components/Navbar';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { Projects } from './components/Projects';
import { Services } from './components/Services';
import { WhatsAppButton } from './components/WhatsAppButton';
import { useLanguage } from './i18n/useLanguage';

export default function App() {
  const { t } = useLanguage();
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const openPrivacy = () => setPrivacyOpen(true);

  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation} strict>
        <a
          href="#contenido"
          className="fixed top-3 left-3 z-60 -translate-y-20 rounded-lg bg-primary-strong px-4 py-2 font-semibold text-white focus:translate-y-0"
        >
          {t.common.skipToContent}
        </a>
        <Navbar />
        <main id="contenido" tabIndex={-1} className="overflow-x-clip outline-none">
          <Hero />
          <Services />
          <Projects />
          <About />
          <Contact onOpenPrivacy={openPrivacy} />
        </main>
        <Footer onOpenPrivacy={openPrivacy} />
        <WhatsAppButton />
        <PrivacyPolicy open={privacyOpen} onClose={() => setPrivacyOpen(false)} />
      </LazyMotion>
    </MotionConfig>
  );
}
