const BILLIONAIRES = [
  {
    id: 'siebel',
    emoji: '[SBL]',
    name: 'Thomas Siebel',
    jetName: 'Fleet incl. Gulfstream G650',
    tonnes: 4650,
    flights: 458,
    avgFlightMin: 76,
    shameFact: 'The #1 private jet polluter of 2022. The Siebel Systems founder burned 4,650 tonnes of CO₂ from 458 flights covering 350,000+ miles. That\'s nearly 1,162 times the global average person\'s annual footprint — from jets alone.',
    dataYear: '2022',
  },
  {
    id: 'murdoch',
    emoji: '[FOX]',
    name: 'Murdoch Family',
    jetName: '4 aircraft fleet',
    tonnes: 4357,
    flights: 320,
    avgFlightMin: 91,
    shameFact: 'The media dynasty (Fox/News Corp) emitted 4,357 tonnes from 474,000 miles flown across 4 aircraft in 2022. While their outlets question climate science, their jets burned enough fuel to exceed 1,089 average Americans\' annual carbon footprints.',
    dataYear: '2022',
  },
  {
    id: 'devos',
    emoji: '[AMW]',
    name: 'DeVos Family',
    jetName: 'Fleet of private aircraft',
    tonnes: 4037,
    flights: 597,
    avgFlightMin: 44,
    shameFact: 'The Amway fortune heirs took 597 flights in 2022, emitting 4,037 tonnes of CO₂ from 443,000 miles of jet travel. Their average flight was just 44 minutes — countless short hops that could have been drives.',
    dataYear: '2022',
  },
  {
    id: 'gates',
    emoji: '[MSF]',
    name: 'Bill Gates',
    jetName: 'Multiple private jets',
    tonnes: 3059,
    flights: 393,
    avgFlightMin: 50,
    shameFact: 'The climate advocate and "How to Avoid a Climate Disaster" author emitted 3,059 tonnes from 393 flights in 2022 — 765 times the global average footprint. His jets flew 328,800 miles while he preached reducing carbon footprints.',
    dataYear: '2022',
  },
  {
    id: 'musk',
    emoji: '[SPX]',
    name: 'Elon Musk',
    jetName: 'Gulfstream G700 + fleet',
    tonnes: 1700,
    flights: 190,
    avgFlightMin: 110,
    shameFact: 'The world\'s richest man burned ~1,700 tonnes of CO₂ in 2022 from 190 flights. By 2023, he ramped up to 441 flights (1,161 hours). He once flew from San Jose to San Francisco — a 45-minute drive — for a 9-minute flight. He tweets about saving humanity while his jets criss-cross the globe.',
    dataYear: '2022',
  },
  {
    id: 'swift',
    emoji: '[MIC]',
    name: 'Taylor Swift',
    jetName: 'Dassault Falcon 7X',
    tonnes: 742,
    flights: 97,
    avgFlightMin: 133,
    shameFact: 'In 2023, Swift\'s jet took 97 flights consuming 77,000+ gallons of fuel — 742 tonnes of CO₂. Her representatives claim she loans the jet to others and has purchased carbon credits. Her jet is regularly used for tour logistics and personal travel between Nashville, LA, and New York.',
    dataYear: '2023',
  },
];

const GLOBAL_AVG = 4; // tonnes CO₂ per year global average

let selectedId = null;
let selectedTonnes = 0;
let selectedName = '';

function updateYachtLabel() {
  const sel = document.getElementById('act_yacht_size');
  const rate = parseFloat(sel.value);
  const labels = { 3: 'CHARTER / DAY YACHT · ~3 TONNES / DAY', 7: 'LARGE PRIVATE YACHT · ~7 TONNES / DAY', 20: 'SUPERYACHT 80-120M · ~20 TONNES / DAY + IDLE FUEL', 30: 'GIGAYACHT 120M+ · ~30 TONNES / DAY · BEZOS TIER' };
  document.getElementById('yacht_sub').textContent = labels[rate] || '~7 TONNES / DAY';
}

function init() {
  const grid = document.getElementById('bGrid');
  BILLIONAIRES.forEach(b => {
    const card = document.createElement('div');
    card.className = 'bcard';
    card.id = 'bcard_' + b.id;
    card.innerHTML = `<span class="bcard-emoji">${b.emoji}</span><div class="bcard-name">${b.name}</div><div class="bcard-jets">${b.jetName}</div>`;
    card.onclick = () => selectBillionaire(b.id);
    grid.appendChild(card);
  });
}

