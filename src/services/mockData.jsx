// NEXUS — Mock data layer.
// Separated from UI so these services can later be replaced with real APIs
// without rebuilding the frontend. Nothing here is real "live" data.

export const CATEGORIES = [
  { id: "ALL", label: "All", icon: "🌍", color: "#22d3ee" },
  { id: "SEARCH", label: "Search", icon: "🔎", color: "#3b82f6" },
  { id: "MUSIC", label: "Music", icon: "🎵", color: "#ec4899" },
  { id: "MARKETS", label: "Markets", icon: "📈", color: "#10b981" },
  { id: "CRYPTO", label: "Crypto", icon: "₿", color: "#f59e0b" },
  { id: "VIRAL", label: "Viral", icon: "🔥", color: "#ef4444" },
  { id: "GAMING", label: "Gaming", icon: "🎮", color: "#8b5cf6" },
  { id: "SOCIAL", label: "Social", icon: "📱", color: "#06b6d4" },
  { id: "NEWS", label: "News", icon: "📰", color: "#fbbf24" },
  { id: "ONLINE", label: "Online Activity", icon: "👥", color: "#14b8a6" },
];

export const CATEGORY_MAP = CATEGORIES.reduce((m, c) => ((m[c.id] = c), m), {});

export const TREND_POOL = {
  SEARCH: ["AI", "World Cup", "Elections", "ChatGPT", "SpaceX", "Climate", "Olympics", "Bitcoin price", "New movie", "Concert tickets"],
  MUSIC: ["Afrobeats surge", "K-pop comeback", "Lo-fi streams", "Album drop", "Viral dance", "Festival lineup", "Remix trend", "Chart takeover"],
  SOCIAL: ["TikTok challenge", "Instagram trend", "X thread viral", "Meme wave", "Creator drama", "Hashtag surge", "Live stream record"],
  GAMING: ["Esports final", "New release", "Speedrun record", "Patch drop", "Tournament upset", "Stream peak", "Clan war"],
  NEWS: ["Breaking report", "Policy shift", "Summit talks", "Protest coverage", "Market move", "Tech launch", "Weather alert"],
  MARKETS: ["Index rally", "Currency move", "Crypto pump", "Commodity surge", "IPO debut", "Earnings beat"],
  CRYPTO: ["BTC surge", "ETH upgrade", "Altcoin pump", "DeFi spike", "NFT mint", "Stablecoin flow"],
  VIRAL: ["Celebrity moment", "Sport clip", "Debate clip", "Unexpected event", "Throwback post"],
  ONLINE: ["Outage report", "Connectivity spike", "Streaming peak", "Search surge", "Login wave"],
};

const REGIONS = ["Africa", "North America", "South America", "Europe", "Asia", "Oceania", "Middle East"];

