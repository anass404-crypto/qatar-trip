// بيانات الرحلة الأساسية — منسوخة حرفيًا من برنامج الرحلة المعتمد.
// لا تُعدَّل الأوقات أو الفعاليات هنا إلا عبر لوحة المشرف.
// أي معلومة غير مذكورة صراحة في البرنامج الأصلي تظهر كـ "يحتاج تأكيد" بدل اختراعها.

export const NEEDS_CONFIRM = "يحتاج تأكيد";

export const TRIP = {
  title: "رحلة قطر العائلية",
  start: "2026-08-16T08:00:00+03:00",
  end: "2026-08-19T17:15:00+03:00",
  route: "الدمام → الدوحة",
  days: 4,
  nights: 3,
  hotel: {
    name: "Aleph Doha Residences, Curio Collection by Hilton",
    mapsUrl: "https://maps.google.com/?q=Aleph+Doha+Residences+Curio+Collection+by+Hilton",
    checkin: NEEDS_CONFIRM,
    checkout: "12:00 ظهرًا (الأربعاء 19 أغسطس)",
  },
};

// فئات بصرية لخلفيات الفعاليات التي لا تملك صورة حقيقية بعد (Placeholder جميل بدل اختراع صورة)
export const CATEGORY_STYLE = {
  drive:   { icon: "🚗", grad: "linear-gradient(135deg,#3E6AE1,#1F3E92)" },
  border:  { icon: "🛂", grad: "linear-gradient(135deg,#5C6570,#2B3038)" },
  food:    { icon: "🍽️", grad: "linear-gradient(135deg,#E1873E,#B85A1E)" },
  hotel:   { icon: "🏨", grad: "linear-gradient(135deg,#3E6AE1,#274B9E)" },
  water:   { icon: "💦", grad: "linear-gradient(135deg,#2FB2D9,#1873A6)" },
  light:   { icon: "✨", grad: "linear-gradient(135deg,#8B5CE1,#4B2E9C)" },
  art:     { icon: "🎨", grad: "linear-gradient(135deg,#E14A8B,#9C2E5F)" },
  play:    { icon: "🧩", grad: "linear-gradient(135deg,#3EC17E,#1F8A54)" },
  culture: { icon: "🕌", grad: "linear-gradient(135deg,#C9A24B,#8C6B22)" },
  book:    { icon: "📚", grad: "linear-gradient(135deg,#6C7A8C,#3B4552)" },
  ride:    { icon: "🎢", grad: "linear-gradient(135deg,#E13E3E,#9C1F1F)" },
  snow:    { icon: "❄️", grad: "linear-gradient(135deg,#4FD1E8,#1C7FA0)" },
  space:   { icon: "🌌", grad: "linear-gradient(135deg,#2E2E7A,#0F0F3D)" },
  museum:  { icon: "🖼️", grad: "linear-gradient(135deg,#9C7A3E,#5C481E)" },
  beach:   { icon: "🏖️", grad: "linear-gradient(135deg,#3EC1C1,#1E7E7E)" },
  view:    { icon: "🌊", grad: "linear-gradient(135deg,#2FB2D9,#0F5F82)" },
};

// صور حقيقية موثّقة (Wikimedia Commons) لأماكن تحققنا منها سابقًا فقط — البقية Placeholder حتى تُستبدل من لوحة الإدارة
export const REAL_PHOTOS = {
  katara: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Traditional_buildings_at_Katara_at_night.jpg/1280px-Traditional_buildings_at_Katara_at_night.jpg",
  // صور حقيقية أرسلها المستخدم لكل فعالية — مرفوعة داخل المستودع نفسه
  mia: "assets/img/mia-exterior.jpg",
  qnlLibrary: "assets/img/qnl-library.jpg",
  qasrAlYasmin: "assets/img/qasr-al-yasmin.jpg",
  dohaQuest: "assets/img/doha-quest.jpg",
  snowDunes: "assets/img/snow-dunes.jpg",
  liveHub: "assets/img/live-hub.jpg",
  pool52: "assets/img/pool-52.jpg",
  rushPaintHouse: "assets/img/rush-paint-house.jpg",
  colorverse: "assets/img/colorverse.jpg",
  msheireb: "assets/img/msheireb.jpg",
  trapani: "assets/img/trapani.jpg",
  breakfast: "assets/img/breakfast.jpg",
  planetTeensMia: "assets/img/planet-teens-mia.jpg",
  hotelTower: "assets/img/hotel-tower.jpg",
  caboodle: "assets/img/caboodle.jpg",
  olioli: "assets/img/olioli.jpg",
};

