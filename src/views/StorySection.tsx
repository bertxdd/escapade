import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import storyBg from "../assets/STORY_BG.png";
import titleSheetUrl from "../assets/Story_Title.png";
import glitchSheetUrl from "../assets/ED_Glitch.png";
import miniSheetUrlA from "../assets/Mini_ED1.png";
import miniSheetUrlB from "../assets/Mini_ED2.png";
// Frame
import hudTopLeft from "../assets/Group 5.png";
import hudTopRight from "../assets/Group 6.png";
import hudBottomLeft from "../assets/Group 3.png";
import hudBottomRight from "../assets/Group 4.png";

const STORY_TEXT =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil non, maiores eum iusto, animi aspernatur doloribus, voluptate laborum minus in optio necessitatibus repellendus excepturi eius? Consequatur iste quo dolores dolore. Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum numquam nam ratione quod animi? Impedit similique laudantium aspernatur.";

// Intro (ms): the corners pan out, then the content fades in, then typing starts.
const INTRO = { panMs: 1100, contentDelayMs: 900, contentFadeMs: 700 };

const TYPE = {
  startDelayMs: INTRO.contentDelayMs + 300,
  titleLetterMs: 90, 
  gapMs: 280,       
  charMs: 16,      
  punctPauseMs: 130,  
  cursorLingerMs: 1800, 
};

const TITLE_FPS = 6;

// How long each glitch frame stays on screen (ms). Frames 0 and 4 are the calm
// poses, so they hold; the rest flash by. Extra frames use the default.
const GLITCH_FRAME_MS = [1600, 70, 70, 90, 1200, 80, 70];
const GLITCH_DEFAULT_MS = 80;

// Mini mascots: time for one full loop, and a start offset so they don't move in sync.
const MINI_A = { loopMs: 5200, phase: 0 };
const MINI_B = { loopMs: 5600, phase: 0.45 };

const SHEET_URLS = { title: titleSheetUrl, glitch: glitchSheetUrl, miniA: miniSheetUrlA, miniB: miniSheetUrlB };

/* ═══════════════════════════════════════════════════════════════════
   2. SPRITE SHEETS: frames are found by looking at the image itself

   Nothing here is hand-measured. When you re-export a sheet (different size,
   spacing or padding) the frames are found again automatically, so the
   animations can't silently go blank because some pixel numbers went stale.
   ═══════════════════════════════════════════════════════════════════ */

type Rect = { x: number; y: number; w: number; h: number };
type Point = { x: number; y: number };
type Size = { w: number; h: number };
type Alpha = { data: Uint8Array; width: number; height: number };

// What we learn about each sheet (geometry only) ...
type TitleGeometry = { frames: Rect[]; size: Size; letterEdges: number[] };
type GlitchGeometry = { frames: Rect[]; size: Size };
type MiniGeometry = { sprite: Rect; path: Point[]; origin: Point; size: Size };

// ... and the same thing with the loaded image attached.
type WithImage<T> = T & { img: HTMLImageElement };
type TitleSheet = WithImage<TitleGeometry>;
type GlitchSheet = WithImage<GlitchGeometry>;
type MiniSheet = WithImage<MiniGeometry>;

type SheetUrls = { title: string; glitch: string; miniA: string; miniB: string };
type StorySprites = { title: TitleSheet; glitch: GlitchSheet; miniA: MiniSheet; miniB: MiniSheet };

const INK = 20;              // alpha above this counts as a drawn pixel
const EDGE = 2;              // ignore the outer 2px (editor selection borders)
const MIN_FRAME = 12;        // a run shorter than this is a speck, not a frame
const TITLE_PAD = 3;         // breathing room around the title letters
const GLITCH_MARGIN = 0.145; // empty space around the character (share of its height)
const MINI_PAD = 6;          // breathing room around a mini mascot's soft edges
const MINI_MARGIN = 12;      // extra canvas room so the motion path never clips

/* Finding things in an alpha channel */

