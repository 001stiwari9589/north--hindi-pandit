import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { sendWhatsAppNotification } from './whatsappService.js';
import { sendEmailNotification } from './emailService.js';
import { connectDB, getDBStatus, Booking, Inquiry } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize MongoDB Connection (with graceful local JSON fallback)
connectDB();

app.use(cors());
app.use(express.json());

const dataDir = process.env.VERCEL ? path.join('/tmp', 'data') : path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const bookingsFile = path.join(dataDir, 'bookings.json');
const inquiriesFile = path.join(dataDir, 'inquiries.json');

if (!fs.existsSync(bookingsFile)) {
  fs.writeFileSync(bookingsFile, JSON.stringify([]));
}
if (!fs.existsSync(inquiriesFile)) {
  fs.writeFileSync(inquiriesFile, JSON.stringify([]));
}

// Helpers
const readJSON = (filePath) => {
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data || '[]');
  } catch (err) {
    return [];
  }
};

const writeJSON = (filePath, data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
};

// Puja services catalog with full details
const servicesCatalog = [
  {
    id: "satyanarayan-puja",
    name: "Satyanarayan Katha & Puja",
    hindiName: "श्री सत्यनारायण व्रत कथा एवं हवन",
    badge: "Most Popular",
    category: "Auspicous",
    image: "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=800&q=80",
    description: "Traditional Sri Satyanarayan Bhagwan Katha with Navagraha & Gauri-Ganesh Pujan, 5 Adhyay Katha path, Havan, and Prasad distribution for prosperity and peace.",
    price: 2499,
    priceWithSamagri: 3999,
    duration: "2 - 2.5 Hours",
    pandits: "1 Senior North Indian Vedic Pandit",
    samagriIncluded: [
      "Panchamrit, Gangajal, Pure Desi Ghee",
      "Roli, Chandan, Haldi, Akshat, Moli",
      "Navagraha Dhoop, Kapoor, Supari, Paan Leaves",
      "Dry fruits, Panchmeva, Janeu, Havan Samidha",
      "Katha Pustak, Aarti Sangrah"
    ],
    vidhiHighlights: [
      "Gauri Ganesh Sthapana & Kalash Pujan",
      "Navagraha & Digpal Awahan",
      "5 Chapters of Satyanarayan Katha narration in Hindi/Sanskrit",
      "Hawan Yajna with Gayatri & Mahamrityunjaya Mantras",
      "Aarti, Shanti Path, and Charan-Amrit distribution"
    ]
  },
  {
    id: "grihapravesh-puja",
    name: "Grihapravesh & Vastu Shanti Puja",
    hindiName: "गृह प्रवेश एवं वास्तु शांति महापूजन",
    badge: "Trending",
    category: "Housewarming",
    image: "https://images.unsplash.com/photo-1545232979-fbf68fe9b1af?auto=format&fit=crop&w=800&q=80",
    description: "Auspicious housewarming ceremony according to Vedic traditions. Eliminates negative energies, purifies the new dwelling with Vastu Purusha invocation & Hawan.",
    price: 4999,
    priceWithSamagri: 7499,
    duration: "3 - 4 Hours",
    pandits: "1 or 2 Experienced Hindi/Bihari Pandits",
    samagriIncluded: [
      "Vastu Kalash, Copper Lota, Coconut, Mango Leaves",
      "Navadhanya (9 sacred grains), Vastu Yantra",
      "Pure Havan Kund / Herbs, Cow Dung Cakes (Upla)",
      "Desi Cow Ghee (1kg), Guggal, Loban, Camphor",
      "Red & Yellow Cloth, Toran for Main Gate"
    ],
    vidhiHighlights: [
      "Dwar Puja & Auspicious Milk Boiling ritual (Doodh Ubalna)",
      "Gauri Ganesh Pujan & Vastu Purusha Sthapana",
      "Navagraha Mandal Pujan & Shanti Path",
      "Purification Hawan with Maha Vastu Mantras",
      "Ghar Parikrama with Kalash water for positive aura"
    ]
  },
  {
    id: "rudrabhishek-puja",
    name: "Maha Rudrabhishek Puja",
    hindiName: "महा रुद्राभिषेक एवं शिव पूजन",
    badge: "Spiritual",
    category: "Dosha Nivaran",
    image: "https://images.unsplash.com/photo-1583089892943-e02e5b017b6a?auto=format&fit=crop&w=800&q=80",
    description: "Sacred abhisheka of Lord Shiva with holy liquids (Panchamrit, Sugarcane juice, Honey, Gangajal) along with powerful Shukla Yajurveda Rudri Path chants.",
    price: 3499,
    priceWithSamagri: 4999,
    duration: "2 - 3 Hours",
    pandits: "1 Senior Vedic Pandit (Yajurvedi specialist)",
    samagriIncluded: [
      "Pure Bilva Patra (Belpatra 108 leaves), Dhatura, Bhasma",
      "Gangajal, Cow Milk, Curd, Pure Honey, Sugarcane juice",
      "Chandan, Attar (Perfume), Akshat, White Flowers",
      "Rudraksha Mala, Janeu, Diya & Batti, Shiv Aarti sheet"
    ],
    vidhiHighlights: [
      "Shiva Linga Prana Pratishtha & Dhyana",
      "Ekadasha Rudra Abhishek with authentic Vedic chanting",
      "Chanting of Sri Rudram & Chamakam from Yajurveda",
      "Maha Mrityunjaya Jaap & Bilvashtakam recitation",
      "Maha Mangal Aarti and Prasadam"
    ]
  },
  {
    id: "marriage-puja",
    name: "Vivah Sanskar / Marriage Ceremony",
    hindiName: "वैदिक विवाह संस्कार एवं फेरे",
    badge: "Grand",
    category: "Sanskar",
    image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80",
    description: "Complete traditional North Indian Vedic wedding solemnization including Jaimala, Kanyadaan, Saptapadi (7 Pheras), Havan, and Sindoor Daan by scholarly pandits.",
    price: 11999,
    priceWithSamagri: 16999,
    duration: "4 - 5 Hours",
    pandits: "2 or 3 Acharya Pandits (Vedic Specialists)",
    samagriIncluded: [
      "Vedic Mandap Pujan Samagri, Sacred Wood, Camphor",
      "Kanyadaan Thali essentials, Silver Coins for Vidhi",
      "Saptapadi Betel nuts, Raw rice, Turmeric roots",
      "Pure Ghee (2kg), Hawan Samagri, Lavang, Elaichi",
      "Gathbandhan dupatta, Sindoor, Mangalsutra Pujan set"
    ],
    vidhiHighlights: [
      "Var Aagman, Dwarchar & Madhuparka Puja",
      "Gauri-Ganesh Pujan & Kanyadaan Sankalp",
      "Panigrahana & Vivah Hawan",
      "Saptapadi (Seven Vows of Sacred Marriage) with meaning in Hindi",
      "Sindoor Daan, Mangalsutra Dharan & Ashirwad"
    ]
  },
  {
    id: "business-puja",
    name: "Office Opening & Business Puja",
    hindiName: "दुकान / ऑफिस उद्घाटन एवं व्यापार वृद्धि पूजन",
    badge: "Prosperity",
    category: "Auspicous",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
    description: "Invokes Goddess Lakshmi and Lord Ganesha for wealth, business growth, removing obstacles, and bringing prosperity to your new venture, shop, or office.",
    price: 3999,
    priceWithSamagri: 5999,
    duration: "2 - 2.5 Hours",
    pandits: "1 Senior North Indian Pandit",
    samagriIncluded: [
      "Lakshmi-Ganesh Idol / Photo, Kuber Yantra",
      "Bahi-Khata / Laptop & Ledger Pujan materials",
      "Ashta Gandh, Kamalgatta, Coriander seeds, Yellow Cowries",
      "Hawan Kund, Samidha, Ghee, Sweets, Betel Leaves"
    ],
    vidhiHighlights: [
      "Shree Ganesh Pujan & Vighna Vinashak Stotra",
      "Maha Lakshmi Awahan with Sri Suktam recitation",
      "Kuber Puja for financial stability",
      "Vyapar Vriddhi Hawan with Ahuti",
      "Locker & Cash Counter / Workstation blessing"
    ]
  },
  {
    id: "navagraha-puja",
    name: "Navagraha Shanti Puja & Hawan",
    hindiName: "नवग्रह शांति पूजन एवं महाहवन",
    badge: "Planetary Peace",
    category: "Dosha Nivaran",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80",
    description: "Balancing the 9 celestial planetary influences (Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Rahu, Ketu) to alleviate doshas, delays, and distress.",
    price: 3499,
    priceWithSamagri: 5199,
    duration: "2.5 Hours",
    pandits: "1 Learned Vedic Astrologer & Pandit",
    samagriIncluded: [
      "Navadhanya, 9 Color cloths for planets, Navagraha Yantra",
      "Specific samidhas (Ark, Palash, Khadir, Apamarg, Peepal)",
      "Sesame seeds (Til), Jau, Ghee, Guggal, Loban"
    ],
    vidhiHighlights: [
      "Navagraha Mandal creation with colorful rice grains",
      "Graha Japa recitation for afflicted planets",
      "Individual Navagraha Ahuti in Hawan",
      "Shanti Path and planetary protection kavach"
    ]
  },
  {
    id: "mahamrityunjaya-jaap",
    name: "Maha Mrityunjaya Jaap & Hawan",
    hindiName: "महा मृत्युंजय जप एवं आरोग्य हवन",
    badge: "Health & Healing",
    category: "Dosha Nivaran",
    image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80",
    description: "A potent Vedic healing ritual to remove serious illness, accidents, mental stress, and negative vibrations for long life and vitality.",
    price: 4499,
    priceWithSamagri: 6999,
    duration: "3 - 3.5 Hours",
    pandits: "1 or 2 Vedic Acharyas",
    samagriIncluded: [
      "Giloy, Belpatra, Dhatura, Til, Jau, Durva grass",
      "Pure Cow Ghee, Camphor, Guggal, Ayurvedic herbs",
      "Mrityunjaya Yantra, Sacred threads (Raksha Sutra)"
    ],
    vidhiHighlights: [
      "Sankalp for the devotee or ailing family member",
      "Rudram Path & 1,100 / 2,100 / 5,100 Jaap count",
      "Amrit Sanjeevani Hawan with Giloy stems",
      "Raksha Kavach tying on wrist & Ashirwad"
    ]
  },
  {
    id: "diwali-laxmi-puja",
    name: "Diwali & Maha Lakshmi Puja",
    hindiName: "दीपावली महालक्ष्मी एवं कुबेर पूजन",
    badge: "Festival",
    category: "Auspicous",
    image: "https://images.unsplash.com/photo-1508963493744-76fce69379c0?auto=format&fit=crop&w=800&q=80",
    description: "Traditional Deepawali Lakshmi-Ganesh Puja at home or commercial establishment to usher in prosperity, happiness, and supreme divine grace.",
    price: 2999,
    priceWithSamagri: 4499,
    duration: "2 Hours",
    pandits: "1 Experienced North Indian Pandit",
    samagriIncluded: [
      "Lotus flowers, Kamalgatta, Silver/Gold coin vidhi",
      "Laxmi Ganesh Pratima, Kheel, Batashe, Panchmeva",
      "Diwali Deepam Pujan samagri, Pure Desi Ghee"
    ],
    vidhiHighlights: [
      "Deepak Jyoti Pujan & Kalash Sthapana",
      "Sri Suktam, Kanakadhara Stotra & Lakshmi Sahasranama",
      "Kuber Khazana Pujan & Aabharan (Jewelry) Pujan",
      "Maha Aarti with 108 Deepaks & Shanti Path"
    ]
  },
  {
    id: "bhoomi-puja",
    name: "Bhoomi Puja & Foundation Stone",
    hindiName: "भूमि पूजन एवं नींव शिलान्यास",
    badge: "Construction",
    category: "Housewarming",
    image: "https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=800&q=80",
    description: "Performed before commencing construction on a plot to appease Bhumi Devi (Mother Earth), Vastu Purusha, and seek blessings for safety and speed.",
    price: 4999,
    priceWithSamagri: 7499,
    duration: "2.5 - 3 Hours",
    pandits: "1 Vedic Shastra Pandit",
    samagriIncluded: [
      "Pancharatna, 5 Bricks, Navadhanya, Copper pot",
      "Naga-Nagin pair in silver/copper for earth blessing",
      "Hawan Samidha, Ghee, Coconuts, Flowers, Vermilion"
    ],
    vidhiHighlights: [
      "Digging first auspicious corner (Ishanya corner)",
      "Bhumi Devi & Shesha Naga Awahan",
      "Foundation Stone (Shila) consecration",
      "Bhoomi Hawan & Shanti Paath"
    ]
  },
  {
    id: "sundarkand-path",
    name: "Akhand Sundarkand & Hanuman Chalisa",
    hindiName: "सुंदरकांड पाठ एवं हनुमान जी की चौकी",
    badge: "Bhakti",
    category: "Auspicous",
    image: "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=800&q=80",
    description: "Musical and devotional recitation of Sri Ramcharitmanas Sundarkand. Bestows fearlessness, removes crisis, ward off evil spirits, and infuses positive energy.",
    price: 3499,
    priceWithSamagri: 4999,
    duration: "2.5 - 3 Hours",
    pandits: "1 or 2 Kirtan & Path Specialist Pandits",
    samagriIncluded: [
      "Sindoor, Chameli Oil, Hanuman Chola, Dhoop, Diya",
      "Besan Laddoos / Boondi prasad, Tulsi Dal, Bananas",
      "Ramayana Sundarkand Granth, Hawan essentials"
    ],
    vidhiHighlights: [
      "Ram Durbar Sthapana & Hanuman Awahan",
      "Complete melodious Sundarkand recitation in Hindi",
      "Hanuman Chalisa & Sankat Mochan Path",
      "Hanuman Ji Chola Arpan & Hawan Aarti"
    ]
  },
  {
    id: "namkaran-puja",
    name: "Namkaran Sanskar (Baby Naming)",
    hindiName: "नामकरण संस्कार एवं जातकर्म",
    badge: "Sanskar",
    category: "Sanskar",
    image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=800&q=80",
    description: "Vedic ceremony to give an auspicious name to a newborn child based on Janma Nakshatra and astrological planetary alignment for a prosperous life.",
    price: 2999,
    priceWithSamagri: 4499,
    duration: "2 Hours",
    pandits: "1 Jyotish & Vedic Pandit",
    samagriIncluded: [
      "Bronze plate (Kansa thali) with honey and gold quill vidhi",
      "Navagraha samagri, New white & red cloth for baby",
      "Hawan samagri, Ghee, Kalash items, Sweets"
    ],
    vidhiHighlights: [
      "Ayushya Hawan for child's health & longevity",
      "Nakshatra & Rashi calculation by Pandit Ji",
      "Whispering the sacred name in baby's right ear",
      "Family blessings and gift sanctification"
    ]
  },
  {
    id: "pitru-dosh-tarpan",
    name: "Pitra Dosh Nivaran & Tarpan",
    hindiName: "पितृ दोष शांति, श्राद्ध एवं तर्पण",
    badge: "Ancestral",
    category: "Dosha Nivaran",
    image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80",
    description: "Ancestral peace ritual to liberate souls of forefathers, seeking their blessings, eliminating family hurdles, financial stops, and progeny delays.",
    price: 3499,
    priceWithSamagri: 5299,
    duration: "2 - 2.5 Hours",
    pandits: "1 Senior Vedic Karmakandi Pandit",
    samagriIncluded: [
      "Kusha grass ring (Pavitri), Black sesame (Kala Til), Jau",
      "Gangajal, Milk, Honey, White flowers, Janeu",
      "Pind Daan rice flour preparation & Hawan items"
    ],
    vidhiHighlights: [
      "Sankalp with Gotra and Father's ancestral lineage",
      "Tarpan vidhi with sacred water & black sesame",
      "Pind Daan & Pitra Gayatri Ahuti in Hawan",
      "Brahmin Bhojan sankalp and Gau grass offering"
    ]
  }
];