function selectBillionaire(id) {
  document.querySelectorAll('.bcard').forEach(c => c.classList.remove('active'));
  document.getElementById('bcard_' + id).classList.add('active');

  const b = BILLIONAIRES.find(x => x.id === id);
  selectedId = id;
  selectedTonnes = b.tonnes;
  selectedName = b.name;

  // Clear custom
  document.getElementById('customName').value = '';
  document.getElementById('customTonnes').value = '';

  showBStats(b);
}

function showBStats(b) {
  const el = document.getElementById('bStats');
  el.classList.add('visible');
  document.getElementById('bStatsName').textContent = b.name.toUpperCase();
  document.getElementById('bShameFact').textContent = b.shameFact;

  const mult = (b.tonnes / GLOBAL_AVG).toFixed(0);
  const perFlight = (b.tonnes / b.flights).toFixed(1);

  document.getElementById('bStatsRow').innerHTML = `
    <div class="stat-item">
      <div class="stat-val">${b.tonnes.toLocaleString()}</div>
      <div class="stat-unit">Tonnes CO₂ / year</div>
    </div>
    <div class="stat-item">
      <div class="stat-val">${b.flights}</div>
      <div class="stat-unit">Flights / year</div>
    </div>
    <div class="stat-item">
      <div class="stat-val">${mult}×</div>
      <div class="stat-unit">The global average</div>
    </div>
    <div class="stat-item">
      <div class="stat-val">${perFlight}</div>
      <div class="stat-unit">Tonnes per flight</div>
    </div>
  `;
}

// Custom inputs
document.getElementById('customName').addEventListener('input', () => {
  const name = document.getElementById('customName').value.trim();
  const tonnes = parseFloat(document.getElementById('customTonnes').value) || 0;
  if (name) {
    selectedId = 'custom';
    selectedName = name;
    selectedTonnes = tonnes;
    document.querySelectorAll('.bcard').forEach(c => c.classList.remove('active'));
    if (tonnes > 0) {
      const b = {
        name,
        tonnes,
        flights: Math.round(tonnes / 12),
        shameFact: `Custom entry: ${name} emits an estimated ${tonnes.toLocaleString()} tonnes of CO₂ per year from private aviation.`,
      };
      showBStats(b);
    }
  }
});

document.getElementById('customTonnes').addEventListener('input', () => {
  document.getElementById('customName').dispatchEvent(new Event('input'));
});

function getUserTonnes() {
  const sh = parseFloat(document.getElementById('act_shorthaul').value) || 0;
  const lh = parseFloat(document.getElementById('act_longhaul').value) || 0;
  const km = parseFloat(document.getElementById('act_driving').value) || 0;
  const yachtDays = parseFloat(document.getElementById('act_yacht').value) || 0;
  const yachtRate = parseFloat(document.getElementById('act_yacht_size').value) || 7;
  const supportVessel = document.getElementById('act_support_vessel').checked ? 1.4 : 1.0;
  const diet = parseFloat(document.getElementById('act_diet').value) || 0;
  const home = parseFloat(document.getElementById('act_home').value) || 0;

  const yachtTotal = yachtDays * yachtRate * supportVessel;

  return {
    flights: sh * 0.255 + lh * 1.5,
    driving: km * 0.00021,
    yacht: yachtTotal,
    diet,
    home,
    total: sh * 0.255 + lh * 1.5 + km * 0.00021 + yachtTotal + diet + home,
  };
}

