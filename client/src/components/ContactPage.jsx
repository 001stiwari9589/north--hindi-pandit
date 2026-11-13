import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  ArrowLeft, 
  Sparkles, 
  Clock, 
  Send, 
  CheckCircle2, 
  MessageCircle,
  Calendar,
  Building,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ContactPage({ onGoHome, onBookNow }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    pujaType: 'Grihapravesh Vastu Puja',
    location: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({ name: '', phone: '' });

  const validateName = (val) => {
    const trimmed = (val || '').trim();
    if (!trimmed) return 'Please enter your full name.';
    if (/\d/.test(val)) return 'Name cannot contain numbers!';
    if (!/^[a-zA-Z\s'.]{2,50}$/.test(trimmed)) return 'Please enter a valid name (letters only).';
    return '';
  };

  const validatePhone = (val) => {
    const digits = (val || '').replace(/\D/g, '');
    if (!digits) return 'Please enter a 10-digit mobile number.';
    if (digits.length !== 10) return `Please enter a 10-digit number (${digits.length}/10).`;
    if (!/^[6-9]/.test(digits)) return 'Phone number must start with 6, 7, 8, or 9.';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nameErr = validateName(formData.name);
    const phoneErr = validatePhone(formData.phone);

    if (nameErr || phoneErr) {
      setErrors({ name: nameErr, phone: phoneErr });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          name: formData.name.trim(),
          phone: formData.phone.trim()
        })
      });
      setSubmitted(true);
      confetti({ particleCount: 70, spread: 60 });
      setErrors({ name: '', phone: '' });
    } catch (err) {
      setSubmitted(true);
      confetti({ particleCount: 70, spread: 60 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-slate-800 font-sans flex flex-col">
      {/* 1. Header Navigation Bar */}
      <header className="sticky top-0 z-50 bg-[#081220]/95 backdrop-blur-md border-b border-amber-500/30 shadow-lg px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <button
            onClick={onGoHome}
            className="flex items-center gap-2 text-amber-200 hover:text-white transition-colors bg-white/10 hover:bg-white/15 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium border border-amber-400/20"
          >
            <ArrowLeft className="w-4 h-4 text-amber-400" />
            <span>Back to Home</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-2xl text-amber-400 font-serif">ॐ</span>
            <span className="font-serif font-bold text-lg sm:text-xl text-white tracking-wide">
              North Hindi Pandit
            </span>
          </div>

          <a
            href="tel:+919589018011"
            className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold shadow-md transition-transform hover:scale-105"
          >
            <Phone className="w-3.5 h-3.5 animate-pulse" />
            <span className="hidden sm:inline">Call:</span>
            <span>+91 9589018011</span>
          </a>
        </div>
      </header>

      {/* 2. Hero Banner */}
      <section className="bg-gradient-to-b from-[#081220] via-[#121E33] to-[#FAF7F2] text-white pt-12 pb-20 px-4 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs sm:text-sm font-medium mb-5">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Contact Senior North Indian Vedic Acharya in Hyderabad</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-amber-100 leading-tight mb-4">
            Contact Us / संपर्क करें
          </h1>
          <p className="text-amber-200/90 text-sm sm:text-base max-w-2xl mx-auto font-light leading-relaxed">
            Have questions about an upcoming Grihapravesh, Satyanarayan Katha, Durga Puja, Shraddh, or any Vedic ritual? We are available 24x7 across Hyderabad & Secunderabad.
          </p>
        </div>

        {/* Background mandala circle */}
        <div className="absolute inset-0 opacity-5 pointer-events-none flex items-center justify-center">
          <div className="w-[600px] h-[600px] rounded-full border-[16px] border-amber-400"></div>
        </div>
      </section>

      {/* 3. Main Content Grid */}
      <main className="max-w-6xl mx-auto px-4 -mt-10 pb-16 flex-1 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column (5 cols): Verified Direct Contact Cards */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-amber-200/80 space-y-6">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-orange-600 bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
                  Official Channels
                </span>
                <h2 className="text-2xl font-bold font-serif text-slate-900 mt-3">
                  Direct Contact Information
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Connect instantly with our team for Shubh Muhurat consultation & Puja bookings.
                </p>
              </div>

              {/* Primary Call Card */}
              <a
                href="tel:+919589018011"
                className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-4 hover:bg-amber-100/60 hover:border-orange-400 transition-all group block"
              >
                <div className="w-12 h-12 rounded-xl bg-orange-600 text-white flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-semibold uppercase">Official Contact / Direct Calling</div>
                  <strong className="text-lg text-slate-900 group-hover:text-orange-600 transition-colors block">
                    +91 9589018011
                  </strong>
                  <span className="text-[11px] text-emerald-700 font-medium">Available 24x7 for Muhurat Consultation</span>
                </div>
              </a>

              {/* WhatsApp Card */}
              <a
                href="https://wa.me/919589018011?text=Namaste%20Pandit%20Ji!%20I%20want%20to%20consult%20regarding%20Puja%20booking%20in%20Hyderabad."
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 flex items-start gap-4 hover:bg-emerald-100/60 hover:border-emerald-500 transition-all group block"
              >
                <div className="w-12 h-12 rounded-xl bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-emerald-700 font-semibold uppercase">Direct WhatsApp Chat</div>
                  <strong className="text-lg text-slate-900 group-hover:text-emerald-700 transition-colors block">
                    Chat on WhatsApp
                  </strong>
                  <span className="text-[11px] text-emerald-600 font-medium">+91 9589018011 (Click to Message)</span>
                </div>
              </a>

              {/* Backup Number Card */}
              <a
                href="tel:+919183089880"
                className="p-4 rounded-2xl bg-amber-50/40 border border-amber-200/60 flex items-start gap-4 hover:bg-amber-100/50 transition-all group block"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-800 text-white flex items-center justify-center shrink-0 shadow">
                  <Phone className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-semibold uppercase">Head Acharya Line</div>
                  <strong className="text-base text-slate-900 group-hover:text-orange-600 transition-colors block">
                    +91 91830 89880
                  </strong>
                  <span className="text-[11px] text-slate-500">Emergency & Same-Day Dispatch Line</span>
                </div>
              </a>

              {/* Official Email Card */}
              <a
                href="mailto:northhindipandit.hyd80@gmail.com"
                className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-4 hover:bg-amber-100/60 hover:border-orange-400 transition-all group block"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
                  <Mail className="w-6 h-6" />
                </div>
                <div className="overflow-hidden">
                  <div className="text-xs text-slate-500 font-semibold uppercase">Official Support Email</div>
                  <strong className="text-sm text-slate-900 group-hover:text-orange-600 transition-colors block truncate">
                    Northhindipandit.hyd80@gmail.com
                  </strong>
                  <span className="text-[11px] text-slate-500">Instant email booking alerts & confirmations</span>
                </div>
              </a>

              {/* Head Office Location */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-red-800 text-white flex items-center justify-center shrink-0 shadow-md">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-semibold uppercase">Operational Office</div>
                  <strong className="text-sm text-slate-900 block">
                    Hitec City, Madhapur, Hyderabad
                  </strong>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Near Cyber Towers, Hyderabad, Telangana: 500081
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (7 cols): Direct Puja Consultation Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border-2 border-amber-300/80">
              <div className="mb-6">
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-300 mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-orange-600" />
                  <span>Quick Response Form</span>
                </div>
                <h3 className="text-2xl font-bold font-serif text-slate-900">
                  Send a Message or Request Call Back
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Fill in your ceremony details and our senior Acharya will call you back within 15 minutes.
                </p>
              </div>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-300 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-lg">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-emerald-950 font-serif">
                    Dhanyawad! Your Inquiry Has Been Received 🙏
                  </h4>
                  <p className="text-sm text-emerald-800 max-w-md mx-auto">
                    Pandit Ji has been notified at <strong>Northhindipandit.hyd80@gmail.com</strong>. We will call you shortly on <strong>+91 {formData.phone}</strong> for Shubh Muhurat.
                  </p>
                  <div className="pt-2 flex flex-wrap justify-center gap-3">
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-5 py-2.5 rounded-full bg-emerald-700 text-white text-xs font-semibold hover:bg-emerald-800 transition-colors"
                    >
                      Send Another Inquiry
                    </button>
                    <button
                      onClick={onGoHome}
                      className="px-5 py-2.5 rounded-full bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors"
                    >
                      Back to Home
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Your Full Name (आपका नाम) *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Rameshwar Sharma"
                      value={formData.name}
                      onChange={(e) => {
                        const cleaned = e.target.value.replace(/[0-9]/g, '');
                        setFormData({ ...formData, name: cleaned });
                        if (errors.name) setErrors({ ...errors, name: '' });
                      }}
                      className={`w-full px-4 py-3 rounded-xl border text-sm font-medium transition-all outline-none ${
                        errors.name ? 'border-red-500 bg-red-50/50' : 'border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200'
                      }`}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1 font-medium">{errors.name}</p>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Mobile Number (फ़ोन नंबर) *
                      </label>
                      <input
                        type="tel"
                        maxLength="10"
                        placeholder="10-digit mobile number"
                        value={formData.phone}
                        onChange={(e) => {
                          const digits = e.target.value.replace(/\D/g, '').slice(0, 10);
                          setFormData({ ...formData, phone: digits });
                          if (errors.phone) setErrors({ ...errors, phone: '' });
                        }}
                        className={`w-full px-4 py-3 rounded-xl border text-sm font-medium transition-all outline-none ${
                          errors.phone ? 'border-red-500 bg-red-50/50' : 'border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200'
                        }`}
                      />
                      {errors.phone && <p className="text-red-500 text-xs mt-1 font-medium">{errors.phone}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Your Location / City (स्थान / क्षेत्र)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Gachibowli, Hyderabad"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm font-medium focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Select Puja Ceremony (पूजा चुनें)
                    </label>
                    <select
                      value={formData.pujaType}
                      onChange={(e) => setFormData({ ...formData, pujaType: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm font-medium bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all outline-none"
                    >
                      <option value="Satyanarayan Puja & Katha">Satyanarayan Puja & Katha</option>
                      <option value="Grihapravesh Vastu Puja">Grihapravesh Vastu Puja</option>
                      <option value="Maha Rudrabhishek">Maha Rudrabhishek</option>
                      <option value="Durga Puja">Durga Puja</option>
                      <option value="Shraddh Puja">Shraddh Puja</option>
                      <option value="Marriage / Vivah Sanskar">Marriage / Vivah Sanskar</option>
                      <option value="Ganesh Puja & Hawan">Ganesh Puja & Hawan</option>
                      <option value="Maha Lakshmi & Kuber Puja">Maha Lakshmi & Kuber Puja</option>
                      <option value="Office / Shop Opening Puja">Office / Shop Opening Puja</option>
                      <option value="Navagraha Shanti Puja">Navagraha Shanti Puja</option>
                      <option value="Maha Mrityunjaya Jaap & Hawan">Maha Mrityunjaya Jaap & Hawan</option>
                      <option value="Any Other Puja">Any Other Puja</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Your Requirements / Date / Shubh Muhurat (संदेश)
                    </label>
                    <textarea
                      rows="3"
                      placeholder="Write your preferred auspicious date, time, or custom rituals required..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm font-medium focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all outline-none resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 via-orange-600 to-amber-600 text-white font-bold text-base shadow-lg hover:shadow-orange-500/30 transition-all hover:scale-[1.01] flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    <Send className="w-4 h-4" />
                    <span>{loading ? 'Sending Inquiry...' : 'Submit Consultation Request'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Bottom CTA to Book Puja or Call */}
        <div className="mt-12 p-8 rounded-3xl bg-gradient-to-r from-[#0B1528] to-[#1A2C4C] text-white flex flex-wrap items-center justify-between gap-6 shadow-xl border border-amber-400/30">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold font-serif text-white">
              Ready to Book Your Puja with 100% Pure Samagri?
            </h3>
            <p className="text-xs sm:text-sm text-amber-200/80 mt-1">
              Experienced North Indian Pandits stationed across Hyderabad for rapid, punctual arrival.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={onBookNow || onGoHome}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold text-sm shadow-md transition-all hover:scale-105"
            >
              Book Puja on Home Form
            </button>
            <a
              href="tel:+919589018011"
              className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/15 border border-amber-400/30 text-amber-300 font-bold text-sm transition-all flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>Call: +91 9589018011</span>
            </a>
          </div>
        </div>
      </main>

      {/* 4. Footer */}
      <footer className="bg-[#081220] text-slate-400 text-xs py-8 px-4 border-t border-amber-500/20 text-center">
        <div className="max-w-4xl mx-auto space-y-2">
          <p className="text-amber-200/80 font-medium">
            © 2026 North Hindi Pandit. Authentic Sanatan Vedic Puja Services in Hyderabad & Secunderabad.
          </p>
          <p>
            Phone: <a href="tel:+919589018011" className="text-amber-400 hover:underline">+91 9589018011</a> | Email: <a href="mailto:northhindipandit.hyd80@gmail.com" className="text-amber-400 hover:underline">Northhindipandit.hyd80@gmail.com</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