// ---------- اليوم 0: الأحد 16 أغسطس — الوصول ومشيرب وكتارا والمدينة التعليمية ----------
const day0 = {
  id: "d0",
  date: "2026-08-16",
  label: "الأحد",
  dateLabel: "16 أغسطس",
  tagline: "الوصول ومشيرب وكتارا والمدينة التعليمية",
  note: "هذا اليوم يحتاج سيارتين عند انقسام المسارات أو سائقًا يعود إلى كتارا الساعة 7:20.",
  items: [
    { id: "d0-1", time: "08:00", timeEnd: null, title: "الانطلاق من الدمام", category: "drive",
      desc: "فطور في البيت قبلها.", highlights: [] },
    { id: "d0-2", time: "11:00", approx: true, timeEnd: null, title: "منفذ أبو سمرة", category: "border",
      desc: "مفتوح 24 ساعة. المدة المتوقعة 30–60 دقيقة.",
      mapsUrl: "https://maps.google.com/?q=place_id:ChIJVQo62gnwRj4ROzZwL7IEEg4",
      highlights: ["مفتوح على مدار الساعة", "المدة المتوقعة 30–60 دقيقة"] },
    { id: "d0-3", time: "12:15", timeEnd: null, title: "الوصول إلى مشيرب", category: "culture", cover: "msheireb",
      desc: "مواقف تحت الأرض مكيفة.",
      mapsUrl: "https://maps.google.com/?q=place_id:ChIJD59mvjnFRT4RivB5tQ0cb6Y",
      highlights: ["مواقف تحت الأرض مكيفة"] },
    { id: "d0-4", time: "12:20", timeEnd: "13:20", title: "الغداء في Trapani", category: "food", cover: "trapani",
      desc: "مطعم إيطالي، سريع ومريح بعد الطريق.", rating: 4.4,
      mapsUrl: "https://maps.google.com/?q=place_id:ChIJnSntZzzFRT4RNs44RMpU8RQ",
      highlights: ["مطعم إيطالي", "تقييم 4.4", "سريع بعد رحلة الطريق"] },
    { id: "d0-5", time: "13:25", timeEnd: "14:10", title: "Live Hub", category: "light", cover: "liveHub",
      desc: "معرض تفاعلي عن المستقبل. مجاني.", price: "مجاني",
      highlights: ["معرض تفاعلي عن المستقبل", "مجاني"] },
    { id: "d0-6", time: "14:15", timeEnd: "15:00", title: "Rush Paint House", category: "art", cover: "rushPaintHouse",
      desc: "جلسة رش ألوان، 45 دقيقة. حجز مسبق.", duration: "45 دقيقة", bookingRequired: true,
      highlights: ["جلسة رش ألوان", "45 دقيقة", "يتطلب حجز مسبق"] },
    { id: "d0-7", time: "15:10", timeEnd: "15:25", title: "التوجه إلى الفندق", category: "drive",
      desc: "15 دقيقة.", duration: "15 دقيقة",
      mapsUrl: "https://maps.google.com/?q=place_id:ChIJI8FOzL_ERT4RKGWFNo3xOhI",
      highlights: [] },
    { id: "d0-8", time: "15:25", timeEnd: "16:10", title: "تسجيل الدخول", category: "hotel", cover: "hotelTower",
      desc: "غرف + حقائب + تغيير ملابس.", highlights: [] },
    { id: "d0-9", time: "16:30", timeEnd: "17:15", title: "Colorverse في كتارا", category: "light",
      desc: "تجربة ضوئية غامرة. حد أقصى 15 شخصًا.", capacity: "حد أقصى 15 شخصًا", cover: "colorverse",
      mapsUrl: "https://maps.google.com/?q=place_id:ChIJAfqz1UfDRT4RnSqB06dBnRE",
      highlights: ["تجربة ضوئية غامرة", "حد أقصى 15 شخصًا"] },
    { id: "d0-10", time: "17:20", type: "split", title: "انقسام المسارات",
      paths: [
        { key: "kids", label: "الصغار", icon: "👧", items: [
          { id: "d0-10-kids-1", time: "17:20", timeEnd: "19:20", title: "OliOli في كتارا", category: "play",
            desc: "جلسة ساعتين. 135 ريال للطفل، يشمل مرافقًا.", price: "135 ريال للطفل (يشمل مرافقًا)", duration: "ساعتان", cover: "olioli",
            highlights: ["جلسة ساعتين", "135 ريال للطفل، يشمل مرافقًا"] },
        ]},
        { key: "adults", label: "الكبار", icon: "🧑", items: [
          { id: "d0-10-adults-1", time: "17:45", timeEnd: "18:05", title: "مكتبة قطر الوطنية", category: "book", cover: "qnlLibrary",
            desc: "تغلق 8:00 م. بعدها صلاة المغرب والعشاء في مسجد ذو المنارتين (مسجد المدينة التعليمية) خلف الإمام الشيخ هيثم الدخين، ثم تنقل بالترام والحديقة القرآنية.",
            mapsUrl: "https://maps.google.com/?q=place_id:ChIJuQfI1QfcRT4R4wy5B5LpX3g",
            highlights: ["تغلق الساعة 8:00 م", "الصلاة خلف الشيخ هيثم الدخين", "تنقل بالترام والحديقة القرآنية"] },
          { id: "d0-10-adults-2", time: "18:10", approx: true, timeEnd: null, title: "صلاة المغرب في مسجد ذو المنارتين", category: "culture",
            desc: "مسجد المدينة التعليمية، خلف الإمام الشيخ هيثم الدخين. ثم الترام والحديقة القرآنية.", highlights: [] },
          { id: "d0-10-adults-3", time: "19:40", approx: true, timeEnd: null, title: "صلاة العشاء", category: "culture",
            desc: "في مسجد ذو المنارتين خلف الإمام الشيخ هيثم الدخين.", highlights: [] },
        ]},
      ],
    },
    { id: "d0-11", time: "20:00", timeEnd: "21:30", title: "العشاء في قصر الياسمين", category: "food", cover: "qasrAlYasmin",
      desc: "Festival City.", rating: 4.9, meetPoint: true,
      mapsUrl: "https://maps.google.com/?q=place_id:ChIJ2fDvJfPdRT4RONtoiDP451E",
      highlights: ["التقاء الجميع", "Festival City", "تقييم 4.9"] },
    { id: "d0-12", time: "21:45", timeEnd: null, title: "الفندق", category: "hotel", cover: "hotelTower", desc: "", highlights: [] },
  ],
};

