import React, { useState } from 'react';
import { PUJA_LIST } from '../data/pujaData';
import { Calculator as CalcIcon, Check, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export default function Calculator({ onProceedToBook }) {
  const [selectedPujaId, setSelectedPujaId] = useState(PUJA_LIST[0].id);
  const [withSamagri, setWithSamagri] = useState(true);
  const [addOns, setAddOns] = useState({
    garlands: false,
    hawanKund: false,
    extraPandit: false
  });

  const selectedPuja = PUJA_LIST.find((p) => p.id === selectedPujaId) || PUJA_LIST[0];

  const basePrice = withSamagri ? selectedPuja.priceWithSamagri : selectedPuja.price;
  const garlandPrice = addOns.garlands ? 450 : 0;
  const hawanKundPrice = addOns.hawanKund ? 550 : 0;
  const extraPanditPrice = addOns.extraPandit ? 1500 : 0;

  const totalPrice = basePrice + garlandPrice + hawanKundPrice + extraPanditPrice;

  const handleProceed = () => {
    onProceedToBook({
      pujaName: selectedPuja.name,
      samagriOption: withSamagri ? 'with-samagri' : 'pandit-only',
      estimatedPrice: totalPrice,
      notes: `Add-ons: ${addOns.garlands ? 'Flowers/Garlands, ' : ''}${addOns.hawanKund ? 'Special Hawan Kund, ' : ''}${addOns.extraPandit ? 'Additional Acharya' : ''}`
    });
  };

  return (
    <section id="calculator" className="py-16 sm:py-24 bg-white relative overflow-hidden">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center space-y-3 mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs sm:text-sm font-semibold">
              <CalcIcon className="w-4 h-4 text-orange-600" />
              <span>पारदर्शी मूल्य कैलकुलेटर (Puja Cost Calculator)</span>
            </div>

            <h2 className="font-vedic text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
              Calculate Your <span className="text-divine-gradient">Puja & Samagri Package</span>
            </h2>

            <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
              Get 100% transparent pricing with zero hidden fees. Select your puja type and choose whether you need complete Vedic samagri included.
            </p>
          </div>

          {/* Calculator Card */}
          <div className="glass-card rounded-3xl p-6 sm:p-10 border-2 border-amber-300/80 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Configuration Column */}
            <div className="lg:col-span-7 space-y-6">
              {/* Select Puja */}
              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                  1. Choose Puja Ceremony / पूजा चुनें
                </label>
                <select
                  value={selectedPujaId}
                  onChange={(e) => setSelectedPujaId(e.target.value)}
                  className="w-full form-input text-sm font-semibold"
                >
                  {PUJA_LIST.map((puja) => (
                    <option key={puja.id} value={puja.id}>
                      {puja.name} ({puja.hindiName})
                    </option>
                  ))}
                </select>
                <p className="text-xs text-slate-500 mt-1.5">
                  Standard Duration: <strong className="text-slate-700">{selectedPuja.duration}</strong> • Verified North Indian Acharya
                </p>
              </div>

              {/* Samagri Toggle */}
              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                  2. Puja Samagri Preference / सामग्री विकल्प
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setWithSamagri(true)}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      withSamagri
                        ? 'border-orange-500 bg-orange-50/80 shadow-md ring-2 ring-orange-400/40'
                        : 'border-slate-200 bg-white hover:border-amber-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <strong className="text-xs sm:text-sm text-slate-900">Include All Samagri</strong>
                      {withSamagri && <Check className="w-4 h-4 text-orange-600" />}
                    </div>
                    <p className="text-[11px] text-slate-600 mt-1">
                      Pandit Ji brings 100% pure Desi Ghee, Hawan wood, Gangajal & all sacred items.
                    </p>
                    <div className="text-xs font-bold text-orange-700 mt-2">
                      ₹{selectedPuja.priceWithSamagri}
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setWithSamagri(false)}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      !withSamagri
                        ? 'border-orange-500 bg-orange-50/80 shadow-md ring-2 ring-orange-400/40'
                        : 'border-slate-200 bg-white hover:border-amber-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <strong className="text-xs sm:text-sm text-slate-900">Pandit Dakshina Only</strong>
                      {!withSamagri && <Check className="w-4 h-4 text-orange-600" />}
                    </div>
                    <p className="text-[11px] text-slate-600 mt-1">
                      Devotee arranges all puja samagri as per list provided by Pandit Ji.
                    </p>
                    <div className="text-xs font-bold text-orange-700 mt-2">
                      ₹{selectedPuja.price}
                    </div>
                  </button>
                </div>
              </div>

              {/* Optional Add-ons */}
              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                  3. Optional Add-ons (वैकल्पिक सुविधाएं)
                </label>
                <div className="space-y-2">
                  <label className="flex items-center justify-between p-3 rounded-xl border border-amber-200/80 bg-amber-50/40 hover:bg-amber-50 cursor-pointer transition-colors text-xs sm:text-sm">
                    <span className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={addOns.garlands}
                        onChange={(e) => setAddOns({ ...addOns, garlands: e.target.checked })}
                        className="w-4 h-4 rounded text-orange-600 accent-orange-600"
                      />
                      <span>Fresh Floral Garlands & Lotus Bundle (माला व कमल पुष्प)</span>
                    </span>
                    <strong className="text-slate-800">+₹450</strong>
                  </label>

                  <label className="flex items-center justify-between p-3 rounded-xl border border-amber-200/80 bg-amber-50/40 hover:bg-amber-50 cursor-pointer transition-colors text-xs sm:text-sm">
                    <span className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={addOns.hawanKund}
                        onChange={(e) => setAddOns({ ...addOns, hawanKund: e.target.checked })}
                        className="w-4 h-4 rounded text-orange-600 accent-orange-600"
                      />
                      <span>Brass Hawan Kund Setup & Fire Mats (हवन कुंड व्यवस्था)</span>
                    </span>
                    <strong className="text-slate-800">+₹550</strong>
                  </label>

                  <label className="flex items-center justify-between p-3 rounded-xl border border-amber-200/80 bg-amber-50/40 hover:bg-amber-50 cursor-pointer transition-colors text-xs sm:text-sm">
                    <span className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={addOns.extraPandit}
                        onChange={(e) => setAddOns({ ...addOns, extraPandit: e.target.checked })}
                        className="w-4 h-4 rounded text-orange-600 accent-orange-600"
                      />
                      <span>Additional Acharya for Grand Japa Chanting (अतिरिक्त पंडित जी)</span>
                    </span>
                    <strong className="text-slate-800">+₹1,500</strong>
                  </label>
                </div>
              </div>
            </div>

            {/* Right Summary Breakdown Column */}
            <div className="lg:col-span-5 bg-gradient-to-b from-amber-500/10 via-orange-500/10 to-amber-500/20 p-6 rounded-2xl border border-amber-300 flex flex-col justify-between space-y-6">
              <div>
                <h4 className="font-vedic text-xl font-bold text-slate-900 border-b border-amber-300/80 pb-3 flex items-center justify-between">
                  <span>Price Summary</span>
                  <ShieldCheck className="w-5 h-5 text-orange-600" />
                </h4>

                <div className="space-y-3 pt-4 text-xs sm:text-sm">
                  <div className="flex justify-between text-slate-700">
                    <span>{selectedPuja.name}</span>
                    <strong className="text-slate-900">₹{basePrice}</strong>
                  </div>

                  <div className="flex justify-between text-slate-500 text-xs">
                    <span>Samagri Mode</span>
                    <span>{withSamagri ? 'Included (100% Pure)' : 'Pandit Only'}</span>
                  </div>

                  {addOns.garlands && (
                    <div className="flex justify-between text-slate-600">
                      <span>Floral & Lotus Garland</span>
                      <span>+₹450</span>
                    </div>
                  )}

                  {addOns.hawanKund && (
                    <div className="flex justify-between text-slate-600">
                      <span>Hawan Kund Kit</span>
                      <span>+₹550</span>
                    </div>
                  )}

                  {addOns.extraPandit && (
                    <div className="flex justify-between text-slate-600">
                      <span>Second Vedic Acharya</span>
                      <span>+₹1,500</span>
                    </div>
                  )}

                  <div className="pt-3 border-t border-amber-300/80 flex justify-between items-baseline">
                    <div>
                      <span className="font-bold text-slate-900 text-sm block">Total Estimated Dakshina</span>
                      <span className="text-[11px] text-emerald-700 font-semibold">No Extra/Hidden Charges</span>
                    </div>
                    <span className="font-vedic text-3xl font-bold text-orange-700">
                      ₹{totalPrice}
                    </span>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-white rounded-xl border border-amber-200 text-[11px] text-slate-600 space-y-1">
                  <p>✓ Shubh Muhurat consultation included</p>
                  <p>✓ Pandit Ji travel within city limits included</p>
                  <p>✓ Pay after puja completion or online</p>
                </div>
              </div>

              <button
                onClick={handleProceed}
                className="btn-vedic-primary w-full py-3.5 text-sm font-bold shadow-lg shadow-orange-600/30"
              >
                <span>Proceed to Book (₹{totalPrice})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