/** A drawn pixel, ignoring the outer EDGE px of the sheet. */
function isInk(a: Alpha, x: number, y: number): boolean {
  return x >= EDGE && y >= EDGE && x < a.width - EDGE && y < a.height - EDGE && a.data[y * a.width + x] > INK;
}

/**
 * Runs of indices where counts[i] > 0. Runs separated by `mergeGap` empty
 * indices or fewer are merged; runs shorter than `minSize` are dropped.
 */
function findRuns(counts: ArrayLike<number>, mergeGap: number, minSize: number): [number, number][] {
  const runs: [number, number][] = [];
  let start = -1;
  let last = -1;
  for (let i = 0; i < counts.length; i++) {
    if (counts[i] <= 0) continue;
    if (start === -1) start = i;
    else if (i - last - 1 > mergeGap) {
      runs.push([start, last]);
      start = i;
    }
    last = i;
  }
  if (start !== -1) runs.push([start, last]);
  return runs.filter(([s, e]) => e - s + 1 >= minSize);
}

/**
 * Frames stacked along one axis ("y" = a vertical sheet, "x" = a horizontal
 * one). Returns the tight box of drawn pixels for each frame.
 */
function findFrames(a: Alpha, axis: "x" | "y", mergeGap: number): Rect[] {
  const alongX = axis === "x";
  const counts = new Int32Array(alongX ? a.width : a.height);

  for (let y = EDGE; y < a.height - EDGE; y++) {
    for (let x = EDGE; x < a.width - EDGE; x++) {
      if (a.data[y * a.width + x] > INK) counts[alongX ? x : y]++;
    }
  }

  const runs = findRuns(counts, mergeGap, MIN_FRAME);
  const runOf = new Int16Array(counts.length).fill(-1);
  runs.forEach(([s, e], i) => runOf.fill(i, s, e + 1));

  const lo = runs.map(() => Infinity);
  const hi = runs.map(() => -1);
  for (let y = EDGE; y < a.height - EDGE; y++) {
    for (let x = EDGE; x < a.width - EDGE; x++) {
      if (a.data[y * a.width + x] <= INK) continue;
      const r = runOf[alongX ? x : y];
      if (r < 0) continue;
      const across = alongX ? y : x;
      if (across < lo[r]) lo[r] = across;
      if (across > hi[r]) hi[r] = across;
    }
  }

  return runs.map(([s, e], i) =>
    alongX
      ? { x: s, y: lo[i], w: e - s + 1, h: hi[i] - lo[i] + 1 }
      : { x: lo[i], y: s, w: hi[i] - lo[i] + 1, h: e - s + 1 }
  );
}

function needFrames(sheetName: string, frames: Rect[]): Rect[] {
  if (frames.length === 0) {
    throw new Error(`[StorySection] No frames found in ${sheetName}. Is it a transparent PNG?`);
  }
  return frames;
}

/* One analyzer per sheet type */

/** Vertical sheet: one row of letters per frame. */
function analyzeTitle(a: Alpha): TitleGeometry {
  const rows = needFrames("the title sheet", findFrames(a, "y", 8));
  const left = Math.min(...rows.map((r) => r.x));
  const right = Math.max(...rows.map((r) => r.x + r.w));
  const tallest = Math.max(...rows.map((r) => r.h));

  const size = { w: right - left + TITLE_PAD * 2, h: tallest + TITLE_PAD * 2 };
  const frames = rows.map((r) => ({ x: left - TITLE_PAD, y: r.y - TITLE_PAD, ...size }));
  return { frames, size, letterEdges: findLetterEdges(a, frames, size.w) };
}

/**
 * Where each letter ends, in frame pixels (cut halfway through the gap after
 * it). The typewriter reveals the title up to each edge in turn.
 */