// ---------- اليوم 1: الاثنين 17 أغسطس — يوم Quest ----------
const day1 = {
  id: "d1",
  date: "2026-08-17",
  label: "الاثنين",
  dateLabel: "17 أغسطس",
  tagline: "يوم Quest",
  note: "في ليلة هذا اليوم يجب حجز تذاكر قبة الثريا لأن التذاكر تفتح قبل العرض بيوم فقط.",
  items: [
    { id: "d1-1", time: "08:30", timeEnd: "09:30", title: "فطور", category: "food", cover: "breakfast", desc: "", highlights: [] },
    { id: "d1-5", time: "10:00", timeEnd: "22:00", title: "Doha Quest", category: "ride", cover: "dohaQuest",
      desc: "على طول بعد الفطور — نكون واصلين مع وقت الفتح. بوابة 5، استبدال قسائم عطلة. يوم كامل بلا غداء منفصل، الأكل داخل Quest.",
      mapsUrl: "https://maps.google.com/?q=place_id:ChIJNbDkfqXFRT4RGelqgZu8fZ0",
      bookingTotal: "1,556 ريال (5 بالغين + 3 أطفال)",
      innerPlan: [
        { time: "10:00", label: "الدخول والألعاب الكبيرة أولًا" },
        { time: "12:30", label: "استراحة وغداء خفيف داخل Quest" },
        { time: "13:30", label: "التحديات العائلية" },
        { time: "16:00", label: "استراحة عصر" },
        { time: "17:00", label: "جولة ثانية على الألعاب المفضلة" },
        { time: "19:00", label: "العشاء داخل Quest" },
        { time: "20:30", label: "إعادة الألعاب المفضلة" },
        { time: "21:30", label: "الهدايا" },
      ],
      highlights: ["اليوم الرئيسي في الرحلة", "يوم كامل من الفتح للإغلاق، بلا غداء خارجي", "بوابة الدخول رقم 5، استبدال قسائم عطلة"] },
    { id: "d1-6", time: "22:15", timeEnd: null, title: "الفندق", category: "hotel", cover: "hotelTower", desc: "", highlights: [] },
  ],
};

