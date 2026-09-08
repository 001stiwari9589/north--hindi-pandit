import React, { useState } from 'react';

const SECTION_INFO = {
  en: {
    eyebrow: 'Clear & Transparent Answers',
    title: 'Frequently Asked Questions',
    sub: 'Everything you need to know about booking an authentic North Indian Pandit Ji for your sacred ceremony.',
    moreQuestions: 'Have more questions or need custom puja consultation?',
    callAcharya: 'Speak with Acharya Ji'
  },
  hi: {
    eyebrow: 'प्रामाणिक व स्पष्ट समाधान',
    title: 'अक्सर पूछे जाने वाले प्रश्न',
    sub: 'अपने पावन अनुष्ठान हेतु वैदिक पंडित जी की बुकिंग से जुड़ी सभी आवश्यक व महत्वपूर्ण जानकारियां।',
    moreQuestions: 'क्या आपका कोई अन्य प्रश्न है अथवा विशेष पूजा परामर्श चाहिए?',
    callAcharya: 'आचार्य जी से बात करें'
  },
  te: {
    eyebrow: 'స్పష్టమైన సమాధానాలు',
    title: 'తరచుగా అడిగే ప్రశ్నలు (FAQ)',
    sub: 'మీ పవిత్ర పూజా కార్యక్రమాల కోసం వేద పండిట్ జీ బుకింగ్ గురించిన ముఖ్యమైన వివరాలు.',
    moreQuestions: 'మరిన్ని వివరాలు లేదా ప్రత్యేక పూజా సలహాలు కావాలా?',
    callAcharya: 'ఆచార్య జీతో మాట్లాడండి'
  },
  bn: {
    eyebrow: 'প্রয়োজনীয় প্রশ্নোত্তর',
    title: 'সাধারণ জিজ্ঞাসা (FAQ)',
    sub: 'আপনার গৃহের শুভ মাঙ্গলিক কাজের জন্য উত্তর ভারতীয় বৈদিক পুরোহিত বুকিং সম্পর্কিত তথ্য।',
    moreQuestions: 'অন্য কোনো প্রশ্ন আছে বা বিশেষ পূজার পরামর্শ প্রয়োজন?',
    callAcharya: 'আচার্য জির সাথে কথা বলুন'
  }
};

