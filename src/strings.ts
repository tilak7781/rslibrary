import type { Locale } from "./context/SitePreferences";

export type UiCopy = {
  brandTagline: string;
  skipLink: string;
  nav: {
    about: string;
    amenities: string;
    visit: string;
    rules: string;
    faq: string;
    gallery: string;
    contact: string;
    privacy: string;
  };
  toolbar: {
    langEn: string;
    langHi: string;
    themeLight: string;
    themeDark: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    lede: string;
    bullets: [string, string, string];
    ctaMessage: string;
    ctaAmenities: string;
    facts: { model: string; space: string; basics: string };
    factsLabels: { model: string; space: string; basics: string };
    asideLabel: string;
  };
  about: { title: string; lead: string; body: string };
  facilities: {
    title: string;
    intro: string;
    cards: [string, string, string, string];
    cardBodies: [string, string, string, string];
    noteLead: string;
    noteRest: string;
  };
  visit: {
    title: string;
    intro: string;
    address: string;
    hours: string;
    fees: string;
    call: string;
    whatsapp: string;
    mapTitle: string;
    directionsPlaceholder: string;
    openInMaps: string;
    copyAddress: string;
    addressCopied: string;
    copyHours: string;
    hoursCopied: string;
  };
  rules: { title: string; intro: string; items: string[] };
  faq: {
    title: string;
    intro: string;
    items: { q: string; a: string }[];
  };
  gallery: {
    title: string;
    intro: string;
    captions: [string, string, string];
  };
  contact: { title: string; lead: string; fine: string };
  privacy: { title: string; body: string };
  footer: {
    brand: string;
    privacy: string;
    copyright: string;
    socialHeading: string;
  };
  quickActions: {
    copyLink: string;
    linkCopied: string;
    sharePage: string;
    shared: string;
    copyFailed: string;
  };
  layout: { backToTop: string; announceDismiss: string };
  waFab: string;
};

