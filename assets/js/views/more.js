import { el } from "../util.js?v=2";
import { getParticipant, clearParticipant, isAdmin, adminLogout, resetAllData } from "../store.js?v=2";

function menuRow(href, icon, label) {
  return el("a", { href, class: "plain-card", style: "display:flex;align-items:center;gap:12px" }, [
    el("span", { style: "font-size:20px" }, icon),
    el("span", { style: "font-weight:600;font-size:14.5px;flex:1" }, label),
    el("span", { style: "color:var(--fog)" }, "←"),
  ]);
}

export function renderMore(root) {
  const container = el("div", { class: "view-enter" });
  container.appendChild(el("section", { class: "section" }, el("h1", { style: "font-size:22px" }, "المزيد")));

  const p = getParticipant();
  container.appendChild(el("section", { class: "section", style: "padding-top:0" }, [
    el("div", { class: "plain-card", style: "display:flex;align-items:center;justify-content:space-between" }, [
      el("div", {}, [
        el("div", { style: "font-size:12px;color:var(--pewter)" }, "مسجّل باسم"),
        el("div", { style: "font-weight:700;font-size:15px" }, p?.name || "زائر"),
      ]),
      el("button", { class: "btn btn-ghost btn-sm", onclick: () => { clearParticipant(); location.reload(); } }, "تبديل الاسم"),
    ]),
  ]));

  container.appendChild(el("section", { class: "card-list section", style: "padding-top:0" }, [
    menuRow("#/trip", "🧭", "الرحلة"),
    menuRow("#/polls", "👀", "القرارات المعلقة"),
    menuRow("#/suggest", "💡", "عندك اقتراح؟"),
    isAdmin()
      ? el("button", { class: "plain-card", style: "display:flex;align-items:center;gap:12px;width:100%", onclick: () => { adminLogout(); location.hash = "#/more"; } }, [
          el("span", { style: "font-size:20px" }, "🔓"), el("span", { style: "font-weight:600;font-size:14.5px;flex:1;text-align:start" }, "خروج من وضع المشرف"),
        ])
      : menuRow("#/admin", "🛠️", "لوحة المشرف"),
  ]));

  container.appendChild(el("section", { class: "section", style: "padding-bottom:32px" }, [
    el("button", { class: "btn btn-ghost btn-block", onclick: () => { if (confirm("سيتم مسح كل التفاعلات والتقييمات والاقتراحات المحفوظة على هذا الجهاز فقط. متابعة؟")) resetAllData(); } }, "إعادة ضبط بيانات هذا الجهاز"),
    el("div", { style: "text-align:center;font-size:11.5px;color:var(--fog);margin-top:20px" }, "رحلة قطر العائلية · ١٦–١٩ أغسطس ٢٠٢٦"),
  ]));

  root.innerHTML = "";
  root.appendChild(container);
}
