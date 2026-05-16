# InstalFinder — Căutare echipamente instalații

Prototip de aplicație (web, mobile-first) pentru ingineri/proiectanți de
instalații: caută și compară echipamente de la producători după parametri
tehnici — pompe, centrale termice, pompe de căldură, chillere,
ventiloconvectoare, schimbătoare, boilere ACM, vase de expansiune.

> ⚠️ **Date demonstrative.** Specificațiile din aplicație sunt fictive,
> doar pentru prototip. Datele reale se preiau din cataloagele oficiale
> ale producătorilor — a nu se folosi pentru proiectare.

## Funcționalități

- 🔎 Căutare după producător/model + filtre numerice pe parametrii cheie
- 🧭 Categorii multiple (mix general) cu specificații proprii
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

> Versiunea anterioară (Sistemul Solar) rămâne în `src/SolarSystem.jsx`;
> punctul de intrare (`src/main.jsx`) folosește acum `EquipmentApp.jsx`.
