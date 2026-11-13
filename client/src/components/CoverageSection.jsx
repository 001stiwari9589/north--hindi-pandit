import React, { useState } from 'react';
import { translations } from '../translations';

const CITY_CONFIG = {
  Hyderabad: {
    labels: {
      en: 'Hyderabad',
      hi: 'हैदराबाद',
      te: 'హైదరాబాద్',
      bn: 'হায়দ্রাবাদ'
    },
    localities: {
      en: [
        'Gachibowli & Financial District',
        'Hitech City & Madhapur',
        'Kondapur & Hafeezpet',
        'Kukatpally, KPHB & Pragathi Nagar',
        'Jubilee Hills & Banjara Hills',
        'Miyapur, Chandanagar & Nizampet',
        'Secunderabad, Begumpet & Bowenpally',
        'Manikonda, Puppalaguda & Narsingi',
        'Nallagandla, Tellapur & Lingampally',
        'Ameerpet, Sanath Nagar & SR Nagar',
        'Uppal, Habsiguda & LB Nagar',
        'Bachupally, Kompally & Greater Hyderabad'
      ],
      hi: [
        'गच्चीबाउली व फाइनेंशियल डिस्ट्रिक्ट',
        'हाईटेक सिटी व माधापुर',
        'कोंडापुर व हाफ़िज़पेट',
        'कुकटपल्ली, KPHB व प्रगति नगर',
        'जुबली हिल्स व बंजारा हिल्स',
        'मियापुर, चंदनगर व निज़ामपेट',
        'सिकंदराबाद, बेगमपेट व बोवेनपल्ली',
        'मणिकोंडा, पुप्पालागुडा व नरसिंगी',
        'नल्लागंडला, तेल्लापुर व लिंगमपल्ली',
        'अमीरपेट, सनतनगर व एसआर नगर',
        'उप्पल, हब्सीगुडा व एलबी नगर',
        'बाचुपल्ली, कोमपल्ली व ग्रेटर हैदराबाद'
      ],
      te: [
        'గచ్చిబౌలి & ఫైనాన్షియల్ డిస్ట్రిక్ట్',
        'హైటెక్ సిటీ & మాదాపూర్',
        'కొండాపూర్ & హఫీజ్ పేట్',
        'కూకట్‌పల్లి, KPHB & ప్రగతి నగర్',
        'జూబ్లీహిల్స్ & బంజారాహిల్స్',
        'మియాపూర్, చందానగర్ & నిజాంపేట్',
        'సికింద్రాబాద్, బేగంపేట్ & బోయిన్‌పల్లి',
        'మణికొండ, పుప్పాలగూడ & నార్సింగి',
        'నల్లగండ్ల, తెల్లాపూర్ & లింగంపల్లి',
        'అమీర్‌పేట్, సనత్‌నగర్ & ఎస్‌ఆర్ నగర్',
        'ఉప్పల్, హబ్సిగూడ & ఎల్‌బి నగర్',
        'బాచుపల్లి, కొంపల్లి & గ్రేటర్ హైదరాబాద్'
      ],
      bn: [
        'গাছিবাউলি ও ফাইন্যান্সিয়াল ডিস্ট্রিক্ট',
        'হাইটেক সিটি ও মাধাপুর',
        'কোন্ডাপুর ও হাফিজপেট',
        'কুকটপল্লী, KPHB ও প্রগতি নগর',
        'জুবিলি হিলস ও বাঞ্জারা হিলস',
        'মিয়াপুর, চন্দননগর ও নিজামপেট',
        'সেকেন্দ্রাবাদ, বেগমপেট ও বোয়েনপল্লী',
        'মানিকোন্ডা, পুপ্পালাগুডা ও নারসিঙ্গি',
        'নাল্লাগান্ডলা, তেল্লাপুর ও লিঙ্গমপল্লী',
        'আমিরপেট, সনতনগর ও এসআর নগর',
        'উপ্পল, হাবসিগুডা ও এলবি নগর',
        'বাচুপল্লী, কোমপল্লী ও গ্রেটার হায়দ্রাবাদ'
      ]
    },
    pins: [
      { x: 250, y: 230, name: 'Gachibowli' },
      { x: 290, y: 140, name: 'Madhapur' },
      { x: 310, y: 100, name: 'Hitech City' },
      { x: 260, y: 160, name: 'Jubilee Hills' },
      { x: 230, y: 210, name: 'Banjara Hills' },
      { x: 270, y: 290, name: 'Kukatpally' },
      { x: 180, y: 80, name: 'Secunderabad' }
    ]
  },
  Secunderabad: {
    labels: {
      en: 'Secunderabad & East',
      hi: 'सिकंदराबाद व पूर्वी क्षेत्र',
      te: 'సికింద్రాబాద్ & తూర్పు',
      bn: 'সেকেন্দ্রাবাদ ও পূর্ব'
    },
    localities: {
      en: [
        'Secunderabad Station & Clock Tower',
        'Begumpet & Prakash Nagar',
        'Bowenpally & Tadbund',
        'Malkajgiri & Anandbagh',
        'Alwal & Lothkunta',
        'Sainikpuri & Yapral',
        'Kompally & Medchal Highway',
        'Uppal & Habsiguda',
        'Tarnaka & Osmania University',
        'ECIL & Kushaiguda',
        'Nagole & LB Nagar',
        'Marredpally & Paradise'
      ],
      hi: [
        'सिकंदराबाद स्टेशन व क्लॉक टॉवर',
        'बेगमपेट व प्रकाश नगर',
        'बोवेनपल्ली व तड़बंद',
        'मल्काजगिरि व आनंदबाग',
        'अलवाल व लोथकुंटा',
        'सैनिकपुरी व याप्राल',
        'कोमपल्ली व मेडचल हाईवे',
        'उप्पल व हब्सीगुडा',
        'तारनाका व उस्मानिया यूनिवर्सिटी',
        'ईसीआईएल व कुशाईगुडा',
        'नागोले व एलबी नगर',
        'मारेडपल्ली व पैराडाइज'
      ],
      te: [
        'సికింద్రాబాద్ స్టేషన్ & క్లాక్ టవర్',
        'బేగంపేట్ & ప్రకాష్ నగర్',
        'బోయిన్‌పల్లి & తాడ్‌బండ్',
        'మల్కాజ్‌గిరి & ఆనంద్‌బాగ్',
        'అల్వాల్ & లోత్‌కుంట',
        'సైనిక్‌పురి & యాప్రాల్',
        'కొంపల్లి & మేడ్చల్ హైవే',
        'ఉప్పల్ & హబ్సిగూడ',
        'తార్నాక & ఉస్మానియా యూనివర్సిటీ',
        'ECIL & కుషాయిగూడ',
        'నాగోల్ & ఎల్‌బి నగర్',
        'మారేడ్‌పల్లి & ప్యారడైజ్'
      ],
      bn: [
        'সেকেন্দ্রাবাদ স্টেশন ও ক্লক টাওয়ার',
        'বেগমপেট ও প্রকাশ নগর',
        'বোয়েনপল্লী ও তাডবান্ড',
        'মালকাজগিরি ও আনন্দবাগ',
        'আলওয়াল ও লোথকুন্টা',
        'সৈনিকপুরী ও ইয়াপ্রাল',
        'কোমপল্লী ও মেদচাল হাইওয়ে',
        'উপ্পল ও হাবসিগুডা',
        'তারনাকা ও ওসমানিয়া ইউনিভার্সিটি',
        'ইসিআইএল ও কুশাইগুডা',
        'নাগোল ও এলবি নগর',
        'মারেডপল্লী ও প্যারাডাইস'
      ]
    },
    pins: [
      { x: 310, y: 100, name: 'Begumpet' },
      { x: 290, y: 140, name: 'Bowenpally' },
      { x: 250, y: 230, name: 'Malkajgiri' },
      { x: 270, y: 290, name: 'Alwal' },
      { x: 295, y: 210, name: 'Sainikpuri' },
      { x: 280, y: 260, name: 'Kompally' },
      { x: 230, y: 210, name: 'Uppal' },
      { x: 260, y: 160, name: 'Tarnaka' },
      { x: 190, y: 280, name: 'ECIL' },
      { x: 180, y: 80, name: 'LB Nagar' }
    ]
  },
  'North-South-Hyd': {
    labels: {
      en: 'Central & South Hyderabad',
      hi: 'मध्य व दक्षिण हैदराबाद',
      te: 'సెంట్రల్ & సౌత్ హైదరాబాద్',
      bn: 'মধ্য ও দক্ষিণ হায়দ্রাবাদ'
    },
    localities: {
      en: [
        'Banjara Hills & Jubilee Hills',
        'Somajiguda & Raj Bhavan Rd',
        'Ameerpet, SR Nagar & Punjagutta',
        'Mehdipatnam & Tolichowki',
        'Attapur & Rajendranagar',
        'Charminar & Old City',
        'Abids & Koti',
        'Himayatnagar & Narayanaguda',
        'Khairatabad & Lakdikapul',
        'Shamshabad & Airport Zone',
        'Kothapet & Dilsukhnagar',
        'Santosh Nagar & Chandrayangutta'
      ],
      hi: [
        'बंजारा हिल्स व जुबली हिल्स',
        'सोमाजीगुडा व राजभवन रोड',
        'अमीरपेट, एसआर नगर व पंजागुट्टा',
        'मेहंदीपटनम व टोलीचौकी',
        'अट्टापुर व राजेंद्रनगर',
        'चारमीनार व ओल्ड सिटी',
        'अबिड्स व कोटी',
        'हिमायतनगर व नारायणगुडा',
        'खैराताबाद व लकड़िकापुल',
        'शमशाबाद व एयरपोर्ट जोन',
        'कोथापेट व दिलसुखनगर',
        'संतोष नगर व चंद्रायणगुट्टा'
      ],
      te: [
        'బంజారాహిల్స్ & జూబ్లీహిల్స్',
        'సోమాజిగూడ & రాజ్‌భవన్ రోడ్',
        'అమీర్‌పేట్, ఎస్‌ఆర్ నగర్ & పంజాగుట్ట',
        'మెహదీపట్నం & టోలిచౌకి',
        'అత్తాపూర్ & రాజేంద్రనగర్',
        'చార్మినార్ & ఓల్డ్ సిటీ',
        'అబిడ్స్ & కోటి',
        'హిమాయత్‌నగర్ & నారాయణగూడ',
        'ఖైరతాబాద్ & లక్డీకాపూల్',
        'శంషాబాద్ & ఎయిర్‌పోర్ట్ జోన్',
        'కొత్తపేట్ & దిల్సుఖ్‌నగర్',
        'సంతోష్ నగర్ & చాంద్రాయణగుట్ట'
      ],
      bn: [
        'বাঞ্জারা হিলস ও জুবিলি হিলস',
        'সোমাজিগূড়া ও রাজভবন রোড',
        'আমিরপেট, এসআর নগর ও পাঞ্জাগুটা',
        'মেহদী পত্তনম ও টোলিচৌকি',
        'আট্টাপুর ও রাজেন্দ্রনগর',
        'চারমিনার ও ওল্ড সিটি',
        'আবিডস ও কোটি',
        'হিমায়তনগর ও নারায়ণগুডা',
        'খায়রাতাবাদ ও লাকড়িকাপুল',
        'শমশাবাদ ও বিমানবন্দর এলাকা',
        'কোথাপেট ও দিলসুখনগর',
        'সন্তোষ নগর ও চন্দ্রায়ানগুটা'
      ]
    },
    pins: [
      { x: 260, y: 160, name: 'Banjara Hills' },
      { x: 230, y: 210, name: 'Jubilee Hills' },
      { x: 310, y: 100, name: 'Ameerpet' },
      { x: 290, y: 140, name: 'Somajiguda' },
      { x: 250, y: 230, name: 'Mehdipatnam' },
      { x: 270, y: 290, name: 'Charminar' },
      { x: 295, y: 210, name: 'Himayatnagar' },
      { x: 280, y: 260, name: 'Abids' },
      { x: 190, y: 280, name: 'Shamshabad' },
      { x: 180, y: 80, name: 'Dilsukhnagar' }
    ]
  }
};