function findLetterEdges(a: Alpha, frames: Rect[], width: number): number[] {
  const inkColumns = new Int32Array(width);
  for (const f of frames) {
    for (let y = f.y; y < f.y + f.h; y++) {
      for (let x = f.x; x < f.x + f.w; x++) {
        if (isInk(a, x, y)) inkColumns[x - f.x] = 1;
      }
    }
  }
  const letters = findRuns(inkColumns, 0, 1);
  return letters.map(([, end], i) => {
    const next = letters[i + 1];
    return next ? Math.round((end + 1 + next[0]) / 2) : width;
  });
}

/**
 * Horizontal sheet. Every frame gets the same square window centered on the
 * character's own bounding box, so the calm poses line up perfectly and the
 * glitch frames never jump out of the canvas.
 */
function analyzeGlitch(a: Alpha): GlitchGeometry {
  const boxes = needFrames("the glitch sheet", findFrames(a, "x", 40));
  const tallest = Math.max(...boxes.map((b) => b.h));
  const side = Math.round(tallest * (1 + GLITCH_MARGIN * 2));

  const frames = boxes.map((b) => ({
    x: Math.round(b.x + b.w / 2 - side / 2),
    y: Math.round(b.y + b.h / 2 - side / 2),
    w: side,
    h: side,
  }));
  return { frames, size: { w: side, h: side } };
}

/**
 * Mini mascot sheet: the same small sprite drawn at several points of a loop,
 * one per equal-width cell. We keep the sprite once and its position inside
 * each cell; the component then glides it through those positions.
 */
function analyzeMini(a: Alpha): MiniGeometry {
  const boxes = needFrames("a mini mascot sheet", findFrames(a, "x", 30));
  const cell = a.width / boxes.length;

  const first = boxes[0];
  const sprite = {
    x: first.x - MINI_PAD,
    y: first.y - MINI_PAD,
    w: first.w + MINI_PAD * 2,
    h: first.h + MINI_PAD * 2,
  };
  const path = boxes.map((b, i) => ({ x: b.x - MINI_PAD - i * cell, y: b.y - MINI_PAD }));

  const origin = {
    x: Math.min(...path.map((p) => p.x)) - MINI_MARGIN,
    y: Math.min(...path.map((p) => p.y)) - MINI_MARGIN,
  };
  const size = {
    w: Math.ceil(Math.max(...path.map((p) => p.x)) - origin.x + sprite.w + MINI_MARGIN),
    h: Math.ceil(Math.max(...path.map((p) => p.y)) - origin.y + sprite.h + MINI_MARGIN),
  };
  return { sprite, path, origin, size };
}

/* ── Loading (runs once, result is cached) ───────────────────────── */

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`[StorySection] Couldn't load ${src}`));
    img.src = src;
  });
}

function readAlpha(img: HTMLImageElement): Alpha {
  const canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("[StorySection] Canvas 2D is not available");
  ctx.drawImage(img, 0, 0);

  const rgba = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  const data = new Uint8Array(canvas.width * canvas.height);
  for (let i = 0; i < data.length; i++) data[i] = rgba[i * 4 + 3];
  return { data, width: canvas.width, height: canvas.height };
}

async function buildSprites(urls: SheetUrls): Promise<StorySprites> {
  const [title, glitch, miniA, miniB] = await Promise.all(
    [urls.title, urls.glitch, urls.miniA, urls.miniB].map(loadImage)
  );
  return {
    title: { img: title, ...analyzeTitle(readAlpha(title)) },
    glitch: { img: glitch, ...analyzeGlitch(readAlpha(glitch)) },
    miniA: { img: miniA, ...analyzeMini(readAlpha(miniA)) },
    miniB: { img: miniB, ...analyzeMini(readAlpha(miniB)) },
  };
}

const spriteCache = new Map<string, Promise<StorySprites>>();

