import React, { useMemo, useState, useEffect, useContext, createContext } from 'react';
import {
  Search, Star, SlidersHorizontal, Scale, FolderOpen, Download,
  Copy, X, ExternalLink, Wand2, Trash2, Building2, Check, ArrowDownUp,
  Printer, Link2, Minus, Plus,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Datele vin din public/catalog.json (editabil, fara a atinge codul).*/
/* ------------------------------------------------------------------ */
const CatalogCtx = createContext(null);
const useCatalog = () => useContext(CatalogCtx);

const safeUrl = (u) =>
  typeof u === 'string' && /^https?:\/\//i.test(u) ? u : '#';

function buildCatalog(raw) {
  const domains = raw.domains || [];
  const categories = raw.categories || [];
  const manufacturers = raw.manufacturers || {};
  const domMap = Object.fromEntries(domains.map((d) => [d.key, d]));
  const catMap = Object.fromEntries(categories.map((c) => [c.key, c]));
  const equipment = [];
  let id = 0;
  for (const e of raw.equipment || []) {
    if (!catMap[e.category]) {
      console.warn(
        `[catalog] Echipament ignorat — categorie necunoscută "${e.category}" (${e.manufacturer} ${e.model})`,
      );
      continue;
    }
    equipment.push({
      ...e,
      id: ++id,
      uid: `${e.manufacturer}|${e.category}|${e.model}`,
      url: safeUrl(manufacturers[e.manufacturer]),
    });
  }
  return { domains, categories, domMap, catMap, equipment };
}

const fmt = (v, unit) => (unit ? `${v} ${unit}` : `${v}`);
const cls = (...a) => a.filter(Boolean).join(' ');
const esc = (s) =>
  String(s).replace(/[&<>"]/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[m]));
const encodeProject = (obj) =>
  encodeURIComponent(btoa(unescape(encodeURIComponent(JSON.stringify(obj)))));
const decodeProject = (s) =>
  JSON.parse(decodeURIComponent(escape(atob(decodeURIComponent(s)))));

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
  return { qty, has, count: Object.keys(qty).length, toggle, setOne, clear };
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

          <a
            href={item.url}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-slate-800"
          >
            Pagina producătorului <ExternalLink size={13} />
          </a>
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
                      className="w-full px-2 py-1.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-300"
                    />
                  </div>
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
        <p className="text-slate-400 text-sm py-10 text-center">
          Niciun echipament nu corespunde criteriilor.
        </p>
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
            value={domain}
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
            value={cat}
            onChange={(e) => { setCat(e.target.value); setTargets({}); }}
            className="mt-1 w-full px-3 py-2 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-sky-300"
          >
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

  const Btn = ({ onClick, children, primary }) => (
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
const TABS = [
  { key: 'search', label: 'Caută', icon: Search },
  { key: 'assistant', label: 'Asistent', icon: Wand2 },
  { key: 'project', label: 'Proiect', icon: FolderOpen },
];

function AppShell() {
  const { equipment } = useCatalog();
  const [tab, setTab] = useState('search');
  const project = useProject();
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

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="bg-gradient-to-r from-sky-700 to-cyan-600 text-white">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <h1 className="text-xl font-extrabold tracking-tight">InstalFinder</h1>
          <p className="text-sky-100 text-sm">
            Echipamente pentru instalații — sanitare, termice, electrice, HVAC, incendiu
          </p>
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
        <div className="max-w-3xl mx-auto grid grid-cols-3">
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
                {t.key === 'project' && project.count > 0 && (
                  <span className="absolute top-1 right-1/2 translate-x-5 bg-amber-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                    {project.count}
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
  const [error, setError] = useState(null);

  useEffect(() => {
    const url = `${import.meta.env.BASE_URL}catalog.json`;
    fetch(url)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((raw) => setCatalog(buildCatalog(raw)))
      .catch((e) => setError(e.message || String(e)));
  }, []);

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
    <CatalogCtx.Provider value={catalog}>
      <AppShell />
    </CatalogCtx.Provider>
  );
}
