import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhyChooseUs from './components/WhyChooseUs';
import PujaServices from './components/PujaServices';
import TeamSection from './components/TeamSection';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import CoverageSection from './components/CoverageSection';
import StatsCounter from './components/StatsCounter';
import FAQAccordion from './components/FAQAccordion';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import FloatingWidgets from './components/FloatingWidgets';
import AdminModal from './components/AdminModal';

export default function App() {
  const [lang, setLang] = useState('en'); // Default to English as requested
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [bookingCount, setBookingCount] = useState(0);

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

    const handleHashCheck = () => {
      if (window.location.hash === '#admin' || window.location.search.includes('admin=true')) {
        setAdminModalOpen(true);
      }
    };
    handleHashCheck();
    window.addEventListener('hashchange', handleHashCheck);
    return () => window.removeEventListener('hashchange', handleHashCheck);
  }, []);

  const toggleLang = () => {
    setLang('en');
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

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2]">
      {/* 1. Header with Crest Logo, Om, Language Switcher, Team Button, and Call button */}
      <Navbar
        onOpenBooking={scrollToHero}
        onOpenAdmin={() => setAdminModalOpen(true)}
        bookingCount={bookingCount}
        currentLang={lang}
        onToggleLang={toggleLang}
      />

      <main className="flex-1">
        {/* 2. Hero Section with Rotating Mandala, Floating Particles, Trust Bar & Glass Lead Form */}
        <Hero
          onBookingSuccess={handleBookingSuccess}
          currentLang={lang}
          selectedPuja={selectedPuja}
        />

        {/* 3. Why Families Choose Us (6 Cards) */}
        <WhyChooseUs currentLang={lang} />

        {/* 4. Popular Puja Services Showcase */}
        <PujaServices onSelectPuja={handleSelectPuja} currentLang={lang} />

        {/* 5. Our Senior Verified Acharyas & Pandits (Team Section) */}
        <TeamSection onSelectPandit={handleSelectPandit} currentLang={lang} />

        {/* 6. Booking in 4 Easy Steps (Dark Royal Crimson background) */}
        <HowItWorks currentLang={lang} />

        {/* 7. 15,000+ Families Blessed (Marquee Track) */}
        <Testimonials currentLang={lang} />

        {/* 8. Coverage Localities & Interactive Map */}
        <CoverageSection currentLang={lang} />

        {/* 9. Key Performance Stats Counter */}
        <StatsCounter currentLang={lang} />

        {/* 10. Frequently Asked Questions Accordion */}
        <FAQAccordion currentLang={lang} />

        {/* 11. Final Call-to-Action Banner */}
        <FinalCTA currentLang={lang} />
      </main>

      {/* 12. Footer */}
      <Footer onOpenBooking={scrollToHero} currentLang={lang} />

      {/* 13. Floating Call/WhatsApp Mobile Sticky Bar & Desktop Widget */}
      <FloatingWidgets currentLang={lang} />

      {/* 14. Admin Database Modal (Connects to Node.js Backend API) */}
      <AdminModal
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
      />
    </div>
  );
}
