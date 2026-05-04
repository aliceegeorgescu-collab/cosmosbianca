import { useState, useEffect, useRef, useMemo } from 'react';
import { Pause, Play, X, Sparkles, Volume2, VolumeX, Smile } from 'lucide-react';

function Crater({ x, y, r, dark = '#3a2a18', mid = '#8a7048', light = '#b89878' }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill={dark} />
      <circle cx={x - r * 0.18} cy={y - r * 0.18} r={r * 0.85} fill={mid} />
      <circle cx={x - r * 0.32} cy={y - r * 0.32} r={r * 0.55} fill={light} opacity="0.7" />
    </g>
  );
}

function PlanetSurface({ planet, paused }) {
  const id = planet.id;
  switch (id) {
    case 'mercur':
      return (
        <>
          <defs>
            <radialGradient id="surf-mercur" cx="35%" cy="30%" r="80%">
              <stop offset="0%" stopColor="#f0e0c8" />
              <stop offset="55%" stopColor="#9c8568" />
              <stop offset="100%" stopColor="#3a2a18" />
            </radialGradient>
          </defs>
          <rect x="-50" y="-50" width="100" height="100" fill="url(#surf-mercur)" />
          <Crater x="-18" y="-12" r="9" />
          <Crater x="14" y="6" r="6.5" />
          <Crater x="-3" y="22" r="5" />
          <Crater x="22" y="-16" r="4" />
          <Crater x="-28" y="6" r="3.5" />
          <Crater x="2" y="-26" r="3.5" />
          <Crater x="-14" y="34" r="3" />
          <Crater x="28" y="22" r="3" />
          <Crater x="-22" y="-30" r="2.5" />
          <Crater x="32" y="-2" r="2.5" />
          <Crater x="-10" y="10" r="2" />
          <Crater x="6" y="34" r="2" />
        </>
      );
    case 'venus':
      return (
        <>
          <defs>
            <radialGradient id="surf-venus" cx="35%" cy="30%" r="85%">
              <stop offset="0%" stopColor="#fff5d6" />
              <stop offset="50%" stopColor="#e8b87a" />
              <stop offset="100%" stopColor="#5a3a1a" />
            </radialGradient>
          </defs>
          <rect x="-50" y="-50" width="100" height="100" fill="url(#surf-venus)" />
          <ellipse cx="-2" cy="-30" rx="50" ry="5" fill="rgba(255,210,140,0.5)" />
          <ellipse cx="3" cy="-18" rx="50" ry="6" fill="rgba(220,170,100,0.4)" />
          <ellipse cx="-5" cy="-5" rx="50" ry="4" fill="rgba(255,225,170,0.5)" />
          <ellipse cx="3" cy="8" rx="50" ry="6" fill="rgba(200,150,90,0.45)" />
          <ellipse cx="-3" cy="22" rx="50" ry="5" fill="rgba(255,200,140,0.45)" />
          <ellipse cx="2" cy="35" rx="50" ry="5" fill="rgba(180,130,80,0.5)" />
          <path d="M -40 -10 Q -20 -14, 0 -8 T 40 -6" stroke="rgba(255,240,200,0.3)" strokeWidth="1.5" fill="none" />
          <path d="M -40 18 Q -20 14, 0 22 T 40 20" stroke="rgba(255,240,200,0.3)" strokeWidth="1.5" fill="none" />
        </>
      );
    case 'pamant':
      return (
        <>
          <defs>
            <radialGradient id="surf-pamant" cx="35%" cy="30%" r="85%">
              <stop offset="0%" stopColor="#a8dcff" />
              <stop offset="40%" stopColor="#3878c8" />
              <stop offset="100%" stopColor="#0a2850" />
            </radialGradient>
          </defs>
          <rect x="-50" y="-50" width="100" height="100" fill="url(#surf-pamant)" />
          <path
            d="M -8 -28 Q -22 -22, -18 -8 Q -22 6, -12 16 Q -8 24, -16 30 Q -28 28, -32 14 Q -36 0, -28 -14 Q -22 -28, -8 -28 Z"
            fill="#3e8a3e"
          />
          <path d="M -12 -22 Q -18 -16, -14 -8" stroke="#7ab86a" strokeWidth="1.5" fill="none" opacity="0.6" />
          <path
            d="M 4 -22 Q 22 -28, 30 -14 Q 36 -2, 28 12 Q 18 22, 8 18 Q 0 8, 4 -8 Q 2 -16, 4 -22 Z"
            fill="#3e8a3e"
          />
          <path d="M 14 -10 Q 22 -8, 26 0" stroke="#5aa850" strokeWidth="1.4" fill="none" opacity="0.6" />
          <path d="M 0 22 Q 6 26, 8 32 Q 4 36, -2 30 Z" fill="#3e8a3e" />
          <path d="M 22 22 Q 30 24, 32 30 Q 26 32, 22 28 Z" fill="#5aa850" />
          <ellipse cx="0" cy="-44" rx="20" ry="6" fill="rgba(255,255,255,0.92)" />
          <ellipse cx="0" cy="44" rx="22" ry="5" fill="rgba(255,255,255,0.92)" />
          <ellipse cx="-8" cy="-12" rx="14" ry="3" fill="rgba(255,255,255,0.55)" transform="rotate(-12)" />
          <ellipse cx="22" cy="6" rx="11" ry="2.5" fill="rgba(255,255,255,0.5)" transform="rotate(8)" />
          <ellipse cx="-18" cy="22" rx="13" ry="3" fill="rgba(255,255,255,0.5)" transform="rotate(-8)" />
          <ellipse cx="14" cy="32" rx="10" ry="2" fill="rgba(255,255,255,0.45)" />
          <defs>
            <radialGradient id="surf-pamant-night" cx="100%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(0,0,15,0.85)" />
              <stop offset="55%" stopColor="rgba(0,0,30,0.65)" />
              <stop offset="100%" stopColor="rgba(0,0,40,0)" />
            </radialGradient>
          </defs>
          <g
            style={{
              transformBox: 'fill-box',
              transformOrigin: 'center',
              animation: paused ? 'none' : 'earthSpin 24s linear infinite',
            }}
          >
            <ellipse cx="50" cy="0" rx="50" ry="50" fill="url(#surf-pamant-night)" />
            <circle cx="40" cy="-12" r="0.7" fill="#ffe8a0" opacity="0.7" />
            <circle cx="36" cy="6" r="0.6" fill="#ffe8a0" opacity="0.6" />
            <circle cx="44" cy="20" r="0.7" fill="#ffe8a0" opacity="0.7" />
            <circle cx="32" cy="-22" r="0.5" fill="#ffe8a0" opacity="0.55" />
            <circle cx="38" cy="32" r="0.6" fill="#ffe8a0" opacity="0.6" />
            <circle cx="48" cy="-2" r="0.7" fill="#ffe8a0" opacity="0.65" />
            <path
              d="M 30 -42 Q 40 -38 50 -42 Q 60 -38 50 -44"
              stroke="#5fff9f"
              strokeWidth="2"
              fill="none"
              opacity="0.85"
              style={{ filter: 'drop-shadow(0 0 3px #5fff9f)', animation: 'auroraGlow 3s ease-in-out infinite' }}
            />
            <path
              d="M 28 -40 Q 40 -34 52 -40"
              stroke="#88ffe0"
              strokeWidth="1.2"
              fill="none"
              opacity="0.7"
              style={{ animation: 'auroraGlow 4s ease-in-out infinite reverse' }}
            />
            <path
              d="M 30 42 Q 40 38 50 42"
              stroke="#ff88dd"
              strokeWidth="1.5"
              fill="none"
              opacity="0.7"
              style={{ filter: 'drop-shadow(0 0 3px #ff88dd)', animation: 'auroraGlow 3.5s ease-in-out infinite' }}
            />
          </g>
        </>
      );
    case 'marte':
      return (
        <>
          <defs>
            <radialGradient id="surf-marte" cx="35%" cy="30%" r="85%">
              <stop offset="0%" stopColor="#ffb088" />
              <stop offset="50%" stopColor="#cc5530" />
              <stop offset="100%" stopColor="#601810" />
            </radialGradient>
          </defs>
          <rect x="-50" y="-50" width="100" height="100" fill="url(#surf-marte)" />
          <ellipse cx="-15" cy="-5" rx="16" ry="6" fill="#7a2a1a" opacity="0.6" />
          <ellipse cx="20" cy="-15" rx="14" ry="6" fill="#7a2a1a" opacity="0.55" />
          <ellipse cx="5" cy="22" rx="22" ry="7" fill="#7a2a1a" opacity="0.5" />
          <ellipse cx="-25" cy="18" rx="11" ry="5" fill="#aa4525" opacity="0.5" />
          <ellipse cx="28" cy="10" rx="12" ry="4" fill="#aa4525" opacity="0.5" />
          <Crater x="0" y="-28" r="4" dark="#5a1a0a" mid="#aa5535" light="#d97755" />
          <Crater x="-22" y="-22" r="3" dark="#5a1a0a" mid="#aa5535" light="#d97755" />
          <ellipse cx="0" cy="-43" rx="16" ry="9" fill="rgba(255,250,240,0.95)" />
          <ellipse cx="0" cy="44" rx="13" ry="6" fill="rgba(255,245,225,0.85)" />
        </>
      );
    case 'jupiter':
      return (
        <>
          <defs>
            <radialGradient id="surf-jupiter" cx="35%" cy="30%" r="85%">
              <stop offset="0%" stopColor="#ffe0b8" />
              <stop offset="50%" stopColor="#c9885a" />
              <stop offset="100%" stopColor="#602a18" />
            </radialGradient>
          </defs>
          <rect x="-50" y="-50" width="100" height="100" fill="url(#surf-jupiter)" />
          <ellipse cx="0" cy="-38" rx="60" ry="3" fill="rgba(140,80,40,0.55)" />
          <ellipse cx="0" cy="-30" rx="60" ry="4" fill="rgba(220,180,140,0.5)" />
          <ellipse cx="0" cy="-22" rx="60" ry="3" fill="rgba(120,70,30,0.55)" />
          <ellipse cx="0" cy="-12" rx="60" ry="5" fill="rgba(240,200,150,0.55)" />
          <ellipse cx="0" cy="-2" rx="60" ry="3" fill="rgba(130,80,40,0.55)" />
          <ellipse cx="0" cy="6" rx="60" ry="4" fill="rgba(255,220,170,0.55)" />
          <ellipse cx="0" cy="16" rx="60" ry="4" fill="rgba(140,90,50,0.55)" />
          <ellipse cx="0" cy="26" rx="60" ry="5" fill="rgba(220,170,120,0.5)" />
          <ellipse cx="0" cy="36" rx="60" ry="3" fill="rgba(120,70,30,0.55)" />
          <path d="M -40 -8 Q -20 -12, 0 -6 T 40 -10" stroke="rgba(80,40,10,0.4)" strokeWidth="1" fill="none" />
          <path d="M -40 12 Q -20 8, 0 14 T 40 10" stroke="rgba(80,40,10,0.4)" strokeWidth="1" fill="none" />
          <ellipse cx="-12" cy="14" rx="11" ry="6" fill="#cc3322" />
          <ellipse cx="-12" cy="14" rx="9" ry="5" fill="#dd5544" opacity="0.7" />
          <ellipse cx="-12" cy="14" rx="5" ry="3" fill="#aa1a0a" />
          <ellipse cx="-13" cy="13" rx="2" ry="1" fill="#ff7755" opacity="0.7" />
        </>
      );
    case 'saturn':
      return (
        <>
          <defs>
            <radialGradient id="surf-saturn" cx="35%" cy="30%" r="85%">
              <stop offset="0%" stopColor="#fff2c8" />
              <stop offset="55%" stopColor="#d8b878" />
              <stop offset="100%" stopColor="#5a4020" />
            </radialGradient>
          </defs>
          <rect x="-50" y="-50" width="100" height="100" fill="url(#surf-saturn)" />
          <ellipse cx="0" cy="-30" rx="60" ry="3" fill="rgba(180,140,90,0.35)" />
          <ellipse cx="0" cy="-20" rx="60" ry="4" fill="rgba(230,200,150,0.4)" />
          <ellipse cx="0" cy="-8" rx="60" ry="3" fill="rgba(200,160,110,0.35)" />
          <ellipse cx="0" cy="2" rx="60" ry="4" fill="rgba(245,220,170,0.45)" />
          <ellipse cx="0" cy="14" rx="60" ry="3" fill="rgba(200,160,110,0.4)" />
          <ellipse cx="0" cy="26" rx="60" ry="4" fill="rgba(220,180,130,0.4)" />
          <ellipse cx="0" cy="36" rx="60" ry="3" fill="rgba(160,120,80,0.45)" />
          <ellipse cx="0" cy="6" rx="50" ry="2.5" fill="rgba(0,0,0,0.55)" transform="rotate(-20)" />
        </>
      );
    case 'uranus':
      return (
        <>
          <defs>
            <radialGradient id="surf-uranus" cx="35%" cy="30%" r="85%">
              <stop offset="0%" stopColor="#dafafa" />
              <stop offset="55%" stopColor="#88cccc" />
              <stop offset="100%" stopColor="#1a4a4a" />
            </radialGradient>
          </defs>
          <rect x="-50" y="-50" width="100" height="100" fill="url(#surf-uranus)" />
          <ellipse cx="-20" cy="0" rx="6" ry="60" fill="rgba(120,180,180,0.3)" transform="rotate(85)" />
          <ellipse cx="0" cy="0" rx="6" ry="60" fill="rgba(180,230,230,0.25)" transform="rotate(85)" />
          <ellipse cx="20" cy="0" rx="6" ry="60" fill="rgba(120,180,180,0.3)" transform="rotate(85)" />
          <ellipse cx="-3" cy="-12" rx="22" ry="2" fill="rgba(220,250,250,0.4)" transform="rotate(85)" />
          <ellipse cx="3" cy="14" rx="22" ry="2" fill="rgba(220,250,250,0.4)" transform="rotate(85)" />
        </>
      );
    case 'neptun':
      return (
        <>
          <defs>
            <radialGradient id="surf-neptun" cx="35%" cy="30%" r="85%">
              <stop offset="0%" stopColor="#88aaff" />
              <stop offset="50%" stopColor="#3868c8" />
              <stop offset="100%" stopColor="#0a1a4a" />
            </radialGradient>
          </defs>
          <rect x="-50" y="-50" width="100" height="100" fill="url(#surf-neptun)" />
          <ellipse cx="0" cy="-30" rx="60" ry="3" fill="rgba(40,80,160,0.5)" />
          <ellipse cx="0" cy="-15" rx="60" ry="3" fill="rgba(140,180,240,0.35)" />
          <ellipse cx="0" cy="0" rx="60" ry="4" fill="rgba(40,80,160,0.45)" />
          <ellipse cx="0" cy="14" rx="60" ry="3" fill="rgba(120,160,230,0.35)" />
          <ellipse cx="0" cy="26" rx="60" ry="3" fill="rgba(40,80,160,0.45)" />
          <ellipse cx="14" cy="-6" rx="10" ry="5" fill="#0a1438" opacity="0.7" />
          <ellipse cx="14" cy="-6" rx="6" ry="3" fill="#1a2a58" opacity="0.6" />
          <ellipse cx="-18" cy="18" rx="6" ry="3" fill="rgba(255,255,255,0.4)" />
        </>
      );
    default:
      return null;
  }
}

function RealisticPlanet({ planet, paused }) {
  const id = planet.id;
  const size = planet.size;
  return (
    <svg
      viewBox="-50 -50 100 100"
      width={size}
      height={size}
      style={{ overflow: 'visible', display: 'block' }}
    >
      <defs>
        <radialGradient id={`atm-${id}`} cx="50%" cy="50%" r="55%">
          <stop offset="86%" stopColor={planet.color} stopOpacity="0" />
          <stop offset="100%" stopColor={planet.color} stopOpacity="0.55" />
        </radialGradient>
        <radialGradient id={`shade-${id}`} cx="68%" cy="68%" r="80%">
          <stop offset="0%" stopColor="rgba(0,0,0,0)" />
          <stop offset="55%" stopColor="rgba(0,0,0,0.22)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.78)" />
        </radialGradient>
        <radialGradient id={`shine-${id}`} cx="30%" cy="30%" r="36%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.45)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
        <clipPath id={`clip-${id}`}>
          <circle cx="0" cy="0" r="48" />
        </clipPath>
      </defs>
      <circle cx="0" cy="0" r="58" fill={`url(#atm-${id})`} />
      <g clipPath={`url(#clip-${id})`}>
        <PlanetSurface planet={planet} paused={paused} />
      </g>
      <circle cx="0" cy="0" r="48" fill={`url(#shade-${id})`} />
      <circle cx="0" cy="0" r="48" fill={`url(#shine-${id})`} />
    </svg>
  );
}

const _isBhMobile = typeof window !== 'undefined' && window.innerWidth < 768;
const BH_FILAMENTS = (() => {
  let s = 73921;
  const r = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  const count = _isBhMobile ? 60 : 140;
  return Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * 360 + (r() * 6 - 3);
    const length = 55 + r() * 75;
    const opacity = 0.08 + r() * 0.42;
    const width = 0.3 + r() * 1.1;
    const startR = 42 + r() * 4;
    return { angle, length, opacity, width, startR };
  });
})();

const BH_FILAMENTS_INNER = (() => {
  let s = 18273;
  const r = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  const count = _isBhMobile ? 50 : 110;
  return Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * 360 + (r() * 6 - 3);
    const length = 25 + r() * 25;
    const opacity = 0.2 + r() * 0.5;
    const width = 0.4 + r() * 0.9;
    const startR = 42 + r() * 2;
    return { angle, length, opacity, width, startR };
  });
})();

function BlackHoleVisual({ size = 200, paused = false }) {
  return (
    <svg
      viewBox="-150 -120 300 240"
      width={size}
      height={size * 0.8}
      style={{ overflow: 'visible', display: 'block' }}
    >
      <defs>
        <radialGradient id="bh-whiteglow" cx="50%" cy="50%" r="50%">
          <stop offset="28%" stopColor="rgba(255,255,255,0)" />
          <stop offset="35%" stopColor="rgba(255,255,255,0.95)" />
          <stop offset="48%" stopColor="rgba(220,225,255,0.45)" />
          <stop offset="70%" stopColor="rgba(180,190,230,0.12)" />
          <stop offset="100%" stopColor="rgba(180,190,230,0)" />
        </radialGradient>
        <radialGradient id="bh-sphere" cx="42%" cy="35%" r="65%">
          <stop offset="0%" stopColor="rgba(70,70,75,1)" />
          <stop offset="14%" stopColor="rgba(20,20,22,1)" />
          <stop offset="60%" stopColor="rgba(0,0,0,1)" />
          <stop offset="100%" stopColor="#000000" />
        </radialGradient>
        <radialGradient id="bh-highlight" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.85)" />
          <stop offset="50%" stopColor="rgba(255,255,255,0.25)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
        <radialGradient id="bh-edgeglow" cx="50%" cy="50%" r="50%">
          <stop offset="60%" stopColor="rgba(255,255,255,0)" />
          <stop offset="85%" stopColor="rgba(255,255,255,0.6)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
        <filter id="bh-soft">
          <feGaussianBlur stdDeviation="0.6" />
        </filter>
      </defs>

      <circle cx="0" cy="0" r="125" fill="url(#bh-whiteglow)" />

      <g
        style={{
          animation: paused ? 'none' : 'bhFilamentSpin 80s linear infinite',
          transformBox: 'fill-box',
          transformOrigin: 'center',
        }}
        filter="url(#bh-soft)"
      >
        {BH_FILAMENTS.map((f, i) => {
          const a = (f.angle * Math.PI) / 180;
          const x1 = Math.cos(a) * f.startR;
          const y1 = Math.sin(a) * f.startR;
          const x2 = Math.cos(a) * (f.startR + f.length);
          const y2 = Math.sin(a) * (f.startR + f.length);
          return (
            <line
              key={`f-${i}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#ffffff"
              strokeWidth={f.width}
              strokeLinecap="round"
              opacity={f.opacity}
            />
          );
        })}
      </g>

      <g
        style={{
          animation: paused ? 'none' : 'bhFilamentSpin 50s linear infinite reverse',
          transformBox: 'fill-box',
          transformOrigin: 'center',
        }}
      >
        {BH_FILAMENTS_INNER.map((f, i) => {
          const a = (f.angle * Math.PI) / 180;
          const x1 = Math.cos(a) * f.startR;
          const y1 = Math.sin(a) * f.startR;
          const x2 = Math.cos(a) * (f.startR + f.length);
          const y2 = Math.sin(a) * (f.startR + f.length);
          return (
            <line
              key={`fi-${i}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#ffffff"
              strokeWidth={f.width}
              strokeLinecap="round"
              opacity={f.opacity}
            />
          );
        })}
      </g>

      <circle cx="0" cy="0" r="46" fill="url(#bh-edgeglow)" opacity="0.95" />
      <circle cx="0" cy="0" r="40" fill="#000000" />
      <circle cx="0" cy="0" r="40" fill="url(#bh-sphere)" />
      <circle cx="-3" cy="-6" r="5" fill="url(#bh-highlight)" />
      <circle cx="0" cy="0" r="40.5" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="0.6" />
    </svg>
  );
}

function RealisticSun({ size = 100, paused = false }) {
  return (
    <svg
      viewBox="-50 -50 100 100"
      width={size}
      height={size}
      style={{ overflow: 'visible', display: 'block' }}
    >
      <defs>
        <radialGradient id="sun-corona" cx="50%" cy="50%" r="55%">
          <stop offset="60%" stopColor="#ff8800" stopOpacity="0" />
          <stop offset="80%" stopColor="#ff7700" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#cc4400" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="sun-body" cx="40%" cy="40%" r="65%">
          <stop offset="0%" stopColor="#fff8c8" />
          <stop offset="40%" stopColor="#ffcc40" />
          <stop offset="80%" stopColor="#ff8800" />
          <stop offset="100%" stopColor="#cc3300" />
        </radialGradient>
        <radialGradient id="sun-shade" cx="65%" cy="65%" r="70%">
          <stop offset="0%" stopColor="rgba(0,0,0,0)" />
          <stop offset="100%" stopColor="rgba(140,30,0,0.55)" />
        </radialGradient>
      </defs>
      <circle
        cx="0"
        cy="0"
        r="68"
        fill="url(#sun-corona)"
        style={{
          animation: paused ? 'none' : 'sunCorona 4s ease-in-out infinite',
          transformOrigin: 'center',
        }}
      />
      <circle cx="0" cy="0" r="46" fill="url(#sun-body)" />
      <circle cx="-8" cy="-4" r="3.5" fill="#aa3300" opacity="0.45" />
      <circle cx="14" cy="6" r="2.5" fill="#aa3300" opacity="0.4" />
      <circle cx="-2" cy="14" r="2" fill="#aa3300" opacity="0.4" />
      <circle cx="18" cy="-12" r="1.8" fill="#aa3300" opacity="0.4" />
      <circle cx="-18" cy="18" r="1.5" fill="#aa3300" opacity="0.4" />
      <path
        d="M 30 -20 Q 36 -28, 28 -34"
        stroke="#ffaa00"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        opacity="0.7"
      />
      <path
        d="M -32 8 Q -42 14, -38 22"
        stroke="#ffaa00"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        opacity="0.7"
      />
      <circle cx="0" cy="0" r="46" fill="url(#sun-shade)" />
    </svg>
  );
}