// ---------- اليوم 2: الثلاثاء 18 أغسطس — سباحة وثلج وفنون وفضاء ----------
const day2 = {
  id: "d2",
  date: "2026-08-18",
  label: "الثلاثاء",
  dateLabel: "18 أغسطس",
  tagline: "سباحة وثلج وفنون وفضاء",
  note: "التسجيل في عرض Polaris قبل العرض بنصف ساعة شرط.",
  items: [
    { id: "d2-1", time: "08:00", timeEnd: "09:00", title: "الإفطار", category: "food", cover: "breakfast", desc: "", highlights: [] },
    { id: "d2-2", time: "09:15", timeEnd: "10:30", title: "سباحة في مسبح الطابق 52", category: "water", cover: "pool52",
      desc: "أعلى مسبح داخلي في قطر حسب معلومات الرحلة.",
      highlights: ["أعلى مسبح داخلي في قطر حسب معلومات الرحلة"] },
    { id: "d2-3", time: "11:30", timeEnd: null, title: "التوجه إلى Festival City", category: "drive",
      desc: "20 دقيقة.", duration: "20 دقيقة", highlights: [] },
    { id: "d2-4", time: "12:00", timeEnd: "14:00", type: "split", title: "انقسام المسارات",
      paths: [
        { key: "over3", label: "فوق 3 سنوات", icon: "🧒", items: [
          { id: "d2-4-over3-1", time: "12:00", timeEnd: "14:00", title: "Snow Dunes", category: "snow", cover: "snowDunes",
            desc: "يفتح الساعة 12:00. المعدات متوفرة.", price: "89 ريال (سعر الثلاثاء المذكور في الخطة)",
            mapsUrl: "https://maps.google.com/?q=place_id:ChIJp6v9JRDdRT4RxHsq43W53po",
            highlights: ["المعدات متوفرة بالمكان", "89 ريال — سعر الثلاثاء"] },
        ]},
        { key: "toddlers", label: "الصغيران", icon: "🧸", items: [
          { id: "d2-4-toddlers-1", time: "12:00", timeEnd: "14:00", title: "Caboodle", category: "play", cover: "caboodle",
            desc: "تنبيه: تأكد من انتهاء التجديدات.", phone: "44887233",
            highlights: [] },
        ]},
      ],
    },
    { id: "d2-5", time: "14:15", timeEnd: "15:30", title: "العودة، قيلولة، سناك خفيف", category: "hotel", desc: "", highlights: [] },
    { id: "d2-6", time: "15:45", timeEnd: "16:00", title: "التوجه إلى متحف الفن الإسلامي", category: "drive",
      desc: "", mapsUrl: "https://maps.google.com/?q=place_id:ChIJjVLMehfFRT4RfdY6vbQQpXU", cover: "mia", highlights: [] },
    { id: "d2-7", time: "16:00", timeEnd: "17:00", title: "Planet Teens Workshop", category: "art", cover: "planetTeensMia",
      desc: "العمر 10–16، غير محجوزة حاليًا. وبالتوازي: جولة القاعات، عرض الإسطرلاب، تحدي الزخارف.",
      ageRange: "10–16", bookingStatus: "غير محجوزة حاليًا",
      highlights: ["ورشة للأعمار 10–16", "بالتوازي: جولة القاعات وعرض الإسطرلاب وتحدي الزخارف"] },
    { id: "d2-8", time: "17:05", timeEnd: "17:25", title: "التوجه إلى كتارا مبنى 41", category: "drive",
      desc: "التسجيل قبل العرض بنصف ساعة شرط.", cover: "katara", highlights: [] },
    { id: "d2-9", time: "18:00", timeEnd: "18:45", title: "عرض Polaris ثلاثي الأبعاد", category: "space",
      desc: "قبة الثريا.", cover: "katara",
      highlights: ["عرض ثلاثي الأبعاد", "قبة الثريا"] },
    { id: "d2-10", time: "19:30", timeEnd: "21:30", title: "العشاء في Paroot", category: "food",
      desc: "إيراني، سوق واقف، يغلق 10:30. الحجز إلزامي.", bookingRequired: true,
      mapsUrl: "https://maps.google.com/?q=place_id:ChIJCz-fZz7FRT4RZGAhbElAQdY",
      highlights: ["مطعم إيراني", "سوق واقف", "الحجز إلزامي"] },
    { id: "d2-11", time: "22:00", timeEnd: null, title: "الفندق — تجهيز الحقائب", category: "hotel", cover: "hotelTower", desc: "", highlights: [] },
  ],
};

