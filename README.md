# 🌌 Sistemul Solar Interactiv

Aplicație educativă în română pentru copii — descoperă universul nostru cu planete realiste, gaură neagră, galaxii, zodii, jocuri și narațiune cu voce.

## Funcționalități

- 🪐 9 planete (cu Pluto) + Soarele, fiecare cu suprafața detaliată, descriere, fapte amuzante și 3 glume
- 🌙 Luni proprii pentru fiecare planetă (Luna, Io, Europa, Titan, etc.)
- ☄️ Centură de asteroizi între Marte și Jupiter, Cometa Halley pe orbita ei
- 🛰️ Stația Spațială Internațională orbitând Pământul, sondele Voyager 1 & 2 în spațiul interstelar
- 🕳️ Gaură neagră realistă (stil Interstellar) cu disc de acreție și inel de fotoni
- 🌌 3 galaxii spirale (Calea Lactee, Andromeda, Galaxia Roată) cu brațe procedurale
- ⭐ 12 constelații zodiacale clickabile (Berbec, Taur, ..., Pești)
- 🐍🐧🚀 Personaje (Sis Șarpele, Pip Pinguinul, Racheta) cu glume
- 🎬 Tur ghidat audio · 🎶 Muzică ambientală · 🎯 Quiz · 🎨 Mod desenează planeta ta
- 🃏 Memory Match · 📏 Sortează planetele · 📅 Provocare zilnică · 🎴 Galerie stickere · 🎙️ Mod poveste
- 🌗 Zi/noapte pe Pământ · 🌌 Aurora boreală · 🛸 OZN-uri ocazionale · ⭐ Stele cu dorință
- 🎂 Calculator vârstă pe planete · 💾 Salvare progres · 🔗 Share link
- 🎙️ Voce românească (Web Speech / Google Translate TTS)

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
- Web Audio API (pentru muzică ambientală + clinchete)
- Web Speech API + Google Translate TTS (pentru narațiune)
- SVG inline (pentru toate vizualele realiste)
