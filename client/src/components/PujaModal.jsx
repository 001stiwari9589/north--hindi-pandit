import React from 'react';
import { X, Clock, Users, CheckCircle2, Sparkles, Phone, ArrowRight, ShieldCheck } from 'lucide-react';

export default function PujaModal({ puja, onClose, onBookPuja }) {
  if (!puja) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border-2 border-amber-300 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-colors shadow-md"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Banner with Image */}
        <div className="relative h-60 sm:h-72 overflow-hidden">
          <img
            src={puja.image}
            alt={puja.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          <div className="absolute bottom-4 left-6 right-6 text-white">
            <span className="bg-amber-500 text-amber-950 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {puja.badge}
            </span>
            <h2 className="font-vedic text-2xl sm:text-3xl font-bold mt-2">
              {puja.name}
            </h2>
            <p className="text-amber-200 text-sm font-medium font-vedic">
              {puja.hindiName}
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-amber-50/80 p-3.5 rounded-2xl border border-amber-200">
            <div>
              <span className="text-[11px] text-slate-500 block">Duration</span>
              <strong className="text-xs sm:text-sm text-slate-900 flex items-center gap-1 mt-0.5">
                <Clock className="w-3.5 h-3.5 text-orange-600" />
                {puja.duration}
              </strong>
            </div>
            <div>
              <span className="text-[11px] text-slate-500 block">Acharyas</span>
              <strong className="text-xs sm:text-sm text-slate-900 flex items-center gap-1 mt-0.5">
                <Users className="w-3.5 h-3.5 text-orange-600" />
                {puja.pandits.split(' ')[0]} Pandit Ji
              </strong>
            </div>
            <div>
              <span className="text-[11px] text-slate-500 block">Pandit Dakshina</span>
              <strong className="text-xs sm:text-sm text-orange-700 block mt-0.5">
                ₹{puja.price}
              </strong>
            </div>
            <div>
              <span className="text-[11px] text-slate-500 block">With All Samagri</span>
              <strong className="text-xs sm:text-sm text-emerald-700 block mt-0.5">
                ₹{puja.priceWithSamagri}
              </strong>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="font-vedic text-lg font-bold text-slate-900 mb-1.5">
              Significance & Spiritual Importance
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed">
              {puja.description}
            </p>
          </div>

          {/* Key Benefits */}
          {puja.benefits && (
            <div>
              <h4 className="font-vedic text-lg font-bold text-slate-900 mb-2">
                Divine Benefits & Blessings
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {puja.benefits.map((b, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 bg-orange-50/50 p-2.5 rounded-xl border border-orange-100">
                    <CheckCircle2 className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step by Step Vidhi */}
          <div>
            <h4 className="font-vedic text-lg font-bold text-slate-900 mb-2">
              Vedic Ritual Procedures
            </h4>
            <div className="space-y-2">
              {puja.vidhiHighlights.map((v, i) => (
                <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                  <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-900 font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5 border border-amber-300">
                    {i + 1}
                  </div>
                  <span>{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Samagri Included List */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-vedic text-lg font-bold text-slate-900">
                100% Pure Sacred Samagri Included
              </h4>
              <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-semibold border border-emerald-200">
                Pure & Authentic Vedic Samagri
              </span>
            </div>
            <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-200/70">
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-700">
                {puja.samagriIncluded.map((s, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
              <p className="text-[11px] text-slate-500 mt-3 pt-2 border-t border-amber-200/60 italic">
                * Note: Fresh flowers, fruits, and milk/curd for prasad can be arranged by devotee or requested additionally.
              </p>
            </div>
          </div>

          {/* Modal Actions */}
          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs text-slate-500 block">Total Package Starting</span>
              <div className="flex items-baseline gap-2">
                <span className="font-vedic text-2xl font-bold text-orange-700">₹{puja.price}</span>
                <span className="text-xs text-slate-500">| Complete with Samagri ₹{puja.priceWithSamagri}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <a
                href="tel:+919589018011"
                className="btn-vedic-outline px-4 py-3 text-xs sm:text-sm w-full sm:w-auto text-center"
              >
                <Phone className="w-4 h-4 text-orange-600" />
                <span>Call For Muhurat (+91 95890 18011)</span>
              </a>

              <button
                onClick={() => {
                  onClose();
                  onBookPuja(puja);
                }}
                className="btn-vedic-primary px-6 py-3 text-xs sm:text-sm w-full sm:w-auto font-bold shadow-lg"
              >
                <span>Book This Puja Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