// Routes
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'North Indian Hindi Pandit Booking API',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

app.get(['/api/services', '/services'], (req, res) => {
  res.json(servicesCatalog);
});

app.get(['/api/stats', '/stats'], (req, res) => {
  res.json({
    yearsExperience: "20+",
    happyFamilies: "15,000+",
    pujasCompleted: "20,000+",
    certifiedPandits: "35+",
    customerRating: "4.9 / 5.0",
    citiesServed: ["Bangalore", "Delhi-NCR", "Mumbai", "Hyderabad", "Pune", "All-India Virtual"]
  });
});

app.post(['/api/bookings', '/bookings'], async (req, res) => {
  try {
    const {
      devoteeName,
      phoneNumber,
      email,
      pujaType,
      pujaDate,
      preferredTime,
      cityArea,
      fullAddress,
      samagriOption,
      estimatedPrice,
      notes
    } = req.body;

    if (!devoteeName || !phoneNumber || !pujaType) {
      return res.status(400).json({
        success: false,
        message: 'devoteeName, phoneNumber, and pujaType are required fields.'
      });
    }

    // Strict validation: Reject numbers in devotee name
    if (/\d/.test(devoteeName)) {
      return res.status(400).json({
        success: false,
        message: 'Name cannot contain numbers. Only letters are allowed.'
      });
    }

    // Strict validation: Indian 10-digit phone number
    const cleanPhone = phoneNumber.replace(/\D/g, '');
    if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9.'
      });
    }

    const bookings = readJSON(bookingsFile);
    const bookingId = 'NHP-' + Date.now().toString().slice(-6);

    const newBooking = {
      bookingId,
      devoteeName: devoteeName.trim(),
      phoneNumber: cleanPhone,
      email: email || '',
      pujaType,
      pujaDate: pujaDate || 'To be decided / Muhurat consultation',
      preferredTime: preferredTime || 'Morning (Shubh Muhurat)',
      cityArea: cityArea || 'Bangalore / Local Area',
      fullAddress: fullAddress || '',
      samagriOption: samagriOption || 'with-samagri',
      estimatedPrice: estimatedPrice || 2499,
      notes: notes || '',
      status: 'Confirmed - Pandit Assigned',
      createdAt: new Date().toISOString()
    };

    bookings.unshift(newBooking);
    writeJSON(bookingsFile, bookings);

    // Save to MongoDB if connected
    if (getDBStatus()) {
      try {
        await Booking.create(newBooking);
        console.log(`[MongoDB] Booking ${bookingId} saved successfully.`);
      } catch (dbErr) {
        console.error('[MongoDB Save Error]', dbErr.message);
      }
    }

    // Automated Method 2: Trigger background WhatsApp alert to Pandit Ji (+91 77720 35222)
    const whatsappResult = await sendWhatsAppNotification({
      bookingId,
      devoteeName: devoteeName.trim(),
      phoneNumber: cleanPhone,
      pujaName: pujaType,
      pujaDate: newBooking.pujaDate,
      city: newBooking.cityArea,
      specialRequests: notes
    }, 'booking');

    // Instant Free Email Notification to Pandit Ji's Gmail (AWAITED for serverless reliability)
    let emailResult = null;
    try {
      emailResult = await sendEmailNotification({
        bookingId,
        devoteeName: devoteeName.trim(),
        phoneNumber: cleanPhone,
        pujaName: pujaType,
        pujaDate: newBooking.pujaDate,
        cityArea: newBooking.cityArea,
        notes
      });
      console.log(`[BOOKING DISPATCH] Email notification finished:`, emailResult);
    } catch (emailErr) {
      console.error('[EMAIL DISPATCH ERROR]', emailErr.message);
    }

    // Build WhatsApp message redirect URL with updated contact 7772035222
    const whatsappMsg = `*जय सिया राम! New Puja Booking Request*\n\n` +
      `*Booking ID:* ${bookingId}\n` +
      `*Devotee Name:* ${devoteeName.trim()}\n` +
      `*Phone Number:* ${cleanPhone}\n` +
      `*Puja Type:* ${pujaType}\n` +
      `*Date & Time:* ${newBooking.pujaDate} (${newBooking.preferredTime})\n` +
      `*Location:* ${newBooking.cityArea}\n` +
      `*Samagri Option:* ${newBooking.samagriOption === 'with-samagri' ? 'Include All Pure Samagri' : 'Pandit Ji Only'}\n` +
      `*Est. Dakshina:* ₹${newBooking.estimatedPrice}\n\n` +
      `Kripya shubh muhurat aur Pandit Ji assignment confirm karein. Dhanyawad!`;

    const whatsappUrl = `https://wa.me/917772035222?text=${encodeURIComponent(whatsappMsg)}`;

    res.status(201).json({
      success: true,
      message: 'Aapki Puja Booking safaltapurvak darj ho gayi hai! Pandit Ji ko WhatsApp aur Email alert bhej diya gaya hai.',
      booking: newBooking,
      database: getDBStatus() ? 'mongodb' : 'local_json_backup',
      whatsappNotified: true,
      whatsappResult,
      emailResult,
      whatsappUrl
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to save booking',
      error: err.message
    });
  }
});