// lat/lng, activity (0-100), change (%), region, cities
export const COUNTRIES = [
  { code: "NG", name: "Nigeria", lat: 9.08, lng: 8.68, activity: 82, change: 34, region: "Africa", trendingTopic: "AFCON", trendingCategory: "SEARCH",
    cities: [
      { name: "Lagos", lat: 6.52, lng: 3.38, activity: 91 },
      { name: "Abuja", lat: 9.08, lng: 7.40, activity: 74 },
      { name: "Port Harcourt", lat: 4.81, lng: 7.04, activity: 68 },
      { name: "Ibadan", lat: 7.39, lng: 3.91, activity: 63 },
      { name: "Kano", lat: 12.00, lng: 8.52, activity: 58 },
    ] },
  { code: "US", name: "United States", lat: 39.0, lng: -98.0, activity: 88, change: 12, region: "North America", trendingTopic: "AI", trendingCategory: "SEARCH",
    cities: [
      { name: "New York", lat: 40.71, lng: -74.0, activity: 92 },
      { name: "Los Angeles", lat: 34.05, lng: -118.24, activity: 88 },
      { name: "Chicago", lat: 41.88, lng: -87.63, activity: 80 },
      { name: "Miami", lat: 25.76, lng: -80.19, activity: 79 },
      { name: "Seattle", lat: 47.61, lng: -122.33, activity: 83 },
    ] },
  { code: "GB", name: "United Kingdom", lat: 54.0, lng: -2.0, activity: 79, change: 19, region: "Europe", trendingTopic: "Premier League", trendingCategory: "SOCIAL",
    cities: [
      { name: "London", lat: 51.51, lng: -0.13, activity: 89 },
      { name: "Manchester", lat: 53.48, lng: -2.24, activity: 74 },
      { name: "Birmingham", lat: 52.49, lng: -1.90, activity: 68 },
      { name: "Glasgow", lat: 55.86, lng: -4.25, activity: 66 },
    ] },
  { code: "JP", name: "Japan", lat: 36.0, lng: 138.0, activity: 84, change: 22, region: "Asia", trendingTopic: "Anime release", trendingCategory: "VIRAL",
    cities: [
      { name: "Tokyo", lat: 35.68, lng: 139.69, activity: 93 },
      { name: "Osaka", lat: 34.69, lng: 135.50, activity: 78 },
      { name: "Kyoto", lat: 35.01, lng: 135.77, activity: 71 },
      { name: "Yokohama", lat: 35.44, lng: 139.64, activity: 75 },
    ] },
  { code: "KR", name: "South Korea", lat: 36.5, lng: 127.8, activity: 86, change: 51, region: "Asia", trendingTopic: "K-pop comeback", trendingCategory: "MUSIC",
    cities: [
      { name: "Seoul", lat: 37.57, lng: 126.98, activity: 94 },
      { name: "Busan", lat: 35.18, lng: 129.07, activity: 76 },
      { name: "Incheon", lat: 37.46, lng: 126.70, activity: 72 },
    ] },
  { code: "BR", name: "Brazil", lat: -10.0, lng: -55.0, activity: 77, change: 28, region: "South America", trendingTopic: "Carnival prep", trendingCategory: "SOCIAL",
    cities: [
      { name: "São Paulo", lat: -23.55, lng: -46.63, activity: 88 },
      { name: "Rio de Janeiro", lat: -22.91, lng: -43.17, activity: 84 },
      { name: "Brasília", lat: -15.79, lng: -47.88, activity: 70 },
      { name: "Salvador", lat: -12.97, lng: -38.50, activity: 68 },
    ] },
  { code: "AE", name: "United Arab Emirates", lat: 24.0, lng: 54.0, activity: 80, change: 41, region: "Middle East", trendingTopic: "Crypto adoption", trendingCategory: "CRYPTO",
    cities: [
      { name: "Dubai", lat: 25.20, lng: 55.27, activity: 90 },
      { name: "Abu Dhabi", lat: 24.49, lng: 54.37, activity: 78 },
      { name: "Sharjah", lat: 25.35, lng: 55.40, activity: 66 },
    ] },
  { code: "IN", name: "India", lat: 22.0, lng: 79.0, activity: 81, change: 33, region: "Asia", trendingTopic: "Cricket series", trendingCategory: "VIRAL",
    cities: [
      { name: "Mumbai", lat: 19.07, lng: 72.87, activity: 89 },
      { name: "Delhi", lat: 28.61, lng: 77.21, activity: 85 },
      { name: "Bengaluru", lat: 12.97, lng: 77.59, activity: 83 },
      { name: "Hyderabad", lat: 17.39, lng: 78.49, activity: 76 },
      { name: "Chennai", lat: 13.08, lng: 80.27, activity: 74 },
    ] },
  { code: "DE", name: "Germany", lat: 51.0, lng: 10.0, activity: 75, change: 9, region: "Europe", trendingTopic: "Bundesliga", trendingCategory: "GAMING",
    cities: [
      { name: "Berlin", lat: 52.52, lng: 13.40, activity: 83 },
      { name: "Munich", lat: 48.14, lng: 11.58, activity: 76 },
      { name: "Hamburg", lat: 53.55, lng: 9.99, activity: 72 },
      { name: "Frankfurt", lat: 50.11, lng: 8.68, activity: 74 },
    ] },
  { code: "FR", name: "France", lat: 46.6, lng: 2.4, activity: 76, change: 14, region: "Europe", trendingTopic: "Protests", trendingCategory: "NEWS",
    cities: [
      { name: "Paris", lat: 48.86, lng: 2.35, activity: 87 },
      { name: "Marseille", lat: 43.30, lng: 5.37, activity: 71 },
      { name: "Lyon", lat: 45.76, lng: 4.84, activity: 70 },
      { name: "Toulouse", lat: 43.60, lng: 1.44, activity: 66 },
    ] },
  { code: "CN", name: "China", lat: 35.0, lng: 104.0, activity: 85, change: 17, region: "Asia", trendingTopic: "Tech launch", trendingCategory: "NEWS",
    cities: [
      { name: "Shanghai", lat: 31.23, lng: 121.47, activity: 90 },
      { name: "Beijing", lat: 39.90, lng: 116.41, activity: 88 },
      { name: "Shenzhen", lat: 22.54, lng: 114.06, activity: 86 },
      { name: "Guangzhou", lat: 23.13, lng: 113.26, activity: 80 },
    ] },
  { code: "CA", name: "Canada", lat: 56.0, lng: -106.0, activity: 72, change: 11, region: "North America", trendingTopic: "Hockey finals", trendingCategory: "GAMING",
    cities: [
      { name: "Toronto", lat: 43.65, lng: -79.38, activity: 82 },
      { name: "Vancouver", lat: 49.28, lng: -123.12, activity: 78 },
      { name: "Montreal", lat: 45.50, lng: -73.57, activity: 75 },
    ] },
  { code: "AU", name: "Australia", lat: -25.0, lng: 133.0, activity: 70, change: 8, region: "Oceania", trendingTopic: "Cricket", trendingCategory: "SOCIAL",
    cities: [
      { name: "Sydney", lat: -33.87, lng: 151.21, activity: 83 },
      { name: "Melbourne", lat: -37.81, lng: 144.96, activity: 80 },
      { name: "Brisbane", lat: -27.47, lng: 153.02, activity: 72 },
    ] },
  { code: "ZA", name: "South Africa", lat: -30.0, lng: 25.0, activity: 68, change: 21, region: "Africa", trendingTopic: "Load shedding", trendingCategory: "NEWS",
    cities: [
      { name: "Johannesburg", lat: -26.20, lng: 28.05, activity: 79 },
      { name: "Cape Town", lat: -33.92, lng: 18.42, activity: 76 },
      { name: "Durban", lat: -29.86, lng: 31.03, activity: 68 },
    ] },
  { code: "EG", name: "Egypt", lat: 26.0, lng: 30.0, activity: 66, change: 24, region: "Africa", trendingTopic: "League final", trendingCategory: "VIRAL",
    cities: [
      { name: "Cairo", lat: 30.04, lng: 31.24, activity: 80 },
      { name: "Alexandria", lat: 31.20, lng: 29.92, activity: 70 },
      { name: "Giza", lat: 29.98, lng: 31.13, activity: 67 },
    ] },
  { code: "KE", name: "Kenya", lat: 0.0, lng: 38.0, activity: 64, change: 30, region: "Africa", trendingTopic: "Marathon", trendingCategory: "VIRAL",
    cities: [
      { name: "Nairobi", lat: -1.29, lng: 36.82, activity: 78 },
      { name: "Mombasa", lat: -4.04, lng: 39.67, activity: 64 },
      { name: "Kisumu", lat: -0.09, lng: 34.77, activity: 58 },
    ] },
  { code: "SA", name: "Saudi Arabia", lat: 24.0, lng: 45.0, activity: 73, change: 26, region: "Middle East", trendingTopic: "League transfers", trendingCategory: "VIRAL",
    cities: [
      { name: "Riyadh", lat: 24.71, lng: 46.68, activity: 82 },
      { name: "Jeddah", lat: 21.49, lng: 39.19, activity: 74 },
      { name: "Mecca", lat: 21.39, lng: 39.85, activity: 70 },
    ] },
  { code: "RU", name: "Russia", lat: 61.0, lng: 90.0, activity: 69, change: 6, region: "Europe", trendingTopic: "Hockey", trendingCategory: "GAMING",
    cities: [
      { name: "Moscow", lat: 55.76, lng: 37.62, activity: 83 },
      { name: "Saint Petersburg", lat: 59.93, lng: 30.34, activity: 76 },
      { name: "Novosibirsk", lat: 55.03, lng: 82.92, activity: 64 },
    ] },
  { code: "MX", name: "Mexico", lat: 23.6, lng: -102.5, activity: 71, change: 18, region: "North America", trendingTopic: "Liga MX", trendingCategory: "SOCIAL",
    cities: [
      { name: "Mexico City", lat: 19.43, lng: -99.13, activity: 84 },
      { name: "Guadalajara", lat: 20.66, lng: -103.34, activity: 72 },
      { name: "Monterrey", lat: 25.69, lng: -100.32, activity: 70 },
    ] },
  { code: "ES", name: "Spain", lat: 40.0, lng: -3.7, activity: 73, change: 13, region: "Europe", trendingTopic: "La Liga", trendingCategory: "GAMING",
    cities: [
      { name: "Madrid", lat: 40.42, lng: -3.70, activity: 83 },
      { name: "Barcelona", lat: 41.39, lng: 2.17, activity: 82 },
      { name: "Valencia", lat: 39.47, lng: -0.38, activity: 70 },
    ] },
  { code: "IT", name: "Italy", lat: 42.0, lng: 12.0, activity: 70, change: 10, region: "Europe", trendingTopic: "Serie A", trendingCategory: "GAMING",
    cities: [
      { name: "Rome", lat: 41.90, lng: 12.50, activity: 80 },
      { name: "Milan", lat: 45.46, lng: 9.19, activity: 81 },
      { name: "Naples", lat: 40.85, lng: 14.27, activity: 72 },
    ] },
  { code: "TR", name: "Turkey", lat: 39.0, lng: 35.0, activity: 72, change: 20, region: "Middle East", trendingTopic: "Elections", trendingCategory: "NEWS",
    cities: [
      { name: "Istanbul", lat: 41.01, lng: 28.98, activity: 84 },
      { name: "Ankara", lat: 39.93, lng: 32.86, activity: 72 },
      { name: "Izmir", lat: 38.42, lng: 27.14, activity: 68 },
    ] },
  { code: "ID", name: "Indonesia", lat: -2.5, lng: 118.0, activity: 69, change: 27, region: "Asia", trendingTopic: "Viral dance", trendingCategory: "SOCIAL",
    cities: [
      { name: "Jakarta", lat: -6.21, lng: 106.85, activity: 82 },
      { name: "Surabaya", lat: -7.25, lng: 112.75, activity: 70 },
      { name: "Bandung", lat: -6.92, lng: 107.61, activity: 68 },
    ] },
  { code: "AR", name: "Argentina", lat: -38.0, lng: -63.0, activity: 68, change: 15, region: "South America", trendingTopic: "Liga Profesional", trendingCategory: "GAMING",
    cities: [
      { name: "Buenos Aires", lat: -34.61, lng: -58.38, activity: 82 },
      { name: "Córdoba", lat: -31.42, lng: -64.19, activity: 66 },
      { name: "Rosario", lat: -32.95, lng: -60.64, activity: 64 },
    ] },
  { code: "NL", name: "Netherlands", lat: 52.1, lng: 5.3, activity: 74, change: 12, region: "Europe", trendingTopic: "Eredivisie", trendingCategory: "GAMING",
    cities: [
      { name: "Amsterdam", lat: 52.37, lng: 4.90, activity: 83 },
      { name: "Rotterdam", lat: 51.92, lng: 4.48, activity: 72 },
      { name: "The Hague", lat: 52.07, lng: 4.30, activity: 68 },
    ] },
  { code: "SG", name: "Singapore", lat: 1.35, lng: 103.82, activity: 78, change: 23, region: "Asia", trendingTopic: "F1 Grand Prix", trendingCategory: "VIRAL",
    cities: [
      { name: "Singapore", lat: 1.35, lng: 103.82, activity: 85 },
    ] },
  { code: "SE", name: "Sweden", lat: 62.0, lng: 15.0, activity: 71, change: 9, region: "Europe", trendingTopic: "Music festival", trendingCategory: "MUSIC",
    cities: [
      { name: "Stockholm", lat: 59.33, lng: 18.07, activity: 80 },
      { name: "Gothenburg", lat: 57.71, lng: 11.97, activity: 68 },
    ] },
  { code: "NG2", name: "Ghana", lat: 7.95, lng: -1.02, activity: 63, change: 19, region: "Africa", trendingTopic: "Afrobeats", trendingCategory: "MUSIC",
    cities: [
      { name: "Accra", lat: 5.60, lng: -0.19, activity: 76 },
      { name: "Kumasi", lat: 6.69, lng: -1.62, activity: 62 },
    ] },
  { code: "TH", name: "Thailand", lat: 15.0, lng: 101.0, activity: 67, change: 16, region: "Asia", trendingTopic: "Street food trend", trendingCategory: "SOCIAL",
    cities: [
      { name: "Bangkok", lat: 13.76, lng: 100.50, activity: 80 },
      { name: "Chiang Mai", lat: 18.79, lng: 98.99, activity: 64 },
    ] },
  { code: "PL", name: "Poland", lat: 52.0, lng: 19.0, activity: 66, change: 11, region: "Europe", trendingTopic: "Esports", trendingCategory: "GAMING",
    cities: [
      { name: "Warsaw", lat: 52.23, lng: 21.01, activity: 78 },
      { name: "Kraków", lat: 50.06, lng: 19.94, activity: 70 },
    ] },
  { code: "CO", name: "Colombia", lat: 4.0, lng: -72.0, activity: 65, change: 22, region: "South America", trendingTopic: "Reggaeton", trendingCategory: "MUSIC",
    cities: [
      { name: "Bogotá", lat: 4.71, lng: -74.07, activity: 77 },
      { name: "Medellín", lat: 6.24, lng: -75.57, activity: 73 },
      { name: "Cali", lat: 3.45, lng: -76.53, activity: 66 },
    ] },
  { code: "NG3", name: "Egypt2", lat: 0, lng: 0, activity: 0, change: 0, region: "Africa", trendingTopic: "", trendingCategory: "SEARCH", cities: [] }, // placeholder removed below
];

