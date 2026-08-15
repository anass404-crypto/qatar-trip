import { el, fmtRange } from "../util.js?v=25";
import { getCover, buildDayBlocks, getBlockStatus, withOverrides } from "../schedule.js?v=25";
import { openActivitySheet } from "./activitySheet.js?v=25";

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

function splitCard(day, path, sub) {
  const cover = getCover(sub);
  const inner = cover.type === "image"
    ? el("img", { src: cover.url, alt: "" })
    : el("div", { class: "ph", style: `background:${cover.grad}` }, cover.icon);
  return el("div", { class: "split-card", onclick: () => openActivitySheet(sub.id, day) }, [
    inner, el("div", { class: "scrim" }),
    el("div", { class: "split-badge" }, [el("span", {}, path.icon), path.label]),
    el("div", { class: "split-card-info" }, [
      el("div", { class: "name" }, sub.title),
      el("div", { class: "when" }, fmtRange(sub.time, sub.timeEnd)),
    ]),
  ]);
}

function splitRow(day, block, status) {
  const item = block;
  return el("div", { class: `tl-item ${status}` }, [
    el("div", { class: "tl-rail" }, el("div", { class: "tl-dot" })),
    el("div", { class: "tl-content", style: "flex:1" }, [
      el("div", { class: "tl-time" }, item.time ? fmtRange(item.time) : ""),
      el("div", { class: "split-block" }, [
        el("div", { class: "split-heading" }, "🔀 " + item.title),
        el("div", { class: "split-grid" }, item.paths.flatMap((p) => p.items.map((sub) => splitCard(day, p, sub)))),
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
