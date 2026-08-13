import { DAYS, BOOKINGS } from "../data.js?v=8";
import { el, ar } from "../util.js?v=8";
import { allItemsOfDay } from "../schedule.js?v=8";
import {
  isAdmin, tryAdminLogin,
  overrideActivity, getActivityOverride, setActivityStatus, getActivityStatus,
  addAnnouncement, removeAnnouncement, getAnnouncements,
  getState, setSuggestionStatus, setChangeRequestStatus,
  setBookingStatus, getBookingStatus,
} from "../store.js?v=8";

function pinGate(root, onOk) {
  const container = el("div", { class: "view-enter section" });
  let pin = "";
  const dots = el("div", { class: "pin-pad" });
  const refreshDots = () => {
    dots.innerHTML = "";
    for (let i = 0; i < 4; i++) dots.appendChild(el("div", { class: "pin-dot" + (i < pin.length ? " filled" : "") }));
  };
  refreshDots();
  const input = el("input", {
    type: "password", inputmode: "numeric", maxlength: "4", placeholder: "PIN",
    style: "text-align:center;font-size:20px;letter-spacing:8px",
    oninput: (e) => { pin = e.target.value.replace(/\D/g, "").slice(0, 4); e.target.value = pin; refreshDots(); },
  });
  const err = el("div", { style: "color:var(--miss);font-size:12.5px;text-align:center;min-height:18px;margin-top:8px" });
  const submit = el("button", { class: "btn btn-primary btn-block", style: "margin-top:14px", onclick: () => {
    if (tryAdminLogin(pin)) onOk();
    else err.textContent = "PIN غير صحيح";
  }});
  submit.textContent = "دخول";

  container.appendChild(el("h1", { style: "font-size:22px;text-align:center" }, "🛠️ لوحة المشرف"));
  container.appendChild(el("p", { style: "text-align:center;color:var(--pewter);font-size:13px;margin-top:6px" }, "أدخل رمز الدخول الخاص بالمشرف"));
  container.appendChild(dots);
  container.appendChild(el("div", { class: "field" }, input));
  container.appendChild(err);
  container.appendChild(submit);
  root.innerHTML = "";
  root.appendChild(container);
}

function section(title, node) {
  return el("section", { class: "section" }, [el("div", { class: "tag-title" }, title), node]);
}

function announcementsBlock(rerender) {
  const list = getAnnouncements();
  const input = el("input", { type: "text", placeholder: "نص التنبيه، مثال: تغيّر موعد الانطلاق إلى 4:15 م" });
  const add = el("button", { class: "btn btn-primary btn-sm", onclick: () => {
    if (!input.value.trim()) return;
    addAnnouncement(input.value.trim());
    rerender();
  }}, "إضافة");
  const rows = list.map((a) => el("div", { class: "admin-row" }, [
    el("span", { style: "font-size:13px" }, a.text),
    el("button", { class: "btn btn-ghost btn-sm", onclick: () => { removeAnnouncement(a.id); rerender(); } }, "حذف"),
  ]));
  return el("div", { class: "plain-card" }, [
    el("div", { style: "display:flex;gap:8px" }, [input, add]),
    ...rows,
  ]);
}

function activityEditor(rerender) {
  const select = el("select", {}, DAYS.flatMap((d) => allItemsOfDay(d).map((it) => el("option", { value: it.id }, `${d.label} — ${it.title}`))));
  const box = el("div", { style: "margin-top:10px" });

  function loadItem(id) {
    const found = DAYS.flatMap((d) => allItemsOfDay(d).map((it) => ({ it, d }))).find((x) => x.it.id === id);
    if (!found) return;
    const ov = getActivityOverride(id);
    const merged = { ...found.it, ...ov };
    box.innerHTML = "";
    const timeInput = el("input", { type: "text", value: merged.time || "", placeholder: "HH:MM" });
    const timeEndInput = el("input", { type: "text", value: merged.timeEnd || "", placeholder: "HH:MM" });
    const priceInput = el("input", { type: "text", value: merged.price || "", placeholder: "السعر" });
    const mapsInput = el("input", { type: "url", value: merged.mapsUrl || "", placeholder: "رابط خرائط قوقل" });
    const coverInput = el("input", { type: "url", value: merged.coverUrl || "", placeholder: "رابط صورة الغلاف" });
    const statusSelect = el("select", {}, ["planned", "live", "done", "cancelled", "rescheduled"].map((s) =>
      el("option", { value: s, selected: getActivityStatus(id) === s ? "" : null }, { planned: "مخطط", live: "جاري الآن", done: "انتهى", cancelled: "ملغى", rescheduled: "تم تغيير الموعد" }[s])
    ));
    const save = el("button", { class: "btn btn-primary btn-block", onclick: () => {
      overrideActivity(id, { time: timeInput.value, timeEnd: timeEndInput.value || null, price: priceInput.value, mapsUrl: mapsInput.value, coverUrl: coverInput.value });
      setActivityStatus(id, statusSelect.value);
      rerender();
    }}, "حفظ التعديلات");

    box.appendChild(el("div", { class: "form-stack" }, [
      el("div", { class: "sheet-meta-grid" }, [
        el("div", { class: "field" }, [el("label", {}, "وقت البداية"), timeInput]),
        el("div", { class: "field" }, [el("label", {}, "وقت النهاية"), timeEndInput]),
      ]),
      el("div", { class: "field" }, [el("label", {}, "السعر"), priceInput]),
      el("div", { class: "field" }, [el("label", {}, "رابط خرائط قوقل"), mapsInput]),
      el("div", { class: "field" }, [el("label", {}, "رابط صورة الغلاف"), coverInput]),
      el("div", { class: "field" }, [el("label", {}, "حالة الفعالية"), statusSelect]),
      save,
    ]));
  }

  select.onchange = () => loadItem(select.value);
  const wrap = el("div", { class: "plain-card" }, [select, box]);
  loadItem(select.value);
  return wrap;
}

