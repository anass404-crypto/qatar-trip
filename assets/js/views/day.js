import { DAYS } from "../data.js?v=7";
import { el } from "../util.js?v=7";
import { renderTimeline } from "./timeline.js?v=7";

export function renderDay(root, idx) {
  const i = Math.max(0, Math.min(DAYS.length - 1, Number(idx) || 0));
  const day = DAYS[i];
  const container = el("div", { class: "view-enter" });

  const tabs = el("div", { class: "day-tabs", style: "padding-top:14px" }, DAYS.map((d, di) =>
    el("a", { href: `#/day/${di}`, class: "day-tab" + (di === i ? " active" : "") }, [
      el("div", { class: "d-name" }, d.label),
      el("div", { class: "d-date" }, d.dateLabel),
    ])
  ));
  container.appendChild(tabs);

  container.appendChild(el("section", { class: "section", style: "padding-top:6px" }, [
    el("h1", { style: "font-size:22px" }, day.tagline),
  ]));

  let touchX = null;
  const tlWrap = el("div", {
    ontouchstart: (e) => (touchX = e.touches[0].clientX),
    ontouchend: (e) => {
      if (touchX == null) return;
      const dx = e.changedTouches[0].clientX - touchX;
      if (Math.abs(dx) > 60) {
        const next = dx < 0 ? i - 1 : i + 1; // RTL: swipe left = next day
        if (next >= 0 && next < DAYS.length) location.hash = `#/day/${next}`;
      }
      touchX = null;
    },
  }, renderTimeline(day));
  container.appendChild(tlWrap);

  if (day.note) {
    container.appendChild(el("div", { class: "divider-note" }, "📝 " + day.note));
  }

  root.innerHTML = "";
  root.appendChild(container);
}
