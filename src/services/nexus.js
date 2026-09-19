// NEXUS — Data services.
// Mock implementations structured so real APIs can replace them later
// without touching the UI. Each function returns data synchronously but is
// shaped like an async service for easy migration.

import {
  COUNTRIES,
  ALL_CITIES,
  GLOBAL_TRENDS,
  SEARCH_INDEX,
  TREND_POOL,
  CATEGORIES,
  INTEL_POOLS,
  CATEGORY_METRICS,
} from "./mockData";

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

export const CountriesService = {
  async list() {
    await delay(40);
    return COUNTRIES.map((c) => ({
      code: c.code,
      name: c.name,
      region: c.region,
      activity: c.activity,
      change: c.change,
      trendingTopic: c.trendingTopic,
      trendingCategory: c.trendingCategory,
      topCity: c.cities[0]?.name,
      lat: c.lat,
      lng: c.lng,
    }));
  },
  async get(code) {
    await delay(40);
    const c = COUNTRIES.find((x) => x.code === code);
    if (!c) return null;
    return {
      ...c,
      searches: pick(TREND_POOL.SEARCH, 5),
      social: pick(TREND_POOL.SOCIAL, 5),
      music: pick(TREND_POOL.MUSIC, 4),
      games: pick(TREND_POOL.GAMING, 4),
      news: pick(TREND_POOL.NEWS, 4),
      markets: pick(TREND_POOL.MARKETS, 3),
      timeline: buildTimeline(c.activity),
    };
  },
  async cities(code) {
    await delay(20);
    const c = COUNTRIES.find((x) => x.code === code);
    return c ? c.cities : [];
  },
};

export const TrendsService = {
  async list(region = "Global") {
    await delay(40);
    if (region === "Global") return GLOBAL_TRENDS;
    return GLOBAL_TRENDS.filter(
      (t) => t.region === region || t.region === "Global"
    );
  },
};

export const SignalsService = {
  // generate a single realistic-looking live signal
  generate(category = null) {
    const city = ALL_CITIES[Math.floor(Math.random() * ALL_CITIES.length)];
    const cat =
      category && category !== "ALL"
        ? category
        : city.category || randItem(CATEGORIES.slice(1)).id;
    const change = Math.floor(Math.random() * 60) + 8;
    return {
      id: Math.random().toString(36).slice(2),
      location: city.name,
      country: city.country,
      countryCode: city.countryCode,
      lat: city.lat,
      lng: city.lng,
      category: cat,
      change,
      level: Math.min(99, Math.floor(city.intensity * 0.6 + change * 0.4)),
      timestamp: Date.now(),
    };
  },
  async recent(category = null, limit = 12) {
    await delay(30);
    const list = [];
    for (let i = 0; i < limit; i++) {
      const s = this.generate(category);
      s.timestamp = Date.now() - i * (Math.floor(Math.random() * 18000) + 4000);
      list.push(s);
    }
    return list;
  },
};

export const SearchService = {
  async query(q) {
    await delay(60);
    if (!q || !q.trim()) return [];
    const query = q.toLowerCase();
    const direct = SEARCH_INDEX.filter(
      (r) =>
        r.label.toLowerCase().includes(query) ||
        r.type.toLowerCase().includes(query) ||
        r.sub.toLowerCase().includes(query)
    );
    // always also surface country matches by partial
    return direct.length
      ? direct
      : SEARCH_INDEX.filter((r) =>
          r.label.toLowerCase().split(" ").some((w) => w.startsWith(query.slice(0, 2)))
        ).slice(0, 6);
  },
};

export const GlobeService = {
  // markers for the globe
  markers(category = "ALL") {
    return ALL_CITIES.map((c) => ({
      id: `${c.countryCode}-${c.name}`,
      lat: c.lat,
      lng: c.lng,
      category: c.category,
      intensity: c.intensity,
      // deterministic pseudo change so each marker reads like a live signal
      change: Math.floor((c.intensity * 7 + c.name.length * 5) % 55) + 8,
      country: c.country,
      countryCode: c.countryCode,
      city: c.name,
    })).filter((m) => category === "ALL" || m.category === category);
  },
  // a set of animated arcs between active cities.
  // deterministic per category so the visualization is stable across renders.
  arcs(category = "ALL") {
    const ARC_CATEGORIES = { ALL: true, MUSIC: true, SOCIAL: true, CRYPTO: true };
    if (!(category in ARC_CATEGORIES)) return [];
    const pool =
      category === "ALL"
        ? ALL_CITIES.filter((c) => c.intensity > 74)
        : ALL_CITIES.filter((c) => c.category === category && c.intensity > 58);
    if (pool.length < 2) return [];
    const count = category === "ALL" ? 16 : 10;
    const out = [];
    for (let i = 0; i < count; i++) {
      const a = seededPick(pool, category + i);
      let b = seededPick(pool, category + i + "b");
      let guard = 0;
      while (b.name === a.name && guard < 8) {
        b = seededPick(pool, category + i + "b" + guard);
        guard++;
      }
      if (b.name === a.name) continue;
      out.push({ from: a, to: b });
    }
    return out;
  },
};

// City-level intelligence for the detail panel. Structured so a real API can
// replace the mock pools without changing the UI.
export const CityIntelligenceService = {
  async get(cityName, category = "ALL") {
    await delay(30);
    const city = ALL_CITIES.find((c) => c.name === cityName);
    if (!city) return null;
    const cat = !category || category === "ALL" ? city.category : category;
    const change = Math.floor((city.intensity * 7 + city.name.length * 5) % 55) + 8;
    const trending = pickStable(TREND_POOL[cat] || TREND_POOL.SEARCH, 4, cityName);
    const extras = buildExtras(cat, cityName);
    return {
      location: city.name,
      country: city.country,
      countryCode: city.countryCode,
      region: city.region,
      lat: city.lat,
      lng: city.lng,
      category: cat,
      activityLevel: city.intensity,
      change,
      trending,
      extras,
    };
  },
};

export const GlobalActivityService = {
  forCategory(category = "ALL") {
    return CATEGORY_METRICS[category] || CATEGORY_METRICS.ALL;
  },
};

// helpers
function randItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
function pick(arr, n) {
  const copy = [...arr];
  const out = [];
  for (let i = 0; i < n && copy.length; i++) {
    out.push(copy.splice(Math.floor(Math.random() * copy.length), 1)[0]);
  }
  return out;
}
function buildTimeline(base) {
  const out = [];
  let v = base;
  for (let i = 23; i >= 0; i--) {
    v = Math.max(20, Math.min(99, v + (Math.random() - 0.45) * 14));
    out.push({ hour: `${i}h`, value: Math.round(v) });
  }
  return out;
}

// deterministic helpers so mock data is stable per location/category
function hashStr(s) {
  let h = 2166136261;
  for (let i = 0; i < String(s).length; i++) {
    h ^= String(s).charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
function seededPick(arr, seed) {
  return arr[hashStr(seed) % arr.length];
}
function pickStable(arr, n, seed) {
  const out = [];
  const used = new Set();
  let i = 0;
  while (out.length < n && i < arr.length * 4) {
    const idx = hashStr(seed + ":" + i) % arr.length;
    if (!used.has(idx)) {
      used.add(idx);
      out.push(arr[idx]);
    }
    i++;
  }
  return out;
}
function buildExtras(cat, seed) {
  const pool = INTEL_POOLS[cat];
  if (!pool) return {};
  const out = {};
  Object.keys(pool).forEach((k) => {
    out[k] = pickStable(pool[k], 4, seed + k);
  });
  return out;
}