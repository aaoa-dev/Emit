# Emit

**They Fly. Earth Burns.**

🌐 **Live Demo**: [https://aaoa-dev.github.io/Emit/](https://aaoa-dev.github.io/Emit/)

An Environmental Accountability Calculator that exposes the staggering carbon inequality between billionaires' private jet habits and everyday people's carbon footprints.

## What It Does

Emit compares your annual carbon footprint to the private jet emissions of the world's most prolific flyers. The results are sobering: most people would need to live **decades or even centuries** (at their current habits) to match what a billionaire emits in a single year — just from their jets.

### Featured Billionaires (Verified Data from ClimateJets.org)

| Rank | Name | Annual Jet CO₂ | Flights/Year | Data Year | Notable Fact |
|------|------|---------------|--------------|-----------|--------------|
| **#1** | **Thomas Siebel** | ~4,650 tonnes | 458 | 2022 | 350,000+ miles — 1,162× global average |
| **#2** | **Murdoch Family** | ~4,357 tonnes | 320 | 2022 | 474,000 miles across 4 aircraft |
| **#3** | **DeVos Family** | ~4,037 tonnes | 597 | 2022 | Average flight: 44 minutes |
| **#5** | **Bill Gates** | ~3,059 tonnes | 393 | 2022 | Climate book author, 328,800 miles flown |
| **#7** | **Elon Musk** | ~1,700 tonnes | 190 | 2022 | 441 flights in 2023; 9-min flight |
| — | **Taylor Swift** | ~742 tonnes | 97 | 2023 | For comparison — 10× less than #1 |

**Note**: These are the actual top emitters tracked by [ClimateJets.org](https://climatejets.org). The richest 1% are responsible for as much carbon as the bottom 66% combined (Oxfam 2023).

## How It Works

1. **Pick a billionaire** (or enter custom data) — defaults to the #1 emitter
2. **Enter your footprint**: flights, driving, yacht days, diet, home energy
3. **Calculate** to see how many years you'd need to live (at your current habits) to match their one year of jets

The calculator uses established carbon emission factors:
- Private jet: ~2.0 kg CO₂/km
- Commercial short-haul: ~0.255 tonnes per flight
- Commercial long-haul: ~1.5 tonnes per flight
- Car driving: ~0.21 kg CO₂/km
- Global average footprint: 4 tonnes CO₂/year

## Design Features

### Mechanical Split-Flap Display
The top ticker is a fully functional mechanical split-flap departure board that:
- Shows one message at a time, centered
- Flips each character individually with staggered animation
- Clears to blank (red transition) before showing next message
- Features synthesized mechanical click sounds
- Mutes/unmutes via `[SND]` / `[OFF]` button in header

### Cockpit Aesthetic
The UI is designed to look like an aircraft cockpit display:
- Dark theme with amber/orange accents
- Bracketed labels for all actions: `[A/C]`, `[VEH]`, `[SEA]`, `[+]` , `[-]`, `[SND]`
- Custom number inputs with vertical ± controls
- CRT-style scanline overlay with subtle animations
- Monospace typography throughout

### Responsive Design
- Desktop: Full split-flap display with desktop messages
- Mobile: Compact messages, adapted layout
- Touch-friendly controls
- Sound requires user interaction (browser policy)

## Project Structure

```
Emit/
├── index.html      # Main application
├── css/
│   └── styles.css  # Cockpit styling, animations, responsive
└── js/
    └── app.js      # Logic, calculations, split-flap animation, sound synthesis
```

## Data Sources

- **[ClimateJets.org](https://climatejets.org)**: Comprehensive 2022 flight tracking data founded by Akash Shendure
- **ADSB Exchange**: Real-time aircraft transponder data
- **Business Insider, The Guardian, Fortune**: Investigative reporting
- **IPCC/EPA**: Standard carbon calculation methodology
- **Oxfam 2023**: Wealth-based carbon inequality statistics

**Important**: Figures represent specific tracked years (2022–2023) and may not reflect current emissions.

## Technical Notes

- **Sound**: Generated via Web Audio API (synthesized sawtooth wave), no external files
- **Animations**: CSS 3D transforms for split-flap effect
- **No cookies/tracking**: All calculations happen client-side

## The Message

> Individual action matters — but systemic change matters more. The richest 1% are responsible for as much carbon as the bottom 66% combined.

This tool is designed for **education and awareness**, not shaming individuals for their unavoidable emissions. The goal is to highlight the gross disparity in carbon responsibility and advocate for systemic solutions.

## License

See [LICENSE](LICENSE)
