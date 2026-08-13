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
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Aleph+Doha+Residences+Curio+Collection+by+Hilton",
    checkin: NEEDS_CONFIRM,
    checkout: "12:00 ظهرًا (الأربعاء 19 أغسطس)",
    website: "https://www.hilton.com/en/hotels/doharqq-aleph-doha-residences/",
    instagram: "https://www.instagram.com/alephdoha/",
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
  msheireb: "assets/img/msheireb.jpg?v=19",
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
  note: "بعد Colorverse، العائلة كلها سوية: كتارا ثم المدينة التعليمية ثم Festival City — بلا انقسام مسارات.",
  items: [
    { id: "d0-1", time: "08:00", timeEnd: null, title: "الانطلاق من الدمام", category: "drive",
      desc: "فطور في البيت قبلها.", highlights: [] },
    { id: "d0-2", time: "11:00", approx: true, timeEnd: null, title: "منفذ أبو سمرة", category: "border",
      desc: "مفتوح 24 ساعة. المدة المتوقعة 30–60 دقيقة.",
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Abu+Samra+Border+Crossing&query_place_id=ChIJVQo62gnwRj4ROzZwL7IEEg4",
      highlights: ["مفتوح على مدار الساعة", "المدة المتوقعة 30–60 دقيقة"] },
    { id: "d0-3", time: "12:15", timeEnd: null, title: "الوصول إلى مشيرب", category: "culture", cover: "msheireb",
      desc: "مواقف تحت الأرض مكيفة. مشيرب أول حي ذكي ومستدام في الدوحة — عمارة تراثية وحديثة معًا، وسط نابض بالمطاعم والمحال قرب سوق واقف.",
      website: "https://www.msheireb.com", instagram: "https://www.instagram.com/msheirebproperties/",
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Msheireb+Downtown+Doha&query_place_id=ChIJD59mvjnFRT4RivB5tQ0cb6Y",
      highlights: ["مواقف تحت الأرض مكيفة", "أول حي ذكي ومستدام في الدوحة"] },
    { id: "d0-4", time: "12:20", timeEnd: "13:20", title: "الغداء في Trapani", category: "food", cover: "trapani",
      desc: "مطعم إيطالي على طراز Cicchetteria (أطباق صغيرة) — بيتزا وريزوتو وأرانشيني، سريع ومريح بعد الطريق.", rating: 4.4,
      hours: NEEDS_CONFIRM,
      instagram: "https://www.instagram.com/trapani.qtr/",
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Trapani+Restaurant+Doha&query_place_id=ChIJnSntZzzFRT4RNs44RMpU8RQ",
      highlights: ["مطعم إيطالي (Cicchetteria)", "تقييم 4.4", "سريع بعد رحلة الطريق"] },
    { id: "d0-5", time: "13:25", timeEnd: "14:10", title: "LifeHub", category: "light", cover: "liveHub",
      desc: "معرض تفاعلي بثلاثة طوابق تديره جامعة Weill Cornell Medicine قطر — يستكشف تحديات المستقبل: تغيّر المناخ والاستدامة وتاريخ الطب والذكاء الاصطناعي في الرعاية الصحية.", price: "مجاني",
      hours: "السبت–الخميس 8ص–8م، الجمعة 3–10م",
      highlights: ["معرض تفاعلي عن المستقبل", "مجاني", "بمشاركة Weill Cornell Medicine قطر"] },
    { id: "d0-6", time: "14:15", timeEnd: "15:00", title: "Rush Paint House", category: "art", cover: "rushPaintHouse",
      desc: "جلسة رش وتلطيخ ألوان — ترتدي معطفًا واقيًا وتفرغ طاقتك على الجدران والقماش. تشمل تجارب مثل الرسم الدوّار (Spin Art) والرسم بالتأرجح (Swing Art) وغرفة الرش الحرة.", duration: "45 دقيقة", bookingRequired: true,
      hours: "السبت–الخميس 10ص–10م، الجمعة 2–10م",
      phone: "74790081",
      website: "https://rushpainthouse.com/", instagram: "https://www.instagram.com/rush.painthouse/",
      highlights: ["جلسة رش ألوان", "45 دقيقة", "يتطلب حجز مسبق"] },
    { id: "d0-7", time: "15:10", timeEnd: "15:25", title: "التوجه إلى الفندق", category: "drive",
      desc: "15 دقيقة.", duration: "15 دقيقة",
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Aleph+Doha+Residences+Curio+Collection+by+Hilton&query_place_id=ChIJI8FOzL_ERT4RKGWFNo3xOhI",
      highlights: [] },
    { id: "d0-8", time: "15:25", timeEnd: "16:10", title: "تسجيل الدخول", category: "hotel", cover: "hotelTower",
      desc: "غرف + حقائب + تغيير ملابس.", highlights: [] },
    { id: "d0-9", time: "16:30", timeEnd: "17:15", title: "Colorverse في كتارا", category: "light",
      desc: "تجربة ضوئية غامرة موسمية (حتى 15 سبتمبر 2026) — تتحول إلى «مُرمِّم» ترافقه الشخصية HUE عبر 7 مناطق تفاعلية لإعادة اللون لعالم Colorama الخيالي. المدة 35–45 دقيقة.", capacity: "حد أقصى 15 شخصًا", cover: "colorverse",
      hours: "الأحد–الأربعاء 4–10م، الخميس–السبت 4–11م",
      website: "https://visitqatar.com/intl-en/events-calendar/colorverse",
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Colorverse+Katara&query_place_id=ChIJAfqz1UfDRT4RnSqB06dBnRE",
      highlights: ["تجربة ضوئية غامرة", "حد أقصى 15 شخصًا", "فعالية موسمية حتى منتصف سبتمبر"] },
    { id: "d0-10a", time: "17:20", timeEnd: "18:00", title: "OliOli في كتارا (سوية)", category: "play", cover: "olioli",
      desc: "متحف اكتشاف تفاعلي للأطفال داخل مبنى على شكل صندوق هدية في المول العائلي بكتارا — 6 قاعات تفاعلية (المياه، الحركة، اللياقة، WonderSphere، ومنطقة Future Park). 40 دقيقة.",
      price: "135 ريال للطفل (يشمل مرافقًا)",
      hours: "الجمعة 1–10م، السبت 10ص–9م، بقية الأيام يحتاج تأكيد",
      website: "https://olioli.qa", instagram: "https://www.instagram.com/oliolidoha/",
      highlights: ["135 ريال للطفل، يشمل مرافقًا", "6 قاعات تفاعلية"] },
    { id: "d0-10b", time: "18:00", timeEnd: "18:20", title: "التوجه إلى المدينة التعليمية", category: "drive",
      desc: "حوالي 20 دقيقة من كتارا.", duration: "20 دقيقة", highlights: [] },
    { id: "d0-10c", time: "18:20", approx: true, timeEnd: "18:40", title: "صلاة المغرب في مسجد ذو المنارتين", category: "culture",
      desc: "مسجد المدينة التعليمية، خلف الإمام الشيخ هيثم الدخين.", highlights: [] },
    { id: "d0-10d", time: "18:40", timeEnd: "19:15", title: "مكتبة قطر الوطنية", category: "book", cover: "qnlLibrary",
      desc: "تصميم المعماري ريم كولهاس (OMA) — تراسات رخامية متدرجة ومكتبة تراث نادرة. تغلق 8:00 م.",
      hours: "السبت–الخميس 8ص–8م، الجمعة 4–8م",
      website: "https://www.qnl.qa", instagram: "https://www.instagram.com/qatarnationallibrary/",
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Qatar+National+Library&query_place_id=ChIJuQfI1QfcRT4R4wy5B5LpX3g",
      highlights: ["تغلق الساعة 8:00 م", "تصميم المعماري ريم كولهاس", "من أجمل مكتبات العالم معماريًا"] },
    { id: "d0-10e", time: "19:15", timeEnd: "19:40", title: "تنقل بالترام والحديقة القرآنية", category: "culture",
      desc: "جولة قصيرة قبل صلاة العشاء.", highlights: [] },
    { id: "d0-10f", time: "19:40", approx: true, timeEnd: "20:00", title: "صلاة العشاء", category: "culture",
      desc: "في مسجد ذو المنارتين خلف الإمام الشيخ هيثم الدخين.", highlights: [] },
    { id: "d0-11", time: "20:30", timeEnd: "22:00", title: "العشاء في قصر الياسمين", category: "food", cover: "qasrAlYasmin",
      desc: "Festival City. عمارة أندلسية فخمة بنافورة مركزية — فاز بجائزة TripAdvisor Travelers' Choice.",
      rating: 4.9, meetPoint: true,
      hours: NEEDS_CONFIRM,
      website: "https://yasminepalace.com/doha-festival-city-branch/", instagram: "https://www.instagram.com/yasminepalace/",
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Qasr+Al+Yasmin+Restaurant+Doha&query_place_id=ChIJ2fDvJfPdRT4RONtoiDP451E",
      highlights: ["التقاء الجميع", "Festival City", "تقييم 4.9"] },
    { id: "d0-12", time: "22:15", timeEnd: null, title: "الفندق", category: "hotel", cover: "hotelTower", desc: "", highlights: [] },
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
      desc: "أول مدينة ملاهي داخلية في قطر — 30+ لعبة عبر 3 مناطق (Oryxville وCity of Imagination وGravity)، أبرزها EpiQ Coaster (أطول أفعوانية داخلية في العالم) وMagma Blast (أطول برج سقوط داخلي في العالم). على طول بعد الفطور — نكون واصلين مع وقت الفتح. بوابة 5، استبدال قسائم عطلة. يوم كامل بلا غداء منفصل، الأكل داخل Quest.",
      phone: "44103444",
      website: "https://dohaquest.com", instagram: "https://www.instagram.com/dohaquest/",
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Doha+Quest&query_place_id=ChIJNbDkfqXFRT4RGelqgZu8fZ0",
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
        { key: "over3", label: "الباقي", icon: "🧒", items: [
          { id: "d2-4-over3-1", time: "12:00", timeEnd: "14:00", title: "Snow Dunes", category: "snow", cover: "snowDunes",
            desc: "أول حديقة ثلج داخلية بطراز عربي في العالم، مستوحاة من العمارة القطرية التقليدية — ثلج حقيقي وتزلج وانزلاق، هروب مثالي من حر الصيف. يفتح الساعة 12:00. المعدات متوفرة.", price: "89 ريال",
            hours: NEEDS_CONFIRM,
            phone: "40420444",
            website: "https://snowdunes.qa", instagram: "https://www.instagram.com/snowdunesqatar/",
            mapsUrl: "https://www.google.com/maps/search/?api=1&query=Snow+Dunes+Doha&query_place_id=ChIJp6v9JRDdRT4RxHsq43W53po",
            highlights: ["المعدات متوفرة بالمكان", "89 ريال", "أول حديقة ثلج عربية الطراز في العالم"] },
        ]},
        { key: "toddlers", label: "سعد وبسام", icon: "🧸", items: [
          { id: "d2-4-toddlers-1", time: "12:00", timeEnd: "14:00", title: "Caboodle", category: "play", cover: "caboodle",
            desc: "لـ سعد وبسام. مساحة لعب تفاعلي (Edutainment) + كافيه + صالون أطفال + ورش (زومبا، حرف يدوية). تنبيه: تأكد من انتهاء التجديدات.", phone: "44887233",
            hours: "الأحد–الأربعاء 10ص–10م، الخميس–السبت 10ص–11م، الجمعة إغلاق للصلاة 11:30–1:00",
            website: "https://caboodle.qa", instagram: "https://www.instagram.com/caboodle_qatar/",
            highlights: ["خاص بـ سعد وبسام", "لعب + كافيه + ورش حرفية"] },
        ]},
      ],
    },
    { id: "d2-5", time: "14:15", timeEnd: "15:30", title: "العودة، قيلولة، سناك خفيف", category: "hotel", desc: "", highlights: [] },
    { id: "d2-6", time: "15:45", timeEnd: "16:00", title: "التوجه إلى متحف الفن الإسلامي", category: "museum",
      desc: "تحفة معمارية للمعماري آي إم پاي (I.M. Pei) على جزيرتها الخاصة بكورنيش الدوحة — مقتنيات فنية إسلامية من 1400 عام عبر 3 قارات.",
      hours: "الأحد والاثنين والثلاثاء والسبت 9ص–7م، الخميس 9ص–9م، الجمعة 1:30–7م، الأربعاء إغلاق",
      phone: "44224444",
      website: "https://mia.org.qa/en/", instagram: "https://www.instagram.com/miaqatar/",
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Museum+of+Islamic+Art+Doha&query_place_id=ChIJjVLMehfFRT4RfdY6vbQQpXU", cover: "mia",
      highlights: ["مبنى المعماري آي إم پاي", "1400 عام من الفن الإسلامي"] },
    { id: "d2-7", time: "16:00", timeEnd: "17:00", title: "Planet Teens Workshop", category: "art", cover: "planetTeensMia",
      desc: "لـ رغد وجمان وتالة. العمر 10–16، غير محجوزة حاليًا. وبالتوازي: جولة القاعات، عرض الإسطرلاب، تحدي الزخارف.",
      ageRange: "10–16", bookingStatus: "غير محجوزة حاليًا",
      website: "https://mia.org.qa/en/", instagram: "https://www.instagram.com/miaqatar/",
      highlights: ["خاص بـ رغد وجمان وتالة", "ورشة للأعمار 10–16", "بالتوازي: جولة القاعات وعرض الإسطرلاب وتحدي الزخارف"] },
    { id: "d2-8", time: "17:05", timeEnd: "17:25", title: "التوجه إلى كتارا مبنى 41", category: "drive",
      desc: "التسجيل قبل العرض بنصف ساعة شرط.", cover: "katara", highlights: [] },
    { id: "d2-9", time: "18:00", timeEnd: "18:45", title: "عرض Polaris ثلاثي الأبعاد", category: "space",
      desc: "في قبة الثريا (Al Thuraya Planetarium) — أول قبة فلكية في قطر، شاشة قطرها 22 مترًا و200 مقعد ونظام عرض Digistar الرقمي. عروض بالعربية والإنجليزية.", cover: "katara",
      hours: "يوميًا 8ص–8م (دوام المرفق)",
      phone: "44082067",
      website: "https://althuraya.katara.net", instagram: "https://www.instagram.com/kataraqatar/",
      highlights: ["عرض ثلاثي الأبعاد", "قبة الثريا", "أول قبة فلكية في قطر"] },
    { id: "d2-10", time: "19:30", timeEnd: "21:30", title: "العشاء في Parisa", category: "food",
      desc: "أضخم مطعم إيراني في الدوحة، سوق واقف — ديكور مبهر بمرايا فسيفسائية وزخارف يدوية، والمكان نفسه نصف التجربة. كباب إيراني متقن وحصص سخية. خيارات النباتيين محدودة.", rating: 4.3, bookingRequired: true,
      hours: "6:00–10:30م",
      phone: "44411494",
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Parisa+Restaurant+Doha&query_place_id=ChIJCz-fZz7FRT4RZGAhbElAQdY",
      highlights: ["أضخم مطعم إيراني في الدوحة", "سوق واقف", "الحجز إلزامي فعلًا — قد يحتاج يومين مسبقًا"] },
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
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Doha+Corniche",
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
    { id: "b7", title: "Parisa", note: "الحجز إلزامي فعلًا — قد يحتاج يومين مسبقًا", status: "بانتظار التحديث" },
    { id: "b8", title: "Caboodle", note: "", status: "بانتظار التحديث" },
    { id: "b9", title: "الفندق", note: "تأكيد الوصول المتأخر، دوام المسبح، Beach Club", status: "بانتظار التحديث" },
  ],
  scheduled: [
    { id: "b10", title: "قبة الثريا", note: "althuraya.katara.net", when: "ليلة الاثنين", status: "التذاكر تفتح قبل العرض بيوم واحد" },
  ],
  none: [
    { id: "b11", title: "LifeHub" },
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
  "d0-5", "d0-6", "d0-9", "d0-10a", "d0-10d",
  "d1-5",
  "d2-2", "d2-4-over3-1", "d2-4-toddlers-1", "d2-6", "d2-7", "d2-9",
];
