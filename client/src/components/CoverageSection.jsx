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
  Bangalore: {
    labels: {
      en: 'Bangalore',
      hi: 'बैंगलोर',
      te: 'బెంగళూరు',
      bn: 'ব্যাঙ্গালোর'
    },
    localities: {
      en: [
        'Whitefield & ITPL',
        'Electronic City (Ph 1 & 2)',
        'HSR Layout & BTM',
        'Koramangala',
        'Indiranagar & Domlur',
        'Marathahalli & Bellandur',
        'Sarjapur Road',
        'Yelahanka & Sahakar Nagar',
        'Malleshwaram & Rajajinagar',
        'Hebbal & Manyata Tech Park',
        'Jayanagar & JP Nagar',
        'Bannerghatta Road'
      ],
      hi: [
        'व्हाइटफील्ड व ITPL',
        'इलेक्ट्रॉनिक सिटी (फेज 1 और 2)',
        'HSR लेआउट व BTM',
        'कोरमंगला',
        'इंदिरानगर व डोमलूर',
        'मराठाहल्ली व बेल्लंदूर',
        'सरजापुर रोड',
        'येलाहंका व सहकार नगर',
        'मल्लेश्वरम व राजाजीनगर',
        'हेब्बल व मान्यता टेक पार्क',
        'जयनगर व जेपी नगर',
        'बन्नेरघट्टा रोड'
      ],
      te: [
        'వైట్‌ఫీల్డ్ & ITPL',
        'ఎలక్ట్రానిక్ సిటీ (ఫేజ్ 1 & 2)',
        'HSR లేఅవుట్ & BTM',
        'కోరమంగళ',
        'ఇందిరానగర్ & దోమ్లూర్',
        'మారతహళ్లి & బెల్లందూర్',
        'సర్జాపూర్ రోడ్',
        'యెలహంక & సహకార నగర్',
        'మల్లేశ్వరం & రాజాజీనగర్',
        'హెబ్బాల్ & మాన్యత టెక్ పార్క్',
        'జయనగర్ & జేపీ నగర్',
        'బన్నేర్‌ఘట్ట రోడ్'
      ],
      bn: [
        'হোয়াইটফিল্ড ও ITPL',
        'ইলেকট্রনিক সিটি (ফেজ ১ ও ২)',
        'HSR লেআউট ও BTM',
        'কোরামঙ্গলা',
        'ইন্দিরানগর ও ডোম্লুর',
        'মারাঠাহাল্লি ও বেল্লান্দুর',
        'সার্জাপুর রোড',
        'ইয়েলাহাঙ্কা ও সহকার নগর',
        'মল্লেশ্বরম ও রাজাজিনগর',
        'হেব্বাল ও মান্যত টেক পার্ক',
        'জয়নগর ও জেপি নগর',
        'বানেরঘাটা রোড'
      ]
    },
    pins: [
      { x: 310, y: 100, name: 'Whitefield' },
      { x: 290, y: 140, name: 'Marathahalli' },
      { x: 250, y: 230, name: 'HSR Layout' },
      { x: 270, y: 290, name: 'Electronic City' },
      { x: 295, y: 210, name: 'Bellandur' },
      { x: 280, y: 260, name: 'Sarjapur' },
      { x: 230, y: 210, name: 'Koramangala' },
      { x: 260, y: 160, name: 'Indiranagar' },
      { x: 190, y: 280, name: 'BTM Layout' },
      { x: 180, y: 80, name: 'Hebbal & Yelahanka' }
    ]
  },
  'Pan-India': {
    labels: {
      en: 'Pan-India Metros',
      hi: 'पूरे भारत में (महानगर)',
      te: 'పాన్-ఇండియా మెట్రోలు',
      bn: 'সর্বভারতীয় মেট্রো'
    },
    localities: {
      en: [
        'Pune (Hinjewadi, Wakad, Kharadi)',
        'Mumbai & Navi Mumbai',
        'Delhi NCR (Noida, Gurgaon, Faridabad)',
        'Kolkata & Howrah',
        'Chennai & Coimbatore',
        'Ahmedabad & Vadodara',
        'Jaipur & Kota',
        'Lucknow & Kanpur',
        'Patna & Ranchi',
        'All Major Tier-1 & Tier-2 Metros'
      ],
      hi: [
        'पुणे (हिंजेवाड़ी, वाकड़, खराड़ी)',
        'मुंबई व नवी मुंबई',
        'दिल्ली एनसीआर (नोएडा, गुड़गांव, फरीदाबाद)',
        'कोलकाता व हावड़ा',
        'चेन्नई व कोयंबटूर',
        'अहमदाबाद व वडोदरा',
        'जयपुर व कोटा',
        'लखनऊ व कानपुर',
        'पटना व रांची',
        'सभी प्रमुख टीयर-1 व टीयर-2 महानगर'
      ],
      te: [
        'పూణే (హింజేవాడి, వాకడ్, ఖరాడి)',
        'ముంబై & నవీ ముంబై',
        'ఢిల్లీ NCR (నోయిడా, గుర్గావ్, ఫరీదాబాద్)',
        'కోల్‌కతా & హౌరా',
        'చెన్నై & కోయంబత్తూర్',
        'అహ్మదాబాద్ & వడోదర',
        'జైపూర్ & కోటా',
        'లక్నో & కాన్పూర్',
        'పాట్నా & రాంచీ',
        'అన్ని ప్రధాన టైర్-1 & టైర్-2 నగరాలు'
      ],
      bn: [
        'পুনে (হিঞ্জেওয়াড়ি, ওয়াকড়, খারাড়ি)',
        'মুম্বাই ও নভি মুম্বাই',
        'দিল্লি NCR (নয়ডা, গুরুগ্রাম, ফরিদাবাদ)',
        'কলকাতা ও হাওড়া',
        'চেন্নাই ও কোয়েম্বাটুর',
        'আহমেদাবাদ ও ভদোদরা',
        'জয়পুর ও কোটা',
        'লখনউ ও কানপুর',
        'পাটনা ও রাঁচি',
        'সমস্ত প্রধান টিয়ার-১ ও টিয়ার-২ মেট্রো শহর'
      ]
    },
    pins: [
      { x: 180, y: 80, name: 'Delhi NCR' },
      { x: 140, y: 180, name: 'Mumbai' },
      { x: 160, y: 220, name: 'Pune' },
      { x: 230, y: 240, name: 'Hyderabad' },
      { x: 240, y: 300, name: 'Bangalore' },
      { x: 320, y: 170, name: 'Kolkata' }
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
        <div className="section-eyebrow">{t.coverageEyebrow || 'Best Hindi Pandit in Hyderabad, Bangalore & Pan-India'}</div>
        <h2 className="section-title">{t.coverageTitle || 'Doorstep Vedic Pandits & Acharyas in Your Locality'}</h2>
        <p className="section-sub">
          {t.coverageSub || 'Our verified North Indian scholars are stationed across Hyderabad (Gachibowli, Hitec City, Madhapur, Kondapur, Kukatpally), Bangalore & major hubs for rapid, punctual arrival.'}
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
        {['Hyderabad', 'Bangalore', 'Pan-India'].map((cityKey) => {
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
