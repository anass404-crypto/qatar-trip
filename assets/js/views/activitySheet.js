import { el, fmtRange, ar } from "../util.js?v=14";
import { getCover, withOverrides, getBlockStatus, buildDayBlocks } from "../schedule.js?v=14";
import {
  toggleReaction, reactionCount, hasReacted,
  rateActivity, myRating, activityRatingAverage,
  addChangeRequest, getActivityStatus,
} from "../store.js?v=14";

let overlayEl, sheetEl;

function ensureSheetHost() {
  if (overlayEl) return;
  overlayEl = el("div", { class: "sheet-overlay", onclick: closeSheet });
  sheetEl = el("div", { class: "sheet" });
  document.body.appendChild(overlayEl);
  document.body.appendChild(sheetEl);
}

export function closeSheet() {
  if (!overlayEl) return;
  overlayEl.classList.remove("open");
  sheetEl.classList.remove("open");
}

function coverNode(item, tall = true) {
  const cover = getCover(item);
  if (cover.type === "image") {
    return el("div", { class: tall ? "sheet-hero" : "cv" }, el("img", { src: cover.url, alt: "" }));
  }
  return el("div", { class: (tall ? "sheet-hero" : "cv") + " ph", style: `background:${cover.grad}` }, cover.icon);
}

function statusLabel(status) {
  return { live: "نحن هنا الآن", done: "انتهت", upcoming: "قادمة", cancelled: "ملغاة" }[status] || "";
}

export function openActivitySheet(id, day) {
  ensureSheetHost();
  const raw = day.items.flatMap((it) => (it.type === "split" ? it.paths.flatMap((p) => p.items) : [it])).find((i) => i.id === id);
  if (!raw) return;
  const item = withOverrides(raw);
  const blocks = buildDayBlocks(day);
  const bt = blocks.find((b) => b.block.id === id) || blocks.flatMap((b) => (b.block.type === "split" ? b.block.paths.flatMap((p) => p.items.map((x) => ({ block: x, start: b.start, end: b.end }))) : [])).find((b) => b.block.id === id);
  const status = bt ? getBlockStatus(bt) : getActivityStatus(id);

  sheetEl.innerHTML = "";
  sheetEl.appendChild(el("button", { class: "sheet-close", "aria-label": "إغلاق", onclick: closeSheet }, "✕"));
  sheetEl.appendChild(coverNode(item, true));
  sheetEl.appendChild(el("div", { class: "sheet-grabber", style: "position:absolute;top:0" }));

  const body = el("div", { class: "sheet-body" });

  const titleRow = el("div", {}, [
    el("div", { class: "pill " + status, style: "margin-bottom:8px" }, statusLabel(status)),
    el("h2", { class: "sheet-title" }, item.title),
  ]);
  body.appendChild(titleRow);

  // meta grid
  const metaItems = [];
  metaItems.push(["موعدنا", `${day.label} ${day.dateLabel} — ${fmtRange(item.time, item.timeEnd)}`]);
  if (item.duration) metaItems.push(["مدة التجربة", item.duration]);
  if (item.price) metaItems.push(["السعر", item.price]);
  if (item.bookingTotal) metaItems.push(["التذاكر", item.bookingTotal]);
  if (item.rating) metaItems.push(["تقييم المطعم", "⭐ " + ar(item.rating)]);
  if (item.capacity) metaItems.push(["السعة", item.capacity]);
  if (item.ageRange) metaItems.push(["الفئة العمرية", item.ageRange]);
  if (item.phone) metaItems.push(["الهاتف", item.phone]);
  if (item.bookingRequired) metaItems.push(["الحجز", "إلزامي"]);
  if (item.bookingStatus) metaItems.push(["حالة الحجز", item.bookingStatus]);
  if (metaItems.length) {
    body.appendChild(el("div", { class: "sheet-meta-grid" }, metaItems.map(([k, v]) =>
      el("div", { class: "meta-box" }, [el("div", { class: "k" }, k), el("div", { class: "v" }, v)])
    )));
  }

  if (item.desc) body.appendChild(el("p", { style: "font-size:14px;color:var(--graphite);line-height:1.7" }, item.desc));

  if (item.mapsUrl) {
    body.appendChild(el("a", { class: "btn btn-primary btn-block", href: item.mapsUrl, target: "_blank", rel: "noopener" }, "📍 افتح الموقع في خرائط قوقل"));
  }

  if (item.highlights && item.highlights.length) {
    body.appendChild(el("div", {}, [
      el("div", { class: "tag-title" }, "ليش متحمسين لها؟ 🔥"),
      el("div", { class: "hl-chips" }, item.highlights.map((h) => el("span", { class: "hl-chip" }, h))),
    ]));
  }

  if (item.gallery && item.gallery.length) {
    body.appendChild(el("div", {}, [
      el("div", { class: "tag-title" }, "الصور"),
      el("div", { class: "gallery-scroller" }, item.gallery.map((src) => el("img", { src, alt: "" }))),
    ]));
  }

  if (item.innerPlan && item.innerPlan.length) {
    body.appendChild(el("div", {}, [
      el("div", { class: "tag-title" }, "الخطة داخل الفعالية"),
      el("div", { class: "plan-list" }, item.innerPlan.map((p) => el("div", { class: "plan-row" }, [el("span", { class: "t" }, p.time), el("span", {}, p.label)]))),
    ]));
  }

  const importantInfo = [];
  if (item.bookingRequired) importantInfo.push("يتطلب حجزًا مسبقًا");
  if (item.capacity) importantInfo.push(`السعة: ${item.capacity}`);
  if (day.note && (day.note.includes(item.title) || false)) importantInfo.push(day.note);
  if (importantInfo.length) {
    body.appendChild(el("div", {}, [
      el("div", { class: "tag-title" }, "معلومات مهمة"),
      el("ul", { class: "info-list" }, importantInfo.map((t) => el("li", {}, t))),
    ]));
  }

  // reaction
  const count = reactionCount(item.id);
  const reacted = hasReacted(item.id);
  const reactBtn = el("button", { class: "react-btn" + (reacted ? " active" : ""), onclick: () => { toggleReaction(item.id); openActivitySheet(id, day); } }, [
    el("span", { class: "flame" }, "🔥"),
    el("span", {}, reacted ? "أنا متحمس" : "متحمس؟"),
  ]);
  body.appendChild(el("div", { class: "react-row" }, [reactBtn, el("span", { class: "react-count" }, count ? `${ar(count)} من أفراد الرحلة متحمسون لهذه الفعالية` : "كن أول المتحمسين")]));

  // rating — only after activity ends
  if (status === "done") {
    const mine = myRating(item.id);
    const avg = activityRatingAverage(item.id);
    const starsWrap = el("div", { class: "rate-stars" });
    for (let s = 1; s <= 5; s++) {
      const starEl = el("span", { class: "s" + (mine && s <= mine.stars ? " on" : ""), onclick: () => { rateActivity(item.id, s, mine?.comment || ""); openActivitySheet(id, day); } }, "★");
      starsWrap.appendChild(starEl);
    }
    body.appendChild(el("div", {}, [
      el("div", { class: "tag-title" }, "كيف كانت التجربة؟"),
      starsWrap,
      avg ? el("div", { style: "font-size:12.5px;color:var(--pewter);margin-top:6px" }, `تقييم العائلة ⭐ ${ar(avg.avg)} (${ar(avg.count)} تقييم)`) : null,
    ]));
  }

  // change request
  const editBtn = el("button", { class: "btn btn-ghost btn-block", onclick: () => openChangeRequestForm(item) }, "✏️ اقتراح تعديل");
  body.appendChild(editBtn);

  sheetEl.appendChild(body);
  requestAnimationFrame(() => {
    overlayEl.classList.add("open");
    sheetEl.classList.add("open");
  });
}

