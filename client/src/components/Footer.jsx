import React from 'react';
import { Phone } from 'lucide-react';
import { translations } from '../translations';

export default function Footer({ onOpenBooking, currentLang = 'en' }) {
  const t = translations[currentLang] || translations.en;
  const scrollToHero = (e) => {
    e.preventDefault();
    const hero = document.getElementById('hero');
    if (hero) hero.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer style={{ background: '#081220', color: '#FFF8EC', borderTop: '2px solid rgba(200, 146, 42, 0.3)', padding: '60px 5% 40px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px', paddingBottom: '40px', borderBottom: '1px solid rgba(200, 146, 42, 0.15)' }}>
        {/* Brand Column */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
            <span style={{ fontSize: '28px', color: 'var(--gold-light)' }}>ॐ</span>
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', fontWeight: '700', color: 'white' }}>
              Banarasi & North Hindi Pandit
            </span>
          </div>
          <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)', lineHeight: '1.7', marginBottom: '18px' }}>
            {t.footerDesc || 'Authentic North Indian, Banarasi Hindi & Vedic rituals performed with devotion, precise Sanskrit uccharan, and complete shastra-sammat Vidhi & Samagri.'}
          </p>

          {/* Quick Contact & Social Channels - Clean Minimal Outline Icons */}
          <div style={{ marginTop: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              {/* Phone Button (Navbar number: +91 91830 89880) */}
              <a
                href="tel:+919183089880"
                title="Call Pandit Ji (+91 91830 89880)"
                aria-label="Call +91 91830 89880"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'transparent',
                  border: '1.5px solid rgba(255, 255, 255, 0.25)',
                  color: 'rgba(255, 255, 255, 0.85)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textDecoration: 'none',
                  transition: 'transform 0.25s ease, border-color 0.25s ease, color 0.25s ease',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.borderColor = '#F59E0B';
                  e.currentTarget.style.color = '#F59E0B';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
                  e.currentTarget.style.color = 'rgba(255, 255, 255, 0.85)';
                }}
              >
                <Phone style={{ width: '18px', height: '18px' }} />
              </a>

              {/* WhatsApp Button */}
              <a
                href="https://wa.me/919183089880?text=Namaste%20Pandit%20Ji%2C%20I%20want%20to%20consult%20and%20book%20a%20Puja%20in%20Hyderabad."
                target="_blank"
                rel="noopener noreferrer"
                title="Chat on WhatsApp (+91 91830 89880)"
                aria-label="Chat on WhatsApp"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'transparent',
                  border: '1.5px solid rgba(255, 255, 255, 0.25)',
                  color: 'rgba(255, 255, 255, 0.85)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textDecoration: 'none',
                  transition: 'transform 0.25s ease, border-color 0.25s ease, color 0.25s ease',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.borderColor = '#25D366';
                  e.currentTarget.style.color = '#25D366';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
                  e.currentTarget.style.color = 'rgba(255, 255, 255, 0.85)';
                }}
              >
                <svg style={{ width: '19px', height: '19px', fill: 'currentColor' }} viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
              </a>

              {/* Instagram Button */}
              <a
                href="https://www.instagram.com/brijbasipandit_hyderbad?gwpx=NjNjN21sMzViaWxv&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                title="Follow Pandit Ji on Instagram (@brijbasipandit_hyderbad)"
                aria-label="Follow us on Instagram"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'transparent',
                  border: '1.5px solid rgba(255, 255, 255, 0.25)',
                  color: 'rgba(255, 255, 255, 0.85)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textDecoration: 'none',
                  transition: 'transform 0.25s ease, border-color 0.25s ease, color 0.25s ease',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.borderColor = '#E1306C';
                  e.currentTarget.style.color = '#E1306C';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
                  e.currentTarget.style.color = 'rgba(255, 255, 255, 0.85)';
                }}
              >
                <svg style={{ width: '18px', height: '18px', fill: 'currentColor' }} viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              {/* Facebook Button */}
              <a
                href="https://www.facebook.com/share/1A4Q2mP1sv/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                title="Follow Pandit Ji on Facebook"
                aria-label="Follow us on Facebook"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'transparent',
                  border: '1.5px solid rgba(255, 255, 255, 0.25)',
                  color: 'rgba(255, 255, 255, 0.85)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textDecoration: 'none',
                  transition: 'transform 0.25s ease, border-color 0.25s ease, color 0.25s ease',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.borderColor = '#1877F2';
                  e.currentTarget.style.color = '#1877F2';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
                  e.currentTarget.style.color = 'rgba(255, 255, 255, 0.85)';
                }}
              >
                <svg style={{ width: '18px', height: '18px', fill: 'currentColor' }} viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Popular Pujas Column */}
        <div>
          <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', color: 'var(--gold-light)', marginBottom: '16px' }}>
            {t.footerServices || 'Popular Vedic Pujas'}
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '14px', lineHeight: '2.1', color: 'rgba(255, 255, 255, 0.75)' }}>
            <li>
              <a
                href="/griha-pravesh-puja-in-hyderabad"
                onClick={(e) => {
                  e.preventDefault();
                  window.history.pushState(null, '', '/griha-pravesh-puja-in-hyderabad');
                  window.dispatchEvent(new PopStateEvent('popstate'));
                }}
                style={{ color: 'inherit', textDecoration: 'none' }}
                onMouseOver={(e) => (e.target.style.color = '#F59E0B')}
                onMouseOut={(e) => (e.target.style.color = 'inherit')}
              >
                Griha Pravesh Puja in Hyderabad
              </a>
            </li>
            <li>
              <a
                href="/satyanarayan-puja-in-hyderabad"
                onClick={(e) => {
                  e.preventDefault();
                  window.history.pushState(null, '', '/satyanarayan-puja-in-hyderabad');
                  window.dispatchEvent(new PopStateEvent('popstate'));
                }}
                style={{ color: 'inherit', textDecoration: 'none' }}
                onMouseOver={(e) => (e.target.style.color = '#F59E0B')}
                onMouseOut={(e) => (e.target.style.color = 'inherit')}
              >
                Satyanarayan Puja &amp; Hawan
              </a>
            </li>
            <li>
              <a
                href="/rudrabhishek-puja-in-hyderabad"
                onClick={(e) => {
                  e.preventDefault();
                  window.history.pushState(null, '', '/rudrabhishek-puja-in-hyderabad');
                  window.dispatchEvent(new PopStateEvent('popstate'));
                }}
                style={{ color: 'inherit', textDecoration: 'none' }}
                onMouseOver={(e) => (e.target.style.color = '#F59E0B')}
                onMouseOut={(e) => (e.target.style.color = 'inherit')}
              >
                Maha Rudrabhishek Puja
              </a>
            </li>
            <li>
              <a
                href="/vivah-puja-in-hyderabad"
                onClick={(e) => {
                  e.preventDefault();
                  window.history.pushState(null, '', '/vivah-puja-in-hyderabad');
                  window.dispatchEvent(new PopStateEvent('popstate'));
                }}
                style={{ color: 'inherit', textDecoration: 'none' }}
                onMouseOver={(e) => (e.target.style.color = '#F59E0B')}
                onMouseOut={(e) => (e.target.style.color = 'inherit')}
              >
                Vivah Sanskar &amp; Wedding Puja
              </a>
            </li>
            <li>
              <a
                href="/vastu-shanti-puja-in-hyderabad"
                onClick={(e) => {
                  e.preventDefault();
                  window.history.pushState(null, '', '/vastu-shanti-puja-in-hyderabad');
                  window.dispatchEvent(new PopStateEvent('popstate'));
                }}
                style={{ color: 'inherit', textDecoration: 'none' }}
                onMouseOver={(e) => (e.target.style.color = '#F59E0B')}
                onMouseOut={(e) => (e.target.style.color = 'inherit')}
              >
                Vastu Shanti Puja &amp; Hawan
              </a>
            </li>
            <li>
              <a
                href="/pandit-in-hyderabad"
                onClick={(e) => {
                  e.preventDefault();
                  window.history.pushState(null, '', '/pandit-in-hyderabad');
                  window.dispatchEvent(new PopStateEvent('popstate'));
                }}
                style={{ color: 'inherit', textDecoration: 'none' }}
                onMouseOver={(e) => (e.target.style.color = '#F59E0B')}
                onMouseOut={(e) => (e.target.style.color = 'inherit')}
              >
                Best Hindi Pandit in Hyderabad
              </a>
            </li>
          </ul>
        </div>

        {/* Areas Covered Column */}
        <div>
          <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', color: 'var(--gold-light)', marginBottom: '16px' }}>
            📍 {t.footerCoverage || 'Prime Locations Covered'}
          </h4>
          <p style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.75)', lineHeight: '1.8', marginBottom: '8px' }}>
            <strong style={{ color: 'var(--gold-light)' }}>
              {currentLang === 'hi' ? 'हैदराबाद: ' : (currentLang === 'te' ? 'హైదరాబాద్: ' : (currentLang === 'bn' ? 'হায়দ্রাবাদ: ' : 'Hyderabad: '))}
            </strong>
            {currentLang === 'hi'
              ? 'गच्चीबाउली, हाईटेक सिटी, माधापुर, कोंडापुर, कुकटपल्ली, जुबली हिल्स, बंजारा हिल्स, सिकंदराबाद, मियापुर, मणिकोंडा, तेल्लापुर व बेगमपेट।'
              : currentLang === 'te'
              ? 'గచ్చిబౌలి, హైటెక్ సిటీ, మాదాపూర్, కొండాపూర్, కూకట్‌పల్లి, జూబ్లీహిల్స్, బంజారాహిల్స్, సికింద్రాబాద్, మియాపూర్, మణికొండ, తెల్లాపూర్ & బేగంపేట్.'
              : currentLang === 'bn'
              ? 'গাছিবাউলি, হাইটেক সিটি, মাধাপুর, কোন্ডাপুর, কুকটপল্লী, জুবিলি হিলস, বাঞ্জারা হিলস, সেকেন্দ্রাবাদ, মিয়াপুর, মানিকোন্ডা, তেল্লাপুর ও বেগমপেট।'
              : 'Gachibowli, Hitec City, Madhapur, Kondapur, Kukatpally, Jubilee Hills, Banjara Hills, Secunderabad, Miyapur, Manikonda, Tellapur & Begumpet.'}
          </p>
          <p style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.75)', lineHeight: '1.8' }}>
            <strong style={{ color: 'var(--gold-light)' }}>
              {currentLang === 'hi' ? 'सिकंदराबाद व ग्रेटर हैदराबाद: ' : (currentLang === 'te' ? 'సికింద్రాబాద్ & గ్రేటర్ హైదరాబాద్: ' : (currentLang === 'bn' ? 'সেকেন্দ্রাবাদ ও বৃহত্তর হায়দ্রাবাদ: ' : 'Secunderabad & Greater Hyderabad: '))}
            </strong>
            {currentLang === 'hi'
              ? 'सिकंदराबाद, बेगमपेट, बोवेनपल्ली, अलवाल, मल्काजगिरि, सैनिकपुरी, कोमपल्ली, उप्पल, एलबी नगर व समस्त हैदराबाद।'
              : currentLang === 'te'
              ? 'సికింద్రాబాద్, బేగంపేట్, బోయిన్‌పల్లి, అల్వాల్, మల్కాజ్‌గిరి, సైనిక్‌పురి, కొంపల్లి, ఉప్పల్, ఎల్బీ నగర్ & హైదరాబాద్ మొత్తం.'
              : currentLang === 'bn'
              ? 'সেকেন্দ্রাবাদ, বেগমপেট, বোয়েনপল্লী, আলওয়াল, মালকাজগিরি, সৈনিকপুরী, কোমপল্লী, উপ্পল, এলবি নগর ও সমগ্র হায়দ্রাবাদ।'
              : 'Secunderabad, Begumpet, Bowenpally, Alwal, Malkajgiri, Sainikpuri, Kompally, Uppal, LB Nagar & All Hyderabad.'}
          </p>
          <div style={{ marginTop: '16px' }}>
            <a
              href="#hero"
              onClick={scrollToHero}
              style={{
                display: 'inline-block',
                background: 'linear-gradient(135deg, var(--gold), var(--saffron))',
                color: 'white',
                padding: '10px 20px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: '600',
                textDecoration: 'none'
              }}
            >
              🙏 {t.btnCtaBook || 'Book Consultation Now'}
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div style={{ maxWidth: '1200px', margin: '24px auto 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', fontSize: '12px', color: 'rgba(255, 255, 255, 0.5)' }}>
        <div>
          <div>© 2026 North Hindi Pandit. All Rights Reserved.</div>
          <div style={{ marginTop: '4px', color: 'rgba(255, 255, 255, 0.7)', fontSize: '12px', letterSpacing: '0.3px' }}>
            Founder & Developer: Satyam Tiwari
          </div>
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <span>Vedic Tradition</span>
          <span>•</span>
          <span>100% Shastra Sammat</span>
          <span>•</span>
          <span>Pure Samagri</span>
        </div>
      </div>
    </footer>
  );
}