function generateGalaxyStars(seed, opts = {}) {
  let s = seed;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  const isMob = typeof window !== 'undefined' && window.innerWidth < 768;
  const sizeMul = isMob ? 1.6 : 1;
  const armCount = opts.armCount ?? 2;
  const starsPerArm = opts.starsPerArm ?? (isMob ? 100 : 240);
  const bulgeStars = opts.bulgeStars ?? (isMob ? 40 : 90);
  const haloStars = opts.haloStars ?? (isMob ? 30 : 80);
  const dustStars = opts.dustStars ?? (isMob ? 25 : 60);
  const twist = opts.twist ?? Math.PI * 2.5;
  const flatten = opts.flatten ?? 0.92;
  const maxRadius = opts.maxRadius ?? 90;

  const stars = [];

  for (let i = 0; i < bulgeStars; i++) {
    const angle = rand() * Math.PI * 2;
    const r = Math.pow(rand(), 0.6) * 22;
    stars.push({
      x: Math.cos(angle) * r,
      y: Math.sin(angle) * r * flatten,
      size: (0.5 + rand() * 1.0) * sizeMul,
      opacity: 0.75 + rand() * 0.25,
      kind: 'core',
    });
  }

  for (let arm = 0; arm < armCount; arm++) {
    const armOffset = (arm / armCount) * Math.PI * 2;
    for (let i = 0; i < starsPerArm; i++) {
      const t = i / starsPerArm;
      const r = maxRadius * Math.pow(t, 0.55);
      const angle = armOffset + t * twist + (rand() - 0.5) * 0.55;
      const noiseX = (rand() - 0.5) * 9;
      const noiseY = (rand() - 0.5) * 7;
      const roll = rand();
      stars.push({
        x: Math.cos(angle) * r + noiseX,
        y: Math.sin(angle) * r * flatten + noiseY,
        size: (0.3 + rand() * 1.4) * sizeMul,
        opacity: 0.55 + rand() * 0.45,
        kind: roll < 0.7 ? 'arm' : roll < 0.9 ? 'core' : 'highlight',
      });
    }
  }

  for (let i = 0; i < haloStars; i++) {
    const angle = rand() * Math.PI * 2;
    const r = 25 + rand() * (maxRadius - 5);
    stars.push({
      x: Math.cos(angle) * r,
      y: Math.sin(angle) * r * flatten,
      size: (0.2 + rand() * 0.7) * sizeMul,
      opacity: 0.25 + rand() * 0.35,
      kind: 'halo',
    });
  }

  for (let i = 0; i < dustStars; i++) {
    const angle = rand() * Math.PI * 2;
    const r = 70 + rand() * 35;
    stars.push({
      x: Math.cos(angle) * r,
      y: Math.sin(angle) * r * flatten,
      size: (0.4 + rand() * 1.2) * sizeMul,
      opacity: 0.18 + rand() * 0.3,
      kind: 'dust',
    });
  }

  return stars;
}

function spiralArmPath(armOffset, twist, maxRadius, flatten, points = 50) {
  const pts = [];
  for (let i = 0; i <= points; i++) {
    const t = i / points;
    const r = maxRadius * Math.pow(t, 0.55);
    const a = armOffset + t * twist;
    const x = Math.cos(a) * r;
    const y = Math.sin(a) * r * flatten;
    pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }
  return 'M ' + pts.join(' L ');
}

function RealisticGalaxy({ id, size, armColor, coreColor, glowColor, dustColor, spinDuration, paused, tilt = 0 }) {
  const stars = useMemo(
    () => generateGalaxyStars(id.length * 9173 + id.charCodeAt(0) * 113),
    [id]
  );

  const colorMap = {
    core: '#ffffff',
    arm: armColor,
    highlight: '#fff4cc',
    halo: '#e0e8ff',
    dust: dustColor || '#a05a44',
  };

  return (
    <div style={{ transform: `rotate(${tilt}deg)`, width: size, height: size * 0.92 }}>
      <svg viewBox="-115 -105 230 210" width={size} height={size * 0.92} style={{ overflow: 'visible' }}>
        <defs>
          <radialGradient id={`outerdust-${id}`}>
            <stop offset="55%" stopColor={dustColor || '#a05a44'} stopOpacity="0" />
            <stop offset="72%" stopColor={dustColor || '#7a3a2a'} stopOpacity="0.5" />
            <stop offset="88%" stopColor={dustColor || '#3a1818'} stopOpacity="0.4" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </radialGradient>
          <radialGradient id={`innerglow-${id}`}>
            <stop offset="0%" stopColor={glowColor} stopOpacity="0.7" />
            <stop offset="35%" stopColor={glowColor} stopOpacity="0.32" />
            <stop offset="65%" stopColor={glowColor} stopOpacity="0.1" />
            <stop offset="100%" stopColor={glowColor} stopOpacity="0" />
          </radialGradient>
          <radialGradient id={`bulgeBright-${id}`}>
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="14%" stopColor={coreColor} stopOpacity="1" />
            <stop offset="40%" stopColor={coreColor} stopOpacity="0.6" />
            <stop offset="100%" stopColor={coreColor} stopOpacity="0" />
          </radialGradient>
          <filter id={`bulgeGlow-${id}`}>
            <feGaussianBlur stdDeviation="0.8" />
          </filter>
        </defs>

        <ellipse cx="0" cy="0" rx="112" ry="103" fill={`url(#outerdust-${id})`} />
        <ellipse cx="0" cy="0" rx="95" ry="87" fill={`url(#innerglow-${id})`} />

        <g
          style={{
            transformBox: 'fill-box',
            transformOrigin: 'center',
            animation: paused ? 'none' : `galaxySpin ${spinDuration}s linear infinite`,
          }}
        >
          {stars.map((st, i) => (
            <circle
              key={i}
              cx={st.x}
              cy={st.y}
              r={st.size}
              fill={colorMap[st.kind] || '#ffffff'}
              opacity={st.opacity}
            />
          ))}
        </g>

        <ellipse cx="0" cy="0" rx="24" ry="22" fill={`url(#bulgeBright-${id})`} filter={`url(#bulgeGlow-${id})`} />
        <circle cx="0" cy="0" r="6" fill="#ffffff" />
      </svg>
    </div>
  );
}

function Constellation({ data, onClick, visited }) {
  const isVisited = visited?.has(data.id);
  return (
    <button
      onClick={onClick}
      className="absolute group cursor-pointer"
      style={{
        ...data.position,
        zIndex: 4,
        background: 'transparent',
        border: 'none',
        padding: 0,
      }}
      title={`${data.symbol} ${data.name}`}
    >
      <svg viewBox="0 0 80 80" width="92" height="92" style={{ overflow: 'visible' }}>
        {data.lines.map(([a, b], i) => (
          <line
            key={`l-${i}`}
            x1={data.stars[a][0]}
            y1={data.stars[a][1]}
            x2={data.stars[b][0]}
            y2={data.stars[b][1]}
            stroke={data.color}
            strokeWidth="0.8"
            opacity={isVisited ? 0.55 : 0.22}
            strokeLinecap="round"
            className="group-hover:opacity-90 transition-opacity"
          />
        ))}
        {data.stars.map(([x, y], i) => (
          <g key={`s-${i}`}>
            <circle
              cx={x}
              cy={y}
              r="3"
              fill={data.color}
              opacity="0.35"
              className="group-hover:opacity-80 transition-opacity"
            />
            <circle
              cx={x}
              cy={y}
              r="1.6"
              fill="#ffffff"
              opacity="0.95"
              style={{ filter: `drop-shadow(0 0 2px ${data.color})` }}
            />
          </g>
        ))}
      </svg>
      <div
        className="absolute left-1/2 -translate-x-1/2 text-xs whitespace-nowrap font-semibold pointer-events-none transition-opacity"
        style={{
          bottom: '-4px',
          color: data.color,
          textShadow: '0 1px 3px rgba(0,0,0,0.95)',
          opacity: isVisited ? 0.65 : 0,
        }}
      >
        <span className="group-hover:opacity-100" style={{ opacity: isVisited ? 1 : 'inherit' }}>
          {data.symbol} {data.name}
        </span>
      </div>
    </button>
  );
}

function UFO({ size = 80 }) {
  return (
    <svg viewBox="0 0 140 110" width={size} height={(size * 110) / 140} style={{ overflow: 'visible' }}>
      <defs>
        <radialGradient id="ufo-glow" cx="50%" cy="100%" r="60%">
          <stop offset="0%" stopColor="rgba(140,255,200,0.85)" />
          <stop offset="60%" stopColor="rgba(80,220,160,0.4)" />
          <stop offset="100%" stopColor="rgba(80,220,160,0)" />
        </radialGradient>
        <radialGradient id="ufo-dome" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="rgba(220,250,255,0.95)" />
          <stop offset="50%" stopColor="rgba(140,200,240,0.8)" />
          <stop offset="100%" stopColor="rgba(40,90,160,0.85)" />
        </radialGradient>
        <linearGradient id="ufo-body" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#a8b8c8" />
          <stop offset="50%" stopColor="#5a6878" />
          <stop offset="100%" stopColor="#2a3848" />
        </linearGradient>
      </defs>
      <ellipse cx="70" cy="100" rx="55" ry="18" fill="url(#ufo-glow)" />
      <ellipse cx="70" cy="58" rx="52" ry="12" fill="url(#ufo-body)" />
      <ellipse cx="70" cy="55" rx="52" ry="3" fill="rgba(0,0,0,0.4)" />
      <ellipse cx="70" cy="42" rx="32" ry="22" fill="url(#ufo-dome)" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" />
      <ellipse cx="58" cy="32" rx="6" ry="9" fill="rgba(255,255,255,0.55)" />
      <circle cx="68" cy="42" r="3" fill="#5fbf5f" />
      <ellipse cx="68" cy="40" rx="2" ry="3" fill="#88e088" />
      <circle cx="63" cy="38" r="0.8" fill="#222" />
      <circle cx="73" cy="38" r="0.8" fill="#222" />
      <path d="M 64 46 Q 68 49 72 46" stroke="#222" strokeWidth="1" fill="none" strokeLinecap="round" />
      <circle cx="35" cy="63" r="3" fill="#ff5566">
        <animate attributeName="opacity" values="1;0.3;1" dur="0.6s" repeatCount="indefinite" />
      </circle>
      <circle cx="50" cy="65" r="3" fill="#ffcc44">
        <animate attributeName="opacity" values="1;0.3;1" dur="0.6s" repeatCount="indefinite" begin="0.15s" />
      </circle>
      <circle cx="70" cy="66" r="3" fill="#5fff88">
        <animate attributeName="opacity" values="1;0.3;1" dur="0.6s" repeatCount="indefinite" begin="0.3s" />
      </circle>
      <circle cx="90" cy="65" r="3" fill="#88aaff">
        <animate attributeName="opacity" values="1;0.3;1" dur="0.6s" repeatCount="indefinite" begin="0.45s" />
      </circle>
      <circle cx="105" cy="63" r="3" fill="#cc88ff">
        <animate attributeName="opacity" values="1;0.3;1" dur="0.6s" repeatCount="indefinite" begin="0.6s" />
      </circle>
    </svg>
  );
}

function SnakeAstronaut({ size = 160 }) {
  return (
    <svg viewBox="0 0 280 160" width={size} height={(size * 160) / 280} style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id="snakeBodyG" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#a8f0a8" />
          <stop offset="35%" stopColor="#5fcf5f" />
          <stop offset="70%" stopColor="#3a9a3a" />
          <stop offset="100%" stopColor="#1f5a1f" />
        </linearGradient>
        <radialGradient id="snakeHead" cx="0.35" cy="0.3">
          <stop offset="0%" stopColor="#a8f0a8" />
          <stop offset="60%" stopColor="#5fcf5f" />
          <stop offset="100%" stopColor="#2d7d2d" />
        </radialGradient>
        <radialGradient id="snakeBelly" cx="0.5" cy="0.5">
          <stop offset="0%" stopColor="#e8ffe8" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#a8eba8" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="snakeHelmetG" cx="0.3" cy="0.25">
          <stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
          <stop offset="40%" stopColor="rgba(180,220,255,0.4)" />
          <stop offset="100%" stopColor="rgba(120,180,230,0.18)" />
        </radialGradient>
      </defs>
      <path
        d="M 8 110 Q 40 55, 78 100 T 158 92 T 230 62"
        stroke="rgba(0,0,0,0.35)"
        strokeWidth="34"
        fill="none"
        strokeLinecap="round"
        transform="translate(2,4)"
      />
      <path
        d="M 8 110 Q 40 55, 78 100 T 158 92 T 230 62"
        stroke="#1f5a1f"
        strokeWidth="30"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M 8 110 Q 40 55, 78 100 T 158 92 T 230 62"
        stroke="url(#snakeBodyG)"
        strokeWidth="26"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M 10 110 Q 40 60, 78 100 T 158 92 T 228 62"
        stroke="rgba(255,255,255,0.45)"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
        transform="translate(0,-7)"
      />
      <g opacity="0.85">
        <ellipse cx="32" cy="98" rx="5" ry="3" fill="#c8f5c8" opacity="0.7" />
        <ellipse cx="58" cy="78" rx="5" ry="3" fill="#c8f5c8" opacity="0.7" />
        <ellipse cx="84" cy="92" rx="5" ry="3" fill="#c8f5c8" opacity="0.7" />
        <ellipse cx="110" cy="80" rx="5" ry="3" fill="#c8f5c8" opacity="0.7" />
        <ellipse cx="136" cy="98" rx="5" ry="3" fill="#c8f5c8" opacity="0.7" />
        <ellipse cx="162" cy="86" rx="5" ry="3" fill="#c8f5c8" opacity="0.7" />
        <ellipse cx="188" cy="76" rx="5" ry="3" fill="#c8f5c8" opacity="0.7" />
        <ellipse cx="214" cy="70" rx="5" ry="3" fill="#c8f5c8" opacity="0.7" />
      </g>
      <g opacity="0.6">
        <circle cx="44" cy="92" r="2" fill="rgba(255,255,255,0.6)" />
        <circle cx="98" cy="84" r="2" fill="rgba(255,255,255,0.6)" />
        <circle cx="148" cy="92" r="2" fill="rgba(255,255,255,0.6)" />
        <circle cx="200" cy="73" r="2" fill="rgba(255,255,255,0.6)" />
      </g>
      <ellipse cx="234" cy="62" rx="30" ry="26" fill="rgba(0,0,0,0.35)" transform="translate(2,3)" />
      <ellipse cx="234" cy="62" rx="28" ry="24" fill="url(#snakeHead)" />
      <ellipse cx="234" cy="62" rx="32" ry="28" fill="url(#snakeHelmetG)" stroke="rgba(255,255,255,0.95)" strokeWidth="2.5" />
      <ellipse cx="216" cy="48" rx="7" ry="13" fill="rgba(255,255,255,0.65)" transform="rotate(-15 216 48)" />
      <ellipse cx="252" cy="76" rx="3" ry="5" fill="rgba(255,255,255,0.4)" />
      <ellipse cx="220" cy="74" rx="4" ry="2" fill="#ff95b4" opacity="0.75" />
      <ellipse cx="252" cy="74" rx="4" ry="2" fill="#ff95b4" opacity="0.75" />
      <circle cx="224" cy="58" r="7" fill="#ffffff" stroke="#1a1a1a" strokeWidth="1.5" />
      <circle cx="246" cy="58" r="7" fill="#ffffff" stroke="#1a1a1a" strokeWidth="1.5" />
      <circle cx="225" cy="60" r="4.2" fill="#1a1a1a" />
      <circle cx="247" cy="60" r="4.2" fill="#1a1a1a" />
      <circle cx="222" cy="56" r="2" fill="#ffffff" />
      <circle cx="244" cy="56" r="2" fill="#ffffff" />
      <circle cx="227" cy="62" r="0.8" fill="#ffffff" opacity="0.6" />
      <circle cx="249" cy="62" r="0.8" fill="#ffffff" opacity="0.6" />
      <path d="M 224 76 Q 235 83 246 76" stroke="#1a1a1a" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <path d="M 230 80 Q 235 84 240 80 Q 235 83 230 80 Z" fill="#ff5577" opacity="0.7" />
      <path
        d="M 264 64 Q 270 62, 274 65 L 270 68 L 278 70 L 270 74 L 274 78 L 264 80"
        fill="#ff3355"
        stroke="#aa1133"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      <circle cx="220" cy="34" r="3" fill="#ffd633">
        <animate attributeName="r" values="3;3.8;3" dur="1.4s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.95;0.6;0.95" dur="1.4s" repeatCount="indefinite" />
      </circle>
      <line x1="220" y1="34" x2="226" y2="42" stroke="#ffd63380" strokeWidth="1.2" />
      <path d="M -2 110 L -14 100 L -10 110 L -14 120 Z" fill="#1f5a1f" />
      <path d="M -2 110 L -10 104 L -8 110 L -10 116 Z" fill="#5fcf5f" opacity="0.7" />
      <text x="234" y="92" textAnchor="middle" fontSize="6" fontWeight="bold" fill="#1a1a1a" opacity="0.5">SIS</text>
    </svg>
  );
}

function PenguinAstronaut({ size = 110 }) {
  return (
    <svg viewBox="0 0 130 195" width={size} height={(size * 195) / 130} style={{ overflow: 'visible' }}>
      <defs>
        <radialGradient id="penguBodyG" cx="0.32" cy="0.28">
          <stop offset="0%" stopColor="#7a7d85" />
          <stop offset="40%" stopColor="#3a3d45" />
          <stop offset="80%" stopColor="#1a1c22" />
          <stop offset="100%" stopColor="#0a0b0f" />
        </radialGradient>
        <radialGradient id="penguBellyG" cx="0.42" cy="0.4">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="60%" stopColor="#fafafa" />
          <stop offset="100%" stopColor="#d8d8e0" />
        </radialGradient>
        <radialGradient id="penguHeadG" cx="0.32" cy="0.28">
          <stop offset="0%" stopColor="#5a5d65" />
          <stop offset="50%" stopColor="#2a2d35" />
          <stop offset="100%" stopColor="#0e0f15" />
        </radialGradient>
        <radialGradient id="penguHelmetG" cx="0.28" cy="0.22">
          <stop offset="0%" stopColor="rgba(255,255,255,0.98)" />
          <stop offset="30%" stopColor="rgba(180,220,255,0.45)" />
          <stop offset="70%" stopColor="rgba(120,180,230,0.18)" />
          <stop offset="100%" stopColor="rgba(80,140,200,0.12)" />
        </radialGradient>
        <radialGradient id="penguBeakG" cx="0.4" cy="0.3">
          <stop offset="0%" stopColor="#ffd066" />
          <stop offset="60%" stopColor="#ff9922" />
          <stop offset="100%" stopColor="#cc5500" />
        </radialGradient>
        <linearGradient id="penguPackG" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#cc8855" />
          <stop offset="50%" stopColor="#9a5530" />
          <stop offset="100%" stopColor="#5a2f15" />
        </linearGradient>
      </defs>
      <ellipse cx="65" cy="180" rx="38" ry="6" fill="rgba(0,0,0,0.4)" />
      <rect x="40" y="95" width="50" height="58" rx="11" fill="url(#penguPackG)" />
      <rect x="40" y="95" width="50" height="58" rx="11" fill="rgba(255,255,255,0.08)" />
      <rect x="46" y="103" width="6" height="40" rx="2" fill="#3a1f0a" opacity="0.7" />
      <rect x="78" y="103" width="6" height="40" rx="2" fill="#3a1f0a" opacity="0.7" />
      <rect x="56" y="115" width="18" height="3" rx="1.5" fill="#ffaa00" opacity="0.85" />
      <rect x="56" y="122" width="14" height="2.5" rx="1" fill="#88dd44" opacity="0.85" />
      <circle cx="94" cy="92" r="4" fill="#ffaa00">
        <animate attributeName="opacity" values="1;0.5;1" dur="1.4s" repeatCount="indefinite" />
      </circle>
      <line x1="94" y1="92" x2="106" y2="68" stroke="#888" strokeWidth="2" />
      <circle cx="106" cy="68" r="4" fill="#ff4444">
        <animate attributeName="opacity" values="1;0.3;1" dur="1.2s" repeatCount="indefinite" />
      </circle>
      <ellipse cx="65" cy="120" rx="48" ry="58" fill="url(#penguBodyG)" />
      <path d="M 32 130 Q 25 145 28 165" stroke="rgba(255,255,255,0.18)" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M 100 130 Q 108 145 102 165" stroke="rgba(255,255,255,0.12)" strokeWidth="3" fill="none" strokeLinecap="round" />
      <ellipse cx="65" cy="125" rx="33" ry="44" fill="url(#penguBellyG)" />
      <ellipse cx="55" cy="108" rx="5" ry="14" fill="rgba(255,255,255,0.55)" />
      <ellipse cx="75" cy="155" rx="3" ry="9" fill="rgba(0,0,0,0.06)" />
      <circle cx="60" cy="135" r="3" fill="#5fbf5f" stroke="#fff" strokeWidth="0.8" opacity="0.85" />
      <text x="60" y="138" textAnchor="middle" fontSize="4" fontWeight="bold" fill="#fff">PIP</text>
      <ellipse cx="20" cy="120" rx="12" ry="30" fill="url(#penguBodyG)" transform="rotate(-18 20 120)" />
      <ellipse cx="110" cy="120" rx="12" ry="30" fill="url(#penguBodyG)" transform="rotate(18 110 120)">
        <animateTransform attributeName="transform" type="rotate" values="18 110 120;35 110 120;18 110 120" dur="1.4s" repeatCount="indefinite" />
      </ellipse>
      <ellipse cx="115" cy="98" rx="6" ry="3" fill="rgba(255,255,255,0.3)" transform="rotate(18 115 98)" />
      <ellipse cx="48" cy="180" rx="15" ry="7" fill="url(#penguBeakG)" />
      <ellipse cx="82" cy="180" rx="15" ry="7" fill="url(#penguBeakG)" />
      <ellipse cx="48" cy="178" rx="11" ry="3" fill="rgba(255,255,255,0.35)" />
      <ellipse cx="82" cy="178" rx="11" ry="3" fill="rgba(255,255,255,0.35)" />
      <circle cx="49" cy="183" r="1.4" fill="#3a1500" />
      <circle cx="83" cy="183" r="1.4" fill="#3a1500" />
      <circle cx="65" cy="60" r="44" fill="rgba(0,0,0,0.4)" transform="translate(2,3)" />
      <circle cx="65" cy="60" r="44" fill="url(#penguHelmetG)" stroke="rgba(255,255,255,0.95)" strokeWidth="3" />
      <ellipse cx="48" cy="40" rx="10" ry="18" fill="rgba(255,255,255,0.78)" transform="rotate(-12 48 40)" />
      <ellipse cx="82" cy="80" rx="4" ry="7" fill="rgba(255,255,255,0.45)" />
      <ellipse cx="65" cy="64" rx="32" ry="34" fill="url(#penguHeadG)" />
      <ellipse cx="65" cy="72" rx="24" ry="26" fill="#ffffff" />
      <circle cx="65" cy="72" r="22" fill="rgba(255,255,255,0.5)" filter="blur(0.5)" />
      <circle cx="55" cy="58" r="9" fill="#ffffff" stroke="#1a1a1a" strokeWidth="1.6" />
      <circle cx="75" cy="58" r="9" fill="#ffffff" stroke="#1a1a1a" strokeWidth="1.6" />
      <circle cx="56" cy="60" r="5.5" fill="#1a1a1a" />
      <circle cx="76" cy="60" r="5.5" fill="#1a1a1a" />
      <circle cx="54" cy="57" r="2.5" fill="#ffffff" />
      <circle cx="74" cy="57" r="2.5" fill="#ffffff" />
      <circle cx="58" cy="63" r="1" fill="#ffffff" opacity="0.8" />
      <circle cx="78" cy="63" r="1" fill="#ffffff" opacity="0.8" />
      <ellipse cx="46" cy="76" rx="6" ry="3.5" fill="#ff9eb5" opacity="0.7" />
      <ellipse cx="84" cy="76" rx="6" ry="3.5" fill="#ff9eb5" opacity="0.7" />
      <path d="M 56 80 Q 65 92 74 80 Q 65 85 56 80 Z" fill="url(#penguBeakG)" stroke="#aa5500" strokeWidth="1" />
      <path d="M 60 82 Q 65 86 70 82" stroke="#aa5500" strokeWidth="0.5" fill="none" />
      <path d="M 56 90 Q 65 96 74 90" stroke="#1a1a1a" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <path d="M 60 92 Q 65 95 70 92 Q 65 95 60 92 Z" fill="#ff7799" opacity="0.7" />
    </svg>
  );
}