const EN: UiCopy = {
  brandTagline: "Quiet study · Your materials",
  skipLink: "Skip to main content",
  nav: {
    about: "About",
    amenities: "Amenities",
    visit: "Visit",
    rules: "Rules",
    faq: "FAQ",
    gallery: "Gallery",
    contact: "Contact",
    privacy: "Privacy",
  },
  toolbar: {
    langEn: "EN",
    langHi: "हिंदी",
    themeLight: "Light theme",
    themeDark: "Dark theme",
  },
  hero: {
    eyebrow: "Reading room for students",
    title: "Open your notes. Stay until the chapter makes sense.",
    lede: "RS Library is not a book bank—we never issue textbooks. Walk in with whatever you are studying; we keep the room comfortable so your attention stays on the page, not on finding a seat or a sip of water.",
    bullets: [
      "Carry-in only: your books, notes, laptop—whatever helps you revise.",
      "Steady seating and AC so marathon sessions feel less draining.",
      "Drinking water and washrooms on site—small things, fewer interruptions.",
    ],
    ctaMessage: "Message us",
    ctaAmenities: "See amenities",
    facts: {
      model: "Bring-your-own materials",
      space: "Tables, chairs & AC",
      basics: "Water & washrooms",
    },
    factsLabels: { model: "Model", space: "Space", basics: "Basics" },
    asideLabel: "Quick facts",
  },
  about: {
    title: "Who we are",
    lead: "Think of us as a calm corner built around concentration. Students share one quiet rule: keep voices low and phones respectful so everyone can prep for exams, finish assignments, or simply read without competing for elbow room at a café table.",
    body: "We do not run a lending desk or sell stationery packs—just a dependable study hall where the atmosphere does half the work.",
  },
  facilities: {
    title: "Amenities we keep ready",
    intro:
      "Everything listed below is part of the space—you pack the syllabus, we maintain the environment around it.",
    cards: [
      "Tables & chairs",
      "Air conditioning",
      "Drinking water",
      "Washrooms",
    ],
    cardBodies: [
      "Room to lay out notebooks beside your laptop and still have space for a water bottle.",
      "Cooler air when the afternoon sun turns study sessions sticky.",
      "Refill often—hydration shouldn’t mean packing up mid-proof.",
      "Clean facilities inside so breaks stay quick and stress-free.",
    ],
    noteLead: "Reminder:",
    noteRest:
      "we don’t lend, rent, or sell books. Plan ahead and carry every title or handout you need.",
  },
  visit: {
    title: "Visit us",
    intro: "",
    address: "Address",
    hours: "Hours",
    fees: "Fees",
    call: "Call",
    whatsapp: "WhatsApp",
    mapTitle: "Map",
    directionsPlaceholder: "",
    openInMaps: "Open in Google Maps",
    copyAddress: "Copy address",
    addressCopied: "Address copied",
    copyHours: "Copy hours",
    hoursCopied: "Hours copied",
  },
  rules: {
    title: "House rules",
    intro:
      "Short guidelines so the room stays workable for everyone. Staff may ask anyone to leave if rules are ignored.",
    items: [
      "Quiet study: speak softly; take long calls outside.",
      "Bring your own books and materials—we do not lend textbooks.",
      "No food that smells strongly or makes a mess; drinks with lids are safer.",
      "Keep desks tidy; don’t save seats for people who aren’t here yet.",
      "Respect staff directions—they’re keeping the space fair for all.",
    ],
  },
  faq: {
    title: "Common questions",
    intro:
      "Quick answers before you visit. For anything else, use the contact form or call us.",
    items: [
      {
        q: "Do you lend or sell textbooks?",
        a: "No. RS Library is a reading hall only—we don’t issue books or run a shop. Bring every title, handout, or device you need for your session.",
      },
      {
        q: "Is Wi‑Fi available?",
        a: "We don’t promise public Wi‑Fi on this site. Ask staff when you arrive; policies can change with equipment upgrades.",
      },
      {
        q: "Can I reserve a seat in advance?",
        a: "Seating is usually first-come during open hours. If we run a special arrangement, we’ll mention it at the desk or on notices.",
      },
      {
        q: "What about food and drinks?",
        a: "Drinks with lids are safest. Please avoid strong smells or messy food so neighbours can focus. When in doubt, step outside for a snack.",
      },
      {
        q: "How do fees work?",
        a: "Rates can change by season or seating type. Read the Fees card on this page, or message us for the latest daily or monthly options.",
      },
    ],
  },
  gallery: {
    title: "Inside the space",
    intro:
      "Placeholder tiles below—swap in real photos of your tables, AC area, and water station when you have them.",
    captions: ["Study floor", "Cool & seating", "Water corner"],
  },
  contact: {
    title: "Say hello",
    lead: "Curious about timings, seating etiquette, or something specific before you visit? Drop a note—we try to answer within one working day.",
    fine: "Optional fields can stay empty; name, email, message, and consent are required.",
  },
  privacy: {
    title: "Privacy",
    body: "We only use your contact form details to reply about RS Library. We don’t sell them or use them for ads. Messages are sent by email through a form provider—that service has its own privacy terms.",
  },
  footer: {
    brand: "RS Library · Quiet study hall",
    privacy: "Privacy",
    copyright: "©",
    socialHeading: "Follow & links",
  },
  quickActions: {
    copyLink: "Copy page link",
    linkCopied: "Link copied to clipboard",
    sharePage: "Share page",
    shared: "Thanks for sharing",
    copyFailed: "Could not copy — copy the URL from the address bar.",
  },
  layout: {
    backToTop: "Back to top",
    announceDismiss: "Dismiss",
  },
  waFab: "Chat on WhatsApp",
};