function openChangeRequestForm(item) {
  const types = ["تغيير الموعد", "تغيير المطعم", "إلغاء", "إضافة ملاحظة"];
  let selected = types[0];
  const form = el("div", { class: "form-stack", style: "padding:16px 0" });
  const chips = el("div", { class: "choice-row" }, types.map((t) => {
    const chip = el("button", { class: "choice-chip" + (t === selected ? " selected" : ""), onclick: (e) => {
      selected = t;
      [...chips.children].forEach((c) => c.classList.remove("selected"));
      e.target.classList.add("selected");
    }}, t);
    return chip;
  }));
  const note = el("textarea", { placeholder: "تفاصيل الاقتراح..." });
  const sendBtn = el("button", { class: "btn btn-primary btn-block", onclick: () => {
    addChangeRequest({ activityId: item.id, activityTitle: item.title, type: selected, note: note.value });
    form.innerHTML = "";
    form.appendChild(el("p", { style: "text-align:center;color:var(--live);font-weight:700" }, "تم إرسال الطلب للمشرف ✓"));
  }}, "إرسال للمشرف");

  form.appendChild(el("div", { class: "tag-title" }, `اقتراح تعديل — ${item.title}`));
  form.appendChild(chips);
  form.appendChild(el("div", { class: "field" }, [el("label", {}, "تفاصيل"), note]));
  form.appendChild(sendBtn);

  sheetEl.querySelector(".sheet-body").appendChild(form);
  form.scrollIntoView({ behavior: "smooth", block: "start" });
}