/** Loads and analyzes the sheets once on mount. Returns null until ready. */
function useStorySprites(urls: SheetUrls): StorySprites | null {
  const [sprites, setSprites] = useState<StorySprites | null>(null);

  useEffect(() => {
    const key = JSON.stringify(urls);
    let job = spriteCache.get(key);
    if (!job) {
      job = buildSprites(urls);
      spriteCache.set(key, job);
    }

    let alive = true;
    job
      .then((s) => {
        if (alive) setSprites(s);
      })
      .catch((err) => console.error(err));
    return () => {
      alive = false;
    };
  }, [urls]);

  return sprites;
}
/* ═══ end of sprite sheets ═══ */

/* ═══════════════════════════════════════════════════════════════════
   3. SMALL HOOKS
   ═══════════════════════════════════════════════════════════════════ */

/** `entered` turns true once the section scrolls into view (and stays true); `inView` is live. */
function useInView<T extends Element>(threshold = 0.35) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting) setEntered(true);
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView, entered };
}

function usePrefersReducedMotion() {
  const query = "(prefers-reduced-motion: reduce)";
  const [reduced, setReduced] = useState(() => typeof window !== "undefined" && window.matchMedia(query).matches);

  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

/** Calls `tick` every animation frame while `active`. Always runs the latest `tick`. */
function useRaf(tick: (now: number) => void, active: boolean) {
  const tickRef = useRef(tick);
  useEffect(() => {
    tickRef.current = tick;
  });

  useEffect(() => {
    if (!active) return;
    let id = requestAnimationFrame(function loop(now) {
      tickRef.current(now);
      id = requestAnimationFrame(loop);
    });
    return () => cancelAnimationFrame(id);
  }, [active]);
}

/** Typewriter: the title's letters first, then the paragraph. */
type TypePhase = "idle" | "title" | "text" | "lingering" | "done";

const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

function useTypewriter({ active, letterCount, text }: { active: boolean; letterCount: number; text: string }) {
  const reduced = usePrefersReducedMotion();
  const [state, setState] = useState({ phase: "idle" as TypePhase, letters: 0, chars: 0 });

  useEffect(() => {
    if (!active) return;
    if (reduced) {
      setState({ phase: "done", letters: letterCount, chars: text.length });
      return;
    }

    let cancelled = false;
    const update = (patch: Partial<typeof state>) => setState((s) => ({ ...s, ...patch }));

    (async () => {
      await wait(TYPE.startDelayMs);
      if (cancelled) return;
      update({ phase: "title" });

      for (let n = 1; n <= letterCount; n++) {
        await wait(TYPE.titleLetterMs);
        if (cancelled) return;
        update({ letters: n });
      }

      await wait(TYPE.gapMs);
      if (cancelled) return;
      update({ phase: "text" });

      for (let i = 0; i < text.length; i++) {
        const prev = text[i - 1];
        await wait(TYPE.charMs + (prev && ".?!,".includes(prev) ? TYPE.punctPauseMs : 0));
        if (cancelled) return;
        update({ chars: i + 1 });
      }

      update({ phase: "lingering" });
      await wait(TYPE.cursorLingerMs);
      if (cancelled) return;
      update({ phase: "done" });
    })();

    return () => {
      cancelled = true;
    };
  }, [active, reduced, letterCount, text]);

  return state;
}

/* ═══════════════════════════════════════════════════════════════════
   4. CANVAS COMPONENTS (title, glitch character, mini mascots)
   ═══════════════════════════════════════════════════════════════════ */

type Ctx = CanvasRenderingContext2D;

const drawRect = (ctx: Ctx, img: HTMLImageElement, r: Rect) =>
  ctx.drawImage(img, r.x, r.y, r.w, r.h, 0, 0, r.w, r.h);

/**
 * Owns a canvas and repaints it. `animate` runs a frame loop; otherwise (or
 * with reduced motion) it paints once, which is also the still image.
 */
function useSpriteCanvas(draw: (ctx: Ctx, now: number) => void, animate: boolean) {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduced = usePrefersReducedMotion();

  const paint = useCallback(
    (now: number) => {
      const ctx = ref.current?.getContext("2d");
      if (ctx) draw(ctx, now);
    },
    [draw]
  );

  useRaf(paint, animate && !reduced);
  useEffect(() => paint(0), [paint]);
  return ref;
}

/* ── Title: sprite shine + typewriter reveal ── */

function drawTitle(ctx: Ctx, sheet: TitleSheet, now: number) {
  const { img, frames, size } = sheet;
  const t = (now / 1000) * TITLE_FPS;
  const i = Math.floor(t) % frames.length;
  const blend = t - Math.floor(t);

  ctx.clearRect(0, 0, size.w, size.h);
  ctx.globalCompositeOperation = "lighter"; // adds pixels => a true crossfade
  ctx.globalAlpha = 1 - blend;
  drawRect(ctx, img, frames[i]);
  ctx.globalAlpha = blend;
  drawRect(ctx, img, frames[(i + 1) % frames.length]);
  ctx.globalAlpha = 1;
  ctx.globalCompositeOperation = "source-over";
}

type TypedTitleProps = {
  sheet: TitleSheet;
  animate: boolean;
  revealPct: number; // how much of the title is typed so far, 0..100
  showCursor: boolean;
};

const TypedTitle = memo(function TypedTitle({ sheet, animate, revealPct, showCursor }: TypedTitleProps) {
  const draw = useCallback((ctx: Ctx, now: number) => drawTitle(ctx, sheet, now), [sheet]);
  const ref = useSpriteCanvas(draw, animate);

  return (
    <div className="story-title">
      <canvas
        ref={ref}
        width={sheet.size.w}
        height={sheet.size.h}
        role="img"
        aria-label="Mission Briefing"
        className="story-title-canvas"
        style={{ clipPath: `inset(0 ${100 - revealPct}% 0 0)` }}
      />
      {showCursor && <span className="title-cursor" style={{ left: `${revealPct}%` }} aria-hidden="true" />}
    </div>
  );
});

/* ── Main character: glitch frames, hard cuts ── */

function buildTimeline(frameCount: number) {
  let total = 0;
  const ends = Array.from({ length: frameCount }, (_, i) => (total += GLITCH_FRAME_MS[i] ?? GLITCH_DEFAULT_MS));
  return { ends, total };
}

const GlitchMascot = memo(function GlitchMascot({ sheet, animate }: { sheet: GlitchSheet; animate: boolean }) {
  const { img, frames, size } = sheet;
  const timeline = useMemo(() => buildTimeline(frames.length), [frames.length]);
  const shown = useRef(-1);

  // Hard cuts (no crossfade): blending glitch frames would wash them out.
  const draw = useCallback(
    (ctx: Ctx, now: number) => {
      const t = now % timeline.total;
      const i = Math.max(0, timeline.ends.findIndex((end) => t < end));
      if (i === shown.current) return; // same frame as last time, skip the repaint
      shown.current = i;
      ctx.clearRect(0, 0, size.w, size.h);
      drawRect(ctx, img, frames[i]);
    },
    [img, frames, size, timeline]
  );
  const ref = useSpriteCanvas(draw, animate);

  return <canvas ref={ref} width={size.w} height={size.h} role="img" aria-label="Mascot" className="mascot-main" />;
});

/* ── Mini mascots: one sprite gliding along a looping path ── */

// Closed Catmull-Rom spline through the path points.
const catmull = (p0: number, p1: number, p2: number, p3: number, t: number) =>
  0.5 *
  (2 * p1 +
    (-p0 + p2) * t +
    (2 * p0 - 5 * p1 + 4 * p2 - p3) * t * t +
    (-p0 + 3 * p1 - 3 * p2 + p3) * t * t * t);

function samplePath(path: Point[], u: number): Point {
  const n = path.length;
  const i = Math.floor(u);
  const t = u - i;
  const at = (k: number) => path[(((i + k) % n) + n) % n];
  const [a, b, c, d] = [at(-1), at(0), at(1), at(2)];
  return { x: catmull(a.x, b.x, c.x, d.x, t), y: catmull(a.y, b.y, c.y, d.y, t) };
}

type MiniMascotProps = {
  sheet: MiniSheet;
  animate: boolean;
  loopMs: number;
  phase: number;
  className: string;
};

const MiniMascot = memo(function MiniMascot({ sheet, animate, loopMs, phase, className }: MiniMascotProps) {
  const { img, sprite, path, origin, size } = sheet;

  const draw = useCallback(
    (ctx: Ctx, now: number) => {
      const p = samplePath(path, ((now / loopMs + phase) % 1) * path.length);
      ctx.clearRect(0, 0, size.w, size.h);
      ctx.drawImage(img, sprite.x, sprite.y, sprite.w, sprite.h, p.x - origin.x, p.y - origin.y, sprite.w, sprite.h);
    },
    [img, sprite, path, origin, size, loopMs, phase]
  );
  const ref = useSpriteCanvas(draw, animate);

  return <canvas ref={ref} width={size.w} height={size.h} aria-hidden="true" className={className} />;
});

/* ═══════════════════════════════════════════════════════════════════
   5. THE SECTION
   ═══════════════════════════════════════════════════════════════════ */

const cssVars = {
  "--pan-ms": `${INTRO.panMs}ms`,
  "--content-delay": `${INTRO.contentDelayMs}ms`,
  "--fade-ms": `${INTRO.contentFadeMs}ms`,
} as CSSProperties;

export function StorySection() {
  const { ref, inView, entered } = useInView<HTMLElement>();
  const sprites = useStorySprites(SHEET_URLS);
  const animate = entered && inView; // animation loops pause while scrolled away

  const letterEdges = sprites?.title.letterEdges ?? [];
  const { phase, letters, chars } = useTypewriter({
    active: entered && sprites !== null,
    letterCount: letterEdges.length,
    text: STORY_TEXT,
  });

  // How much of the title is revealed: up to the right edge of the last typed letter
  const titleWidth = sprites?.title.size.w ?? 1;
  const revealPct = letters === 0 ? 0 : (letterEdges[letters - 1] / titleWidth) * 100;

  return (
    <section
      ref={ref}
      id="story"
      data-entered={entered}
      className="story-section"
      style={{
        ...cssVars,
        backgroundImage: `linear-gradient(to bottom, rgba(7,9,14,0.5), rgba(7,9,14,0.95)), url(${storyBg})`,
      }}
    >
      <style>{STYLES}</style>

      {/* HUD corners: start gathered at the center, pan out when the section is entered */}
      <div className="hud-layer" aria-hidden="true">
        <img src={hudTopLeft} alt="" className="hud-piece hud-tl" />
        <img src={hudTopRight} alt="" className="hud-piece hud-tr" />
        <img src={hudBottomLeft} alt="" className="hud-piece hud-bl" />
        <img src={hudBottomRight} alt="" className="hud-piece hud-br" />
      </div>

      <div className="story-stage">
        <div className="story-text story-fade">
          {sprites && (
            <TypedTitle sheet={sprites.title} animate={animate} revealPct={revealPct} showCursor={phase === "title"} />
          )}

          {/* Typed text + invisible remainder, so the layout never jumps while typing */}
          <p className="story-paragraph font-sans">
            <span className="sr-only">{STORY_TEXT}</span>
            <span aria-hidden="true">
              {STORY_TEXT.slice(0, chars)}
              {(phase === "text" || phase === "lingering") && <span className="type-caret" />}
              <span className="type-rest">{STORY_TEXT.slice(chars)}</span>
            </span>
          </p>
        </div>

        <div className="story-mascot story-fade">
          {sprites && (
            <>
              <MiniMascot sheet={sprites.miniA} animate={animate} {...MINI_A} className="float-mascot float-a" />
              <MiniMascot sheet={sprites.miniB} animate={animate} {...MINI_B} className="float-mascot float-b" />
              <GlitchMascot sheet={sprites.glitch} animate={animate} />
            </>
          )}
        </div>

        <div className="story-cta story-fade">
          <a href="#mission" className="story-btn font-orbitron">
            Proceed
          </a>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   6. STYLES
   ═══════════════════════════════════════════════════════════════════ */

const STYLES = `
/* ═══════════════════════════════════════════════════════════════════
   StorySection

   1. Tokens          4. Mobile / tablet layout (stacked)
   2. HUD corners     5. Desktop layout (matches the design)
   3. Fade-in         6. Typewriter + reduced motion

   DESKTOP SIZING: --u is 1px on the 1440x923 design and scales with the
   window. Desktop sizes are "design px * --u" and positions are % of the
   section, so the layout matches the design at any screen size.
   ═══════════════════════════════════════════════════════════════════ */

/* Tokens */
.story-section {
  --u: min(0.069444vw, 0.108342vh);
  --hud-w: clamp(110px, 24vw, 328px);
  --hud-h: calc(var(--hud-w) * 96 / 328);
  --hud-inset: clamp(10px, 1.4vw, 20px);
  --hud-gap: 6px; /* space between the corner pieces while gathered at the center */

  position: relative;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
  border-top: 1px solid rgb(255 255 255 / 0.05);
  color: #fff;
  background-size: cover;
  background-position: center;
}
@media (min-width: 768px) {
  .story-section { background-attachment: fixed; } /* iOS Safari ignores this on phones */
}

/* HUD */
.hud-layer {
  position: absolute;
  inset: 0;
  z-index: 20;
  pointer-events: none;
  container-type: size; /* cqw / cqh = % of the section */
}
.hud-piece {
  position: absolute;
  width: var(--hud-w);
  height: auto;
  will-change: transform;
  transition: transform var(--pan-ms) cubic-bezier(0.22, 1, 0.36, 1);
}
.hud-tl { top: var(--hud-inset);    left: var(--hud-inset); }
.hud-tr { top: var(--hud-inset);    right: var(--hud-inset); }
.hud-bl { bottom: var(--hud-inset); left: var(--hud-inset); }
.hud-br { bottom: var(--hud-inset); right: var(--hud-inset); }

/* Start: all four gathered around the center */
.hud-tl { transform: translate(calc(50cqw - var(--hud-w) - var(--hud-inset) - var(--hud-gap)),  calc(50cqh - var(--hud-h) - var(--hud-inset) - var(--hud-gap))); }
.hud-tr { transform: translate(calc(-50cqw + var(--hud-w) + var(--hud-inset) + var(--hud-gap)), calc(50cqh - var(--hud-h) - var(--hud-inset) - var(--hud-gap))); }
.hud-bl { transform: translate(calc(50cqw - var(--hud-w) - var(--hud-inset) - var(--hud-gap)),  calc(-50cqh + var(--hud-h) + var(--hud-inset) + var(--hud-gap))); }
.hud-br { transform: translate(calc(-50cqw + var(--hud-w) + var(--hud-inset) + var(--hud-gap)), calc(-50cqh + var(--hud-h) + var(--hud-inset) + var(--hud-gap))); }

/* End: pan out to the real corners */
.story-section[data-entered="true"] .hud-piece { transform: translate(0, 0); }

/* ── 3. Fade-in (content stays hidden until the corners are out) ─── */
.story-fade {
  opacity: 0;
  transform: translateY(14px);
  transition: opacity var(--fade-ms) ease-out, transform var(--fade-ms) ease-out;
}
.story-section[data-entered="true"] .story-fade {
  opacity: 1;
  transform: translateY(0);
  transition-delay: var(--content-delay);
}

/* ── 4. Mobile / tablet: simple stack ────────────────────────────── */
.story-stage {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 40px;
  min-height: 100vh;
  max-width: 720px;
  margin: 0 auto;
  padding: 112px 24px 96px; /* top/bottom clear the corner brackets */
}
.story-mascot { order: 1; position: relative; display: flex; justify-content: center; }
.story-text   { order: 2; display: flex; flex-direction: column; gap: 24px; }
.story-cta    { order: 3; display: flex; justify-content: center; padding-top: 8px; }

.story-title { position: relative; width: 100%; }
.story-title-canvas { display: block; width: 100%; height: auto; }

.story-paragraph {
  max-width: 36rem;
  font-size: 0.9375rem;
  line-height: 1.7;
  letter-spacing: 0.02em;
  color: rgb(255 255 255 / 0.92);
}

.mascot-main {
  position: relative;
  z-index: 10; /* in front of the mini mascots */
  display: block;
  width: min(70%, 420px);
  height: auto;
}
.float-mascot {
  position: absolute;
  z-index: 0;
  width: clamp(96px, 22vw, 160px);
  height: auto;
  pointer-events: none;
}
.float-a { left: 0;  top: 18%; }
.float-b { right: 0; top: 0; }

.story-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 14px 40px;
  border: 2px solid rgb(255 255 255 / 0.9);
  border-radius: 8px;
  background: transparent;
  color: #fff;
  font-size: 0.95rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  transition: background 200ms, color 200ms;
}
.story-btn:hover { background: #fff; color: #000; }

/* Desktop: the design, placed by % and --u */
@media (min-width: 1024px) {
  .story-section {
    --hud-w: calc(var(--u) * 328);
    --hud-inset: calc(var(--u) * 14);
  }
  .story-stage {
    position: absolute;
    inset: 0;
    display: block;
    min-height: 0;
    max-width: none;
    margin: 0;
    padding: 0;
  }

  /* Title + paragraph, on the left */
  .story-text {
    position: absolute;
    left: 6.875%;
    top: 25.68%;
    width: calc(var(--u) * 657);
    gap: calc(var(--u) * 47);
  }
  .story-paragraph {
    width: calc(var(--u) * 637);
    max-width: none;
    margin-left: calc(var(--u) * 3);
    font-size: calc(var(--u) * 22);
    line-height: calc(var(--u) * 31);
    text-align: justify;
  }

  /* Big character on the right, with the mini mascots positioned inside its box */
  .story-mascot {
    position: absolute;
    left: 54.17%;
    top: 15.28%;
    width: calc(var(--u) * 640);
    height: calc(var(--u) * 640);
  }
  .mascot-main  { width: 100%; }
  .float-mascot { width: calc(var(--u) * 223); }
  .float-a { left: calc(var(--u) * -56.5); top: calc(var(--u) * 107.5); }
  .float-b { left: calc(var(--u) * 438.5); top: calc(var(--u) * 27.5); right: auto; }

  /* Proceed: low and big */
  .story-cta {
    position: absolute;
    inset: 86.35% 0 auto;
    padding: 0;
  }
  .story-btn {
    width: calc(var(--u) * 235);
    height: calc(var(--u) * 73);
    padding: 0;
    border-width: max(2px, calc(var(--u) * 2));
    border-radius: calc(var(--u) * 10);
    font-size: calc(var(--u) * 30);
  }
}

/* Typewriter */
@keyframes caret-blink { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0; } }

.type-rest { opacity: 0; } /* not typed yet, but still takes up space */

/* The caret is a pseudo-element so it never changes how the text wraps */
.type-caret { position: relative; }
.type-caret::after {
  content: "";
  position: absolute;
  left: 2px;
  top: 0.15em;
  width: 2px;
  height: 1.05em;
  background: currentColor;
  animation: caret-blink 0.9s steps(1) infinite;
}
.title-cursor {
  position: absolute;
  top: 6%;
  bottom: 6%;
  width: clamp(3px, 0.9%, 6px);
  margin-left: 2px;
  background: #fff;
  animation: caret-blink 0.9s steps(1) infinite;
}

@media (prefers-reduced-motion: reduce) {
  .hud-piece, .story-fade { transition: none; }
  .type-caret::after, .title-cursor { animation: none; }
}
`;