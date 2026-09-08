import React, { useState } from 'react';
import { translations } from '../translations';

const FAQ_DATA = {
  en: [
    {
      q: 'How can I book the best North Indian Hindi Pandit in Hyderabad or near me?',
      a: 'Booking the best Hindi Pandit in Hyderabad is simple and instant. Fill out our online booking form or call/WhatsApp us directly at +91 77720 35222. Our verified North Indian Acharyas are stationed across Gachibowli, Hitec City, Madhapur, Kondapur, Kukatpally, Banjara Hills, Jubilee Hills, and Secunderabad for doorstep Vedic puja rituals.'
    },
    {
      q: 'Which localities in Hyderabad do your North Indian Hindi Pandits cover?',
      a: 'We cover all of Greater Hyderabad and Secunderabad including Gachibowli, Financial District, Hitec City, Madhapur, Kondapur, Kukatpally, KPHB, Jubilee Hills, Banjara Hills, Miyapur, Chandanagar, Manikonda, Tellapur, Begumpet, Ameerpet, and Uppal with fast 2-3 hour doorstep arrival.'
    },
    {
      q: 'Can I book an authentic North Indian Pandit online easily?',
      a: 'Yes! You can book easily through our website form, by calling us directly at +91 77720 35222, or via WhatsApp. Our team confirms your booking within 15 minutes and assigns a verified North Indian pandit for your chosen date and auspicious muhurat.'
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
      q: 'Is same-day urgent pandit booking available across Hyderabad and Bangalore?',
      a: 'Yes! We offer same-day emergency bookings based on pandit schedule. If you have an urgent ritual or immediate need, call us directly at +91 77720 35222 and we will arrange a verified pandit at your doorstep within 2 to 3 hours.'
    }
  ],
  hi: [
    {
      q: 'हैदराबाद या अपने पास में सर्वश्रेष्ठ उत्तर भारतीय हिंदी पंडित जी कैसे बुक करें?',
      a: 'हैदराबाद में सर्वश्रेष्ठ हिंदी पंडित जी की बुकिंग अत्यंत सरल व त्वरित है। हमारा ऑनलाइन फॉर्म भरें या +91 77720 35222 पर सीधे कॉल/व्हाट्सएप करें। हमारे प्रमाणित आचार्य गाचीबोवली, हाईटेक सिटी, माधापुर, कोंडापुर, कुकटपल्ली, बंजारा हिल्स, जुबली हिल्स व सिकंदराबाद में त्वरित वैदिक पूजा सेवा हेतु उपस्थित हैं।'
    },
    {
      q: 'हैदराबाद में आपके उत्तर भारतीय पंडित जी किन-किन क्षेत्रों में सेवा देते हैं?',
      a: 'हम संपूर्ण ग्रेटर हैदराबाद और सिकंदराबाद को कवर करते हैं, जिनमें गाचीबोवली, फाइनेंशियल डिस्ट्रिक्ट, हाईटेक सिटी, माधापुर, कोंडापुर, कुकटपल्ली, केपीएचबी, जुबली हिल्स, बंजारा हिल्स, मियापुर, चंदनगर, मणिकोंडा, तेल्लापुर, बेगमपेट, अमीरपेट और उप्पल शामिल हैं। पंडित जी 2-3 घंटे में आपके द्वार पर उपस्थित हो जाते हैं।'
    },
    {
      q: 'क्या मैं ऑनलाइन आसानी से प्रामाणिक उत्तर भारतीय पंडित जी बुक कर सकता हूँ?',
      a: 'हाँ, बिल्कुल! आप हमारी वेबसाइट, कॉल या व्हाट्सएप के माध्यम से तुरंत बुकिंग कर सकते हैं। हमारी टीम 15 मिनट में संपर्क कर आपके चुने हुए शुभ मुहूर्त पर वरिष्ठ आचार्य जी को नियुक्त करती है।'
    },
    {
      q: 'क्या पंडित जी हमारी क्षेत्रीय भाषा (भोजपुरी, मैथिली, अवधी) में पूजा कराएंगे?',
      a: 'जी हाँ, बिल्कुल। हमारे सभी पंडित जी उत्तर प्रदेश, बिहार, राजस्थान और मध्य प्रदेश के हैं। शुद्ध संस्कृत मंत्रोच्चारण के साथ-साथ वे हिंदी, भोजपुरी, मैथिली, अवधी और मारवाड़ी परंपराओं में पूरी तरह पारंगत हैं।'
    },
    {
      q: 'क्या पूजा पैकेज के साथ 100% शुद्ध वैदिक सामग्री भी उपलब्ध कराते हैं?',
      a: 'हाँ, शत-प्रतिशत। हमारे सभी पैकेजों में शुद्ध हवन समिधा, गाय का शुद्ध देसी घी, गंगाजल, रोली, ताजे फूल, पान के पत्ते, नारियल और समस्त पूजा सामग्री शामिल होती है। आपको बाजार में भटकने की कोई आवश्यकता नहीं है।'
    },
    {
      q: 'क्या पंडित जी हमारी पूजा के लिए श्रेष्ठ शुभ मुहूर्त निकालने में सहायता करेंगे?',
      a: 'निश्चय ही! जब आप अनुरोध भेजते हैं, तो हमारे वरिष्ठ आचार्य हिंदू पंचांग और आपकी राशि व नक्षत्रों के अनुसार गृहप्रवेश, विवाह या हवन हेतु सबसे शुभ तिथि व लग्न का निशुल्क परामर्श देते हैं।'
    },
    {
      q: 'दक्षिणा शुल्क क्या है? क्या कोई छुपा हुआ खर्च भी है?',
      a: 'हमारी दक्षिणा और पैकेज पूरी तरह पारदर्शी हैं और पूजा से पहले ही स्पष्ट बता दिए जाते हैं। कोई भी छुपा हुआ शुल्क नहीं होता ताकि आपके पावन दिन पर कोई असहजता न हो।'
    },
    {
      q: 'क्या हैदराबाद व बैंगलोर में उसी दिन तत्काल पंडित जी की बुकिंग संभव है?',
      a: 'हाँ! यदि आपको अचानक या उसी दिन किसी पूजा की आवश्यकता है, तो +91 77720 35222 पर सीधे संपर्क करें। हम 2 से 3 घंटे के भीतर आपके घर पर पंडित जी की उपस्थिति सुनिश्चित करते हैं।'
    }
  ],
  te: [
    {
      q: 'హైదరాబాద్‌లో ఉత్తమ నార్త్ ఇండియన్ హిందీ పండిట్ జీని ఎలా బుక్ చేసుకోవాలి?',
      a: 'హైదరాబాద్‌లో హిందీ పండిట్ జీ బుకింగ్ చాలా సులభం. మా వెబ్‌సైట్ ఫారమ్ నింపండి లేదా +91 77720 35222 నంబర్‌కు నేరుగా కాల్/వాట్సాప్ చేయండి. మా సీనియర్ పండితులు గచ్చిబౌలి, హైటెక్ సిటీ, మాదాపూర్, కొండాపూర్, కూకట్‌పల్లి తదితర ప్రాంతాల్లో అందుబాటులో ఉన్నారు.'
    },
    {
      q: 'మీ హిందీ పండితులు హైదరాబాద్‌లో ఏ ప్రాంతాలను కవర్ చేస్తారు?',
      a: 'గచ్చిబౌలి, హైటెక్ సిటీ, మాదాపూర్, కొండాపూర్, కూకట్‌పల్లి, బంజారాహిల్స్, జూబ్లీహిల్స్, సికింద్రాబాద్, మియాపూర్ తదితర గ్రేటర్ హైదరాబాద్ అంతటా 2-3 గంటల్లో మీ ఇంటికి చేరుకుంటారు.'
    },
    {
      q: 'ఆన్‌లైన్‌లో పండిట్ జీని సులభంగా బుక్ చేయవచ్చా?',
      a: 'అవును! మా వెబ్‌సైట్ ద్వారా లేదా ఫోన్/వాట్సాప్ ద్వారా సులభంగా బుక్ చేసుకోవచ్చు. మా బృందం 15 నిమిషాల్లో కాల్ చేసి నిర్ధారిస్తుంది.'
    },
    {
      q: 'పండిట్ జీ సంపూర్ణ స్వచ్ఛమైన పూజా సామాగ్రిని తెస్తారా?',
      a: 'అవును, 100%. మా ప్యాకేజీలలో స్వచ్ఛమైన ఆవు నెయ్యి, గంగాజలం, హోమ సమిధలు, పువ్వులు, కొబ్బరికాయలు మరియు అన్ని పూజా వస్తువులు చేరి ఉంటాయి.'
    },
    {
      q: 'పూజకు సరైన శుభ ముహూర్తాన్ని నిర్ణయించడంలో పండిట్ జీ సహాయం చేస్తారా?',
      a: 'తప్పకుండా! హిందూ పంచాంగం మరియు మీ నక్షత్రాల ఆధారంగా అత్యంత పవిత్రమైన ముహూర్తాన్ని ఉచితంగా సూచిస్తారు.'
    },
    {
      q: 'దక్షిణ ఛార్జీలు ఏమిటి? ఏవైనా దాచిన రుసుములు ఉన్నాయా?',
      a: 'మా ఛార్జీలు పూర్తిగా పారదర్శకంగా ఉంటాయి మరియు పూజకు ముందే నిర్ణయించబడతాయి. ఎటువంటి దాచిన రుసుములు ఉండవు.'
    },
    {
      q: 'అదే రోజు అత్యవసర పండిట్ బుకింగ్ అందుబాటులో ఉందా?',
      a: 'అవును! అత్యవసర క్రతువుల కోసం +91 77720 35222 నంబర్‌కు కాల్ చేస్తే 2-3 గంటల్లో పండిట్ జీని పంపుతాము.'
    }
  ],
  bn: [
    {
      q: 'হায়দ্রাবাদে সেরা উত্তর ভারতীয় হিন্দি পুরোহিত কীভাবে বুক করব?',
      a: 'হায়দ্রাবাদে হিন্দি পণ্ডিত বুক করা খুবই সহজ। আমাদের অনলাইন ফর্ম পূরণ করুন অথবা সরাসরি +91 77720 35222 নম্বরে কল/হোয়াটসঅ্যাপ করুন। আমাদের আচার্যগণ সমস্ত এলাকায় বৈদিক পূজার জন্য উপস্থিত থাকেন।'
    },
    {
      q: 'হায়দ্রাবাদের কোন কোন এলাকায় আপনাদের পুরোহিত সেবা পাওয়া যায়?',
      a: 'গাছিবাউলি, হাইটেক সিটি, মাধাপুর, কোন্ডাপুর, কুকটপল্লী, জুবিলি হিলস, সেকেন্দ্রাবাদ সহ বৃহত্তর হায়দ্রাবাদের সর্বত্র ২-৩ ঘণ্টার মধ্যে পুরোহিত পৌঁছে যান।'
    },
    {
      q: 'অনলাইনে কি সহজেই প্রামাণিক উত্তর ভারতীয় পুরোহিত বুক করা যায়?',
      a: 'হ্যাঁ, অবশ্যই! আমাদের ওয়েবসাইট বা সরাসরি ফোনের মাধ্যমে বুক করতে পারেন। ১৫ মিনিটের মধ্যে বুকিং কনফার্ম করা হয়।'
    },
    {
      q: 'পূজার প্যাকেজের সাথে কি ১০০% খাঁটি পূজার সামগ্রী দেওয়া হয়?',
      a: 'হ্যাঁ, ১০০% খাঁটি দেশি গাওয়া ঘি, গঙ্গাজল, যজ্ঞের কাঠ, ফুল ও ফল সহ সমস্ত সামগ্রী আমরা সাথে নিয়ে আসি।'
    },
    {
      q: 'পণ্ডিত জি কি শুভ মুহূর্ত নির্ধারণে সহায়তা করবেন?',
      a: 'নিশ্চয়ই! হিন্দু পঞ্চাঙ্গ ও আপনার রাশি নক্ষত্র বিচার করে শুভ তিথি ও মুহূর্তের নিখরচায় পরামর্শ দেওয়া হয়।'
    },
    {
      q: 'দক্ষিণা কত? কোনো অতিরিক্ত গোপন খরচ আছে কি?',
      a: 'আমাদের সমস্ত দক্ষিণা প্যাকেজ সম্পূর্ণ স্বচ্ছ ও পূর্বনির্ধারিত। কোনো অপ্রকাশ্য খরচ থাকে না।'
    },
    {
      q: 'একই দিনে জরুরি পুরোহিত বুকিং কি সম্ভব?',
      a: 'হ্যাঁ! জরুরি প্রয়োজনে সরাসরি +91 77720 35222 নম্বরে ফোন করুন, ২-৩ ঘণ্টার মধ্যে পুরোহিত পৌঁছে যাবেন।'
    }
  ]
};

export default function FAQAccordion({ currentLang = 'en' }) {
  const [openIndex, setOpenIndex] = useState(0);
  const t = translations[currentLang] || translations.en;
  const faqs = FAQ_DATA[currentLang] || FAQ_DATA.en;

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <section id="faq">
      <div className="section-header center">
        <div className="section-eyebrow">{t.faqEyebrow || 'Clear & Transparent Answers'}</div>
        <h2 className="section-title">{t.faqTitle || 'Frequently Asked Questions'}</h2>
        <p className="section-sub">
          {t.faqSub || 'Everything you need to know about booking an authentic North Indian Pandit Ji for your family.'}
        </p>
      </div>

      <div className="faq-list">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={idx} className={`faq-item ${isOpen ? 'open' : ''}`}>
              <button
                type="button"
                className="faq-question"
                onClick={() => toggle(idx)}
                aria-expanded={isOpen}
              >
                <span>{faq.q}</span>
                <span className="faq-arrow">{isOpen ? '−' : '+'}</span>
              </button>
              {isOpen && (
                <div className="faq-answer">
                  <p>{faq.a}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