function Rocket({ size = 110 }) {
  return (
    <svg viewBox="0 0 110 280" width={size} height={(size * 280) / 110} style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id="rocketBodyGrad" x1="0" x2="1">
          <stop offset="0%" stopColor="#cccfd6" />
          <stop offset="40%" stopColor="#ffffff" />
          <stop offset="70%" stopColor="#a8acb5" />
          <stop offset="100%" stopColor="#6a6e78" />
        </linearGradient>
        <linearGradient id="rocketTipGrad" x1="0" x2="1">
          <stop offset="0%" stopColor="#cc1133" />
          <stop offset="50%" stopColor="#ff5566" />
          <stop offset="100%" stopColor="#881122" />
        </linearGradient>
        <linearGradient id="rocketFinGrad" x1="0" x2="1">
          <stop offset="0%" stopColor="#dd2244" />
          <stop offset="100%" stopColor="#881122" />
        </linearGradient>
        <radialGradient id="rocketWindowGrad" cx="0.3" cy="0.3">
          <stop offset="0%" stopColor="#e8f4ff" />
          <stop offset="50%" stopColor="#5599dd" />
          <stop offset="100%" stopColor="#114477" />
        </radialGradient>
      </defs>
      <circle cx="55" cy="262" r="14" fill="rgba(255,255,255,0.5)">
        <animate attributeName="cy" values="262;278;262" dur="1.1s" repeatCount="indefinite" />
        <animate attributeName="r" values="14;20;14" dur="1.1s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.5;0;0.5" dur="1.1s" repeatCount="indefinite" />
      </circle>
      <circle cx="38" cy="270" r="9" fill="rgba(255,255,255,0.4)">
        <animate attributeName="cy" values="270;282;270" dur="1.4s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.4;0;0.4" dur="1.4s" repeatCount="indefinite" />
      </circle>
      <circle cx="72" cy="270" r="9" fill="rgba(255,255,255,0.4)">
        <animate attributeName="cy" values="270;282;270" dur="1s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.4;0;0.4" dur="1s" repeatCount="indefinite" />
      </circle>
      <ellipse cx="55" cy="248" rx="20" ry="36" fill="#ff7700" opacity="0.75">
        <animate attributeName="ry" values="36;48;36" dur="0.28s" repeatCount="indefinite" />
      </ellipse>
      <ellipse cx="55" cy="244" rx="14" ry="28" fill="#ffcc22">
        <animate attributeName="ry" values="28;38;28" dur="0.22s" repeatCount="indefinite" />
      </ellipse>
      <ellipse cx="55" cy="240" rx="8" ry="18" fill="#ffffff">
        <animate attributeName="ry" values="18;26;18" dur="0.22s" repeatCount="indefinite" />
      </ellipse>
      <rect x="40" y="218" width="30" height="14" fill="#444" />
      <rect x="36" y="226" width="38" height="6" fill="#222" />
      <rect x="40" y="218" width="30" height="3" fill="#666" />
      <polygon points="22,220 4,232 4,210 32,200" fill="url(#rocketFinGrad)" />
      <polygon points="22,220 4,232 4,210 32,200" fill="rgba(0,0,0,0.25)" transform="translate(0,4)" />
      <polygon points="88,220 106,232 106,210 78,200" fill="url(#rocketFinGrad)" />
      <polygon points="88,220 106,232 106,210 78,200" fill="rgba(255,255,255,0.18)" transform="translate(0,4)" />
      <polygon points="55,200 45,225 65,225" fill="#aa1133" />
      <rect x="32" y="80" width="46" height="138" rx="8" fill="url(#rocketBodyGrad)" />
      <rect x="32" y="80" width="46" height="138" rx="8" fill="rgba(0,0,0,0.15)" clipPath="url(#rightHalf)" />
      <path d="M 32 80 Q 55 0 78 80 Z" fill="url(#rocketTipGrad)" />
      <circle cx="55" cy="40" r="3" fill="#fff" opacity="0.85" />
      <rect x="32" y="138" width="46" height="9" fill="#cc2244" />
      <rect x="32" y="155" width="46" height="3" fill="#0066cc" />
      <circle cx="55" cy="100" r="9" fill="url(#rocketWindowGrad)" stroke="#ffffff" strokeWidth="3" />
      <circle cx="55" cy="100" r="9" fill="none" stroke="rgba(0,0,0,0.3)" strokeWidth="1" />
      <circle cx="52" cy="97" r="2.5" fill="#fff" opacity="0.9" />
      <circle cx="55" cy="125" r="6" fill="url(#rocketWindowGrad)" stroke="#ffffff" strokeWidth="2" />
      <circle cx="53" cy="123" r="1.5" fill="#fff" opacity="0.9" />
      <circle cx="55" cy="180" r="6" fill="url(#rocketWindowGrad)" stroke="#ffffff" strokeWidth="2" />
      <circle cx="53" cy="178" r="1.5" fill="#fff" opacity="0.9" />
      <text x="55" y="200" textAnchor="middle" fill="#222" fontSize="10" fontWeight="bold" fontFamily="sans-serif">★</text>
      <rect x="38" y="84" width="3" height="130" fill="rgba(255,255,255,0.6)" rx="1.5" />
    </svg>
  );
}

function SpaceBuddy({ color = '#ffd966', size = 110 }) {
  return (
    <svg
      viewBox="0 0 140 160"
      width={size}
      height={(size * 160) / 140}
      style={{ animation: 'buddyWave 2.4s ease-in-out infinite', filter: `drop-shadow(0 6px 12px ${color}60)` }}
    >
      <line x1="48" y1="28" x2="38" y2="6" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
      <line x1="92" y1="28" x2="102" y2="6" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="38" cy="6" r="5" fill={color}>
        <animate attributeName="r" values="5;6.5;5" dur="1.6s" repeatCount="indefinite" />
      </circle>
      <circle cx="102" cy="6" r="5" fill={color}>
        <animate attributeName="r" values="5;6.5;5" dur="1.6s" repeatCount="indefinite" begin="0.4s" />
      </circle>
      <ellipse cx="70" cy="100" rx="46" ry="38" fill={color} />
      <ellipse cx="70" cy="62" rx="40" ry="36" fill="rgba(255,255,255,0.95)" stroke="rgba(255,255,255,0.6)" strokeWidth="2" />
      <ellipse cx="55" cy="60" rx="9" ry="11" fill="white" stroke="#222" strokeWidth="1.5" />
      <ellipse cx="85" cy="60" rx="9" ry="11" fill="white" stroke="#222" strokeWidth="1.5" />
      <circle cx="55" cy="62" r="4.5" fill="#222" />
      <circle cx="85" cy="62" r="4.5" fill="#222" />
      <circle cx="53" cy="59" r="2" fill="white" />
      <circle cx="83" cy="59" r="2" fill="white" />
      <circle cx="42" cy="74" r="5" fill="#ff9eb5" opacity="0.55" />
      <circle cx="98" cy="74" r="5" fill="#ff9eb5" opacity="0.55" />
      <path d="M 54 80 Q 70 94 86 80" stroke="#222" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M 60 82 Q 70 90 80 82 Q 70 96 60 82 Z" fill="#ff5577" opacity="0.7" />
      <ellipse cx="22" cy="105" rx="10" ry="16" fill={color} transform="rotate(-25 22 105)" />
      <ellipse cx="118" cy="100" rx="10" ry="16" fill={color} transform="rotate(35 118 100)">
        <animateTransform attributeName="transform" type="rotate" values="35 118 100;55 118 100;35 118 100" dur="1.2s" repeatCount="indefinite" />
      </ellipse>
      <circle cx="125" cy="82" r="7" fill={color} />
    </svg>
  );
}

