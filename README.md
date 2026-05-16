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
- 🔎 Căutare după producător/model + filtre numerice pe parametrii cheie
- 🪄 Asistent de selecție — introduci punctul de funcționare, primești cele
  mai apropiate echipamente, ordonate după % de potrivire
- ⚖️ Comparație side-by-side a echipamentelor selectate
- ⭐ Listă de proiect salvată local (localStorage), cu export CSV / copiere
- 📱 Interfață mobile-first, cu navigare jos (Caută / Asistent / Proiect)

## Rulare locală

```bash
npm install
npm run dev
```

Aplicația se deschide la `http://localhost:5173/`.

## Build pentru producție

```bash
npm run build
```

Fișierele rezultate sunt în `dist/`.

## Tehnologii

- React 18 + Vite 5
- Tailwind CSS 3
- lucide-react (iconițe)

Punctul de intrare este `src/main.jsx` → `src/EquipmentApp.jsx`.
