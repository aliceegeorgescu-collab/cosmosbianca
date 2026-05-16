# Changelog — InstalFinder

Toate modificările notabile ale prototipului. Datele din catalog sunt
**orientative** (nivel catalog), nu înlocuiesc fișele tehnice oficiale.

## [0.7.1] — 2026-05-16 — Remedieri audit (medii + minore)
- **esbuild** ridicat la `^0.25.0` prin `overrides` → advisory
  GHSA-67mh-4wv8-2f99 rezolvat fără upgrade major de Vite.
- Advisory rămas (Vite path-traversal, **doar dev-server**): NU s-a forțat
  Vite 8 (breaking). Mitigat prin **dev-server restrâns la `127.0.0.1`**
  (eliminat `host/allowedHosts/cors` permisive) — uz local privat.
- **Iconițe PNG** 192/512 (any + maskable) generate, pe lângă SVG.
- **Service worker activ și în `npm run dev`** (`devOptions.enabled`).
- „Caută pe net" comutat pe **DuckDuckGo** (mai privat).
- Refactor: eliminat IIFE-ul din JSX la „zero rezultate".

## [0.7.0] — 2026-05-16 — PWA privat + „Caută pe net"
- **PWA instalabilă, offline** (`vite-plugin-pwa`): manifest, service
  worker, `catalog.json` în precache. Rulează doar local — **privată**.
- Eliminat workflow-ul GitHub Pages (fără publicare automată).
- **„Caută pe net"**: linkuri de căutare web pre-completate pe card, în
  fișa detaliată și la zero rezultate, pentru echipamentele lipsă din catalog.

## [0.6.0] — 2026-05-16 — Tab Ghid + mod dark
- Tab nou **Ghid**: instrucțiuni de utilizare pentru fiecare secțiune.
- **Mod dark** comutabil din antet (☀/☾), persistat în `localStorage`,
  cu fallback pe preferința sistemului. Implementat prin override de
  temă în `index.css` (fără a modifica clasele din componentă).

## [0.5.1] — 2026-05-16 — Remedieri audit (toate)
- Dedupe la nivel de `uid` în `buildCatalog` (ultimul câștigă) + warn;
  intrările `equipment` fără câmpuri obligatorii sunt ignorate cu warn.
- `Btn` mutat la nivel de modul (fără remontare la fiecare render).
- Badge-ul tab-ului Proiect numără doar pozițiile rezolvabile în catalogul curent.
- `escape/unescape` înlocuite cu base64 UTF-8 (TextEncoder/TextDecoder).
- `AssistantTab`: select-uri protejate pentru domeniu fără categorii.
- Filtru interval: indiciu vizual când min > max.

## [0.5.0] — 2026-05-16 — Date: catalog mare + import în aplicație
- Catalog extins la ~98 modele / 38 producători, pe toate cele 5 specialități.
- Tab nou **Catalog**: încărcare `catalog.json` propriu sau import echipamente
  din CSV (`category;manufacturer;model;specs`), fără rebuild.
- Alegerea catalogului se reține în `localStorage`, cu revenire la implicit.
- La pornire, un catalog personalizat are prioritate față de cel inclus.
- _Commit:_ `127ae9b`

## [0.4.0] — 2026-05-16 — Proiect: cantități, totaluri, PDF, link
- Pozițiile din proiect au **cantitate** (stepper + câmp editabil),
  persistate ca `{uid: qty}` (migrează vechiul array de id-uri).
- Antet cu poziții și total bucăți; CSV cu coloană `Cantitate`.
- Export **PDF** (fereastră printabilă) și **partajare prin link** (`#p=`).
- _Commit:_ `91dc943`

## [0.3.0] — 2026-05-16 — Căutare: interval, sortare, grupare, detalii
- Filtre numerice de tip **interval min–max** (nu doar „≥").
- **Sortare**: relevanță / producător / model / orice spec ↑↓.
- Rezultate **grupate pe categorie** când tipul = „Toate".
- **Fișă detaliată** per echipament (modal cu toate specificațiile).
- _Commit:_ `185e3ac`

## [0.2.1] — 2026-05-16 — Remedieri din audit
- Persistență stabilă (`producător|categorie|model`) pentru Proiect/Compară.
- Base GitHub Pages corectat (`/sistem-solar/` → `/cosmosbianca/`).
- `console.warn` la categorie necunoscută; validare URL `http(s)`.
- Banner persistat; `useMemo` curat; eliminat `SolarSystem.jsx` nefolosit.
- _Commit:_ `0be0997`

## [0.2.0] — 2026-05-16 — Catalog extern + filtru pe specialități
- Datele mutate în `public/catalog.json` (editabil fără cod), încărcate
  la runtime prin context React, cu stări loading/eroare.
- Filtru pe două niveluri: specialitate → tip echipament.
- _Commits:_ `5466293`, `bae3c7f`

## [0.1.0] — 2026-05-16 — Prototip inițial
- Aplicație React/Vite mobile-first: căutare, asistent de selecție,
  comparație, listă de proiect (localStorage), export CSV.
- _Commit:_ `fe73140`

## Audit
- Rulat 2026-05-16: fără probleme critice. Toate punctele medii și
  minore au fost remediate în `[0.5.1]`. Niciun element deschis.