const HI: UiCopy = {
  brandTagline: "शांत अध्ययन · आपका सामान",
  skipLink: "मुख्य सामग्री पर जाएँ",
  nav: {
    about: "परिचय",
    amenities: "सुविधाएँ",
    visit: "आगमन",
    rules: "नियम",
    faq: "प्रश्न",
    gallery: "गैलरी",
    contact: "संपर्क",
    privacy: "गोपनीयता",
  },
  toolbar: {
    langEn: "EN",
    langHi: "हिंदी",
    themeLight: "हल्की थीम",
    themeDark: "गहरी थीम",
  },
  hero: {
    eyebrow: "छात्रों के लिए पठन कक्ष",
    title: "नोट्स खोलिए। जब तक अध्याय समझ में न आ जाए, रुकिए।",
    lede: "RS Library पुस्तक बैंक नहीं है—हम पाठ्यपुस्तकें जारी नहीं करते। जो भी पढ़ रहे हैं, वह सामग्री साथ लाएँ; हम कमरे को आरामदायक रखते हैं ताकि ध्यान पन्ने पर रहे, सीट या पानी की चिंता पर नहीं।",
    bullets: [
      "केवल अपना सामान: किताबें, नोट्स, लैपटॉप—जो भी पढ़ाई में मदद करे।",
      "स्थिर बैठक व्यवस्था और AC ताकि लंबी पढ़ाई कम थकाए।",
      "पीने का पानी और शौचालय—छोटी सुविधाएँ, कम रुकावटें।",
    ],
    ctaMessage: "संदेश भेजें",
    ctaAmenities: "सुविधाएँ देखें",
    facts: {
      model: "अपना सामान लाएँ",
      space: "मेज़, कुर्सियाँ और AC",
      basics: "पानी और शौचालय",
    },
    factsLabels: { model: "मॉडल", space: "स्थान", basics: "बुनियादी" },
    asideLabel: "संक्षिप्त जानकारी",
  },
  about: {
    title: "हम कौन हैं",
    lead: "हम एक शांत कोना हैं जहाँ एकाग्रता मुख्य है। छात्र एक नियम साझा करते हैं: आवाज़ कम रखें और फ़ोन का सम्मान करें ताकि सब परीक्षा की तैयारी, असाइनमेंट या पढ़ाई कर सकें—कैफ़े की भीड़ से नहीं जूझना पड़े।",
    body: "हम पुस्तक उधार या स्टेशनरी बेचने का काउंटर नहीं चलाते—बस एक भरोसेमंद अध्ययन हॉल जहाँ माहौल आधा काम कर देता है।",
  },
  facilities: {
    title: "तैयार सुविधाएँ",
    intro:
      "नीचे दी सब सुविधाएँ स्थान का हिस्सा हैं—आप पाठ्यक्रम सामग्री लाएँ, हम वातावरण संभालें।",
    cards: ["मेज़ और कुर्सियाँ", "एयर कंडीशनिंग", "पीने का पानी", "शौचालय"],
    cardBodies: [
      "नोटबुक और लैपटॉप के साथ पानी की बोतल के लिए भी जगह।",
      "गर्म दोपहर में लंबी पढ़ाई के लिए ठंडी हवा।",
      "बार-बार बाहर न जाना पड़े—हाइड्रेट रहें।",
      "अंदर साफ़ सुविधाएँ ताकि ब्रेक जल्दी और बिना तनाव के हों।",
    ],
    noteLead: "याद रखें:",
    noteRest:
      "हम किताबें किराए या बिक्री पर नहीं देते। ज़रूरी हर किताब या हैंडआउट साथ लाएँ।",
  },
  visit: {
    title: "हमें आएँ",
    intro:
      "अपनी वास्तविक जानकारी .env में डालें ताकि छात्रों को सही पता और समय मिले।",
    address: "पता",
    hours: "समय",
    fees: "शुल्क",
    call: "कॉल",
    whatsapp: "व्हाट्सऐप",
    mapTitle: "नक्शा",
    directionsPlaceholder:
      "सटीक लोकेशन के लिए VITE_MAP_QUERY अपडेट करें या VITE_MAP_EMBED_URL चिपकाएँ।",
    openInMaps: "Google Maps में खोलें",
    copyAddress: "पता कॉपी करें",
    addressCopied: "पता कॉपी हो गया",
    copyHours: "समय कॉपी करें",
    hoursCopied: "समय कॉपी हो गया",
  },
  rules: {
    title: "अंदरूनी नियम",
    intro:
      "संक्षिप्त दिशानिर्देश ताकि कमरा सबके लिए उपयोगी रहे। नियम तोड़ने पर स्टाफ प्रवेश रोक सकता है।",
    items: [
      "शांत अध्ययन: धीरे बोलें; लंबी कॉल बाहर करें।",
      "अपनी किताबें और सामग्री लाएँ—हम पाठ्यपुस्तकें उधार नहीं देते।",
      "तीखी गंध या गंदगी वाला खाना नहीं; ढक्कन वाले पेय सुरक्षित हैं।",
      "मेज़ साफ़ रखें; यहाँ नहीं बैठे लोगों के लिए सीट न बचाएँ।",
      "स्टाफ के निर्देश मानें—वे सबके लिए निष्पक्षता बनाए रखते हैं।",
    ],
  },
  faq: {
    title: "अक्सर पूछे जाने वाले प्रश्न",
    intro:
      "आने से पहले संक्षिप्त जवाब। और कुछ हो तो संपर्क फ़ॉर्म या फ़ोन से पूछें।",
    items: [
      {
        q: "क्या आप पाठ्यपुस्तकें उधार या बेचते हैं?",
        a: "नहीं। RS Library केवल पठन कक्ष है—हम किताबें जारी नहीं करते न दुकान चलाते। अपनी हर किताब, हैंडआउट या डिवाइस साथ लाएँ।",
      },
      {
        q: "क्या Wi‑Fi मिलता है?",
        a: "इस साइट पर सार्वजनिक Wi‑Fi की गारंटी नहीं देते। आने पर स्टाफ से पूछें; उपकरण बदलने पर नीति बदल सकती है।",
      },
      {
        q: "क्या पहले से सीट बुक कर सकते हैं?",
        a: "आमतौर पर खुले समय में पहले आओ पहले पाओ। अगर कोई विशेष व्यवस्था होगी तो डेस्क या सूचना पर बताएँगे।",
      },
      {
        q: "खान-पान कैसा रखें?",
        a: "ढक्कन वाले पेय सुरक्षित हैं। तेज़ गंध या गंदगी वाला खाना टालें ताकि बगल वाले ध्यान लगा सकें। संदेह हो तो बाहर नाश्ता करें।",
      },
      {
        q: "शुल्क कैसे लगते हैं?",
        a: "दरें मौसम या सीट प्रकार से बदल सकती हैं। इस पृष्ठ पर शुल्क कार्ड देखें या नवीनतम दैनिक/मासिक विकल्प के लिए संदेश भेजें।",
      },
    ],
  },
  gallery: {
    title: "अंदर का दृश्य",
    intro:
      "नीचे अस्थायी टाइलें हैं—जब फ़ोटो हों तो मेज़, AC क्षेत्र और पानी स्थान की असली तस्वीरें लगाएँ।",
    captions: ["अध्ययन क्षेत्र", "ठंडक और बैठक", "पानी स्थान"],
  },
  contact: {
    title: "नमस्ते कहें",
    lead: "समय, बैठने के नियम, या आने से पहले कोई सवाल? संदेश छोड़ें—हम एक कार्य दिवस में जवाब देने का प्रयास करते हैं।",
    fine: "वैकल्पिक फ़ील्ड खाली रह सकती हैं; नाम, ईमेल, संदेश और सहमति आवश्यक हैं।",
  },
  privacy: {
    title: "गोपनीयता",
    body: "हम केवल संपर्क फ़ॉर्म की जानकारी का उपयोग RS Library के बारे में जवाब देने के लिए करते हैं। हम इसे बेचते नहीं या विज्ञापन के लिए उपयोग नहीं करते। संदेश ईमेल के ज़रिए फ़ॉर्म प्रदाता से जाते हैं—उनकी अपनी गोपनीयता शर्तें लागू होती हैं।",
  },
  footer: {
    brand: "RS Library · शांत अध्ययन हॉल",
    privacy: "गोपनीयता",
    copyright: "©",
    socialHeading: "लिंक और सोशल",
  },
  quickActions: {
    copyLink: "पेज लिंक कॉपी करें",
    linkCopied: "लिंक क्लिपबोर्ड पर कॉपी हो गया",
    sharePage: "पेज शेयर करें",
    shared: "शेयर के लिए धन्यवाद",
    copyFailed: "कॉपी नहीं हो सका — पता बार से URL कॉपी करें।",
  },
  layout: {
    backToTop: "ऊपर जाएँ",
    announceDismiss: "बंद करें",
  },
  waFab: "व्हाट्सऐप पर चैट",
};

