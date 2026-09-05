import React, { useState, useEffect } from 'react';

export default function Hero({ onBookingSuccess, currentLang = 'en' }) {
  const isHindi = currentLang === 'hi';

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    puja_type: 'Satyanarayan Puja',
    city: 'Bangalore',
    date: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  useEffect(() => {
    const dateEl = document.getElementById('lead-date');
    if (dateEl) {
      dateEl.min = new Date().toISOString().split('T')[0];
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      alert(isHindi ? 'कृपया अपना नाम और फोन नंबर दर्ज करें।' : 'Please enter your name and phone number.');
      return;
    }

    setLoading(true);

    const message =
      `Namaste! I want to book a verified North Indian Hindi Pandit for Puja.\n\n` +
      `*Name:* ${formData.name}\n` +
      `*Phone:* ${formData.phone}\n` +
      `*Puja Type:* ${formData.puja_type}\n` +
      `*City / Location:* ${formData.city}\n` +
      `*Preferred Date:* ${formData.date || 'Earliest Shubh Muhurat'}`;

    const waUrl = `https://wa.me/919019690392?text=${encodeURIComponent(message)}`;

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          devoteeName: formData.name,
          phoneNumber: formData.phone,
          pujaType: formData.puja_type,
          pujaDate: formData.date || new Date().toISOString().split('T')[0],
          cityArea: formData.city,
          notes: 'Hero Consultation Form'
        })
      });
      const data = await res.json();
      const ref =
        data && data.booking && data.booking.bookingId
          ? data.booking.bookingId
          : 'NHP-' + Math.floor(100000 + Math.random() * 900000);
      setBookingRef(ref);
      if (onBookingSuccess && data.booking) {
        onBookingSuccess(data.booking);
      }
    } catch (err) {
      setBookingRef('NHP-' + Math.floor(100000 + Math.random() * 900000));
    } finally {
      setLoading(false);
      setSubmitted(true);
      window.open(waUrl, '_blank');
    }
  };

  return (
    <section id="hero">
      {/* Bespoke Dual-Ring Sacred Mandala Yantra SVG */}
      <svg className="mandala-bg" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(400,400)">
          <circle r="380" stroke="#D4AF37" strokeWidth="1" fill="none" />
          <circle r="330" stroke="#D4AF37" strokeWidth="0.5" strokeDasharray="6 4" fill="none" />
          <circle r="270" stroke="#D4AF37" strokeWidth="1" fill="none" />
          <circle r="210" stroke="#D4AF37" strokeWidth="0.5" fill="none" />
          <circle r="150" stroke="#D4AF37" strokeWidth="1" fill="none" />
          <circle r="90" stroke="#D4AF37" strokeWidth="0.5" fill="none" />

          {/* 16 Sacred Lotus Petals */}
          <g id="mandala-petals">
            {[0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5, 270, 292.5, 315, 337.5].map((angle) => (
              <ellipse
                key={angle}
                cx="0"
                cy="-300"
                rx="18"
                ry="55"
                fill="#D4AF37"
                opacity="0.38"
                transform={`rotate(${angle})`}
              />
            ))}
          </g>

          {/* Ashtakon (Sacred Octagram Interlocking Squares) */}
          <rect x="-180" y="-180" width="360" height="360" stroke="#D4AF37" strokeWidth="0.75" fill="none" opacity="0.4" />
          <rect x="-180" y="-180" width="360" height="360" stroke="#D4AF37" strokeWidth="0.75" fill="none" opacity="0.4" transform="rotate(45)" />

          <circle r="24" fill="#D4AF37" opacity="0.65" />
          <text textAnchor="middle" dominantBaseline="central" fontSize="26" fill="#2A040C" fontWeight="bold" fontFamily="serif">
            ॐ
          </text>
        </g>
      </svg>

      {/* Rotating Conic Gold Rays */}
      <div className="rays"></div>

      {/* Floating Golden Sparks */}
      <div className="particles">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${(i * 3.33 + 1.5) % 100}%`,
              bottom: `${(i * 4) % 45}%`,
              '--dur': `${6 + (i % 6)}s`,
              '--delay': `${(i * 0.35) % 4.5}s`,
              '--drift': `${((i % 5) - 2) * 22}px`,
              width: `${2 + (i % 3)}px`,
              height: `${2 + (i % 3)}px`,
              opacity: 0.35 + (i % 4) * 0.18
            }}
          />
        ))}
      </div>

      {/* Floating Sacred Emblems */}
      <div className="float-obj" style={{ top: '16%', left: '4%', fontSize: '46px', '--bob': '4.5s' }}>🪔</div>
      <div className="float-obj" style={{ top: '68%', left: '3%', fontSize: '32px', '--bob': '5.5s', animationDelay: '1.2s' }}>🌸</div>
      <div className="float-obj" style={{ top: '15%', right: '6%', fontSize: '40px', '--bob': '5s', animationDelay: '0.6s', opacity: 0.28 }}>🔔</div>
      <div className="float-obj" style={{ top: '74%', right: '4%', fontSize: '36px', '--bob': '4.2s', animationDelay: '1.8s' }}>🪷</div>

      {/* Left Column: Hero Content */}
      <div className="hero-content">
        <div className="hero-badge">
          <div className="badge-dot"></div>
          <span>• Serving All Major Cities Since 2015</span>
        </div>

        <h1 className="hero-h1">
          Book Experienced<br />
          <span className="accent">North Indian Hindi Pandit</span><br />
          For Authentic Vedic Pujas
        </h1>

        <p className="hero-sub">
          For Grihapravesh, Satyanarayan Puja, Rudrabhishek, Ganesh Puja,<br />
          Marriage Puja &amp; all Hindu rituals — performed with authentic Vedic tradition.
        </p>

        {/* 2 Neat Trust Rows matching reference */}
        <div className="hero-trust-rows">
          <div className="trust-row">
            <span>⭐ 4.9/5 Rating</span>
            <span>🙏 15,000+ Happy Families</span>
            <span>📅 20+ Years Experience</span>
          </div>
          <div className="trust-row">
            <span>✅ 30+ Verified Pandits</span>
            <span>🎁 Samagri Included</span>
          </div>
        </div>
      </div>

      {/* Right Column: Luxury Glass Consultation Form matching reference */}
      <div className="hero-form-wrap">
        <div className="form-card">
          <div className="form-header">
            <div className="form-om">ॐ</div>
            <div className="form-title">Get Free Puja Consultation</div>
            <div className="form-sub">We'll call you back within 15 minutes</div>
          </div>

          {submitted ? (
            <div style={{ textAlign: 'center', padding: '16px 8px', color: 'white' }}>
              <div style={{ fontSize: '38px', marginBottom: '8px' }}>🙏</div>
              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '20px',
                  color: 'var(--gold-light)',
                  marginBottom: '6px'
                }}
              >
                Booking Request Received!
              </h3>
              <p
                style={{
                  fontSize: '12.5px',
                  color: 'rgba(255,255,255,0.9)',
                  marginBottom: '12px',
                  lineHeight: '1.5'
                }}
              >
                Thank you, <strong>{formData.name}</strong>! ID:{' '}
                <strong style={{ color: 'var(--gold-light)' }}>{bookingRef}</strong>
              </p>
              <a
                href={`https://wa.me/919019690392?text=${encodeURIComponent(
                  `Namaste! My booking ID is ${bookingRef}. Please confirm pandit availability for ${formData.puja_type}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-form-consult"
                style={{
                  display: 'inline-block',
                  textDecoration: 'none',
                  background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                  color: 'white',
                  padding: '9px 18px',
                  borderRadius: '8px'
                }}
              >
                💬 Chat on WhatsApp
              </a>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                style={{
                  marginTop: '10px',
                  background: 'transparent',
                  border: 'none',
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: '11px',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  display: 'block',
                  width: '100%'
                }}
              >
                Submit another inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>YOUR NAME</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>PHONE NUMBER</label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>TYPE OF PUJA</label>
                <select
                  value={formData.puja_type}
                  onChange={(e) => setFormData({ ...formData, puja_type: e.target.value })}
                  required
                >
                  <option value="Satyanarayan Puja">Satyanarayan Puja &amp; Katha</option>
                  <option value="Grihapravesh Puja">Grihapravesh Vastu Puja</option>
                  <option value="Rudrabhishek Puja">Maha Rudrabhishek</option>
                  <option value="Marriage / Vivah Puja">Marriage / Vivah Sanskar</option>
                  <option value="Ganesh Puja">Ganesh Puja &amp; Hawan</option>
                  <option value="Maha Lakshmi Puja">Maha Lakshmi &amp; Kuber Puja</option>
                  <option value="Office Opening Puja">Office / Shop Opening Puja</option>
                  <option value="Navagraha Shanti Puja">Navagraha Shanti Puja</option>
                  <option value="Namkaran Sanskar">Namkaran Sanskar</option>
                  <option value="Maha Mrityunjaya Jaap">Maha Mrityunjaya Jaap &amp; Hawan</option>
                  <option value="Chandi Hawan">Chandi Hawan &amp; Durga Puja</option>
                  <option value="Any Other Custom Puja">Any Other Custom Puja &amp; Hawan</option>
                </select>
              </div>

              <div className="form-group">
                <label>CITY / LOCALITY</label>
                <select
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  required
                >
                  <option value="Bangalore">Bangalore (All Localities)</option>
                  <option value="Hyderabad">Hyderabad</option>
                  <option value="Pune">Pune</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Delhi-NCR">Delhi NCR</option>
                  <option value="Other City">Other City</option>
                </select>
              </div>

              <button type="submit" className="btn-form-consult" disabled={loading}>
                {loading ? 'Submitting...' : '🔥 Get Free Consultation'}
              </button>
            </form>
          )}

          <div className="form-trust-row">
            <span>🔒 100% Private</span>
            <span>⚡ Instant Callback</span>
            <span>✅ No Obligation</span>
          </div>
        </div>
      </div>
    </section>
  );
}