function calculate() {
  if (!selectedTonnes && !document.getElementById('customTonnes').value) {
    // Use first billionaire as default if none selected (Thomas Siebel, #1 emitter)
    if (!selectedId) {
      selectBillionaire('siebel');
    }
  }

  if (selectedId === 'custom') {
    selectedTonnes = parseFloat(document.getElementById('customTonnes').value) || 0;
    selectedName = document.getElementById('customName').value.trim() || 'Unknown';
  }

  if (!selectedTonnes) {
    alert('Please pick a billionaire or enter custom data first.');
    return;
  }

  const user = getUserTonnes();
  const theirTonnes = selectedTonnes;
  const yourTonnes = Math.max(user.total, 0.1);

  const years = theirTonnes / yourTonnes;
  const mult = theirTonnes / GLOBAL_AVG;
  const perFlight = theirTonnes / (BILLIONAIRES.find(b => b.id === selectedId)?.flights || Math.round(theirTonnes/12));
  const yourVsAvg = yourTonnes / GLOBAL_AVG;
  const yourVsTheirs = ((yourTonnes / theirTonnes) * 100).toFixed(1);

  // Populate results
  document.getElementById('verdictYears').textContent = years >= 100 ? years.toFixed(0) : years.toFixed(1);
  document.getElementById('verdictSentence').innerHTML = `
    You would need to live <strong>${years.toFixed(1)} years</strong> (at your current habits) to emit as much CO₂ as
    <strong>${selectedName}</strong> does in a single year — just from their private jet.
  `;

  document.getElementById('resTheirName').textContent = selectedName.toUpperCase();
  document.getElementById('resTheirTonnes').textContent = theirTonnes.toLocaleString();
  document.getElementById('resTheirMult').textContent = mult.toFixed(0) + '×';
  document.getElementById('resTheirPerFlight').textContent = perFlight.toFixed(1) + 't';

  document.getElementById('resYourTonnes').textContent = yourTonnes.toFixed(1);
  document.getElementById('resYourVsAvg').textContent = (yourVsAvg >= 1 ? '+' : '') + ((yourVsAvg - 1) * 100).toFixed(0) + '%';
  document.getElementById('resYourVsTheirs').textContent = yourVsTheirs + '%';

  // Bar
  const barPct = Math.min((yourTonnes / theirTonnes) * 100, 98);
  document.getElementById('barYours').style.width = Math.max(barPct, 2) + '%';
  document.getElementById('barYoursLabel').textContent = 'YOUR ' + yourTonnes.toFixed(1) + 'T';

  // Equivalents
  const avgPersonYears = theirTonnes / GLOBAL_AVG;
  const commercialFlights = (theirTonnes / 0.255).toFixed(0);
  const carKm = (theirTonnes / 0.00021 / 1000).toFixed(0);
  const treesNeeded = (theirTonnes * 45.5).toFixed(0);
  const coalBurned = (theirTonnes / 2.42).toFixed(1);

  document.getElementById('equivGrid').innerHTML = `
    <div class="equiv-card">
      <span class="equiv-icon">👤</span>
      <div class="equiv-num">${avgPersonYears.toFixed(0)}</div>
      <div class="equiv-desc">Years of the average human's entire carbon footprint</div>
    </div>
    <div class="equiv-card">
      <span class="equiv-icon">🌍</span>
      <div class="equiv-num">${commercialFlights}</div>
      <div class="equiv-desc">Economy class short-haul commercial flights</div>
    </div>
    <div class="equiv-card">
      <span class="equiv-icon">🚗</span>
      <div class="equiv-num">${parseInt(carKm).toLocaleString()}k</div>
      <div class="equiv-desc">Kilometres driven in an average petrol car</div>
    </div>
    <div class="equiv-card">
      <span class="equiv-icon">🌲</span>
      <div class="equiv-num">${parseInt(treesNeeded).toLocaleString()}</div>
      <div class="equiv-desc">Trees needed to absorb these emissions in one year</div>
    </div>
    <div class="equiv-card">
      <span class="equiv-icon">⛏️</span>
      <div class="equiv-num">${coalBurned}t</div>
      <div class="equiv-desc">Tonnes of coal that produce the same CO₂</div>
    </div>
    <div class="equiv-card">
      <span class="equiv-icon">🧍</span>
      <div class="equiv-num">${years.toFixed(1)}</div>
      <div class="equiv-desc">Years you'd need to live (at your rate) to match their jets</div>
    </div>
  `;

  // Grade
  const gradeEl = document.getElementById('gradeDisplay');
  const gradeDesc = document.getElementById('gradeDesc');

  if (years < 2) {
    gradeEl.textContent = 'F';
    gradeEl.style.color = '#888';
    gradeDesc.textContent = 'Your footprint is surprisingly comparable. Maybe reconsider your yacht days.';
  } else if (years < 10) {
    gradeEl.textContent = 'D';
    gradeEl.style.color = '#cc8800';
    gradeDesc.textContent = 'You\'re doing more damage than average. But still nowhere near their stratospheric excess.';
  } else if (years < 30) {
    gradeEl.textContent = 'C';
    gradeEl.style.color = '#dd6600';
    gradeDesc.textContent = 'Average human footprint. The system is broken, not just you.';
  } else if (years < 100) {
    gradeEl.textContent = 'B';
    gradeEl.style.color = '#44aa44';
    gradeDesc.textContent = 'You\'re doing better than most. But the person you selected is doing catastrophically worse.';
  } else {
    gradeEl.textContent = 'A';
    gradeEl.style.color = '#00cc66';
    gradeDesc.textContent = 'You are living a remarkably low-impact life. And yet one billionaire undoes it all — thousands of times over — before breakfast.';
  }

  document.getElementById('results').classList.add('visible');
  setTimeout(() => {
    document.getElementById('results').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);
}

function reset() {
  document.getElementById('results').classList.remove('visible');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* Split-flap display - Mechanical departure board */
const SPLIT_FLAP_MESSAGES_DESKTOP = [
  "THOMAS SIEBEL: 4,650 TONNES CO2 (458 FLIGHTS) #1",
  "MURDOCH FAMILY: 4,357 TONNES CO2 (FOX/NEWS CORP)",
  "DEVOS FAMILY: 4,037 TONNES CO2 (597 FLIGHTS) #3",
  "BILL GATES: 3,059 TONNES CO2 (393 FLIGHTS) 2022",
  "ELON MUSK: 1,700 TONNES CO2 (190 FLIGHTS) 2022",
  "TAYLOR SWIFT: 742 TONNES CO2 (97 FLIGHTS) 2023",
  "ONE PRIVATE JET FLIGHT = 75X COMMERCIAL",
  "RICHEST 1% EMIT SAME CARBON AS BOTTOM 66%",
  "GLOBAL AVERAGE ANNUAL FOOTPRINT: 4 TONNES",
  "MUSK FLEW 9 MINS (SAN JOSE TO SAN FRANCISCO)"
];

const SPLIT_FLAP_MESSAGES_MOBILE = [
  "SIEBEL: 4,650 TONNES CO2 #1",
  "MURDOCH: 4,357 TONNES CO2",
  "DEVOS: 4,037 TONNES CO2",
  "GATES: 3,059 TONNES CO2",
  "MUSK: 1,700 TONNES CO2",
  "SWIFT: 742 TONNES CO2",
  "1 JET FLIGHT = 75X COMMERCIAL",
  "RICHEST 1% = BOTTOM 66% CO2",
  "GLOBAL AVERAGE: 4 TONNES/YR",
  "MUSK FLEW 9 MINUTES"
];

let SPLIT_FLAP_MESSAGES = SPLIT_FLAP_MESSAGES_DESKTOP;
let SPLIT_FLAP_MAX_LENGTH = Math.max(...SPLIT_FLAP_MESSAGES.map(m => m.length));
let currentSplitFlapIndex = 0;
let splitFlapInterval = null;

function isMobile() {
  return window.innerWidth <= 768;
}

function initSplitFlap() {
  const container = document.getElementById('splitFlap');
  if (!container) return;

  // Choose message set based on screen size
  SPLIT_FLAP_MESSAGES = isMobile() ? SPLIT_FLAP_MESSAGES_MOBILE : SPLIT_FLAP_MESSAGES_DESKTOP;
  SPLIT_FLAP_MAX_LENGTH = Math.max(...SPLIT_FLAP_MESSAGES.map(m => m.length));

  // Clear existing slots
  container.innerHTML = '';

  // Create empty character slots
  for (let i = 0; i < SPLIT_FLAP_MAX_LENGTH; i++) {
    const charSlot = document.createElement('div');
    charSlot.className = 'split-flap-char space';
    charSlot.dataset.index = i;
    charSlot.textContent = ' ';
    container.appendChild(charSlot);
  }

  // Show first message with transition
  currentSplitFlapIndex = 0;
  transitionToMessage(SPLIT_FLAP_MESSAGES[0]);

  // Clear any existing interval
  if (splitFlapInterval) clearInterval(splitFlapInterval);

  // Start rotation (8 seconds between messages for better pacing)
  splitFlapInterval = setInterval(rotateSplitFlap, 8000);
}

// Web Audio API for mechanical click sounds - using sawtooth with sharp cutoff
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
let isMuted = false;

function toggleMute() {
  isMuted = !isMuted;
  return isMuted;
}

function adjustValue(inputId, delta) {
  const input = document.getElementById(inputId);
  if (!input) return;

  const current = parseFloat(input.value) || 0;
  const min = parseFloat(input.min) || 0;
  const max = parseFloat(input.max) || Infinity;
  const step = parseFloat(input.step) || 1;

  let newValue = current + delta;

  // Round to step precision
  if (step !== 1) {
    newValue = Math.round(newValue / step) * step;
  }

  // Clamp to min/max
  newValue = Math.max(min, Math.min(max, newValue));

  input.value = newValue;

  // Trigger change event for any listeners
  input.dispatchEvent(new Event('input', { bubbles: true }));

  // Update yacht label if yacht input changed
  if (inputId === 'act_yacht') {
    updateYachtLabel();
  }
}

function toggleMuteBtn() {
  const muted = toggleMute();
  const btn = document.getElementById('muteBtn');
  const label = document.getElementById('muteLabel');

  if (muted) {
    label.textContent = '[OFF]';
    btn.classList.add('muted');
    btn.title = 'Unmute sound';
  } else {
    label.textContent = '[SND]';
    btn.classList.remove('muted');
    btn.title = 'Mute sound';

    // Resume audio context if needed
    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }
  }
}

function playMechanicalClick(intensity = 1) {
  if (isMuted) return;
  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }

  const t = audioContext.currentTime;

  const osc = audioContext.createOscillator();
  const filter = audioContext.createBiquadFilter();
  const gain = audioContext.createGain();

  // Sawtooth has more harmonic content for "bite"
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(1500, t);
  osc.frequency.linearRampToValueAtTime(800, t + 0.005);

  // Highpass to remove sub-bass mud
  filter.type = 'highpass';
  filter.frequency.setValueAtTime(1000, t);

  // Snappy percussive envelope
  gain.gain.setValueAtTime(0, t);
  gain.gain.linearRampToValueAtTime(0.025 * intensity, t + 0.0002);
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.012);

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(audioContext.destination);

  osc.start(t);
  osc.stop(t + 0.015);
}

