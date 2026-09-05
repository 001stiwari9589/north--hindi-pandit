import React, { useState } from 'react';

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: 'Can I book an authentic North Indian Pandit online easily?',
      a: 'Yes! You can book easily through our website form, by calling us directly at +91 90196 90392, or via WhatsApp. Our team confirms your booking within 15 minutes and assigns a verified North Indian pandit for your chosen date and auspicious muhurat.'
    },
    {
      q: 'Do your pandits conduct rituals in our regional dialect (Bhojpuri, Maithili, Awadhi)?',
      a: 'Yes, absolutely. Our pandits originate from Uttar Pradesh, Bihar, Rajasthan, and Madhya Pradesh. In addition to pure Sanskrit mantra uccharan, they are completely fluent in Hindi, Bhojpuri, Maithili, Awadhi, and Marwari traditions, ensuring your elders and family feel at home.'
    },
    {
      q: 'Do you provide complete pure puja samagri with the package?',
      a: 'Yes, 100%. All our comprehensive packages include pure hawan samidha, pure Desi cow ghee, Gangajal, authentic rolis, fresh flowers, betel leaves, coconuts, and sacred vidhi materials. You don’t need to spend hours searching in markets.'
    },
    {
      q: 'Will Pandit Ji help us find the best Shubh Muhurat for our ceremony?',
      a: 'Certainly! When you submit an inquiry, our senior Acharya checks the Hindu Panchang, your rashi, and family nakshatras to calculate the most auspicious tithi and lagna for Grihapravesh, Vivah, or Hawan — free of consultation cost.'
    },
    {
      q: 'What are the dakshina charges? Are there any hidden fees?',
      a: 'Our packages are completely transparent and established upfront before the ceremony begins. We have zero hidden charges, ensuring complete peace of mind with no awkward negotiations on your sacred day.'
    },
    {
      q: 'Is same-day urgent pandit booking available across the city?',
      a: 'Yes! We offer same-day emergency bookings based on pandit schedule. If you have an urgent ritual or immediate need, call us directly at +91 90196 90392 and we will arrange a verified pandit at your doorstep within 2 to 3 hours.'
    }
  ];

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <section id="faq">
      <div className="section-header center">
        <div className="section-eyebrow">Clear &amp; Transparent Answers</div>
        <h2 className="section-title">Frequently Asked Questions</h2>
        <p className="section-sub">
          Everything you need to know about booking an authentic North Indian Pandit Ji for your family.
        </p>
      </div>

      <div className="faq-list">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={idx} className={`faq-item ${isOpen ? 'open' : ''}`}>
              <button
                type="button"
                className="faq-q"
                onClick={() => toggle(idx)}
                aria-expanded={isOpen}
              >
                <span>{faq.q}</span>
                <span className="faq-chevron">▾</span>
              </button>
              <div
                className="faq-a"
                style={{
                  maxHeight: isOpen ? '260px' : '0',
                  padding: isOpen ? '0 24px 20px' : '0 24px'
                }}
              >
                {faq.a}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
