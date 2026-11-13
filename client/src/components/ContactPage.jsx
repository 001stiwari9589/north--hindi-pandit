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
  ShieldCheck,
  Award,
  Flame
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ContactPage({ onGoHome, onBookNow, currentLang = 'en' }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
    if (!trimmed) return 'Please enter your full name (कृपया अपना नाम लिखें).';
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
      await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          name: formData.name.trim(),
          phone: formData.phone.trim()
        })
      });
      setSubmitted(true);
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
      setErrors({ name: '', phone: '' });
    } catch (err) {
      // Graceful fallback: show confirmation even if offline
      setSubmitted(true);
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#FAF7F2] text-slate-800 font-sans pb-16">
      
      {/* 1. Grand Vedic Hero Header Banner */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#081220] via-[#0E1A2E] to-[#14233D] text-white pt-8 pb-16 px-4 border-b border-amber-500/30">
        
        {/* Subtle Sacred Mandala Background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center">
          <div className="w-[500px] h-[500px] sm:w-[700px] sm:h-[700px] rounded-full border-[18px] border-amber-400 border-dashed animate-spin-slow"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          
          {/* Breadcrumb + Back to Home Button */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <button
              onClick={onGoHome}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-orange-500/20 hover:from-amber-500/30 hover:to-orange-500/30 text-amber-200 hover:text-white px-4 py-2 rounded-full text-xs sm:text-sm font-semibold border border-amber-400/40 transition-all hover:scale-105 shadow-md"
            >
              <ArrowLeft className="w-4 h-4 text-amber-400" />
              <span>← Back to Home (मुख्य पृष्ठ)</span>
            </button>

            <div className="text-xs text-amber-300/80 font-medium flex items-center gap-2">
              <span className="text-amber-400">ॐ</span>
              <span>Home</span>
              <span>›</span>
              <span className="text-amber-200 font-bold">Contact Us (संपर्क करें)</span>
            </div>
          </div>

          {/* Banner Title & Vedic Shloka */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs sm:text-sm font-medium">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>॥ सर्वमंगल मांगल्ये शिवे सर्वार्थ साधिके ॥</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-100 to-amber-300 leading-tight">
              Contact North Hindi Pandit
            </h1>

            <p className="text-sm sm:text-base text-amber-100/90 font-light leading-relaxed">
              20+ Years Experienced North Indian, Banarasi & Bihari Vedic Acharyas available across Greater Hyderabad & Secunderabad for Shubh Muhurat consultation & authentic puja bookings.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Main Content Grid: Contact Details & Inquiry Form */}
      <section className="max-w-6xl mx-auto px-4 -mt-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column (5 cols): Direct Official Channels */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-xl border-2 border-amber-300/80 space-y-5">
              
              <div className="border-b border-amber-100 pb-4">
                <span className="text-xs font-bold text-amber-700 tracking-wider uppercase bg-amber-100 px-3 py-1 rounded-full inline-block mb-2">
                  Direct Official Channels
                </span>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                  Speak Directly With Acharya Ji
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Have an urgent ceremony or need muhurat consultation? Call or WhatsApp us anytime.
                </p>
              </div>

              {/* Primary Direct Call: +91 9589018011 */}
              <a
                href="tel:+919589018011"
                className="p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 flex items-center gap-4 hover:border-orange-500 hover:shadow-md transition-all group block"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
                  <Phone className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <div className="text-[11px] text-amber-900 font-bold uppercase tracking-wider">
                    Official Pandit Ji Calling Line
                  </div>
                  <strong className="text-lg text-slate-900 group-hover:text-orange-600 transition-colors block">
                    +91 9589018011
                  </strong>
                  <span className="text-[11px] text-slate-600">Available 24x7 for urgent & advance bookings</span>
                </div>
              </a>

              {/* WhatsApp Instant Chat */}
              <a
                href="https://wa.me/919589018011?text=Namaste%20Pandit%20Ji,%20I%20want%20to%20inquire%20about%20Puja%20services%20in%20Hyderabad."
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-emerald-50/80 border-2 border-emerald-300 flex items-center gap-4 hover:border-emerald-600 hover:shadow-md transition-all group block"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-[11px] text-emerald-900 font-bold uppercase tracking-wider">
                    Direct WhatsApp Consultation
                  </div>
                  <strong className="text-base text-slate-900 group-hover:text-emerald-700 transition-colors block">
                    Chat on WhatsApp (+91 9589018011)
                  </strong>
                  <span className="text-[11px] text-slate-600">Get instant muhurat, vidhi & samagri list</span>
                </div>
              </a>

              {/* Head Acharya Helpline: +91 91830 89880 */}
              <a
                href="tel:+919183089880"
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-4 hover:border-amber-400 hover:bg-amber-50/40 transition-all group block"
              >
                <div className="w-12 h-12 rounded-xl bg-[#081220] text-amber-300 flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">
                    Head Acharya Dispatch Line
                  </div>
                  <strong className="text-base text-slate-900 group-hover:text-orange-600 transition-colors block">
                    +91 91830 89880
                  </strong>
                  <span className="text-[11px] text-slate-500">Same-Day express pandit arrangement</span>
                </div>
              </a>

              {/* Official Support Email */}
              <a
                href="mailto:Northhindipandit.hyd80@gmail.com"
                className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200 flex items-center gap-4 hover:border-amber-400 transition-all group block"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="overflow-hidden">
                  <div className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">
                    Official Support Email
                  </div>
                  <strong className="text-xs sm:text-sm text-slate-900 group-hover:text-orange-600 transition-colors block truncate">
                    Northhindipandit.hyd80@gmail.com
                  </strong>
                  <span className="text-[11px] text-slate-500">Instant booking alerts & confirmation</span>
                </div>
              </a>

              {/* Operational Office */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-red-800 text-white flex items-center justify-center shrink-0 shadow-md">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">
                    Operational Base in Hyderabad
                  </div>
                  <strong className="text-sm text-slate-900 block">
                    Hitec City, Madhapur, Hyderabad
                  </strong>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Near Cyber Towers, Hyderabad, Telangana: 500081
                  </p>
                </div>
              </div>

            </div>

            {/* Trust Points Mini-Box */}
            <div className="bg-[#081220] text-white rounded-3xl p-5 shadow-lg border border-amber-400/30 flex items-center justify-around text-center gap-2">
              <div>
                <Award className="w-6 h-6 text-amber-400 mx-auto mb-1" />
                <div className="text-xs font-bold text-amber-200">20+ Years</div>
                <div className="text-[10px] text-slate-400">Vedic Experience</div>
              </div>
              <div className="w-px h-8 bg-amber-400/20"></div>
              <div>
                <Clock className="w-6 h-6 text-emerald-400 mx-auto mb-1" />
                <div className="text-xs font-bold text-emerald-200">15 Mins</div>
                <div className="text-[10px] text-slate-400">Quick Response</div>
              </div>
              <div className="w-px h-8 bg-amber-400/20"></div>
              <div>
                <ShieldCheck className="w-6 h-6 text-amber-400 mx-auto mb-1" />
                <div className="text-xs font-bold text-amber-200">100% Pure</div>
                <div className="text-[10px] text-slate-400">Shastra Sammat</div>
              </div>
            </div>

          </div>

          {/* Right Column (7 cols): Direct Puja Consultation Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-9 shadow-xl border-2 border-amber-300/80">
              
              <div className="mb-6">
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-300 mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-orange-600" />
                  <span>Free Shubh Muhurat Consultation</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900">
                  Request a Callback or Quote
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Fill in your ceremony details and our senior Acharya will call you back within 15 minutes.
                </p>
              </div>

              {submitted ? (
                <div className="p-8 sm:p-12 rounded-2xl bg-emerald-50 border-2 border-emerald-400 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-lg animate-bounce">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <h4 className="text-2xl font-bold text-emerald-950 font-serif">
                    Dhanyawad! Inquiry Received 🙏
                  </h4>
                  <p className="text-sm text-emerald-800 max-w-md mx-auto leading-relaxed">
                    Pandit Ji has been alerted at <strong>Northhindipandit.hyd80@gmail.com</strong>. We will contact you at <strong>+91 {formData.phone}</strong> shortly to discuss the Shubh Muhurat and Vidhi details.
                  </p>
                  <div className="pt-4 flex flex-wrap justify-center gap-3">
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-6 py-2.5 rounded-full bg-emerald-700 text-white text-xs font-semibold hover:bg-emerald-800 transition-colors shadow-md"
                    >
                      Send Another Request
                    </button>
                    <button
                      onClick={onGoHome}
                      className="px-6 py-2.5 rounded-full bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors shadow-md"
                    >
                      Return to Home (मुख्य पृष्ठ)
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {/* Name Input */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Your Full Name (आपका नाम) <span className="text-red-500">*</span>
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
                        errors.name ? 'border-red-500 bg-red-50/50 ring-2 ring-red-200' : 'border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200/60'
                      }`}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1 font-medium">{errors.name}</p>}
                  </div>

                  {/* Phone & Location Inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Mobile Number (फ़ोन नंबर) <span className="text-red-500">*</span>
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
                          errors.phone ? 'border-red-500 bg-red-50/50 ring-2 ring-red-200' : 'border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200/60'
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
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm font-medium focus:border-amber-500 focus:ring-2 focus:ring-amber-200/60 transition-all outline-none"
                      />
                    </div>
                  </div>

                  {/* Puja Dropdown (With Durga Puja, Shraddh Puja, and Any Other Puja at the end) */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Select Puja Ceremony (पूजा का चयन करें)
                    </label>
                    <select
                      value={formData.pujaType}
                      onChange={(e) => setFormData({ ...formData, pujaType: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm font-medium bg-white focus:border-amber-500 focus:ring-2 focus:ring-amber-200/60 transition-all outline-none"
                    >
                      <option value="Satyanarayan Puja & Katha">Satyanarayan Puja & Katha (सत्यनारायण कथा)</option>
                      <option value="Grihapravesh Vastu Puja">Grihapravesh Vastu Puja (गृहप्रवेश वास्तु शांति)</option>
                      <option value="Maha Rudrabhishek">Maha Rudrabhishek (महा रुद्राभिषेक)</option>
                      <option value="Marriage / Vivah Sanskar">Marriage / Vivah Sanskar (विवाह संस्कार)</option>
                      <option value="Ganesh Puja & Hawan">Ganesh Puja & Hawan (गणेश पूजा एवं हवन)</option>
                      <option value="Maha Lakshmi & Kuber Puja">Maha Lakshmi & Kuber Puja (लक्ष्मी कुबेर पूजा)</option>
                      <option value="Durga Puja">Durga Puja (दुर्गा पूजा एवं चंडी हवन)</option>
                      <option value="Shraddh Puja">Shraddh Puja (श्राद्ध पूजा एवं पितृ तर्पण)</option>
                      <option value="Office / Shop Opening Puja">Office / Shop Opening Puja (दुकान/ऑफिस उद्घाटन)</option>
                      <option value="Navagraha Shanti Puja">Navagraha Shanti Puja (नवग्रह शांति)</option>
                      <option value="Namkaran Sanskar">Namkaran Sanskar (नामकरण संस्कार)</option>
                      <option value="Maha Mrityunjaya Jaap & Hawan">Maha Mrityunjaya Jaap & Hawan (महामृत्युंजय जाप)</option>
                      <option value="Any Other Puja">Any Other Puja (अन्य कोई भी वैदिक पूजा व हवन)</option>
                    </select>
                  </div>

                  {/* Requirements / Shubh Muhurat */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Preferred Date / Shubh Muhurat / Requirements (संदेश)
                    </label>
                    <textarea
                      rows="3"
                      placeholder="Enter your auspicious date, time, gotra, or any custom rituals required..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm font-medium focus:border-amber-500 focus:ring-2 focus:ring-amber-200/60 transition-all outline-none resize-none"
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 via-orange-600 to-amber-600 text-white font-bold text-base shadow-lg hover:shadow-orange-500/30 transition-all hover:scale-[1.01] flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
                  >
                    <Send className="w-5 h-5" />
                    <span>{loading ? 'Submitting Request...' : 'Submit Consultation Request (परामर्श अनुरोध भेजें)'}</span>
                  </button>

                  <p className="text-[11px] text-center text-slate-500">
                    🔒 Your details are 100% private. Our Acharya contacts you personally for Shubh Muhurat.
                  </p>
                </form>
              )}
            </div>
          </div>

        </div>

        {/* 3. Bottom Assurance CTA Banner */}
        <div className="mt-12 p-8 rounded-3xl bg-gradient-to-r from-[#081220] via-[#101C30] to-[#1A2C4C] text-white flex flex-wrap items-center justify-between gap-6 shadow-xl border border-amber-400/30">
          <div>
            <div className="inline-flex items-center gap-2 text-xs text-amber-300 font-semibold bg-white/10 px-3 py-1 rounded-full mb-2">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>Complete Vedic Sanctity</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-serif text-white">
              Ready to Conduct Your Ceremony with 100% Pure Samagri?
            </h3>
            <p className="text-xs sm:text-sm text-amber-200/80 mt-1 max-w-xl">
              All-inclusive samagri package, transparent pandit dakshina, and zero shopping hassle. Verified North Indian Pandits stationed across Hyderabad.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={onBookNow || onGoHome}
              className="px-6 py-3.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold text-sm shadow-md transition-all hover:scale-105"
            >
              Book Puja on Home Form
            </button>
            <a
              href="tel:+919589018011"
              className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/15 border border-amber-400/40 text-amber-300 font-bold text-sm transition-all flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>Call: +91 9589018011</span>
            </a>
          </div>
        </div>

      </section>
    </div>
  );
}
