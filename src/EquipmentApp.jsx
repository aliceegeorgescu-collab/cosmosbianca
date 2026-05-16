import React, { useMemo, useState, useEffect } from 'react';
import {
  Search, Star, SlidersHorizontal, Scale, FolderOpen, Download,
  Copy, X, ExternalLink, Wand2, Trash2, Building2, Check,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Domenii (specialitati) -> Categorii (tipuri echipament) -> Date.   */
/* ------------------------------------------------------------------ */
const DOMAINS = [
  { key: 'sanitare', label: 'Sanitare' },
  { key: 'termice', label: 'Termice' },
  { key: 'electrice', label: 'Electrice' },
  { key: 'hvac', label: 'HVAC' },
  { key: 'incendiu', label: 'Incendiu' },
];
const DOM = Object.fromEntries(DOMAINS.map((d) => [d.key, d]));

/* Specs marcate filter:true apar ca filtre numerice si in Asistent.   */
const CATEGORIES = [
  /* ---------- SANITARE ---------- */
  {
    key: 'pompa_apa', domain: 'sanitare', label: 'Pompă / hidrofor apă',
    specs: [
      { key: 'debit', label: 'Debit', unit: 'm³/h', filter: true },
      { key: 'inaltime', label: 'Înălțime de pompare', unit: 'm', filter: true },
      { key: 'putere', label: 'Putere', unit: 'W' },
      { key: 'conexiune', label: 'Conexiune', unit: '', text: true },
    ],
  },
  {
    key: 'boiler', domain: 'sanitare', label: 'Boiler ACM',
    specs: [
      { key: 'volum', label: 'Volum', unit: 'l', filter: true },
      { key: 'serpentine', label: 'Serpentine', unit: '', filter: true },
      { key: 'pmax', label: 'Presiune max', unit: 'bar' },
      { key: 'material', label: 'Material', unit: '', text: true },
    ],
  },
  {
    key: 'vas_hidrofor', domain: 'sanitare', label: 'Vas hidrofor',
    specs: [
      { key: 'volum', label: 'Volum', unit: 'l', filter: true },
      { key: 'pmax', label: 'Presiune max', unit: 'bar', filter: true },
      { key: 'racord', label: 'Racord', unit: '', text: true },
      { key: 'tip', label: 'Tip', unit: '', text: true },
    ],
  },

  /* ---------- TERMICE ---------- */
  {
    key: 'centrala', domain: 'termice', label: 'Centrală termică',
    specs: [
      { key: 'putere', label: 'Putere', unit: 'kW', filter: true },
      { key: 'combustibil', label: 'Combustibil', unit: '', text: true },
      { key: 'randament', label: 'Randament', unit: '%', filter: true },
      { key: 'acm', label: 'Debit ACM', unit: 'l/min' },
    ],
  },
  {
    key: 'pompacaldura', domain: 'termice', label: 'Pompă de căldură',
    specs: [
      { key: 'putere', label: 'Putere termică', unit: 'kW', filter: true },
      { key: 'cop', label: 'COP', unit: '', filter: true },
      { key: 'scop', label: 'SCOP', unit: '' },
      { key: 'tip', label: 'Tip', unit: '', text: true },
    ],
  },
  {
    key: 'pompa', domain: 'termice', label: 'Pompă de circulație',
    specs: [
      { key: 'debit', label: 'Debit', unit: 'm³/h', filter: true },
      { key: 'inaltime', label: 'Înălțime de pompare', unit: 'm', filter: true },
      { key: 'putere', label: 'Putere', unit: 'W' },
      { key: 'conexiune', label: 'Conexiune', unit: '', text: true },
    ],
  },
  {
    key: 'schimbator', domain: 'termice', label: 'Schimbător de căldură',
    specs: [
      { key: 'putere', label: 'Putere', unit: 'kW', filter: true },
      { key: 'debit', label: 'Debit primar', unit: 'm³/h', filter: true },
      { key: 'placi', label: 'Nr. plăci', unit: '' },
      { key: 'pmax', label: 'Presiune max', unit: 'bar' },
    ],
  },
  {
    key: 'vas', domain: 'termice', label: 'Vas de expansiune',
    specs: [
      { key: 'volum', label: 'Volum', unit: 'l', filter: true },
      { key: 'pmax', label: 'Presiune max', unit: 'bar', filter: true },
      { key: 'tip', label: 'Tip', unit: '', text: true },
      { key: 'racord', label: 'Racord', unit: '', text: true },
    ],
  },

  /* ---------- ELECTRICE ---------- */
  {
    key: 'tablou', domain: 'electrice', label: 'Tablou electric',
    specs: [
      { key: 'curent', label: 'Curent nominal', unit: 'A', filter: true },
      { key: 'circuite', label: 'Nr. circuite', unit: '', filter: true },
      { key: 'ip', label: 'Grad protecție', unit: '', text: true },
      { key: 'montaj', label: 'Montaj', unit: '', text: true },
    ],
  },
  {
    key: 'mcb', domain: 'electrice', label: 'Întrerupător automat',
    specs: [
      { key: 'curent', label: 'Curent nominal', unit: 'A', filter: true },
      { key: 'poli', label: 'Poli', unit: '', filter: true },
      { key: 'curba', label: 'Curbă', unit: '', text: true },
      { key: 'capacitate', label: 'Capacitate rupere', unit: 'kA' },
    ],
  },
  {
    key: 'cablu', domain: 'electrice', label: 'Cablu electric',
    specs: [
      { key: 'sectiune', label: 'Secțiune', unit: 'mm²', filter: true },
      { key: 'conductoare', label: 'Nr. conductoare', unit: '', filter: true },
      { key: 'tip', label: 'Tip', unit: '', text: true },
      { key: 'tensiune', label: 'Tensiune', unit: 'V' },
    ],
  },
  {
    key: 'ups', domain: 'electrice', label: 'UPS',
    specs: [
      { key: 'putere', label: 'Putere', unit: 'VA', filter: true },
      { key: 'autonomie', label: 'Autonomie', unit: 'min', filter: true },
      { key: 'topologie', label: 'Topologie', unit: '', text: true },
      { key: 'iesiri', label: 'Ieșiri', unit: '' },
    ],
  },

  /* ---------- HVAC ---------- */
  {
    key: 'chiller', domain: 'hvac', label: 'Chiller',
    specs: [
      { key: 'frig', label: 'Putere frig', unit: 'kW', filter: true },
      { key: 'eer', label: 'EER', unit: '', filter: true },
      { key: 'seer', label: 'SEER', unit: '' },
      { key: 'agent', label: 'Agent frigorific', unit: '', text: true },
    ],
  },
  {
    key: 'ventilo', domain: 'hvac', label: 'Ventiloconvector',
    specs: [
      { key: 'frig', label: 'Putere frig', unit: 'kW', filter: true },
      { key: 'caldura', label: 'Putere căldură', unit: 'kW', filter: true },
      { key: 'aer', label: 'Debit aer', unit: 'm³/h' },
      { key: 'montaj', label: 'Montaj', unit: '', text: true },
    ],
  },
  {
    key: 'cta', domain: 'hvac', label: 'Centrală tratare aer',
    specs: [
      { key: 'aer', label: 'Debit aer', unit: 'm³/h', filter: true },
      { key: 'recuperare', label: 'Recuperare căldură', unit: '%', filter: true },
      { key: 'putere', label: 'Putere electrică', unit: 'kW' },
      { key: 'filtrare', label: 'Clasă filtrare', unit: '', text: true },
    ],
  },
  {
    key: 'ventilator', domain: 'hvac', label: 'Ventilator tubulatură',
    specs: [
      { key: 'aer', label: 'Debit aer', unit: 'm³/h', filter: true },
      { key: 'presiune', label: 'Presiune statică', unit: 'Pa', filter: true },
      { key: 'putere', label: 'Putere', unit: 'W' },
      { key: 'tip', label: 'Tip', unit: '', text: true },
    ],
  },

  /* ---------- INCENDIU ---------- */
  {
    key: 'detector', domain: 'incendiu', label: 'Detector incendiu',
    specs: [
      { key: 'acoperire', label: 'Suprafață acoperită', unit: 'm²', filter: true },
      { key: 'tip', label: 'Tip', unit: '', text: true },
      { key: 'tensiune', label: 'Tensiune', unit: 'V' },
      { key: 'interfata', label: 'Conectare', unit: '', text: true },
    ],
  },
  {
    key: 'centrala_psi', domain: 'incendiu', label: 'Centrală detecție incendiu',
    specs: [
      { key: 'bucle', label: 'Bucle', unit: '', filter: true },
      { key: 'zone', label: 'Zone', unit: '', filter: true },
      { key: 'tip', label: 'Tip', unit: '', text: true },
      { key: 'iesiri', label: 'Ieșiri sirene', unit: '' },
    ],
  },
  {
    key: 'hidrant', domain: 'incendiu', label: 'Hidrant interior',
    specs: [
      { key: 'debit', label: 'Debit', unit: 'l/min', filter: true },
      { key: 'presiune', label: 'Presiune', unit: 'bar', filter: true },
      { key: 'dn', label: 'Diametru', unit: '', text: true },
      { key: 'furtun', label: 'Lungime furtun', unit: 'm' },
    ],
  },
  {
    key: 'sprinkler', domain: 'incendiu', label: 'Sprinkler',
    specs: [
      { key: 'k', label: 'Factor K', unit: '', filter: true },
      { key: 'tdecl', label: 'Temp. declanșare', unit: '°C', filter: true },
      { key: 'orientare', label: 'Orientare', unit: '', text: true },
      { key: 'racord', label: 'Racord', unit: '', text: true },
    ],
  },
  {
    key: 'pompa_incendiu', domain: 'incendiu', label: 'Pompă de incendiu',
    specs: [
      { key: 'debit', label: 'Debit', unit: 'm³/h', filter: true },
      { key: 'inaltime', label: 'Înălțime de pompare', unit: 'm', filter: true },
      { key: 'putere', label: 'Putere', unit: 'kW' },
      { key: 'tip', label: 'Tip', unit: '', text: true },
    ],
  },
];

const CAT = Object.fromEntries(CATEGORIES.map((c) => [c.key, c]));

/* ------------------------------------------------------------------ */
/*  Date demonstrative. NU sunt specificatii oficiale - doar prototip.  */
/* ------------------------------------------------------------------ */
const SITES = {
  Grundfos: 'https://www.grundfos.com',
  Wilo: 'https://www.wilo.com',
  Vaillant: 'https://www.vaillant.com',
  Bosch: 'https://www.bosch-homecomfort.com',
  Daikin: 'https://www.daikin.com',
  Viessmann: 'https://www.viessmann.com',
  Ariston: 'https://www.ariston.com',
  'Alfa Laval': 'https://www.alfalaval.com',
  'Schneider Electric': 'https://www.se.com',
  ABB: 'https://www.abb.com',
  Legrand: 'https://www.legrand.com',
  Hager: 'https://www.hager.com',
  Eaton: 'https://www.eaton.com',
  APC: 'https://www.apc.com',
  Prysmian: 'https://www.prysmiangroup.com',
  Nexans: 'https://www.nexans.com',
  Siemens: 'https://www.siemens.com',
  Hochiki: 'https://www.hochikieurope.com',
  Honeywell: 'https://www.honeywell.com',
  Systemair: 'https://www.systemair.com',
  'S&P': 'https://www.solerpalau.com',
  Vortice: 'https://www.vortice.com',
  Tyco: 'https://www.tyco-fire.com',
  Viking: 'https://www.vikinggroupinc.com',
};

let _id = 0;
const E = (manufacturer, category, model, specs) => ({
  id: ++_id, manufacturer, category, model, specs,
  url: SITES[manufacturer] || '#',
});

const DATA = [
  /* --- SANITARE --- */
  E('Grundfos', 'pompa_apa', 'SCALA2 3-45', { debit: 3, inaltime: 45, putere: 550, conexiune: '1"' }),
  E('Wilo', 'pompa_apa', 'HiMulti 3-45', { debit: 3.6, inaltime: 45, putere: 650, conexiune: '1"' }),
  E('Grundfos', 'pompa_apa', 'JP Booster 5', { debit: 3, inaltime: 40, putere: 850, conexiune: '1"' }),
  E('Ariston', 'boiler', 'PRO1 R 100', { volum: 100, serpentine: 0, pmax: 8, material: 'Oțel emailat' }),
  E('Viessmann', 'boiler', 'Vitocell 100-V 200', { volum: 200, serpentine: 1, pmax: 10, material: 'Oțel emailat' }),
  E('Vaillant', 'boiler', 'uniSTOR VIH 300', { volum: 300, serpentine: 1, pmax: 10, material: 'Oțel emailat' }),
  E('Wilo', 'vas_hidrofor', 'Reflex DE 24', { volum: 24, pmax: 10, racord: '1"', tip: 'Cu membrană' }),
  E('Grundfos', 'vas_hidrofor', 'GT-U 60', { volum: 60, pmax: 10, racord: '1"', tip: 'Cu membrană' }),

  /* --- TERMICE --- */
  E('Vaillant', 'centrala', 'ecoTEC plus VU 256', { putere: 25, combustibil: 'Gaz', randament: 98, acm: 12 }),
  E('Bosch', 'centrala', 'Condens GC7000iW 24', { putere: 24, combustibil: 'Gaz', randament: 97, acm: 11 }),
  E('Viessmann', 'centrala', 'Vitodens 100-W 32', { putere: 32, combustibil: 'Gaz', randament: 98, acm: 14 }),
  E('Daikin', 'pompacaldura', 'Altherma 3 8 kW', { putere: 8, cop: 4.6, scop: 4.3, tip: 'Aer-apă' }),
  E('Vaillant', 'pompacaldura', 'aroTHERM plus 10 kW', { putere: 10, cop: 4.7, scop: 4.5, tip: 'Aer-apă' }),
  E('Viessmann', 'pompacaldura', 'Vitocal 200-S 12 kW', { putere: 12, cop: 4.4, scop: 4.1, tip: 'Aer-apă' }),
  E('Grundfos', 'pompa', 'MAGNA3 32-60', { debit: 9, inaltime: 6, putere: 110, conexiune: 'DN32' }),
  E('Wilo', 'pompa', 'Stratos MAXO 40/0.5-8', { debit: 12, inaltime: 8, putere: 200, conexiune: 'DN40' }),
  E('Grundfos', 'pompa', 'ALPHA2 25-40', { debit: 2.5, inaltime: 4, putere: 18, conexiune: 'DN25' }),
  E('Alfa Laval', 'schimbator', 'CB30 40 kW', { putere: 40, debit: 1.7, placi: 30, pmax: 16 }),
  E('Alfa Laval', 'schimbator', 'CB60 90 kW', { putere: 90, debit: 3.9, placi: 50, pmax: 16 }),
  E('Wilo', 'vas', 'Reflex N 18', { volum: 18, pmax: 6, tip: 'Închis cu membrană', racord: '3/4"' }),
  E('Grundfos', 'vas', 'GT-H 80', { volum: 80, pmax: 10, tip: 'Închis cu membrană', racord: '1"' }),

  /* --- ELECTRICE --- */
  E('Schneider Electric', 'tablou', 'Pragma 24 module', { curent: 63, circuite: 24, ip: 'IP40', montaj: 'Aparent' }),
  E('Hager', 'tablou', 'Volta 36 module', { curent: 63, circuite: 36, ip: 'IP30', montaj: 'Aparent' }),
  E('Legrand', 'tablou', 'XL3 160', { curent: 160, circuite: 48, ip: 'IP43', montaj: 'Aparent' }),
  E('Schneider Electric', 'mcb', 'iC60N C16', { curent: 16, poli: 1, curba: 'C', capacitate: 6 }),
  E('ABB', 'mcb', 'S203 C25', { curent: 25, poli: 3, curba: 'C', capacitate: 6 }),
  E('Hager', 'mcb', 'MCN116', { curent: 16, poli: 1, curba: 'C', capacitate: 6 }),
  E('Prysmian', 'cablu', 'CYY-F 3x2.5', { sectiune: 2.5, conductoare: 3, tip: 'CYY-F', tensiune: 750 }),
  E('Prysmian', 'cablu', 'NYY-J 5x6', { sectiune: 6, conductoare: 5, tip: 'NYY-J', tensiune: 1000 }),
  E('Nexans', 'cablu', 'H07V-K 4', { sectiune: 4, conductoare: 1, tip: 'H07V-K', tensiune: 750 }),
  E('Eaton', 'ups', '5P 1550', { putere: 1550, autonomie: 8, topologie: 'Line-interactive', iesiri: 'IEC C13' }),
  E('APC', 'ups', 'Smart-UPS 3000', { putere: 3000, autonomie: 7, topologie: 'On-line', iesiri: 'IEC C13/C19' }),
  E('Schneider Electric', 'ups', 'Easy UPS 1000', { putere: 1000, autonomie: 6, topologie: 'Line-interactive', iesiri: 'Schuko' }),

  /* --- HVAC --- */
  E('Daikin', 'chiller', 'EWAD 80 kW', { frig: 80, eer: 3.1, seer: 4.2, agent: 'R-32' }),
  E('Daikin', 'chiller', 'EWYT 150 kW', { frig: 150, eer: 3.0, seer: 4.5, agent: 'R-32' }),
  E('Daikin', 'ventilo', 'FWEC 2 kW', { frig: 2.0, caldura: 2.6, aer: 320, montaj: 'Perete' }),
  E('Daikin', 'ventilo', 'FWM 4 kW', { frig: 4.0, caldura: 5.2, aer: 700, montaj: 'Tavan casetat' }),
  E('Systemair', 'cta', 'Topvex TR09', { aer: 3000, recuperare: 80, putere: 6, filtrare: 'F7' }),
  E('Daikin', 'cta', 'Modular L 5000', { aer: 5000, recuperare: 75, putere: 9, filtrare: 'F7' }),
  E('S&P', 'ventilator', 'TD-500/150', { aer: 500, presiune: 200, putere: 95, tip: 'In-line' }),
  E('Systemair', 'ventilator', 'K 250 EC', { aer: 900, presiune: 350, putere: 140, tip: 'In-line' }),
  E('Vortice', 'ventilator', 'Lineo 100', { aer: 250, presiune: 150, putere: 45, tip: 'In-line' }),

  /* --- INCENDIU --- */
  E('Bosch', 'detector', 'FAP-425 optic', { acoperire: 60, tip: 'Optic fum', tensiune: 24, interfata: 'Adresabil' }),
  E('Hochiki', 'detector', 'ALG-EN', { acoperire: 100, tip: 'Optic fum', tensiune: 24, interfata: 'Adresabil' }),
  E('Honeywell', 'detector', 'CO4000', { acoperire: 80, tip: 'Multicriteria', tensiune: 24, interfata: 'Adresabil' }),
  E('Bosch', 'centrala_psi', 'FPA-1200', { bucle: 4, zone: 32, tip: 'Adresabilă', iesiri: 4 }),
  E('Honeywell', 'centrala_psi', 'Morley ZX5', { bucle: 5, zone: 80, tip: 'Adresabilă', iesiri: 8 }),
  E('Siemens', 'centrala_psi', 'Cerberus FC722', { bucle: 4, zone: 64, tip: 'Adresabilă', iesiri: 6 }),
  E('Tyco', 'hidrant', 'Hidrant interior DN25', { debit: 120, presiune: 2.5, dn: 'DN25', furtun: 20 }),
  E('Tyco', 'hidrant', 'Hidrant interior DN33', { debit: 200, presiune: 4, dn: 'DN33', furtun: 30 }),
  E('Tyco', 'sprinkler', 'TY-FRB K80', { k: 80, tdecl: 68, orientare: 'Pendent', racord: '1/2"' }),
  E('Viking', 'sprinkler', 'VK102 K115', { k: 115, tdecl: 68, orientare: 'Upright', racord: '3/4"' }),
  E('Grundfos', 'pompa_incendiu', 'NK 50 m³/h', { debit: 50, inaltime: 60, putere: 18.5, tip: 'Centrifugă' }),
  E('Wilo', 'pompa_incendiu', 'SiFire 90', { debit: 90, inaltime: 75, putere: 30, tip: 'Grup pompare' }),
];

/* ------------------------------------------------------------------ */
const fmt = (v, unit) => (unit ? `${v} ${unit}` : `${v}`);
const cls = (...a) => a.filter(Boolean).join(' ');

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

function EquipmentCard({ item, saved, onSave, compared, onCompare }) {
  const [open, setOpen] = useState(false);
  const cat = CAT[item.category];
  const keySpecs = cat.specs.slice(0, 3);
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="inline-block text-[10px] font-semibold uppercase tracking-wide text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
                {DOM[cat.domain].label}
              </span>
              <span className="inline-block text-[10px] font-semibold uppercase tracking-wide text-sky-700 bg-sky-50 px-2 py-0.5 rounded-full">
                {cat.label}
              </span>
            </div>
            <div className="mt-1.5 flex items-center gap-1.5 text-slate-500 text-sm">
              <Building2 size={14} /> {item.manufacturer}
            </div>
            <h3 className="font-bold text-slate-900 leading-tight truncate">{item.model}</h3>
          </div>
          <button
            onClick={() => onSave(item.id)}
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

        {open && (
          <div className="mt-1">
            {cat.specs.slice(3).map((s) => (
              <SpecRow key={s.key} s={s} value={item.specs[s.key]} />
            ))}
          </div>
        )}

        <div className="mt-3 flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setOpen((o) => !o)}
            className="text-sm font-medium text-sky-700 hover:text-sky-900"
          >
            {open ? 'Mai puține' : 'Toate specificațiile'}
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
              onChange={() => onCompare(item.id)}
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
  const specKeys = [];
  items.forEach((it) =>
    CAT[it.category].specs.forEach((s) => {
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
  const [q, setQ] = useState('');
  const [domain, setDomain] = useState('all');
  const [cat, setCat] = useState('all');
  const [filters, setFilters] = useState({});
  const [showFilters, setShowFilters] = useState(false);

  const visibleCats =
    domain === 'all' ? CATEGORIES : CATEGORIES.filter((c) => c.domain === domain);
  const activeCat = cat === 'all' ? null : CAT[cat];
  const numericFilters = activeCat ? activeCat.specs.filter((s) => s.filter) : [];

  const setF = (k, v) => setFilters((f) => ({ ...f, [k]: v }));
  const resetFilters = () => setFilters({});

  const pickDomain = (d) => { setDomain(d); setCat('all'); resetFilters(); };
  const pickCat = (c) => { setCat(c); resetFilters(); };

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    return DATA.filter((it) => {
      const c = CAT[it.category];
      if (domain !== 'all' && c.domain !== domain) return false;
      if (cat !== 'all' && it.category !== cat) return false;
      if (term) {
        const hay = `${it.manufacturer} ${it.model} ${c.label} ${DOM[c.domain].label}`.toLowerCase();
        if (!hay.includes(term)) return false;
      }
      for (const s of numericFilters) {
        const min = parseFloat(filters[s.key]);
        if (!isNaN(min) && min > 0) {
          const val = it.specs[s.key];
          if (typeof val !== 'number' || val < min) return false;
        }
      }
      return true;
    });
  }, [q, domain, cat, filters, numericFilters]);

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
          {DOMAINS.map((d) => (
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

        {numericFilters.length > 0 && (
          <div className="mt-2">
            <button
              onClick={() => setShowFilters((s) => !s)}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600"
            >
              <SlidersHorizontal size={15} />
              Filtre {showFilters ? '▲' : '▼'}
            </button>
            {showFilters && (
              <div className="mt-2 grid grid-cols-2 gap-2 bg-white p-3 rounded-xl border border-slate-200">
                {numericFilters.map((s) => (
                  <label key={s.key} className="text-sm">
                    <span className="text-slate-500">
                      {s.label} ≥ {s.unit && `(${s.unit})`}
                    </span>
                    <input
                      type="number"
                      inputMode="decimal"
                      value={filters[s.key] ?? ''}
                      onChange={(e) => setF(s.key, e.target.value)}
                      className="mt-1 w-full px-2 py-1.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-300"
                    />
                  </label>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <p className="text-sm text-slate-500 mb-2">{results.length} rezultate</p>
      <div className="grid sm:grid-cols-2 gap-3 pb-24">
        {results.map((it) => (
          <EquipmentCard
            key={it.id}
            item={it}
            saved={saved.has(it.id)}
            onSave={onSave}
            compared={compareSet.has(it.id)}
            onCompare={onCompare}
          />
        ))}
        {results.length === 0 && (
          <p className="text-slate-400 text-sm py-10 text-center col-span-full">
            Niciun echipament nu corespunde criteriilor.
          </p>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
function AssistantTab({ saved, onSave }) {
  const [domain, setDomain] = useState(DOMAINS[0].key);
  const domCats = CATEGORIES.filter((c) => c.domain === domain);
  const [cat, setCat] = useState(domCats[0].key);
  const [targets, setTargets] = useState({});
  const c = CAT[cat];
  const numeric = c.specs.filter((s) => s.filter);

  const changeDomain = (d) => {
    setDomain(d);
    setCat(CATEGORIES.find((x) => x.domain === d).key);
    setTargets({});
  };

  const ranked = useMemo(() => {
    const filled = numeric.filter((s) => {
      const v = parseFloat(targets[s.key]);
      return !isNaN(v) && v > 0;
    });
    if (filled.length === 0) return [];
    return DATA.filter((it) => it.category === cat)
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
  }, [cat, targets, numeric]);

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
            {DOMAINS.map((d) => (
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
              onClick={() => onSave(it.id)}
              className={cls(
                'mt-2 text-sm font-medium inline-flex items-center gap-1',
                saved.has(it.id) ? 'text-amber-600' : 'text-sky-700 hover:text-sky-900',
              )}
            >
              <Star size={15} fill={saved.has(it.id) ? 'currentColor' : 'none'} />
              {saved.has(it.id) ? 'În proiect' : 'Adaugă în proiect'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
function ProjectTab({ saved, onSave, setSaved }) {
  const [copied, setCopied] = useState(false);
  const items = DATA.filter((it) => saved.has(it.id));

  const toCSV = () => {
    const head = ['Specialitate', 'Categorie', 'Producator', 'Model', 'Specificatii'];
    const rows = items.map((it) => {
      const c = CAT[it.category];
      const specs = c.specs
        .filter((s) => it.specs[s.key] !== undefined)
        .map((s) => `${s.label}: ${fmt(it.specs[s.key], s.unit)}`)
        .join(' | ');
      return [DOM[c.domain].label, c.label, it.manufacturer, it.model, specs];
    });
    return [head, ...rows]
      .map((r) => r.map((x) => `"${String(x).replace(/"/g, '""')}"`).join(';'))
      .join('\n');
  };

  const download = () => {
    const blob = new Blob(['﻿' + toCSV()], { type: 'text/csv;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'lista-echipamente.csv';
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(toCSV());
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  };

  const grouped = DOMAINS.map((d) => ({
    d,
    list: items.filter((it) => CAT[it.category].domain === d.key),
  })).filter((g) => g.list.length > 0);

  return (
    <div className="pb-24">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-slate-900">Lista proiectului ({items.length})</h2>
        {items.length > 0 && (
          <button
            onClick={() => setSaved(new Set())}
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
          <div className="mt-3 flex gap-2">
            <button
              onClick={download}
              className="flex-1 inline-flex items-center justify-center gap-1.5 bg-sky-600 text-white font-medium py-2.5 rounded-xl"
            >
              <Download size={16} /> Export CSV
            </button>
            <button
              onClick={copy}
              className="flex-1 inline-flex items-center justify-center gap-1.5 bg-white border border-slate-200 text-slate-700 font-medium py-2.5 rounded-xl"
            >
              {copied ? <Check size={16} className="text-emerald-600" /> : <Copy size={16} />}
              {copied ? 'Copiat' : 'Copiază'}
            </button>
          </div>

          {grouped.map(({ d, list }) => (
            <div key={d.key} className="mt-4">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400 mb-2">
                {d.label} ({list.length})
              </p>
              <div className="space-y-3">
                {list.map((it) => (
                  <div key={it.id} className="bg-white rounded-2xl border border-slate-200 p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <span className="text-[11px] font-semibold uppercase tracking-wide text-sky-700">
                          {CAT[it.category].label}
                        </span>
                        <div className="font-bold text-slate-900">{it.model}</div>
                        <div className="text-sm text-slate-500">{it.manufacturer}</div>
                      </div>
                      <button
                        onClick={() => onSave(it.id)}
                        className="p-2 text-amber-500"
                        aria-label="Scoate din proiect"
                      >
                        <Star size={18} fill="currentColor" />
                      </button>
                    </div>
                  </div>
                ))}
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

export default function EquipmentApp() {
  const [tab, setTab] = useState('search');
  const [saved, toggleSaved, setSaved] = useLocalSet('instalfinder.saved');
  const [compareSet, toggleCompare, setCompareSet] = useLocalSet('instalfinder.compare');
  const [showCompare, setShowCompare] = useState(false);
  const [showBanner, setShowBanner] = useState(true);

  const compareItems = DATA.filter((it) => compareSet.has(it.id));

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
              <strong>Date demonstrative.</strong> Specificațiile sunt fictive,
              pentru prototip. Datele reale se preiau din cataloagele oficiale ale
              producătorilor — nu folosi pentru proiectare.
            </span>
            <button
              onClick={() => setShowBanner(false)}
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
            saved={saved}
            onSave={toggleSaved}
            compareSet={compareSet}
            onCompare={toggleCompare}
          />
        )}
        {tab === 'assistant' && <AssistantTab saved={saved} onSave={toggleSaved} />}
        {tab === 'project' && (
          <ProjectTab saved={saved} onSave={toggleSaved} setSaved={setSaved} />
        )}
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
                {t.key === 'project' && saved.size > 0 && (
                  <span className="absolute top-1 right-1/2 translate-x-5 bg-amber-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                    {saved.size}
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
