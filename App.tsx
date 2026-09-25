import { useState, useEffect, useCallback, useRef } from 'react';
import Lenis from 'lenis';

import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SectionTransition from './components/SectionTransition';
import About from './components/About';
import VideoSection from './components/VideoSection';
import StoriesSection from './components/StoriesSection';
import CreativesSection from './components/CreativesSection';
import ThumbnailsSection from './components/ThumbnailsSection';
import DigitalWorkSection from './components/DigitalWorkSection';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';

import { ArchiveProvider } from './context/ArchiveContext';
import WorkArchiveOverlay from './components/WorkArchiveOverlay';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  const handleLoadingComplete = useCallback(() => {
    setIsLoaded(true);
  }, []);

  // Initialize Lenis smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    (window as any).lenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      (window as any).lenis = undefined;
      lenis.destroy();
    };
  }, []);

  return (
    <ArchiveProvider>
      <LoadingScreen onComplete={handleLoadingComplete} />
      <Navbar isLoaded={isLoaded} navRef={navRef} />

      <main className="relative w-full overflow-x-clip">
        <Hero isLoaded={isLoaded} navRef={navRef} />
        <About />
        <SectionTransition variant="about-to-videos" />

        <VideoSection />
        <SectionTransition variant="videos-to-stories" />

        <StoriesSection />
        <SectionTransition variant="stories-to-creatives" />

        <CreativesSection />
        <SectionTransition variant="creatives-to-thumbnails" />

        <ThumbnailsSection />
        <SectionTransition variant="thumbnails-to-digital" />

        <DigitalWorkSection />
        <SectionTransition variant="digital-to-experience" />

        <Experience />
        <SectionTransition variant="experience-to-contact" />

        <Contact />
        <SectionTransition variant="contact-to-footer" />
      </main>

      <Footer />
      <WorkArchiveOverlay />
    </ArchiveProvider>
  );
}

export default App;
