/**
 * Radar drawing for the engine console (EngineConsole.tsx). Pure canvas 2D,
 * no imports, no DOM reads: the component owns sizing and the frame loop,
 * this file only knows how to advance and paint one frame.
 *
 * Canvas 2D on purpose (not WebGL): it runs on every phone and on Windows
 * machines with blocked or software GPUs, where a shader scene silently
 * falls back to nothing.
 *
 * Colours are the brand palette (globals.css): elektrik for lines, gök for
 * the "hot" points, krem at low alpha for the grid. Single-colour alpha
 * fades only, as the identity allows.
 */

const ELEKTRIK = "10, 132, 255";
const GOK = "56, 189, 248";
const KREM = "244, 241, 234";

const TAU = Math.PI * 2;
/** radians per second: one sweep every ~7s */
const SPEED = 0.9;
/** how far the fading wedge trails behind the sweep line */
const TRAIL = 1.25;
const TRAIL_STEPS = 26;

/** Fixed targets [angle, radius 0..1]: deterministic, so server and client agree. */
const BLIPS: readonly (readonly [number, number])[] = [
  [0.35, 0.62],
  [1.1, 0.34],
  [1.72, 0.81],
  [2.45, 0.52],
  [3.05, 0.27],
  [3.7, 0.72],
  [4.4, 0.44],
  [5.05, 0.86],
  [5.75, 0.56],
];

export interface RadarState {
  angle: number;
  /** per-blip brightness 0..1, lit as the sweep passes and then decaying */
  life: number[];
}

/** The resting frame: what reduced motion, the kill switch and off-screen show. */
export function createRadarState(): RadarState {
  return { angle: 5.2, life: BLIPS.map((_, i) => 0.35 + ((i * 37) % 50) / 100) };
}

export function stepRadar(state: RadarState, dtSeconds: number): void {
  const delta = SPEED * dtSeconds;
  const prev = state.angle;
  state.angle = (prev + delta) % TAU;
  for (let i = 0; i < BLIPS.length; i++) {
    const ahead = (((BLIPS[i][0] - prev) % TAU) + TAU) % TAU;
    if (ahead <= delta) state.life[i] = 1;
    else state.life[i] = Math.max(0, state.life[i] - dtSeconds * 0.16);
  }
}

/** Cursor position in canvas CSS px, or null when the pointer is not over the radar. */
export interface RadarCursor {
  x: number;
  y: number;
}

/** px: targets closer than this to the cursor light up, fully at the centre */
const CURSOR_REACH = 90;

export function drawRadar(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  state: RadarState,
  cursor: RadarCursor | null = null,
): void {
  const cx = width / 2;
  const cy = height / 2;
  const r = Math.min(width, height) * 0.44;

  ctx.clearRect(0, 0, width, height);
  ctx.lineWidth = 1;

  // grid: four rings and a cross
  ctx.strokeStyle = `rgba(${KREM}, 0.09)`;
  for (let i = 1; i <= 4; i++) {
    ctx.beginPath();
    ctx.arc(cx, cy, (r * i) / 4, 0, TAU);
    ctx.stroke();
  }
  ctx.beginPath();
  ctx.moveTo(cx - r, cy);
  ctx.lineTo(cx + r, cy);
  ctx.moveTo(cx, cy - r);
  ctx.lineTo(cx, cy + r);
  ctx.stroke();

  // trailing wedge: nested sectors that all start at the tail and end ever
  // closer to the sweep line, so their faint fills add up to a smooth fade.
  // (Side-by-side sectors would show a hairline seam at every shared edge.)
  const slice = TRAIL / TRAIL_STEPS;
  const tail = state.angle - TRAIL;
  for (let i = 0; i < TRAIL_STEPS; i++) {
    const alpha = (0.44 / TRAIL_STEPS) * (1 - i / TRAIL_STEPS);
    ctx.fillStyle = `rgba(${ELEKTRIK}, ${alpha.toFixed(4)})`;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r, tail + i * slice, state.angle);
    ctx.closePath();
    ctx.fill();
  }

  // sweep line
  ctx.strokeStyle = `rgba(${GOK}, 0.9)`;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(cx + Math.cos(state.angle) * r, cy + Math.sin(state.angle) * r);
  ctx.stroke();

  // targets: a dot, plus a ring that opens as the dot fades. With a cursor
  // over the radar, targets near it light up (the sweep is unaffected).
  for (let i = 0; i < BLIPS.length; i++) {
    const life = state.life[i];
    const x = cx + Math.cos(BLIPS[i][0]) * BLIPS[i][1] * r;
    const y = cy + Math.sin(BLIPS[i][0]) * BLIPS[i][1] * r;
    const near = cursor ? Math.max(0, 1 - Math.hypot(x - cursor.x, y - cursor.y) / CURSOR_REACH) : 0;
    if (life <= 0.02 && near <= 0) continue;
    if (near > 0) {
      // soft halo, single colour at low alpha
      ctx.fillStyle = `rgba(${GOK}, ${(0.22 * near).toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(x, y, 7 + 7 * near, 0, TAU);
      ctx.fill();
    }
    ctx.fillStyle = `rgba(${GOK}, ${Math.max(life, near).toFixed(3)})`;
    ctx.beginPath();
    ctx.arc(x, y, 3 + near, 0, TAU);
    ctx.fill();
    if (life <= 0.02) continue;
    ctx.strokeStyle = `rgba(${ELEKTRIK}, ${(life * 0.5).toFixed(3)})`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(x, y, 4 + (1 - life) * 12, 0, TAU);
    ctx.stroke();
  }

  // hub
  ctx.fillStyle = `rgb(${ELEKTRIK})`;
  ctx.beginPath();
  ctx.arc(cx, cy, 3, 0, TAU);
  ctx.fill();
}
