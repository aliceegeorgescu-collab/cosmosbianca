import React, {
  useMemo, useState, useEffect, useCallback, useContext, createContext,
} from 'react';
import {
  Search, Star, SlidersHorizontal, Scale, FolderOpen, Download,
  Copy, X, ExternalLink, Wand2, Trash2, Building2, Check, ArrowDownUp,
  Printer, Link2, Minus, Plus, Database, Upload, RotateCcw,
  BookOpen, Sun, Moon, Globe, FileText,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Datele vin din public/catalog.json (editabil, fara a atinge codul).*/
/* ------------------------------------------------------------------ */
const CatalogCtx = createContext(null);
const useCatalog = () => useContext(CatalogCtx);

const safeUrl = (u) =>
  typeof u === 'string' && /^https?:\/\//i.test(u) ? u : '#';

const webSearch = (q) =>
  `https://duckduckgo.com/?q=${encodeURIComponent(q)}`;

function buildCatalog(raw) {
  const domains = raw.domains || [];
  const categories = raw.categories || [];
  const manufacturers = raw.manufacturers || {};
  const domMap = Object.fromEntries(domains.map((d) => [d.key, d]));
  const catMap = Object.fromEntries(categories.map((c) => [c.key, c]));
  const equipment = [];
  const seen = new Map();
  let id = 0;
  for (const e of raw.equipment || []) {
    if (!e || !e.category || !e.manufacturer || !e.model ||
        typeof e.specs !== 'object' || e.specs === null) {
      console.warn('[catalog] Intrare ignorată — câmpuri lipsă (category/manufacturer/model/specs):', e);
      continue;
    }
    if (!catMap[e.category]) {
      console.warn(
        `[catalog] Echipament ignorat — categorie necunoscută "${e.category}" (${e.manufacturer} ${e.model})`,
      );
      continue;
    }
    const uid = `${e.manufacturer}|${e.category}|${e.model}`;
    const entry = { ...e, uid, url: safeUrl(manufacturers[e.manufacturer]) };
    if (seen.has(uid)) {
      const idx = seen.get(uid);
      entry.id = equipment[idx].id;
      equipment[idx] = entry;
      console.warn(`[catalog] Duplicat înlocuit (ultimul câștigă): ${uid}`);
    } else {
      entry.id = ++id;
      seen.set(uid, equipment.length);
      equipment.push(entry);
    }
  }
  return { domains, categories, domMap, catMap, equipment };
}

const fmt = (v, unit) => (unit ? `${v} ${unit}` : `${v}`);
const cls = (...a) => a.filter(Boolean).join(' ');
const esc = (s) =>
  String(s).replace(/[&<>"]/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[m]));
const b64encode = (str) => {
  const bytes = new TextEncoder().encode(str);
  let bin = '';
  bytes.forEach((b) => { bin += String.fromCharCode(b); });
  return btoa(bin);
};
const b64decode = (b64) => {
  const bin = atob(b64);
  return new TextDecoder().decode(Uint8Array.from(bin, (c) => c.charCodeAt(0)));
};
const encodeProject = (obj) => encodeURIComponent(b64encode(JSON.stringify(obj)));
const decodeProject = (s) => JSON.parse(b64decode(decodeURIComponent(s)));

/* CSV: prima linie antet cu coloanele category;manufacturer;model;specs    */
/* specs = "cheie:valoare|cheie:valoare" (valorile numerice sunt detectate) */
function parseEquipmentCSV(text) {
  const lines = text
    .replace(/\r/g, '')
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);
  if (lines.length < 2) return [];
  const sep = lines[0].includes(';') ? ';' : ',';
  const head = lines[0].split(sep).map((h) => h.trim().toLowerCase());
  const ix = (name) => head.indexOf(name);
  const ci = ix('category');
  const mi = ix('manufacturer');
  const oi = ix('model');
  const si = ix('specs');
  if (ci < 0 || mi < 0 || oi < 0) return [];
  const out = [];
  for (let i = 1; i < lines.length; i++) {
    const cells = lines[i].split(sep).map((c) => c.trim().replace(/^"|"$/g, ''));
    const category = cells[ci];
    const manufacturer = cells[mi];
    const model = cells[oi];
    if (!category || !manufacturer || !model) continue;
    const specs = {};
    if (si >= 0 && cells[si]) {
      for (const pair of cells[si].split('|')) {
        const idx = pair.indexOf(':');
        if (idx < 0) continue;
        const k = pair.slice(0, idx).trim();
        const raw = pair.slice(idx + 1).trim();
        if (!k) continue;
        const num = Number(raw);
        specs[k] = raw !== '' && !Number.isNaN(num) ? num : raw;
      }
    }
    out.push({ category, manufacturer, model, specs });
  }
  return out;
}

const normTxt = (s) =>
  String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim();

/* F5: dintr-un text lipit (Word/Excel) sau CSV scoate rânduri-cerință:    */
/* { name, op: 'min'|'max'|'≈', value, um }                                */
function parseF5(text) {
  const out = [];
  const lines = text.replace(/\r/g, '').split('\n').map((l) => l.trim()).filter(Boolean);
  for (const line of lines) {
    const cells = line.split(/\t|;/).map((c) => c.trim()).filter(Boolean);
    const joined = cells.length > 1 ? cells.join(' ') : line;
    const low = joined.toLowerCase();
    const m = joined.match(/(-?\d+(?:[.,]\d+)?)/);
    if (!m) continue;
    let op = '≈';
    if (/(max|maxim|cel mult|≤|<=|<|\bsub\b|p[âa]n[ăa] la)/.test(low)) op = 'max';
    else if (/(min|minim|cel pu[țt]in|≥|>=|>|\bpeste\b)/.test(low)) op = 'min';
    const value = parseFloat(m[1].replace(',', '.'));
    const after = joined.slice(m.index + m[0].length).trim();
    const um = (after.match(/^[%°a-zA-ZăâîșțĂÂÎȘȚµ³²·/.\-]+/) || [''])[0].replace(/[.\-]+$/, '');
    let name = joined.slice(0, m.index).replace(/[:|;–-]+\s*$/, '').trim();
    if (!name) name = cells[0] || joined.trim();
    out.push({ name, op, value, um, specKey: '' });
  }
  return out;
}

function useLocalSet(key) {
  const [set, setSet] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return new Set(raw ? JSON.parse(raw) : []);
    } catch {
      return new Set();
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify([...set]));
    } catch {
      /* ignore */
    }
  }, [key, set]);
  const toggle = (id) =>
    setSet((prev) => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  return [set, toggle, setSet];
}

function useProject() {
  const [qty, setQty] = useState(() => {
    try {
      const raw = localStorage.getItem('instalfinder.project');
      if (raw) return JSON.parse(raw) || {};
      const old = localStorage.getItem('instalfinder.saved');
      if (old) return Object.fromEntries((JSON.parse(old) || []).map((u) => [u, 1]));
    } catch {
      /* ignore */
    }
    return {};
  });

  useEffect(() => {
    const m = window.location.hash.match(/[#&]p=([^&]+)/);
    if (!m) return;
    try {
      const incoming = decodeProject(m[1]);
      if (incoming && typeof incoming === 'object') {
        setQty((p) => ({ ...p, ...incoming }));
      }
    } catch {
      /* ignore */
    }
    history.replaceState(null, '', window.location.pathname + window.location.search);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('instalfinder.project', JSON.stringify(qty));
    } catch {
      /* ignore */
    }
  }, [qty]);

  const has = (uid) => Object.prototype.hasOwnProperty.call(qty, uid);
  const toggle = (uid) =>
    setQty((p) => {
      const n = { ...p };
      if (n[uid]) delete n[uid];
      else n[uid] = 1;
      return n;
    });
  const setOne = (uid, v) =>
    setQty((p) => ({ ...p, [uid]: Math.max(1, Math.floor(Number(v) || 1)) }));
  const clear = () => setQty({});
  return { qty, has, toggle, setOne, clear };
}

function useTheme() {
  const [dark, setDark] = useState(() => {
    try {
      const s = localStorage.getItem('instalfinder.theme');
      if (s) return s === 'dark';
      return window.matchMedia?.('(prefers-color-scheme: dark)').matches || false;
    } catch {
      return false;
    }
  });
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    try {
      localStorage.setItem('instalfinder.theme', dark ? 'dark' : 'light');
    } catch {
      /* ignore */
    }
  }, [dark]);
  return [dark, () => setDark((d) => !d)];
}

