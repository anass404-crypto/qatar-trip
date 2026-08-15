import { el } from "../util.js?v=24";
import { addSuggestion } from "../store.js?v=24";

const TYPES = ["فعالية جديدة", "مطعم", "تعديل موعد", "استبدال فعالية", "ملاحظة عامة"];

export function renderSuggest(root) {
  const container = el("div", { class: "view-enter" });
  container.appendChild(el("section", { class: "section" }, el("h1", { style: "font-size:22px" }, "عندك اقتراح؟")));

  let selected = TYPES[0];
  const form = el("div", { class: "form-stack section" });

  const chips = el("div", { class: "choice-row" }, TYPES.map((t, i) =>
    el("button", { class: "choice-chip" + (i === 0 ? " selected" : ""), onclick: (e) => {
      selected = t;
      [...chips.children].forEach((c) => c.classList.remove("selected"));
      e.target.classList.add("selected");
    }}, t)
  ));

  const titleInput = el("input", { type: "text", placeholder: "مثال: زيارة سوق واقف" });
  const detailsInput = el("textarea", { placeholder: "تفاصيل الاقتراح..." });
  const linkInput = el("input", { type: "url", placeholder: "https:// (اختياري)" });

  const submit = el("button", { class: "btn btn-primary btn-block", onclick: () => {
    if (!titleInput.value.trim()) { titleInput.focus(); return; }
    addSuggestion({ type: selected, title: titleInput.value.trim(), details: detailsInput.value.trim(), link: linkInput.value.trim() });
    form.innerHTML = "";
    form.appendChild(el("div", { class: "empty-state" }, [
      el("div", { class: "ic" }, "✅"),
      el("div", { style: "font-weight:700;color:var(--carbon)" }, "تم إرسال اقتراحك"),
      el("div", {}, "الحالة: قيد المراجعة"),
    ]));
  }}, "إرسال للمشرف");

  form.appendChild(el("div", { class: "field" }, [el("label", {}, "نوع الاقتراح"), chips]));
  form.appendChild(el("div", { class: "field" }, [el("label", {}, "العنوان"), titleInput]));
  form.appendChild(el("div", { class: "field" }, [el("label", {}, "التفاصيل"), detailsInput]));
  form.appendChild(el("div", { class: "field" }, [el("label", {}, "رابط اختياري"), linkInput]));
  form.appendChild(submit);

  container.appendChild(form);
  root.innerHTML = "";
  root.appendChild(container);
}