app.get(['/api/bookings', '/bookings'], async (req, res) => {
  if (getDBStatus()) {
    try {
      const dbBookings = await Booking.find().sort({ createdAt: -1 }).lean();
      return res.json(dbBookings);
    } catch (err) {
      console.error('[MongoDB Query Error]', err.message);
    }
  }
  const bookings = readJSON(bookingsFile);
  res.json(bookings);
});

app.post(['/api/inquiries', '/inquiries'], async (req, res) => {
  try {
    const { name, phone, message, preferredPuja } = req.body;
    if (!name || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Name and phone are required.'
      });
    }

    if (/\d/.test(name)) {
      return res.status(400).json({
        success: false,
        message: 'Name cannot contain numbers. Only letters are allowed.'
      });
    }

    const cleanPhone = phone.replace(/\D/g, '');
    if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid 10-digit mobile number.'
      });
    }

    const inquiries = readJSON(inquiriesFile);
    const newInquiry = {
      id: 'INQ-' + Date.now().toString().slice(-5),
      name: name.trim(),
      phone: cleanPhone,
      message: message || '',
      preferredPuja: preferredPuja || 'General Consultation',
      createdAt: new Date().toISOString()
    };

    inquiries.unshift(newInquiry);
    writeJSON(inquiriesFile, inquiries);

    // Save to MongoDB if connected
    if (getDBStatus()) {
      try {
        await Inquiry.create({
          inquiryId: newInquiry.id,
          name: newInquiry.name,
          phone: newInquiry.phone,
          preferredPuja: newInquiry.preferredPuja,
          message: newInquiry.message,
          createdAt: newInquiry.createdAt
        });
        console.log(`[MongoDB] Inquiry ${newInquiry.id} saved successfully.`);
      } catch (dbErr) {
        console.error('[MongoDB Save Error]', dbErr.message);
      }
    }

    // Automated Method 2: Trigger background WhatsApp alert to Pandit Ji (+91 77720 35222)
    const whatsappResult = await sendWhatsAppNotification({
      inquiryId: newInquiry.id,
      name: name.trim(),
      phone: cleanPhone,
      preferredPuja: preferredPuja || 'General Consultation',
      message
    }, 'inquiry');

    // Instant Free Email Notification to Pandit Ji's Gmail (AWAITED for serverless reliability)
    let emailResult = null;
    try {
      emailResult = await sendEmailNotification({
        bookingId: newInquiry.id,
        devoteeName: newInquiry.name,
        phoneNumber: cleanPhone,
        pujaName: preferredPuja || 'General Consultation',
        pujaDate: 'Consultation Inquiry',
        cityArea: 'Website Lead',
        notes: message
      });
      console.log(`[INQUIRY DISPATCH] Email notification finished:`, emailResult);
    } catch (emailErr) {
      console.error('[EMAIL DISPATCH ERROR]', emailErr.message);
    }

    res.status(201).json({
      success: true,
      message: 'Dhanyawad! Aapka anurodh prapt ho gaya hai aur Pandit Ji ko WhatsApp aur Email alert bhej diya gaya hai.',
      inquiry: newInquiry,
      database: getDBStatus() ? 'mongodb' : 'local_json_backup',
      whatsappNotified: true,
      whatsappResult,
      emailResult
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to record inquiry',
      error: err.message
    });
  }
});

app.get(['/api/inquiries', '/inquiries'], async (req, res) => {
  if (getDBStatus()) {
    try {
      const dbInquiries = await Inquiry.find().sort({ createdAt: -1 }).lean();
      return res.json(dbInquiries);
    } catch (err) {
      console.error('[MongoDB Query Error]', err.message);
    }
  }
  const inquiries = readJSON(inquiriesFile);
  res.json(inquiries);
});

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`[North Hindi Pandit API] Server running on http://localhost:${PORT}`);
  });
}

export default app;
