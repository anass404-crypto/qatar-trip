import { POLLS, DECISION_NOTES } from "../data.js";
import { el, ar } from "../util.js";
import { pollResults, myVote, vote, resolvePoll } from "../store.js";
import { isAdmin } from "../store.js";

export function renderPollCard(poll, { onChange } = {}) {
  const results = pollResults(poll.id, poll.options);
  const mine = myVote(poll.id);
  const totalVotes = results.reduce((s, r) => s + r.count, 0);
  const admin = isAdmin();

  const card = el("div", { class: "poll-card" }, [
    el("div", { class: "poll-q" }, poll.question),
    ...results.map((o) => {
      const isResolved = poll.resolved && poll._resolvedOption === o.id;
      return el("div", {
        class: "poll-opt" + (mine === o.id ? " selected" : "") + (isResolved ? " resolved" : ""),
        onclick: () => { vote(poll.id, o.id); onChange && onChange(); },
      }, [
        el("div", { class: "poll-opt-fill", style: `width:${o.pct}%` }),
        el("div", { class: "poll-opt-row" }, [el("span", {}, `${o.icon} ${o.label}`), el("span", {}, totalVotes ? `${ar(o.pct)}%` : "")]),
      ]);
    }),
    el("div", { class: "poll-note" }, `${ar(totalVotes)} صوت حتى الآن${mine ? " — صوّتت" : ""}`),
    admin && !poll.resolved ? el("div", { class: "choice-row", style: "margin-top:10px" }, poll.options.map((o) =>
      el("button", { class: "btn btn-ghost btn-sm", onclick: () => { resolvePoll(poll.id, o.id); onChange && onChange(); } }, "اعتماد: " + o.label)
    )) : null,
  ]);
  return card;
}

export function renderPolls(root) {
  const container = el("div", { class: "view-enter" });
  container.appendChild(el("section", { class: "section" }, el("h1", { style: "font-size:22px" }, "نحتاج قراركم 👀")));
  const list = el("div", { class: "card-list" });
  POLLS.forEach((p) => list.appendChild(renderPollCard(p, { onChange: () => renderPolls(root) })));
  if (DECISION_NOTES.length) {
    list.appendChild(el("div", { class: "tag-title" }, "ملاحظات إضافية"));
    DECISION_NOTES.forEach((d) => list.appendChild(el("div", { class: "plain-card" }, [
      el("div", { style: "font-weight:700;font-size:14px" }, d.title),
      el("div", { style: "font-size:12.5px;color:var(--pewter);margin-top:2px" }, d.note),
    ])));
  }
  container.appendChild(list);
  root.innerHTML = "";
  root.appendChild(container);
}