export default function SolarSystem() {
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [paused, setPaused] = useState(false);
  const [muted, setMuted] = useState(false);
  const [stars, setStars] = useState([]);
  const [comets, setComets] = useState([]);
  const [asteroids, setAsteroids] = useState([]);
  const [visited, setVisited] = useState(() => new Set());
  const [showConfetti, setShowConfetti] = useState(false);
  const [systemScale, setSystemScale] = useState(0.6);
  const audioCtxRef = useRef(null);
  const mutedRef = useRef(muted);
  const ttsAudioRef = useRef(null);
  const ttsCancelTokenRef = useRef(0);
  const tourActiveRef = useRef(false);
  const ambientNodesRef = useRef(null);
  const [tourActive, setTourActive] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const [quizActive, setQuizActive] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFeedback, setQuizFeedback] = useState(null);
  const [ufo, setUfo] = useState(null);
  const [drawingMode, setDrawingMode] = useState(false);
  const [customPlanets, setCustomPlanets] = useState([]);
  const drawCanvasRef = useRef(null);
  const [drawColor, setDrawColor] = useState('#4a90d9');
  const [drawSize, setDrawSize] = useState(8);
  const drawStateRef = useRef({ drawing: false, lastX: 0, lastY: 0 });
  const [drawName, setDrawName] = useState('');
  const [earnedBadges, setEarnedBadges] = useState(() => new Set());
  const earnedBadgesRef = useRef(new Set());
  const [badgePopup, setBadgePopup] = useState(null);
  const [showAgeCalc, setShowAgeCalc] = useState(false);
  const [birthDate, setBirthDate] = useState('');
  const [showWishStar, setShowWishStar] = useState(null);
  const [wishText, setWishText] = useState('');
  const [wishFlying, setWishFlying] = useState(false);
  const [meteorShowerActive, setMeteorShowerActive] = useState(false);
  const [eclipseActive, setEclipseActive] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showGamesMenu, setShowGamesMenu] = useState(false);
  const [memoryGame, setMemoryGame] = useState(null);
  const [sortGame, setSortGame] = useState(null);
  const [stickerGallery, setStickerGallery] = useState(false);
  const [dailyChallenge, setDailyChallenge] = useState(null);
  const [storyMode, setStoryMode] = useState(null);

  useEffect(() => {
    earnedBadgesRef.current = earnedBadges;
  }, [earnedBadges]);

  useEffect(() => {
    mutedRef.current = muted;
    if (muted) {
      stopSpeech();
    }
  }, [muted]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('solarSystemProgress');
      if (raw) {
        const saved = JSON.parse(raw);
        if (Array.isArray(saved.visited)) setVisited(new Set(saved.visited));
        if (Array.isArray(saved.customPlanets)) setCustomPlanets(saved.customPlanets);
        if (Array.isArray(saved.earnedBadges)) setEarnedBadges(new Set(saved.earnedBadges));
      }
    } catch (e) {}
    try {
      const params = new URLSearchParams(window.location.search);
      const target = params.get('planet');
      if (target) {
        const all = [
          sunData,
          ...planets,
          ...cosmicObjects,
          ...zodiacConstellations,
          ...characters,
        ];
        const found = all.find((o) => o.id === target);
        if (found) {
          setTimeout(() => handlePlanetClick(found), 800);
        }
      }
    } catch (e) {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(
        'solarSystemProgress',
        JSON.stringify({
          visited: [...visited],
          customPlanets,
          earnedBadges: [...earnedBadgesRef.current],
        })
      );
    } catch (e) {}
  }, [visited, customPlanets]);

  useEffect(() => {
    const ufoMessages = [
      'Salutări, pământenilor! 👽',
      'Aveți pizza? Am venit pentru pizza! 🍕',
      'Frumoasă planeta voastră! Ce wifi aveți? 📡',
      'Mă întorc imediat — am uitat să-mi închid ușa la rachetă! 🚪',
      'E aici Marte? GPS-ul meu nu prinde semnal! 📍',
      'Bună! Sunt în vacanță prin galaxie! 🌌',
      'Vrei autograf? Sunt extraterestru celebru! ⭐',
      'Am mai multe luni decât voi! Nu vă supărați! 🌙',
      'Nu mă speriați — sunt prietenos, doar arăt ciudat! 🛸',
    ];
    let stopped = false;
    let timer;
    const schedule = () => {
      const delay = 25000 + Math.random() * 35000;
      timer = setTimeout(() => {
        if (stopped) return;
        const msg = ufoMessages[Math.floor(Math.random() * ufoMessages.length)];
        const fromLeft = Math.random() < 0.5;
        const top = 12 + Math.random() * 50;
        setUfo({ msg, fromLeft, top, id: Date.now() });
        setTimeout(() => setUfo(null), 12000);
        schedule();
      }, delay);
    };
    schedule();
    return () => {
      stopped = true;
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const SYSTEM_SIZE = 1740;
    const compute = () => {
      const isMob = window.innerWidth < 768;
      setIsMobile(isMob);
      const headerReserve = isMob ? 170 : 230;
      const availH = window.innerHeight - headerReserve;
      const availW = window.innerWidth - 20;
      const s = Math.min(availH / SYSTEM_SIZE, availW / SYSTEM_SIZE, 1);
      setSystemScale(Math.max(s, 0.18));
    };
    compute();
    window.addEventListener('resize', compute);
    return () => window.removeEventListener('resize', compute);
  }, []);

  const stopSpeech = () => {
    ttsCancelTokenRef.current += 1;
    if (ttsAudioRef.current) {
      try {
        ttsAudioRef.current.pause();
        ttsAudioRef.current.src = '';
      } catch (e) {}
      ttsAudioRef.current = null;
    }
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  };

  const splitTextForTTS = (text, maxLen = 180) => {
    const sentences = text.match(/[^.!?]+[.!?]?/g) || [text];
    const chunks = [];
    for (const s of sentences) {
      const t = s.trim();
      if (!t) continue;
      if (t.length <= maxLen) {
        chunks.push(t);
      } else {
        const parts = t.split(/[,;]/);
        let cur = '';
        for (const p of parts) {
          const next = cur ? cur + ', ' + p.trim() : p.trim();
          if (next.length > maxLen && cur) {
            chunks.push(cur);
            cur = p.trim();
          } else {
            cur = next;
          }
        }
        if (cur) chunks.push(cur);
      }
    }
    return chunks;
  };

  const tryAudioURL = (url, token) =>
    new Promise((resolve, reject) => {
      if (token !== ttsCancelTokenRef.current) return resolve();
      const audio = new Audio(url);
      ttsAudioRef.current = audio;
      const onEnd = () => {
        cleanup();
        resolve();
      };
      const onErr = (e) => {
        cleanup();
        reject(e);
      };
      const cleanup = () => {
        audio.removeEventListener('ended', onEnd);
        audio.removeEventListener('error', onErr);
      };
      audio.addEventListener('ended', onEnd);
      audio.addEventListener('error', onErr);
      audio.play().catch(onErr);
    });

  const playGoogleTTSChunk = (text, token) => {
    const googleURL = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(
      text
    )}&tl=ro&client=tw-ob&ttsspeed=0.95`;
    return tryAudioURL(googleURL, token);
  };

  const speakWithBrowser = (text) =>
    new Promise((resolve) => {
      if (typeof window === 'undefined' || !window.speechSynthesis) {
        return resolve();
      }
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = 'ro-RO';
      utter.rate = 0.92;
      utter.pitch = 1.2;
      const voices = window.speechSynthesis.getVoices();
      const roVoices = voices.filter((v) => v.lang && v.lang.toLowerCase().startsWith('ro'));
      const femaleRo =
        roVoices.find((v) => /ana|ioana|carmen|female|femeie/i.test(v.name)) ||
        roVoices.find((v) => !/andrei|male|barbat/i.test(v.name)) ||
        roVoices[0];
      if (femaleRo) utter.voice = femaleRo;
      utter.onend = () => resolve();
      utter.onerror = () => resolve();
      window.speechSynthesis.speak(utter);
    });

  useEffect(() => {
    const isMob = typeof window !== 'undefined' && window.innerWidth < 768;
    const STARS_COUNT = isMob ? 35 : 120;
    const COMETS_COUNT = isMob ? 10 : 76;
    const ASTEROIDS_COUNT = isMob ? 15 : 90;

    const generated = Array.from({ length: STARS_COUNT }, () => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 4,
      duration: Math.random() * 3 + 2,
    }));
    setStars(generated);

    const cometColors = ['#fff4a0', '#a8d5ff', '#ffd4a8', '#d8b4ff', '#a0ffd4'];
    const generatedComets = Array.from({ length: COMETS_COUNT }, () => {
      const angle = Math.random() * Math.PI * 2;
      const distance = 80 + Math.random() * 60;
      return {
        startTop: Math.random() * 100,
        startLeft: Math.random() * 100,
        dx: Math.cos(angle) * distance,
        dy: Math.sin(angle) * distance,
        rot: (angle * 180) / Math.PI,
        size: Math.random() * 2.5 + 1.5,
        duration: Math.random() * 14 + 18,
        delay: Math.random() * 20,
        color: cometColors[Math.floor(Math.random() * cometColors.length)],
        tailLength: Math.random() * 30 + 30,
      };
    });
    setComets(generatedComets);

    const generatedAsteroids = Array.from({ length: ASTEROIDS_COUNT }, (_, i) => {
      const orbitR = 395 + Math.random() * 30;
      const angle = Math.random() * 360;
      const sz = Math.random() * 3 + 1.5;
      const colors = ['#a89078', '#c8a888', '#988068', '#787058', '#b8a890'];
      return {
        orbit: orbitR,
        angle,
        size: sz,
        color: colors[Math.floor(Math.random() * colors.length)],
        period: 80 + Math.random() * 30,
        delayPct: Math.random(),
      };
    });
    setAsteroids(generatedAsteroids);

    return () => {
      stopSpeech();
    };
  }, []);

  const planetTones = {
    soare: [523, 659],
    mercur: [880, 1175],
    venus: [784, 988],
    pamant: [659, 988],
    marte: [587, 880],
    jupiter: [349, 523],
    saturn: [392, 587],
    uranus: [466, 698],
    neptun: [311, 466],
    pluto: [1175, 1568],
    'gaura-neagra': [220, 277],
    'calea-lactee': [659, 784],
    andromeda: [587, 740],
    'galaxia-roata': [698, 880],
    sarpe: [659, 784],
    pinguin: [988, 1175],
    racheta: [784, 1047],
  };

  const playChime = (planetId) => {
    if (mutedRef.current) return;
    try {
      if (!audioCtxRef.current) {
        const Ctx = window.AudioContext || window.webkitAudioContext;
        audioCtxRef.current = new Ctx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume();
      const now = ctx.currentTime;
      const tones = planetTones[planetId] || [880, 1320];
      tones.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = freq;
        const start = now + i * 0.08;
        gain.gain.setValueAtTime(0.0001, start);
        gain.gain.exponentialRampToValueAtTime(0.18, start + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.45);
        osc.connect(gain).connect(ctx.destination);
        osc.start(start);
        osc.stop(start + 0.5);
      });
    } catch (e) {
      // audio not supported — fail silently
    }
  };

  const hasFemaleRomanianVoice = () => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return false;
    const voices = window.speechSynthesis.getVoices();
    const roVoices = voices.filter((v) => v.lang && v.lang.toLowerCase().startsWith('ro'));
    return roVoices.some((v) => /ana|ioana|carmen|female|femeie/i.test(v.name));
  };

  const speakPlanet = async (planet) => {
    if (mutedRef.current) return;
    stopSpeech();
    const jokesArr = Array.isArray(planet.jokes) ? planet.jokes : planet.joke ? [planet.joke] : [];
    const jokesPart = jokesArr.length ? ` Și acum trei glume să râdem! ${jokesArr.join(' ')}` : '';
    const fullText = `${planet.name}. ${planet.description} ${planet.fact}${jokesPart}`;
    const cleanText = fullText
      .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{1F000}-\u{1F2FF}]/gu, '')
      .replace(/\s+/g, ' ')
      .trim();

    const token = ttsCancelTokenRef.current + 1;
    ttsCancelTokenRef.current = token;

    if (hasFemaleRomanianVoice()) {
      await speakWithBrowser(cleanText);
      return;
    }

    const chunks = splitTextForTTS(cleanText);
    try {
      for (const chunk of chunks) {
        if (mutedRef.current) return;
        if (token !== ttsCancelTokenRef.current) return;
        await playGoogleTTSChunk(chunk, token);
      }
    } catch (err) {
      if (!mutedRef.current && token === ttsCancelTokenRef.current) {
        await speakWithBrowser(cleanText);
      }
    }
  };

  const planets = [
    {
      id: 'mercur',
      name: 'Mercur',
      color: '#b8a48a',
      gradient: 'radial-gradient(circle at 30% 30%, #e8d8c0, #a8927a 60%, #5a4a3a)',
      size: 40,
      orbit: 162,
      duration: 5,
      moons: 0,
      year: '88 zile',
      diameter: 'Mai mic decât Pământul de 2.5 ori',
      fact: 'O zi pe Mercur durează cât 59 de zile pe Pământ! 🌞',
      description: 'Sunt cea mai mică planetă și stau cel mai aproape de Soare. Ziua e tare cald aici, dar noaptea îngheț de tot!',
      jokes: [
        'M-am dus la doctor: "Ziua ard, noaptea îngheț!" Doctorul: "Mută-te de la Soare!" Eu: "Stau cu chirie, n-am bani de mutare!" 🏠',
        'Am doar 88 de zile într-un an. Nici nu apuc să deschid cadourile de Crăciun, că vine Crăciunul nou! 🎁',
        '— Mercur, ai prieteni? — Doar Soarele. — Și de ce stai așa departe de el? — Pentru că arde tare, nu e prietenie sănătoasă! 🔥',
      ],
    },
    {
      id: 'venus',
      name: 'Venus',
      color: '#e8b87a',
      gradient: 'radial-gradient(circle at 30% 30%, #fff4d6, #e8b87a 50%, #8a5a2a)',
      size: 52,
      orbit: 221,
      duration: 8,
      moons: 0,
      year: '225 zile',
      diameter: 'Aproape la fel ca Pământul',
      fact: 'Sunt cea mai fierbinte planetă, chiar dacă Mercur e mai aproape de Soare! 🔥',
      description: 'Strălucesc puternic pe cerul de seară. Norii mei sunt din acid și e foarte cald sub ei!',
      jokes: [
        'Iubitul m-a părăsit: "Ești prea fierbinte!" Prima dată când cineva spune asta și nu e compliment! 💔',
        'M-am înscris la stand-up. Profesorul: "Glumele tale ard tare!" Eu: "Mulțumesc!" El: "Nu, literal, mi-ai topit microfonul!" 🎤',
        'Am 4 miliarde de ani și fac duș cu acid. Tot par tânără! Asta e secretul meu de frumusețe! 💄',
      ],
    },
    {
      id: 'pamant',
      name: 'Pământ',
      color: '#4a90d9',
      gradient: 'radial-gradient(circle at 30% 30%, #a8d5f2, #4a90d9 50%, #1a4a8a)',
      size: 56,
      orbit: 289,
      duration: 12,
      satellites: [
        { name: 'Luna', size: 12, distance: 50, period: 4, color: '#d8d0c0' },
        { name: 'ISS', size: 3, distance: 38, period: 1.2, color: '#88ccff', isISS: true },
      ],
      moons: 1,
      year: '365 zile',
      diameter: '12.742 km',
      fact: 'Sunt singura planetă cunoscută unde există viață! 🌱',
      description: 'Casa ta! Am apă, aer și milioane de plante și animale. Și o lună frumoasă care mă însoțește mereu.',
      jokes: [
        'Doctorul: "Ai prea mulți oameni pe tine!" Eu: "Știu, și nu-mi dau nimic înapoi, doar gunoi!" 🗑️',
        'Am întrebat Luna: "De ce te învârți mereu în jurul meu?" Luna: "Te-ai privit în oglindă, frate? Ești drăguț!" 🌙',
        'Vine un extraterestru: "Ce mâncare aveți?" Eu: "Pizza!" El: "Cu ananas?" Eu: "Da!" El s-a întors imediat acasă! 🍍',
      ],
    },
    {
      id: 'marte',
      name: 'Marte',
      color: '#d96a4a',
      gradient: 'radial-gradient(circle at 30% 30%, #f2a88a, #d96a4a 50%, #7a2a1a)',
      size: 48,
      orbit: 357,
      duration: 18,
      satellites: [
        { name: 'Phobos', size: 5, distance: 40, period: 2, color: '#a89078' },
        { name: 'Deimos', size: 4, distance: 55, period: 3.5, color: '#9c8060' },
      ],
      moons: 2,
      year: '687 zile',
      diameter: 'Cam jumătate cât Pământul',
      fact: 'Pe mine e cel mai înalt vulcan din sistemul solar - de 3 ori mai înalt decât Everestul! 🏔️',
      description: 'Mi se spune Planeta Roșie pentru că pământul meu e ruginiu. Am două luni mici, Phobos și Deimos.',
      jokes: [
        '— Marte, de ce ești roșu? — Abia ies de la solar! — Care solar? — Soarele, frate, sunt vecin cu el! ☀️',
        'Lunile mele se cheamă Phobos ("frică") și Deimos ("teroare"). Părinții lor erau emo, ce să le faci! 🖤',
        'Astronaut: "Pot sta pe tine?" Eu: "Sigur, adu oxigen, apă, casă și internet!" Astronaut: "Hmm, mai stau pe Pământ!" 🚀',
      ],
    },
    {
      id: 'jupiter',
      name: 'Jupiter',
      color: '#d9a878',
      gradient: 'radial-gradient(circle at 30% 30%, #f2d4a8, #d9a878 40%, #8a5a3a), repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(0,0,0,0.1) 4px, rgba(0,0,0,0.1) 6px)',
      size: 100,
      orbit: 459,
      duration: 28,
      satellites: [
        { name: 'Io', size: 8, distance: 70, period: 3, color: '#f2d878' },
        { name: 'Europa', size: 7, distance: 88, period: 4.5, color: '#e8d4a8' },
        { name: 'Ganymede', size: 10, distance: 108, period: 6, color: '#b8a888' },
        { name: 'Callisto', size: 9, distance: 130, period: 8, color: '#988868' },
      ],
      moons: 95,
      year: '12 ani',
      diameter: 'De 11 ori mai lat decât Pământul',
      fact: 'Am o furtună uriașă mai mare decât Pământul, care durează de peste 350 de ani! 🌀',
      description: 'Sunt cel mai mare! Sunt o "gigantă gazoasă" - nu poți sta pe mine pentru că nu am suprafață solidă.',
      jokes: [
        'Am 95 de luni pentru că am uitat cu care am ieșit la prima întâlnire! Acum toate vor pensie alimentară! 💸',
        '"O prăjitură, vă rog!" "Care?" "Toate, sunt Jupiter!" Acum am 95 de prăjituri și o furtună de 350 de ani! 🍰',
        '— De ce nu pot sta pe tine, omule? — Pentru că nu am suprafață solidă! — Greșit! Pentru că nu te-am invitat! 🚫',
      ],
    },
    {
      id: 'saturn',
      name: 'Saturn',
      color: '#e8d4a8',
      gradient: 'radial-gradient(circle at 30% 30%, #faecc8, #e8d4a8 50%, #8a7548)',
      size: 92,
      orbit: 570,
      duration: 38,
      satellites: [
        { name: 'Titan', size: 9, distance: 105, period: 5, color: '#e8b870' },
        { name: 'Rhea', size: 6, distance: 125, period: 7, color: '#c8b8a0' },
      ],
      moons: 146,
      year: '29 ani',
      diameter: 'De 9 ori mai lat decât Pământul',
      fact: 'Aș pluti pe apă, pentru că sunt mai ușor decât ea! 🛟',
      description: 'Inelele mele sunt făcute din bucăți de gheață și pietre care se învârt în jurul meu. Sunt frumoase, nu?',
      jokes: [
        'Am venit la bal cu inelele. Toate planetele: "Saturn, te măriți?" Eu: "Nu, sunt fashionistă!" 👰',
        'Aș pluti pe apă! Doar că nu există ocean atât de mare. Și nici prosop să mă șterg după baie! 🛁',
        '— Saturn, ce ai în inele? — Bucăți de gheață! — Pentru ce le porți? — Pentru limonada de vacanță cosmică! 🍋',
      ],
      hasRings: true,
    },
    {
      id: 'uranus',
      name: 'Uranus',
      color: '#a8e0e0',
      gradient: 'radial-gradient(circle at 30% 30%, #d8f0f0, #a8e0e0 50%, #4a8a8a)',
      size: 68,
      orbit: 663,
      duration: 50,
      satellites: [
        { name: 'Titania', size: 6, distance: 60, period: 4, color: '#a8c8c8' },
      ],
      moons: 27,
      year: '84 ani',
      diameter: 'De 4 ori mai lat decât Pământul',
      fact: 'Eu mă rostogolesc pe o parte, ca o minge! 🎳',
      description: 'Sunt albastru-verzui pentru că am mult metan. Și sunt singurul care se învârte culcat!',
      jokes: [
        'M-am rostogolit pe o parte de 4 miliarde de ani. La fel și tu duminica dimineața, nu-i așa? 🛏️',
        '— Uranus, ai mâncat metan? — Da. — Atunci nu mai veni la ședințele de familie! 💨',
        'Toți zic "Uranus se rostogolește"! Eu zic "Uranus face break-dance fără pauză"! E doar perspectiva! 🕺',
      ],
    },
    {
      id: 'neptun',
      name: 'Neptun',
      color: '#3a6ad9',
      gradient: 'radial-gradient(circle at 30% 30%, #8aa8f2, #3a6ad9 50%, #1a3a8a)',
      size: 68,
      orbit: 757,
      duration: 65,
      satellites: [
        { name: 'Triton', size: 7, distance: 60, period: 5, color: '#b8a8d8' },
      ],
      moons: 14,
      year: '165 ani',
      diameter: 'De 4 ori mai lat decât Pământul',
      fact: 'Pe mine bat cele mai puternice vânturi din sistemul solar - 2.000 km/h! 💨',
      description: 'Sunt cel mai îndepărtat. Sunt foarte rece și albastru închis, ca un ocean adânc.',
      jokes: [
        'M-am dus la frizer: "O tunsoare!" Frizerul: "Stați liniștit!" Eu: "Vântul suflă cu 2000 km/h!" Frizerul s-a pensionat! ✂️',
        'Sunt cel mai îndepărtat. Curierul mă urăște: "Coletul ajunge în 165 de ani, garantat!" 📦',
        '— Joc de capturat steagul? — Da! — Cât ne ia? — Steagul zboară non-stop, jocul nu se mai termină! 🚩',
      ],
    },
    {
      id: 'pluto',
      name: 'Pluto',
      color: '#c8a888',
      gradient: 'radial-gradient(circle at 30% 30%, #f0d8b8, #c8a888 50%, #5a4a3a)',
      size: 22,
      orbit: 855,
      duration: 90,
      moons: 5,
      year: '248 ani',
      diameter: 'Mai mic decât Luna noastră',
      fact: 'Sunt o "planetă pitică" — am fost dat afară din clubul planetelor în 2006! 🥲',
      description: 'Sunt cel mai mic și cel mai îndepărtat. Sunt înghețat tot anul și am 5 lunițe pentru companie!',
      jokes: [
        'Eu sunt singura care a fost dată afară din clubul planetelor! Acum am gașca mea de planete pitice! 🥲',
        '— Pluto, vrei să fii planetă din nou? — Nu! Acum sunt celebru — toți copiii mă cunosc, ceilalți doar cu manualul! ⭐',
        'Vine cineva: "Pluto, ești mic!" Eu: "Da, dar am 5 luni!" El: "Mercur n-are nici una!" Eu: "Exact, deci cine câștigă?" 🌚',
      ],
      satellites: [
        { name: 'Charon', size: 10, distance: 35, period: 3.5, color: '#a89878' },
      ],
    },
  ];

  const cosmicObjects = [
    {
      id: 'gaura-neagra',
      name: 'Gaură Neagră',
      color: '#ff8800',
      type: 'blackhole',
      size: 200,
      top: '6%',
      right: '4%',
      moons: 'Înghite tot ce se apropie',
      year: '—',
      diameter: 'Poate fi de milioane de ori mai mare decât Soarele',
      fact: 'În centrul galaxiei noastre se află o gaură neagră uriașă pe nume Sagittarius A! 🕳️',
      description: 'Sunt atât de puternică încât atrag tot, chiar și lumina! Nimic nu poate scăpa odată ce intră în mine.',
      jokes: [
        'Am fost la dietă. Doctorul: "Nu mai mâncați mult!" Eu: "Ok!" Și am mâncat dieta. Și pe doctor. Și cabinetul! 🍴',
        '— Lasă-mă să trec prin tine! — Bine, intră! — Și să ies? — Hahaha. Hahaha. Nu! 🚪',
        'Vine un fizician: "Vreau să studiez interiorul!" Eu: "Sigur, intră!" De atunci am liniște perfectă! 🤫',
      ],
    },
    {
      id: 'calea-lactee',
      name: 'Calea Lactee',
      color: '#ffe4a8',
      type: 'galaxy',
      size: 180,
      bottom: '6%',
      left: '3%',
      armColor: '#a8d8ff',
      glowColor: '#c8e0ff',
      coreColor: '#e8f0ff',
      dustColor: '#9a4a3a',
      spinDuration: 90,
      tilt: -10,
      moons: 'Peste 100 de miliarde de stele',
      year: 'Se rotește în 230 milioane de ani',
      diameter: '100.000 de ani-lumină',
      fact: 'Sistemul Solar și tu suntem în Calea Lactee! Suntem într-un braț numit Orion. ✨',
      description: 'Sunt galaxia ta natală! Am formă de spirală și conțin miliarde de stele, planete, praf și gaz.',
      jokes: [
        '— Ești galaxie sau cofetărie? — Depinde. Vrei stele sau lapte? 🥛',
        'Pământenii: "Ce frumoasă e Calea Lactee!" Eu: "Mulțumesc, păstrez 100 de miliarde de stele, dar bine că observați!" ✨',
        'Soarele se învârte în jurul meu. Eu mă învârt în jurul găurii negre. Mamă, ce stresant e! 🌀',
      ],
    },
    {
      id: 'andromeda',
      name: 'Andromeda',
      color: '#a8c8ff',
      type: 'galaxy',
      size: 150,
      bottom: '6%',
      right: '4%',
      armColor: '#88a8ff',
      glowColor: '#a0b8e8',
      coreColor: '#e0e8ff',
      dustColor: '#7a3a4a',
      spinDuration: 110,
      tilt: 15,
      moons: 'Aproape 1 trilion de stele',
      year: 'Se apropie de noi cu 400.000 km/h',
      diameter: '220.000 de ani-lumină',
      fact: 'Peste 4 miliarde de ani mă voi ciocni cu Calea Lactee și vom forma o galaxie nouă! 💫',
      description: 'Sunt cea mai apropiată galaxie mare de Calea Lactee. Mă poți vedea pe cerul nopții ca o pată ceațoasă!',
      jokes: [
        'Vin în vizită peste 4 miliarde de ani. Da, e cam târziu, dar e trafic spațial intens! 🚦',
        '— Bună, sunt Andromeda! — Ce nume frumos! — Nu e nume, e galaxie! — Aha, scuze, am crezut că ești influenceriță! 📱',
        'Ne ciocnim cu Calea Lactee! Stelele: "Asta e îmbrățișare sau accident?" Răspuns: ambele! 💥',
      ],
    },
    {
      id: 'galaxia-roata',
      name: 'Galaxia Roată',
      color: '#ffa8e0',
      type: 'galaxy',
      size: 120,
      top: '24%',
      left: '2%',
      armColor: '#ffa8d8',
      glowColor: '#ffc8e0',
      coreColor: '#ffe8f0',
      dustColor: '#9a3a5a',
      spinDuration: 75,
      tilt: 25,
      moons: 'Miliarde de stele',
      year: '—',
      diameter: '150.000 de ani-lumină',
      fact: 'Am formă de roată pentru că o galaxie mai mică a trecut prin mine ca un glonț! 🎯',
      description: 'Am formă de roată cu un inel strălucitor în jur. Asta s-a întâmplat când o altă galaxie a trecut prin mine!',
      jokes: [
        'Cu ce mă deplasez? Ghici. Cu mine însămi! Sunt o roată — asta fac roțile! 🚲',
        'Accident cosmic: o galaxie a trecut prin mine fără să sune din clopoțel. Acum am formă de gogoașă cu gaură! 🍩',
        '— Te răzbuni? — Pe cine? Asteroidul a dispărut acum 200 de milioane de ani! Mi-am pierdut interesul! 🤷',
      ],
    },
  ];

  const zodiacConstellations = [
    {
      id: 'berbec',
      name: 'Berbecul',
      symbol: '♈',
      color: '#ff9966',
      isZodiac: true,
      moons: '—',
      year: '21 Mar - 19 Apr',
      diameter: 'Constelație de primăvară',
      stars: [[10, 38], [28, 22], [48, 32], [62, 52]],
      lines: [[0, 1], [1, 2], [2, 3]],
      position: { top: '24%', left: '12%' },
      fact: 'Stelele mele au inspirat povestea cu Lâna de Aur din mitologia greacă! 🐏',
      description: 'Sunt Berbecul, prima zodie din an! Mă vezi primăvara pe cer cu cele 4 stele luminoase ale mele.',
      jokes: [
        'Sunt prima la coadă mereu! Și prima la dulciuri! 🍭',
        'Am cap mare și gânduri puține — dar foarte hotărâte! 💪',
        'Vrei să mă dau cu capul de un zid? Doar arată-mi-l! 🐏',
      ],
    },
    {
      id: 'taur',
      name: 'Taurul',
      symbol: '♉',
      color: '#ffcc66',
      isZodiac: true,
      moons: '—',
      year: '20 Apr - 20 Mai',
      diameter: 'Constelație cu Aldebaran',
      stars: [[12, 22], [22, 32], [38, 42], [54, 32], [66, 22], [42, 56]],
      lines: [[0, 1], [1, 2], [2, 3], [3, 4], [2, 5]],
      position: { top: '24%', left: '32%' },
      fact: 'Steaua mea principală, Aldebaran, e ochiul roșu al Taurului! 👁️',
      description: 'Sunt Taurul, încăpățânat și răbdător! Am două coarne mari și un ochi roșu pe cer.',
      jokes: [
        'Mă mișc încet, dar am multe coarne — atenție! 🐂',
        '— Taur, ești supărat? — Nu, doar gândesc. — De cât timp? — De 3 luni. 🤔',
        'Nu mă bag în concursuri de viteză. Mă bag în concursuri de mâncat! 🍰',
      ],
    },
    {
      id: 'gemeni',
      name: 'Gemenii',
      symbol: '♊',
      color: '#88ccff',
      isZodiac: true,
      moons: '—',
      year: '21 Mai - 20 Iun',
      diameter: 'Castor și Pollux',
      stars: [[18, 14], [22, 30], [26, 50], [30, 66], [50, 14], [54, 30], [58, 50], [62, 66]],
      lines: [[0, 1], [1, 2], [2, 3], [4, 5], [5, 6], [6, 7], [1, 5]],
      position: { top: '24%', left: '52%' },
      fact: 'Stelele mele cele mai luminoase se cheamă Castor și Pollux — frați gemeni! 👯',
      description: 'Suntem Gemenii — frați nedespărțiți! Vorbim mereu, uneori și în același timp.',
      jokes: [
        'Suntem doi, deci avem dublă porție de pizza! 🍕',
        '— Gemeni, cine a spart geamul? — El! — Eu! — El! 🤷',
        'Când sunt singur... sunt doi! Niciodată nu mă plictisesc! 🪞',
      ],
    },
    {
      id: 'rac',
      name: 'Racul',
      symbol: '♋',
      color: '#aaeeff',
      isZodiac: true,
      moons: '—',
      year: '21 Iun - 22 Iul',
      diameter: 'Cea mai slabă zodie',
      stars: [[40, 14], [22, 32], [58, 32], [40, 48], [40, 66]],
      lines: [[0, 1], [0, 2], [1, 3], [2, 3], [3, 4]],
      position: { top: '24%', left: '72%' },
      fact: 'Sunt cea mai slabă zodie, abia mă vezi! Dar conțin "Stupul" — un grup faimos de stele! 🐝',
      description: 'Sunt Racul — sensibil și casnic. Mă mișc cu spatele și mă apăr cu cleștele!',
      jokes: [
        'Mă mișc cu spatele — și nu mă rătăcesc niciodată, vin de unde am venit! 🦀',
        'Ce port în casă? O casă! 🏠',
        'Nu sunt timid, doar prefer să stau în coajă. Cu Wi-Fi! 📶',
      ],
    },
    {
      id: 'leu',
      name: 'Leul',
      symbol: '♌',
      color: '#ffaa44',
      isZodiac: true,
      moons: '—',
      year: '23 Iul - 22 Aug',
      diameter: 'Inima e Regulus',
      stars: [[14, 26], [22, 18], [32, 22], [42, 30], [54, 38], [60, 56], [42, 60]],
      lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 3]],
      position: { top: '46%', left: '1%' },
      fact: 'Steaua mea cea mai luminoasă se cheamă Regulus — "Micul Rege"! 👑',
      description: 'Sunt Leul, regele cerului! Coama mea de stele formează un secer pe cer.',
      jokes: [
        'Sunt rege! Stai, de ce trebuie eu să fac curățenie? 👑',
        '— Leu, ești modest? — DA! Și sunt cel mai modest dintre toți! 😎',
        'Toți spun "rrrr" — eu spun "Eu!". Diferență mare. 🦁',
      ],
    },
    {
      id: 'fecioara',
      name: 'Fecioara',
      symbol: '♍',
      color: '#cce888',
      isZodiac: true,
      moons: '—',
      year: '23 Aug - 22 Sep',
      diameter: 'A doua mai mare constelație',
      stars: [[12, 22], [24, 28], [38, 22], [50, 30], [62, 26], [46, 50], [58, 60]],
      lines: [[0, 1], [1, 2], [2, 3], [3, 4], [3, 5], [5, 6]],
      position: { top: '46%', right: '1%' },
      fact: 'Sunt a doua cea mai mare constelație din cer — Spica e steaua mea cea mai luminoasă! ⭐',
      description: 'Sunt Fecioara — perfecționistă și organizată. Am cea mai mare grijă să fie totul în ordine!',
      jokes: [
        'Pun totul la locul lui... și apoi nimeni nu mai găsește nimic! 📚',
        '— Cum stai? — Bine, doar 47 de probleme rezolvabile imediat. ✅',
        'Curățenia? E ZEN-ul meu. Și sportul. Și hobby-ul. 🧹',
      ],
    },
    {
      id: 'balanta',
      name: 'Balanța',
      symbol: '♎',
      color: '#dd99ff',
      isZodiac: true,
      moons: '—',
      year: '23 Sep - 22 Oct',
      diameter: 'Singura zodie obiect',
      stars: [[14, 30], [40, 14], [66, 30], [40, 56]],
      lines: [[0, 1], [1, 2], [0, 3], [2, 3]],
      position: { top: '64%', left: '1%' },
      fact: 'Sunt singura zodie care nu e animal sau persoană — sunt un OBIECT! ⚖️',
      description: 'Sunt Balanța — diplomată și echilibrată. Cântăresc fiecare decizie de două ori!',
      jokes: [
        'Vreau pizza. Vreau și înghețată. Decid mâine. ⚖️',
        '— Ce alegi? — Da. — Din ce? — Da. 😅',
        'Am 17 prieteni — nu pot favoriza pe nimeni, deci nu chem pe nimeni! 🎉',
      ],
    },
    {
      id: 'scorpion',
      name: 'Scorpionul',
      symbol: '♏',
      color: '#ff6688',
      isZodiac: true,
      moons: '—',
      year: '23 Oct - 21 Nov',
      diameter: 'Antares e inima',
      stars: [[10, 30], [20, 38], [32, 38], [44, 32], [56, 38], [62, 50], [58, 60]],
      lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6]],
      position: { top: '28%', left: '1%' },
      fact: 'Steaua mea principală, Antares, e o supergigantă roșie — "Rivala lui Marte"! ❤️',
      description: 'Sunt Scorpionul — misterios și intens. Am o coadă curbă și un ac la final!',
      jokes: [
        'Sunt mic dar misterios! Și am ace — de aia stai departe! 🦂',
        '— Scorpion, ești supărat? — Mereu. — De ce? — Secret. 🤫',
        'Iubesc întunericul. E mai liniștit acolo. Și nu mă văd ceilalți! 🌑',
      ],
    },
    {
      id: 'sagetator',
      name: 'Săgetătorul',
      symbol: '♐',
      color: '#aaaaff',
      isZodiac: true,
      moons: '—',
      year: '22 Nov - 21 Dec',
      diameter: 'Forma de ceainic',
      stars: [[14, 50], [22, 42], [30, 32], [40, 38], [50, 30], [60, 40], [50, 56]],
      lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [3, 6]],
      position: { top: '28%', right: '1%' },
      fact: 'Stelele mele formează un "ceainic" pe cer! Și în spatele meu e centrul galaxiei! 🫖',
      description: 'Sunt Săgetătorul — aventurier și optimist. Trag cu arcul spre stele!',
      jokes: [
        'Trag cu arcul... la stele! Niciodată nu nimeresc, dar e distractiv! 🏹',
        '— Săgetător, plănuiești? — Nu! Plec acum! Unde? Vom vedea! ✈️',
        'Cea mai bună destinație? Următoarea! Și cea de după! 🗺️',
      ],
    },
    {
      id: 'capricorn',
      name: 'Capricornul',
      symbol: '♑',
      color: '#88aabb',
      isZodiac: true,
      moons: '—',
      year: '22 Dec - 19 Ian',
      diameter: 'Capră marină',
      stars: [[12, 32], [22, 26], [38, 22], [54, 28], [64, 38], [38, 56]],
      lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0]],
      position: { bottom: '15%', left: '12%' },
      fact: 'Sunt jumătate capră, jumătate pește — un animal magic din mitologie! 🐐🐟',
      description: 'Sunt Capricornul — ambițios și serios. Urc tot timpul, ca o capră pe stâncă!',
      jokes: [
        'Urc tot timpul! De ce? Acolo sus e priveliștea mai bună! 🐐',
        '— Capricorn, te distrezi vreodată? — Da, programez în calendar timp pentru distracție. 📅',
        'Dacă există un munte, urc pe el. Dacă nu, fac eu unul! ⛰️',
      ],
    },
    {
      id: 'varsator',
      name: 'Vărsătorul',
      symbol: '♒',
      color: '#88ddee',
      isZodiac: true,
      moons: '—',
      year: '20 Ian - 18 Feb',
      diameter: 'Vărsător de apă',
      stars: [[12, 22], [24, 32], [36, 24], [48, 34], [60, 26], [38, 56]],
      lines: [[0, 1], [1, 2], [2, 3], [3, 4], [3, 5]],
      position: { bottom: '15%', left: '32%' },
      fact: 'Vărs apă din ulciorul meu — în mitologie hrăneam zeii cu nectar! 💧',
      description: 'Sunt Vărsătorul — original și creativ. Vărs idei noi peste tot!',
      jokes: [
        'Vărs apă! Și idei! Și uneori mizerie pe podea! 💧',
        '— Vărsător, gândești diferit? — Da. Și acum cred că pisicile sunt extraterești! 🐱',
        'Sunt în avans cu 50 de ani — voi înțelegeți ce zic abia când e prea târziu! 🚀',
      ],
    },
    {
      id: 'pesti',
      name: 'Peștii',
      symbol: '♓',
      color: '#88eebb',
      isZodiac: true,
      moons: '—',
      year: '19 Feb - 20 Mar',
      diameter: 'Doi pești legați',
      stars: [[14, 22], [22, 32], [30, 26], [40, 38], [50, 26], [58, 32], [66, 22]],
      lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6]],
      position: { bottom: '15%', left: '52%' },
      fact: 'Suntem doi pești legați cu o panglică — pentru că nu vrem să ne pierdem! 🐟🐠',
      description: 'Suntem Peștii — visători și sensibili. Înotăm prin oceanul stelar!',
      jokes: [
        'Înotăm doi prin spațiu! Visăm mereu! 🐟🐠',
        '— Pește, ce planuri ai? — Visez că am planuri. E suficient. 💭',
        'Plâng la filme. Și la reclame. Și la videoclipuri cu cățeluși. Tot timpul! 😭',
      ],
    },
  ];

  const characters = [
    {
      id: 'sarpe',
      name: 'Sis Șarpele Astronaut',
      color: '#5fbf5f',
      iconType: 'snake',
      moons: '0',
      year: 'Călătoresc de 7 ani',
      diameter: '1.5 metri lungime',
      fact: 'Sunt singurul șarpe care a învățat să navigheze printre stele! 🐍✨',
      description: 'Bună, sunt Sis! Am evadat de la grădina zoologică ca să explorez galaxia. Aici nimeni nu mă mai sperie!',
      jokes: [
        '— De ce ai venit în spațiu? — Pe Pământ toți fugeau de mine. Aici toți zboară! Diferență mare! 🚀',
        'N-am nevoie de cizme spațiale, oricum n-am picioare! Asta-i singura mea economie! 🤷',
        '— Cum sări din pat dimineața? — Niciodată. Sunt șarpe, n-am pat, am o casă întreagă pe mine! 🏠',
      ],
    },
    {
      id: 'pinguin',
      name: 'Pip Pinguinul Astronaut',
      color: '#88aaff',
      iconType: 'penguin',
      moons: '0',
      year: 'În spațiu de 3 ani',
      diameter: '1 metru înălțime',
      fact: 'Pe Pământ alunecam pe burtă, în spațiu plutesc fără efort! 🐧',
      description: 'Salut, sunt Pip! Eu și pinguinii am crezut mereu că putem zbura. Eu am dovedit-o!',
      jokes: [
        '— Ești pinguin, n-ai cum să zbori! — Acum e prea târziu, sunt deja în spațiu, ce să-ți zic? 😅',
        'Pe Pământ alunecam pe burtă pe gheață. Aici plutesc fără efort. Cred că am evoluat! ✨',
        '— De ce porți cască? — Pentru ca, dacă găsesc pești în spațiu, să arăt bine în pozele cu ei! 🐟',
      ],
    },
    {
      id: 'racheta',
      name: 'Racheta Stea',
      color: '#ff5566',
      iconType: 'rocket',
      moons: '0',
      year: 'Lansată acum 5 ani',
      diameter: '15 metri înălțime',
      fact: 'Pot zbura cu 28.000 km/h, mai repede decât orice avion! 🔥',
      description: 'Sunt o rachetă! Duc astronauți, animale și nave pe alte planete. Visul meu e să ajung la Marte!',
      jokes: [
        '— Rachetă, ai benzină? — Nu, am hidrogen! — Și costă mai mult? — De vreo 1000 de ori, mulțumesc de întrebare! 💸',
        'Doctorul: "Trebuie să încetiniți!" Eu: "Merg cu 28.000 km/h!" Doctorul: "Bine, atunci doar evitați curbele!" 🛣️',
        '— Te oprești la stop? — Da, dar peste 4 minute, atât îmi ia să frânez! 🛑',
      ],
    },
  ];

  const TOTAL_DISCOVERABLE = 9 + 1 + 4 + 3 + 12; // 9 planete + Soare + 4 cosmice + 3 personaje + 12 zodii = 29

  const badges = [
    { id: 'first', threshold: 1, emoji: '🌱', name: 'Curios', text: 'Primul pas în univers!' },
    { id: 'beginner', threshold: 5, emoji: '🌟', name: 'Astronom începător', text: 'Ai descoperit 5 obiecte!' },
    { id: 'explorer', threshold: 10, emoji: '🚀', name: 'Călător spațial', text: '10 obiecte cosmice cunoscute!' },
    { id: 'planets', threshold: 17, emoji: '🪐', name: 'Maestru de planete', text: 'Cunoști toate planetele și ai descoperit personajele!' },
    { id: 'zodiacs', threshold: 25, emoji: '⭐', name: 'Cunoscător al zodiilor', text: 'Stelele te consideră prieten!' },
    { id: 'master', threshold: 29, emoji: '👑', name: 'Stăpân al cosmosului', text: 'Ai descoperit ABSOLUT TOTUL!' },
  ];

  const checkBadges = (count) => {
    badges.forEach((b) => {
      if (count >= b.threshold && !earnedBadgesRef.current.has(b.id)) {
        const next = new Set(earnedBadgesRef.current);
        next.add(b.id);
        earnedBadgesRef.current = next;
        setEarnedBadges(next);
        setTimeout(() => {
          setBadgePopup(b);
          setTimeout(() => setBadgePopup(null), 4500);
        }, 800);
      }
    });
  };
  const handlePlanetClick = (planet) => {
    if (quizActive) {
      handleQuizAnswer(planet.id);
      return;
    }
    setSelectedPlanet(planet);
    setPaused(true);
    playChime(planet.id);
    speakPlanet(planet);
    setVisited((prev) => {
      if (prev.has(planet.id)) return prev;
      const next = new Set(prev);
      next.add(planet.id);
      checkBadges(next.size);
      if (next.size === TOTAL_DISCOVERABLE) {
        setTimeout(() => setShowConfetti(true), 600);
      }
      return next;
    });
  };

  const closeCard = () => {
    setSelectedPlanet(null);
    setPaused(false);
    stopSpeech();
  };

  const sunData = {
    id: 'soare',
    name: 'Soarele',
    color: '#ffaa00',
    moons: '—',
    year: 'Stea',
    diameter: 'De 109 ori mai lat decât Pământul',
    fact: 'În mine ar încăpea peste 1 milion de Pământuri! ☀️',
    description: 'Sunt o stea uriașă! Toate planetele se învârt în jurul meu. Lumina mea ajunge la Pământ în 8 minute.',
    jokes: [
      'La ziua mea nu mai pun lumânări — torta s-ar transforma în supernova! 🎂',
      'Copiii zic: "Vreau să ating Soarele!" Eu zic: "Hai, încercați! Sunt doar 6000 de grade, ce poate să se întâmple?" 🔥',
      'Am insomnie de 4.6 miliarde de ani. Dacă mă opresc o secundă, toată lumea îngheață! 😴',
    ],
  };

  const tourOrder = [sunData, ...planets, ...cosmicObjects, ...characters, ...zodiacConstellations];

  const startTour = async () => {
    if (tourActive) return;
    tourActiveRef.current = true;
    setTourActive(true);
    const MIN_DISPLAY_MS = 9000;
    const waitCancellable = (ms) =>
      new Promise((resolve) => {
        const start = Date.now();
        const tick = () => {
          if (!tourActiveRef.current) return resolve();
          if (Date.now() - start >= ms) return resolve();
          setTimeout(tick, 200);
        };
        tick();
      });

    for (const obj of tourOrder) {
      if (!tourActiveRef.current) break;
      setSelectedPlanet(obj);
      setPaused(true);
      playChime();
      setVisited((prev) => {
        if (prev.has(obj.id)) return prev;
        const next = new Set(prev);
        next.add(obj.id);
        if (next.size === TOTAL_DISCOVERABLE) {
          setTimeout(() => setShowConfetti(true), 600);
        }
        return next;
      });
      const startTime = Date.now();
      try {
        await speakPlanet(obj);
      } catch (e) {}
      if (!tourActiveRef.current) break;
      const elapsed = Date.now() - startTime;
      if (elapsed < MIN_DISPLAY_MS) {
        await waitCancellable(MIN_DISPLAY_MS - elapsed);
      } else {
        await waitCancellable(1200);
      }
      if (!tourActiveRef.current) break;
      setSelectedPlanet(null);
      await waitCancellable(700);
    }
    tourActiveRef.current = false;
    setTourActive(false);
    setSelectedPlanet(null);
    setPaused(false);
  };

  const stopTour = () => {
    tourActiveRef.current = false;
    setTourActive(false);
    stopSpeech();
    setSelectedPlanet(null);
    setPaused(false);
  };

  const startAmbientMusic = () => {
    try {
      if (!audioCtxRef.current) {
        const Ctx = window.AudioContext || window.webkitAudioContext;
        audioCtxRef.current = new Ctx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume();
      const masterGain = ctx.createGain();
      masterGain.gain.value = 0.06;
      masterGain.connect(ctx.destination);
      const nodes = [];
      const freqs = [110, 164.81, 220, 329.63];
      freqs.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        osc.type = i % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.value = freq;
        const gain = ctx.createGain();
        gain.gain.value = 0;
        const lfo = ctx.createOscillator();
        lfo.frequency.value = 0.06 + i * 0.02;
        const lfoGain = ctx.createGain();
        lfoGain.gain.value = 0.5;
        lfo.connect(lfoGain).connect(gain.gain);
        osc.connect(gain).connect(masterGain);
        osc.start();
        lfo.start();
        gain.gain.setTargetAtTime(0.5 / freqs.length, ctx.currentTime, 1.5);
        nodes.push({ osc, lfo, gain });
      });
      ambientNodesRef.current = { masterGain, nodes };
    } catch (e) {}
  };

  const stopAmbientMusic = () => {
    if (!ambientNodesRef.current) return;
    const { masterGain, nodes } = ambientNodesRef.current;
    const ctx = audioCtxRef.current;
    try {
      masterGain.gain.setTargetAtTime(0, ctx.currentTime, 0.4);
      setTimeout(() => {
        nodes.forEach((n) => {
          try {
            n.osc.stop();
            n.lfo.stop();
          } catch (e) {}
        });
      }, 800);
    } catch (e) {}
    ambientNodesRef.current = null;
  };

  const toggleMusic = () => {
    if (musicOn) {
      stopAmbientMusic();
      setMusicOn(false);
    } else {
      startAmbientMusic();
      setMusicOn(true);
    }
  };

  const quizQuestions = [
    { question: 'Care planetă are cele mai frumoase inele?', answerId: 'saturn' },
    { question: 'Care e cea mai mare planetă?', answerId: 'jupiter' },
    { question: 'Pe care planetă trăim noi?', answerId: 'pamant' },
    { question: 'Care e Planeta Roșie?', answerId: 'marte' },
    { question: 'Care e cea mai apropiată planetă de Soare?', answerId: 'mercur' },
    { question: 'Care e cea mai fierbinte planetă?', answerId: 'venus' },
    { question: 'Care planetă se rostogolește pe o parte?', answerId: 'uranus' },
    { question: 'Care e cea mai îndepărtată planetă mare?', answerId: 'neptun' },
    { question: 'Care obiect înghite tot, chiar și lumina?', answerId: 'gaura-neagra' },
    { question: 'În ce galaxie trăim noi?', answerId: 'calea-lactee' },
  ];

  const openDrawingMode = () => {
    setDrawingMode(true);
    setDrawName('');
    setTimeout(() => {
      const canvas = drawCanvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#0a1230';
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2 - 2, 0, Math.PI * 2);
      ctx.fill();
    }, 50);
  };

  const closeDrawingMode = () => setDrawingMode(false);

  const handleDrawStart = (e) => {
    const canvas = drawCanvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const ev = e.touches ? e.touches[0] : e;
    const x = ((ev.clientX - rect.left) / rect.width) * canvas.width;
    const y = ((ev.clientY - rect.top) / rect.height) * canvas.height;
    drawStateRef.current = { drawing: true, lastX: x, lastY: y };
  };

  const handleDrawMove = (e) => {
    if (!drawStateRef.current.drawing) return;
    e.preventDefault();
    const canvas = drawCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const ev = e.touches ? e.touches[0] : e;
    const x = ((ev.clientX - rect.left) / rect.width) * canvas.width;
    const y = ((ev.clientY - rect.top) / rect.height) * canvas.height;
    ctx.strokeStyle = drawColor;
    ctx.lineWidth = drawSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(drawStateRef.current.lastX, drawStateRef.current.lastY);
    ctx.lineTo(x, y);
    ctx.stroke();
    drawStateRef.current.lastX = x;
    drawStateRef.current.lastY = y;
  };

  const handleDrawEnd = () => {
    drawStateRef.current.drawing = false;
  };

  const clearDrawing = () => {
    const canvas = drawCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#0a1230';
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2 - 2, 0, Math.PI * 2);
    ctx.fill();
  };

  const deleteCustomPlanet = (id) => {
    if (!confirm('Sigur vrei să ștergi planeta ta? Nu mai poate fi recuperată.')) return;
    setCustomPlanets((prev) => prev.filter((p) => p.id !== id));
    if (selectedPlanet?.id === id) closeCard();
  };

  const savePlanet = () => {
    const canvas = drawCanvasRef.current;
    if (!canvas) return;
    const dataURL = canvas.toDataURL('image/png');
    const id = `custom-${Date.now()}`;
    const finalName = drawName.trim() || 'Planeta Mea';
    const newPlanet = {
      id,
      name: finalName,
      color: '#ffd633',
      isCustom: true,
      image: dataURL,
      moons: '0',
      year: 'Cât vrei tu',
      diameter: 'Mărimea visului tău',
      fact: `Ai creat-o tu! Bravo, ești creator de planete! 🎨`,
      description: `${finalName} e creația ta unică. Niciun astronom n-a mai văzut o asemenea planetă!`,
      jokes: [
        `M-am născut acum câteva minute! Sunt cea mai nouă planetă din univers! 🐣`,
        `Am cea mai bună mamă/tată din toată galaxia! ❤️`,
        `Vino la mine în vizită — am tot ce vrei tu, e planeta ta! 🏠`,
      ],
    };
    setCustomPlanets((prev) => [...prev, newPlanet]);
    setDrawingMode(false);
  };

  const computeAges = (dateStr) => {
    if (!dateStr) return null;
    const birth = new Date(dateStr);
    if (isNaN(birth.getTime())) return null;
    const now = new Date();
    const earthYears = (now - birth) / (1000 * 60 * 60 * 24 * 365.25);
    if (earthYears < 0) return null;
    const ratios = {
      Mercur: 0.2408,
      Venus: 0.6152,
      Pământ: 1,
      Marte: 1.8809,
      Jupiter: 11.8618,
      Saturn: 29.4571,
      Uranus: 84.01,
      Neptun: 164.79,
      Pluto: 248,
    };
    const out = {};
    Object.entries(ratios).forEach(([name, r]) => {
      const v = earthYears / r;
      out[name] = v < 1 ? `${(v * 12).toFixed(1)} luni` : `${v.toFixed(1)} ani`;
    });
    return { earthYears: earthYears.toFixed(1), ages: out };
  };

  const startMemoryGame = () => {
    const ids = ['soare', 'mercur', 'venus', 'pamant', 'marte', 'jupiter'];
    const cards = [];
    ids.forEach((id) => {
      cards.push({ key: `${id}-a`, planetId: id, flipped: false, matched: false });
      cards.push({ key: `${id}-b`, planetId: id, flipped: false, matched: false });
    });
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    setMemoryGame({ cards, selected: [], moves: 0, matches: 0, complete: false });
    setShowGamesMenu(false);
  };

  const flipMemoryCard = (idx) => {
    if (!memoryGame) return;
    const { cards, selected, moves, matches } = memoryGame;
    if (selected.length >= 2) return;
    if (cards[idx].flipped || cards[idx].matched) return;
    const newCards = cards.map((c, i) => (i === idx ? { ...c, flipped: true } : c));
    const newSelected = [...selected, idx];
    if (newSelected.length === 2) {
      const [a, b] = newSelected;
      const isMatch = newCards[a].planetId === newCards[b].planetId;
      if (isMatch) {
        newCards[a].matched = true;
        newCards[b].matched = true;
        const newMatches = matches + 1;
        const complete = newMatches === 6;
        playChime(newCards[a].planetId);
        setMemoryGame({ cards: newCards, selected: [], moves: moves + 1, matches: newMatches, complete });
      } else {
        setMemoryGame({ cards: newCards, selected: newSelected, moves: moves + 1, matches });
        setTimeout(() => {
          setMemoryGame((prev) => {
            if (!prev) return prev;
            const flipped = prev.cards.map((c, i) =>
              i === a || i === b ? { ...c, flipped: false } : c
            );
            return { ...prev, cards: flipped, selected: [] };
          });
        }, 1100);
      }
    } else {
      setMemoryGame({ ...memoryGame, cards: newCards, selected: newSelected });
    }
  };

  const startSortGame = () => {
    const planetOrder = ['mercur', 'venus', 'pamant', 'marte', 'jupiter', 'saturn', 'uranus', 'neptun'];
    const shuffled = [...planetOrder];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setSortGame({ remaining: shuffled, expected: planetOrder, picked: [], wrong: false, complete: false });
    setShowGamesMenu(false);
  };

  const handleSortPick = (id) => {
    if (!sortGame || sortGame.complete) return;
    const expected = sortGame.expected[sortGame.picked.length];
    if (id === expected) {
      const newPicked = [...sortGame.picked, id];
      const newRemaining = sortGame.remaining.filter((p) => p !== id);
      const complete = newPicked.length === sortGame.expected.length;
      playChime(id);
      setSortGame({ ...sortGame, remaining: newRemaining, picked: newPicked, complete, wrong: false });
    } else {
      setSortGame({ ...sortGame, wrong: true });
      setTimeout(() => setSortGame((prev) => (prev ? { ...prev, wrong: false } : prev)), 800);
    }
  };

  const dailyChallenges = [
    { question: 'Astăzi: găsește planeta cu inele!', answerId: 'saturn', emoji: '💍' },
    { question: 'Astăzi: apasă pe gaura neagră!', answerId: 'gaura-neagra', emoji: '🕳️' },
    { question: 'Astăzi: descoperă galaxia noastră!', answerId: 'calea-lactee', emoji: '🌌' },
    { question: 'Astăzi: salută cea mai mare planetă!', answerId: 'jupiter', emoji: '🪐' },
    { question: 'Astăzi: vizitează casa noastră!', answerId: 'pamant', emoji: '🌍' },
    { question: 'Astăzi: găsește steaua noastră!', answerId: 'soare', emoji: '☀️' },
    { question: 'Astăzi: descoperă Planeta Roșie!', answerId: 'marte', emoji: '🔴' },
    { question: 'Astăzi: găsește planeta culcată!', answerId: 'uranus', emoji: '🎳' },
    { question: 'Astăzi: salută planeta pitică!', answerId: 'pluto', emoji: '🥲' },
    { question: 'Astăzi: găsește un astronaut prietenos!', answerId: 'sarpe', emoji: '🐍' },
    { question: 'Astăzi: descoperă cea mai îndepărtată planetă!', answerId: 'neptun', emoji: '🌊' },
    { question: 'Astăzi: găsește planeta cu nori de acid!', answerId: 'venus', emoji: '🔥' },
  ];

  const startDailyChallenge = () => {
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
    const idx = dayOfYear % dailyChallenges.length;
    const todayKey = today.toISOString().split('T')[0];
    let completedToday = false;
    try {
      completedToday = localStorage.getItem('dailyChallengeDone') === todayKey;
    } catch (e) {}
    setDailyChallenge({ ...dailyChallenges[idx], todayKey, completed: completedToday });
    setShowGamesMenu(false);
  };

  const completeDailyChallenge = () => {
    if (!dailyChallenge) return;
    try {
      localStorage.setItem('dailyChallengeDone', dailyChallenge.todayKey);
    } catch (e) {}
    setDailyChallenge((prev) => (prev ? { ...prev, completed: true } : prev));
  };

  const storyScenes = [
    {
      emoji: '🌌',
      title: 'Era odată un univers...',
      text: 'În urmă cu 13.8 miliarde de ani, totul a început dintr-un Big Bang uriaș! S-au format galaxii, stele și planete.',
    },
    {
      emoji: '☀️',
      title: 'Steaua noastră, Soarele',
      text: 'Cu 4.6 miliarde de ani în urmă, Soarele s-a aprins! E o stea uriașă, în care ar încăpea peste 1 milion de Pământuri.',
    },
    {
      emoji: '🪐',
      title: 'S-au născut planetele',
      text: 'În jurul Soarelui s-au format 8 planete. Cele apropiate (Mercur, Venus, Pământ, Marte) sunt mici și stâncoase.',
    },
    {
      emoji: '🌍',
      title: 'Pământul, casa noastră',
      text: 'Pe Pământ a apărut viața — apă, plante, animale și oameni curioși ca tine. E singura planetă cunoscută cu viață!',
    },
    {
      emoji: '🌙',
      title: 'Luna ne însoțește',
      text: 'Luna noastră se învârte în jurul Pământului de 4.5 miliarde de ani. Ea cauzează valurile mării!',
    },
    {
      emoji: '🪐',
      title: 'Giganții gazoși',
      text: 'Mai departe sunt Jupiter, Saturn, Uranus și Neptun — uriași făcuți din gaze. Saturn are inele frumoase de gheață!',
    },
    {
      emoji: '☄️',
      title: 'Călători cosmici',
      text: 'Asteroizii și cometele zboară printre planete. Cometa Halley se întoarce să ne salute la fiecare 76 de ani!',
    },
    {
      emoji: '🛸',
      title: 'Oameni în spațiu',
      text: 'Acum 50 de ani, oamenii au pășit pe Lună! Și am trimis sondele Voyager dincolo de Pluto, în spațiul interstelar.',
    },
    {
      emoji: '🌌',
      title: 'Și acum, tu',
      text: 'Universul e enorm și plin de mistere. Cine știe — poate tu vei descoperi o planetă nouă într-o zi! Privește mereu cerul!',
    },
  ];

  const startStoryMode = async () => {
    setShowGamesMenu(false);
    setStoryMode({ index: 0, total: storyScenes.length });
    for (let i = 0; i < storyScenes.length; i++) {
      setStoryMode({ index: i, total: storyScenes.length });
      const scene = storyScenes[i];
      const text = `${scene.title}. ${scene.text}`;
      const cleanText = text.replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{1F000}-\u{1F2FF}]/gu, '');
      try {
        const startTime = Date.now();
        await speakPlanet({ name: '', description: cleanText, fact: '', jokes: [] });
        const elapsed = Date.now() - startTime;
        if (elapsed < 7000) await new Promise((r) => setTimeout(r, 7000 - elapsed));
      } catch (e) {
        await new Promise((r) => setTimeout(r, 8000));
      }
      await new Promise((r) => setTimeout(r, 1500));
    }
    setStoryMode(null);
  };

  const triggerMeteorShower = () => {
    if (meteorShowerActive) return;
    setMeteorShowerActive(true);
    const cometColors = ['#fff4a0', '#a8d5ff', '#ffd4a8', '#d8b4ff', '#a0ffd4'];
    const burst = Array.from({ length: 35 }, () => {
      const angle = Math.PI / 4 + (Math.random() - 0.5) * 0.5;
      const distance = 90 + Math.random() * 50;
      return {
        startTop: -10 + Math.random() * 30,
        startLeft: Math.random() * 100,
        dx: Math.cos(angle) * distance,
        dy: Math.sin(angle) * distance,
        rot: (angle * 180) / Math.PI,
        size: Math.random() * 2 + 2,
        duration: Math.random() * 4 + 4,
        delay: Math.random() * 2,
        color: cometColors[Math.floor(Math.random() * cometColors.length)],
        tailLength: Math.random() * 40 + 50,
      };
    });
    setComets((prev) => [...prev, ...burst]);
    setTimeout(() => {
      setComets((prev) => prev.slice(0, prev.length - burst.length));
      setMeteorShowerActive(false);
    }, 9000);
  };

  const triggerEclipse = () => {
    if (eclipseActive) return;
    setEclipseActive(true);
    setTimeout(() => setEclipseActive(false), 6000);
  };

  const summonWishStar = () => {
    if (showWishStar) return;
    const id = Date.now();
    const fromLeft = Math.random() < 0.5;
    setShowWishStar({ id, fromLeft, top: 8 + Math.random() * 30 });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (!showWishStar && Math.random() < 0.5) summonWishStar();
    }, 70000);
    return () => clearInterval(timer);
  }, [showWishStar]);

  const catchWishStar = () => {
    setWishText('');
    setShowWishStar((s) => (s ? { ...s, caught: true } : null));
  };

  const sendWish = () => {
    setWishFlying(true);
    setTimeout(() => {
      setWishText('');
      setShowWishStar(null);
      setWishFlying(false);
    }, 2500);
  };

  const startQuiz = () => {
    setQuizActive(true);
    setQuizIndex(0);
    setQuizScore(0);
    setQuizFeedback(null);
  };

  const handleQuizAnswer = (clickedId) => {
    if (quizFeedback) return;
    const correct = quizQuestions[quizIndex].answerId === clickedId;
    setQuizFeedback(correct ? 'correct' : 'wrong');
    if (correct) {
      setQuizScore((s) => s + 1);
      playChime();
    }
    setTimeout(() => {
      if (quizIndex + 1 >= quizQuestions.length) {
        setQuizActive(false);
        setQuizFeedback(null);
        const finalScore = correct ? quizScore + 1 : quizScore;
        const planet = {
          id: 'quiz-result',
          name: 'Felicitări!',
          color: '#ffd633',
          description: `Ai răspuns corect la ${finalScore} din ${quizQuestions.length} întrebări! ${
            finalScore === quizQuestions.length
              ? 'Ești un astronom desăvârșit! 🌟'
              : finalScore >= 7
              ? 'Excelent, ești aproape expert! 🚀'
              : finalScore >= 4
              ? 'Bravo, mai exersează puțin! 👍'
              : 'Hai să încercăm din nou — apasă pe planete să afli mai multe! ✨'
          }`,
          fact: '',
          moons: '—',
          year: '—',
          diameter: '—',
          jokes: [],
        };
        setSelectedPlanet(planet);
        setPaused(true);
      } else {
        setQuizIndex((i) => i + 1);
        setQuizFeedback(null);
      }
    }, 1400);
  };

  return (
    <div className="relative w-full overflow-x-hidden" style={{
      height: isMobile ? '115vh' : '100vh',
      minHeight: isMobile ? '900px' : '100vh',
      background: 'radial-gradient(ellipse at center, #1a1a3e 0%, #0a0a1f 60%, #000000 100%)',
      fontFamily: '"Comic Sans MS", "Chalkboard SE", "Marker Felt", system-ui, sans-serif',
    }}>
      {/* Stele */}
      {stars.map((star, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animation: `twinkle ${star.duration}s ease-in-out ${star.delay}s infinite`,
            boxShadow: '0 0 4px rgba(255,255,255,0.8)',
          }}
        />
      ))}

      {/* Comete care zboară prin scenă */}
      {comets.map((c, i) => (
        <div
          key={`comet-${i}`}
          className="absolute pointer-events-none"
          style={{
            top: `${c.startTop}%`,
            left: `${c.startLeft}%`,
            width: `${c.tailLength}px`,
            height: `${c.size}px`,
            '--dx': `${c.dx}vw`,
            '--dy': `${c.dy}vh`,
            '--rot': `${c.rot}deg`,
            animation: `cometFly ${c.duration}s linear ${c.delay}s infinite`,
            animationPlayState: paused ? 'paused' : 'running',
            background: `linear-gradient(90deg, transparent, ${c.color}80, ${c.color})`,
            borderRadius: '999px',
            filter: `drop-shadow(0 0 4px ${c.color})`,
            opacity: 0,
          }}
        />
      ))}

      {/* Constelații zodiacale - pe mobil afișăm doar 3 alese de utilizator */}
      {zodiacConstellations
        .filter((z) => !isMobile || ['capricorn', 'fecioara', 'rac'].includes(z.id))
        .map((z) => (
          <Constellation
            key={z.id}
            data={z}
            visited={visited}
            onClick={() => handlePlanetClick(z)}
          />
        ))}

      {/* Șarpe astronaut care plutește (clickabil) */}
      <button
        onClick={() => handlePlanetClick(characters[0])}
        className="absolute cursor-pointer hover:brightness-125 transition-all"
        style={{
          top: '18%',
          left: '-10%',
          zIndex: 6,
          background: 'transparent',
          border: 'none',
          padding: 0,
          animation: paused ? 'none' : 'snakeSlither 28s linear infinite',
        }}
        title="Sis Șarpele Astronaut"
      >
        <SnakeAstronaut size={isMobile ? 60 : 110} />
      </button>

      {/* Pinguin astronaut care plutește (clickabil) */}
      <button
        onClick={() => handlePlanetClick(characters[1])}
        className="absolute cursor-pointer hover:brightness-125 transition-all"
        style={{
          top: '38%',
          right: '12%',
          zIndex: 6,
          background: 'transparent',
          border: 'none',
          padding: 0,
          animation: paused ? 'none' : 'penguinFloat 7s ease-in-out infinite',
        }}
        title="Pip Pinguinul Astronaut"
      >
        <PenguinAstronaut size={isMobile ? 42 : 75} />
      </button>

      {/* Rachetă care zboară diagonal (clickabilă) */}
      <button
        onClick={() => handlePlanetClick(characters[2])}
        className="absolute cursor-pointer hover:brightness-125 transition-all"
        style={{
          top: '72%',
          left: '-8%',
          zIndex: 6,
          background: 'transparent',
          border: 'none',
          padding: 0,
          animation: paused ? 'none' : 'rocketFlight 22s linear infinite',
          transformOrigin: 'center',
        }}
        title="Racheta Stea"
      >
        <div style={{ transform: 'rotate(45deg)' }}>
          <Rocket size={isMobile ? 55 : 100} />
        </div>
      </button>

      {/* Gaură neagră + galaxii */}
      {cosmicObjects.map((obj) => {
        const mobileSize = obj.type === 'galaxy'
          ? Math.round(obj.size * 0.95)
          : Math.round(obj.size * 0.55);
        const effectiveSize = isMobile ? mobileSize : obj.size;
        return (
        <button
          key={obj.id}
          onClick={() => handlePlanetClick(obj)}
          className="absolute cursor-pointer transition-transform hover:scale-110 z-[5]"
          style={{
            width: `${effectiveSize}px`,
            height: `${effectiveSize}px`,
            top: obj.top,
            bottom: obj.bottom,
            left: obj.left,
            right: obj.right,
            background: 'transparent',
            border: 'none',
            padding: 0,
          }}
          title={obj.name}
        >
          {obj.type === 'blackhole' && (
            <>
              <div className="absolute pointer-events-none" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                <BlackHoleVisual size={effectiveSize} paused={paused} />
              </div>
              <span
                className="absolute text-white text-xs font-semibold whitespace-nowrap pointer-events-none"
                style={{
                  bottom: '-20px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  textShadow: '0 1px 3px rgba(0,0,0,0.9)',
                }}
              >
                {obj.name}
              </span>
            </>
          )}
          {obj.type === 'galaxy' && (
            <>
              <div className="absolute pointer-events-none" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                <RealisticGalaxy
                  id={obj.id}
                  size={effectiveSize}
                  armColor={obj.armColor}
                  coreColor={obj.coreColor}
                  glowColor={obj.glowColor}
                  dustColor={obj.dustColor}
                  spinDuration={obj.spinDuration}
                  paused={paused}
                  tilt={obj.tilt || 0}
                />
              </div>
              <span
                className="absolute text-white text-xs font-semibold whitespace-nowrap pointer-events-none"
                style={{
                  bottom: '-20px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  textShadow: '0 1px 3px rgba(0,0,0,0.9)',
                }}
              >
                {obj.name}
              </span>
            </>
          )}
        </button>
        );
      })}

      {/* Antet */}
      <div className="relative z-20 pt-3 md:pt-6 px-3 md:px-4 text-center">
        <h1 className="text-2xl md:text-5xl font-bold text-white mb-1 md:mb-2" style={{
          textShadow: '0 0 20px rgba(255,200,100,0.6), 0 2px 4px rgba(0,0,0,0.5)',
          letterSpacing: '0.05em',
        }}>
          ✨ Sistemul Solar ✨
        </h1>
        <p className="text-yellow-200 text-xs md:text-lg mb-1 md:mb-2 hidden sm:block">
          Apasă pe o planetă pentru a afla secretele ei!
        </p>
        <div className="text-yellow-100/80 text-xs md:text-sm mb-2 md:mb-3">
          🌟 Descoperite: <span className="font-bold text-yellow-300">{visited.size}</span> / {TOTAL_DISCOVERABLE}
        </div>
        {/* Bara butoane mobil */}
        <div className="md:hidden inline-flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={() => setPaused(!paused)}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-sm border border-white/20 text-sm"
          >
            {paused ? <Play size={16} /> : <Pause size={16} />}
            <span>{paused ? 'Pornește' : 'Pauză'}</span>
          </button>
          <button
            onClick={() => setMuted(!muted)}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-sm border border-white/20 text-sm"
          >
            {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            <span>{muted ? 'Off' : 'On'}</span>
          </button>
          <button
            onClick={() => setShowGamesMenu(true)}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-white rounded-full backdrop-blur-sm border border-white/40 text-sm font-bold"
            style={{ background: 'linear-gradient(135deg, rgba(120,180,255,0.5), rgba(255,140,200,0.5))' }}
          >
            <span>🎮</span>
            <span>Jocuri</span>
          </button>
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="inline-flex items-center justify-center px-3 py-2 bg-white/15 hover:bg-white/25 text-white rounded-full backdrop-blur-sm border border-white/30 text-sm font-bold"
            title="Mai multe opțiuni"
          >
            <span>⚙️ Mai mult</span>
          </button>
        </div>

        {/* Bara butoane desktop */}
        <div className="hidden md:inline-flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={() => setPaused(!paused)}
            className="inline-flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all backdrop-blur-sm border border-white/20 text-sm"
          >
            {paused ? <Play size={16} /> : <Pause size={16} />}
            <span>{paused ? 'Pornește' : 'Pauză'}</span>
          </button>
          <button
            onClick={() => setMuted(!muted)}
            className="inline-flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all backdrop-blur-sm border border-white/20 text-sm"
            title={muted ? 'Pornește sunetul' : 'Oprește sunetul'}
          >
            {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            <span>{muted ? 'Voce off' : 'Voce on'}</span>
          </button>
          <button
            onClick={toggleMusic}
            className="inline-flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all backdrop-blur-sm border border-white/20 text-sm"
            title={musicOn ? 'Oprește muzica' : 'Pornește muzica de fundal'}
          >
            <span>{musicOn ? '🎵' : '🎶'}</span>
            <span>{musicOn ? 'Muzică on' : 'Muzică off'}</span>
          </button>
          <button
            onClick={tourActive ? stopTour : startTour}
            className="inline-flex items-center gap-2 px-3 py-2 text-white rounded-full transition-all backdrop-blur-sm border text-sm"
            style={{
              background: tourActive ? 'rgba(255,80,80,0.25)' : 'rgba(120,180,255,0.25)',
              borderColor: tourActive ? 'rgba(255,80,80,0.5)' : 'rgba(120,180,255,0.5)',
            }}
          >
            <span>{tourActive ? '⏹️' : '🎬'}</span>
            <span>{tourActive ? 'Stop tur' : 'Tur ghidat'}</span>
          </button>
          <button
            onClick={startQuiz}
            disabled={visited.size < 5}
            className="inline-flex items-center gap-2 px-3 py-2 text-white rounded-full transition-all backdrop-blur-sm border text-sm disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
              background: 'rgba(255,200,80,0.25)',
              borderColor: 'rgba(255,200,80,0.5)',
            }}
            title={visited.size < 5 ? `Descoperă ${5 - visited.size} obiecte ca să joci` : 'Joacă quiz!'}
          >
            <span>🎯</span>
            <span>Quiz</span>
          </button>
          <button
            onClick={openDrawingMode}
            className="inline-flex items-center gap-2 px-3 py-2 text-white rounded-full transition-all backdrop-blur-sm border text-sm"
            style={{
              background: 'rgba(255,120,180,0.25)',
              borderColor: 'rgba(255,120,180,0.5)',
            }}
            title="Creează-ți propria planetă!"
          >
            <span>🎨</span>
            <span>Desenează</span>
          </button>
          <button
            onClick={() => setShowAgeCalc(true)}
            className="inline-flex items-center gap-2 px-3 py-2 text-white rounded-full transition-all backdrop-blur-sm border text-sm"
            style={{
              background: 'rgba(120,255,180,0.25)',
              borderColor: 'rgba(120,255,180,0.5)',
            }}
            title="Vezi câți ani ai pe fiecare planetă!"
          >
            <span>🎂</span>
            <span>Vârsta mea</span>
          </button>
          <button
            onClick={triggerMeteorShower}
            disabled={meteorShowerActive}
            className="inline-flex items-center gap-2 px-3 py-2 text-white rounded-full transition-all backdrop-blur-sm border text-sm disabled:opacity-40"
            style={{
              background: 'rgba(180,160,255,0.25)',
              borderColor: 'rgba(180,160,255,0.5)',
            }}
            title="Pornește o ploaie de meteoriți!"
          >
            <span>☄️</span>
            <span>Meteoriți</span>
          </button>
          <button
            onClick={triggerEclipse}
            disabled={eclipseActive}
            className="inline-flex items-center gap-2 px-3 py-2 text-white rounded-full transition-all backdrop-blur-sm border text-sm disabled:opacity-40"
            style={{
              background: 'rgba(50,50,90,0.4)',
              borderColor: 'rgba(120,120,160,0.5)',
            }}
            title="Vezi o eclipsă!"
          >
            <span>🌑</span>
            <span>Eclipsă</span>
          </button>
          <button
            onClick={() => setShowGamesMenu(true)}
            className="inline-flex items-center gap-2 px-3 py-2 text-white rounded-full transition-all backdrop-blur-sm border text-sm font-bold"
            style={{
              background: 'linear-gradient(135deg, rgba(120,180,255,0.5), rgba(255,140,200,0.5))',
              borderColor: 'rgba(255,255,255,0.6)',
            }}
            title="Jocuri și activități!"
          >
            <span>🎮</span>
            <span>Jocuri</span>
          </button>
        </div>
        {earnedBadges.size > 0 && (
          <div className="mt-2 flex flex-wrap justify-center gap-1 text-2xl">
            {badges
              .filter((b) => earnedBadges.has(b.id))
              .map((b) => (
                <span key={b.id} title={`${b.name}: ${b.text}`} className="cursor-help">
                  {b.emoji}
                </span>
              ))}
          </div>
        )}
      </div>

      {/* Sistemul Solar */}
      <div className="relative w-full flex items-center justify-center" style={{ height: `${1740 * systemScale}px`, marginTop: '10px' }}>
        <div className="relative" style={{ width: '1740px', height: '1740px', transform: `scale(${systemScale})`, transformOrigin: 'center center' }}>
          {/* Cercuri orbitale */}
          {planets.map((p) => (
            <div
              key={`orbit-${p.id}`}
              className="absolute rounded-full border border-white/10"
              style={{
                width: `${p.orbit * 2}px`,
                height: `${p.orbit * 2}px`,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            />
          ))}

          {/* Soarele */}
          <button
            onClick={() => handlePlanetClick(sunData)}
            className="absolute cursor-pointer transition-transform hover:scale-110 z-10"
            style={{
              width: '170px',
              height: '170px',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background: 'transparent',
              border: 'none',
              padding: 0,
              filter: 'drop-shadow(0 0 50px rgba(255,180,50,0.8)) drop-shadow(0 0 100px rgba(255,140,0,0.55))',
              animation: paused ? 'none' : 'sunPulse 4s ease-in-out infinite',
            }}
          >
            <RealisticSun size={170} paused={paused} />
          </button>

          {/* Cometa Halley pe orbită eliptică - ascuns pe mobil */}
      {!isMobile && (
      <div
        className="absolute pointer-events-none"
        style={{
          width: '1700px',
          height: '700px',
          top: '50%',
          left: '50%',
          marginLeft: '-850px',
          marginTop: '-350px',
          animation: 'orbit 120s linear infinite',
          animationPlayState: paused ? 'paused' : 'running',
          borderRadius: '50%',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '0',
            transform: 'translate(-50%, -50%)',
            width: '70px',
            height: '4px',
            background: 'linear-gradient(90deg, transparent, rgba(180,220,255,0.6), rgba(255,255,255,0.95))',
            borderRadius: '999px',
            filter: 'drop-shadow(0 0 6px #b8e0ff)',
            boxShadow: '0 0 12px #ffffff80',
          }}
        >
          <div
            style={{
              position: 'absolute',
              right: '0',
              top: '50%',
              transform: 'translate(40%, -50%)',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, #fff, #b8d4ff 60%, #4a78ba)',
              boxShadow: '0 0 14px rgba(180,220,255,1), 0 0 28px rgba(120,180,240,0.6)',
            }}
          />
          <span
            className="absolute text-xs text-cyan-200 font-semibold whitespace-nowrap"
            style={{
              top: '-18px',
              right: '-12px',
              textShadow: '0 1px 3px rgba(0,0,0,0.9)',
              opacity: 0.85,
            }}
          >
            Cometa Halley
          </span>
        </div>
      </div>
      )}

      {!isMobile && (
        <>
          <div
            className="absolute pointer-events-none"
            style={{ top: '8%', left: '92%', zIndex: 4 }}
          >
            <svg viewBox="0 0 50 30" width="50" height="30" style={{ overflow: 'visible' }}>
              <rect x="20" y="12" width="14" height="6" fill="#dddddd" stroke="#888" strokeWidth="0.5" />
              <line x1="2" y1="15" x2="20" y2="15" stroke="#aaa" strokeWidth="0.5" />
              <circle cx="2" cy="15" r="6" fill="none" stroke="#fff" strokeWidth="1.2" />
              <line x1="34" y1="15" x2="44" y2="15" stroke="#aaa" strokeWidth="0.5" />
              <rect x="44" y="11" width="6" height="8" fill="#cc8855" />
            </svg>
            <div className="text-[10px] text-white/70 mt-0.5 text-center" style={{ textShadow: '0 1px 2px #000' }}>
              🛸 Voyager 1
            </div>
          </div>
          <div
            className="absolute pointer-events-none"
            style={{ top: '88%', left: '6%', zIndex: 4 }}
          >
            <svg viewBox="0 0 50 30" width="46" height="28" style={{ overflow: 'visible' }}>
              <rect x="20" y="12" width="14" height="6" fill="#dddddd" stroke="#888" strokeWidth="0.5" />
              <line x1="2" y1="15" x2="20" y2="15" stroke="#aaa" strokeWidth="0.5" />
              <circle cx="2" cy="15" r="6" fill="none" stroke="#fff" strokeWidth="1.2" />
              <line x1="34" y1="15" x2="44" y2="15" stroke="#aaa" strokeWidth="0.5" />
              <rect x="44" y="11" width="6" height="8" fill="#cc8855" />
            </svg>
            <div className="text-[10px] text-white/70 mt-0.5 text-center" style={{ textShadow: '0 1px 2px #000' }}>
              🛸 Voyager 2
            </div>
          </div>
        </>
      )}

      {/* Centura de asteroizi */}
          {asteroids.map((a, i) => (
            <div
              key={`ast-${i}`}
              className="absolute pointer-events-none"
              style={{
                width: `${a.orbit * 2}px`,
                height: `${a.orbit * 2}px`,
                top: '50%',
                left: '50%',
                marginLeft: `-${a.orbit}px`,
                marginTop: `-${a.orbit}px`,
                transform: `rotate(${a.angle}deg)`,
                animation: `orbit ${a.period}s linear infinite`,
                animationPlayState: paused ? 'paused' : 'running',
                animationDelay: `-${a.delayPct * a.period}s`,
                borderRadius: '50%',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '0',
                  transform: 'translate(-50%, -50%)',
                  width: `${a.size}px`,
                  height: `${a.size}px`,
                  borderRadius: '50%',
                  background: a.color,
                  boxShadow: `0 0 2px rgba(0,0,0,0.5), inset -0.5px -0.5px 1px rgba(0,0,0,0.6)`,
                }}
              />
            </div>
          ))}

          {/* Planetele */}
          {planets.map((planet) => (
            <div
              key={planet.id}
              className="absolute"
              style={{
                width: `${planet.orbit * 2}px`,
                height: `${planet.orbit * 2}px`,
                top: '50%',
                left: '50%',
                marginLeft: `-${planet.orbit}px`,
                marginTop: `-${planet.orbit}px`,
                animation: `orbit ${planet.duration}s linear infinite`,
                animationPlayState: paused ? 'paused' : 'running',
                borderRadius: '50%',
                pointerEvents: 'none',
              }}
            >
              <button
                onClick={() => handlePlanetClick(planet)}
                className="absolute cursor-pointer transition-transform hover:scale-125 group"
                style={{
                  width: `${Math.max(planet.size, isMobile ? 56 : 28)}px`,
                  height: `${Math.max(planet.size, isMobile ? 56 : 28)}px`,
                  top: '50%',
                  left: '0',
                  transform: 'translate(-50%, -50%)',
                  background: 'transparent',
                  borderRadius: '50%',
                  border: 'none',
                  padding: 0,
                  pointerEvents: 'auto',
                }}
              >
                <span
                  aria-hidden="true"
                  className="absolute pointer-events-none"
                  style={{
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <RealisticPlanet planet={planet} paused={paused} />
                </span>
                {planet.hasRings && (
                  <div
                    className="absolute pointer-events-none"
                    style={{
                      width: `${planet.size * 1.85}px`,
                      height: `${planet.size * 0.42}px`,
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%) rotate(-20deg)',
                      borderRadius: '50%',
                      border: '3px solid rgba(232,212,168,0.75)',
                      boxShadow: 'inset 0 0 8px rgba(232,212,168,0.4), 0 0 12px rgba(232,212,168,0.2)',
                    }}
                  />
                )}
                {planet.satellites?.map((moon, mi) => (
                  <div
                    key={`moon-${mi}`}
                    className="absolute pointer-events-none"
                    style={{
                      width: `${moon.distance * 2}px`,
                      height: `${moon.distance * 2}px`,
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      animation: `orbit ${moon.period}s linear infinite`,
                      animationPlayState: paused ? 'paused' : 'running',
                      animationDelay: `-${mi * 0.4}s`,
                      borderRadius: '50%',
                    }}
                  >
                    {moon.isISS ? (
                      <div
                        style={{
                          position: 'absolute',
                          top: '50%',
                          left: '0',
                          transform: 'translate(-50%, -50%)',
                          width: '14px',
                          height: '5px',
                          background: 'linear-gradient(90deg, #6699dd, #ffffff 30%, #ffffff 70%, #6699dd)',
                          borderRadius: '1px',
                          boxShadow: '0 0 4px rgba(180,220,255,0.9)',
                        }}
                      >
                        <div
                          style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '3px',
                            height: '3px',
                            background: '#fff',
                            borderRadius: '50%',
                            boxShadow: '0 0 4px #fff',
                          }}
                        />
                      </div>
                    ) : (
                      <div
                        style={{
                          position: 'absolute',
                          top: '50%',
                          left: '0',
                          transform: 'translate(-50%, -50%)',
                          width: `${moon.size}px`,
                          height: `${moon.size}px`,
                          borderRadius: '50%',
                          background: `radial-gradient(circle at 30% 30%, #fff, ${moon.color} 50%, #2a2018)`,
                          boxShadow: `0 0 ${moon.size / 2}px rgba(255,255,255,0.3), inset -1px -1px 2px rgba(0,0,0,0.4)`,
                        }}
                      />
                    )}
                  </div>
                ))}
                <span
                  className="absolute text-white text-xs whitespace-nowrap font-semibold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                  style={{
                    top: `${planet.size + 6}px`,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    textShadow: '0 1px 3px rgba(0,0,0,0.9)',
                  }}
                >
                  {planet.name}
                </span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Planete custom desenate de copil */}
      {customPlanets.map((p, i) => {
        const positions = [
          { top: '12%', left: '8%' },
          { top: '14%', right: '32%' },
          { top: '52%', left: '5%' },
          { top: '52%', right: '5%' },
          { bottom: '8%', left: '38%' },
        ];
        const pos = positions[i % positions.length];
        return (
          <button
            key={p.id}
            onClick={() => handlePlanetClick(p)}
            className="absolute cursor-pointer hover:scale-110 transition-transform"
            style={{
              ...pos,
              zIndex: 6,
              background: 'transparent',
              border: 'none',
              padding: 0,
              animation: 'buddyWave 4s ease-in-out infinite',
            }}
            title={p.name}
          >
            <div className="relative">
              <img
                src={p.image}
                alt={p.name}
                style={{
                  width: '90px',
                  height: '90px',
                  borderRadius: '50%',
                  boxShadow: '0 0 20px rgba(255,214,51,0.6), 0 0 40px rgba(255,180,80,0.3)',
                  display: 'block',
                }}
              />
              <span
                className="absolute text-white text-xs font-semibold whitespace-nowrap pointer-events-none"
                style={{
                  bottom: '-20px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  textShadow: '0 1px 3px rgba(0,0,0,0.9)',
                }}
              >
                {p.name}
              </span>
            </div>
          </button>
        );
      })}

      {/* Modal Desenează planeta ta */}
      {drawingMode && (
        <div
          className="fixed inset-0 z-[55] flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(6px)' }}
          onClick={closeDrawingMode}
        >
          <div
            className="relative rounded-3xl p-6 text-white max-w-lg w-full"
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'linear-gradient(145deg, rgba(60,30,90,0.96), rgba(20,15,50,0.96))',
              border: '2px solid #ff88cc',
              boxShadow: '0 0 40px rgba(255,120,200,0.6), 0 20px 60px rgba(0,0,0,0.5)',
            }}
          >
            <button
              onClick={closeDrawingMode}
              className="absolute top-4 right-4 text-white/70 hover:text-white"
            >
              <X size={24} />
            </button>
            <h2 className="text-2xl font-bold text-pink-200 mb-1 text-center">🎨 Desenează planeta ta!</h2>
            <p className="text-pink-100/80 text-sm text-center mb-3">
              Folosește degetul sau mouse-ul. Apoi dă-i un nume și salveaz-o!
            </p>
            <div className="flex justify-center mb-3">
              <canvas
                ref={drawCanvasRef}
                width={300}
                height={300}
                className="rounded-full touch-none"
                style={{
                  background: '#0a1230',
                  border: '3px solid rgba(255,200,80,0.6)',
                  boxShadow: '0 0 20px rgba(255,200,80,0.3)',
                  cursor: 'crosshair',
                  maxWidth: '100%',
                }}
                onMouseDown={handleDrawStart}
                onMouseMove={handleDrawMove}
                onMouseUp={handleDrawEnd}
                onMouseLeave={handleDrawEnd}
                onTouchStart={handleDrawStart}
                onTouchMove={handleDrawMove}
                onTouchEnd={handleDrawEnd}
              />
            </div>
            <div className="flex flex-wrap justify-center gap-2 mb-3">
              {['#4a90d9', '#3e8a3e', '#d96a4a', '#e8b87a', '#a8e0e0', '#cc88ff', '#ffd633', '#ff5566', '#ffffff', '#222222'].map(
                (c) => (
                  <button
                    key={c}
                    onClick={() => setDrawColor(c)}
                    style={{
                      width: '32px',
                      height: '32px',
                      background: c,
                      border: drawColor === c ? '3px solid #ffd633' : '2px solid rgba(255,255,255,0.3)',
                      borderRadius: '50%',
                      cursor: 'pointer',
                    }}
                  />
                )
              )}
            </div>
            <div className="flex justify-center gap-2 mb-3">
              {[4, 8, 16, 24].map((s) => (
                <button
                  key={s}
                  onClick={() => setDrawSize(s)}
                  className="text-xs px-3 py-1 rounded-full"
                  style={{
                    background: drawSize === s ? '#ffd633' : 'rgba(255,255,255,0.15)',
                    color: drawSize === s ? '#222' : '#fff',
                    fontWeight: 600,
                  }}
                >
                  {s}px
                </button>
              ))}
            </div>
            <input
              type="text"
              value={drawName}
              onChange={(e) => setDrawName(e.target.value.slice(0, 20))}
              placeholder="Nume planeta ta..."
              className="w-full px-4 py-2 rounded-xl text-white mb-3 text-center"
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.3)',
              }}
              maxLength={20}
            />
            <div className="flex gap-2 justify-center">
              <button
                onClick={clearDrawing}
                className="px-4 py-2 rounded-full font-semibold"
                style={{ background: 'rgba(255,255,255,0.15)', color: '#fff' }}
              >
                Șterge tot
              </button>
              <button
                onClick={savePlanet}
                className="px-6 py-2 rounded-full font-bold"
                style={{ background: '#ff88cc', color: '#3a1a2a' }}
              >
                💾 Salvează planeta!
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Drawer mobil cu acțiuni */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-[55] flex items-end"
          style={{ background: 'rgba(0,0,0,0.6)' }}
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="w-full rounded-t-3xl p-4 text-white"
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'linear-gradient(180deg, rgba(40,30,80,0.97), rgba(15,15,40,0.97))',
              border: '1px solid rgba(255,255,255,0.2)',
              borderBottom: 'none',
              boxShadow: '0 -10px 30px rgba(0,0,0,0.5)',
              animation: 'drawerUp 0.3s ease-out',
            }}
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-bold">⚙️ Mai multe</h3>
              <button onClick={() => setMobileMenuOpen(false)} className="text-white/70 hover:text-white">
                <X size={22} />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => { toggleMusic(); setMobileMenuOpen(false); }}
                className="flex items-center gap-2 px-4 py-3 rounded-2xl text-sm font-semibold border"
                style={{ background: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.2)' }}
              >
                <span className="text-xl">{musicOn ? '🎵' : '🎶'}</span>
                <span>{musicOn ? 'Muzică on' : 'Muzică off'}</span>
              </button>
              <button
                onClick={() => { tourActive ? stopTour() : startTour(); setMobileMenuOpen(false); }}
                className="flex items-center gap-2 px-4 py-3 rounded-2xl text-sm font-semibold border"
                style={{
                  background: tourActive ? 'rgba(255,80,80,0.25)' : 'rgba(120,180,255,0.25)',
                  borderColor: tourActive ? 'rgba(255,80,80,0.5)' : 'rgba(120,180,255,0.5)',
                }}
              >
                <span className="text-xl">{tourActive ? '⏹️' : '🎬'}</span>
                <span>{tourActive ? 'Stop tur' : 'Tur ghidat'}</span>
              </button>
              <button
                onClick={() => { startQuiz(); setMobileMenuOpen(false); }}
                disabled={visited.size < 5}
                className="flex items-center gap-2 px-4 py-3 rounded-2xl text-sm font-semibold border disabled:opacity-40"
                style={{ background: 'rgba(255,200,80,0.25)', borderColor: 'rgba(255,200,80,0.5)' }}
              >
                <span className="text-xl">🎯</span>
                <span>Quiz</span>
              </button>
              <button
                onClick={() => { openDrawingMode(); setMobileMenuOpen(false); }}
                className="flex items-center gap-2 px-4 py-3 rounded-2xl text-sm font-semibold border"
                style={{ background: 'rgba(255,120,180,0.25)', borderColor: 'rgba(255,120,180,0.5)' }}
              >
                <span className="text-xl">🎨</span>
                <span>Desenează</span>
              </button>
              <button
                onClick={() => { setShowAgeCalc(true); setMobileMenuOpen(false); }}
                className="flex items-center gap-2 px-4 py-3 rounded-2xl text-sm font-semibold border"
                style={{ background: 'rgba(120,255,180,0.25)', borderColor: 'rgba(120,255,180,0.5)' }}
              >
                <span className="text-xl">🎂</span>
                <span>Vârsta mea</span>
              </button>
              <button
                onClick={() => { triggerMeteorShower(); setMobileMenuOpen(false); }}
                disabled={meteorShowerActive}
                className="flex items-center gap-2 px-4 py-3 rounded-2xl text-sm font-semibold border disabled:opacity-40"
                style={{ background: 'rgba(180,160,255,0.25)', borderColor: 'rgba(180,160,255,0.5)' }}
              >
                <span className="text-xl">☄️</span>
                <span>Meteoriți</span>
              </button>
              <button
                onClick={() => { triggerEclipse(); setMobileMenuOpen(false); }}
                disabled={eclipseActive}
                className="flex items-center gap-2 px-4 py-3 rounded-2xl text-sm font-semibold border disabled:opacity-40 col-span-2"
                style={{ background: 'rgba(50,50,90,0.5)', borderColor: 'rgba(120,120,160,0.5)' }}
              >
                <span className="text-xl">🌑</span>
                <span>Eclipsă</span>
              </button>
            </div>
            {earnedBadges.size > 0 && (
              <div className="mt-3 flex flex-wrap justify-center gap-1 text-xl">
                {badges
                  .filter((b) => earnedBadges.has(b.id))
                  .map((b) => (
                    <span key={b.id}>{b.emoji}</span>
                  ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Meniu Jocuri */}
      {showGamesMenu && (
        <div
          className="fixed inset-0 z-[55] flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(6px)' }}
          onClick={() => setShowGamesMenu(false)}
        >
          <div
            className="relative rounded-3xl p-6 text-white max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'linear-gradient(145deg, rgba(60,40,100,0.96), rgba(20,15,60,0.96))',
              border: '2px solid #aa88ff',
              boxShadow: '0 0 40px rgba(170,136,255,0.6)',
            }}
          >
            <button
              onClick={() => setShowGamesMenu(false)}
              className="absolute top-4 right-4 text-white/70 hover:text-white"
            >
              <X size={24} />
            </button>
            <h2 className="text-2xl font-bold text-purple-200 mb-4 text-center">🎮 Alege un joc!</h2>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={startMemoryGame}
                className="rounded-2xl p-4 text-center hover:scale-105 transition-transform"
                style={{ background: 'rgba(120,180,255,0.2)', border: '1px solid rgba(120,180,255,0.5)' }}
              >
                <div className="text-3xl mb-1">🃏</div>
                <div className="font-bold">Memory Match</div>
                <div className="text-xs text-white/70">Găsește perechile</div>
              </button>
              <button
                onClick={startSortGame}
                className="rounded-2xl p-4 text-center hover:scale-105 transition-transform"
                style={{ background: 'rgba(255,180,120,0.2)', border: '1px solid rgba(255,180,120,0.5)' }}
              >
                <div className="text-3xl mb-1">📏</div>
                <div className="font-bold">Sortează</div>
                <div className="text-xs text-white/70">Planete în ordine</div>
              </button>
              <button
                onClick={startDailyChallenge}
                className="rounded-2xl p-4 text-center hover:scale-105 transition-transform"
                style={{ background: 'rgba(120,255,180,0.2)', border: '1px solid rgba(120,255,180,0.5)' }}
              >
                <div className="text-3xl mb-1">📅</div>
                <div className="font-bold">Provocare zilnică</div>
                <div className="text-xs text-white/70">O misiune nouă</div>
              </button>
              <button
                onClick={() => { setStickerGallery(true); setShowGamesMenu(false); }}
                className="rounded-2xl p-4 text-center hover:scale-105 transition-transform"
                style={{ background: 'rgba(255,200,80,0.2)', border: '1px solid rgba(255,200,80,0.5)' }}
              >
                <div className="text-3xl mb-1">🎴</div>
                <div className="font-bold">Stickere</div>
                <div className="text-xs text-white/70">Colecția ta</div>
              </button>
              <button
                onClick={startStoryMode}
                className="rounded-2xl p-4 text-center hover:scale-105 transition-transform col-span-2"
                style={{ background: 'rgba(255,120,180,0.2)', border: '1px solid rgba(255,120,180,0.5)' }}
              >
                <div className="text-3xl mb-1">🎙️</div>
                <div className="font-bold">Spune-mi o poveste</div>
                <div className="text-xs text-white/70">Aventura universului narată cu vocea</div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Memory Match Game */}
      {memoryGame && (
        <div
          className="fixed inset-0 z-[55] flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(6px)' }}
        >
          <div
            className="rounded-3xl p-6 text-white max-w-lg w-full"
            style={{
              background: 'linear-gradient(145deg, rgba(40,60,120,0.96), rgba(15,25,60,0.96))',
              border: '2px solid #88ccff',
              boxShadow: '0 0 40px rgba(120,200,255,0.5)',
            }}
          >
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-bold text-blue-200">🃏 Memory Match</h2>
              <div className="text-sm text-white/70">Mutări: {memoryGame.moves} · Perechi: {memoryGame.matches}/6</div>
              <button onClick={() => setMemoryGame(null)} className="text-white/70 hover:text-white">
                <X size={20} />
              </button>
            </div>
            {memoryGame.complete ? (
              <div className="text-center py-8">
                <div className="text-6xl mb-3">🎉</div>
                <h3 className="text-2xl font-bold text-yellow-300 mb-2">Bravo!</h3>
                <p className="text-white mb-3">Ai găsit toate perechile în {memoryGame.moves} mutări!</p>
                <button
                  onClick={startMemoryGame}
                  className="px-6 py-2 rounded-full bg-blue-400 text-blue-900 font-bold hover:bg-blue-300"
                >
                  Mai încearcă o dată!
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-2">
                {memoryGame.cards.map((card, idx) => {
                  const planet = planets.find((p) => p.id === card.planetId) || sunData;
                  return (
                    <button
                      key={card.key}
                      onClick={() => flipMemoryCard(idx)}
                      className="aspect-square rounded-xl transition-all"
                      style={{
                        background:
                          card.flipped || card.matched
                            ? planet.gradient || 'radial-gradient(circle at 30% 30%, #fff4a0, #ffaa00)'
                            : 'linear-gradient(135deg, #2a3a6a, #1a2548)',
                        border: card.matched ? '3px solid #ffd633' : '2px solid rgba(255,255,255,0.3)',
                        boxShadow: card.matched ? '0 0 12px rgba(255,214,51,0.6)' : 'none',
                        transform: card.flipped || card.matched ? 'rotateY(0)' : 'rotateY(0)',
                      }}
                    >
                      {!card.flipped && !card.matched && <span className="text-2xl">?</span>}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Sort Planets Game */}
      {sortGame && (
        <div
          className="fixed inset-0 z-[55] flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(6px)' }}
        >
          <div
            className="rounded-3xl p-6 text-white max-w-2xl w-full"
            style={{
              background: 'linear-gradient(145deg, rgba(80,60,40,0.96), rgba(40,25,15,0.96))',
              border: '2px solid #ffaa66',
              boxShadow: '0 0 40px rgba(255,170,100,0.5)',
            }}
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-bold text-orange-200">📏 Sortează planetele</h2>
              <button onClick={() => setSortGame(null)} className="text-white/70 hover:text-white">
                <X size={20} />
              </button>
            </div>
            <p className="text-orange-100/80 text-sm mb-3 text-center">
              Apasă planetele <strong>de la cea mai apropiată de Soare la cea mai îndepărtată</strong>!
            </p>
            {sortGame.complete ? (
              <div className="text-center py-8">
                <div className="text-6xl mb-3">🌟</div>
                <h3 className="text-2xl font-bold text-yellow-300 mb-2">Perfect!</h3>
                <p className="text-white mb-3">Cunoști ordinea planetelor!</p>
                <button
                  onClick={startSortGame}
                  className="px-6 py-2 rounded-full bg-orange-400 text-orange-900 font-bold hover:bg-orange-300"
                >
                  Mai încearcă o dată!
                </button>
              </div>
            ) : (
              <>
                <div className="text-sm text-yellow-200 mb-2">
                  Pasul {sortGame.picked.length + 1}/8 — caută <strong>{['cea mai apropiată', 'a 2-a', 'a 3-a', 'a 4-a', 'a 5-a', 'a 6-a', 'a 7-a', 'cea mai îndepărtată'][sortGame.picked.length]}</strong>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {sortGame.picked.map((id) => {
                    const p = planets.find((pl) => pl.id === id);
                    return (
                      <div key={id} className="px-3 py-2 bg-green-700/40 rounded-lg border border-green-500/60 text-sm font-semibold">
                        ✅ {p.name}
                      </div>
                    );
                  })}
                </div>
                <div className={`grid grid-cols-4 gap-3 ${sortGame.wrong ? 'animate-pulse' : ''}`}>
                  {sortGame.remaining.map((id) => {
                    const p = planets.find((pl) => pl.id === id);
                    return (
                      <button
                        key={id}
                        onClick={() => handleSortPick(id)}
                        className="rounded-2xl p-3 hover:scale-105 transition-transform text-center"
                        style={{
                          background: sortGame.wrong ? 'rgba(255,80,80,0.3)' : 'rgba(255,255,255,0.1)',
                          border: sortGame.wrong ? '2px solid #ff5566' : '1px solid rgba(255,255,255,0.3)',
                        }}
                      >
                        <div
                          className="rounded-full mx-auto mb-1"
                          style={{
                            width: '40px',
                            height: '40px',
                            background: p.gradient,
                            boxShadow: `0 0 10px ${p.color}80`,
                          }}
                        />
                        <div className="text-xs font-semibold">{p.name}</div>
                      </button>
                    );
                  })}
                </div>
                {sortGame.wrong && (
                  <div className="mt-3 text-center text-red-300 font-bold">
                    Nu chiar — încearcă altă planetă!
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {/* Daily Challenge */}
      {dailyChallenge && (
        <div
          className="fixed inset-0 z-[55] flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(6px)' }}
          onClick={() => setDailyChallenge(null)}
        >
          <div
            className="rounded-3xl p-6 text-white max-w-md w-full text-center"
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'linear-gradient(145deg, rgba(40,100,60,0.96), rgba(15,40,25,0.96))',
              border: '2px solid #66ff99',
              boxShadow: '0 0 40px rgba(120,255,180,0.5)',
            }}
          >
            <button
              onClick={() => setDailyChallenge(null)}
              className="absolute top-4 right-4 text-white/70 hover:text-white"
            >
              <X size={24} />
            </button>
            <div className="text-6xl mb-3">{dailyChallenge.emoji}</div>
            <h2 className="text-2xl font-bold text-green-200 mb-2">📅 Provocarea zilei</h2>
            <p className="text-lg text-white mb-4">{dailyChallenge.question}</p>
            {dailyChallenge.completed ? (
              <div className="text-yellow-300 font-bold">✅ Ai rezolvat-o azi! Bravo!</div>
            ) : (
              <>
                <p className="text-green-100/80 text-sm mb-4">
                  Caut-o în scenă și apasă pe ea! Apoi revino aici să marchezi că ai găsit-o.
                </p>
                <button
                  onClick={completeDailyChallenge}
                  className="px-6 py-2 rounded-full bg-green-400 text-green-900 font-bold hover:bg-green-300"
                >
                  Am găsit-o! ✓
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Sticker Gallery */}
      {stickerGallery && (
        <div
          className="fixed inset-0 z-[55] flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(6px)' }}
          onClick={() => setStickerGallery(false)}
        >
          <div
            className="rounded-3xl p-6 text-white max-w-2xl w-full max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'linear-gradient(145deg, rgba(100,80,40,0.96), rgba(40,30,15,0.96))',
              border: '2px solid #ffd633',
              boxShadow: '0 0 40px rgba(255,214,51,0.5)',
            }}
          >
            <div className="flex justify-between items-center mb-3 sticky top-0">
              <h2 className="text-xl font-bold text-yellow-200">🎴 Colecția ta de stickere</h2>
              <button onClick={() => setStickerGallery(false)} className="text-white/70 hover:text-white">
                <X size={20} />
              </button>
            </div>
            <p className="text-yellow-100/80 text-sm mb-3">
              Descoperite: <span className="font-bold text-yellow-300">{visited.size}</span>/{TOTAL_DISCOVERABLE}
            </p>
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
              {[sunData, ...planets, ...cosmicObjects, ...characters, ...zodiacConstellations].map((obj) => {
                const found = visited.has(obj.id);
                return (
                  <div
                    key={obj.id}
                    className="rounded-xl p-2 text-center transition-all"
                    style={{
                      background: found ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.04)',
                      border: found ? `2px solid ${obj.color}` : '1px dashed rgba(255,255,255,0.2)',
                      filter: found ? 'none' : 'grayscale(1) brightness(0.4)',
                    }}
                  >
                    <div
                      className="rounded-full mx-auto mb-1"
                      style={{
                        width: '36px',
                        height: '36px',
                        background:
                          obj.gradient ||
                          `radial-gradient(circle at 30% 30%, #fff, ${obj.color})`,
                        boxShadow: found ? `0 0 8px ${obj.color}80` : 'none',
                      }}
                    />
                    <div className="text-[10px] font-semibold truncate">
                      {obj.symbol ? `${obj.symbol} ` : ''}
                      {obj.name}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Story Mode */}
      {storyMode && (
        <div
          className="fixed inset-0 z-[55] flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(8px)' }}
        >
          <div
            className="rounded-3xl p-8 text-white max-w-2xl w-full text-center"
            style={{
              background: 'linear-gradient(145deg, rgba(60,30,90,0.97), rgba(15,10,40,0.97))',
              border: '2px solid #cc88ff',
              boxShadow: '0 0 60px rgba(200,140,255,0.6)',
              animation: 'cardIn 0.6s ease-out',
            }}
          >
            <div className="text-yellow-300 text-xs uppercase tracking-wider mb-2">
              Capitolul {storyMode.index + 1}/{storyMode.total}
            </div>
            <div className="text-7xl mb-4">{storyScenes[storyMode.index]?.emoji}</div>
            <h2 className="text-2xl md:text-3xl font-bold text-purple-200 mb-3">
              {storyScenes[storyMode.index]?.title}
            </h2>
            <p className="text-base md:text-lg text-yellow-50 leading-relaxed mb-4">
              {storyScenes[storyMode.index]?.text}
            </p>
            <button
              onClick={() => {
                stopSpeech();
                setStoryMode(null);
              }}
              className="text-xs text-white/60 hover:text-white underline"
            >
              închide povestea
            </button>
          </div>
        </div>
      )}

      {/* Notificare insignă nouă */}
      {badgePopup && (
        <div
          className="fixed left-1/2 -translate-x-1/2 z-[55] pointer-events-none"
          style={{ top: '8%', animation: 'badgePop 4.5s ease-out forwards' }}
        >
          <div
            className="rounded-2xl px-6 py-4 text-white text-center shadow-2xl"
            style={{
              background: 'linear-gradient(135deg, rgba(255,200,80,0.95), rgba(255,140,40,0.95))',
              border: '3px solid #ffd633',
              minWidth: '260px',
              boxShadow: '0 0 30px rgba(255,200,80,0.7)',
            }}
          >
            <div className="text-5xl mb-1">{badgePopup.emoji}</div>
            <div className="text-xs uppercase tracking-wider opacity-90 mb-1">Insignă nouă!</div>
            <div className="text-xl font-bold">{badgePopup.name}</div>
            <div className="text-sm mt-1">{badgePopup.text}</div>
          </div>
        </div>
      )}

      {/* Modal calculator vârstă */}
      {showAgeCalc && (
        <div
          className="fixed inset-0 z-[55] flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(6px)' }}
          onClick={() => setShowAgeCalc(false)}
        >
          <div
            className="relative rounded-3xl p-6 text-white max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'linear-gradient(145deg, rgba(40,80,120,0.96), rgba(15,30,60,0.96))',
              border: '2px solid #88ffcc',
              boxShadow: '0 0 40px rgba(120,255,200,0.5)',
            }}
          >
            <button
              onClick={() => setShowAgeCalc(false)}
              className="absolute top-4 right-4 text-white/70 hover:text-white"
            >
              <X size={24} />
            </button>
            <h2 className="text-2xl font-bold text-green-200 mb-2 text-center">🎂 Vârsta mea pe planete</h2>
            <p className="text-green-100/80 text-sm text-center mb-3">
              Scrie data nașterii tale și vezi câți ani ai în alte locuri din sistemul solar!
            </p>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full px-4 py-2 rounded-xl text-white mb-4 text-center"
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.3)',
                colorScheme: 'dark',
              }}
              max={new Date().toISOString().split('T')[0]}
            />
            {(() => {
              const result = computeAges(birthDate);
              if (!result) {
                return (
                  <p className="text-center text-yellow-100/70 italic">
                    Alege o dată ca să calculăm!
                  </p>
                );
              }
              return (
                <div>
                  <div className="text-center mb-3 text-yellow-200">
                    Pe Pământ ai <span className="font-bold text-2xl">{result.earthYears}</span> ani 🌍
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    {Object.entries(result.ages).map(([name, age]) => (
                      <div
                        key={name}
                        className="bg-white/5 rounded-xl p-2 text-center"
                        style={{ border: '1px solid rgba(255,255,255,0.15)' }}
                      >
                        <div className="text-xs text-white/60">{name}</div>
                        <div className="font-bold text-yellow-200 text-sm">{age}</div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* Stea cu dorință */}
      {showWishStar && !showWishStar.caught && (
        <button
          key={showWishStar.id}
          onClick={catchWishStar}
          className="absolute cursor-pointer z-[7]"
          style={{
            top: `${showWishStar.top}%`,
            left: showWishStar.fromLeft ? '-5%' : '105%',
            background: 'transparent',
            border: 'none',
            padding: 0,
            animation: `${showWishStar.fromLeft ? 'wishStarRight' : 'wishStarLeft'} 9s linear forwards`,
          }}
          title="Apucă-mă pentru o dorință!"
        >
          <div
            style={{
              width: '60px',
              height: '4px',
              background: 'linear-gradient(90deg, transparent, #fff8a0, #ffffff)',
              borderRadius: '999px',
              boxShadow: '0 0 12px #fff8a0, 0 0 24px #ffd633',
              transform: showWishStar.fromLeft ? 'none' : 'scaleX(-1)',
              animation: 'wishStarPulse 0.6s ease-in-out infinite',
            }}
          />
          <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-xs text-yellow-200 font-bold whitespace-nowrap" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.9)' }}>
            ⭐ Apucă-mă!
          </div>
        </button>
      )}

      {/* Modal dorință după prinderea stelei */}
      {showWishStar?.caught && !wishFlying && (
        <div
          className="fixed inset-0 z-[58] flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(6px)' }}
        >
          <div
            className="rounded-3xl p-6 text-white max-w-md w-full text-center"
            style={{
              background: 'linear-gradient(145deg, rgba(80,60,140,0.96), rgba(20,15,50,0.96))',
              border: '2px solid #ffd633',
              boxShadow: '0 0 40px rgba(255,214,51,0.6)',
              animation: 'cardIn 0.5s ease-out',
            }}
          >
            <div className="text-6xl mb-2">⭐</div>
            <h2 className="text-2xl font-bold text-yellow-200 mb-2">Ai prins o stea căzătoare!</h2>
            <p className="text-yellow-100/80 mb-4">Pune-ți o dorință — stelele ascultă!</p>
            <textarea
              value={wishText}
              onChange={(e) => setWishText(e.target.value.slice(0, 200))}
              placeholder="Dorința mea este..."
              rows={3}
              className="w-full px-4 py-3 rounded-xl text-white mb-4 text-center"
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.3)',
                resize: 'none',
              }}
            />
            <div className="flex gap-2 justify-center">
              <button
                onClick={() => setShowWishStar(null)}
                className="px-4 py-2 rounded-full font-semibold"
                style={{ background: 'rgba(255,255,255,0.15)', color: '#fff' }}
              >
                Anulează
              </button>
              <button
                onClick={sendWish}
                disabled={!wishText.trim()}
                className="px-6 py-2 rounded-full font-bold disabled:opacity-50"
                style={{ background: '#ffd633', color: '#3a2a00' }}
              >
                ✨ Trimite la stele!
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Animație dorința zboară */}
      {wishFlying && (
        <div
          className="fixed inset-0 z-[59] pointer-events-none flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.6)' }}
        >
          <div className="text-center" style={{ animation: 'wishFly 2.5s ease-out forwards' }}>
            <div className="text-7xl mb-2">⭐✨💫</div>
            <p className="text-yellow-200 text-2xl font-bold">Dorința ta a zburat la stele!</p>
          </div>
        </div>
      )}

      {/* Eclipsă (umbră peste tot ecranul) */}
      {eclipseActive && (
        <div
          className="fixed inset-0 z-[8] pointer-events-none"
          style={{
            background: 'radial-gradient(circle at center, transparent 0%, transparent 22%, rgba(0,0,15,0.7) 30%, rgba(0,0,15,0.92) 100%)',
            animation: 'eclipseFade 6s ease-in-out forwards',
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="text-yellow-200 text-2xl font-bold text-center"
              style={{ textShadow: '0 0 12px rgba(255,200,80,0.9)' }}
            >
              🌑 Eclipsă! 🌑
            </div>
          </div>
        </div>
      )}

      {/* OZN ocazional */}
      {ufo && (
        <div
          key={ufo.id}
          className="absolute pointer-events-none"
          style={{
            top: `${ufo.top}%`,
            left: ufo.fromLeft ? '-15%' : 'auto',
            right: ufo.fromLeft ? 'auto' : '-15%',
            zIndex: 25,
            animation: `${ufo.fromLeft ? 'ufoFlyRight' : 'ufoFlyLeft'} 12s ease-in-out forwards`,
          }}
        >
          <div className="relative">
            <UFO size={isMobile ? 55 : 90} />
            <div
              className="absolute"
              style={{
                top: isMobile ? '-38px' : '-50px',
                [ufo.fromLeft ? 'left' : 'right']: isMobile ? '40px' : '60px',
                background: 'rgba(255,255,255,0.95)',
                color: '#222',
                padding: '6px 12px',
                borderRadius: '14px',
                fontSize: '13px',
                fontWeight: 600,
                whiteSpace: 'nowrap',
                boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
                animation: 'ufoBubble 12s ease-in-out forwards',
              }}
            >
              {ufo.msg}
              <div
                style={{
                  position: 'absolute',
                  bottom: '-6px',
                  [ufo.fromLeft ? 'left' : 'right']: '14px',
                  width: 0,
                  height: 0,
                  borderLeft: '6px solid transparent',
                  borderRight: '6px solid transparent',
                  borderTop: '8px solid rgba(255,255,255,0.95)',
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Quiz overlay */}
      {quizActive && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-40 pointer-events-auto">
          <div
            className="rounded-2xl px-6 py-4 text-white text-center shadow-2xl"
            style={{
              background: 'linear-gradient(145deg, rgba(40,30,80,0.96), rgba(20,20,50,0.96))',
              border: '2px solid rgba(255,200,80,0.7)',
              minWidth: '320px',
              maxWidth: '90vw',
            }}
          >
            <div className="text-yellow-300 text-xs uppercase tracking-wider mb-1 font-bold">
              Întrebarea {quizIndex + 1} / {quizQuestions.length} · Scor: {quizScore}
            </div>
            <div className="text-lg font-semibold mb-2">
              🎯 {quizQuestions[quizIndex].question}
            </div>
            <div className="text-sm text-yellow-100/80">
              Apasă pe planeta corectă din scenă!
            </div>
            {quizFeedback === 'correct' && (
              <div className="mt-3 text-green-300 font-bold text-lg">✅ Bravo, corect!</div>
            )}
            {quizFeedback === 'wrong' && (
              <div className="mt-3 text-orange-300 font-bold text-lg">
                ❌ Nu chiar — răspunsul era altul!
              </div>
            )}
            <button
              onClick={() => setQuizActive(false)}
              className="mt-3 text-xs text-white/60 hover:text-white underline"
            >
              ieși din quiz
            </button>
          </div>
        </div>
      )}

      {/* Confetti + felicitare la descoperirea tuturor */}
      {showConfetti && (
        <div className="fixed inset-0 z-[60] pointer-events-none flex items-center justify-center">
          {Array.from({ length: 80 }).map((_, i) => {
            const colors = ['#ffd633', '#ff6688', '#66ddff', '#88ff88', '#ff8844', '#cc88ff'];
            const left = Math.random() * 100;
            const delay = Math.random() * 2;
            const duration = 3 + Math.random() * 2;
            const size = 8 + Math.random() * 8;
            const color = colors[i % colors.length];
            const rot = Math.random() * 360;
            return (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  top: '-20px',
                  left: `${left}%`,
                  width: `${size}px`,
                  height: `${size * 1.6}px`,
                  background: color,
                  borderRadius: i % 3 === 0 ? '50%' : '2px',
                  transform: `rotate(${rot}deg)`,
                  animation: `confettiFall ${duration}s ${delay}s ease-in forwards`,
                  opacity: 0.9,
                }}
              />
            );
          })}
          <div
            className="relative text-center px-8 py-6 rounded-3xl pointer-events-auto"
            style={{
              background: 'linear-gradient(145deg, rgba(60,40,120,0.96), rgba(20,20,60,0.96))',
              border: '3px solid #ffd633',
              boxShadow: '0 0 60px rgba(255,200,80,0.6), 0 20px 60px rgba(0,0,0,0.5)',
              animation: 'cardIn 0.5s ease-out',
            }}
          >
            <div className="text-6xl mb-3">🎉🌟🎊</div>
            <h2 className="text-3xl font-bold text-yellow-300 mb-2">Bravo, eroule cosmic!</h2>
            <p className="text-white text-lg mb-4">Ai descoperit tot Sistemul Solar!</p>
            <p className="text-yellow-100 text-base mb-4">17 obiecte din 17 — știi tot universul!</p>
            <button
              onClick={() => setShowConfetti(false)}
              className="px-6 py-3 bg-yellow-400 hover:bg-yellow-300 text-purple-900 font-bold rounded-full transition-colors"
            >
              Mulțumesc! 🚀
            </button>
          </div>
        </div>
      )}

      {/* Card cu informații */}
      {selectedPlanet && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center p-2 md:p-4 pt-16 md:pt-20 pb-8 overflow-y-auto"
          style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
          onClick={closeCard}
        >
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {Array.from({ length: 26 }).map((_, i) => {
              const angle = (i / 26) * Math.PI * 2;
              const dist = 50 + Math.random() * 50;
              const wx = Math.cos(angle) * dist;
              const wy = Math.sin(angle) * dist;
              const len = 20 + Math.random() * 30;
              return (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: `${len}px`,
                    height: '2px',
                    background: 'linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.95))',
                    borderRadius: '999px',
                    transform: `rotate(${(angle * 180) / Math.PI}deg)`,
                    transformOrigin: '0 50%',
                    '--wx': `${wx}vw`,
                    '--wy': `${wy}vh`,
                    animation: 'warpStreak 0.85s ease-out forwards',
                    animationDelay: `${i * 0.012}s`,
                  }}
                />
              );
            })}
          </div>
          <div
            className="relative max-w-md w-full rounded-3xl p-5 md:p-8 text-white"
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'linear-gradient(145deg, rgba(40,40,80,0.95), rgba(20,20,50,0.95))',
              border: `2px solid ${selectedPlanet.color}`,
              boxShadow: `0 0 40px ${selectedPlanet.color}80, 0 20px 60px rgba(0,0,0,0.5)`,
              animation: 'cardIn 0.4s ease-out',
              marginTop: '60px',
              marginBottom: '20px',
            }}
          >
            <button
              onClick={closeCard}
              className="absolute top-3 right-3 text-white bg-black/50 hover:bg-black/70 rounded-full p-2 transition-colors z-20"
              style={{ minWidth: '40px', minHeight: '40px' }}
              title="Închide"
            >
              <X size={24} />
            </button>
            {selectedPlanet.id && !selectedPlanet.isCustom && selectedPlanet.id !== 'quiz-result' && (
              <button
                onClick={() => {
                  const shareUrl = `${window.location.origin}${window.location.pathname}?planet=${selectedPlanet.id}`;
                  if (navigator.clipboard) {
                    navigator.clipboard.writeText(shareUrl);
                  }
                  alert(`Link copiat! 🔗\n${shareUrl}\n\nTrimite-l prietenilor pe WhatsApp!`);
                }}
                className="absolute top-3 left-3 text-white text-xs px-3 py-2 rounded-full z-20"
                style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.3)' }}
                title="Copiază link spre acest obiect"
              >
                🔗 Trimite
              </button>
            )}

            <div className="flex justify-center -mt-20 mb-2 pointer-events-none">
              {selectedPlanet.isZodiac ? (
                <div
                  style={{
                    width: '160px',
                    height: '160px',
                    borderRadius: '50%',
                    background: `radial-gradient(circle at 50% 50%, ${selectedPlanet.color}40, transparent 70%)`,
                    boxShadow: `0 0 30px ${selectedPlanet.color}60, 0 8px 20px rgba(0,0,0,0.5)`,
                    border: `2px solid ${selectedPlanet.color}`,
                    animation: 'buddyWave 2.4s ease-in-out infinite',
                    position: 'relative',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: '8px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      fontSize: '40px',
                      lineHeight: 1,
                      color: selectedPlanet.color,
                      filter: `drop-shadow(0 0 6px ${selectedPlanet.color})`,
                    }}
                  >
                    {selectedPlanet.symbol}
                  </div>
                  <svg
                    viewBox="0 0 80 80"
                    width="120"
                    height="120"
                    style={{ position: 'absolute', top: '40px', left: '20px', overflow: 'visible' }}
                  >
                    {selectedPlanet.lines?.map(([a, b], i) => (
                      <line
                        key={i}
                        x1={selectedPlanet.stars[a][0]}
                        y1={selectedPlanet.stars[a][1]}
                        x2={selectedPlanet.stars[b][0]}
                        y2={selectedPlanet.stars[b][1]}
                        stroke={selectedPlanet.color}
                        strokeWidth="0.8"
                        opacity="0.6"
                        strokeLinecap="round"
                      />
                    ))}
                    {selectedPlanet.stars?.map(([x, y], i) => (
                      <circle key={i} cx={x} cy={y} r="2" fill="#fff" style={{ filter: `drop-shadow(0 0 3px ${selectedPlanet.color})` }} />
                    ))}
                  </svg>
                </div>
              ) : selectedPlanet.isCustom ? (
                <img
                  src={selectedPlanet.image}
                  alt={selectedPlanet.name}
                  style={{
                    width: '130px',
                    height: '130px',
                    borderRadius: '50%',
                    boxShadow: '0 0 30px rgba(255,214,51,0.7), 0 8px 20px rgba(0,0,0,0.5)',
                    animation: 'buddyWave 2.4s ease-in-out infinite',
                  }}
                />
              ) : selectedPlanet.iconType === 'snake' ? (
                <div style={{ animation: 'buddyWave 2.4s ease-in-out infinite', transformOrigin: 'center' }}>
                  <SnakeAstronaut size={170} />
                </div>
              ) : selectedPlanet.iconType === 'penguin' ? (
                <div style={{ animation: 'buddyWave 2.4s ease-in-out infinite' }}>
                  <PenguinAstronaut size={140} />
                </div>
              ) : selectedPlanet.iconType === 'rocket' ? (
                <div style={{ animation: 'buddyWave 2.4s ease-in-out infinite' }}>
                  <Rocket size={120} />
                </div>
              ) : (
                <SpaceBuddy color={selectedPlanet.color} size={120} />
              )}
            </div>

            <div className="flex items-center gap-3 mb-4 justify-center">
              <div
                className="rounded-full flex-shrink-0"
                style={{
                  width: '40px',
                  height: '40px',
                  background: selectedPlanet.gradient || `radial-gradient(circle at 30% 30%, #fff4a0, ${selectedPlanet.color})`,
                  boxShadow: `0 0 20px ${selectedPlanet.color}80`,
                }}
              />
              <h2 className="text-3xl font-bold" style={{ color: selectedPlanet.color }}>
                {selectedPlanet.name}
              </h2>
            </div>

            <p className="text-lg mb-4 leading-relaxed text-yellow-50">
              {selectedPlanet.description}
            </p>

            <div
              className="rounded-2xl p-4 mb-3 flex items-start gap-3"
              style={{ background: `${selectedPlanet.color}20`, border: `1px solid ${selectedPlanet.color}40` }}
            >
              <Sparkles size={20} className="flex-shrink-0 mt-1" style={{ color: selectedPlanet.color }} />
              <p className="text-base font-medium">{selectedPlanet.fact}</p>
            </div>

            {Array.isArray(selectedPlanet.jokes) && selectedPlanet.jokes.length > 0 && (
              <div
                className="rounded-2xl p-4 mb-4"
                style={{
                  background: 'rgba(255, 220, 100, 0.12)',
                  border: '1px solid rgba(255, 220, 100, 0.35)',
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Smile size={20} style={{ color: '#ffd966' }} />
                  <div className="text-xs uppercase tracking-wider font-bold" style={{ color: '#ffd966' }}>
                    Trei glume să râdem 😄😄😄
                  </div>
                </div>
                <ol className="space-y-2 list-none">
                  {selectedPlanet.jokes.map((j, idx) => (
                    <li key={idx} className="flex gap-2 text-base font-medium leading-relaxed">
                      <span
                        className="flex-shrink-0 inline-flex items-center justify-center font-bold text-sm rounded-full"
                        style={{
                          width: '22px',
                          height: '22px',
                          background: '#ffd966',
                          color: '#3a2a00',
                          marginTop: '2px',
                        }}
                      >
                        {idx + 1}
                      </span>
                      <span>{j}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-white/5 rounded-xl p-3">
                <div className="text-white/60 text-xs mb-1">Mărime</div>
                <div className="font-semibold">{selectedPlanet.diameter}</div>
              </div>
              <div className="bg-white/5 rounded-xl p-3">
                <div className="text-white/60 text-xs mb-1">Un an durează</div>
                <div className="font-semibold">{selectedPlanet.year}</div>
              </div>
              <div className="bg-white/5 rounded-xl p-3 col-span-2">
                <div className="text-white/60 text-xs mb-1">Luni (sateliți)</div>
                <div className="font-semibold">{selectedPlanet.moons}</div>
              </div>
            </div>
            {selectedPlanet.isCustom ? (
              <div className="mt-5 grid grid-cols-2 gap-2">
                <button
                  onClick={() => deleteCustomPlanet(selectedPlanet.id)}
                  className="py-3 rounded-2xl font-bold text-base"
                  style={{
                    background: 'rgba(255,80,80,0.25)',
                    border: '2px solid rgba(255,80,80,0.7)',
                    color: '#fff',
                  }}
                >
                  🗑️ Șterge
                </button>
                <button
                  onClick={closeCard}
                  className="py-3 rounded-2xl font-bold text-base"
                  style={{
                    background: `${selectedPlanet.color}40`,
                    border: `2px solid ${selectedPlanet.color}`,
                    color: '#fff',
                  }}
                >
                  ✕ Închide
                </button>
              </div>
            ) : (
              <button
                onClick={closeCard}
                className="mt-5 w-full py-3 rounded-2xl font-bold text-base transition-all"
                style={{
                  background: `${selectedPlanet.color}40`,
                  border: `2px solid ${selectedPlanet.color}`,
                  color: '#fff',
                }}
              >
                ✕ Închide
              </button>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes orbit {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        @keyframes sunPulse {
          0%, 100% { filter: drop-shadow(0 0 30px rgba(255,180,50,0.8)) drop-shadow(0 0 60px rgba(255,140,0,0.5)); }
          50%      { filter: drop-shadow(0 0 45px rgba(255,200,80,0.95)) drop-shadow(0 0 90px rgba(255,160,20,0.7)); }
        }
        @keyframes sunCorona {
          0%, 100% { transform: scale(1); opacity: 0.85; }
          50%      { transform: scale(1.08); opacity: 1; }
        }
        @keyframes cardIn {
          0%   { opacity: 0; transform: scale(0.3) rotate(-8deg); }
          60%  { opacity: 1; transform: scale(1.06) rotate(2deg); }
          80%  { transform: scale(0.98) rotate(-1deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        @keyframes warpStreak {
          0%   { transform: translate(0,0) scale(0); opacity: 0; }
          15%  { opacity: 0.95; }
          100% { transform: translate(var(--wx), var(--wy)) scale(1.2); opacity: 0; }
        }
        @keyframes cometFly {
          0%   { transform: translate(0, 0) rotate(var(--rot)); opacity: 0; }
          5%   { opacity: 0.9; }
          90%  { opacity: 0.9; }
          100% { transform: translate(var(--dx), var(--dy)) rotate(var(--rot)); opacity: 0; }
        }
        @keyframes blackHoleSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes bhDiskSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes bhFilamentSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes galaxySpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes buddyWave {
          0%, 100% { transform: translateY(0) rotate(-3deg); }
          50%      { transform: translateY(-6px) rotate(3deg); }
        }
        @keyframes earthSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes auroraGlow {
          0%, 100% { opacity: 0.5; }
          50%      { opacity: 1; }
        }
        @keyframes ufoFlyRight {
          0%   { transform: translateX(0) translateY(0); }
          15%  { transform: translateX(20vw) translateY(-15px); }
          50%  { transform: translateX(60vw) translateY(15px); }
          85%  { transform: translateX(95vw) translateY(-10px); }
          100% { transform: translateX(125vw) translateY(0); }
        }
        @keyframes ufoFlyLeft {
          0%   { transform: translateX(0) translateY(0); }
          15%  { transform: translateX(-20vw) translateY(-15px); }
          50%  { transform: translateX(-60vw) translateY(15px); }
          85%  { transform: translateX(-95vw) translateY(-10px); }
          100% { transform: translateX(-125vw) translateY(0); }
        }
        @keyframes ufoBubble {
          0%, 8% { opacity: 0; transform: scale(0.7); }
          15%    { opacity: 1; transform: scale(1.05); }
          20%, 80% { opacity: 1; transform: scale(1); }
          92%    { opacity: 0; transform: scale(0.7); }
          100%   { opacity: 0; transform: scale(0.7); }
        }
        @keyframes badgePop {
          0%   { opacity: 0; transform: translate(-50%, -30px) scale(0.5); }
          15%  { opacity: 1; transform: translate(-50%, 0) scale(1.08); }
          25%  { transform: translate(-50%, 0) scale(1); }
          85%  { opacity: 1; transform: translate(-50%, 0) scale(1); }
          100% { opacity: 0; transform: translate(-50%, -20px) scale(0.95); }
        }
        @keyframes wishStarRight {
          0%   { transform: translate(0, 0); opacity: 0; }
          5%   { opacity: 1; }
          95%  { opacity: 1; }
          100% { transform: translate(115vw, 35vh); opacity: 0; }
        }
        @keyframes wishStarLeft {
          0%   { transform: translate(0, 0); opacity: 0; }
          5%   { opacity: 1; }
          95%  { opacity: 1; }
          100% { transform: translate(-115vw, 35vh); opacity: 0; }
        }
        @keyframes wishStarPulse {
          0%, 100% { filter: brightness(1); }
          50%      { filter: brightness(1.4); }
        }
        @keyframes wishFly {
          0%   { opacity: 1; transform: translateY(0) scale(1); }
          50%  { opacity: 1; transform: translateY(-20vh) scale(1.2); }
          100% { opacity: 0; transform: translateY(-100vh) scale(0.3); }
        }
        @keyframes eclipseFade {
          0%   { opacity: 0; }
          15%  { opacity: 1; }
          80%  { opacity: 1; }
          100% { opacity: 0; }
        }
        @keyframes drawerUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        @keyframes confettiFall {
          0% {
            transform: translateY(-50px) rotate(0deg);
            opacity: 0;
          }
          10% { opacity: 0.95; }
          90% { opacity: 0.95; }
          100% {
            transform: translateY(110vh) rotate(720deg);
            opacity: 0;
          }
        }
        @keyframes snakeSlither {
          0%   { transform: translateX(0) translateY(0); }
          25%  { transform: translateX(40vw) translateY(-30px); }
          50%  { transform: translateX(70vw) translateY(20px); }
          75%  { transform: translateX(95vw) translateY(-15px); }
          100% { transform: translateX(120vw) translateY(0); }
        }
        @keyframes penguinFloat {
          0%, 100% { transform: translateY(0) rotate(-5deg); }
          25%      { transform: translateY(-20px) rotate(3deg); }
          50%      { transform: translateY(-10px) rotate(7deg); }
          75%      { transform: translateY(-25px) rotate(-2deg); }
        }
        @keyframes rocketFlight {
          0%   { transform: translate(0, 0) rotate(0deg); opacity: 0; }
          5%   { opacity: 1; }
          50%  { transform: translate(60vw, -40vh) rotate(0deg); opacity: 1; }
          95%  { opacity: 1; }
          100% { transform: translate(120vw, -80vh) rotate(0deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
