const ICONS = {
  ai: '<circle cx="12" cy="12" r="4"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4M5 5l2.5 2.5M16.5 16.5 19 19M5 19l2.5-2.5M16.5 7.5 19 5"/>',
  dive: '<path d="M3 15c3-1.5 6 1.5 9 0s6-1.5 9 0M3 19c3-1.5 6 1.5 9 0s6-1.5 9 0"/><path d="M12 3v8m-3.5-3.5L12 11l3.5-3.5"/>',
  talk: '<path d="M3 5h12v9H8l-5 4z"/><path d="M15 9h6v9l-4-3h-6v-1"/>',
  calc: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 7h8M8 11h1M12 11h1M16 11v6M8 15h1M12 15h1"/>',
  team: '<path d="M15 3 9.5 18c-.5 1.3-1.6 2-3 2H4"/><path d="M4 20h7"/><ellipse cx="18" cy="19" rx="3" ry="1.4"/>',
  code: '<path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16"/>',
  doc: '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',
  ship: '<path d="M3 16h18l-2.5 4h-13z"/><path d="M12 3v13M12 4l6 9h-6"/>',
  wind: '<path d="M3 9h11a3 3 0 1 0-3-3M3 15h15a3 3 0 1 1-3 3"/>',
  web: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3.5 3.5 3.5 14.5 0 18M12 3c-3.5 3.5-3.5 14.5 0 18"/>',
  list: '<path d="M10 6h10M10 12h10M10 18h10"/><path d="m3.5 6 1.5 1.5L8 4.5M3.5 12l1.5 1.5L8 10.5M3.5 18l1.5 1.5L8 16.5"/>',
  puck: '<ellipse cx="12" cy="9" rx="8" ry="3.5"/><path d="M4 9v5c0 2 3.6 3.5 8 3.5s8-1.5 8-3.5V9"/>',
  star: '<path d="m12 3 2.7 5.6 6.1.8-4.5 4.2 1.1 6.1L12 16.8l-5.4 2.9 1.1-6.1-4.5-4.2 6.1-.8z"/>',
  lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
  flag: '<path d="M5 21V4h12l-2.5 4.5L17 13H5"/>',
  coach: '<circle cx="9" cy="14" r="5"/><path d="M13 11.5 21 8v4h-6.5"/>',
  lang: '<path d="M3 5h9M7.5 3v2M5 5c.8 4 3.5 7 7 8.5M10 5c-.8 4-3.5 7-7 8.5"/><path d="m13 21 4-9 4 9M14.4 18h5.2"/>',
  sport: '<path d="M6 6v12M18 6v12M3 9v6M21 9v6M6 12h12"/>',
  brief: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V4h6v3M3 13h18"/>'
};

export const svg = n => '<svg viewBox="0 0 24 24" aria-hidden="true">' + ICONS[n] + '</svg>';
