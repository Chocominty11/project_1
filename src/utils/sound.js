// Efek suara dibuat langsung oleh browser (Web Audio API), jadi tidak perlu file mp3.
let ctx;

function getCtx() {
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return null;
  if (!ctx) ctx = new AC();
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
}

// Panggil saat pengguna mengklik (browser hanya mengizinkan suara setelah interaksi)
export function unlockAudio() {
  try { getCtx(); } catch { /* abaikan */ }
}

// Suara desis seperti kertas
function rustle(duration, from, to, volume) {
  const c = getCtx();
  if (!c) return;
  const buffer = c.createBuffer(1, c.sampleRate * duration, c.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;

  const src = c.createBufferSource();
  src.buffer = buffer;
  const filter = c.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.setValueAtTime(from, c.currentTime);
  filter.frequency.exponentialRampToValueAtTime(to, c.currentTime + duration);
  const gain = c.createGain();
  gain.gain.setValueAtTime(volume, c.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + duration);
  src.connect(filter).connect(gain).connect(c.destination);
  src.start();
}

// Suara "duk" seperti stempel
function thump() {
  const c = getCtx();
  if (!c) return;
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.frequency.setValueAtTime(140, c.currentTime);
  osc.frequency.exponentialRampToValueAtTime(40, c.currentTime + 0.25);
  gain.gain.setValueAtTime(0.6, c.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.3);
  osc.connect(gain).connect(c.destination);
  osc.start();
  osc.stop(c.currentTime + 0.3);
  rustle(0.08, 4000, 2000, 0.25);
}

// Suara untuk tiap fase animasi
const bySound = {
  folding: () => rustle(0.6, 2500, 3500, 0.3),
  inserting: () => rustle(0.7, 1200, 2200, 0.25),
  sealing: () => rustle(0.35, 3000, 1500, 0.3),
  stamped: thump,
  flying: () => rustle(1.1, 400, 3000, 0.3),
};

export function playPhaseSound(phase) {
  try { bySound[phase]?.(); } catch { /* abaikan jika browser menolak */ }
}