// remove placeholder
COUNTRIES.pop();

export const REGIONS_LIST = REGIONS;

// Build a flat list of all cities (for globe markers + arcs)
export const ALL_CITIES = COUNTRIES.flatMap((c) =>
  c.cities.map((city) => ({
    ...city,
    country: c.name,
    countryCode: c.code,
    region: c.region,
    category: c.trendingCategory,
    intensity: city.activity,
  }))
);

// Global trends (mock)
export const GLOBAL_TRENDS = [
  { rank: 1, topic: "AFCON final", category: "VIRAL", growth: 312, countries: ["NG", "GH", "ZA", "CM"], activity: 96, region: "Africa" },
  { rank: 2, topic: "AI model launch", category: "NEWS", growth: 248, countries: ["US", "GB", "CN", "JP"], activity: 92, region: "Global" },
  { rank: 3, topic: "K-pop comeback", category: "MUSIC", growth: 221, countries: ["KR", "JP", "US", "BR"], activity: 89, region: "Asia" },
  { rank: 4, topic: "Crypto rally", category: "CRYPTO", growth: 187, countries: ["AE", "US", "SG", "KR"], activity: 85, region: "Global" },
  { rank: 5, topic: "Esports grand final", category: "GAMING", growth: 164, countries: ["US", "KR", "DE", "BR"], activity: 83, region: "Global" },
  { rank: 6, topic: "Premier League clash", category: "SOCIAL", growth: 142, countries: ["GB", "NG", "KE", "IN"], activity: 80, region: "Europe" },
  { rank: 7, topic: "Viral dance challenge", category: "SOCIAL", growth: 131, countries: ["BR", "ID", "NG", "MX"], activity: 78, region: "South America" },
  { rank: 8, topic: "Bundesliga derby", category: "GAMING", growth: 118, countries: ["DE", "AT", "CH"], activity: 74, region: "Europe" },
  { rank: 9, topic: "Afrobeats surge", category: "MUSIC", growth: 109, countries: ["NG", "GH", "GB", "US"], activity: 72, region: "Africa" },
  { rank: 10, topic: "Climate summit", category: "NEWS", growth: 96, countries: ["FR", "DE", "US", "BR"], activity: 69, region: "Global" },
];

