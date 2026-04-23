// World map (countries) with hover highlight + optional points/arcs later
// Data source: Natural Earth (admin_0 countries), converted to GeoJSON.

const DATA_URL = './img/maps/world-countries-110m.geojson';

// Export ports (China) + regional customers (center points)
const PORTS = [
  { name: 'Tianjin',   lat: 39.084, lon: 117.200 },
  { name: 'Qingdao',   lat: 36.067, lon: 120.383 },
  { name: 'Shanghai',  lat: 31.230, lon: 121.473 },
  { name: 'Ningbo',    lat: 29.868, lon: 121.544 },
  { name: 'Xiamen',    lat: 24.479, lon: 118.089 },
  { name: 'Shenzhen',  lat: 22.543, lon: 114.058 },
  { name: 'Guangzhou', lat: 23.129, lon: 113.264 }
];

const REGIONS = [
  { name: 'North America',  lat: 39.0, lon: -98.0 },
  { name: 'Europe',         lat: 51.0, lon: 10.0 },
  { name: 'Southern Africa',lat: -29.0, lon: 24.0 },
  { name: 'South Asia / Middle East', lat: 23.0, lon: 60.0 },
  { name: 'East Asia',      lat: 36.0, lon: 138.0 }
];

// Simple equirectangular projection
function project(lon, lat, w, h) {
  const x = (lon + 180) / 360 * w;
  const y = (90 - lat) / 180 * h;
  return [x, y];
}

