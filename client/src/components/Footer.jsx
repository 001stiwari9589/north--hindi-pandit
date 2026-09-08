import React from 'react';
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
              North Hindi Pandit
            </span>
          </div>
          <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)', lineHeight: '1.7', marginBottom: '18px' }}>
            {t.footerDesc || 'Authentic North Indian Hindi & Vedic rituals performed with devotion, precise Sanskrit uccharan, and complete shastra-sammat Vidhi & Samagri.'}
          </p>

          <div style={{ display: 'flex', gap: '10px' }}>
            <a
              href="tel:+919589018011"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(200, 146, 42, 0.2)',
                border: '1px solid rgba(200, 146, 42, 0.4)',
                color: 'var(--gold-light)',
                padding: '6px 14px',
                borderRadius: '100px',
                fontSize: '12px',
                textDecoration: 'none'
              }}
            >
              📞 +91 95890 18011
            </a>
            <a
              href="https://wa.me/919589018011"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(37, 211, 102, 0.2)',
                border: '1px solid rgba(37, 211, 102, 0.4)',
                color: '#4ADE80',
                padding: '6px 14px',
                borderRadius: '100px',
                fontSize: '12px',
                textDecoration: 'none'
              }}
            >
              💬 WhatsApp
            </a>
          </div>
        </div>

        {/* Popular Pujas Column */}
        <div>
          <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', color: 'var(--gold-light)', marginBottom: '16px' }}>
            {t.footerServices || 'Popular Vedic Pujas'}
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '14px', lineHeight: '2', color: 'rgba(255, 255, 255, 0.75)' }}>
            <li><a href="#services" style={{ color: 'inherit', textDecoration: 'none' }}>Grihapravesh Vastu Puja</a></li>
            <li><a href="#services" style={{ color: 'inherit', textDecoration: 'none' }}>Satyanarayan Katha &amp; Hawan</a></li>
            <li><a href="#services" style={{ color: 'inherit', textDecoration: 'none' }}>Rudrabhishek Puja</a></li>
            <li><a href="#services" style={{ color: 'inherit', textDecoration: 'none' }}>Marriage / Vivah Sanskar</a></li>
            <li><a href="#services" style={{ color: 'inherit', textDecoration: 'none' }}>Office &amp; Business Opening Puja</a></li>
            <li><a href="#services" style={{ color: 'inherit', textDecoration: 'none' }}>Maha Mrityunjaya Jaap</a></li>
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
              {currentLang === 'hi' ? 'बैंगलोर व भारतभर: ' : (currentLang === 'te' ? 'బెంగళూరు & పాన్-ఇండియా: ' : (currentLang === 'bn' ? 'ব্যাঙ্গালোর ও ভারতজুড়ে: ' : 'Bangalore & Pan-India: '))}
            </strong>
            {currentLang === 'hi'
              ? 'व्हाइटफील्ड, इलेक्ट्रॉनिक सिटी, HSR लेआउट, कोरमंगला, इंदिरानगर, बेल्लंदूर, पुणे, मुंबई, दिल्ली-एनसीआर व सभी प्रमुख महानगर।'
              : currentLang === 'te'
              ? 'వైట్‌ఫీల్డ్, ఎలక్ట్రానిక్ సిటీ, HSR లేఅవుట్, కోరమంగళ, ఇందిరానగర్, బెల్లందూర్, పూణే, ముంబై, ఢిల్లీ-NCR & అన్ని ప్రధాన నగరాలు.'
              : currentLang === 'bn'
              ? 'হোয়াইটফিল্ড, ইলেকট্রনিক সিটি, HSR লেআউট, কোরামঙ্গলা, ইন্দিরানগর, বেল্লান্দুর, পুনে, মুম্বাই, দিল্লি-NCR ও সমস্ত মেট্রো শহর।'
              : 'Whitefield, Electronic City, HSR Layout, Koramangala, Indiranagar, Bellandur, Pune, Mumbai, Delhi-NCR & all Tier-1 Metros.'}
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
            Founder: Satyam Tiwari
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
