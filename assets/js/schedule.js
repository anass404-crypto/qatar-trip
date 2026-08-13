// طبقة اشتقاق الجدول: تدمج بيانات data.js الثابتة مع تعديلات لوحة الإدارة (store.js)
// وتحسب حالة كل فعالية (انتهت / الآن / قادمة) بحسب الوقت الحالي.

import { DAYS, TRIP, CATEGORY_STYLE, REAL_PHOTOS, HIGHLIGHT_IDS } from "./data.js?v=4";
import { timeToDate } from "./util.js?v=4";
import { getActivityOverride, getActivityStatus } from "./store.js?v=4";

// كل الفعاليات المفردة داخل يوم (بما فيها فروع الانقسام) بترتيب مسطّح — للبحث فقط
export function allItemsOfDay(day) {
  const out = [];
  for (const it of day.items) {
    if (it.type === "split") {
      for (const p of it.paths) out.push(...p.items);
    } else {
      out.push(it);
    }
  }
  return out;
}

export function findActivity(id) {
  for (const day of DAYS) {
    for (const it of allItemsOfDay(day)) {
      if (it.id === id) return { item: it, day };
    }
  }
  return null;
}

export function withOverrides(item) {
  const ov = getActivityOverride(item.id);
  return { ...item, ...ov };
}

export function getCover(item) {
  const merged = withOverrides(item);
  if (merged.coverUrl) return { type: "image", url: merged.coverUrl };
  if (merged.cover && REAL_PHOTOS[merged.cover]) return { type: "image", url: REAL_PHOTOS[merged.cover] };
  const style = CATEGORY_STYLE[merged.category] || CATEGORY_STYLE.hotel;
  return { type: "placeholder", ...style };
}

// يبني قائمة "كتل" اليوم بترتيب زمني مع أوقات بداية/نهاية محسوبة
export function buildDayBlocks(day) {
  const blocks = day.items.map((it) => ({ ...it }));
  const withTimes = blocks.map((b, i) => {
    const start = timeToDate(day.date, b.time);
    let end = b.timeEnd ? timeToDate(day.date, b.timeEnd) : null;
    return { block: b, start, end, index: i };
  });
  // إن لم يوجد وقت نهاية صريح، نستخدم بداية الكتلة التالية، وإلا +30 دقيقة كحد افتراضي لآخر كتلة
  for (let i = 0; i < withTimes.length; i++) {
    if (!withTimes[i].end) {
      const next = withTimes[i + 1];
      withTimes[i].end = next ? next.start : new Date(withTimes[i].start.getTime() + 30 * 60000);
    }
  }
  return withTimes;
}

export function getBlockStatus(blockWithTimes, now = new Date()) {
  const b = blockWithTimes.block;
  const manual = getActivityStatus(b.id);
  if (manual === "cancelled") return "cancelled";
  if (manual === "done") return "done";
  if (manual === "live") return "live";
  if (now < blockWithTimes.start) return "upcoming";
  if (now >= blockWithTimes.end) return "done";
  return "live";
}

// كل كتل الرحلة مرتبة زمنيًا عبر الأيام كلها
export function allTripBlocks() {
  const out = [];
  for (const day of DAYS) {
    for (const wt of buildDayBlocks(day)) out.push({ ...wt, day });
  }
  return out;
}

export function getCurrentAndNext(now = new Date()) {
  const blocks = allTripBlocks();
  let current = null;
  let next = null;
  for (const b of blocks) {
    const status = getBlockStatus(b, now);
    if (status === "live" && !current) current = b;
    if (status === "upcoming" && !next) {
      next = b;
      break;
    }
  }
  return { current, next };
}

export function tripPhase(now = new Date()) {
  const start = new Date(TRIP.start);
  const end = new Date(TRIP.end);
  if (now < start) return "before";
  if (now > end) return "after";
  return "during";
}

export function currentDayIndex(now = new Date()) {
  for (let i = 0; i < DAYS.length; i++) {
    const d = DAYS[i];
    const dayStart = timeToDate(d.date, "00:00");
    const dayEnd = new Date(dayStart.getTime() + 24 * 3600000);
    if (now >= dayStart && now < dayEnd) return i;
  }
  return null;
}

export function highlightActivities() {
  return HIGHLIGHT_IDS.map((id) => findActivity(id)).filter(Boolean);
}

// فعاليات الغد (لميزة "بكرة وش عندنا؟") — أول 3 لها صورة/تمييز
export function tomorrowTeaser(now = new Date()) {
  const idx = currentDayIndex(now);
  if (idx == null || idx + 1 >= DAYS.length) return null;
  const tomorrow = DAYS[idx + 1];
  const items = allItemsOfDay(tomorrow).filter((it) => it.category !== "drive" && it.category !== "hotel");
  return { day: tomorrow, items: items.slice(0, 3) };
}
