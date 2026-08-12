// أدوات عامة: تحويل أرقام، تنسيق وقت، روابط خرائط.

const AR_DIGITS = "٠١٢٣٤٥٦٧٨٩";
export function ar(n) {
  return String(n).replace(/\d/g, (d) => AR_DIGITS[d]);
}

// "HH:MM" (24h) -> Date على توقيت الدوحة (+03:00) لتاريخ يوم معيّن "YYYY-MM-DD"
export function timeToDate(dateStr, hhmm) {
  if (!hhmm) return null;
  const [h, m] = hhmm.split(":").map(Number);
  return new Date(`${dateStr}T${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:00+03:00`);
}

export function fmtClock(hhmm) {
  if (!hhmm) return "";
  let [h, m] = hhmm.split(":").map(Number);
  const suffix = h < 12 ? "ص" : "م";
  let h12 = h % 12;
  if (h12 === 0) h12 = 12;
  return `${ar(h12)}:${ar(String(m).padStart(2, "0"))} ${suffix}`;
}

export function fmtRange(hhmm, hhmmEnd) {
  if (!hhmmEnd) return fmtClock(hhmm);
  return `${fmtClock(hhmm)} – ${fmtClock(hhmmEnd)}`;
}

// عدّاد تنازلي بصيغة عربية: يوم/ساعة/دقيقة، أو ساعة/دقيقة/ثانية إذا اقترب الموعد
export function formatCountdown(msLeft) {
  if (msLeft <= 0) return null;
  const totalSec = Math.floor(msLeft / 1000);
  const d = Math.floor(totalSec / 86400);
  const h = Math.floor((totalSec % 86400) / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  if (d > 0) return { primary: `${ar(d)} يوم : ${ar(h)} ساعة : ${ar(m)} دقيقة`, d, h, m, s };
  if (h > 0) return { primary: `${ar(h)} ساعة : ${ar(m)} دقيقة`, d, h, m, s };
  return { primary: `${ar(m)} دقيقة : ${ar(s)} ثانية`, d, h, m, s };
}

export function mapsButtonProps(url) {
  if (!url) return null;
  return { href: url, target: "_blank", rel: "noopener" };
}

export function debounce(fn, wait = 150) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), wait);
  };
}

export function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v == null || v === false) continue;
    if (k === "class") node.className = v;
    else if (k === "html") node.innerHTML = v;
    else if (k.startsWith("on") && typeof v === "function") node.addEventListener(k.slice(2), v);
    else node.setAttribute(k, v);
  }
  for (const c of [].concat(children)) {
    if (c == null) continue;
    node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
  }
  return node;
}
