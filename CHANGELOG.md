# Changelog — InstalFinder

Toate modificările notabile ale prototipului. Datele din catalog sunt
**orientative** (nivel catalog), nu înlocuiesc fișele tehnice oficiale.

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

## Audit deschis (de remediat)
- Mediu: dedupe la import CSV; `Btn` scos din `ProjectTab`; badge proiect
  să numere doar pozițiile rezolvabile la catalog diferit.
- Minor: guard pe intrările `equipment`; edge domeniu fără categorii;
  înlocuire `escape/unescape`; indiciu vizual când min > max.
