import React, { useEffect } from 'react';
import {
  Phone,
  MessageCircle,
  Home,
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  ShieldCheck,
  Sparkles,
  ChevronRight,
  HelpCircle,
  ArrowRight,
  Flame,
  UserCheck
} from 'lucide-react';
import { PUJA_LIST } from '../data/pujaData';

// Configuration for Dedicated SEO Service Pages
export const SERVICE_PAGES_CONFIG = {
  'griha-pravesh-puja-in-hyderabad': {
    slug: 'griha-pravesh-puja-in-hyderabad',
    pujaId: 'griha-pravesh-puja',
    seoTitle: 'Griha Pravesh Puja in Hyderabad | Vedic Vastu Shanti Pandit & Hawan',
    metaDesc: 'Book verified North Indian Hindi & Bihari Pandit for Griha Pravesh Puja in Hyderabad with 100% pure Samagri. Doorstep service in Gachibowli, Kondapur, Madhapur, Kukatpally, Miyapur & Secunderabad. Call: +91 91830 89880.',
    h1: 'Vedic Griha Pravesh & Vastu Shanti Puja in Hyderabad',
    subtitle: 'Auspicious Vedic Housewarming Ceremony with Navagraha Hawan & 100% Pure Samagri',
    heroImage: '/images/grihapravesh_puja.jpg',
    imageAlt: 'Vedic Griha Pravesh and Vastu Shanti Hawan performed by North Indian Pandit in Hyderabad',
    badge: 'Shubh Grihapravesh Ceremony',
    targetAudience: 'Families purchasing or moving into a new apartment, independent villa, or rented home in Hyderabad desiring shastra-sammat housewarming with traditional North Indian vidhi.',
    whyImportant: 'Grihapravesh is the sacred transition of turning a newly constructed structure into an energized, peaceful home. Performing Dwar Puja, Kalash Sthapana, and Vastu Purusha invocation cleanses residual construction vibrations and welcomes positive energy.',
    preparationTips: [
      'Ensure the main entrance threshold (Dwar) is clean and decorated with fresh mango leaves and marigold toran.',
      'Keep fresh milk in a small vessel for the auspicious milk boiling ritual (Doodh Ubalna).',
      'Arrange clean flooring mats / asanas for family members facing East or North.',
      'Our Acharyas bring 100% of all required dry samagri, hawan kund, herbs, gangajal, and kalash—you do not need to hunt local markets.'
    ],
    faqs: [
      {
        q: 'Do you provide complete Grihapravesh Samagri in Hyderabad?',
        a: 'Yes, we provide 100% authentic Vedic samagri including fresh mango leaves, gangajal, pure desi cow ghee, hawan samidha, navadhanya, and Vastu yantra. Devotees only arrange household items like milk and sweets.'
      },
      {
        q: 'Which areas of Hyderabad do your Pandits travel to?',
        a: 'We provide doorstep arrival across all localities of Hyderabad and Secunderabad including Gachibowli, Kondapur, Madhapur, Hitec City, Kukatpally, Miyapur, Chandanagar, Jubilee Hills, and Banjara Hills.'
      },
      {
        q: 'Can we get an auspicious Shubh Muhurat for Griha Pravesh?',
        a: 'Yes, our senior Acharyas calculate accurate Muhurat based on your birth nakshatra and Hindu Panchang free of charge when you consult with us.'
      }
    ]
  },

  'satyanarayan-puja-in-hyderabad': {
    slug: 'satyanarayan-puja-in-hyderabad',
    pujaId: 'satyanarayan-puja',
    seoTitle: 'Satyanarayan Puja in Hyderabad | Hindi & Bihari Pandit with Samagri',
    metaDesc: 'Book experienced North Indian Pandit for Shri Satyanarayan Katha & Hawan in Hyderabad. 5 Adhyay Katha in pure Hindi with pure samagri at doorstep across Hyderabad & Secunderabad. Call: +91 91830 89880.',
    h1: 'Shri Satyanarayan Vrat Katha & Hawan in Hyderabad',
    subtitle: 'Sacred Narayana Pujan, 5-Chapter Katha Recitation & Hawan with Complete Samagri',
    heroImage: '/images/satyanarayan_puja.jpg',
    imageAlt: 'Shri Satyanarayan Puja and Katha path conducted in Hindi by North Indian Pandit in Hyderabad',
    badge: 'Auspicious Vrat Katha',
    targetAudience: 'Families celebrating new milestones, house blessings, birthdays, anniversaries, promotions, Purnima, or offering gratitude for answered prayers.',
    whyImportant: 'Shri Satyanarayan Katha is one of the most accessible and purifying rituals in Sanatan Dharma. The narration of five divine chapters reminds us to live with truth, humility, and faith while the closing Hawan purifies the home atmosphere.',
    preparationTips: [
      'Prepare Panjiri / Sheera prasad using wheat flour roasted in pure desi ghee with banana slices and sugar.',
      'Keep Tulsi dal (basil leaves) ready for Lord Vishnu bhog.',
      'Arrange 5 different seasonal fruits and fresh flowers for the chowki.',
      'All worship ingredients including Janeu, Roli, Akshat, Dhoop, Kapur, and Hawan wood are brought by Pandit Ji.'
    ],
    faqs: [
      {
        q: 'How long does Satyanarayan Puja take?',
        a: 'The complete ritual takes approximately 2 to 2.5 hours, including Gauri-Ganesh Pujan, Navagraha Sthapana, 5-chapter Katha path in clear Hindi, Hawan, and final Aarti.'
      },
      {
        q: 'Do your Pandits speak Hindi and explain the meaning of Katha?',
        a: 'Yes, all our Acharyas hail from Varanasi, Ayodhya, and Bihar. They recite Sanskrit mantras melodiously and narrate the Katha in pure, easily understandable Hindi.'
      },
      {
        q: 'Can the puja be performed on weekends or Purnima in Hyderabad?',
        a: 'Yes, our Pandits are available 7 days a week for morning and evening slots across Hyderabad and Secunderabad.'
      }
    ]
  },

  'rudrabhishek-puja-in-hyderabad': {
    slug: 'rudrabhishek-puja-in-hyderabad',
    pujaId: 'rudrabhishek-puja',
    seoTitle: 'Maha Rudrabhishek Puja in Hyderabad | Shivling Abhishek with 11 Dravyas',
    metaDesc: 'Book senior Vedic Pandit from Varanasi for Maha Rudrabhishek and Shiv Pujan in Hyderabad with Shukla Yajurveda Rudri Path and 11 sacred dravyas at your home. Call: +91 91830 89880.',
    h1: 'Maha Rudrabhishek & Shiva Puja in Hyderabad',
    subtitle: 'Vedic Rudri Path & Sacred Shivalinga Abhishek with 11 Sacred Dravyas by Kashi Scholars',
    heroImage: '/images/rudrabhishek_puja.jpg',
    imageAlt: 'Maha Rudrabhishek puja with Shivling and 11 sacred dravyas by Vedic Pandit in Hyderabad',
    badge: 'Powerful Shiva Anushthan',
    targetAudience: 'Devotees seeking spiritual peace, good health, removal of Graha doshas (such as Kaal Sarp or Shani dosha), and Lord Shiva blessings on Mondays, Pradosh, or Shivratri.',
    whyImportant: 'Rudrabhishek is revered in the Vedas as the supreme ritual to invoke Lord Shiva. Chanting Shukla Yajurveda Rudra Ashtadhyayi while performing continuous sacred bathing with panchamrit, sugarcane juice, and gangajal creates immense positive spiritual vibrations.',
    preparationTips: [
      'Devotees should observe a light satvik fast or fruit diet on the day of Rudrabhishek.',
      'Arrange 108 fresh Bilva patra (Belpatra) without cuts or blemishes.',
      'Our team provides the bronze/copper Shivalinga stand, patra, gangajal, pure desi cow milk, and herbal dravyas.'
    ],
    faqs: [
      {
        q: 'Can Rudrabhishek be performed at home in an apartment?',
        a: 'Yes, our Pandits carry a clean portable Jaladhari / Abhishek tray so the sacred liquids collect hygienically without spilling on your home flooring.'
      },
      {
        q: 'What is the duration of Maha Rudrabhishek?',
        a: 'The full ritual with Laghu Rudri path and Mahamrityunjaya chants takes about 2 to 3 hours.'
      }
    ]
  },

  'vivah-puja-in-hyderabad': {
    slug: 'vivah-puja-in-hyderabad',
    pujaId: 'vivah-puja',
    seoTitle: 'Vivah Sanskar Pandit in Hyderabad | North Indian & Hindi Marriage Rituals',
    metaDesc: 'Book authentic North Indian, Banarasi, Bihari & Rajasthani Acharya for Vivah Sanskar (Vedic Wedding, Saptapadi, Kanyadaan) in Hyderabad with complete shastra-sammat vidhi. Call: +91 91830 89880.',
    h1: 'North Indian Vivah Sanskar & Marriage Puja in Hyderabad',
    subtitle: 'Vedic Wedding Ceremonies: Saptapadi, Kanyadaan, Panigrahana & Mandap Hawan',
    heroImage: '/images/marriage_sanskar.jpg',
    imageAlt: 'North Indian Vivah Sanskar Vedic marriage rituals performed by Hindi Pandit in Hyderabad',
    badge: 'Sacred Vivah Sanskar',
    targetAudience: 'North Indian, Hindi, Bihari, UP, Rajasthani, and Marathi families planning weddings, Sagai, Haldi, Mehendi pujan, or Mandap Hawan ceremonies in Hyderabad banquet halls and hotels.',
    whyImportant: 'Vivah Sanskar is one of the sixteen essential sacraments (Solah Sanskar). Our senior Acharyas ensure all Vedic rites—from Varapuja to Kanyadaan, Laja Hawan, and Seven Sacred Vows (Saptapadi)—are conducted with traditional dignity and clear Hindi guidance.',
    preparationTips: [
      'Book your dates early to reserve an auspicious Lagna Muhurat.',
      'Our team coordinates directly with the families to customize ritual timings and regional customs (UP, Bihar, Marwari, etc.).'
    ],
    faqs: [
      {
        q: 'Do you provide Pandits for outstation or destination weddings around Hyderabad?',
        a: 'Yes, our senior Acharyas travel across Greater Hyderabad, Secunderabad, and resort properties in Shamshabad, Gandipet, and outskirts.'
      },
      {
        q: 'Can the rituals be conducted in both Hindi and English for diverse guests?',
        a: 'Yes, our Acharyas recite Vedic mantras in pure Sanskrit and provide lucid explanations in Hindi and English so both families understand the profound meaning of every vow.'
      }
    ]
  },

  'vastu-shanti-puja-in-hyderabad': {
    slug: 'vastu-shanti-puja-in-hyderabad',
    pujaId: 'vastu-shanti-puja',
    seoTitle: 'Vastu Shanti Puja in Hyderabad | Vastu Dosh Nivaran & Navagraha Hawan',
    metaDesc: 'Authentic Vastu Shanti Puja and Navagraha Hawan in Hyderabad by 20+ yrs experienced Vedic scholars for residential flats, villas, and commercial offices. Call: +91 91830 89880.',
    h1: 'Vedic Vastu Shanti & Navagraha Hawan in Hyderabad',
    subtitle: 'Dosh Nivaran, Directional Deva Invocation & Energy Harmony for Homes and Offices',
    heroImage: '/images/vastu_hawan.jpg',
    imageAlt: 'Vastu Shanti Puja and Navagraha Hawan performed for home and office in Hyderabad',
    badge: 'Vastu Harmony Ritual',
    targetAudience: 'Homeowners, tenants, and business founders experiencing unexplainable delays, negative aura, architectural Vastu imbalances, or renovating existing properties in Hyderabad.',
    whyImportant: 'Vastu Shanti harmonizes the five cosmic elements (Panchabhuta) with the planetary energies. Through Vedic Yajna, Vastu Purusha and the 45 directional deities are propitiated to bring enduring peace and prosperity.',
    preparationTips: [
      'Keep compass directions of your home or office handy.',
      'Our Acharyas bring consecrated Vastu Yantras, Navagraha herbs, and cast iron hawan arrangements for smoke-controlled indoor rituals.'
    ],
    faqs: [
      {
        q: 'Can Vastu Puja be performed in an already occupied flat without structural changes?',
        a: 'Yes! Vedic Vastu Shanti focuses on energetic and spiritual purification through sacred mantras, Yantras, and Hawan without requiring structural demolition.'
      },
      {
        q: 'Is it suitable for commercial office and shop opening?',
        a: 'Yes, we perform dedicated Office Opening Vastu Puja and Kuber Hawan across Hyderabad IT corridors.'
      }
    ]
  },

  'pandit-in-hyderabad': {
    slug: 'pandit-in-hyderabad',
    pujaId: null,
    seoTitle: 'Best North Indian Hindi Pandit in Hyderabad | Vedic Puja & Hawan Services',
    metaDesc: 'Find experienced North Indian, Banarasi, Bihari & Marathi Pandits in Hyderabad for all Vedic pujas and hawans with 100% pure samagri and punctual doorstep service. Call: +91 91830 89880.',
    h1: 'Verified North Indian Hindi Pandit in Hyderabad & Secunderabad',
    subtitle: '20+ Years Vedic Legacy • Senior Scholars from Varanasi & Ayodhya at Your Doorstep',
    heroImage: '/vedic_pandit_hawan.jpg',
    imageAlt: 'Experienced North Indian Hindi Pandit Ji performing Vedic hawan at home in Hyderabad',
    badge: '⭐ #1 Vedic Pandit Service in Hyderabad',
    targetAudience: 'North Indian diaspora living across Greater Hyderabad seeking scholarly, punctual, and pious Acharyas for authentic Hindu rituals in traditional Hindi and Sanskrit.',
    whyImportant: 'Finding authentic Vedic purohits outside North India who understand your ancestral traditions (UP, Bihar, Banaras, Rajasthan, Uttarakhand, Maharashtra) can be difficult. We bridge that gap with verified, seasoned scholars who bring pure samagri and respectful conduct.',
    preparationTips: [
      'Simply call or submit an inquiry with your desired date and locality in Hyderabad.',
      'Our senior Acharya confirms the auspicious Muhurat and assigns the best-suited Pandit Ji.',
      'All samagri is arranged by our team, ensuring complete peace of mind for your family.'
    ],
    faqs: [
      {
        q: 'How do I book a North Indian Hindi Pandit in Hyderabad?',
        a: 'Simply call us at +91 91830 89880 or send a WhatsApp message. Our coordinator will match your family traditions with a scholar Pandit Ji within 15 minutes.'
      },
      {
        q: 'Do you serve same-day or emergency bookings in Hyderabad?',
        a: 'Yes, we accommodate urgent same-day bookings with 2 to 3 hours notice across all major localities.'
      },
      {
        q: 'Are your Pandits fluent in Hindi?',
        a: 'Yes, all our Pandits speak fluent Hindi, Bhojpuri, Maithili, and English and explain every mantra ritual with deep cultural context.'
      }
    ]
  }
};

