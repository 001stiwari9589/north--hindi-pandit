import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, MessageSquare } from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    preferredPuja: 'General Consultation',
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
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        setErrors({ name: '', phone: '' });
      } else {
        alert(data.message || 'Error recording message');
      }
    } catch (err) {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-white relative overflow-hidden">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Office info & channels */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs sm:text-sm font-semibold">
              <Phone className="w-3.5 h-3.5 text-orange-600" />
              <span>Contact Us</span>
            </div>

            <h2 className="font-vedic text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
              Get in Touch with Our <span className="text-divine-gradient">Senior Acharya</span>
            </h2>

            <p className="text-slate-600 text-sm sm:text-base">
              Whether you need to consult for a Shubh Muhurat, book a Pandit for an upcoming Grihapravesh, or inquire about Vedic samagri, we are here 24/7.
            </p>

            {/* Contact cards */}
            <div className="space-y-4 pt-2">
              <a
                href="tel:+917772035222"
                className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 flex items-start gap-4 hover:bg-amber-50 hover:border-orange-400 transition-all group block"
              >
                <div className="w-12 h-12 rounded-xl bg-orange-600 text-white flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-semibold uppercase">Direct Call / WhatsApp</div>
                  <strong className="text-base sm:text-lg text-slate-900 group-hover:text-orange-600 transition-colors block">
                    +91 77720 35222
                  </strong>
                  <span className="text-[11px] text-emerald-700 font-medium">Available 24x7 for Muhurat</span>
                </div>
              </a>

              <a
                href="mailto:info@tathastupuja.in"
                className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 flex items-start gap-4 hover:bg-amber-50 hover:border-orange-400 transition-all group block"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-semibold uppercase">Official Email</div>
                  <strong className="text-sm sm:text-base text-slate-900 group-hover:text-orange-600 transition-colors block">
                    info@tathastupuja.in
                  </strong>
                  <span className="text-[11px] text-slate-500">info.tathastupuja@gmail.com</span>
                </div>
              </a>

              <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-red-800 text-white flex items-center justify-center shrink-0 shadow-md">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-semibold uppercase">Main Office Location</div>
                  <strong className="text-sm text-slate-900 block">
                    Whitefield, Bangalore
                  </strong>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Ramagondanahalli, Varthur Rd, Whitefield, Nearby Anu Furniture, Bangalore, Karnataka: 560066
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Quick Query Form */}
          <div className="lg:col-span-7">
            <div className="glass-card rounded-3xl p-6 sm:p-8 border-2 border-amber-300/80 shadow-xl">
              <div className="flex items-center gap-2 mb-4">
                <MessageSquare className="w-5 h-5 text-orange-600" />
                <h3 className="font-vedic text-2xl font-bold text-slate-900">
                  Send A Message
                </h3>
              </div>

              {submitted ? (
                <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-6 text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h4 className="font-vedic text-xl font-bold text-slate-900">
                    Thank You! Your Message Has Been Sent
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600">
                    Our senior Acharya team will contact you shortly. For urgent booking, please call directly: <strong className="text-orange-700">+91 77720 35222</strong>
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="btn-vedic-outline px-4 py-2 text-xs font-semibold mt-2"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Full Name (Letters only) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Anand Kumar (No numbers)"
                        className="form-input text-xs"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value.replace(/[0-9]/g, '') })}
                      />
                      {errors.name && <p className="text-red-500 text-[11px] mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Phone Number (10 digits) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 7772035222"
                        maxLength={10}
                        className="form-input text-xs"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                      />
                      {errors.phone && <p className="text-red-500 text-[11px] mt-1">{errors.phone}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Puja Category
                    </label>
                    <select
                      className="form-input text-xs cursor-pointer"
                      value={formData.preferredPuja}
                      onChange={(e) => setFormData({ ...formData, preferredPuja: e.target.value })}
                    >
                      <option>General Muhurat Consultation</option>
                      <option>Satyanarayan Katha & Puja</option>
                      <option>Grihapravesh Puja</option>
                      <option>Rudrabhishek Puja</option>
                      <option>Marriage / Vivah Ceremony</option>
                      <option>Office / Business Opening</option>
                      <option>Navagraha Shanti Hawan</option>
                      <option>Other Vedic Ritual</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Your Message or Questions
                    </label>
                    <textarea
                      rows="3"
                      placeholder="Write your date, location or any custom ritual requirement..."
                      className="form-input text-xs"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-vedic-primary w-full py-3.5 text-sm font-bold shadow-md shadow-orange-600/30"
                  >
                    {loading ? (
                      <span>Sending Message...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Inquiry</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
