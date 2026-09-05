import React, { useState } from 'react';

export default function CoverageSection() {
  const [selectedCity, setSelectedCity] = useState('Bangalore');

  const cityData = {
    Bangalore: {
      localities: [
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
    Hyderabad: {
      localities: [
        'Gachibowli & Financial District',
        'Hitech City & Madhapur',
        'Kondapur & Hafeezpet',
        'Kukatpally & KPHB',
        'Jubilee Hills & Banjara Hills',
        'Miyapur & Chandanagar',
        'Secunderabad & Begumpet',
        'Ameerpet & SR Nagar',
        'Uppal & LB Nagar',
        'Manikonda & Puppalaguda',
        'Nallagandla & Tellapur',
        'All Greater Hyderabad Areas'
      ],
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
      localities: [
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

  const current = cityData[selectedCity] || cityData['Bangalore'];

  return (
    <section id="coverage">
      <div className="section-header">
        <div className="section-eyebrow">Local &amp; Pan-India Coverage</div>
        <h2 className="section-title">Verified Pandits Across All Localities</h2>
        <p className="section-sub">
          Our senior North Indian scholars are stationed across major tech hubs and residential clusters for rapid, punctual arrival.
        </p>
      </div>

      {/* City Switcher Buttons */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '28px', flexWrap: 'wrap' }}>
        {['Bangalore', 'Hyderabad', 'Pan-India'].map((city) => (
          <button
            key={city}
            type="button"
            onClick={() => setSelectedCity(city)}
            style={{
              padding: '8px 20px',
              borderRadius: '100px',
              fontSize: '13px',
              fontWeight: '700',
              cursor: 'pointer',
              border: '1.5px solid',
              borderColor: selectedCity === city ? 'var(--crimson-royal)' : 'var(--border-gold)',
              background: selectedCity === city ? 'var(--crimson-royal)' : 'white',
              color: selectedCity === city ? 'white' : 'var(--crimson-royal)',
              boxShadow: selectedCity === city ? '0 4px 14px rgba(78, 10, 23, 0.25)' : 'none',
              transition: 'all 0.2s'
            }}
          >
            {city === 'Pan-India' ? '🇮🇳 Pan-India Metros' : `📍 ${city}`}
          </button>
        ))}
      </div>

      <div className="coverage-wrap">
        {/* Left Column: Grid of Locality Pills */}
        <div className="coverage-list">
          {current.localities.map((area, idx) => (
            <div key={idx} className="coverage-item">
              <span style={{ color: 'var(--gold-dark)', fontSize: '15px' }}>✓</span>
              <span>{area}</span>
            </div>
          ))}
          <div className="coverage-item coverage-item-special">
            <span>🗺️</span>
            <span>Same-Day &amp; Scheduled Doorstep Service in {selectedCity}</span>
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
              {selectedCity}
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
              Punctual Doorstep Pujas
            </text>

            {/* Radar Pulsing Pins */}
            {current.pins.map((pin, i) => (
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
