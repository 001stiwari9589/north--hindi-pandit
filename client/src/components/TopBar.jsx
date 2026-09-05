import React from 'react';
import { Phone, Mail, MapPin, Globe, Sparkles } from 'lucide-react';

export default function TopBar({ lang, setLang }) {
  return (
    <div className="bg-gradient-to-r from-red-900 via-amber-900 to-red-900 text-amber-100 text-xs sm:text-sm py-2 px-4 border-b border-amber-600/40">
      <div className="container-custom flex flex-wrap justify-between items-center gap-2">
        {/* Contact info */}
        <div className="flex items-center flex-wrap gap-4 sm:gap-6">
          <a
            href="tel:+919019690392"
            className="flex items-center gap-1.5 hover:text-amber-300 transition-colors font-medium"
          >
            <Phone className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>+91 9019690392</span>
          </a>
          <a
            href="mailto:info@tathastupuja.in"
            className="hidden sm:flex items-center gap-1.5 hover:text-amber-300 transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-amber-400" />
            <span>info@tathastupuja.in</span>
          </a>
          <div className="hidden md:flex items-center gap-1.5 text-amber-200/80">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>Whitefield, Bangalore & Pan-India</span>
          </div>
        </div>

        {/* Right features & Language toggle */}
        <div className="flex items-center gap-3 sm:gap-4 ml-auto">
          <div className="hidden lg:flex items-center gap-1 text-amber-300 font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>20+ Years Vedic Legacy | Hassle-Free Samagri</span>
          </div>

          <button
            onClick={() => setLang(lang === 'hi' ? 'en' : 'hi')}
            className="flex items-center gap-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-500/40 px-2.5 py-1 rounded-full text-xs font-medium transition-all"
            title="भाषा बदलें (Toggle Language)"
          >
            <Globe className="w-3 h-3 text-amber-400" />
            <span>{lang === 'hi' ? 'English' : 'हिंदी में देखें'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