function suggestionsBlock(rerender) {
  const list = getState().suggestions;
  if (!list.length) return el("div", { class: "empty-state" }, "لا توجد اقتراحات بعد");
  return el("div", { class: "card-list", style: "padding:0" }, list.map((s) => el("div", { class: "plain-card" }, [
    el("div", { style: "display:flex;justify-content:space-between" }, [
      el("span", { style: "font-weight:700;font-size:13.5px" }, `${s.type} — ${s.title}`),
      el("span", { class: "pill " + (s.status === "تم الاعتماد" ? "live" : s.status === "لم يعتمد" ? "cancelled" : "need") }, s.status),
    ]),
    s.details ? el("div", { style: "font-size:12.5px;color:var(--pewter);margin-top:4px" }, s.details) : null,
    el("div", { style: "font-size:11.5px;color:var(--fog);margin-top:4px" }, "من: " + s.author),
    el("div", { class: "choice-row", style: "margin-top:8px" }, [
      el("button", { class: "btn btn-ghost btn-sm", onclick: () => { setSuggestionStatus(s.id, "تم الاعتماد"); rerender(); } }, "اعتماد"),
      el("button", { class: "btn btn-ghost btn-sm", onclick: () => { setSuggestionStatus(s.id, "لم يعتمد"); rerender(); } }, "رفض"),
    ]),
  ])));
}

function changeRequestsBlock(rerender) {
  const list = getState().changeRequests;
  if (!list.length) return el("div", { class: "empty-state" }, "لا توجد طلبات تعديل بعد");
  return el("div", { class: "card-list", style: "padding:0" }, list.map((c) => el("div", { class: "plain-card" }, [
    el("div", { style: "display:flex;justify-content:space-between" }, [
      el("span", { style: "font-weight:700;font-size:13.5px" }, `${c.type} — ${c.activityTitle}`),
      el("span", { class: "pill " + (c.status === "تم الاعتماد" ? "live" : c.status === "لم يعتمد" ? "cancelled" : "need") }, c.status),
    ]),
    c.note ? el("div", { style: "font-size:12.5px;color:var(--pewter);margin-top:4px" }, c.note) : null,
    el("div", { style: "font-size:11.5px;color:var(--fog);margin-top:4px" }, "من: " + c.author),
    el("div", { class: "choice-row", style: "margin-top:8px" }, [
      el("button", { class: "btn btn-ghost btn-sm", onclick: () => { setChangeRequestStatus(c.id, "تم الاعتماد"); rerender(); } }, "اعتماد"),
      el("button", { class: "btn btn-ghost btn-sm", onclick: () => { setChangeRequestStatus(c.id, "لم يعتمد"); rerender(); } }, "رفض"),
    ]),
  ])));
}

function bookingsBlock(rerender) {
  const all = [...BOOKINGS.urgent, ...BOOKINGS.thisWeek, ...BOOKINGS.scheduled];
  return el("div", { class: "plain-card", style: "padding:0" }, all.map((b) => {
    const select = el("select", { onchange: (e) => { setBookingStatus(b.id, e.target.value); rerender(); } },
      ["لم يُحجز", "جاري الحجز", "محجوز", "لا يحتاج حجز"].map((s) => el("option", { value: s, selected: getBookingStatus(b) === s ? "" : null }, s))
    );
    return el("div", { class: "booking-row" }, [el("span", { class: "booking-name" }, b.title), select]);
  }));
}

function adminHome(root) {
  const container = el("div", { class: "view-enter" });
  container.appendChild(el("section", { class: "section" }, [
    el("h1", { style: "font-size:22px" }, ["🛠️ لوحة المشرف ", el("span", { class: "admin-badge" }, "نشط")]),
  ]));
  const rerender = () => renderAdmin(root);

  container.appendChild(section("تنبيه الرحلة", announcementsBlock(rerender)));
  container.appendChild(section("تعديل فعالية", activityEditor(rerender)));
  container.appendChild(section("حالة الحجوزات", bookingsBlock(rerender)));
  container.appendChild(section("الاقتراحات الواردة", suggestionsBlock(rerender)));
  container.appendChild(section("طلبات تعديل الفعاليات", changeRequestsBlock(rerender)));
  container.appendChild(el("div", { style: "height:24px" }));

  root.innerHTML = "";
  root.appendChild(container);
}

export function renderAdmin(root) {
  if (!isAdmin()) return pinGate(root, () => renderAdmin(root));
  adminHome(root);
}
