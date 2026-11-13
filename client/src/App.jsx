import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ContactPage from './components/ContactPage';
import AboutPage from './components/AboutPage';
import PujaServices from './components/PujaServices';
import TeamSection from './components/TeamSection';
import Testimonials from './components/Testimonials';
import CoverageSection from './components/CoverageSection';
import StatsCounter from './components/StatsCounter';
import FAQAccordion from './components/FAQAccordion';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import FloatingWidgets from './components/FloatingWidgets';
import AdminModal from './components/AdminModal';
import SmartReviewFunnel from './components/SmartReviewFunnel';

export default function App() {
  const [lang, setLang] = useState(() => {
    try {
      localStorage.removeItem('site_lang');
      return sessionStorage.getItem('site_lang') || 'en';
    } catch {
      return 'en';
    }
  }); // Default to English on new link open; retains chosen language on page refresh
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [bookingCount, setBookingCount] = useState(0);

  const isReviewUrl = () => {
    const p = window.location.pathname.toLowerCase();
    const h = window.location.hash.toLowerCase();
    return p.startsWith('/review') || h === '#review';
  };
  const [showReviewPage, setShowReviewPage] = useState(isReviewUrl);

  const isContactUrl = () => {
    const p = window.location.pathname.toLowerCase();
    const h = window.location.hash.toLowerCase();
    return p.startsWith('/contact') || h === '#contact';
  };
  const [showContactPage, setShowContactPage] = useState(false);

  const isAboutUrl = () => {
    const p = window.location.pathname.toLowerCase();
    const h = window.location.hash.toLowerCase();
    return p.startsWith('/about') || h === '#about';
  };
  const [showAboutPage, setShowAboutPage] = useState(false);

  // Fetch initial bookings count from Node.js Express backend
  const fetchBookingsCount = async () => {
    try {
      const res = await fetch('/api/bookings');
      if (res.ok) {
        const data = await res.json();
        setBookingCount(data.length);
      }
    } catch (err) {
      console.log('API offline or initial load');
    }
  };

  useEffect(() => {
    fetchBookingsCount();

    // Prevent auto-scroll on refresh so top shloka & navbar always start at (0, 0)
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    // Always start on Main Page: clear any stale hashes like #contact, #about, #hero from browser history/autocomplete
    if (window.location.hash === '#contact' || window.location.hash === '#about' || window.location.hash === '#hero') {
      window.history.replaceState(null, '', window.location.pathname);
    }
    window.scrollTo(0, 0);

    const handleRouteCheck = () => {
      const isRev = isReviewUrl();
      const h = window.location.hash.toLowerCase();
      const p = window.location.pathname.toLowerCase();
      const isCon = p.startsWith('/contact') || h === '#contact';
      const isAbt = p.startsWith('/about') || h === '#about';

      setShowReviewPage(isRev);
      setShowContactPage(isCon);
      setShowAboutPage(isAbt);

      // Dynamic SEO Title Updates
      if (isAbt) {
        document.title = "About Us | Banarasi & North Indian Hindi Pandit in Hyderabad";
      } else if (isCon) {
        document.title = "Contact Us | North Indian Hindi Pandit Helpline Hyderabad";
      } else if (isRev) {
        document.title = "Devotee Experiences & Reviews | North Hindi Pandit Hyderabad";
      } else {
        document.title = "Banarasi & North Indian Hindi Pandit in Hyderabad | Grihapravesh, Satyanarayan, Vastu & Deepawali Puja";
      }

      if (window.location.hash === '#admin' || window.location.search.includes('admin=true')) {
        setAdminModalOpen(true);
      }
    };
    handleRouteCheck();
    window.addEventListener('hashchange', handleRouteCheck);
    window.addEventListener('popstate', handleRouteCheck);
    return () => {
      window.removeEventListener('hashchange', handleRouteCheck);
      window.removeEventListener('popstate', handleRouteCheck);
    };
  }, []);

  const handleLanguageChange = (newLang) => {
    try {
      sessionStorage.setItem('site_lang', newLang);
      localStorage.removeItem('site_lang');
    } catch {}
    setLang(newLang);
  };

  const scrollToHero = () => {
    const el = document.getElementById('hero');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const [selectedPuja, setSelectedPuja] = useState(null);

  const handleBookingSuccess = (newBooking) => {
    setBookingCount((prev) => prev + 1);
  };

  const handleSelectPuja = (puja) => {
    const rawName = typeof puja === 'string' ? puja : (puja?.name || puja?.title || '');
    setSelectedPuja({ name: rawName, timestamp: Date.now() });
    scrollToHero();
  };

  const handleSelectPandit = (panditName) => {
    scrollToHero();
    const nameInput = document.querySelector('input[type="text"]');
    if (nameInput) {
      nameInput.focus();
    }
  };

  const handleOpenContact = () => {
    window.history.pushState(null, '', '#contact');
    setShowContactPage(true);
    setShowReviewPage(false);
          setShowAboutPage(false);
    setShowAboutPage(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoHomeFromContact = () => {
    window.history.pushState(null, '', '/');
    setShowContactPage(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookNowFromContact = () => {
    window.history.pushState(null, '', '/');
    setShowContactPage(false);
    setTimeout(() => {
      scrollToHero();
    }, 150);
  };

  const handleOpenAbout = () => {
    window.history.pushState(null, '', '#about');
    setShowAboutPage(true);
    setShowContactPage(false);
    setShowReviewPage(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoHomeFromAbout = () => {
    window.history.pushState(null, '', '/');
    setShowAboutPage(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookNowFromAbout = () => {
    window.history.pushState(null, '', '/');
    setShowAboutPage(false);
    setTimeout(() => {
      scrollToHero();
    }, 150);
  };

  if (showReviewPage) {
    return (
      <SmartReviewFunnel
        onGoHome={() => {
          window.history.pushState(null, '', '/');
          setShowReviewPage(false);
          window.scrollTo(0, 0);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2]">
      {/* 1. Header with Sacred Mantra Ticker, Crest Logo, Om, Language Switcher, and Call button */}
      <Navbar
        onOpenBooking={() => {
          if (showContactPage) {
            handleGoHomeFromContact();
            setTimeout(scrollToHero, 150);
          } else if (showAboutPage) {
            handleGoHomeFromAbout();
            setTimeout(scrollToHero, 150);
          } else {
            scrollToHero();
          }
        }}
        onOpenContact={handleOpenContact}
        onOpenAbout={handleOpenAbout}
        onGoHome={() => {
          if (showContactPage) handleGoHomeFromContact();
          if (showAboutPage) handleGoHomeFromAbout();
        }}
        onOpenAdmin={() => setAdminModalOpen(true)}
        bookingCount={bookingCount}
        currentLang={lang}
        onSelectLang={handleLanguageChange}
      />

      <main className="flex-1 w-full" style={{ width: '100%' }}>
        {showContactPage ? (
          <ContactPage
            onGoHome={handleGoHomeFromContact}
            onBookNow={handleBookNowFromContact}
            currentLang={lang}
          />
        ) : showAboutPage ? (
          <AboutPage
            onGoHome={handleGoHomeFromAbout}
            onBookNow={handleBookNowFromAbout}
            currentLang={lang}
          />
        ) : (
          <>
            {/* 2. Hero Section with Rotating Mandala, Floating Particles, Trust Bar & Glass Lead Form */}
            <Hero
              onBookingSuccess={handleBookingSuccess}
              currentLang={lang}
              selectedPuja={selectedPuja}
            />

            {/* 3. Popular Puja Services Showcase */}
            <PujaServices onSelectPuja={handleSelectPuja} currentLang={lang} />

            {/* 4. Our Senior Verified Acharyas & Pandits (Team Section) */}
            <TeamSection onSelectPandit={handleSelectPandit} currentLang={lang} />

            {/* 5. 15,000+ Families Blessed (Marquee Track) */}
            <Testimonials currentLang={lang} />

            {/* 6. Coverage Localities & Interactive Map */}
            <CoverageSection currentLang={lang} />

            {/* 7. Key Performance Stats Counter */}
            <StatsCounter currentLang={lang} />

            {/* 8. Frequently Asked Questions Accordion */}
            <FAQAccordion currentLang={lang} />

            {/* 9. Final Call-to-Action Banner */}
            <FinalCTA currentLang={lang} />
          </>
        )}
      </main>

      {/* 10. Master Footer */}
      <Footer onOpenBooking={scrollToHero} currentLang={lang} />

      {/* 11. Floating Call/WhatsApp Mobile Sticky Bar & Desktop Widget */}
      <FloatingWidgets currentLang={lang} />

      {/* 12. Admin Database Modal (Connects to Node.js Backend API) */}
      <AdminModal
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
      />
    </div>
  );
}
