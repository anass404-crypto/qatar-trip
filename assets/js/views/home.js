import { DAYS, TRIP, REAL_PHOTOS } from "../data.js?v=7";
import { el, ar, formatCountdown } from "../util.js?v=7";
import {
  tripPhase, currentDayIndex, getCurrentAndNext, buildDayBlocks, getBlockStatus,
  highlightActivities, tomorrowTeaser, getCover,
} from "../schedule.js?v=7";
import { renderTimeline } from "./timeline.js?v=7";
import { openActivitySheet } from "./activitySheet.js?v=7";
import { isTeaserDismissed, dismissTeaser } from "../store.js?v=7";

function heroSection(now) {
  const phase = tripPhase(now);
  const dayIdx = currentDayIndex(now);
  const img = el("img", { class: "hero-img", src: REAL_PHOTOS.msheireb, alt: "", loading: "eager" });
  const body = el("div", { class: "hero-body" }, [
    el("div", { class: "hero-flag" }, "رحلة قطر 🇶🇦"),
    el("h1", { class: "hero-title" }, "رحلة قطر العائلية"),
    el("div", { class: "hero-dates" }, "١٦ – ١٩ أغسطس ٢٠٢٦ · الدمام → الدوحة"),
  ]);

  if (phase === "before") {
    const cd = formatCountdown(new Date(TRIP.start) - now);
    body.appendChild(el("div", { class: "countdown-card" }, [
      el("div", { class: "countdown-label" }, "باقي على الرحلة"),
      el("div", { class: "countdown-value pulse" }, cd ? cd.primary : "—"),
    ]));
  } else if (phase === "during") {
    body.appendChild(el("span", { class: "day-pill" }, `اليوم ${ar((dayIdx ?? 0) + 1)} من ${ar(DAYS.length)}`));
    body.appendChild(el("div", { class: "countdown-card" }, [
      el("div", { class: "countdown-label" }, "الرحلة جارية الآن"),
      el("div", { class: "countdown-value" }, `نحن في اليوم ${ar((dayIdx ?? 0) + 1)} من الرحلة 🎉`),
    ]));
  } else {
    body.appendChild(el("div", { class: "countdown-card" }, [
      el("div", { class: "countdown-label" }, "الحمد لله على السلامة"),
      el("div", { class: "countdown-value" }, "انتهت الرحلة 🧡"),
    ]));
  }

  return el("section", { class: "hero" }, [img, el("div", { class: "hero-scrim" }), body]);
}

function coverEl(item, cls) {
  const cover = getCover(item);
  if (cover.type === "image") return el("div", { class: cls }, el("img", { src: cover.url, alt: "" }));
  return el("div", { class: cls + " ph", style: `background:${cover.grad}` }, cover.icon);
}

function nextActivityCard(now) {
  const { current, next } = getCurrentAndNext(now);
  const target = current || next;
  if (!target) return null;
  const eyebrow = current ? "نحن هنا الآن" : "المحطة القادمة";
  const msLeft = !current && next ? next.start - now : null;
  const cd = msLeft ? formatCountdown(msLeft) : null;

  const card = el("div", { class: "next-card" }, [
    el("div", { class: "next-card-top" }, el("span", { class: "next-card-eyebrow" }, eyebrow)),
    el("div", { class: "next-card-body" }, [
      coverEl(target.block, "next-card-cover"),
      el("div", { class: "next-card-info" }, [
        el("div", { class: "next-card-title" }, target.block.title || (target.block.type === "split" ? "انقسام المسارات" : "")),
        el("div", { class: "next-card-time" }, `${target.day.label} · ${target.block.time ? target.block.time.replace(":", ":") : ""}`),
        cd ? el("div", { class: "next-card-eta" }, "بعد " + cd.primary) : null,
      ]),
    ]),
  ]);
  if (target.block.type !== "split") {
    card.appendChild(el("div", { class: "next-card-actions" }, [
      target.block.mapsUrl ? el("a", { class: "btn btn-ghost btn-sm", href: target.block.mapsUrl, target: "_blank", rel: "noopener" }, "📍 الموقع") : null,
      el("button", { class: "btn btn-primary btn-sm", onclick: () => openActivitySheet(target.block.id, target.day) }, "ℹ️ التفاصيل"),
    ]));
  }
  return card;
}

