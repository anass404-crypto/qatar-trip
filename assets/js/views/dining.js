import { DINING, CATEGORY_STYLE, REAL_PHOTOS } from "../data.js?v=29";
import { el, ar } from "../util.js?v=29";

const TYPE_LABEL = { restaurant: "مطعم", cafe: "مقهى", dessert: "حلا وآيس كريم" };
const TYPE_ICON = { restaurant: "🍽️", cafe: "☕", dessert: "🍨" };

let overlayEl, sheetEl;
function ensureSheetHost() {
  if (overlayEl) return;
  overlayEl = el("div", { class: "sheet-overlay", onclick: closeSheet });
  sheetEl = el("div", { class: "sheet" });
  document.body.appendChild(overlayEl);
  document.body.appendChild(sheetEl);
}
function closeSheet() {
  if (!overlayEl) return;
  overlayEl.classList.remove("open");
  sheetEl.classList.remove("open");
}

function thumbNode(entry) {
  if (entry.cover && REAL_PHOTOS[entry.cover]) {
    return el("div", { class: "dine-thumb" }, el("img", { src: REAL_PHOTOS[entry.cover], alt: "" }));
  }
  const style = CATEGORY_STYLE.food;
  return el("div", { class: "dine-thumb ph", style: `background:${style.grad}` }, TYPE_ICON[entry.type] || "🍽️");
}

function openDiningSheet(entry) {
  ensureSheetHost();
  sheetEl.innerHTML = "";
  sheetEl.appendChild(el("button", { class: "sheet-close", "aria-label": "إغلاق", onclick: closeSheet }, "✕"));
  const scroll = el("div", { class: "sheet-scroll" });
  sheetEl.appendChild(scroll);
  scroll.appendChild(el("div", { class: "sheet-grabber" }));

  if (entry.cover && REAL_PHOTOS[entry.cover]) {
    scroll.appendChild(el("div", { class: "sheet-hero" }, [
      el("img", { class: "bg", src: REAL_PHOTOS[entry.cover], alt: "" }),
      el("img", { class: "fg", src: REAL_PHOTOS[entry.cover], alt: "" }),
    ]));
  } else {
    scroll.appendChild(el("div", { class: "sheet-hero ph", style: `background:${CATEGORY_STYLE.food.grad}` }, TYPE_ICON[entry.type] || "🍽️"));
  }

  const body = el("div", { class: "sheet-body" });

  const badges = [];
  if (entry.scheduleStatus === "current") badges.push(el("span", { class: "dine-badge current" }, "📅 في جدولنا — " + (entry.scheduleNote || "")));
  if (entry.scheduleStatus === "removed") badges.push(el("span", { class: "dine-badge removed" }, "✖️ استُبدل في الجدول"));

  body.appendChild(el("div", {}, [
    el("div", { style: "margin-bottom:8px" }, [el("span", { class: "pill" }, TYPE_LABEL[entry.type] || "مطعم"), ...badges]),
    el("h2", { class: "sheet-title" }, entry.name),
    el("div", { style: "font-size:13px;color:var(--pewter);margin-top:4px" }, entry.area),
  ]));

  const metaItems = [];
  if (entry.cuisine) metaItems.push(["نوع الأكل", entry.cuisine]);
  if (entry.rating) metaItems.push(["التقييم", "⭐ " + ar(entry.rating)]);
  if (entry.hours) metaItems.push(["أوقات الدوام", entry.hours]);
  if (entry.phone) metaItems.push(["الهاتف", entry.phone]);
  if (metaItems.length) {
    body.appendChild(el("div", { class: "sheet-meta-grid" }, metaItems.map(([k, v]) =>
      el("div", { class: "meta-box" }, [el("div", { class: "k" }, k), el("div", { class: "v" }, v)])
    )));
  }

  if (entry.desc) body.appendChild(el("p", { style: "font-size:14px;color:var(--graphite);line-height:1.7" }, entry.desc));

  if (entry.mapsUrl) {
    body.appendChild(el("a", { class: "btn btn-primary btn-block", href: entry.mapsUrl, target: "_blank", rel: "noopener" }, "📍 افتح الموقع في خرائط قوقل"));
  }
  if (entry.website || entry.instagram) {
    body.appendChild(el("div", { class: "choice-row" }, [
      entry.website ? el("a", { class: "btn btn-ghost btn-sm", href: entry.website, target: "_blank", rel: "noopener" }, "🌐 الموقع الإلكتروني") : null,
      entry.instagram ? el("a", { class: "btn btn-ghost btn-sm", href: entry.instagram, target: "_blank", rel: "noopener" }, "📷 إنستقرام") : null,
    ]));
  }

  scroll.appendChild(body);
  requestAnimationFrame(() => {
    overlayEl.classList.add("open");
    sheetEl.classList.add("open");
  });
}

