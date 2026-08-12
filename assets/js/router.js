const routes = {};

export function registerRoute(pattern, handler) {
  routes[pattern] = handler;
}

export function navigate(hash) {
  location.hash = hash;
}

function match(path) {
  const parts = path.split("/").filter(Boolean); // e.g. ["day","2"]
  for (const pattern in routes) {
    const pParts = pattern.split("/").filter(Boolean);
    if (pParts.length !== parts.length) continue;
    const params = {};
    let ok = true;
    for (let i = 0; i < pParts.length; i++) {
      if (pParts[i].startsWith(":")) params[pParts[i].slice(1)] = parts[i];
      else if (pParts[i] !== parts[i]) { ok = false; break; }
    }
    if (ok) return { handler: routes[pattern], params };
  }
  return null;
}

export function startRouter(onRoute) {
  const dispatch = () => {
    const path = (location.hash || "#/").slice(1);
    const m = match(path) || match("/");
    onRoute(path);
    if (m) m.handler(m.params);
    window.scrollTo({ top: 0 });
  };
  window.addEventListener("hashchange", dispatch);
  dispatch();
}
