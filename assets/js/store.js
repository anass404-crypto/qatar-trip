// طبقة تخزين محلية (localStorage) خلف واجهة صغيرة قابلة للاستبدال لاحقًا بخادم مشترك
// (Supabase أو غيره) دون تعديل الواجهات — كل الوصول للبيانات يمر من هنا فقط.
// ملاحظة صادقة: بما أن الموقع ثابت بلا خادم، هذه التفاعلات (الحماس/التقييم/التصويت/تعديلات
// المشرف) محفوظة على هذا الجهاز فقط حاليًا، وليست مشتركة فوريًا بين جميع أفراد العائلة.

const KEY = "qtrip:v1";

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function save(state) {
  localStorage.setItem(KEY, JSON.stringify(state));
  window.dispatchEvent(new CustomEvent("store:change", { detail: state }));
}

let state = Object.assign(
  {
    participant: null, // { name, joinedAt }
    adminUnlocked: false,
    reactions: {},        // { activityId: { [name]: true } }
    ratings: {},           // { activityId: { [name]: { stars, comment } } }
    suggestions: [],       // [{id,type,title,details,link,image,status,author,createdAt}]
    changeRequests: [],    // [{id,activityId,activityTitle,type,note,status,author,createdAt}]
    votes: {},              // { pollId: { [name]: optionId } }
    pollResolutions: {},   // { pollId: optionId }
    overrides: {           // تعديلات المشرف فوق البيانات الأصلية
      activities: {},       // { id: {partial fields...} }
      announcements: [],
      bookingStatus: {},    // { bookingId: status }
      activityStatus: {},   // { id: 'planned'|'live'|'done'|'cancelled'|'rescheduled' }
      dayOrder: {},          // { dayId: [itemId,...] } إعادة ترتيب
    },
    dismissedTeasers: {},  // { 'YYYY-MM-DD': true }
  },
  load()
);

export function getState() {
  return state;
}

export function subscribe(fn) {
  const handler = () => fn(state);
  window.addEventListener("store:change", handler);
  window.addEventListener("storage", handler);
  return () => {
    window.removeEventListener("store:change", handler);
    window.removeEventListener("storage", handler);
  };
}

function patch(partial) {
  state = { ...state, ...partial };
  save(state);
}

// ---------- المشارك ----------
export function setParticipant(name) {
  patch({ participant: { name: name.trim(), joinedAt: Date.now() } });
}
export function getParticipant() {
  return state.participant;
}
export function clearParticipant() {
  patch({ participant: null });
}

// ---------- المشرف ----------
const ADMIN_PIN = "2026"; // PIN بسيط للاستخدام العائلي الخاص — غيّره من هنا عند الحاجة
export function tryAdminLogin(pin) {
  if (pin === ADMIN_PIN) {
    patch({ adminUnlocked: true });
    return true;
  }
  return false;
}
export function adminLogout() {
  patch({ adminUnlocked: false });
}
export function isAdmin() {
  return !!state.adminUnlocked;
}

// ---------- التفاعل (متحمس) ----------
export function toggleReaction(activityId) {
  const name = state.participant?.name || "زائر";
  const cur = { ...(state.reactions[activityId] || {}) };
  if (cur[name]) delete cur[name];
  else cur[name] = true;
  patch({ reactions: { ...state.reactions, [activityId]: cur } });
}
export function reactionCount(activityId) {
  return Object.keys(state.reactions[activityId] || {}).length;
}
export function hasReacted(activityId) {
  const name = state.participant?.name || "زائر";
  return !!(state.reactions[activityId] || {})[name];
}

// ---------- التقييم ----------
export function rateActivity(activityId, stars, comment = "") {
  const name = state.participant?.name || "زائر";
  const cur = { ...(state.ratings[activityId] || {}) };
  cur[name] = { stars, comment };
  patch({ ratings: { ...state.ratings, [activityId]: cur } });
}
export function activityRatingAverage(activityId) {
  const entries = Object.values(state.ratings[activityId] || {});
  if (!entries.length) return null;
  const avg = entries.reduce((s, e) => s + e.stars, 0) / entries.length;
  return { avg: Math.round(avg * 10) / 10, count: entries.length };
}
export function myRating(activityId) {
  const name = state.participant?.name || "زائر";
  return (state.ratings[activityId] || {})[name] || null;
}

