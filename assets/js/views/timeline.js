import { el, fmtRange } from "../util.js?v=3";
import { getCover, buildDayBlocks, getBlockStatus, withOverrides } from "../schedule.js?v=3";
import { openActivitySheet } from "./activitySheet.js?v=3";

function miniCover(item) {
  const cover = getCover(item);
  if (cover.type === "image") return el("div", { class: "cv" }, el("img", { src: cover.url, alt: "" }));
  return el("div", { class: "cv ph", style: `background:${cover.grad}` }, cover.icon);
}

function activityRow(day, item, status) {
  const merged = withOverrides(item);
  const row = el("div", { class: `tl-item ${status}` }, [
    el("div", { class: "tl-rail" }, el("div", { class: "tl-dot" })),
    el("div", { class: "tl-content" }, [
      el("div", { class: "tl-time" }, fmtRange(merged.time, merged.timeEnd)),
      el("div", { class: "tl-card", onclick: () => openActivitySheet(item.id, day) }, [
        miniCover(merged),
        el("div", { style: "flex:1;min-width:0" }, [
          el("div", { class: "tl-title" }, merged.title),
          merged.desc ? el("div", { class: "tl-desc" }, merged.desc) : null,
        ]),
        status === "live" ? el("span", { class: "tl-badge live" }, "الآن") : status === "cancelled" ? el("span", { class: "tl-badge cancelled" }, "ملغاة") : null,
      ]),
    ]),
  ]);
  return row;
}

function splitRow(day, block, status) {
  const item = block;
  return el("div", { class: `tl-item ${status}` }, [
    el("div", { class: "tl-rail" }, el("div", { class: "tl-dot" })),
    el("div", { class: "tl-content", style: "flex:1" }, [
      el("div", { class: "tl-time" }, item.time ? fmtRange(item.time) : ""),
      el("div", { class: "tl-split" }, [
        el("div", { class: "tl-split-label" }, "🔀 " + item.title),
        el("div", { class: "tl-split-cols" }, item.paths.map((p) =>
          el("div", { class: "tl-path" }, [
            el("div", { class: "tl-path-head" }, [p.icon, " ", p.label]),
            ...p.items.map((sub) => el("div", { class: "tl-path-item", onclick: () => openActivitySheet(sub.id, day) }, [
              el("span", { class: "t" }, fmtRange(sub.time, sub.timeEnd)), " — ", sub.title,
            ])),
          ])
        )),
      ]),
    ]),
  ]);
}

// يرسم Timeline ليوم كامل، أو من نقطة زمنية معينة فصاعدًا (fromIndex)
export function renderTimeline(day, { fromIndex = 0 } = {}) {
  const blocks = buildDayBlocks(day);
  const wrap = el("div", { class: "timeline" });
  blocks.slice(fromIndex).forEach((bt) => {
    const status = getBlockStatus(bt);
    if (bt.block.type === "split") wrap.appendChild(splitRow(day, bt.block, status));
    else wrap.appendChild(activityRow(day, bt.block, status));
  });
  return wrap;
}

export { buildDayBlocks, getBlockStatus };