const getDoorstepBannerText = (lang, cityName) => {
  switch (lang) {
    case 'hi':
      return `${cityName} में उसी दिन व पूर्व-निर्धारित समय पर घर-पहुंच वैदिक सेवा`;
    case 'te':
      return `${cityName}లో అదే రోజు మరియు షెడ్యూల్ చేసిన ఇంటి వద్దకే వేద పూజా సేవ`;
    case 'bn':
      return `${cityName}-এ একই দিনে ও পূর্বনির্ধারিত দরজায় বৈদিক পূজা সেবা`;
    default:
      return `Same-Day & Scheduled Doorstep Service in ${cityName}`;
  }
};

const getSvgSubtext = (lang) => {
  switch (lang) {
    case 'hi':
      return 'समयबद्ध पावन घर-पहुंच पूजा';
    case 'te':
      return 'సమయానికి పవిత్ర పూజా సేవ';
    case 'bn':
      return 'সময়মতো পবিত্র পূজা সেবা';
    default:
      return 'Punctual Doorstep Pujas';
  }
};

export default function CoverageSection({ currentLang = 'en' }) {
  const t = translations[currentLang] || translations.en;
  const [selectedCity, setSelectedCity] = useState('Hyderabad');

  const cityConf = CITY_CONFIG[selectedCity] || CITY_CONFIG.Hyderabad;
  const cityName = cityConf.labels[currentLang] || cityConf.labels.en;
  const localities = cityConf.localities[currentLang] || cityConf.localities.en;

  return (
    <section id="coverage">
      <div className="section-header">
        <div className="section-eyebrow">{t.coverageEyebrow || 'Best Hindi Pandit in Hyderabad & Secunderabad'}</div>
        <h2 className="section-title">{t.coverageTitle || 'Doorstep Vedic Pandits & Acharyas in Your Locality'}</h2>
        <p className="section-sub">
          {t.coverageSub || 'Our verified North Indian scholars are stationed across Hyderabad (Gachibowli, Hitec City, Madhapur, Kondapur, Kukatpally) & Secunderabad for rapid, punctual arrival.'}
        </p>
      </div>

      {/* High-Intent SEO Keywords & Traditions Served */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '22px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {[
          { label: 'North Indian Pandit Near Me', icon: '🪔' },
          { label: 'Hindi Pandit in Hyderabad', icon: '📍' },
          { label: 'Bihari Pandit in Hyderabad', icon: '🌾' },
          { label: 'Banaras Pandit in Hyderabad', icon: '🔱' },
          { label: 'Marathi Pandit in Hyderabad', icon: '🚩' },
          { label: 'Pandit Near Me', icon: '🙏' },
          { label: 'Bihar Pandit Near Me', icon: '✨' },
          { label: 'Banaras Pandit Near Me', icon: '🔔' },
          { label: 'Marathi Pandit Near Me', icon: '🕉️' }
        ].map((kw, i) => (
          <span
            key={i}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '5px 13px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: '600',
              background: 'rgba(212, 175, 55, 0.12)',
              border: '1px solid rgba(212, 175, 55, 0.35)',
              color: 'var(--crimson-royal)',
              letterSpacing: '0.2px'
            }}
          >
            <span>{kw.icon}</span>
            <span>{kw.label}</span>
          </span>
        ))}
      </div>

      {/* City Switcher Buttons */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '28px', flexWrap: 'wrap' }}>
        {['Hyderabad', 'Secunderabad', 'North-South-Hyd'].map((cityKey) => {
          const isSelected = selectedCity === cityKey;
          const conf = CITY_CONFIG[cityKey];
          const label = conf?.labels[currentLang] || conf?.labels.en;
          const icon = cityKey === 'Pan-India' ? '🇮🇳' : '📍';

          return (
            <button
              key={cityKey}
              type="button"
              onClick={() => setSelectedCity(cityKey)}
              style={{
                padding: '8px 20px',
                borderRadius: '100px',
                fontSize: '13px',
                fontWeight: '700',
                cursor: 'pointer',
                border: '1.5px solid',
                borderColor: isSelected ? 'var(--crimson-royal)' : 'var(--border-gold)',
                background: isSelected ? 'var(--crimson-royal)' : 'white',
                color: isSelected ? 'white' : 'var(--crimson-royal)',
                boxShadow: isSelected ? '0 4px 14px rgba(78, 10, 23, 0.25)' : 'none',
                transition: 'all 0.2s'
              }}
            >
              {icon} {label}
            </button>
          );
        })}
      </div>

      <div className="coverage-wrap">
        {/* Left Column: Grid of Locality Pills */}
        <div className="coverage-list">
          {localities.map((area, idx) => (
            <div key={idx} className="coverage-item">
              <span style={{ color: 'var(--gold-dark)', fontSize: '15px' }}>✓</span>
              <span>{area}</span>
            </div>
          ))}
          <div className="coverage-item coverage-item-special">
            <span>🗺️</span>
            <span>{getDoorstepBannerText(currentLang, cityName)}</span>
          </div>
        </div>

        {/* Right Column: Map Graphic with Pulsing Radar Pins */}
        <div className="map-placeholder">
          <svg viewBox="0 0 400 380" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="mapGradBespoke" cx="50%" cy="50%">
                <stop offset="0%" stopColor="#FCF9F3" />
                <stop offset="100%" stopColor="#F5ECE0" />
              </radialGradient>
            </defs>
            <rect width="400" height="380" fill="url(#mapGradBespoke)" rx="16" />

            {/* Stylized geometric grid lines */}
            <line x1="50" y1="100" x2="350" y2="100" stroke="#D4AF37" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.4" />
            <line x1="50" y1="200" x2="350" y2="200" stroke="#D4AF37" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.4" />
            <line x1="50" y1="300" x2="350" y2="300" stroke="#D4AF37" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.4" />
            <line x1="120" y1="40" x2="120" y2="340" stroke="#D4AF37" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.4" />
            <line x1="280" y1="40" x2="280" y2="340" stroke="#D4AF37" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.4" />

            {/* Central Contour shape */}
            <circle cx="200" cy="190" r="110" fill="none" stroke="#D4AF37" strokeWidth="1" opacity="0.3" />
            <circle cx="200" cy="190" r="70" fill="none" stroke="#D4AF37" strokeWidth="0.75" strokeDasharray="2 2" opacity="0.3" />

            {/* Center Label */}
            <text
              x="200"
              y="185"
              textAnchor="middle"
              fontFamily="'Cormorant Garamond', serif"
              fontSize="24"
              fill="#4E0A17"
              fontWeight="700"
              opacity="0.85"
            >
              {cityName}
            </text>
            <text
              x="200"
              y="208"
              textAnchor="middle"
              fontFamily="'Inter', sans-serif"
              fontSize="10"
              fill="#997312"
              letterSpacing="2.5"
              textTransform="uppercase"
              fontWeight="700"
              opacity="0.9"
            >
              {getSvgSubtext(currentLang)}
            </text>

            {/* Radar Pulsing Pins */}
            {cityConf.pins.map((pin, i) => (
              <g key={i}>
                <circle
                  cx={pin.x}
                  cy={pin.y}
                  r="6"
                  fill="#FF7700"
                  opacity="0.9"
                  style={{ animation: `pinPulse 2.2s ease-in-out ${i * 0.25}s infinite` }}
                />
                <circle
                  cx={pin.x}
                  cy={pin.y}
                  r="13"
                  fill="#D4AF37"
                  opacity="0.25"
                  style={{ animation: `pinRing 2.2s ease-in-out ${i * 0.25}s infinite` }}
                />
              </g>
            ))}
          </svg>
        </div>
      </div>
    </section>
  );
}