function pathForGeometry(ctx, geom, w, h) {
  const type = geom.type;
  const coords = geom.coordinates;

  const drawRing = (ring) => {
    for (let i = 0; i < ring.length; i++) {
      const [lon, lat] = ring[i];
      const [x, y] = project(lon, lat, w, h);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
  };

  if (type === 'Polygon') {
    ctx.beginPath();
    coords.forEach(ring => drawRing(ring));
    return;
  }
  if (type === 'MultiPolygon') {
    ctx.beginPath();
    coords.forEach(poly => poly.forEach(ring => drawRing(ring)));
    return;
  }
}

export async function initWorldMapHover(container) {
  if (!container) return () => {};
  container.innerHTML = '';

  const canvas = document.createElement('canvas');
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.display = 'block';
  container.appendChild(canvas);

  const tooltip = document.createElement('div');
  tooltip.style.position = 'absolute';
  tooltip.style.pointerEvents = 'none';
  tooltip.style.padding = '6px 10px';
  tooltip.style.borderRadius = '999px';
  tooltip.style.fontSize = '12px';
  tooltip.style.fontWeight = '600';
  tooltip.style.letterSpacing = '.2px';
  tooltip.style.background = 'rgba(255,255,255,.92)';
  tooltip.style.border = '1px solid rgba(11,18,32,.10)';
  tooltip.style.color = '#0b1220';
  tooltip.style.boxShadow = '0 10px 30px rgba(11,18,32,.10)';
  tooltip.style.opacity = '0';
  tooltip.style.transform = 'translate(-50%, -120%)';
  tooltip.style.transition = 'opacity 160ms ease';
  container.appendChild(tooltip);

  const res = await fetch(DATA_URL);
  const geo = await res.json();

  let features = geo.features || [];
  // precompute minimal props
  features = features.map(f => ({
    name: f.properties?.ADMIN || 'Unknown',
    iso2: f.properties?.ISO_A2 || '',
    geometry: f.geometry
  }));

  const ctx = canvas.getContext('2d');
  let dpr = Math.min(window.devicePixelRatio || 1, 2);
  let W = 1, H = 1;

  function resize() {
    W = Math.max(1, container.clientWidth | 0);
    H = Math.max(1, container.clientHeight | 0);
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    draw();
  }

  let hovered = null;

  // simple animated shipments along arcs
  const startT = performance.now();

  function draw() {
    // background
    ctx.clearRect(0, 0, W, H);
    const grd = ctx.createRadialGradient(W * 0.5, H * 0.25, 10, W * 0.5, H * 0.25, Math.max(W, H));
    grd.addColorStop(0, '#ffffff');
    grd.addColorStop(0.6, '#f6f8fb');
    grd.addColorStop(1, '#eef2f8');
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, W, H);

    // map base
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.fillStyle = 'rgba(233, 238, 247, 0.95)';
    ctx.strokeStyle = 'rgba(120, 130, 150, 0.20)';
    ctx.lineWidth = 0.7;
    features.forEach(f => {
      if (!f.geometry) return;
      pathForGeometry(ctx, f.geometry, W, H);
      ctx.fill('evenodd');
      ctx.stroke();
    });

    // hover highlight
    if (hovered && hovered.geometry) {
      pathForGeometry(ctx, hovered.geometry, W, H);
      ctx.fillStyle = 'rgba(31, 95, 255, 0.22)';
      ctx.strokeStyle = 'rgba(31, 95, 255, 0.55)';
      ctx.lineWidth = 1.2;
      ctx.fill('evenodd');
      ctx.stroke();
    }

    // --- Overlays: ports, regions, arcs with moving "shipment" particles ---
    const t = (performance.now() - startT) / 1000;

    // helper: equirect project
    const prj = (lon, lat) => project(lon, lat, W, H);

    // arcs (ports -> regions)
    ctx.lineWidth = 1.6;
    ctx.strokeStyle = 'rgba(31,95,255,0.22)';
    PORTS.forEach(p => {
      const [x1, y1] = prj(p.lon, p.lat);
      REGIONS.forEach((r, ri) => {
        const [x2, y2] = prj(r.lon, r.lat);
        // arc control point
        const mx = (x1 + x2) / 2;
        const my = Math.min(y1, y2) - 80;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.quadraticCurveTo(mx, my, x2, y2);
        ctx.stroke();

        // shipment particle on arc (moving dot)
        const speed = 0.12 + ri * 0.018;
        const phase = (t * speed + (ri * 0.12)) % 1;
        const u = phase;
        // quadratic bezier point
        const bx = (1-u)*(1-u)*x1 + 2*(1-u)*u*mx + u*u*x2;
        const by = (1-u)*(1-u)*y1 + 2*(1-u)*u*my + u*u*y2;
        const glow = 0.55 + 0.45 * Math.sin((t + ri) * 2.0);
        ctx.fillStyle = `rgba(235,240,248,${0.65*glow})`;
        ctx.beginPath();
        ctx.arc(bx, by, 2.2, 0, Math.PI*2);
        ctx.fill();
        // small tail
        ctx.fillStyle = 'rgba(31,95,255,0.35)';
        ctx.beginPath();
        ctx.arc(bx-2, by+1, 1.4, 0, Math.PI*2);
        ctx.fill();
      });
    });

    // region points
    REGIONS.forEach((r, i) => {
      const [x, y] = prj(r.lon, r.lat);
      const pulse = 1 + (Math.sin(t * 2.0 + i) * 0.5 + 0.5) * 1.8;
      ctx.fillStyle = 'rgba(255,255,255,0.95)';
      ctx.beginPath();
      ctx.arc(x, y, 3.8, 0, Math.PI*2);
      ctx.fill();
      ctx.fillStyle = `rgba(255,255,255,${0.12 / pulse})`;
      ctx.beginPath();
      ctx.arc(x, y, 9 * pulse, 0, Math.PI*2);
      ctx.fill();
    });

    // port points
    PORTS.forEach((p, i) => {
      const [x, y] = prj(p.lon, p.lat);
      const pulse = 1 + (Math.sin(t * 2.2 + i) * 0.5 + 0.5) * 1.2;
      ctx.fillStyle = 'rgba(31,95,255,0.95)';
      ctx.beginPath();
      ctx.arc(x, y, 3.4, 0, Math.PI*2);
      ctx.fill();
      ctx.fillStyle = `rgba(31,95,255,${0.10 / pulse})`;
      ctx.beginPath();
      ctx.arc(x, y, 8.5 * pulse, 0, Math.PI*2);
      ctx.fill();
    });
  }

  function hitTest(x, y) {
    for (let i = 0; i < features.length; i++) {
      const f = features[i];
      if (!f.geometry) continue;
      pathForGeometry(ctx, f.geometry, W, H);
      if (ctx.isPointInPath(x, y, 'evenodd')) return f;
    }
    return null;
  }

  function onMove(e) {
    const r = canvas.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    const f = hitTest(x, y);
    if (f?.name !== hovered?.name) {
      hovered = f;
      draw();
    }
    if (hovered) {
      tooltip.textContent = hovered.name;
      tooltip.style.left = `${x}px`;
      tooltip.style.top = `${y}px`;
      tooltip.style.opacity = '1';
      canvas.style.cursor = 'pointer';
    } else {
      tooltip.style.opacity = '0';
      canvas.style.cursor = 'default';
    }
  }

  function onLeave() {
    hovered = null;
    tooltip.style.opacity = '0';
    canvas.style.cursor = 'default';
    draw();
  }

  const ro = new ResizeObserver(resize);
  ro.observe(container);
  resize();

  // animation loop for shipments/pulses
  let raf = 0;
  function tick() {
    draw();
    raf = requestAnimationFrame(tick);
  }
  tick();

  canvas.addEventListener('mousemove', onMove);
  canvas.addEventListener('mouseleave', onLeave);

  return () => {
    cancelAnimationFrame(raf);
    ro.disconnect();
    canvas.removeEventListener('mousemove', onMove);
    canvas.removeEventListener('mouseleave', onLeave);
    container.innerHTML = '';
  };
}