const FAQ_DATA = {
  en: [
    {
      q: 'How can I book a North Indian Hindi Pandit Ji, and how soon is it confirmed?',
      a: 'Booking is quick and seamless. Simply submit our online inquiry form or call/WhatsApp us directly at +91 95890 18011. Our senior coordinator contacts you within 15 minutes to understand your specific puja vidhi, check the auspicious shubh muhurat, and assign an experienced Vedic Acharya for your date.'
    },
    {
      q: 'Do your puja packages include 100% pure Vedic Samagri?',
      a: 'Yes, absolutely. All our comprehensive puja packages include pure hawan samidha, pure Desi cow ghee, sacred Gangajal, authentic rolis, fresh flowers, mango leaves, betel nuts, coconuts, and sacred vidhi essentials. You do not need to spend time searching or shopping in markets.'
    },
    {
      q: 'Do your Pandits perform rituals in regional dialects (Bhojpuri, Maithili, Awadhi)?',
      a: 'Yes, 100%. Our verified Acharyas originate from Varanasi (Kashi), Ayodhya, Uttar Pradesh, and Bihar. In addition to authentic Sanskrit Vedic chanting, they are fluent in Hindi, Bhojpuri, Maithili, Awadhi, and Marwari customs, ensuring your family and elders feel spiritually connected at home.'
    },
    {
      q: 'Will Pandit Ji help us calculate and find the best Shubh Muhurat?',
      a: 'Certainly! When you share your details, our senior Acharya checks the authentic Hindu Panchang, your family rashi, nakshatra, and gotra to calculate the most auspicious tithi and lagna for Grihapravesh, Vivah, Hawan, or any ceremony — completely free of charge.'
    },
    {
      q: 'What are the dakshina charges? Are there any hidden fees?',
      a: 'Our dakshina and puja packages are completely transparent, fair, and confirmed upfront before the ceremony begins. There are zero hidden costs, unexpected travel fees, or awkward last-minute negotiations on your sacred day.'
    },
    {
      q: 'Is urgent same-day doorstep Pandit Ji booking available in Hyderabad?',
      a: 'Yes! We offer same-day emergency bookings across all localities of Greater Hyderabad and Secunderabad. If you need an immediate ritual or hawan, call us directly at +91 95890 18011 and a qualified North Indian Pandit Ji will reach your doorstep within 2 to 3 hours.'
    }
  ],
  hi: [
    {
      q: 'उत्तर भारतीय हिंदी पंडित जी कैसे बुक करें और बुकिंग कब कन्फर्म होती है?',
      a: 'बुकिंग अत्यंत सरल व त्वरित है। वेबसाइट पर दिया फॉर्म भरें या सीधे +91 95890 18011 पर कॉल/व्हाट्सएप करें। हमारे वरिष्ठ आचार्य 15 मिनट के अंदर आपसे संपर्क कर शुभ मुहूर्त, पूजा विधि और आपकी कुल परंपरा के अनुसार विद्वान पंडित जी नियुक्त कर देते हैं।'
    },
    {
      q: 'क्या पूजा पैकेज के साथ 100% शुद्ध वैदिक पूजा सामग्री भी उपलब्ध कराई जाती है?',
      a: 'हाँ, शत-प्रतिशत। हमारे पैकेज में गाय का शुद्ध देसी घी, हवन समिधा, पावन गंगाजल, रोली, अक्षत, ताजे फूल, पान व आम के पत्ते और नारियल सहित सभी शुद्ध वैदिक सामग्रियां शामिल होती हैं। आपको बाजार से कुछ भी लाने की आवश्यकता नहीं होती।'
    },
    {
      q: 'क्या पंडित जी हमारी क्षेत्रीय भाषा व परंपरा (हिंदी, भोजपुरी, मैथिली, अवधी) में पूजा कराएंगे?',
      a: 'जी हाँ, बिल्कुल। हमारे सभी आचार्य काशी (वाराणसी), अयोध्या, उत्तर प्रदेश एवं बिहार के प्रतिष्ठित वैदिक संस्थानों से हैं। शुद्ध संस्कृत मंत्रोच्चारण के साथ-साथ वे हिंदी, भोजपुरी, मैथिली और अवधी परंपराओं के अनुसार पूर्ण श्रद्धाभाव से पूजा संपन्न कराते हैं।'
    },
    {
      q: 'क्या पूजा के लिए श्रेष्ठ शुभ मुहूर्त निकालने में पंडित जी सहायता करेंगे?',
      a: 'निश्चय ही! हमारे वरिष्ठ आचार्य हिंदू पंचांग, आपकी राशि व पारिवारिक नक्षत्रों के अनुसार गृहप्रवेश, विवाह, नामकरण अथवा हवन हेतु सबसे कल्याणकारी शुभ मुहूर्त का निशुल्क परामर्श देते हैं।'
    },
    {
      q: 'दक्षिणा शुल्क क्या है? क्या कोई अतिरिक्त या छुपा हुआ शुल्क भी है?',
      a: 'हमारी दक्षिणा और पैकेज पूरी तरह पारदर्शी व स्पष्ट हैं जो पूजा से पहले ही तय हो जाते हैं। कोई भी छुपा हुआ शुल्क नहीं होता ताकि आपके पावन दिन पर कोई असहजता या असमंजस न रहे।'
    },
    {
      q: 'क्या हैदराबाद में आज ही तत्काल (Urgent) पंडित जी की बुकिंग संभव है?',
      a: 'हाँ! यदि आपको अचानक या उसी दिन किसी पूजा की आवश्यकता है, तो सीधे +91 95890 18011 पर कॉल करें। हैदराबाद व सिकंदराबाद के किसी भी क्षेत्र में पंडित जी 2 से 3 घंटे के भीतर आपके घर पर उपस्थित हो जाते हैं।'
    }
  ],
  te: [
    {
      q: 'హైదరాబాద్‌లో నార్త్ ఇండియన్ హిందీ పండిట్ జీని ఎలా బుక్ చేసుకోవాలి?',
      a: 'బుకింగ్ చాలా సులభం. మా ఆన్‌లైన్ ఫారమ్‌ను నింపండి లేదా నేరుగా +91 95890 18011 కు కాల్/వాట్సాప్ చేయండి. మా బృందం 15 నిమిషాల్లో కాల్ చేసి శుభ ముహూర్తం మరియు పూజా వివరాలను నిర్ధారిస్తుంది.'
    },
    {
      q: 'పూజా ప్యాకేజీతో పాటు 100% స్వచ్ఛమైన వేద పూజా సామాగ్రిని అందిస్తారా?',
      a: 'అవును, సంపూర్ణంగా! స్వచ్ఛమైన ఆవు నెయ్యి, గంగాజలం, హోమ సమిధలు, పూలు, పండ్లు, కొబ్బరికాయలతో కూడిన అన్ని స్వచ్ఛమైన పూజా సామాగ్రిని పండితులే తీసుకువస్తారు.'
    },
    {
      q: 'పండిట్ జీ పూజను హిందీ మరియు ఉత్తర భారత సాంప్రదాయం ప్రకారం నిర్వహిస్తారా?',
      a: 'అవును, మా పండితులు వారణాసి, అయోధ్య మరియు బీహార్ ప్రాంతాలకు చెందినవారు. వేద మంత్రోచ్ఛారణతో పాటు స్పష్టమైన హిందీ, భోజ్‌పురి సంప్రదాయ పద్ధతుల్లో పూజను జరిపిస్తారు.'
    },
    {
      q: 'పూజకు సరైన శుభ ముహూర్తాన్ని నిర్ణయించడంలో పండిట్ జీ సహాయం చేస్తారా?',
      a: 'తప్పకుండా! హిందూ పంచాంగం మరియు మీ రాశి నక్షత్రాల ఆధారంగా గృహప్రవేశం, వివాహం లేదా హవనం కొరకు అత్యంత పవిత్రమైన ముహూర్తాన్ని ఉచితంగా సూచిస్తారు.'
    },
    {
      q: 'దక్షిణ ఛార్జీలు ఏమిటి? ఏవైనా దాచిన రుసుములు ఉంటాయా?',
      a: 'మా ఛార్జీలు పూర్తిగా పారదర్శకంగా ఉంటాయి మరియు పూజకు ముందే నిర్ణయించబడతాయి. ఎటువంటి దాచిన లేదా అదనపు రుసుములు ఉండవు.'
    },
    {
      q: 'హైదరాబాద్‌లో అదే రోజు అత్యవసర (Urgent) పండిట్ బుకింగ్ అందుబాటులో ఉందా?',
      a: 'అవును! అత్యవసర పూజల కొరకు +91 95890 18011 నంబర్‌కు నేరుగా కాల్ చేయండి. 2-3 గంటల్లో మీ ఇంటి వద్దకు వేద పండిట్ జీ చేరుకుంటారు.'
    }
  ],
  bn: [
    {
      q: 'হায়দ্রাবাদে উত্তর ভারতীয় হিন্দি পণ্ডিত কীভাবে বুক করবেন?',
      a: 'বুকিং প্রক্রিয়া অত্যন্ত সহজ। ওয়েবসাইটে ফর্ম পূরণ করুন অথবা সরাসরি +91 95890 18011 নম্বরে কল বা হোয়াটসঅ্যাপ করুন। ১৫ মিনিটের মধ্যে আমাদের সিনিয়র আচার্য আপনার সাথে যোগাযোগ করে নিশ্চিত করবেন।'
    },
    {
      q: 'পূজার প্যাকেজের সাথে কি ১০০% খাঁটি বৈদিক সামগ্রী সরবরাহ করা হয়?',
      a: 'হ্যাঁ, সম্পূর্ণভাবে। খাঁটি দেশি গাওয়া ঘি, গঙ্গাজল, যজ্ঞের কাঠ, ফুল, ফল ও নারকেল সহ যাবতীয় বিশুদ্ধ সামগ্রী আমরা সাথে নিয়ে যাই। বাজার থেকে আলাদা কিছু কেনার প্রয়োজন নেই।'
    },
    {
      q: 'পণ্ডিত জি কি হিন্দি ও উত্তর ভারতীয় ঐতিহ্য মেনে পূজা সম্পন্ন করেন?',
      a: 'হ্যাঁ, আমাদের পুরোহিতরা বারাণসী, অযোধ্যা ও উত্তর ভারতের প্রখ্যাত পরিবারভুক্ত। সংস্কৃত মন্ত্রোচ্চারণ ও স্পষ্ট ব্যাখ্যা সহ ভোজপুরি ও মৈথিলী রীতিতেও পূজা করান।'
    },
    {
      q: 'পূজার জন্য শুভ মুহূর্ত নির্ধারণে কি পণ্ডিত জি সাহায্য করবেন?',
      a: 'অবশ্যই! হিন্দু পঞ্চাঙ্গ এবং আপনার রাশি-নক্ষত্র গণনা করে গৃহপ্রবেশ, বিবাহ বা হবন এর জন্য সেরা শুভ তিথি বিনামূল্যে জানিয়ে দেওয়া হয়।'
    },
    {
      q: 'দক্ষিণা কেমন? কোনো গোপন খরচ আছে কি?',
      a: 'আমাদের দক্ষিণা এবং পূজা প্যাকেজ সম্পূর্ণ স্বচ্ছ ও প্রারম্ভেই নির্ধারিত থাকে। আপনার পবিত্র দিনে কোনো অপ্রকাশ্য বা অতিরিক্ত খরচ থাকে না।'
    },
    {
      q: 'হায়দ্রাবাদে কি জরুরি ভিত্তিতে একই দিনে পণ্ডিত পাওয়া সম্ভব?',
      a: 'হ্যাঁ! জরুরি প্রয়োজনে সরাসরি +91 95890 18011 নম্বরে ফোন করুন। হায়দ্রাবাদের যেকোনো স্থানে ২ থেকে ৩ ঘণ্টার মধ্যে পুরোহিত পৌঁছে যাবেন।'
    }
  ]
};