// ---------- اليوم 3: الأربعاء 19 أغسطس — العودة ----------
const day3 = {
  id: "d3",
  date: "2026-08-19",
  label: "الأربعاء",
  dateLabel: "19 أغسطس",
  tagline: "صباح أخير والعودة",
  note: "",
  items: [
    { id: "d3-1", time: "08:00", timeEnd: "09:00", title: "الإفطار", category: "food", cover: "breakfast", desc: "", highlights: [] },
    { id: "d3-2", time: "09:15", timeEnd: "10:15", title: "سباحة الوداع في الطابق 52", category: "water", cover: "pool52",
      desc: "جلسة أخيرة قبل تجهيز الحقائب.", highlights: [] },
    { id: "d3-2b", time: "10:15", timeEnd: "11:15", title: "نزهة على كورنيش الدوحة", category: "view",
      desc: "تمشية أخيرة قريبة من الفندق قبل تسجيل الخروج، بإطلالة على أبراج الخليج الغربي.",
      mapsUrl: "https://maps.google.com/?q=Doha+Corniche",
      highlights: ["قريب من الفندق، بلا حجز", "إطلالة أخيرة على أبراج الخليج الغربي"] },
    { id: "d3-3", time: "11:45", timeEnd: null, title: "تسجيل الخروج", category: "hotel",
      desc: "وقت Check-out الرسمي 12:00.", highlights: ["Check-out الرسمي: 12:00 ظهرًا"] },
    { id: "d3-4", time: "12:00", timeEnd: "13:00", title: "غداء قبل الطريق", category: "food", desc: "", highlights: [] },
    { id: "d3-5", time: "13:15", timeEnd: null, title: "الانطلاق إلى الدمام", category: "drive",
      desc: "الوصول المتوقع: 5:15 م تقريبًا.", eta: "5:15 م تقريبًا", highlights: [] },
  ],
};

export const DAYS = [day0, day1, day2, day3];

// ---------- الحجوزات ----------
export const BOOKINGS = {
  urgent: [
    { id: "b1", title: "Doha Quest", note: "منصة عطلة — 5 بالغين + 3 أطفال", total: "1,556 ريال", date: "17 أغسطس", status: "بانتظار التحديث" },
    { id: "b2", title: "Planet Teens", note: "mia.org.qa", status: "غير محجوزة حاليًا" },
    { id: "b3", title: "Colorverse", note: "قنوات كتارا", status: "بانتظار التحديث" },
    { id: "b4", title: "Rush Paint House", note: "", status: "بانتظار التحديث" },
    { id: "b5", title: "OliOli", note: "olioli.qa", status: "بانتظار التحديث" },
  ],
  thisWeek: [
    { id: "b6", title: "قصر الياسمين", note: "", status: "بانتظار التحديث" },
    { id: "b7", title: "Paroot", note: "الحجز إلزامي", status: "بانتظار التحديث" },
    { id: "b8", title: "Caboodle", note: "", status: "بانتظار التحديث" },
    { id: "b9", title: "الفندق", note: "تأكيد الوصول المتأخر، دوام المسبح، Beach Club", status: "بانتظار التحديث" },
  ],
  scheduled: [
    { id: "b10", title: "قبة الثريا", note: "althuraya.katara.net", when: "ليلة الاثنين", status: "التذاكر تفتح قبل العرض بيوم واحد" },
  ],
  none: [
    { id: "b11", title: "Live Hub" },
    { id: "b12", title: "مكتبة قطر الوطنية" },
    { id: "b13", title: "المسجد" },
    { id: "b14", title: "الترام" },
    { id: "b15", title: "Snow Dunes — Counter" },
  ],
};

// فعاليات مستبعدة نهائيًا — لا تُعرض كاقتراحات تلقائية إلا إن أضافها المشرف يدويًا
export const EXCLUDED_SUGGESTIONS = [
  "حي المينا", "المحمل", "3-2-1 Olympic and Sports Museum", "KidZania", "Meryal", "Angry Birds", "Virtuocity",
];

// تنبيهات الرحلة (يديرها المشرف)
export const DEFAULT_ANNOUNCEMENTS = [];

// لحظات ننتظرها — أبرز الفعاليات لواجهة الرئيسية
// كل الفعاليات الفعلية (بدون تنقلات/طريق/فنادق/طعام/صلاة) — بحسب طلب "كل الفعاليات غير الانتقالات والأكل ونحوه"
export const HIGHLIGHT_IDS = [
  "d0-5", "d0-6", "d0-9", "d0-10-kids-1", "d0-10-adults-1",
  "d1-5",
  "d2-2", "d2-4-over3-1", "d2-4-toddlers-1", "d2-7", "d2-9",
  "d3-2",
];
