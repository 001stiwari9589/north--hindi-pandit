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
  'Pan-India': {
    labels: {
      en: 'Pan-India',
      hi: 'पैन-इंडिया (संपूर्ण भारत)',
      te: 'పాన్-ఇండియా (భారత్)',
      bn: 'প্যান-ইন্ডিয়া (ভারত)'
    },
    localities: {
      en: [
        'Delhi NCR, Noida & Gurgaon',
        'Mumbai, Thane & Navi Mumbai',
        'Bengaluru & Whitefield',
        'Pune, Hinjawadi & PCMC',
        'Kolkata & Howrah',
        'Chennai, OMR & Tambaram',
        'Ahmedabad & Gandhinagar',
        'Jaipur & Udaipur (Rajasthan)',
        'Lucknow, Varanasi & Ayodhya',
        'Patna, Gaya & Muzaffarpur',
        'Bhubaneswar & Cuttack',
        'Live Online E-Puja Worldwide'
      ],
      hi: [
        'दिल्ली एनसीआर, नोएडा व गुड़गांव',
        'मुंबई, ठाणे व नवी मुंबई',
        'बेंगलुरु व व्हाइटफील्ड',
        'पुणे, हिंजेवाड़ी व पिंपरी चिंचवाड़',
        'कोलकाता व हावड़ा',
        'चेन्नई, ओएमआर व तांबरम',
        'अहमदाबाद व गांधीनगर',
        'जयपुर व उदयपुर (राजस्थान)',
        'लखनऊ, वाराणसी व अयोध्या',
        'पटना, गया व मुजफ्फरपुर',
        'भुवनेश्वर व कटक',
        'संपूर्ण भारत व विश्वभर में लाइव ई-पूजा'
      ],
      te: [
        'ఢిల్లీ NCR, నోయిడా & గుర్గావ్',
        'ముంబై, థానే & నవీ ముంబై',
        'బెంగళూరు & వైట్‌ఫీల్డ్',
        'పూణే, హింజవాడి & PCMC',
        'కోల్‌కతా & హౌరా',
        'చెన్నై, OMR & తాంబరం',
        'అహ్మదాబాద్ & గాంధీనగర్',
        'జైపూర్ & ఉదయ్‌పూర్',
        'లక్నో, వారణాసి & అయోధ్య',
        'పాట్నా, గయ & ముజఫర్‌పూర్',
        'భువనేశ్వర్ & కటక్',
        'పాన్-ఇండియా లైవ్ ఈ-పూజ సేవ'
      ],
      bn: [
        'দিল্লি NCR, নয়ডা ও গুরগাঁও',
        'মুম্বাই, থানে ও নভি মুম্বাই',
        'বেঙ্গালুরু ও হোয়াইটফিল্ড',
        'পুনে, হিঞ্জেওয়াড়ি ও PCMC',
        'কলকাতা ও হাওড়া',
        'চেন্নাই, OMR ও তাম্বরম',
        'আহমেদাবাদ ও গান্ধীনগর',
        'জয়পুর ও উদয়পুর',
        'লখনউ, বারাণসী ও অযোধ্যা',
        'পাটনা, গয়া ও মুজফফরপুর',
        'ভুবনেশ্বর ও কটক',
        'সর্বভারতীয় লাইভ অনলাইন ই-পূজা'
      ]
    },
    pins: [
      { x: 190, y: 70, name: 'Delhi NCR' },
      { x: 110, y: 200, name: 'Mumbai' },
      { x: 195, y: 250, name: 'Hyderabad' },
      { x: 190, y: 310, name: 'Bengaluru' },
      { x: 220, y: 330, name: 'Chennai' },
      { x: 310, y: 180, name: 'Kolkata' },
      { x: 230, y: 120, name: 'Varanasi' },
      { x: 120, y: 140, name: 'Ahmedabad' }
    ]
  }
};

const getDoorstepBannerText = (lang, cityName, isPanIndia) => {
  if (isPanIndia) {
    switch (lang) {
      case 'hi':
        return 'संपूर्ण भारत में वैदिक पंडित सेवा एवं लाइव ऑनलाइन ई-पूजा सुविधा';
      case 'te':
        return 'భారతదేశం అంతటా వేద పండితుల సేవ & లైవ్ ఆన్‌లైన్ ఈ-పూజ';
      case 'bn':
        return 'সমগ্র ভারতে বৈদিক পুরোহিত সেবা ও লাইভ অনলাইন ই-পূজা';
      default:
        return 'Doorstep Vedic Pandits & Live Online E-Puja Across India';
    }
  }
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

const getSvgSubtext = (lang, isPanIndia) => {
  if (isPanIndia) {
    switch (lang) {
      case 'hi':
        return 'संपूर्ण भारत में प्रामाणिक सेवा';
      case 'te':
        return 'అఖిల భారత ప్రామాణిక సేవ';
      case 'bn':
        return 'সর্বভারতীয় প্রামাণিক সেবা';
      default:
        return 'Authentic Pan-India Service';
    }
  }
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
        {['Hyderabad', 'Pan-India'].map((cityKey) => {
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
                padding: '8px 22px',
                borderRadius: '100px',
                fontSize: '13.5px',
                fontWeight: '700',
                cursor: 'pointer',
                border: '1.5px solid',
                borderColor: isSelected ? 'var(--crimson-royal)' : 'var(--border-gold)',
                background: isSelected ? 'var(--crimson-royal)' : 'white',
                color: isSelected ? 'white' : 'var(--crimson-royal)',
                boxShadow: isSelected ? '0 4px 14px rgba(78, 10, 23, 0.25)' : 'none',
                transition: 'all 0.2s',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <span>{icon}</span>
              <span>{label}</span>
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
            <span>{getDoorstepBannerText(currentLang, cityName, selectedCity === 'Pan-India')}</span>
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
              {getSvgSubtext(currentLang, selectedCity === 'Pan-India')}
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