// ---------- الاقتراحات ----------
export function addSuggestion({ type, title, details, link, image }) {
  const s = {
    id: "s" + Date.now(),
    type, title, details, link: link || "", image: image || "",
    status: "قيد المراجعة",
    author: state.participant?.name || "زائر",
    createdAt: Date.now(),
  };
  patch({ suggestions: [s, ...state.suggestions] });
  return s;
}
export function setSuggestionStatus(id, status) {
  patch({ suggestions: state.suggestions.map((s) => (s.id === id ? { ...s, status } : s)) });
}

// ---------- طلبات تعديل فعالية ----------
export function addChangeRequest({ activityId, activityTitle, type, note }) {
  const c = {
    id: "c" + Date.now(),
    activityId, activityTitle, type, note,
    status: "قيد المراجعة",
    author: state.participant?.name || "زائر",
    createdAt: Date.now(),
  };
  patch({ changeRequests: [c, ...state.changeRequests] });
  return c;
}
export function setChangeRequestStatus(id, status) {
  patch({ changeRequests: state.changeRequests.map((c) => (c.id === id ? { ...c, status } : c)) });
}

// ---------- التصويت ----------
export function vote(pollId, optionId) {
  const name = state.participant?.name || "زائر";
  const cur = { ...(state.votes[pollId] || {}) };
  cur[name] = optionId;
  patch({ votes: { ...state.votes, [pollId]: cur } });
}
export function myVote(pollId) {
  const name = state.participant?.name || "زائر";
  return (state.votes[pollId] || {})[name] || null;
}
export function pollResults(pollId, options) {
  const votes = Object.values(state.votes[pollId] || {});
  const total = votes.length;
  return options.map((o) => {
    const count = votes.filter((v) => v === o.id).length;
    return { ...o, count, pct: total ? Math.round((count / total) * 100) : 0 };
  });
}
export function resolvePoll(pollId, optionId) {
  patch({ pollResolutions: { ...state.pollResolutions, [pollId]: optionId } });
}

// ---------- تعديلات المشرف ----------
export function overrideActivity(id, partial) {
  const activities = { ...state.overrides.activities, [id]: { ...(state.overrides.activities[id] || {}), ...partial } };
  patch({ overrides: { ...state.overrides, activities } });
}
export function getActivityOverride(id) {
  return state.overrides.activities[id] || {};
}
export function setActivityStatus(id, status) {
  const activityStatus = { ...state.overrides.activityStatus, [id]: status };
  patch({ overrides: { ...state.overrides, activityStatus } });
}
export function getActivityStatus(id) {
  return state.overrides.activityStatus[id] || "planned";
}
export function setBookingStatus(id, status) {
  const bookingStatus = { ...state.overrides.bookingStatus, [id]: status };
  patch({ overrides: { ...state.overrides, bookingStatus } });
}
export function getBookingStatus(booking) {
  return state.overrides.bookingStatus[booking.id] || booking.status || "لم يُحجز";
}

// ---------- التنبيهات ----------
export function addAnnouncement(text) {
  const a = { id: "a" + Date.now(), text, createdAt: Date.now() };
  patch({ overrides: { ...state.overrides, announcements: [a, ...state.overrides.announcements] } });
}
export function removeAnnouncement(id) {
  patch({ overrides: { ...state.overrides, announcements: state.overrides.announcements.filter((a) => a.id !== id) } });
}
export function getAnnouncements() {
  return state.overrides.announcements;
}

// ---------- تلميح الغد ----------
export function dismissTeaser(dateStr) {
  patch({ dismissedTeasers: { ...state.dismissedTeasers, [dateStr]: true } });
}
export function isTeaserDismissed(dateStr) {
  return !!state.dismissedTeasers[dateStr];
}

export function resetAllData() {
  localStorage.removeItem(KEY);
  location.reload();
}