// Search index (mock) — entities users can search for
export const SEARCH_INDEX = [
  { type: "Country", label: "Nigeria", sub: "Africa · Activity 82", target: { kind: "country", code: "NG" } },
  { type: "Country", label: "United States", sub: "North America · Activity 88", target: { kind: "country", code: "US" } },
  { type: "Country", label: "Japan", sub: "Asia · Activity 84", target: { kind: "country", code: "JP" } },
  { type: "Country", label: "South Korea", sub: "Asia · Activity 86", target: { kind: "country", code: "KR" } },
  { type: "Country", label: "Brazil", sub: "South America · Activity 77", target: { kind: "country", code: "BR" } },
  { type: "Country", label: "United Kingdom", sub: "Europe · Activity 79", target: { kind: "country", code: "GB" } },
  { type: "Country", label: "United Arab Emirates", sub: "Middle East · Activity 80", target: { kind: "country", code: "AE" } },
  { type: "Country", label: "India", sub: "Asia · Activity 81", target: { kind: "country", code: "IN" } },
  { type: "City", label: "Lagos", sub: "Nigeria · Activity 91", target: { kind: "country", code: "NG", city: "Lagos" } },
  { type: "City", label: "Tokyo", sub: "Japan · Activity 93", target: { kind: "country", code: "JP", city: "Tokyo" } },
  { type: "City", label: "Seoul", sub: "South Korea · Activity 94", target: { kind: "country", code: "KR", city: "Seoul" } },
  { type: "City", label: "New York", sub: "United States · Activity 92", target: { kind: "country", code: "US", city: "New York" } },
  { type: "City", label: "London", sub: "United Kingdom · Activity 89", target: { kind: "country", code: "GB", city: "London" } },
  { type: "City", label: "Dubai", sub: "United Arab Emirates · Activity 90", target: { kind: "country", code: "AE", city: "Dubai" } },
  { type: "City", label: "São Paulo", sub: "Brazil · Activity 88", target: { kind: "country", code: "BR", city: "São Paulo" } },
  { type: "Artist", label: "Taylor Swift", sub: "Music · Global activity 88", target: { kind: "topic", topic: "Taylor Swift", category: "MUSIC" } },
  { type: "Artist", label: "Burna Boy", sub: "Music · Global activity 79", target: { kind: "topic", topic: "Burna Boy", category: "MUSIC" } },
  { type: "Artist", label: "Bad Bunny", sub: "Music · Global activity 81", target: { kind: "topic", topic: "Bad Bunny", category: "MUSIC" } },
  { type: "Song", label: "Espresso", sub: "Music · Trending +142%", target: { kind: "topic", topic: "Espresso", category: "MUSIC" } },
  { type: "Game", label: "Valorant", sub: "Gaming · Trending +64%", target: { kind: "topic", topic: "Valorant", category: "GAMING" } },
  { type: "Game", label: "League of Legends", sub: "Gaming · Trending +38%", target: { kind: "topic", topic: "League of Legends", category: "GAMING" } },
  { type: "Topic", label: "AI", sub: "Search · Trending +248%", target: { kind: "topic", topic: "AI", category: "SEARCH" } },
  { type: "Topic", label: "Bitcoin", sub: "Crypto · Trending +187%", target: { kind: "topic", topic: "Bitcoin", category: "CRYPTO" } },
  { type: "Hashtag", label: "#AFCON", sub: "Social · Trending +312%", target: { kind: "topic", topic: "#AFCON", category: "SOCIAL" } },
  { type: "Company", label: "OpenAI", sub: "News · Trending +96%", target: { kind: "topic", topic: "OpenAI", category: "NEWS" } },
  { type: "Product", label: "iPhone 17", sub: "Search · Trending +58%", target: { kind: "topic", topic: "iPhone 17", category: "SEARCH" } },
];