export const uiCopy: Record<Locale, UiCopy> = { en: EN, hi: HI };

export type FormCopy = {
  labels: {
    name: string;
    email: string;
    phone: string;
    phoneHint: string;
    subject: string;
    optional: string;
    visitPlan: string;
    visitPlanHint: string;
    message: string;
    consentBefore: string;
    consentPrivacy: string;
    consentAfter: string;
  };
  errors: {
    name: string;
    emailRequired: string;
    emailInvalid: string;
    subjectLen: (max: number) => string;
    messageLen: (min: number) => string;
    consent: string;
    phoneInvalid: string;
  };
  hints: {
    subject: (max: number) => string;
    message: (min: number, cur: number, ok: boolean) => string;
  };
  actions: { send: string; sending: string; sendAnother: string };
  success: { title: string; thanks: string; thanksShort: string };
  formSubmitNote: string;
  /** Shown only in production when env was not baked into the build */
  warnings: { missingEmailProvider: string };
};

const FORM_EN: FormCopy = {
  labels: {
    name: "Name",
    email: "Email",
    phone: "Phone",
    phoneHint: "Optional — we only call if your email bounces.",
    subject: "Subject",
    optional: "(optional)",
    visitPlan: "When you’d like to visit",
    visitPlanHint:
      "Optional — e.g. weekday evenings, Saturday morning, number of seats.",
    message: "Message",
    consentBefore:
      "I agree that RS Library may use my details to respond to my enquiry, as described in the",
    consentPrivacy: "Privacy",
    consentAfter: "section.",
  },
  errors: {
    name: "Please enter at least 2 characters.",
    emailRequired: "Email is required.",
    emailInvalid: "Enter a valid email address.",
    subjectLen: (max) => `Keep the subject under ${max} characters.`,
    messageLen: (min) => `Please write at least ${min} characters.`,
    consent: "Please confirm before sending.",
    phoneInvalid: "Enter a valid phone number or leave this blank.",
  },
  hints: {
    subject: (max) => `Up to ${max} characters.`,
    message: (min, cur, ok) =>
      `Minimum ${min} characters (${Math.min(cur, min)}/${min}${ok ? " — looks good" : ""}).`,
  },
  actions: {
    send: "Send message",
    sending: "Sending…",
    sendAnother: "Send another message",
  },
  success: {
    title: "Message received",
    thanks: "Thanks — your message was sent.",
    thanksShort: "Thank you for reaching out.",
  },
  formSubmitNote:
    "FormSubmit accepted this submission (the API can say “success” before mail is reliable). Check Spam and open any FormSubmit “Activate form” email for tilakbhati91@gmail.com. On Netlify: add VITE_WEB3FORMS_ACCESS_KEY under Site configuration → Environment variables, save, then trigger a new deploy (Clear cache and deploy). Add your Netlify URL in the Web3Forms dashboard if it asks for allowed domains.",
  warnings: {
    missingEmailProvider:
      "This live build has no Web3Forms key and no contact API URL. Add VITE_WEB3FORMS_ACCESS_KEY to your host’s build environment (Netlify / CI), save, then redeploy so `npm run build` can embed it. Dev works because `.env.development` is not used in production builds.",
  },
};

