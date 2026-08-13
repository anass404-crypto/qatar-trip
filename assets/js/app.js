import { el } from "./util.js?v=2";
import { getParticipant, setParticipant, getAnnouncements, subscribe } from "./store.js?v=2";
import { tripPhase, currentDayIndex } from "./schedule.js?v=2";
import { registerRoute, startRouter } from "./router.js?v=2";
import { renderHome } from "./views/home.js?v=2";
import { renderDay } from "./views/day.js?v=2";
import { renderBookings } from "./views/bookings.js?v=2";
import { renderTrip } from "./views/trip.js?v=2";
import { renderMore } from "./views/more.js?v=2";
import { renderSuggest } from "./views/suggest.js?v=2";
import { renderAdmin } from "./views/admin.js?v=2";

const app = document.getElementById("app");
const topbar = document.getElementById("topbar");
const announceHost = document.getElementById("announce-host");
const bottomNav = document.getElementById("bottom-nav");
const fabHost = document.getElementById("fab-host");

// ---------- بوابة الدخول البسيطة ----------
function ensureParticipant() {
  return new Promise((resolve) => {
    const existing = getParticipant();
    if (existing) return resolve();
    const overlay = el("div", { class: "sheet-overlay open", style: "z-index:60" });
    const box = el("div", {
      style: "position:fixed;inset-inline:16px;top:50%;transform:translateY(-50%);background:var(--white);border-radius:20px;padding:26px 22px;z-index:61;box-shadow:var(--shadow-lg)",
    });
    const nameInput = el("input", { type: "text", placeholder: "اسمك" });
    const err = el("div", { style: "color:var(--miss);font-size:12.5px;min-height:16px;margin-top:6px" });
    const submitName = () => {
      if (!nameInput.value.trim()) { err.textContent = "اكتب اسمك أولًا"; return; }
      setParticipant(nameInput.value.trim());
      overlay.remove();
      box.remove();
      resolve();
    };
    nameInput.addEventListener("keydown", (e) => { if (e.key === "Enter") submitName(); });
    const go = el("button", { class: "btn btn-primary btn-block", style: "margin-top:14px", onclick: submitName }, "دخول");
    box.appendChild(el("div", { style: "font-size:20px;font-weight:700;text-align:center;margin-bottom:4px" }, "🇶🇦 رحلة قطر"));
    box.appendChild(el("div", { style: "font-size:13px;color:var(--pewter);text-align:center;margin-bottom:18px" }, "اكتب اسمك للمتابعة"));
    box.appendChild(el("div", { class: "form-stack" }, [
      el("div", { class: "field" }, [el("label", {}, "الاسم"), nameInput]),
    ]));
    box.appendChild(err);
    box.appendChild(go);
    document.body.appendChild(overlay);
    document.body.appendChild(box);
  });
}

// ---------- شريط التنبيهات ----------
function renderAnnouncements() {
  const list = getAnnouncements();
  announceHost.innerHTML = "";
  if (!list.length) return;
  const wrap = el("div", { class: "announce" });
  list.forEach((a) => {
    wrap.appendChild(el("div", { class: "announce-row" }, [
      el("span", {}, "⚠️ " + a.text),
    ]));
  });
  announceHost.appendChild(wrap);
}

// ---------- الشريط السفلي ----------
const NAV_ITEMS = [
  { href: "#/", icon: "🏠", label: "الرئيسية", match: (p) => p === "/" || p === "" },
  { href: "#/day/0", icon: "🗓️", label: "الجدول", match: (p) => p.startsWith("/day") },
  { href: "#/bookings", icon: "🎟", label: "الحجوزات", match: (p) => p.startsWith("/bookings") },
  { href: "#/more", icon: "•••", label: "المزيد", match: (p) => ["/more", "/trip", "/suggest", "/admin"].some((x) => p.startsWith(x)) },
];

function renderBottomNav(path) {
  bottomNav.innerHTML = "";
  NAV_ITEMS.forEach((item) => {
    const active = item.match(path);
    bottomNav.appendChild(el("a", { href: item.href, class: "bn-item" + (active ? " active" : "") }, [
      el("span", { class: "ic" }, item.icon),
      el("span", {}, item.label),
    ]));
  });
}

// ---------- زر "وين حنا الآن؟" ----------
function renderFab() {
  fabHost.innerHTML = "";
  if (tripPhase(new Date()) !== "during") return;
  fabHost.appendChild(el("button", { class: "fab", onclick: goToCurrentStation }, ["📍", "وين حنا الآن؟"]));
}
function goToCurrentStation() {
  const idx = currentDayIndex(new Date());
  if (idx == null) return;
  location.hash = `#/day/${idx}`;
  requestAnimationFrame(() => requestAnimationFrame(() => {
    const target = document.querySelector(".tl-item.live") || document.querySelector(".tl-item.upcoming");
    target?.scrollIntoView({ behavior: "smooth", block: "center" });
  }));
}

// ---------- التوجيه ----------
registerRoute("/", () => renderHome(app));
registerRoute("/day/:i", ({ i }) => renderDay(app, i));
registerRoute("/bookings", () => renderBookings(app));
registerRoute("/trip", () => renderTrip(app));
registerRoute("/more", () => renderMore(app));
registerRoute("/suggest", () => renderSuggest(app));
registerRoute("/admin", () => renderAdmin(app));

async function boot() {
  await ensureParticipant();
  renderAnnouncements();
  startRouter((path) => {
    renderBottomNav(path);
    renderFab();
  });
  subscribe(() => {
    renderAnnouncements();
  });

  window.addEventListener("scroll", () => topbar.classList.toggle("solid", window.scrollY > 8), { passive: true });

  // تحديث دوري لكل عناصر العدّ التنازلي والحالة الزمنية (كل 30 ثانية كافٍ لهذا النوع من المواقع)
  setInterval(() => {
    const path = (location.hash || "#/").slice(1);
    const m = ["/", ""].includes(path) ? () => renderHome(app) : path.startsWith("/day") ? () => renderDay(app, path.split("/")[2]) : null;
    if (m) m();
    renderFab();
  }, 30000);
}

boot();