// Per-category metrics for the Global Activity panel.
// ALL shows the category breakdown; each specific category shows its own sub-metrics.
export const CATEGORY_METRICS = {
  ALL: [
    { label: "Search", val: 78, cat: "SEARCH" },
    { label: "Social", val: 84, cat: "SOCIAL" },
    { label: "Music", val: 71, cat: "MUSIC" },
    { label: "Gaming", val: 66, cat: "GAMING" },
    { label: "Crypto", val: 58, cat: "CRYPTO" },
  ],
  SEARCH: [ { label: "Queries", val: 86 }, { label: "Trending", val: 72 }, { label: "Breakouts", val: 64 }, { label: "Autocomplete", val: 58 } ],
  MUSIC: [ { label: "Streams", val: 88 }, { label: "New releases", val: 74 }, { label: "Charts", val: 69 }, { label: "Playlists", val: 61 } ],
  MARKETS: [ { label: "Indices", val: 71 }, { label: "Volatility", val: 54 }, { label: "Volume", val: 66 }, { label: "Movers", val: 48 } ],
  CRYPTO: [ { label: "BTC", val: 82 }, { label: "ETH", val: 74 }, { label: "Volume", val: 68 }, { label: "Volatility", val: 59 } ],
  VIRAL: [ { label: "Trending", val: 91 }, { label: "Velocity", val: 83 }, { label: "Reach", val: 76 }, { label: "Spike", val: 69 } ],
  GAMING: [ { label: "Players", val: 84 }, { label: "Streams", val: 72 }, { label: "Tournaments", val: 61 }, { label: "New titles", val: 55 } ],
  SOCIAL: [ { label: "Posts", val: 87 }, { label: "Shares", val: 79 }, { label: "Engagement", val: 73 }, { label: "Reach", val: 66 } ],
  NEWS: [ { label: "Breaking", val: 80 }, { label: "Coverage", val: 71 }, { label: "Velocity", val: 64 }, { label: "Sources", val: 58 } ],
  ONLINE: [ { label: "Traffic", val: 89 }, { label: "Bandwidth", val: 82 }, { label: "Users", val: 77 }, { label: "Uptime", val: 94 } ],
};