function playFlapSound(count = 1) {
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      playMechanicalClick(0.8 + Math.random() * 0.4);
    }, i * 15);
  }
}

function rotateSplitFlap() {
  currentSplitFlapIndex = (currentSplitFlapIndex + 1) % SPLIT_FLAP_MESSAGES.length;
  transitionToMessage(SPLIT_FLAP_MESSAGES[currentSplitFlapIndex]);
}

function updateSplitFlap(message, isClearingPhase = false) {
  const container = document.getElementById('splitFlap');
  if (!container) return;

  const chars = container.querySelectorAll('.split-flap-char');

  if (isClearingPhase) {
    // Phase 1: Clear all characters to blank (red transition state)
    chars.forEach((charSlot, index) => {
      setTimeout(() => {
        charSlot.classList.add('flipping', 'clearing');
        charSlot.textContent = ' ';
        charSlot.classList.add('space');

        // Play mechanical click sound (every 3rd character to avoid too much noise)
        if (index % 3 === 0) {
          playMechanicalClick(0.6);
        }

        setTimeout(() => {
          charSlot.classList.remove('flipping');
        }, 150);
      }, index * 25);
    });
    return;
  }

  // Phase 2: Show the actual message
  // Center the message by adding left padding
  const messageLength = message.length;
  const leftPadding = Math.floor((SPLIT_FLAP_MAX_LENGTH - messageLength) / 2);
  const centeredMessage = ' '.repeat(leftPadding) + message;
  const paddedMessage = centeredMessage.padEnd(SPLIT_FLAP_MAX_LENGTH, ' ');

  chars.forEach((charSlot, index) => {
    const newChar = paddedMessage[index];

    setTimeout(() => {
      charSlot.classList.add('flipping');
      charSlot.classList.remove('clearing');
      charSlot.textContent = newChar;

      // Update styling based on character type
      if (newChar === ' ') {
        charSlot.classList.add('space');
      } else {
        charSlot.classList.remove('space');
      }

      // Play mechanical click sound (every 3rd character, stronger on non-spaces)
      if (index % 3 === 0 && newChar !== ' ') {
        playMechanicalClick(1.0);
      } else if (index % 3 === 0) {
        playMechanicalClick(0.4);
      }

      // Remove animation class after it completes
      setTimeout(() => {
        charSlot.classList.remove('flipping');
      }, 150);
    }, index * 25);
  });
}