export default function FAQAccordion({ currentLang = 'en' }) {
  const [openIndex, setOpenIndex] = useState(0);
  const info = SECTION_INFO[currentLang] || SECTION_INFO.en;
  const faqs = FAQ_DATA[currentLang] || FAQ_DATA.en;

  const toggle = (idx) => {
    setOpenIndex((prevIdx) => (prevIdx === idx ? -1 : idx));
  };

  return (
    <section id="faq" aria-labelledby="faq-main-heading">
      <div className="faq-container">
        <div className="section-header center">
          <div className="section-eyebrow">{info.eyebrow}</div>
          <h2 id="faq-main-heading" className="section-title">{info.title}</h2>
          <p className="section-sub">{info.sub}</p>
        </div>

        <div className="faq-list" role="region" aria-label="FAQ Accordion">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            const itemKey = `faq-item-${idx}`;

            return (
              <div
                key={idx}
                className={`faq-item ${isOpen ? 'open' : ''}`}
              >
                <button
                  type="button"
                  id={`btn-${itemKey}`}
                  className="faq-q"
                  onClick={() => toggle(idx)}
                  aria-expanded={isOpen}
                  aria-controls={`panel-${itemKey}`}
                >
                  <span className="faq-q-text">{faq.q}</span>
                  <div className="faq-icon-badge" aria-hidden="true">
                    <svg
                      className="faq-icon-svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </button>

                <div
                  id={`panel-${itemKey}`}
                  role="region"
                  aria-labelledby={`btn-${itemKey}`}
                  className="faq-body-collapse"
                >
                  <div className="faq-body-overflow">
                    <div className="faq-a-content">
                      <p>{faq.a}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Help CTA */}
        <div className="faq-footer-help">
          <span className="faq-footer-help-text">{info.moreQuestions}</span>
          <a
            href="tel:+919589018011"
            className="faq-footer-call-btn"
            title="Direct Call to Acharya Ji"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
              style={{ flexShrink: 0 }}
            >
              <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
            </svg>
            <span>{info.callAcharya}: +91 95890 18011</span>
          </a>
        </div>
      </div>
    </section>
  );
}
