import React, { useEffect } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  CheckCircle2, 
  ArrowLeft, 
  Calendar, 
  ShieldCheck, 
  Award, 
  Sparkles, 
  Clock, 
  HeartHandshake, 
  BookOpen,
  MessageCircle,
  Flame,
  Star
} from 'lucide-react';

export default function AboutPage({ onGoHome, onBookNow }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
            <span>Dedicated Vedic Services in Hyderabad & Secunderabad</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-amber-100 leading-tight mb-4">
            About North Hindi Pandit
          </h1>
          <p className="text-amber-200/90 text-sm sm:text-base max-w-2xl mx-auto font-light leading-relaxed">
            Preserving 20+ years of Sanatan Vedic traditions, pure Sanskrit mantra uccharan, and heartfelt spiritual rituals for every devotee family across Greater Hyderabad.
          </p>
        </div>

        {/* Background decorative mandala subtle overlay */}
        <div className="absolute inset-0 opacity-5 pointer-events-none flex items-center justify-center">
          <div className="w-[600px] h-[600px] rounded-full border-[16px] border-amber-400"></div>
        </div>
      </section>

      {/* 3. Main Content Cards */}
      <main className="max-w-5xl mx-auto px-4 -mt-10 pb-16 space-y-10 flex-1 relative z-20">
        
        {/* Card 1: Our Sacred Mission & Story */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-amber-200/80">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-white flex items-center justify-center shadow-md">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif">
                Our Heritage & Sacred Mission
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">Authentic Sanatan Rituals Conducted as per Holy Shastras</p>
            </div>
          </div>

          <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
            <p>
              Welcome to <strong>North Hindi Pandit</strong> — Hyderabad’s most trusted and dedicated platform for authentic North Indian, Banarasi, Bihari, and Hindi Vedic Puja ceremonies.
            </p>
            <p>
              Founded with the sacred vision to make traditional Sanatan rituals easily accessible to North Indian families living in Hyderabad, our team comprises highly learned Vedic Acharyas and Brahmins educated in premier Gurukuls of <strong>Kashi (Varanasi), Ayodhya, and Haridwar</strong>.
            </p>
            <p>
              We firmly believe that every ritual is not merely a formality, but a bridge to divine energy, peace, and auspiciousness for your home and workplace. That is why our Pandits recite each Sanskrit shloka with precise pronunciation (Vaidik Uccharan) and explain the inner meaning of the Katha and Hawan in pure, easy Hindi so the entire family connects with the divine experience.
            </p>
          </div>

          {/* Key Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-6 border-t border-slate-100">
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/70 text-center">
              <ShieldCheck className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <h3 className="font-bold text-slate-900 text-sm">100% Shastra Sammat</h3>
              <p className="text-xs text-slate-600 mt-1">Conducted strictly according to Vedic scriptures & Shubh Muhurat.</p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/70 text-center">
              <Flame className="w-8 h-8 text-amber-600 mx-auto mb-2" />
              <h3 className="font-bold text-slate-900 text-sm">Pure Organic Samagri</h3>
              <p className="text-xs text-slate-600 mt-1">Desi cow ghee, sacred mango wood, herbs, and pristine hawan essentials.</p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/70 text-center">
              <HeartHandshake className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
              <h3 className="font-bold text-slate-900 text-sm">Hassle-Free & Punctual</h3>
              <p className="text-xs text-slate-600 mt-1">Pandit Ji arrives on time at your doorstep with complete preparation.</p>
            </div>
          </div>
        </div>

        {/* Card 2: Contact Details & Official Channel (Prominently Featuring +91 9589018011) */}
        <div className="bg-gradient-to-br from-[#0B1528] to-[#162744] text-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-amber-400/40 relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-900 flex items-center justify-center shadow-lg font-bold">
                <Phone className="w-6 h-6 text-slate-900" />
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-300">Direct Contact & Support</span>
                <h2 className="text-xl sm:text-2xl font-bold font-serif text-white">
                  Get in Touch with Pandit Ji
                </h2>
              </div>
            </div>

            <p className="text-amber-100/80 text-sm sm:text-base mb-8 max-w-2xl leading-relaxed">
              Have an upcoming Grihapravesh, Satyanarayan Katha, Marriage, or Hawan? Need to consult for an auspicious Shubh Muhurat? Reach out to us directly through call, WhatsApp, or official email:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Phone Card */}
              <a
                href="tel:+919589018011"
                className="p-5 rounded-2xl bg-white/10 hover:bg-white/15 border border-amber-400/30 flex items-center gap-4 transition-all group block"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 text-white flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-amber-300 font-semibold uppercase">Official Contact / Direct Call</div>
                  <strong className="text-lg sm:text-xl text-white group-hover:text-amber-300 transition-colors block">
                    +91 9589018011
                  </strong>
                  <span className="text-[11px] text-emerald-400 font-medium">Available 24x7 for Shubh Muhurat</span>
                </div>
              </a>

              {/* WhatsApp Card */}
              <a
                href="https://wa.me/919589018011?text=Namaste%20Pandit%20Ji!%20I%20want%20to%20consult%20regarding%20Puja%20booking%20in%20Hyderabad."
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-2xl bg-emerald-950/40 hover:bg-emerald-900/40 border border-emerald-400/40 flex items-center gap-4 transition-all group block"
              >
                <div className="w-12 h-12 rounded-xl bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-emerald-300 font-semibold uppercase">Instant WhatsApp Chat</div>
                  <strong className="text-lg sm:text-xl text-white group-hover:text-emerald-300 transition-colors block">
                    Chat on WhatsApp
                  </strong>
                  <span className="text-[11px] text-emerald-300 font-medium">+91 9589018011 (Click to Chat)</span>
                </div>
              </a>

              {/* Email Card */}
              <a
                href="mailto:northhindipandit.hyd80@gmail.com"
                className="p-5 rounded-2xl bg-white/10 hover:bg-white/15 border border-amber-400/30 flex items-center gap-4 transition-all group block"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
                  <Mail className="w-6 h-6" />
                </div>
                <div className="overflow-hidden">
                  <div className="text-xs text-amber-300 font-semibold uppercase">Official Email</div>
                  <strong className="text-sm sm:text-base text-white group-hover:text-amber-300 transition-colors block truncate">
                    Northhindipandit.hyd80@gmail.com
                  </strong>
                  <span className="text-[11px] text-slate-300">Fast response within a few hours</span>
                </div>
              </a>

              {/* Operational Hub Address Card */}
              <div className="p-5 rounded-2xl bg-white/10 border border-amber-400/30 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-red-700 text-white flex items-center justify-center shrink-0 shadow-md">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-amber-300 font-semibold uppercase">Operational Headquarters</div>
                  <strong className="text-sm sm:text-base text-white block">
                    Hitec City, Madhapur, Hyderabad
                  </strong>
                  <p className="text-[11px] text-slate-300 mt-0.5">
                    Near Cyber Towers, Hyderabad, Telangana: 500081
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Areas & Localities Served in Greater Hyderabad */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-amber-200/80">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-white flex items-center justify-center shadow-md">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif">
                Localities Served in Greater Hyderabad
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">Punctual doorstep arrival across all major IT corridors & residential zones</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 text-xs sm:text-sm">
            {[
              'Gachibowli',
              'Hitec City',
              'Madhapur',
              'Kondapur',
              'Kukatpally & KPHB',
              'Miyapur',
              'Chandanagar',
              'Nallagandla & Tellapur',
              'Manikonda & Narsingi',
              'Jubilee Hills',
              'Banjara Hills',
              'Secunderabad',
              'Begumpet & Bowenpally',
              'Alwal & Sainikpuri',
              'Kompally & Bachupally',
              'Uppal & LB Nagar'
            ].map((area) => (
              <div key={area} className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200/70 text-slate-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="font-medium truncate">{area}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Card 4: Major Puja Ceremonies */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-amber-200/80">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-white flex items-center justify-center shadow-md">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif">
                Specialized Vedic Puja Services
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">Complete Vidhi with full samagri packages</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { title: 'Grihapravesh & Vastu Puja', desc: 'Navagraha Hawan, Vastu Dosh Shanti, and auspicious milk boiling vidhi.' },
              { title: 'Satyanarayan Katha & Hawan', desc: 'Sacred Shri Satyanarayan Bhagwan 5-adhyay Katha in Hindi with sweet prasad.' },
              { title: 'Maha Rudrabhishek', desc: 'Powerful Shivling Abhishek with 11 Dravyas, Bilva Patra and Mahamrityunjaya chants.' },
              { title: 'Vivah Sanskar & Saat Phere', desc: 'Traditional Vedic wedding ceremony with Saptapadi and Kanyadaan rituals.' },
              { title: 'Office & Business Opening', desc: 'Maha Lakshmi, Ganesha & Kuber pujan for commercial prosperity.' },
              { title: 'Navagraha & Havan Pujas', desc: 'Dosha nivaran, planetary balance, and life-protection sacred yajnas.' }
            ].map((p, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-amber-50/40 border border-amber-200/60 hover:border-orange-400 transition-colors">
                <h3 className="font-bold text-slate-900 text-sm mb-1">{p.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>

          {/* Action CTA */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
            <button
              onClick={onBookNow || onGoHome}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-500 via-orange-600 to-amber-600 text-white font-bold text-sm sm:text-base shadow-lg hover:shadow-orange-500/30 transition-all hover:scale-105 flex items-center justify-center gap-2"
            >
              <span>Book a Puja Consultation</span>
              <Sparkles className="w-4 h-4" />
            </button>

            <a
              href="tel:+919589018011"
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm sm:text-base text-center transition-all flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-amber-400" />
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

