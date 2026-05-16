# InstalFinder — Căutare echipamente instalații

Prototip de aplicație (web, mobile-first) pentru ingineri/proiectanți de
instalații: caută și compară echipamente de la producători după parametri
tehnici, organizate pe specialități — **Sanitare, Termice, Electrice, HVAC,
Incendiu**.

> ⚠️ **Date orientative.** Specificațiile sunt la nivel de catalog, pentru
> prototip — nu înlocuiesc fișele tehnice oficiale ale producătorilor.
> A nu se folosi pentru proiectare fără verificare.

## Date editabile — `public/catalog.json`

Tot catalogul (specialități, tipuri de echipament, producători, echipamente)
se încarcă la pornire din `public/catalog.json`. Poți **adăuga / modifica /
înlocui** echipamente direct în acel fișier, fără a atinge codul — reîncarci
pagina și apar. Structura: `domains`, `categories` (cu `specs`),
`manufacturers`, `equipment`.

## Funcționalități

- 🧭 Filtru pe specialitate → tip echipament (două niveluri)
- 🔎 Căutare cu filtre interval (min–max), sortare și rezultate grupate;
  fișă detaliată per echipament
- 🌐 „Caută pe net" — dacă un echipament nu e în catalog, deschide o căutare
  web pre-completată (pe card / în detalii / la zero rezultate)
- 🪄 Asistent de selecție — introduci punctul de funcționare, primești cele
  mai apropiate echipamente, ordonate după % de potrivire
- ⚖️ Comparație side-by-side a echipamentelor selectate
- 📋 Proiect cu cantități + totaluri, export CSV / PDF și partajare prin link
- 🗂️ Tab „Catalog": încarci un `catalog.json` propriu sau imporți din CSV
  direct din aplicație (fără rebuild); alegerea se reține local
- 📖 Tab „Ghid" cu instrucțiuni de utilizare
- 🌙 Mod dark comutabil din antet (se reține)
- 📱 Interfață mobile-first, cu navigare jos (Caută / Asistent / Proiect / Catalog / Ghid)

## Rulare locală

```bash
npm install
npm run dev
```

Aplicația se deschide la `http://localhost:5173/`.

## Privat & instalabil (PWA)

Aplicația este **privată** — nu este publicată nicăieri (nu există workflow de
deploy). Rulează doar pe dispozitivul tău.

E o **PWA**: după `npm run build` și servire locală (`npm run preview`), din
Chrome/Edge → meniu → **Instalează**. Apare cu iconiță proprie și **merge
offline** (aplicația + `catalog.json` sunt în cache prin service worker).
Pe `localhost` instalarea funcționează fără HTTPS.

```bash
npm run build
npm run preview   # apoi „Instalează" din browser
```

Fișierele rezultate sunt în `dist/` (include `manifest.webmanifest` și `sw.js`).

## Tehnologii

- React 18 + Vite 5
- Tailwind CSS 3
- lucide-react (iconițe)

Punctul de intrare este `src/main.jsx` → `src/EquipmentApp.jsx`.