function teaserCard(now) {
  const t = tomorrowTeaser(now);
  if (!t || !t.items.length) return null;
  const dateKey = t.day.date;
  if (isTeaserDismissed(dateKey)) return null;
  return el("div", { class: "container", style: "margin-top:16px" }, el("div", { class: "plain-card" }, [
    el("div", { style: "display:flex;justify-content:space-between;align-items:center;margin-bottom:10px" }, [
      el("span", { style: "font-size:14px;font-weight:700" }, `🌙 بكرة وش عندنا؟ — ${t.day.label}`),
      el("button", { style: "font-size:12px;color:var(--pewter)", onclick: (e) => { dismissTeaser(dateKey); e.target.closest(".container").remove(); } }, "إخفاء"),
    ]),
    el("div", { style: "display:flex;gap:8px" }, t.items.map((it) => coverEl(it, "next-card-cover"))),
    el("div", { style: "display:flex;gap:8px;margin-top:8px" }, t.items.map((it) => el("span", { style: "font-size:11.5px;color:var(--pewter);flex:1;text-align:center" }, it.title))),
  ]));
}

function dayTabs(now) {
  const idx = currentDayIndex(now);
  const wrap = el("div", { class: "day-tabs" });
  DAYS.forEach((d, i) => {
    const tab = el("a", { href: `#/day/${i}`, class: "day-tab" + (i === idx ? " today" : "") }, [
      el("div", { class: "d-name" }, d.label),
      el("div", { class: "d-date" }, d.dateLabel),
      el("div", { class: "d-tag" }, d.tagline),
    ]);
    wrap.appendChild(tab);
  });
  return wrap;
}

function highlightsSection() {
  const items = highlightActivities();
  if (!items.length) return null;
  const scroller = el("div", { class: "hl-scroller" }, items.map(({ item, day }) => {
    const cover = getCover(item);
    const inner = cover.type === "image"
      ? el("img", { src: cover.url, alt: "" })
      : el("div", { class: "ph", style: `background:${cover.grad}` }, cover.icon);
    return el("div", { class: "hl-card", onclick: () => openActivitySheet(item.id, day) }, [
      inner, el("div", { class: "scrim" }),
      el("div", { class: "info" }, [
        el("div", { class: "name" }, item.title),
        el("div", { class: "when" }, `${day.label} · ${item.time}`),
      ]),
    ]);
  }));
  return el("section", { class: "section" }, [
    el("div", { class: "section-head" }, el("h2", { class: "section-title" }, "🔥 أكثر اللحظات المنتظرة")),
    scroller,
  ]);
}

export function renderHome(root) {
  const now = new Date();
  const phase = tripPhase(now);
  const container = el("div", { class: "view-enter" });

  container.appendChild(heroSection(now));

  const nc = nextActivityCard(now);
  if (nc && phase === "during") container.appendChild(nc);

  if (phase === "during") {
    const tz = teaserCard(now);
    if (tz) container.appendChild(tz);

    const idx = currentDayIndex(now);
    if (idx != null) {
      const day = DAYS[idx];
      const blocks = buildDayBlocks(day);
      let fromIndex = blocks.findIndex((b) => getBlockStatus(b) !== "done");
      if (fromIndex === -1) fromIndex = blocks.length - 1;
      container.appendChild(el("section", { class: "section" }, [
        el("div", { class: "section-head" }, [el("h2", { class: "section-title" }, `باقي اليوم — ${day.label}`), el("a", { class: "link-more", href: `#/day/${idx}` }, "اليوم كامل")]),
      ]));
      container.appendChild(renderTimeline(day, { fromIndex }));
    }
  } else {
    const hl = highlightsSection();
    if (hl) container.appendChild(hl);
  }

  container.appendChild(el("section", { class: "section" }, [
    el("div", { class: "section-head" }, [el("h2", { class: "section-title" }, "أيام الرحلة"), null]),
  ]));
  container.appendChild(dayTabs(now));

  container.appendChild(el("section", { class: "section", style: "padding-bottom:24px" }, [
    el("a", { href: "#/bookings", class: "plain-card", style: "display:flex;justify-content:space-between;align-items:center" }, [
      el("span", { style: "font-weight:700;font-size:14px" }, "🎟 مركز الحجوزات"),
      el("span", { style: "color:var(--pewter);font-size:12.5px" }, "التفاصيل ←"),
    ]),
  ]));

  root.innerHTML = "";
  root.appendChild(container);
}
