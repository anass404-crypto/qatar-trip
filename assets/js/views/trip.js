import { TRIP } from "../data.js?v=2";
import { el, ar } from "../util.js?v=2";

export function renderTrip(root) {
  const container = el("div", { class: "view-enter" });
  container.appendChild(el("section", { class: "section" }, el("h1", { style: "font-size:22px" }, "الرحلة")));

  container.appendChild(el("section", { class: "section", style: "padding-top:0" }, [
    el("div", { class: "sheet-meta-grid" }, [
      el("div", { class: "meta-box" }, [el("div", { class: "k" }, "التواريخ"), el("div", { class: "v" }, "١٦–١٩ أغسطس")]),
      el("div", { class: "meta-box" }, [el("div", { class: "k" }, "المسار"), el("div", { class: "v" }, TRIP.route)]),
      el("div", { class: "meta-box" }, [el("div", { class: "k" }, "المدة"), el("div", { class: "v" }, `${ar(TRIP.days)} أيام`)]),
      el("div", { class: "meta-box" }, [el("div", { class: "k" }, "الليالي"), el("div", { class: "v" }, `${ar(TRIP.nights)} ليالٍ`)]),
    ]),
  ]));

  container.appendChild(el("section", { class: "section" }, [
    el("div", { class: "tag-title" }, "الفندق"),
    el("div", { class: "plain-card" }, [
      el("div", { style: "font-weight:700;font-size:15px;margin-bottom:8px" }, TRIP.hotel.name),
      el("div", { class: "sheet-meta-grid" }, [
        el("div", { class: "meta-box" }, [el("div", { class: "k" }, "Check-in"), el("div", { class: "v" }, TRIP.hotel.checkin)]),
        el("div", { class: "meta-box" }, [el("div", { class: "k" }, "Check-out"), el("div", { class: "v" }, TRIP.hotel.checkout)]),
      ]),
      el("a", { class: "btn btn-primary btn-block", style: "margin-top:10px", href: TRIP.hotel.mapsUrl, target: "_blank", rel: "noopener" }, "📍 موقع الفندق"),
    ]),
  ]));

  container.appendChild(el("section", { class: "section", style: "padding-bottom:32px" }, [
    el("div", { class: "tag-title" }, "معلومات مهمة"),
    el("ul", { class: "info-list plain-card" }, [
      el("li", {}, "منفذ أبو سمرة: مفتوح 24 ساعة، المدة المتوقعة 30–60 دقيقة."),
      el("li", {}, "يوم الأحد يحتاج سيارتين عند انقسام المسارات، أو سائقًا يعود إلى كتارا الساعة 7:20."),
      el("li", {}, "تذاكر قبة الثريا (Polaris) تفتح قبل العرض بيوم واحد فقط."),
      el("li", {}, "التسجيل في عرض Polaris قبل العرض بنصف ساعة شرط."),
    ]),
  ]));

  root.innerHTML = "";
  root.appendChild(container);
}