/* ------------------------------------------------------------------ */
function SpecRow({ s, value }) {
  if (value === undefined || value === '') return null;
  return (
    <div className="flex justify-between gap-3 text-sm py-1 border-b border-slate-100 last:border-0">
      <span className="text-slate-500">{s.label}</span>
      <span className="font-medium text-slate-800">{fmt(value, s.unit)}</span>
    </div>
  );
}

function EquipmentCard({ item, saved, onSave, compared, onCompare, onOpen }) {
  const { catMap, domMap } = useCatalog();
  const cat = catMap[item.category];
  const keySpecs = cat.specs.slice(0, 3);
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <button
            onClick={() => onOpen(item)}
            className="min-w-0 text-left"
            aria-label={`Detalii ${item.model}`}
          >
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="inline-block text-[10px] font-semibold uppercase tracking-wide text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
                {domMap[cat.domain]?.label}
              </span>
              <span className="inline-block text-[10px] font-semibold uppercase tracking-wide text-sky-700 bg-sky-50 px-2 py-0.5 rounded-full">
                {cat.label}
              </span>
            </div>
            <div className="mt-1.5 flex items-center gap-1.5 text-slate-500 text-sm">
              <Building2 size={14} /> {item.manufacturer}
            </div>
            <h3 className="font-bold text-slate-900 leading-tight truncate hover:text-sky-700">
              {item.model}
            </h3>
          </button>
          <button
            onClick={() => onSave(item.uid)}
            aria-label="Salvează în proiect"
            className={cls(
              'shrink-0 p-2 rounded-full transition',
              saved ? 'text-amber-500 bg-amber-50' : 'text-slate-300 hover:text-amber-400 hover:bg-slate-50',
            )}
          >
            <Star size={20} fill={saved ? 'currentColor' : 'none'} />
          </button>
        </div>

        <div className="mt-3">
          {keySpecs.map((s) => (
            <SpecRow key={s.key} s={s} value={item.specs[s.key]} />
          ))}
        </div>

        <div className="mt-3 flex items-center gap-2 flex-wrap">
          <button
            onClick={() => onOpen(item)}
            className="text-sm font-medium text-sky-700 hover:text-sky-900"
          >
            Detalii
          </button>
          <a
            href={item.url}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-medium text-slate-500 hover:text-slate-800 inline-flex items-center gap-1"
          >
            Producător <ExternalLink size={13} />
          </a>
          <a
            href={webSearch(`${item.manufacturer} ${item.model} ${cat.label} fișă tehnică`)}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-medium text-slate-500 hover:text-slate-800 inline-flex items-center gap-1"
          >
            Caută pe net <Globe size={13} />
          </a>
          <label className="ml-auto inline-flex items-center gap-1.5 text-sm text-slate-600 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={compared}
              onChange={() => onCompare(item.uid)}
              className="accent-sky-600 w-4 h-4"
            />
            Compară
          </label>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
function CompareModal({ items, onClose }) {
  const { catMap } = useCatalog();
  const specKeys = [];
  items.forEach((it) =>
    catMap[it.category].specs.forEach((s) => {
      if (!specKeys.find((k) => k.key === s.key && k.label === s.label))
        specKeys.push(s);
    }),
  );
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white w-full sm:max-w-3xl sm:rounded-2xl rounded-t-2xl max-h-[85vh] overflow-auto">
        <div className="flex items-center justify-between p-4 border-b border-slate-200 sticky top-0 bg-white">
          <h2 className="font-bold text-slate-900">Comparație ({items.length})</h2>
          <button onClick={onClose} className="p-2 text-slate-500 hover:text-slate-800">
            <X size={20} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50">
                <th className="text-left p-3 text-slate-500 font-medium sticky left-0 bg-slate-50">Spec</th>
                {items.map((it) => (
                  <th key={it.id} className="text-left p-3 font-semibold text-slate-900 min-w-[140px]">
                    {it.manufacturer}
                    <div className="font-normal text-slate-500">{it.model}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {specKeys.map((s) => (
                <tr key={s.key + s.label} className="border-t border-slate-100">
                  <td className="p-3 text-slate-500 sticky left-0 bg-white">{s.label}</td>
                  {items.map((it) => {
                    const v = it.specs[s.key];
                    return (
                      <td key={it.id} className="p-3 font-medium text-slate-800">
                        {v === undefined ? '—' : fmt(v, s.unit)}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
function DetailModal({ item, saved, onSave, compared, onCompare, onClose }) {
  const { catMap, domMap } = useCatalog();
  const cat = catMap[item.category];
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white w-full sm:max-w-md sm:rounded-2xl rounded-t-2xl max-h-[85vh] overflow-auto">
        <div className="flex items-start justify-between gap-2 p-4 border-b border-slate-200 sticky top-0 bg-white">
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="inline-block text-[10px] font-semibold uppercase tracking-wide text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
                {domMap[cat.domain]?.label}
              </span>
              <span className="inline-block text-[10px] font-semibold uppercase tracking-wide text-sky-700 bg-sky-50 px-2 py-0.5 rounded-full">
                {cat.label}
              </span>
            </div>
            <div className="mt-1.5 text-slate-500 text-sm">{item.manufacturer}</div>
            <h2 className="font-bold text-slate-900 leading-tight">{item.model}</h2>
          </div>
          <button onClick={onClose} className="p-2 text-slate-500 hover:text-slate-800 shrink-0">
            <X size={20} />
          </button>
        </div>

        <div className="p-4">
          {cat.specs.map((s) => (
            <SpecRow key={s.key} s={s} value={item.specs[s.key]} />
          ))}

          <div className="mt-4 flex gap-2">
            <button
              onClick={() => onSave(item.uid)}
              className={cls(
                'flex-1 inline-flex items-center justify-center gap-1.5 font-medium py-2.5 rounded-xl',
                saved ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-sky-600 text-white',
              )}
            >
              <Star size={16} fill={saved ? 'currentColor' : 'none'} />
              {saved ? 'În proiect' : 'Adaugă în proiect'}
            </button>
            <button
              onClick={() => onCompare(item.uid)}
              className={cls(
                'px-4 inline-flex items-center justify-center gap-1.5 font-medium rounded-xl border',
                compared ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-700 border-slate-200',
              )}
            >
              <Scale size={16} /> Compară
            </button>
          </div>

          <div className="mt-3 flex flex-col gap-1.5">
            <a
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-slate-800"
            >
              Pagina producătorului <ExternalLink size={13} />
            </a>
            <a
              href={webSearch(`${item.manufacturer} ${item.model} ${cat.label} fișă tehnică`)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-slate-800"
            >
              Caută pe net (fișă tehnică) <Globe size={13} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
function Chip({ active, children, onClick }) {
  return (
    <button
      onClick={onClick}
      className={cls(
        'shrink-0 px-3 py-1.5 rounded-full text-sm font-medium border transition',
        active ? 'bg-sky-600 text-white border-sky-600' : 'bg-white text-slate-600 border-slate-200',
      )}
    >
      {children}
    </button>
  );
}

function SearchTab({ saved, onSave, compareSet, onCompare }) {
  const { domains, categories, catMap, domMap, equipment } = useCatalog();
  const [q, setQ] = useState('');
  const [domain, setDomain] = useState('all');
  const [cat, setCat] = useState('all');
  const [filters, setFilters] = useState({});
  const [showFilters, setShowFilters] = useState(false);
  const [sort, setSort] = useState('rel');
  const [detail, setDetail] = useState(null);

  const visibleCats =
    domain === 'all' ? categories : categories.filter((c) => c.domain === domain);
  const activeCat = cat === 'all' ? null : catMap[cat];
  const numericFilters = useMemo(
    () => (activeCat ? activeCat.specs.filter((s) => s.filter) : []),
    [activeCat],
  );

  const sortOptions = useMemo(() => {
    const opts = [
      { v: 'rel', label: 'Relevanță' },
      { v: 'mfg', label: 'Producător A→Z' },
      { v: 'model', label: 'Model A→Z' },
    ];
    for (const s of numericFilters) {
      opts.push({ v: `${s.key}|asc`, label: `${s.label} ↑` });
      opts.push({ v: `${s.key}|desc`, label: `${s.label} ↓` });
    }
    return opts;
  }, [numericFilters]);

  const setBound = (k, bound, v) =>
    setFilters((f) => ({ ...f, [k]: { ...f[k], [bound]: v } }));
  const resetFilters = () => setFilters({});

  const pickDomain = (d) => { setDomain(d); setCat('all'); resetFilters(); setSort('rel'); };
  const pickCat = (c) => { setCat(c); resetFilters(); setSort('rel'); };

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return equipment.filter((it) => {
      const c = catMap[it.category];
      if (domain !== 'all' && c.domain !== domain) return false;
      if (cat !== 'all' && it.category !== cat) return false;
      if (term) {
        const hay = `${it.manufacturer} ${it.model} ${c.label} ${domMap[c.domain]?.label}`.toLowerCase();
        if (!hay.includes(term)) return false;
      }
      for (const s of numericFilters) {
        const f = filters[s.key] || {};
        const mn = parseFloat(f.min);
        const mx = parseFloat(f.max);
        const val = it.specs[s.key];
        if (!isNaN(mn) && (typeof val !== 'number' || val < mn)) return false;
        if (!isNaN(mx) && (typeof val !== 'number' || val > mx)) return false;
      }
      return true;
    });
  }, [q, domain, cat, filters, numericFilters, equipment, catMap, domMap]);

  const results = useMemo(() => {
    const arr = [...filtered];
    if (sort === 'mfg') {
      arr.sort((a, b) => a.manufacturer.localeCompare(b.manufacturer) || a.model.localeCompare(b.model));
    } else if (sort === 'model') {
      arr.sort((a, b) => a.model.localeCompare(b.model));
    } else if (sort.includes('|')) {
      const [k, dir] = sort.split('|');
      arr.sort((a, b) => {
        const av = a.specs[k];
        const bv = b.specs[k];
        const an = typeof av === 'number';
        const bn = typeof bv === 'number';
        if (!an && !bn) return 0;
        if (!an) return 1;
        if (!bn) return -1;
        return dir === 'asc' ? av - bv : bv - av;
      });
    }
    return arr;
  }, [filtered, sort]);

  const groups = useMemo(() => {
    if (cat !== 'all') return null;
    const byCat = new Map();
    for (const it of results) {
      if (!byCat.has(it.category)) byCat.set(it.category, []);
      byCat.get(it.category).push(it);
    }
    return categories
      .filter((c) => byCat.has(c.key))
      .map((c) => ({ c, list: byCat.get(c.key) }));
  }, [results, cat, categories]);

  const searchTerm =
    q.trim() ||
    [domain !== 'all' ? domMap[domain]?.label : '', activeCat ? activeCat.label : '']
      .filter(Boolean)
      .join(' ') ||
    'echipamente instalații';

  const renderCard = (it) => (
    <EquipmentCard
      key={it.id}
      item={it}
      saved={saved.has(it.uid)}
      onSave={onSave}
      compared={compareSet.has(it.uid)}
      onCompare={onCompare}
      onOpen={setDetail}
    />
  );

  return (
    <div>
      <div className="sticky top-0 z-10 bg-slate-50 pt-1 pb-3">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Caută producător sau model..."
            className="w-full pl-10 pr-3 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-sky-300"
          />
        </div>

        <p className="mt-3 mb-1 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
          Specialitate
        </p>
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
          <Chip active={domain === 'all'} onClick={() => pickDomain('all')}>Toate</Chip>
          {domains.map((d) => (
            <Chip key={d.key} active={domain === d.key} onClick={() => pickDomain(d.key)}>
              {d.label}
            </Chip>
          ))}
        </div>

        <p className="mt-2 mb-1 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
          Tip echipament
        </p>
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
          <Chip active={cat === 'all'} onClick={() => pickCat('all')}>Toate</Chip>
          {visibleCats.map((c) => (
            <Chip key={c.key} active={cat === c.key} onClick={() => pickCat(c.key)}>
              {c.label}
            </Chip>
          ))}
        </div>

        <div className="mt-2 flex items-center gap-2">
          {numericFilters.length > 0 && (
            <button
              onClick={() => setShowFilters((s) => !s)}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600"
            >
              <SlidersHorizontal size={15} />
              Filtre {showFilters ? '▲' : '▼'}
            </button>
          )}
          <label className="ml-auto inline-flex items-center gap-1.5 text-sm text-slate-600">
            <ArrowDownUp size={15} />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-white border border-slate-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-sky-300"
            >
              {sortOptions.map((o) => (
                <option key={o.v} value={o.v}>{o.label}</option>
              ))}
            </select>
          </label>
        </div>

        {numericFilters.length > 0 && showFilters && (
          <div className="mt-2 grid grid-cols-1 gap-2 bg-white p-3 rounded-xl border border-slate-200">
            {numericFilters.map((s) => {
              const f = filters[s.key] || {};
              const mn = parseFloat(f.min);
              const mx = parseFloat(f.max);
              const bad = !isNaN(mn) && !isNaN(mx) && mn > mx;
              return (
                <div key={s.key} className="text-sm">
                  <span className="text-slate-500">
                    {s.label} {s.unit && `(${s.unit})`}
                  </span>
                  <div className="mt-1 flex items-center gap-2">
                    <input
                      type="number"
                      inputMode="decimal"
                      placeholder="min"
                      value={f.min ?? ''}
                      onChange={(e) => setBound(s.key, 'min', e.target.value)}
                      className="w-full px-2 py-1.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-300"
                    />
                    <span className="text-slate-400">–</span>
                    <input
                      type="number"
                      inputMode="decimal"
                      placeholder="max"
                      value={f.max ?? ''}
                      onChange={(e) => setBound(s.key, 'max', e.target.value)}
                      className={cls(
                        'w-full px-2 py-1.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-sky-300',
                        bad ? 'border-rose-300' : 'border-slate-200',
                      )}
                    />
                  </div>
                  {bad && (
                    <p className="mt-1 text-xs text-rose-600">min &gt; max — niciun rezultat</p>
                  )}
                </div>
              );
            })}
            <button
              onClick={resetFilters}
              className="justify-self-start text-xs font-medium text-rose-600"
            >
              Resetează filtrele
            </button>
          </div>
        )}
      </div>

      <p className="text-sm text-slate-500 mb-2">{results.length} rezultate</p>

      {results.length === 0 && (
        <div className="py-10 text-center">
          <p className="text-slate-400 text-sm">
            Niciun echipament nu corespunde criteriilor.
          </p>
          <a
            href={webSearch(`${searchTerm} fișă tehnică`)}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-sky-700 hover:text-sky-900"
          >
            <Globe size={15} /> Caută „{searchTerm}" pe net
          </a>
        </div>
      )}

      {groups
        ? groups.map(({ c, list }) => (
            <div key={c.key} className="mb-5">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400 mb-2">
                {domMap[c.domain]?.label} · {c.label} ({list.length})
              </p>
              <div className="grid sm:grid-cols-2 gap-3">{list.map(renderCard)}</div>
            </div>
          ))
        : (
          <div className="grid sm:grid-cols-2 gap-3 pb-24">{results.map(renderCard)}</div>
        )}

      {groups && <div className="pb-24" />}

      {detail && (
        <DetailModal
          item={detail}
          saved={saved.has(detail.uid)}
          onSave={onSave}
          compared={compareSet.has(detail.uid)}
          onCompare={onCompare}
          onClose={() => setDetail(null)}
        />
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
function AssistantTab({ saved, onSave }) {
  const { domains, categories, catMap, equipment } = useCatalog();
  const [domain, setDomain] = useState(domains[0]?.key);
  const domCats = categories.filter((c) => c.domain === domain);
  const [cat, setCat] = useState(domCats[0]?.key);
  const [targets, setTargets] = useState({});
  const c = catMap[cat];
  const numeric = useMemo(() => (c ? c.specs.filter((s) => s.filter) : []), [c]);

  const changeDomain = (d) => {
    setDomain(d);
    setCat(categories.find((x) => x.domain === d)?.key);
    setTargets({});
  };

  const ranked = useMemo(() => {
    const filled = numeric.filter((s) => {
      const v = parseFloat(targets[s.key]);
      return !isNaN(v) && v > 0;
    });
    if (filled.length === 0) return [];
    return equipment
      .filter((it) => it.category === cat)
      .map((it) => {
        let sum = 0;
        for (const s of filled) {
          const t = parseFloat(targets[s.key]);
          const v = it.specs[s.key];
          const rel = typeof v === 'number' ? Math.min(Math.abs(v - t) / t, 1) : 1;
          sum += rel;
        }
        const score = Math.round(100 * (1 - sum / filled.length));
        return { it, score };
      })
      .sort((a, b) => b.score - a.score);
  }, [cat, targets, numeric, equipment]);

  return (
    <div className="pb-24">
      <div className="bg-white rounded-2xl border border-slate-200 p-4">
        <h2 className="font-bold text-slate-900 flex items-center gap-2">
          <Wand2 size={18} className="text-sky-600" /> Asistent de selecție
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Alege specialitatea și tipul de echipament, apoi introdu punctul de
          funcționare dorit. Primești echipamentele apropiate, ordonate după potrivire.
        </p>

        <label className="block mt-4 text-sm">
          <span className="text-slate-500">Specialitate</span>
          <select
            value={domain || ''}
            onChange={(e) => changeDomain(e.target.value)}
            className="mt-1 w-full px-3 py-2 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-sky-300"
          >
            {domains.map((d) => (
              <option key={d.key} value={d.key}>{d.label}</option>
            ))}
          </select>
        </label>

        <label className="block mt-3 text-sm">
          <span className="text-slate-500">Tip echipament</span>
          <select
            value={cat || ''}
            onChange={(e) => { setCat(e.target.value); setTargets({}); }}
            disabled={domCats.length === 0}
            className="mt-1 w-full px-3 py-2 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-sky-300 disabled:bg-slate-50"
          >
            {domCats.length === 0 && <option value="">— fără categorii —</option>}
            {domCats.map((x) => (
              <option key={x.key} value={x.key}>{x.label}</option>
            ))}
          </select>
        </label>

        {numeric.length > 0 ? (
          <div className="mt-3 grid grid-cols-2 gap-2">
            {numeric.map((s) => (
              <label key={s.key} className="text-sm">
                <span className="text-slate-500">
                  {s.label} {s.unit && `(${s.unit})`}
                </span>
                <input
                  type="number"
                  inputMode="decimal"
                  value={targets[s.key] ?? ''}
                  onChange={(e) => setTargets((t) => ({ ...t, [s.key]: e.target.value }))}
                  className="mt-1 w-full px-2 py-1.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-300"
                />
              </label>
            ))}
          </div>
        ) : (
          <p className="mt-3 text-sm text-slate-400">
            Acest tip nu are parametri numerici de selecție.
          </p>
        )}
      </div>

      <div className="mt-4 space-y-3">
        {numeric.length > 0 && ranked.length === 0 && (
          <p className="text-slate-400 text-sm py-8 text-center">
            Introdu cel puțin o valoare țintă pentru a primi recomandări.
          </p>
        )}
        {ranked.map(({ it, score }) => (
          <div key={it.id} className="bg-white rounded-2xl border border-slate-200 p-4">
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <div className="text-slate-500 text-sm">{it.manufacturer}</div>
                <div className="font-bold text-slate-900 truncate">{it.model}</div>
              </div>
              <div className="text-right shrink-0">
                <div
                  className={cls(
                    'text-lg font-bold',
                    score >= 85 ? 'text-emerald-600' : score >= 60 ? 'text-amber-500' : 'text-slate-400',
                  )}
                >
                  {score}%
                </div>
                <div className="text-[11px] text-slate-400">potrivire</div>
              </div>
            </div>
            <div className="mt-2">
              {numeric.map((s) => (
                <SpecRow key={s.key} s={s} value={it.specs[s.key]} />
              ))}
            </div>
            <button
              onClick={() => onSave(it.uid)}
              className={cls(
                'mt-2 text-sm font-medium inline-flex items-center gap-1',
                saved.has(it.uid) ? 'text-amber-600' : 'text-sky-700 hover:text-sky-900',
              )}
            >
              <Star size={15} fill={saved.has(it.uid) ? 'currentColor' : 'none'} />
              {saved.has(it.uid) ? 'În proiect' : 'Adaugă în proiect'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
function Btn({ onClick, children, primary }) {
  return (
    <button
      onClick={onClick}
      className={cls(
        'inline-flex items-center justify-center gap-1.5 font-medium py-2.5 rounded-xl text-sm',
        primary ? 'bg-sky-600 text-white' : 'bg-white border border-slate-200 text-slate-700',
      )}
    >
      {children}
    </button>
  );
}

function ProjectTab({ project }) {
  const { domains, catMap, domMap, equipment } = useCatalog();
  const [copied, setCopied] = useState('');
  const items = equipment.filter((it) => project.has(it.uid));
  const totalPieces = items.reduce((s, it) => s + (project.qty[it.uid] || 1), 0);

  const rows = () =>
    items.map((it) => {
      const c = catMap[it.category];
      const specs = c.specs
        .filter((s) => it.specs[s.key] !== undefined)
        .map((s) => `${s.label}: ${fmt(it.specs[s.key], s.unit)}`)
        .join(' | ');
      return {
        dom: domMap[c.domain]?.label || '',
        cat: c.label,
        mfg: it.manufacturer,
        model: it.model,
        qty: project.qty[it.uid] || 1,
        specs,
      };
    });

  const toCSV = () => {
    const head = ['Specialitate', 'Categorie', 'Producator', 'Model', 'Cantitate', 'Specificatii'];
    const data = rows().map((r) => [r.dom, r.cat, r.mfg, r.model, r.qty, r.specs]);
    return [head, ...data]
      .map((r) => r.map((x) => `"${String(x).replace(/"/g, '""')}"`).join(';'))
      .join('\n');
  };

  const flash = (k) => {
    setCopied(k);
    setTimeout(() => setCopied(''), 1500);
  };

  const download = () => {
    const blob = new Blob(['﻿' + toCSV()], { type: 'text/csv;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'lista-echipamente.csv';
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const copyCSV = async () => {
    try {
      await navigator.clipboard.writeText(toCSV());
      flash('csv');
    } catch {
      /* ignore */
    }
  };

  const shareLink = async () => {
    const link = `${window.location.origin}${window.location.pathname}#p=${encodeProject(project.qty)}`;
    try {
      await navigator.clipboard.writeText(link);
      flash('link');
    } catch {
      window.prompt('Copiază linkul proiectului:', link);
    }
  };

  const printPDF = () => {
    const r = rows();
    const body = r
      .map(
        (x, i) =>
          `<tr><td>${i + 1}</td><td>${esc(x.dom)}</td><td>${esc(x.cat)}</td><td>${esc(
            x.mfg,
          )}</td><td>${esc(x.model)}</td><td class="r">${x.qty}</td><td>${esc(x.specs)}</td></tr>`,
      )
      .join('');
    const html =
      `<!doctype html><html lang="ro"><head><meta charset="utf-8">` +
      `<title>Listă echipamente — InstalFinder</title><style>` +
      `body{font-family:Arial,Helvetica,sans-serif;margin:24px;color:#0f172a}` +
      `h1{font-size:18px;margin:0 0 4px}p{font-size:11px;color:#64748b;margin:0}` +
      `table{border-collapse:collapse;width:100%;font-size:12px;margin-top:14px}` +
      `th,td{border:1px solid #cbd5e1;padding:6px 8px;text-align:left;vertical-align:top}` +
      `th{background:#f1f5f9}.r{text-align:right}</style></head><body>` +
      `<h1>Listă echipamente — InstalFinder</h1>` +
      `<p>Date orientative — verifică la producător. ${r.length} poziții, ${totalPieces} buc.</p>` +
      `<table><thead><tr><th>#</th><th>Specialitate</th><th>Categorie</th>` +
      `<th>Producător</th><th>Model</th><th class="r">Cant.</th><th>Specificații</th></tr></thead>` +
      `<tbody>${body}</tbody></table>` +
      `<script>window.onload=function(){window.print()}<\/script></body></html>`;
    const w = window.open('', '_blank');
    if (!w) {
      window.alert('Permite ferestrele pop-up pentru a genera PDF-ul.');
      return;
    }
    w.document.write(html);
    w.document.close();
  };

  const grouped = domains
    .map((d) => ({ d, list: items.filter((it) => catMap[it.category].domain === d.key) }))
    .filter((g) => g.list.length > 0);

  return (
    <div className="pb-24">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-slate-900">
          Lista proiectului ({items.length} poz · {totalPieces} buc)
        </h2>
        {items.length > 0 && (
          <button
            onClick={project.clear}
            className="text-sm text-rose-600 inline-flex items-center gap-1"
          >
            <Trash2 size={15} /> Golește
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <p className="text-slate-400 text-sm py-12 text-center">
          Niciun echipament salvat. Apasă pe ⭐ la un echipament ca să-l adaugi aici.
        </p>
      ) : (
        <>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <Btn onClick={download} primary>
              <Download size={16} /> Export CSV
            </Btn>
            <Btn onClick={copyCSV}>
              {copied === 'csv' ? <Check size={16} className="text-emerald-600" /> : <Copy size={16} />}
              {copied === 'csv' ? 'Copiat' : 'Copiază CSV'}
            </Btn>
            <Btn onClick={printPDF}>
              <Printer size={16} /> PDF
            </Btn>
            <Btn onClick={shareLink}>
              {copied === 'link' ? <Check size={16} className="text-emerald-600" /> : <Link2 size={16} />}
              {copied === 'link' ? 'Link copiat' : 'Link'}
            </Btn>
          </div>

          {grouped.map(({ d, list }) => (
            <div key={d.key} className="mt-4">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400 mb-2">
                {d.label} ({list.length})
              </p>
              <div className="space-y-3">
                {list.map((it) => {
                  const n = project.qty[it.uid] || 1;
                  return (
                    <div key={it.id} className="bg-white rounded-2xl border border-slate-200 p-4">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <span className="text-[11px] font-semibold uppercase tracking-wide text-sky-700">
                            {catMap[it.category].label}
                          </span>
                          <div className="font-bold text-slate-900">{it.model}</div>
                          <div className="text-sm text-slate-500">{it.manufacturer}</div>
                        </div>
                        <button
                          onClick={() => project.toggle(it.uid)}
                          className="p-2 text-amber-500"
                          aria-label="Scoate din proiect"
                        >
                          <Star size={18} fill="currentColor" />
                        </button>
                      </div>
                      <div className="mt-3 flex items-center gap-2">
                        <span className="text-sm text-slate-500">Cantitate</span>
                        <div className="ml-auto inline-flex items-center gap-1">
                          <button
                            onClick={() => project.setOne(it.uid, n - 1)}
                            className="w-8 h-8 rounded-lg border border-slate-200 text-slate-700 inline-flex items-center justify-center"
                            aria-label="Scade cantitatea"
                          >
                            <Minus size={15} />
                          </button>
                          <input
                            type="number"
                            inputMode="numeric"
                            value={n}
                            onChange={(e) => project.setOne(it.uid, e.target.value)}
                            className="w-14 text-center px-1 py-1.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-300"
                          />
                          <button
                            onClick={() => project.setOne(it.uid, n + 1)}
                            className="w-8 h-8 rounded-lg border border-slate-200 text-slate-700 inline-flex items-center justify-center"
                            aria-label="Crește cantitatea"
                          >
                            <Plus size={15} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
function DataTab() {
  const { raw, source, categories, domMap, equipment, applyRaw, resetCatalog } = useCatalog();
  const [msg, setMsg] = useState(null);
  const catKeys = new Set(categories.map((c) => c.key));

  const loadJSON = (file) => {
    if (!file) return;
    const r = new FileReader();
    r.onload = () => {
      try {
        const parsed = JSON.parse(String(r.result));
        if (!Array.isArray(parsed.categories) || !Array.isArray(parsed.equipment)) {
          throw new Error('lipsesc „categories" sau „equipment"');
        }
        applyRaw(parsed, true);
        setMsg({ ok: true, text: `Catalog încărcat: ${parsed.equipment.length} echipamente.` });
      } catch (e) {
        setMsg({ ok: false, text: `JSON invalid: ${e.message}` });
      }
    };
    r.readAsText(file);
  };

  const importCSV = (file) => {
    if (!file) return;
    const r = new FileReader();
    r.onload = () => {
      const rows = parseEquipmentCSV(String(r.result));
      if (rows.length === 0) {
        setMsg({ ok: false, text: 'CSV gol sau antet lipsă (category;manufacturer;model;specs).' });
        return;
      }
      const valid = rows.filter((x) => catKeys.has(x.category));
      const skipped = rows.length - valid.length;
      if (valid.length === 0) {
        setMsg({ ok: false, text: 'Nicio linie validă — verifică coloana „category".' });
        return;
      }
      applyRaw({ ...raw, equipment: [...(raw.equipment || []), ...valid] }, true);
      setMsg({
        ok: true,
        text: `Adăugate ${valid.length} echipamente${skipped ? `, ${skipped} ignorate (categorie necunoscută)` : ''}.`,
      });
    };
    r.readAsText(file);
  };

  const downloadTemplate = () => {
    const sample =
      'category;manufacturer;model;specs\n' +
      'pompa;Grundfos;Exemplu 32-60;debit:9|inaltime:6|putere:110|conexiune:DN32';
    const blob = new Blob(['﻿' + sample], { type: 'text/csv;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'model-import.csv';
    a.click();
    URL.revokeObjectURL(a.href);
  };

  return (
    <div className="pb-24">
      <h2 className="font-bold text-slate-900">Catalog</h2>
      <p className="text-sm text-slate-500 mt-1">
        Sursă:{' '}
        <span
          className={cls(
            'font-semibold',
            source === 'personalizat' ? 'text-amber-600' : 'text-emerald-600',
          )}
        >
          {source === 'personalizat' ? 'personalizat (din aplicație)' : 'implicit (catalog.json)'}
        </span>{' '}
        · {equipment.length} echipamente · {categories.length} tipuri
      </p>

      {msg && (
        <div
          className={cls(
            'mt-3 text-sm rounded-xl p-3 border',
            msg.ok
              ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
              : 'bg-rose-50 border-rose-200 text-rose-700',
          )}
        >
          {msg.text}
        </div>
      )}

      <div className="mt-4 space-y-3">
        <label className="block bg-white border border-slate-200 rounded-2xl p-4 cursor-pointer">
          <div className="font-semibold text-slate-900 flex items-center gap-2">
            <Upload size={16} /> Încarcă catalog.json (înlocuiește tot)
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Același format ca <code>public/catalog.json</code>. Se salvează local.
          </p>
          <input
            type="file"
            accept=".json,application/json"
            className="hidden"
            onChange={(e) => loadJSON(e.target.files?.[0])}
          />
        </label>

        <label className="block bg-white border border-slate-200 rounded-2xl p-4 cursor-pointer">
          <div className="font-semibold text-slate-900 flex items-center gap-2">
            <Upload size={16} /> Import CSV (adaugă echipamente)
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Antet: <code>category;manufacturer;model;specs</code> — unde specs e{' '}
            <code>cheie:valoare|cheie:valoare</code>.
          </p>
          <input
            type="file"
            accept=".csv,text/csv"
            className="hidden"
            onChange={(e) => importCSV(e.target.files?.[0])}
          />
        </label>

        <div className="flex gap-2">
          <button
            onClick={downloadTemplate}
            className="flex-1 inline-flex items-center justify-center gap-1.5 bg-white border border-slate-200 text-slate-700 font-medium py-2.5 rounded-xl text-sm"
          >
            <Download size={16} /> Model CSV
          </button>
          {source === 'personalizat' && (
            <button
              onClick={() => {
                resetCatalog();
                setMsg({ ok: true, text: 'Revenit la catalogul implicit.' });
              }}
              className="flex-1 inline-flex items-center justify-center gap-1.5 bg-white border border-slate-200 text-rose-600 font-medium py-2.5 rounded-xl text-sm"
            >
              <RotateCcw size={16} /> Catalog implicit
            </button>
          )}
        </div>
      </div>

      <p className="mt-5 text-[11px] font-semibold uppercase tracking-wide text-slate-400 mb-2">
        Chei de categorie disponibile
      </p>
      <div className="bg-white border border-slate-200 rounded-2xl p-3 text-xs text-slate-600 space-y-1">
        {categories.map((c) => (
          <div key={c.key} className="flex justify-between gap-3">
            <code className="text-slate-800">{c.key}</code>
            <span className="text-slate-500 text-right">
              {domMap[c.domain]?.label} · {c.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
function GuideStep({ icon: Icon, title, children }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4">
      <h3 className="font-bold text-slate-900 flex items-center gap-2">
        <Icon size={17} className="text-sky-600" /> {title}
      </h3>
      <div className="mt-1.5 text-sm text-slate-600 space-y-1.5">{children}</div>
    </div>
  );
}

function GuideTab() {
  const { equipment } = useCatalog();
  return (
    <div className="pb-24 space-y-3">
      <div>
        <h2 className="font-bold text-slate-900">Ghid de utilizare</h2>
        <p className="text-sm text-slate-500 mt-1">
          InstalFinder caută și compară echipamente de instalații după parametri
          tehnici. Datele sunt orientative — verifică fișa oficială a producătorului.
        </p>
      </div>

      <GuideStep icon={Search} title="Caută">
        <p>Alege întâi <strong>Specialitatea</strong> (Sanitare, Termice, Electrice,
          HVAC, Incendiu), apoi <strong>Tipul de echipament</strong>.</p>
        <p>Scrie în câmpul de căutare după producător sau model. Apasă{' '}
          <strong>Filtre</strong> pentru intervale min–max pe parametri și folosește
          lista de <strong>sortare</strong> (relevanță, producător, model, sau orice
          parametru ↑↓).</p>
        <p>Apasă un card sau <strong>Detalii</strong> pentru toate specificațiile.</p>
        <p>Dacă un echipament nu e în catalog, folosește <strong>Caută pe net</strong>
          (pe card / în detalii / la zero rezultate) — deschide o căutare web
          pre-completată ca să găsești fișa tehnică oficială.</p>
      </GuideStep>

      <GuideStep icon={Wand2} title="Asistent de selecție">
        <p>Alege specialitatea și tipul, introdu <strong>punctul de funcționare</strong>
          dorit (ex. debit + înălțime). Primești echipamentele apropiate, ordonate
          după <strong>% de potrivire</strong>.</p>
      </GuideStep>

      <GuideStep icon={Scale} title="Comparație">
        <p>Bifează <strong>Compară</strong> pe câteva echipamente, apoi apasă bara
          <strong> Compară</strong> de jos pentru tabelul alăturat, spec cu spec.</p>
      </GuideStep>

      <GuideStep icon={FolderOpen} title="Proiect">
        <p>Apasă ⭐ ca să adaugi în proiect. În tab-ul <strong>Proiect</strong> setezi
          <strong> cantități</strong>, vezi totalurile și exporți: <strong>CSV</strong>,
          <strong> PDF</strong> (printabil) sau <strong>Link</strong> (proiectul codat
          în adresă, se adaugă la deschidere). Lista se salvează local pe dispozitiv.</p>
      </GuideStep>

      <GuideStep icon={FileText} title="F5 (licitații)">
        <p>Lipești tabelul din fișa <strong>F5</strong> (convertită în Word/Excel)
          sau încarci un <strong>CSV</strong>. Aplicația detectează cerințele
          (parametru, ≥/≤, valoare), tu <strong>confirmi maparea</strong> pe
          specificații, apoi caută în catalog echipamentul <strong>conform</strong>
          și generează tabelul <strong>Cerut vs. Ofertat</strong> (export CSV/PDF).</p>
        <p>Semi-automat — verifică valorile la fișa oficială a producătorului.</p>
      </GuideStep>

      <GuideStep icon={Database} title="Catalog (date proprii)">
        <p>Catalogul actual are <strong>{equipment.length} echipamente</strong>. Poți
          încărca un <code>catalog.json</code> propriu sau importa din{' '}
          <strong>CSV</strong> (<code>category;manufacturer;model;specs</code>) fără
          rebuild. Folosește „Model CSV" ca șablon și „Catalog implicit" pentru revenire.</p>
      </GuideStep>

      <GuideStep icon={Moon} title="Temă, instalare & date">
        <p>Comutatorul ☀/☾ din antet schimbă <strong>tema luminoasă/întunecată</strong>
          (se reține).</p>
        <p>Aplicația e <strong>instalabilă</strong> (PWA): în Chrome/Edge, din meniul
          browserului → „Instalează", apare cu iconiță proprie și{' '}
          <strong>merge offline</strong> (catalogul e ținut în cache). Privată —
          rulează doar pe dispozitivul tău.</p>
        <p>Specificațiile sunt <strong>orientative</strong>, la nivel de catalog —
          nu înlocuiesc fișele tehnice oficiale.</p>
      </GuideStep>
    </div>
  );
}

/* ------------------------------------------------------------------ */
const OP_SYM = { min: '≥', max: '≤', '≈': '≈' };

function F5Tab() {
  const { categories, catMap, equipment } = useCatalog();
  const [posName, setPosName] = useState('');
  const [cat, setCat] = useState(categories[0]?.key || '');
  const [rawText, setRawText] = useState('');
  const [reqs, setReqs] = useState([]);
  const [chosen, setChosen] = useState(null);
  const [msg, setMsg] = useState(null);
  const [copied, setCopied] = useState('');

  const numSpecs = useMemo(
    () => (catMap[cat] ? catMap[cat].specs.filter((s) => s.filter) : []),
    [catMap, cat],
  );

  const guessSpec = (name) => {
    const n = normTxt(name);
    for (const s of numSpecs) {
      const l = normTxt(s.label);
      if (n.includes(l) || (n && l.includes(n.split(' ')[0]))) return s.key;
    }
    return '';
  };

  const analyze = (txt) => {
    const parsed = parseF5(txt).map((r) => ({ ...r, specKey: guessSpec(r.name) }));
    setReqs(parsed);
    setChosen(null);
    setMsg(
      parsed.length
        ? { ok: true, text: `${parsed.length} cerințe detectate. Verifică maparea pe specificație și operatorul.` }
        : { ok: false, text: 'Nu am găsit rânduri cu valori numerice. Lipește tabelul (parametru + valoare) sau adaugă manual.' },
    );
  };

  const importCSV = (file) => {
    if (!file) return;
    const r = new FileReader();
    r.onload = () => { setRawText(String(r.result)); analyze(String(r.result)); };
    r.readAsText(file);
  };

  const setReq = (i, k, v) =>
    setReqs((rs) => rs.map((r, j) => (j === i ? { ...r, [k]: v } : r)));
  const delReq = (i) => setReqs((rs) => rs.filter((_, j) => j !== i));
  const addReq = () =>
    setReqs((rs) => [...rs, { name: '', op: 'min', value: '', um: '', specKey: '' }]);

  const conf = (r, v) => {
    const val = parseFloat(r.value);
    if (!r.specKey || typeof v !== 'number' || isNaN(val)) return null;
    if (r.op === 'min') return v >= val;
    if (r.op === 'max') return v <= val;
    return Math.abs(v - val) <= Math.abs(val) * 0.05 + 1e-9;
  };

  const mapped = reqs.filter((r) => r.specKey && !isNaN(parseFloat(r.value)));

  const ranked = useMemo(() => {
    if (mapped.length === 0) return [];
    return equipment
      .filter((it) => it.category === cat)
      .map((it) => {
        let pass = 0;
        let fail = 0;
        for (const r of mapped) {
          conf(r, it.specs[r.specKey]) === true ? pass++ : fail++;
        }
        return { it, pass, fail, ok: fail === 0 };
      })
      .sort((a, b) => b.ok - a.ok || b.pass - a.pass || a.fail - b.fail)
      .slice(0, 12);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [equipment, cat, reqs]);

  const chosenItem = chosen ? equipment.find((it) => it.uid === chosen) : null;

  const rowsFor = (it) =>
    reqs.map((r, i) => {
      const sp = catMap[cat]?.specs.find((s) => s.key === r.specKey);
      const v = it && r.specKey ? it.specs[r.specKey] : undefined;
      const c = it ? conf(r, v) : null;
      return {
        n: i + 1,
        name: r.name || (sp ? sp.label : '—'),
        cerut: `${OP_SYM[r.op] || ''} ${r.value} ${r.um || (sp ? sp.unit : '')}`.trim(),
        um: r.um || (sp ? sp.unit : ''),
        ofertat: v === undefined ? '—' : fmt(v, sp ? sp.unit : ''),
        verdict: c === null ? 'verificare manuală' : c ? 'Conform' : 'Neconform',
      };
    });

  const toCSV = () => {
    if (!chosenItem) return '';
    const head = ['Nr', 'Parametru', 'Cerut', 'U.M.', 'Ofertat', 'Conformitate'];
    const meta = [
      ['Poziție F5', posName || catMap[cat]?.label || ''],
      ['Echipament ofertat', `${chosenItem.manufacturer} ${chosenItem.model}`],
    ];
    const data = rowsFor(chosenItem).map((r) => [r.n, r.name, r.cerut, r.um, r.ofertat, r.verdict]);
    return [...meta, [], head, ...data]
      .map((row) => row.map((x) => `"${String(x).replace(/"/g, '""')}"`).join(';'))
      .join('\n');
  };

  const flash = (k) => { setCopied(k); setTimeout(() => setCopied(''), 1500); };

  const download = () => {
    const blob = new Blob(['﻿' + toCSV()], { type: 'text/csv;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'fisa-F5.csv';
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const printF5 = () => {
    if (!chosenItem) return;
    const body = rowsFor(chosenItem)
      .map(
        (r) =>
          `<tr><td>${r.n}</td><td>${esc(r.name)}</td><td>${esc(r.cerut)}</td>` +
          `<td>${esc(r.ofertat)}</td><td>${esc(r.verdict)}</td></tr>`,
      )
      .join('');
    const html =
      `<!doctype html><html lang="ro"><head><meta charset="utf-8">` +
      `<title>Fișă tehnică F5</title><style>` +
      `body{font-family:Arial,Helvetica,sans-serif;margin:24px;color:#0f172a}` +
      `h1{font-size:17px;margin:0 0 4px}p{font-size:12px;margin:2px 0;color:#334155}` +
      `table{border-collapse:collapse;width:100%;font-size:12px;margin-top:12px}` +
      `th,td{border:1px solid #cbd5e1;padding:6px 8px;text-align:left;vertical-align:top}` +
      `th{background:#f1f5f9}</style></head><body>` +
      `<h1>Fișă tehnică (F5) — comparativ</h1>` +
      `<p><b>Poziție:</b> ${esc(posName || catMap[cat]?.label || '')}</p>` +
      `<p><b>Echipament ofertat:</b> ${esc(chosenItem.manufacturer)} ${esc(chosenItem.model)}</p>` +
      `<p style="color:#64748b">Date orientative — a se verifica la fișa oficială a producătorului.</p>` +
      `<table><thead><tr><th>Nr</th><th>Specificație impusă</th><th>Cerut</th>` +
      `<th>Ofertat</th><th>Conformitate</th></tr></thead><tbody>${body}</tbody></table>` +
      `<script>window.onload=function(){window.print()}<\/script></body></html>`;
    const w = window.open('', '_blank');
    if (!w) { window.alert('Permite ferestrele pop-up pentru a genera PDF-ul.'); return; }
    w.document.write(html);
    w.document.close();
  };

  return (
    <div className="pb-24">
      <h2 className="font-bold text-slate-900">F5 — fișă tehnică (licitații)</h2>
      <p className="text-sm text-slate-500 mt-1">
        Lipești tabelul din F5 (Word/Excel) sau încarci CSV → confirmi cerințele →
        aplicația caută în catalog echipamentul conform. Semi-automat: verifică
        valorile la fișa oficială a producătorului.
      </p>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
        <label className="text-sm">
          <span className="text-slate-500">Denumire poziție (opțional)</span>
          <input
            value={posName}
            onChange={(e) => setPosName(e.target.value)}
            placeholder="ex. Pompă circulație circuit încălzire"
            className="mt-1 w-full px-3 py-2 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-sky-300"
          />
        </label>
        <label className="text-sm">
          <span className="text-slate-500">Tip echipament (în catalog)</span>
          <select
            value={cat}
            onChange={(e) => {
              setCat(e.target.value);
              setReqs((rs) => rs.map((r) => ({ ...r, specKey: '' })));
              setChosen(null);
            }}
            className="mt-1 w-full px-3 py-2 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-sky-300"
          >
            {categories.map((c) => (
              <option key={c.key} value={c.key}>{c.label}</option>
            ))}
          </select>
        </label>
      </div>

      <textarea
        value={rawText}
        onChange={(e) => setRawText(e.target.value)}
        rows={5}
        placeholder={'Lipește aici tabelul din F5 (un rând = o cerință), ex.:\nPutere termică minim 24 kW\nDebit ≥ 9 m³/h\nNivel zgomot max 45 dB'}
        className="mt-3 w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
      />
      <div className="mt-2 grid grid-cols-2 gap-2">
        <Btn onClick={() => analyze(rawText)} primary>
          <FileText size={16} /> Analizează textul
        </Btn>
        <label className="inline-flex items-center justify-center gap-1.5 font-medium py-2.5 rounded-xl text-sm bg-white border border-slate-200 text-slate-700 cursor-pointer">
          <Upload size={16} /> Încarcă CSV
          <input
            type="file"
            accept=".csv,text/csv"
            className="hidden"
            onChange={(e) => importCSV(e.target.files?.[0])}
          />
        </label>
      </div>

      {msg && (
        <div
          className={cls(
            'mt-3 text-sm rounded-xl p-3 border',
            msg.ok ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                   : 'bg-rose-50 border-rose-200 text-rose-700',
          )}
        >
          {msg.text}
        </div>
      )}

      {reqs.length > 0 && (
        <>
          <p className="mt-4 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
            Cerințe (confirmă maparea)
          </p>
          <div className="mt-2 space-y-2">
            {reqs.map((r, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-xl p-3 grid grid-cols-12 gap-2 items-end">
                <label className="col-span-12 sm:col-span-4 text-xs">
                  <span className="text-slate-500">Parametru</span>
                  <input
                    value={r.name}
                    onChange={(e) => setReq(i, 'name', e.target.value)}
                    className="mt-1 w-full px-2 py-1.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
                  />
                </label>
                <label className="col-span-5 sm:col-span-3 text-xs">
                  <span className="text-slate-500">Specificație</span>
                  <select
                    value={r.specKey}
                    onChange={(e) => setReq(i, 'specKey', e.target.value)}
                    className="mt-1 w-full px-2 py-1.5 rounded-lg border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-sky-300"
                  >
                    <option value="">(ignoră)</option>
                    {numSpecs.map((s) => (
                      <option key={s.key} value={s.key}>{s.label}</option>
                    ))}
                  </select>
                </label>
                <label className="col-span-3 sm:col-span-2 text-xs">
                  <span className="text-slate-500">Op.</span>
                  <select
                    value={r.op}
                    onChange={(e) => setReq(i, 'op', e.target.value)}
                    className="mt-1 w-full px-2 py-1.5 rounded-lg border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-sky-300"
                  >
                    <option value="min">≥ min</option>
                    <option value="max">≤ max</option>
                    <option value="≈">≈ egal</option>
                  </select>
                </label>
                <label className="col-span-3 sm:col-span-2 text-xs">
                  <span className="text-slate-500">Valoare</span>
                  <input
                    type="number"
                    inputMode="decimal"
                    value={r.value}
                    onChange={(e) => setReq(i, 'value', e.target.value)}
                    className="mt-1 w-full px-2 py-1.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
                  />
                </label>
                <div className="col-span-1 flex justify-end">
                  <button
                    onClick={() => delReq(i)}
                    className="p-2 text-rose-600"
                    aria-label="Șterge cerința"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button onClick={addReq} className="mt-2 text-sm font-medium text-sky-700">
            + Adaugă cerință
          </button>
        </>
      )}

      {reqs.length > 0 && (
        <>
          <p className="mt-5 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
            Echipamente potrivite din catalog
          </p>
          {mapped.length === 0 ? (
            <p className="text-slate-400 text-sm py-4">
              Mapează cel puțin o cerință pe o specificație și pune o valoare.
            </p>
          ) : ranked.length === 0 ? (
            <p className="text-slate-400 text-sm py-4">
              Nicio potrivire în catalog pentru acest tip.
            </p>
          ) : (
            <div className="mt-2 space-y-2">
              {ranked.map(({ it, pass, fail, ok }) => (
                <div
                  key={it.id}
                  className={cls(
                    'bg-white border rounded-xl p-3 flex items-center justify-between gap-2',
                    chosen === it.uid ? 'border-sky-500' : 'border-slate-200',
                  )}
                >
                  <div className="min-w-0">
                    <div className="font-bold text-slate-900 truncate">{it.model}</div>
                    <div className="text-sm text-slate-500">{it.manufacturer}</div>
                    <div className="text-xs mt-0.5">
                      <span className={ok ? 'text-emerald-600 font-semibold' : 'text-amber-600'}>
                        {ok ? 'Conform' : `${pass}/${pass + fail} cerințe`}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setChosen(it.uid)}
                    className={cls(
                      'shrink-0 px-3 py-1.5 rounded-lg text-sm font-medium',
                      chosen === it.uid ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-700',
                    )}
                  >
                    {chosen === it.uid ? 'Ales' : 'Alege'}
                  </button>
                </div>
              ))}
            </div>
          )}
          <a
            href={webSearch(`${posName || catMap[cat]?.label || ''} fișă tehnică`)}
            target="_blank"
            rel="noreferrer"
            className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-800"
          >
            <Globe size={14} /> Caută pe net (dacă nu e în catalog)
          </a>
        </>
      )}

      {chosenItem && (
        <>
          <p className="mt-5 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
            F5 — Cerut vs. Ofertat
          </p>
          <div className="mt-2 bg-white border border-slate-200 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 text-slate-500">
                    <th className="text-left p-2 font-medium">Specificație</th>
                    <th className="text-left p-2 font-medium">Cerut</th>
                    <th className="text-left p-2 font-medium">Ofertat</th>
                    <th className="text-left p-2 font-medium">Conf.</th>
                  </tr>
                </thead>
                <tbody>
                  {rowsFor(chosenItem).map((r) => (
                    <tr key={r.n} className="border-t border-slate-100">
                      <td className="p-2 text-slate-700">{r.name}</td>
                      <td className="p-2 text-slate-700">{r.cerut}</td>
                      <td className="p-2 font-medium text-slate-900">{r.ofertat}</td>
                      <td
                        className={cls(
                          'p-2 font-medium',
                          r.verdict === 'Conform' ? 'text-emerald-600'
                            : r.verdict === 'Neconform' ? 'text-rose-600' : 'text-slate-400',
                        )}
                      >
                        {r.verdict}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <Btn onClick={download} primary>
              <Download size={16} /> Export CSV
            </Btn>
            <Btn onClick={printF5}>
              <Printer size={16} /> PDF / print
            </Btn>
          </div>
        </>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
const TABS = [
  { key: 'search', label: 'Caută', icon: Search },
  { key: 'assistant', label: 'Asistent', icon: Wand2 },
  { key: 'project', label: 'Proiect', icon: FolderOpen },
  { key: 'f5', label: 'F5', icon: FileText },
  { key: 'data', label: 'Catalog', icon: Database },
  { key: 'guide', label: 'Ghid', icon: BookOpen },
];

function AppShell() {
  const { equipment } = useCatalog();
  const [tab, setTab] = useState('search');
  const project = useProject();
  const [dark, toggleDark] = useTheme();
  const [compareSet, toggleCompare, setCompareSet] = useLocalSet('instalfinder.compare');
  const [showCompare, setShowCompare] = useState(false);
  const [showBanner, setShowBanner] = useState(() => {
    try {
      return localStorage.getItem('instalfinder.banner') !== '0';
    } catch {
      return true;
    }
  });
  const closeBanner = () => {
    setShowBanner(false);
    try {
      localStorage.setItem('instalfinder.banner', '0');
    } catch {
      /* ignore */
    }
  };

  const compareItems = equipment.filter((it) => compareSet.has(it.uid));
  const projectCount = equipment.filter((it) => project.has(it.uid)).length;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="bg-gradient-to-r from-sky-700 to-cyan-600 text-white">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h1 className="text-xl font-extrabold tracking-tight">InstalFinder</h1>
            <p className="text-sky-100 text-sm">
              Echipamente pentru instalații — sanitare, termice, electrice, HVAC, incendiu
            </p>
          </div>
          <button
            onClick={toggleDark}
            aria-label={dark ? 'Temă luminoasă' : 'Temă întunecată'}
            className="shrink-0 p-2 rounded-full bg-white/15 hover:bg-white/25 transition"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </header>

      {showBanner && (
        <div className="bg-amber-50 border-b border-amber-200 text-amber-800 text-xs">
          <div className="max-w-3xl mx-auto px-4 py-2 flex items-start gap-2">
            <span>
              <strong>Date orientative.</strong> Catalogul ({equipment.length} echipamente)
              se încarcă din <code>public/catalog.json</code> — editabil. Specificațiile nu
              înlocuiesc fișele tehnice oficiale; verifică la producător înainte de proiectare.
            </span>
            <button
              onClick={closeBanner}
              className="ml-auto shrink-0 p-1 hover:text-amber-950"
              aria-label="Închide"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      )}

      <main className="max-w-3xl mx-auto px-4 py-4">
        {tab === 'search' && (
          <SearchTab
            saved={project}
            onSave={project.toggle}
            compareSet={compareSet}
            onCompare={toggleCompare}
          />
        )}
        {tab === 'assistant' && <AssistantTab saved={project} onSave={project.toggle} />}
        {tab === 'project' && <ProjectTab project={project} />}
        {tab === 'f5' && <F5Tab />}
        {tab === 'data' && <DataTab />}
        {tab === 'guide' && <GuideTab />}
      </main>

      {compareItems.length > 0 && tab === 'search' && (
        <div className="fixed bottom-16 inset-x-0 px-4 z-20">
          <div className="max-w-3xl mx-auto flex gap-2">
            <button
              onClick={() => setShowCompare(true)}
              className="flex-1 bg-slate-900 text-white font-medium py-3 rounded-xl inline-flex items-center justify-center gap-2 shadow-lg"
            >
              <Scale size={18} /> Compară ({compareItems.length})
            </button>
            <button
              onClick={() => setCompareSet(new Set())}
              className="px-4 bg-white border border-slate-200 text-slate-600 rounded-xl shadow-lg"
              aria-label="Golește comparația"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      )}

      {showCompare && (
        <CompareModal items={compareItems} onClose={() => setShowCompare(false)} />
      )}

      <nav className="fixed bottom-0 inset-x-0 bg-white border-t border-slate-200 z-30">
        <div className="max-w-3xl mx-auto grid grid-cols-6">
          {TABS.map((t) => {
            const Icon = t.icon;
            const active = tab === t.key;
            return (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={cls(
                  'relative py-2.5 flex flex-col items-center gap-0.5 text-xs font-medium',
                  active ? 'text-sky-700' : 'text-slate-400',
                )}
              >
                <Icon size={20} />
                {t.label}
                {t.key === 'project' && projectCount > 0 && (
                  <span className="absolute top-1 right-1/2 translate-x-5 bg-amber-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                    {projectCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

/* ------------------------------------------------------------------ */
function Centered({ children }) {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-center">
      <div className="max-w-sm">{children}</div>
    </div>
  );
}

export default function EquipmentApp() {
  const [catalog, setCatalog] = useState(null);
  const [raw, setRaw] = useState(null);
  const [source, setSource] = useState('implicit');
  const [error, setError] = useState(null);

  const applyRaw = useCallback((rawObj, persist) => {
    const built = buildCatalog(rawObj);
    setRaw(rawObj);
    setCatalog(built);
    if (persist) {
      try {
        localStorage.setItem('instalfinder.catalog', JSON.stringify(rawObj));
      } catch {
        /* ignore */
      }
      setSource('personalizat');
    }
  }, []);

  const loadDefault = useCallback(() => {
    const url = `${import.meta.env.BASE_URL}catalog.json`;
    fetch(url)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((rawObj) => {
        setRaw(rawObj);
        setCatalog(buildCatalog(rawObj));
        setSource('implicit');
      })
      .catch((e) => setError(e.message || String(e)));
  }, []);

  const resetCatalog = useCallback(() => {
    try {
      localStorage.removeItem('instalfinder.catalog');
    } catch {
      /* ignore */
    }
    loadDefault();
  }, [loadDefault]);

  useEffect(() => {
    let override = null;
    try {
      const s = localStorage.getItem('instalfinder.catalog');
      if (s) override = JSON.parse(s);
    } catch {
      /* ignore */
    }
    if (override && Array.isArray(override.categories)) {
      setRaw(override);
      setCatalog(buildCatalog(override));
      setSource('personalizat');
      return;
    }
    loadDefault();
  }, [loadDefault]);

  if (error) {
    return (
      <Centered>
        <h1 className="text-lg font-bold text-slate-900">Nu s-a putut încărca catalogul</h1>
        <p className="mt-2 text-sm text-slate-500">
          Fișierul <code>public/catalog.json</code> nu a putut fi citit ({error}).
          Rulează aplicația cu <code>npm run dev</code> și verifică fișierul.
        </p>
      </Centered>
    );
  }

  if (!catalog) {
    return (
      <Centered>
        <div className="animate-pulse text-slate-400">Se încarcă catalogul…</div>
      </Centered>
    );
  }

  return (
    <CatalogCtx.Provider value={{ ...catalog, raw, source, applyRaw, resetCatalog }}>
      <AppShell />
    </CatalogCtx.Provider>
  );
}
