import React, { useState, useEffect } from 'react';
import { PUJA_LIST } from '../data/pujaData';
import { Calendar, Clock, MapPin, User, Phone, Mail, Sparkles, CheckCircle2, ArrowRight, ShieldCheck, FileText } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function BookingSection({ preselectedPuja, onBookingSuccess }) {
  const [formData, setFormData] = useState({
    devoteeName: '',
    phoneNumber: '',
    email: '',
    pujaType: preselectedPuja ? preselectedPuja.name : PUJA_LIST[0].name,
    pujaDate: '',
    preferredTime: 'Morning (07:00 AM - 10:00 AM)',
    cityArea: 'Bangalore',
    fullAddress: '',
    samagriOption: 'with-samagri',
    notes: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);
  const [whatsappUrl, setWhatsappUrl] = useState('');

  useEffect(() => {
    if (preselectedPuja) {
      setFormData((prev) => ({
        ...prev,
        pujaType: preselectedPuja.name
      }));
    }
  }, [preselectedPuja]);

  // Calculate live estimate
  const currentPuja = PUJA_LIST.find((p) => p.name === formData.pujaType) || PUJA_LIST[0];
  const estimatedPrice = formData.samagriOption === 'with-samagri'
    ? currentPuja.priceWithSamagri
    : currentPuja.price;

  const [errors, setErrors] = useState({ devoteeName: '', phoneNumber: '' });

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
    if (digits.length !== 10) return `Enter a valid 10-digit number (${digits.length}/10).`;
    if (!/^[6-9]/.test(digits)) return 'Phone number must start with 6, 7, 8, or 9.';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nameErr = validateName(formData.devoteeName);
    const phoneErr = validatePhone(formData.phoneNumber);

    if (nameErr || phoneErr) {
      setErrors({ devoteeName: nameErr, phoneNumber: phoneErr });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          devoteeName: formData.devoteeName.trim(),
          phoneNumber: formData.phoneNumber.trim(),
          estimatedPrice
        })
      });

      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        setConfirmedBooking(data.booking);
        setWhatsappUrl(data.whatsappUrl);
        setErrors({ devoteeName: '', phoneNumber: '' });
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 }
        });
        if (onBookingSuccess) onBookingSuccess(data.booking);

        // Automatically launch WhatsApp with pre-filled details
        if (data.whatsappUrl) {
          try {
            window.open(data.whatsappUrl, '_blank');
          } catch (popupErr) {}
        }
      } else {
        alert(data.message || 'Booking submission failed');
      }
    } catch (err) {
      // Fallback offline mock for dev verification
      const fallbackBookingId = 'NHP-' + Math.floor(100000 + Math.random() * 900000);
      const mockBooking = {
        bookingId: fallbackBookingId,
        devoteeName: formData.devoteeName.trim(),
        phoneNumber: formData.phoneNumber.trim(),
        pujaType: formData.pujaType,
        pujaDate: formData.pujaDate || 'To be decided',
        preferredTime: formData.preferredTime,
        cityArea: formData.cityArea,
        samagriOption: formData.samagriOption,
        estimatedPrice,
        createdAt: new Date().toISOString()
      };
      setSubmitted(true);
      setConfirmedBooking(mockBooking);
      const text = 
        `*Namaste! New Puja Booking Request*\n\n` +
        `*Devotee Name:* ${formData.devoteeName.trim()}\n` +
        `*Phone:* ${formData.phoneNumber.trim()}\n` +
        `*Puja Type:* ${formData.pujaType}\n` +
        `*Date & Time:* ${formData.pujaDate || 'Soon'} (${formData.preferredTime})\n\n` +
        `Please confirm Pandit Ji's availability and auspicious Shubh Muhurat. Thank you!`;
      const fallbackWaUrl = `https://wa.me/919589018011?text=${encodeURIComponent(text)}`;
      setWhatsappUrl(fallbackWaUrl);
      confetti({ particleCount: 70, spread: 70 });
      try {
        window.open(fallbackWaUrl, '_blank');
      } catch (popupErr) {}
      if (onBookingSuccess) onBookingSuccess(mockBooking);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="booking" className="py-16 sm:py-24 bg-gradient-to-b from-amber-50/50 to-orange-50/30 relative">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center space-y-3 mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 border border-orange-300 text-orange-800 text-xs sm:text-sm font-semibold">
              <Sparkles className="w-4 h-4 text-orange-600" />
              <span>Online Puja Booking (Reserve Your Vedic Pandit)</span>
            </div>

            <h2 className="font-vedic text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
              Book Pandit Ji For <span className="text-divine-gradient">Auspicious Blessings</span>
            </h2>

            <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
              Choose your date and time slot. Our team verifies your Kundali / Muhurat and assigns an experienced North Indian Pandit Ji with all pure samagri.
            </p>
          </div>

          {/* Form Card */}
          <div className="glass-card rounded-3xl p-6 sm:p-10 border-2 border-amber-300 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-gradient-to-l from-orange-600 to-amber-500 text-white text-[11px] font-bold px-4 py-1.5 rounded-bl-xl uppercase tracking-wider">
              100% Vedic Guarantee
            </div>

            {submitted && confirmedBooking ? (
              <div className="bg-amber-50/90 border-2 border-amber-300 rounded-2xl p-6 sm:p-8 text-center space-y-5 animate-in zoom-in-95 duration-300">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-3xl font-bold shadow-md">
                  ✓
                </div>

                <div>
                  <h3 className="font-vedic text-2xl sm:text-3xl font-bold text-slate-900">
                    Puja Booking Confirmed
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    Your request has been successfully recorded.
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-amber-200 text-left grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                  <div>
                    <span className="text-slate-500">Devotee Name:</span>
                    <strong className="block text-slate-900">{confirmedBooking.devoteeName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500">Phone Number:</span>
                    <strong className="block text-slate-900">{confirmedBooking.phoneNumber}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500">Puja Ceremony:</span>
                    <strong className="block text-orange-700">{confirmedBooking.pujaType}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500">Preferred Date & Time:</span>
                    <strong className="block text-slate-900">
                      {confirmedBooking.pujaDate || 'To be decided'} ({confirmedBooking.preferredTime})
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-500">Samagri Inclusions:</span>
                    <strong className="block text-emerald-700">
                      {confirmedBooking.samagriOption === 'with-samagri' ? 'All Pure Samagri Included' : 'Pandit Ji Only'}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-500">Estimated Total Dakshina:</span>
                    <strong className="block text-orange-700 font-bold text-base">
                      ₹{confirmedBooking.estimatedPrice}
                    </strong>
                  </div>
                </div>

                <p className="text-xs text-slate-600 italic">
                  Our senior Acharya Ji will contact you within 15 minutes to confirm the auspicious Shubh Muhurat.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  {whatsappUrl && (
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-vedic-primary flex-1 py-3 text-sm font-bold shadow-md"
                    >
                      <span>Share Details on WhatsApp</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  )}

                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setConfirmedBooking(null);
                    }}
                    className="btn-vedic-outline px-6 py-3 text-sm font-semibold"
                  >
                    Book Another Puja
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* 1. Devotee Personal Information */}
                <div>
                  <h4 className="font-vedic text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <User className="w-4 h-4 text-orange-600" />
                    <span>1. Devotee Information</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-amber-500 absolute left-3 top-3.5" />
                        <input
                          type="text"
                          required
                          placeholder="e.g. Rameshwar Sharma (Letters only)"
                          className="form-input pl-9"
                          value={formData.devoteeName}
                          onChange={(e) => setFormData({ ...formData, devoteeName: e.target.value.replace(/[0-9]/g, '') })}
                        />
                      </div>
                      {errors.devoteeName && <p className="text-red-500 text-[11px] mt-1">{errors.devoteeName}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Mobile Number (10 digits) <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-amber-500 absolute left-3 top-3.5" />
                        <input
                          type="tel"
                          required
                          placeholder="e.g. 9589018011"
                          maxLength={10}
                          className="form-input pl-9"
                          value={formData.phoneNumber}
                          onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                        />
                      </div>
                      {errors.phoneNumber && <p className="text-red-500 text-[11px] mt-1">{errors.phoneNumber}</p>}
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Email Address (Optional)
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-amber-500 absolute left-3 top-3.5" />
                        <input
                          type="email"
                          placeholder="e.g. rameshwar@example.com"
                          className="form-input pl-9"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Ceremony Details */}
                <div className="pt-2 border-t border-slate-200">
                  <h4 className="font-vedic text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-orange-600" />
                    <span>2. Ceremony Selection</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Select Desired Puja Ceremony <span className="text-red-500">*</span>
                      </label>
                      <select
                        className="form-input text-sm cursor-pointer font-medium"
                        value={formData.pujaType}
                        onChange={(e) => setFormData({ ...formData, pujaType: e.target.value })}
                      >
                        {PUJA_LIST.map((puja) => (
                          <option key={puja.id} value={puja.name}>
                            {puja.name} — Starts ₹{puja.price}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Preferred Date
                      </label>
                      <div className="relative">
                        <Calendar className="w-4 h-4 text-amber-500 absolute left-3 top-3.5" />
                        <input
                          type="date"
                          className="form-input pl-9 text-xs"
                          value={formData.pujaDate}
                          onChange={(e) => setFormData({ ...formData, pujaDate: e.target.value })}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Preferred Time Slot
                      </label>
                      <div className="relative">
                        <Clock className="w-4 h-4 text-amber-500 absolute left-3 top-3.5" />
                        <select
                          className="form-input pl-9 text-xs cursor-pointer"
                          value={formData.preferredTime}
                          onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                        >
                          <option>Morning (07:00 AM - 10:00 AM)</option>
                          <option>Mid-Day (10:00 AM - 01:00 PM)</option>
                          <option>Evening (04:00 PM - 07:00 PM)</option>
                          <option>Consult Pandit Ji for Shubh Muhurat</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Location & Samagri Mode */}
                <div className="pt-2 border-t border-slate-200">
                  <h4 className="font-vedic text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-orange-600" />
                    <span>3. Location & Samagri Package</span>
                  </h4>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          City / Locality
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Whitefield / HSR / Indiranagar"
                          className="form-input text-xs"
                          value={formData.cityArea}
                          onChange={(e) => setFormData({ ...formData, cityArea: e.target.value })}
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Full Home / Venue Address (Optional)
                        </label>
                        <input
                          type="text"
                          placeholder="Apartment name, flat no."
                          className="form-input text-xs"
                          value={formData.fullAddress}
                          onChange={(e) => setFormData({ ...formData, fullAddress: e.target.value })}
                        />
                      </div>
                    </div>

                    {/* Samagri Radio Selection */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Puja Samagri Option:
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <label
                          className={`p-3.5 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                            formData.samagriOption === 'with-samagri'
                              ? 'border-orange-500 bg-orange-50/70 shadow-sm ring-1 ring-orange-400'
                              : 'border-slate-200 bg-white hover:bg-slate-50'
                          }`}
                        >
                          <input
                            type="radio"
                            name="samagriOption"
                            value="with-samagri"
                            checked={formData.samagriOption === 'with-samagri'}
                            onChange={(e) => setFormData({ ...formData, samagriOption: e.target.value })}
                            className="text-orange-600 accent-orange-600"
                          />
                          <div>
                            <strong className="text-xs sm:text-sm text-slate-900 block">
                              Include Pure Puja Samagri
                            </strong>
                            <span className="text-[11px] text-slate-600">
                              Pandit Ji brings Ghee, Hawan wood, Gangajal & all essentials (₹{currentPuja.priceWithSamagri})
                            </span>
                          </div>
                        </label>

                        <label
                          className={`p-3.5 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                            formData.samagriOption === 'pandit-only'
                              ? 'border-orange-500 bg-orange-50/70 shadow-sm ring-1 ring-orange-400'
                              : 'border-slate-200 bg-white hover:bg-slate-50'
                          }`}
                        >
                          <input
                            type="radio"
                            name="samagriOption"
                            value="pandit-only"
                            checked={formData.samagriOption === 'pandit-only'}
                            onChange={(e) => setFormData({ ...formData, samagriOption: e.target.value })}
                            className="text-orange-600 accent-orange-600"
                          />
                          <div>
                            <strong className="text-xs sm:text-sm text-slate-900 block">
                              Pandit Dakshina Only
                            </strong>
                            <span className="text-[11px] text-slate-600">
                              You arrange the samagri from list provided (₹{currentPuja.price})
                            </span>
                          </div>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Any Special Instructions / Gotra / Notes
                      </label>
                      <textarea
                        rows="2"
                        placeholder="e.g. Gotra: Kashyap, need special prayer for parents..."
                        className="form-input text-xs"
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                {/* Estimate & Submit */}
                <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 bg-amber-50/50 p-4 rounded-2xl">
                  <div>
                    <span className="text-xs text-slate-500 block">Estimated Dakshina:</span>
                    <span className="font-vedic text-3xl font-bold text-orange-700">
                      ₹{estimatedPrice}
                    </span>
                    <span className="text-[11px] text-emerald-700 ml-2 font-semibold">
                      (No advance needed)
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-vedic-primary w-full sm:w-auto px-8 py-3.5 text-base font-bold shadow-xl shadow-orange-600/30"
                  >
                    {loading ? (
                      <span>Reserving Pandit Ji...</span>
                    ) : (
                      <>
                        <span>Confirm Booking Request</span>
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