function transitionToMessage(message) {
  // Step 1: Clear all characters (with red "clearing" state)
  updateSplitFlap('', true);

  // Step 2: After clearing animation completes, show new message
  const totalClearTime = (SPLIT_FLAP_MAX_LENGTH * 25) + 150 + 200; // animation + buffer
  setTimeout(() => {
    updateSplitFlap(message, false);
  }, totalClearTime);
}

function rotateSplitFlap() {
  currentSplitFlapIndex = (currentSplitFlapIndex + 1) % SPLIT_FLAP_MESSAGES.length;
  transitionToMessage(SPLIT_FLAP_MESSAGES[currentSplitFlapIndex]);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  init();
  initSplitFlap();

  // Handle resize to switch between desktop/mobile messages
  let wasMobile = isMobile();
  window.addEventListener('resize', () => {
    const nowMobile = isMobile();
    if (nowMobile !== wasMobile) {
      wasMobile = nowMobile;
      initSplitFlap(); // Reinitialize with appropriate message set
    }
  });

  // Enable audio on first user interaction (browser requirement)
  const enableAudio = () => {
    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }
    document.removeEventListener('click', enableAudio);
    document.removeEventListener('touchstart', enableAudio);
  };
  document.addEventListener('click', enableAudio);
  document.addEventListener('touchstart', enableAudio);
});