// Structured per-category intelligence pools for the city-level detail panel.
// Shaped so a real API can replace each pool without touching the UI.
export const INTEL_POOLS = {
  MUSIC: {
    artists: ["Burna Boy", "Taylor Swift", "Bad Bunny", "BLACKPINK", "The Weeknd", "Drake", "Rihanna", "BTS", "Asake", "Tyla"],
    songs: ["Espresso", "Flowers", "Unholy", "Calm Down", "Anti-Hero", "As It Was", "Water", "Houdini"],
  },
  GAMING: {
    games: ["Valorant", "League of Legends", "Fortnite", "Counter-Strike 2", "Genshin Impact", "EA FC", "Call of Duty", "Dota 2"],
  },
  SOCIAL: {
    platforms: ["TikTok", "Instagram", "X", "YouTube", "Snapchat", "Threads", "Facebook"],
  },
  NEWS: {
    topics: ["Breaking report", "Policy shift", "Tech launch", "Summit talks", "Market move", "Weather alert", "Election update"],
  },
  MARKETS: {
    movers: [
      { name: "S&P 500", change: 1.2, dir: "up" },
      { name: "NASDAQ", change: 0.8, dir: "up" },
      { name: "EUR/USD", change: 0.3, dir: "down" },
      { name: "Gold", change: 0.6, dir: "up" },
      { name: "Oil", change: 1.1, dir: "down" },
      { name: "Nikkei 225", change: 1.9, dir: "up" },
    ],
  },
  CRYPTO: {
    coins: [
      { name: "BTC", change: 4.2 },
      { name: "ETH", change: 3.1 },
      { name: "SOL", change: 7.8 },
      { name: "XRP", change: 2.4, dir: "down" },
      { name: "DOGE", change: 5.6 },
      { name: "BNB", change: 1.7 },
    ],
  },
  SEARCH: {
    terms: ["AI tools", "World Cup", "Elections", "New movie", "Concert tickets", "Climate", "SpaceX", "Bitcoin price"],
  },
  VIRAL: {
    topics: ["Celebrity moment", "Sport clip", "Debate clip", "Unexpected event", "Throwback post", "Meme wave"],
  },
  ONLINE: {
    metrics: ["Streaming peak", "Connectivity spike", "Search surge", "Login wave", "Outage report"],
  },
};