export default function ServiceLandingPage({ slug, onOpenBooking, onGoHome }) {
  const config = SERVICE_PAGES_CONFIG[slug] || SERVICE_PAGES_CONFIG['pandit-in-hyderabad'];
  const matchedPuja = config.pujaId
    ? PUJA_LIST.find((p) => p.id === config.pujaId)
    : null;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Dynamic Title & Meta Tags for High-Impact SEO
    if (config.seoTitle) {
      document.title = config.seoTitle;
    }
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && config.metaDesc) {
      metaDesc.setAttribute('content', config.metaDesc);
    }
    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', `https://www.northhindipandit.in/${config.slug}`);
    }
  }, [config]);

  const handleBookThisPuja = () => {
    if (onOpenBooking) {
      onOpenBooking(matchedPuja ? matchedPuja.name : config.h1);
    } else {
      window.location.href = '/#hero';
    }
  };

  // Structured Data (JSON-LD) for Breadcrumbs & Service
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.northhindipandit.in/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Services",
        "item": "https://www.northhindipandit.in/#services"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": config.h1,
        "item": `https://www.northhindipandit.in/${config.slug}`
      }
    ]
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": config.h1,
    "description": config.metaDesc,
    "provider": {
      "@type": "LocalBusiness",
      "name": "North Hindi Pandit - Vedic Puja Services",
      "telephone": "+919183089880",
      "url": "https://www.northhindipandit.in/",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Sri Bangaru Maisamma Thalli Devalayam, Bogulkunta, Tilak Rd, Ramkoti, Sultan Bazar, Koti",
        "addressLocality": "Hyderabad",
        "addressRegion": "Telangana",
        "postalCode": "500001",
        "addressCountry": "IN"
      }
    },
    "areaServed": [
      { "@type": "City", "name": "Hyderabad" },
      { "@type": "City", "name": "Secunderabad" },
      { "@type": "AdministrativeArea", "name": "Gachibowli, Hyderabad" },
      { "@type": "AdministrativeArea", "name": "Hitec City, Hyderabad" },
      { "@type": "AdministrativeArea", "name": "Madhapur, Hyderabad" },
      { "@type": "AdministrativeArea", "name": "Kondapur, Hyderabad" },
      { "@type": "AdministrativeArea", "name": "Kukatpally, Hyderabad" },
      { "@type": "AdministrativeArea", "name": "Miyapur, Hyderabad" }
    ],
    "serviceType": "Vedic Hindu Rituals & Puja"
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen text-[#1A0A08]">
      {/* Inject Dynamic JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      {/* Visual Breadcrumb Trail */}
      <div className="bg-[#FAF5ED] border-b border-[#EBDCC5] py-2.5 px-4 text-xs sm:text-sm text-[#7A2E1E]">
        <div className="max-w-6xl mx-auto flex items-center flex-wrap gap-2">
          <button
            onClick={onGoHome}
            className="flex items-center gap-1 hover:text-[#B45309] font-medium transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>
          <ChevronRight className="w-3 h-3 text-[#A8824B]" />
          <span className="text-[#A8824B]">Vedic Services</span>
          <ChevronRight className="w-3 h-3 text-[#A8824B]" />
          <span className="text-[#92400E] font-semibold">{config.h1}</span>
        </div>
      </div>

      {/* Service Hero Banner */}
      <section className="relative bg-gradient-to-b from-[#2A040C] via-[#3D0A14] to-[#1F0208] text-white py-12 md:py-16 px-4 overflow-hidden border-b-4 border-[#D4AF37]">
        {/* Subtle Background Mandala / Glow */}
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-400 via-transparent to-transparent"></div>

        <div className="max-w-6xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 bg-[#D4AF37]/20 border border-[#D4AF37]/50 text-amber-200 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>{config.badge}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-serif leading-tight text-[#FAF7F2]">
              {config.h1}
            </h1>

            <p className="text-sm sm:text-base text-amber-100/90 leading-relaxed max-w-2xl">
              {config.subtitle}
            </p>

            {/* Quick Feature Badges */}
            <div className="flex flex-wrap gap-3 pt-2 text-xs sm:text-sm text-amber-200/90">
              <span className="inline-flex items-center gap-1.5 bg-black/40 px-3 py-1.5 rounded-lg border border-amber-500/20">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>{matchedPuja?.duration || '2 - 3 Hours'}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 bg-black/40 px-3 py-1.5 rounded-lg border border-amber-500/20">
                <UserCheck className="w-4 h-4 text-amber-400" />
                <span>{matchedPuja?.pandits || 'Senior Varanasi Acharya'}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 bg-black/40 px-3 py-1.5 rounded-lg border border-amber-500/20">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>100% Pure Samagri Included</span>
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3.5 pt-4">
              <a
                href="tel:+919183089880"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#D97706] to-[#B45309] text-white px-6 py-3 rounded-full font-bold text-sm sm:text-base shadow-lg shadow-amber-900/40 hover:from-amber-600 hover:to-amber-700 transition-all transform hover:-translate-y-0.5"
              >
                <Phone className="w-4 h-4" />
                <span>Call: +91 91830 89880</span>
              </a>

              <a
                href={`https://wa.me/919183089880?text=Namaste!%20I%20want%20to%20consult%20and%20book%20${encodeURIComponent(config.h1)}%20in%20Hyderabad.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white px-6 py-3 rounded-full font-bold text-sm sm:text-base shadow-lg shadow-emerald-950/40 transition-all transform hover:-translate-y-0.5"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Pandit Ji</span>
              </a>

              <button
                type="button"
                onClick={handleBookThisPuja}
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-amber-100 border border-amber-300/40 px-5 py-3 rounded-full font-semibold text-sm transition-colors"
              >
                <span>Book This Puja</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Hero Image Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative rounded-2xl overflow-hidden border-2 border-[#D4AF37]/50 shadow-2xl max-w-md w-full bg-black/40">
              <img
                src={config.heroImage}
                alt={config.imageAlt}
                className="w-full h-64 sm:h-80 object-cover transform hover:scale-105 transition-transform duration-500"
                loading="eager"
                width="480"
                height="320"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 text-xs text-amber-100 text-center">
                <p className="font-semibold text-amber-300">{config.badge}</p>
                <p className="text-gray-300 text-[11px]">Doorstep Vedic Service Across Hyderabad</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Informative Content Body */}
      <div className="max-w-6xl mx-auto py-10 px-4 space-y-10">
        {/* Section 1: Significance & Who Needs It */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#EBDCC5] shadow-sm space-y-3">
            <div className="flex items-center gap-2.5 text-[#8B0000] font-bold text-lg font-serif">
              <Flame className="w-5 h-5 text-amber-600" />
              <h2>About This Auspicious Ritual</h2>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">
              {config.whyImportant}
            </p>
            <p className="text-sm text-gray-700 leading-relaxed">
              Our Acharyas originate from Varanasi and Ayodhya. They conduct this puja according to strict Shastra-sammat Vidhi, chanting Shukla Yajurveda Sanskrit mantras with complete Hindi explanations.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#EBDCC5] shadow-sm space-y-3">
            <div className="flex items-center gap-2.5 text-[#8B0000] font-bold text-lg font-serif">
              <Sparkles className="w-5 h-5 text-amber-600" />
              <h2>Who Should Perform This Puja</h2>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">
              {config.targetAudience}
            </p>
            <div className="pt-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-800">Key Devotee Benefits:</span>
              <ul className="mt-2 space-y-1.5 text-xs sm:text-sm text-gray-600">
                {(matchedPuja?.benefits || [
                  'Removes doshas and brings peace, prosperity, and harmony',
                  'Invokes blessings of Ishta Devata, Navagraha, and Kuldevata',
                  'Complete mental tranquility and sanctified home atmosphere'
                ]).map((b, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Section 2: Step-by-Step Vidhi Highlights */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#EBDCC5] shadow-sm">
          <div className="flex items-center gap-2.5 text-[#8B0000] font-bold text-xl font-serif mb-4">
            <ShieldCheck className="w-6 h-6 text-amber-600" />
            <h2>Step-by-Step Vedic Vidhi Highlights</h2>
          </div>
          <p className="text-sm text-gray-600 mb-6">
            Conducted by our senior scholars following authentic Karmakand traditions:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {(matchedPuja?.vidhiHighlights || [
              'Swasti Vachan & Shanti Path chanting',
              'Sankalpa with devotee Gotra and family names',
              'Gauri-Ganesh Pujan & Shodashopachara Vidhi',
              'Navagraha & Kalash Sthapana with Sarvatobhadra Mandal',
              'Sacred Hawan / Yajna with pure ghee ahutis',
              'Maha Mangal Aarti, Pushpanjali, and Ashirvad'
            ]).map((v, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-3.5 rounded-xl bg-[#FAF7F2] border border-[#EBDCC5]/70 hover:border-amber-400 transition-colors"
              >
                <div className="w-6 h-6 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                  {i + 1}
                </div>
                <span className="text-xs sm:text-sm text-gray-800 font-medium leading-snug">{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: 100% Pure Samagri Included */}
        <div className="bg-gradient-to-br from-[#FFFDF9] to-[#FFF8ED] p-6 sm:p-8 rounded-2xl border border-[#D4AF37]/50 shadow-sm">
          <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
            <div className="flex items-center gap-2.5 text-[#8B0000] font-bold text-xl font-serif">
              <CheckCircle2 className="w-6 h-6 text-emerald-600" />
              <h2>100% Pure Vedic Samagri List (Included)</h2>
            </div>
            <span className="bg-emerald-100 text-emerald-800 text-xs px-3 py-1 rounded-full font-semibold border border-emerald-300">
              Zero Market Running for Devotees
            </span>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 mb-5">
            We provide all authentic, unadulterated samagri kit sourced directly from sacred centers (Varanasi, Haridwar):
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {(matchedPuja?.samagriIncluded || [
              'Pure Desi Cow Ghee (A2 quality)',
              'Sacred Hawan Samidha (dry mango wood)',
              'Original Gangajal from Haridwar',
              'Navadhanya (9 sacred grains) & Vastu Yantra',
              'Roli, Akshat, Chandan, Haldi, Moli, Janeu',
              'Pure Bhimseni Kapoor, Dhoop, and Ghee Diyas',
              'Panchamrit preparation ingredients',
              'Fresh betel leaves (Paan), Supari, Clove, Cardamom',
              'Aarti Sangrah & sacred chanting booklet'
            ]).map((s, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-gray-700 bg-white p-2.5 rounded-lg border border-[#EBDCC5]">
                <span className="text-amber-600">🌿</span>
                <span>{s}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: General Preparation Tips */}
        <div className="bg-white p-6 sm:p-7 rounded-2xl border border-[#EBDCC5] shadow-sm space-y-3">
          <div className="flex items-center gap-2.5 text-[#8B0000] font-bold text-lg font-serif">
            <Calendar className="w-5 h-5 text-amber-600" />
            <h2>Devotee Preparation & Guidelines</h2>
          </div>
          <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
            {config.preparationTips.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="text-amber-600 font-bold">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Section 5: Local Hyderabad Coverage Areas */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#EBDCC5] shadow-sm space-y-4">
          <div className="flex items-center gap-2.5 text-[#8B0000] font-bold text-xl font-serif">
            <MapPin className="w-6 h-6 text-amber-600" />
            <h2>Localities Served in Hyderabad & Secunderabad</h2>
          </div>
          <p className="text-xs sm:text-sm text-gray-600">
            Our Acharyas provide punctual doorstep arrival with complete samagri across all major residential and IT hubs:
          </p>
          <div className="flex flex-wrap gap-2 text-xs font-medium text-gray-800">
            {[
              'Gachibowli',
              'Hitec City',
              'Madhapur',
              'Kondapur',
              'Kukatpally (KPHB)',
              'Miyapur',
              'Chandanagar',
              'Nizampet',
              'Bachupally',
              'Jubilee Hills',
              'Banjara Hills',
              'Manikonda',
              'Nanakramguda',
              'Tellapur',
              'Nallagandla',
              'Secunderabad',
              'Begumpet',
              'Ameerpet',
              'Uppal',
              'Dilsukhnagar',
              'Koti & Ramkoti'
            ].map((loc, idx) => (
              <span
                key={idx}
                className="bg-[#FAF7F2] border border-[#EBDCC5] hover:border-amber-500 px-3 py-1.5 rounded-full transition-colors flex items-center gap-1.5"
              >
                <span className="text-amber-600">📍</span>
                <span>{loc}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Section 6: Genuine FAQs */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#EBDCC5] shadow-sm space-y-5">
          <div className="flex items-center gap-2.5 text-[#8B0000] font-bold text-xl font-serif">
            <HelpCircle className="w-6 h-6 text-amber-600" />
            <h2>Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {config.faqs.map((faq, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-[#FAF7F2] border border-[#EBDCC5]/70 space-y-1.5">
                <h3 className="text-sm sm:text-base font-bold text-gray-900 font-serif">{faq.q}</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 7: Internal Links to Other Auspicious Pujas */}
        <div className="p-6 sm:p-7 rounded-2xl bg-[#FFF8EB] border border-[#D4AF37]/40 space-y-3">
          <h3 className="text-base font-bold text-[#8B0000] font-serif">Explore Other Auspicious Vedic Services in Hyderabad</h3>
          <div className="flex flex-wrap gap-2.5 text-xs sm:text-sm">
            {Object.values(SERVICE_PAGES_CONFIG)
              .filter((p) => p.slug !== config.slug)
              .map((p) => (
                <a
                  key={p.slug}
                  href={`/${p.slug}`}
                  className="bg-white border border-[#EBDCC5] hover:border-amber-600 text-amber-900 hover:text-amber-700 px-3.5 py-1.5 rounded-full font-medium transition-colors shadow-2xs"
                >
                  {p.h1}
                </a>
              ))}
          </div>
        </div>

        {/* Section 8: Final Booking Call-to-Action Card */}
        <div className="bg-gradient-to-r from-[#3D0A14] to-[#2A040C] text-white p-8 sm:p-10 rounded-3xl border-2 border-[#D4AF37] text-center space-y-5 shadow-xl">
          <div className="inline-block text-2xl">🕉️</div>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#FAF7F2]">
            Book {config.h1} with Experienced Acharyas
          </h2>
          <p className="text-sm sm:text-base text-amber-100/90 max-w-xl mx-auto">
            Doorstep Vedic ritual with 100% pure Samagri, precise Sanskrit mantras, and full Hindi explanations.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <a
              href="tel:+919183089880"
              className="inline-flex items-center gap-2 bg-[#D97706] hover:bg-amber-600 text-white px-7 py-3 rounded-full font-bold shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <Phone className="w-4 h-4" />
              <span>Call: +91 91830 89880</span>
            </a>
            <a
              href={`https://wa.me/919183089880?text=Namaste!%20I%20want%20to%20consult%20for%20${encodeURIComponent(config.h1)}.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white px-7 py-3 rounded-full font-bold shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Us</span>
            </a>
            <button
              type="button"
              onClick={handleBookThisPuja}
              className="inline-flex items-center gap-2 bg-white text-[#4E0A17] hover:bg-amber-50 px-6 py-3 rounded-full font-bold transition-colors"
            >
              <span>Instant Consultation Form</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