export function renderDining(root) {
  const container = el("div", { class: "view-enter" });
  container.appendChild(el("section", { class: "section" }, [
    el("h1", { style: "font-size:22px" }, "مطاعم ومقاهي"),
    el("p", { style: "font-size:13px;color:var(--pewter);margin-top:6px;line-height:1.6" },
      "دليل مطاعم ومقاهي حول أماكن الرحلة — تشمل مطاعم الجدول، خيارات بديلة، وأماكن حلا وقهوة وآيس كريم. مفيد إذا حبيتوا تغيّرون أو تضيفون شي بين الفعاليات."),
  ]));

  let activeFilter = "all";
  const listHost = el("div");

  function renderList() {
    listHost.innerHTML = "";
    const filtered = activeFilter === "all" ? DINING : DINING.filter((d) => d.type === activeFilter);
    const areas = [...new Set(filtered.map((d) => d.area))];
    if (!areas.length) {
      listHost.appendChild(el("div", { class: "empty-state" }, "لا توجد نتائج"));
      return;
    }
    areas.forEach((area) => {
      const items = filtered.filter((d) => d.area === area);
      listHost.appendChild(el("div", { class: "tag-title", style: "margin:18px 16px 8px" }, "📍 " + area));
      listHost.appendChild(el("div", { class: "plain-card", style: "padding:0" }, items.map((entry) => {
        const badges = [];
        if (entry.scheduleStatus === "current") badges.push(el("span", { class: "dine-badge current" }, "في جدولنا"));
        if (entry.scheduleStatus === "removed") badges.push(el("span", { class: "dine-badge removed" }, "استُبدل"));
        return el("div", { class: "dine-row", onclick: () => openDiningSheet(entry) }, [
          thumbNode(entry),
          el("div", { style: "flex:1;min-width:0" }, [
            el("div", { class: "dine-name" }, [entry.name, ...badges]),
            el("div", { class: "dine-meta" }, [entry.cuisine || TYPE_LABEL[entry.type], entry.rating ? ` · ⭐ ${ar(entry.rating)}` : ""].join("")),
          ]),
          el("span", { style: "color:var(--fog)" }, "←"),
        ]);
      })));
    });
  }

  const filters = [
    ["all", "الكل"], ["restaurant", "مطاعم"], ["cafe", "مقاهي"], ["dessert", "حلا وآيس كريم"],
  ];
  const chipsRow = el("div", { class: "choice-row", style: "padding:0 16px" }, filters.map(([key, label]) => {
    const chip = el("button", { class: "choice-chip" + (key === activeFilter ? " selected" : ""), onclick: (e) => {
      activeFilter = key;
      [...chipsRow.children].forEach((c) => c.classList.remove("selected"));
      e.target.classList.add("selected");
      renderList();
    }}, label);
    return chip;
  }));

  container.appendChild(el("section", { class: "section", style: "padding-top:0;padding-bottom:0" }, chipsRow));
  container.appendChild(el("section", { class: "section", style: "padding-top:8px;padding-bottom:32px" }, listHost));

  renderList();

  root.innerHTML = "";
  root.appendChild(container);
}