const FORM_HI: FormCopy = {
  labels: {
    name: "नाम",
    email: "ईमेल",
    phone: "फ़ोन",
    phoneHint: "वैकल्पिक — केवल तब कॉल जब ईमेल जवाब न दे।",
    subject: "विषय",
    optional: "(वैकल्पिक)",
    visitPlan: "कब आना चाहेंगे",
    visitPlanHint:
      "वैकल्पिक — जैसे सप्ताह के दिन शाम, शनिवार सुबह, कितनी सीटें।",
    message: "संदेश",
    consentBefore:
      "मैं सहमत हूँ कि RS Library मेरी जानकारी का उपयोग मेरे प्रश्न का जवाब देने के लिए कर सकता है, जैसा कि",
    consentPrivacy: "गोपनीयता",
    consentAfter: "खंड में बताया गया है।",
  },
  errors: {
    name: "कृपया कम से कम 2 अक्षर लिखें।",
    emailRequired: "ईमेल आवश्यक है।",
    emailInvalid: "मान्य ईमेल दर्ज करें।",
    subjectLen: (max) => `विषय ${max} अक्षरों से छोटा रखें।`,
    messageLen: (min) => `कृपया कम से कम ${min} अक्षर लिखें।`,
    consent: "भेजने से पहले सहमति दें।",
    phoneInvalid: "मान्य फ़ोन दर्ज करें या खाली छोड़ें।",
  },
  hints: {
    subject: (max) => `अधिकतम ${max} अक्षर।`,
    message: (min, cur, ok) =>
      `कम से कम ${min} अक्षर (${Math.min(cur, min)}/${min}${ok ? " — ठीक है" : ""})।`,
  },
  actions: {
    send: "संदेश भेजें",
    sending: "भेजा जा रहा है…",
    sendAnother: "दूसरा संदेश भेजें",
  },
  success: {
    title: "संदेश मिला",
    thanks: "धन्यवाद — आपका संदेश भेज दिया गया।",
    thanksShort: "संपर्क करने के लिए धन्यवाद।",
  },
  formSubmitNote:
    "FormSubmit ने स्वीकार किया (कभी-कभी “सफल” दिखता है पर मेल देर से आती है)। स्पैम जाँचें; tilakbhati91@gmail.com पर FormSubmit सक्रियकरण ईमेल खोलें। Netlify पर: Site configuration → Environment variables में VITE_WEB3FORMS_ACCESS_KEY सेट करें, सेव करें, फिर नया डिप्लॉय करें (Clear cache and deploy)। Web3Forms में अपनी Netlify URL अनुमत डोमेन में जोड़ें।",
  warnings: {
    missingEmailProvider:
      "इस लाइव बिल्ड में Web3Forms कुंजी या संपर्क API URL नहीं है। अपने होस्ट (Netlify/CI) की बिल्ड सेटिंग में VITE_WEB3FORMS_ACCESS_KEY जोड़ें, सेव करें, फिर `npm run build` के साथ फिर से डिप्लॉय करें। डेवलपमेंट में `.env.development` काम करता है पर प्रोडक्शन बिल्ड में वह लोड नहीं होता।",
  },
};

export const formCopy: Record<Locale, FormCopy> = {
  en: FORM_EN,
  hi: FORM_HI,
};
