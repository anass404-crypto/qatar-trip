import { BOOKINGS } from "../data.js?v=13";
import { el } from "../util.js?v=13";
import { getBookingStatus } from "../store.js?v=13";

const STATUS_PILL = {
  "لم يُحجز": "need",
  "بانتظار التحديث": "need",
  "جاري الحجز": "warn",
  "محجوز": "live",
  "لا يحتاج حجز": "done",
  "غير محجوزة حاليًا": "warn",
};

function row(b) {
  const status = getBookingStatus(b);
  const cls = STATUS_PILL[status] || "need";
  return el("div", { class: "booking-row" }, [
    el("div", {}, [
      el("div", { class: "booking-name" }, b.title),
      b.note ? el("div", { class: "booking-note" }, b.note) : null,
      b.when ? el("div", { class: "booking-note" }, "📅 " + b.when) : null,
      b.total ? el("div", { class: "booking-note" }, "💰 " + b.total + (b.date ? " · " + b.date : "")) : null,
    ]),
    el("span", { class: "pill " + cls }, status),
  ]);
}

function group(title, icon, items) {
  if (!items.length) return null;
  return el("div", {}, [
    el("div", { class: "booking-group-title" }, `${icon} ${title}`),
    el("div", { class: "plain-card", style: "padding:0" }, items.map(row)),
  ]);
}

export function renderBookings(root) {
  const container = el("div", { class: "view-enter" });
  container.appendChild(el("section", { class: "section" }, el("h1", { style: "font-size:22px" }, "حجوزات الرحلة")));
  const list = el("div", { class: "card-list" }, [
    group("عاجل جدًا", "🔴", BOOKINGS.urgent),
    group("هذا الأسبوع", "🟠", BOOKINGS.thisWeek),
    group("يحجز في موعد محدد", "🔔", BOOKINGS.scheduled),
    group("بلا حجز", "🟢", BOOKINGS.none.map((b) => ({ ...b, status: "لا يحتاج حجز" }))),
  ].filter(Boolean));
  container.appendChild(list);
  root.innerHTML = "";
  root.appendChild(container);
}
