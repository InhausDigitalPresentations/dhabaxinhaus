/* DHABA — Field Notes · horizontal road engine
   Scroll drives a virtual odometer `p`. The world slides left under a
   screen-anchored taxi; wheels roll by true distance, the chassis pitches
   on acceleration (taxi + roof cargo move as one piece), exhaust puffs are
   world-anchored so the taxi drives out of them. At the end of the road the
   world stops and the finale takes over: the taxi drives out of frame, the horn
   sounds, the DHABA sign drops into a lit fascia and the facade grows around it.
   Everything is scrubbed by scroll, so scrolling back reverses it. */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const damp = (k, dt) => 1 - Math.exp(-k * dt);
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const root = document.documentElement;
  const track = $('#track'), world = $('#world'), far = $('#far'), air = $('#air'), fore = $('#fore');
  const car = $('#car'), chassis = $('.chassis', car), shadow = $('.shadow', car);
  const wheelBoxes = $$('.wheel', car);
  // wheel centres + radius in car.webp source pixels (2400 × 2033)
  const SRC_W = 2400, SRC_H = 2033, WHEELS = [[1988, 1841], [635, 1841]], WHEEL_R = 190;
  const wheels = $$('.wheel img', car);
  const puffLayer = $('#puffs'), dash = $('#road .dash'), kerb = $('#road .kerb');
  const stops = $$('.stop');
  const stopIdx = el => stops.indexOf(el.closest('.stop'));
  const photos = $$('#track [data-depth]').map(el => ({ el, i: stopIdx(el), depth: +el.dataset.depth }));
  const oncoming = $$('.oncoming').map(el => ({ el, i: stopIdx(el) }));
  const slideIdx = stops.map((s, i) => s.dataset.kind === 'slide' ? i : -1).filter(i => i >= 0);
  const counter = $('#counter');
  // lazy images: per stop, loaded when the road gets within ~2 screens
  const lazy = stops.map(s => $$('img[data-src]', s));
  const loadImgs = list => list.forEach(im => { if (im.dataset.src) { im.src = im.dataset.src; im.removeAttribute('data-src'); } });
  loadImgs($$('#air img, #fore img'));
  const flyers = $$('#air .flyer'), foreItems = $$('#fore img');

  // ---------- colours ----------
  const hex = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
  const mix = (a, b, t) => `rgb(${a.map((v, i) => Math.round(lerp(v, b[i], t))).join(',')})`;
  const pal = stops.map(s => ({ bg: hex(s.dataset.bg), ink: hex(s.dataset.ink) }));

  // ---------- ghost words (far layer) ----------
  const ghosts = stops.map(s => {
    const g = document.createElement('div');
    g.className = 'ghost'; g.textContent = s.dataset.ghost || '';
    far.appendChild(g); return g;
  });

  // ---------- layout ----------
  let vw, vh, worldMax, finRun, total, baseX, carW, carTop, carH, wheelR, stopX = [], stopW = [], anchors = [];
  function measure() {
    const ratio = total ? p / total : 0;
    vw = innerWidth; vh = innerHeight;
    stops.forEach(s => { s.style.width = (+s.dataset.w * vw / 100) + 'px'; });
    stopX = stops.map(s => s.offsetLeft);
    stopW = stops.map(s => s.offsetWidth);
    const trackW = track.scrollWidth;
    worldMax = trackW - vw;
    const r = car.getBoundingClientRect();
    const k = r.height / SRC_H;
    car.style.width = (SRC_W * k) + 'px';
    wheelBoxes.forEach((w, i) => {
      const [cx, cy] = WHEELS[i];
      Object.assign(w.style, { left: (cx - WHEEL_R) * k + 'px', top: (cy - WHEEL_R) * k + 'px', width: 2 * WHEEL_R * k + 'px', height: 2 * WHEEL_R * k + 'px' });
    });
    carW = r.width; carH = r.height; carTop = r.top;
    wheelR = WHEEL_R * k;
    carW = SRC_W * k;
    baseX = vw < 700 ? vw * 0.04 : vw * 0.08;
    finRun = vw * 2.6;                       // scroll length of the finale
    total = worldMax + finRun;
    layoutFinale();
    // one anchor per slide, plus a second one on wide slides so arrow keys reveal their right-hand side
    anchors = [];
    slideIdx.forEach(i => {
      anchors.push(Math.min(stopX[i], worldMax));
      if (stopW[i] > vw * 1.12) anchors.push(Math.min(stopX[i] + stopW[i] - vw, worldMax));
    });
    anchors[anchors.length - 1] = worldMax;
    [0.27, 0.57, 1].forEach(f => anchors.push(worldMax + finRun * f));   // finale beats: sign lands, facade, end
    anchors = [...new Set(anchors.map(Math.round))];
    ghosts.forEach((g, i) => { g.style.left = (stopX[i] * 0.35 + vw * 0.06) + 'px'; });
    flyers.forEach(f => {
      f.style.height = (+f.dataset.h) + 'vh';
      f.style.top = (+f.dataset.y) + 'vh';
      f.style.left = (+f.dataset.x * vw * 0.6 + vw * 0.55) + 'px';
    });
    foreItems.forEach(f => { f.style.left = (+f.dataset.x * vw * 1.45 + vw * 0.5) + 'px'; });
    // progress map ticks
    const map = $('#map');
    $$('.tick', map).forEach(t => t.remove());
    anchors.forEach(a => { const t = document.createElement('i'); t.className = 'tick'; t.style.left = (a / total * 100) + '%'; map.appendChild(t); });
    p = target = ratio * total;
  }

  // ---------- input ----------
  let p = 0, target = 0;
  const nudge = d => { target = clamp(target + d, 0, total); };
  addEventListener('wheel', e => {
    e.preventDefault();
    const unit = e.deltaMode === 1 ? 32 : e.deltaMode === 2 ? vh : 1;
    const d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    nudge(d * unit);
  }, { passive: false });

  const goTo = dir => {
    const cur = target;
    const next = dir > 0 ? anchors.find(a => a > cur + 4) : [...anchors].reverse().find(a => a < cur - 4);
    if (next !== undefined) target = next;
  };
  addEventListener('keydown', e => {
    if (['ArrowRight', 'ArrowDown', 'PageDown', ' '].includes(e.key)) { e.preventDefault(); goTo(1); }
    else if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(e.key)) { e.preventDefault(); goTo(-1); }
    else if (e.key === 'Home') target = 0;
    else if (e.key === 'End') target = total;
    else if (e.key === 'h' || e.key === 'H') honk(true);
  });

  // touch: drag in either axis, fling on release
  let tx = 0, ty = 0, tv = 0, tLast = 0;
  addEventListener('touchstart', e => { const t = e.touches[0]; tx = t.clientX; ty = t.clientY; tv = 0; tLast = performance.now(); }, { passive: true });
  addEventListener('touchmove', e => {
    const t = e.touches[0], dx = tx - t.clientX, dy = ty - t.clientY;
    const d = (Math.abs(dx) > Math.abs(dy) ? dx : dy) * 1.3;
    const now = performance.now(); tv = d / Math.max(1, now - tLast); tLast = now;
    tx = t.clientX; ty = t.clientY; nudge(d);
  }, { passive: true });
  addEventListener('touchend', () => nudge(tv * 280), { passive: true });

  // ---------- horn ----------
  // Browsers only play sound after a click, key press or touch (scrolling does not count).
  // The first such gesture unlocks audio; the chip in the footer shows the state.
  const AC = window.AudioContext || window.webkitAudioContext;
  let actx, kick = 0, hornEl;
  const soundOn = () => !!actx && actx.state === 'running';
  const showSound = () => {};
  function beep() {
    const t0 = actx.currentTime + 0.02, out = actx.createGain(), lp = actx.createBiquadFilter();
    lp.type = 'lowpass'; lp.frequency.value = 2200;
    const g = out.gain, V = 0.3;
    g.setValueAtTime(0.0001, t0); g.linearRampToValueAtTime(V, t0 + 0.02);
    g.setValueAtTime(V, t0 + 0.14); g.linearRampToValueAtTime(0.0001, t0 + 0.17);
    g.linearRampToValueAtTime(V, t0 + 0.22);
    g.setValueAtTime(V, t0 + 0.5); g.linearRampToValueAtTime(0.0001, t0 + 0.62);
    lp.connect(out); out.connect(actx.destination);
    [415, 523].forEach(f => { const o = actx.createOscillator(); o.type = 'sawtooth'; o.frequency.value = f; o.connect(lp); o.start(t0); o.stop(t0 + 0.64); });
  }
  function unlock() {
    try {
      if (AC) { actx = actx || new AC(); if (actx.state !== 'running') return actx.resume().then(showSound, () => {}); }
    } catch (_) {}
    showSound(); return Promise.resolve();
  }
  // gesture = true when called from a click / key press (allowed to start audio)
  function honk(gesture) {
    kick = 1;
    try {
      if (gesture === true) {
        const p = unlock();
        if (AC) return void p.then(() => { if (soundOn()) beep(); });
        hornEl = hornEl || new Audio('assets/horn.wav'); hornEl.currentTime = 0; hornEl.play().catch(() => {});   // very old browsers
      } else if (soundOn()) beep();
    } catch (_) {}
  }
  ['pointerdown', 'keydown', 'touchend', 'click'].forEach(ev => addEventListener(ev, unlock, { passive: true }));
  car.addEventListener('click', () => honk(true));
  car.addEventListener('keydown', e => { if (e.key === 'Enter') honk(true); });

  // ---------- exhaust ----------
  const puffs = [];
  function spawnPuff(worldAnchor, strength) {
    if (reduce || puffs.length > 40) return;
    const el = document.createElement('div'); el.className = 'puff'; puffLayer.appendChild(el);
    puffs.push({
      el, wx: worldAnchor + carX + carW * 0.02 + (Math.random() - 0.5) * 6,
      y: carTop + carH * 0.905 + chassisY, vx: -(40 + Math.random() * 50) * strength, vy: -(14 + Math.random() * 22),
      age: 0, life: 0.9 + Math.random() * 0.8, s0: 0.35 + Math.random() * 0.2, s1: 1.3 + Math.random() * 0.9 * strength
    });
  }

  // ---------- finale ----------
  // restaurant.webp (1159 × 806) and the blank sign band on it
  const ILL = { w: 1159, h: 806, x: 299, y: 268, fw: 585, fh: 87 };
  const fn = $('#finale'), fnStage = $('.fn-stage'), fnRest = $('.fn-rest'), fnSign = $('.fn-sign'), fnLogo = $('.fn-logo'),
    fnT1 = $('.fn-t1'), fnT2 = $('.fn-t2'), lock = $('.ui.top .lockup');
  let FL = {};
  function layoutFinale() {
    const stageH = $('#road').getBoundingClientRect().top;
    let h = vh * 0.37, w = h * ILL.w / ILL.h;
    if (w > vw * 0.86) { w = vw * 0.86; h = w * ILL.h / ILL.w; }
    const top = stageH - h, k = w / ILL.w;
    fnStage.style.height = stageH + 'px';
    Object.assign(fnRest.style, { left: (vw - w) / 2 + 'px', top: top + 'px', width: w + 'px', height: h + 'px' });
    Object.assign(fnSign.style, { left: ILL.x * k + 'px', top: ILL.y * k + 'px', width: ILL.fw * k + 'px', height: ILL.fh * k + 'px' });
    FL = { h, drop: top + (ILL.y + ILL.fh) * k + 20 };
  }
  const seg = (f, a, b) => clamp((f - a) / (b - a), 0, 1);
  const eo = t => 1 - Math.pow(1 - t, 3);
  const bounceOut = t => { const n = 7.5625, d = 2.75; if (t < 1 / d) return n * t * t; if (t < 2 / d) return n * (t -= 1.5 / d) * t + .75; if (t < 2.5 / d) return n * (t -= 2.25 / d) * t + .9375; return n * (t -= 2.625 / d) * t + .984375; };
  let finOn = false;
  function finale(f) {
    const on = f > 0.001;
    if (on !== finOn) { finOn = on; fn.classList.toggle('on', on); }
    if (!on) return;
    // 1 · "Every restaurant opens." arrives while the taxi drives out
    const t1 = eo(seg(f, 0.04, 0.27));
    fnT1.style.transform = `translate3d(${(1 - t1) * vw * 0.7}px,0,0)`;
    fnT1.style.opacity = t1.toFixed(3);
    // 2 · the restaurant rises from behind the road
    const rise = eo(seg(f, 0.29, 0.55));
    fnRest.style.transform = `translate3d(0,${(1 - rise) * (FL.h + 30)}px,0)`;
    // 3 · once the restaurant is up, "Dhaba arrives." joins the first line
    const t2 = eo(seg(f, 0.58, 0.86));
    fnT2.style.transform = `translate3d(0,${(1 - t2) * 40}px,0)`;
    fnT2.style.opacity = t2.toFixed(3);
  }

  // ---------- simulation state ----------
  let last = performance.now(), prevRoll = 0, vS = 0, vPrev = 0, aS = 0, lead = 0, carX = 0, chassisY = 0;
  let arrived = false, pitch = 0, pitchV = 0, bounce = 0, bounceV = 0, roll = 0, puffAcc = 0, clock = 0;
  const introStart = performance.now() + 350, introDur = 1900;

  function frame(now) {
    const dt = Math.min(0.05, (now - last) / 1000); last = now; clock += dt;

    // odometer
    p += (target - p) * damp(5.5, dt);
    if (Math.abs(target - p) < 0.05) p = target;
    const wp = Math.min(p, worldMax), fin = clamp((p - worldMax) / finRun, 0, 1);

    // intro: taxi drives in from off-screen left
    const it = clamp((now - introStart) / introDur, 0, 1);
    const ie = 1 - Math.pow(1 - it, 3);
    const intro = -(baseX + carW + 60) * (1 - ie);

    // lead: fast travel lets the taxi run slightly ahead of the camera
    const vWorld = vS;
    lead += (clamp(vWorld * 0.03, -40, 70) - lead) * damp(2.4, dt);
    // finale: the taxi accelerates out of frame to the right
    const exit = Math.pow(clamp(fin / 0.24, 0, 1), 2) * (vw - baseX + 60);
    carX = baseX + lead + intro + exit;

    // rolling distance (world under car + car's own screen motion)
    const rollPos = wp + carX;
    const dDist = rollPos - prevRoll; prevRoll = rollPos;
    roll += dDist / wheelR;
    const vInst = dDist / Math.max(dt, 1e-4);
    vS += (vInst - vS) * damp(9, dt);
    const aInst = (vS - vPrev) / Math.max(dt, 1e-4); vPrev = vS;
    aS += (clamp(aInst, -9000, 9000) - aS) * damp(7, dt);

    // chassis pitch spring (accel → nose up)
    const pitchTarget = clamp(-aS * 0.00025, -1.1, 1.1);
    pitchV += ((pitchTarget - pitch) * 90 - pitchV * 9) * dt; pitch += pitchV * dt;
    // vertical bounce spring (honk / bumps)
    if (kick) { bounceV -= 70; pitchV -= 18; kick = 0; for (let i = 0; i < 5; i++) spawnPuff(wp, 1.4); }
    bounceV += (-bounce * 260 - bounceV * 11) * dt; bounce += bounceV * dt;

    const speedF = clamp(Math.abs(vS) / 900, 0, 1);
    const bumps = (Math.sin(rollPos * 0.043) + 0.6 * Math.sin(rollPos * 0.0127 + 1.3)) * 1.3 * speedF;
    const idle = reduce ? 0 : (Math.abs(vS) < 25 ? (Math.random() - 0.5) * 0.7 : 0);
    chassisY = bumps + idle + bounce;

    // ---- write transforms ----
    world.style.transform = `translate3d(${-wp}px,0,0)`;
    far.style.transform = `translate3d(${-wp * 0.35}px,0,0)`;
    air.style.transform = `translate3d(${-wp * 0.6}px,0,0)`;
    fore.style.transform = `translate3d(${-wp * 1.45}px,0,0)`;
    dash.style.backgroundPosition = `${-wp}px 0`;
    kerb.style.backgroundPosition = `${-wp}px 0`;

    car.style.transform = `translate3d(${carX}px,0,0)`;
    chassis.style.transform = `translate3d(0,${chassisY}px,0) rotate(${pitch}deg)`;
    chassis.style.transformOrigin = `${(WHEELS[0][0] + WHEELS[1][0]) / 2 / SRC_W * 100}% ${WHEELS[0][1] / SRC_H * 100}%`;
    shadow.style.transform = `scaleX(${1 - chassisY * 0.004})`;
    const deg = roll * 57.2958;
    const omega = Math.abs(vS) / wheelR;
    const blur = omega > 22 ? Math.min(1.6, (omega - 22) * 0.05) : 0;
    wheels.forEach((w, n) => { w.style.transform = `rotate(${deg + n * 137}deg)`; w.style.filter = blur ? `blur(${blur.toFixed(2)}px)` : 'none'; });

    // photo parallax + oncoming tuk-tuk
    // which stops are near the camera: lazy-load, reveal, parallax
    const near = stops.map((s, k) => stopX[k] < wp + vw * 1.6 && stopX[k] + stopW[k] > wp - vw * 0.6);
    stops.forEach((s, k) => {
      if (stopX[k] < wp + vw * 2.6 && stopX[k] + stopW[k] > wp - vw) loadImgs(lazy[k]);
      const on = stopX[k] < wp + vw * 0.72 && stopX[k] + stopW[k] > wp + vw * 0.12;
      if (on !== s._on) { s._on = on; s.classList.toggle('on', on); }
    });
    photos.forEach(ph => {
      if (!near[ph.i]) return;
      ph.el.style.transform = `translate3d(${(wp - stopX[ph.i] - vw * 0.5) * (1 - ph.depth)}px,0,0)`;
    });
    oncoming.forEach(o => {
      if (!near[o.i]) return;
      o.el.style.left = (+o.el.dataset.from * vw / 100) + 'px';
      const d = wp - stopX[o.i];
      o.el.style.transform = `translate3d(${-d * +o.el.dataset.rate}px,${Math.sin(d * 0.05) * 1.5}px,0)`;
    });
    // slide counter
    let cur = slideIdx[0];
    for (const k of slideIdx) if (stopX[k] <= wp + vw * 0.4) cur = k;
    if (p >= total - 2) cur = slideIdx[slideIdx.length - 1];
    if (cur !== counter._cur) {
      counter._cur = cur;
      counter.innerHTML = `<b>${stops[cur].dataset.n}</b> / ${String(window.DECK_LAST).padStart(2, '0')} &nbsp;·&nbsp; <em>${stops[cur].dataset.label}</em>`;
    }
    flyers.forEach((f, i) => { f.style.transform = `translate3d(0,${Math.sin(clock * 0.9 + i) * 12}px,0) rotate(${Math.sin(clock * 0.6 + i) * 3}deg)`; });

    // ghost words fade in only around their own stop
    ghosts.forEach((g, k) => {
      if (!near[k]) { if (g._o !== 0) { g._o = 0; g.style.opacity = 0; } return; } g._o = 1;
      const sc = stopX[k] + stopW[k] * 0.5;
      g.style.opacity = (0.075 * clamp(1 - Math.abs(wp + vw * 0.5 - sc) / (stopW[k] * 0.5), 0, 1)).toFixed(3);
    });

    // sky + ink blend across stop boundaries
    const c = wp + vw * 0.5, zone = vw * 0.35;
    let i = 0; while (i < stopX.length - 1 && c >= stopX[i + 1]) i++;
    let a = i, b = i, t = 0;
    if (i < stopX.length - 1 && c > stopX[i + 1] - zone) { b = i + 1; t = (c - (stopX[i + 1] - zone)) / (2 * zone); }
    else if (i > 0 && c < stopX[i] + zone) { a = i - 1; t = (c - (stopX[i] - zone)) / (2 * zone); }
    t = t * t * (3 - 2 * t);
    root.style.setProperty('--bg', mix(pal[a].bg, pal[b].bg, t));
    root.style.setProperty('--ink', mix(pal[a].ink, pal[b].ink, t));

    // exhaust: idle putter + accel bursts
    const rate = (Math.abs(vS) < 25 ? 1.4 : 0) + Math.max(0, aS) * 0.0022 + Math.abs(vS) * 0.006;
    puffAcc += rate * dt;
    while (puffAcc > 1) { puffAcc--; spawnPuff(wp, 0.6 + speedF); }
    for (let k = puffs.length - 1; k >= 0; k--) {
      const q = puffs[k]; q.age += dt;
      if (q.age > q.life) { q.el.remove(); puffs.splice(k, 1); continue; }
      const u = q.age / q.life;
      q.wx += q.vx * dt; q.y += q.vy * dt;
      q.el.style.transform = `translate3d(${q.wx - wp}px,${q.y}px,0) scale(${lerp(q.s0, q.s1, u)})`;
      q.el.style.opacity = (1 - u) * 0.85;
    }

    // arrival: once the taxi has parked at the end of the road, it honks (once per arrival)
    // finale scrub + horn the moment "Every restaurant opens." reaches centre
    finale(fin);
    if (fin >= 0.09 && !arrived) { arrived = true; honk(); }     // horn as the taxi drives past
    if (fin < 0.04) arrived = false;
    // DHABA × INHAUS lockup: only on the first slide and in the finale, faded by scroll
    const lk = Math.max(1 - seg(wp, vw * 0.06, vw * 0.38), seg(fin, 0.05, 0.2));
    if (lk !== lock._o) { lock._o = lk; lock.style.opacity = lk.toFixed(3); lock.style.visibility = lk > 0 ? 'visible' : 'hidden'; }

    $('#map-taxi').style.left = (p / total * 100) + '%';
    requestAnimationFrame(frame);
  }

  window.__road = { jump: x => { p = target = x; }, anchors: () => anchors };
  addEventListener('resize', measure);
  measure();
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(measure);
  prevRoll = Math.min(p, worldMax);
  requestAnimationFrame(t => { last = t; requestAnimationFrame(frame); });
})();
