// Minimal Tesla-style molecular lattice (Three.js)
// - Drag to rotate (OrbitControls)
// - Smooth damping
// - Subtle auto-rotate

import * as THREE from '../vendor/three/build/three.module.js';
import { OrbitControls } from '../vendor/three/examples/jsm/controls/OrbitControls.js';

export function initMolecule3D(container) {
  if (!container) return () => {};

  // clear fallback background if any
  container.style.backgroundImage = '';

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setClearColor(0x000000, 0);
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
  camera.position.set(0, 0.1, 7.2);

  // Lights (clean, high-end)
  const key = new THREE.DirectionalLight(0xffffff, 1.15);
  key.position.set(4, 6, 6);
  scene.add(key);

  const fill = new THREE.DirectionalLight(0xffffff, 0.55);
  fill.position.set(-5, 2, 4);
  scene.add(fill);

  const amb = new THREE.AmbientLight(0xffffff, 0.55);
  scene.add(amb);

  // Group
  const group = new THREE.Group();
  scene.add(group);

  // Materials (clean, science-like)
  const lineMat = new THREE.LineBasicMaterial({ color: 0xc7cfdd, transparent: true, opacity: 0.85 });
  const sphereMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.55, metalness: 0.02 });
  const accentMat = new THREE.MeshStandardMaterial({ color: 0x1f5fff, roughness: 0.38, metalness: 0.08 });
  const warmMat = new THREE.MeshStandardMaterial({ color: 0xffc857, roughness: 0.40, metalness: 0.05 });
  const coolMat = new THREE.MeshStandardMaterial({ color: 0x7dd3fc, roughness: 0.40, metalness: 0.05 });

  // Geometry
  const sphereGeo = new THREE.SphereGeometry(0.075, 24, 24);

  // Build a C-S-H gel-like network: clustered nodes + random bridges
  const points = [];
  const rand = (a, b) => a + Math.random() * (b - a);
  const clusters = [
    new THREE.Vector3(-1.4, 0.6, 0.4),
    new THREE.Vector3(1.2, -0.2, 0.2),
    new THREE.Vector3(0.1, 1.0, -0.9),
    new THREE.Vector3(-0.3, -1.1, -0.4)
  ];
  clusters.forEach(c => {
    for (let i = 0; i < 26; i++) {
      points.push(new THREE.Vector3(
        c.x + rand(-0.55, 0.55),
        c.y + rand(-0.55, 0.55),
        c.z + rand(-0.55, 0.55)
      ));
    }
  });
  // a few free nodes
  for (let i = 0; i < 18; i++) {
    points.push(new THREE.Vector3(rand(-2.0, 2.0), rand(-1.6, 1.6), rand(-1.6, 1.6)));
  }

  // Spheres (multi-size via separate instanced meshes)
  const smallGeo = new THREE.SphereGeometry(0.055, 18, 18);
  const medGeo = new THREE.SphereGeometry(0.080, 22, 22);
  const bigGeo = new THREE.SphereGeometry(0.105, 24, 24);

  const small = [];
  const medium = [];
  const large = [];
  points.forEach((p, i) => {
    const r = (Math.sin(i * 12.9898) * 43758.5453) % 1; // deterministic-ish
    if (r < 0.55) small.push(p);
    else if (r < 0.85) medium.push(p);
    else large.push(p);
  });

  const spheresSmall = new THREE.InstancedMesh(smallGeo, sphereMat, small.length);
  const spheresMed = new THREE.InstancedMesh(medGeo, coolMat, medium.length);
  const spheresBig = new THREE.InstancedMesh(bigGeo, warmMat, large.length);

  const dummy = new THREE.Object3D();
  small.forEach((p, i) => { dummy.position.copy(p); dummy.scale.setScalar(1); dummy.updateMatrix(); spheresSmall.setMatrixAt(i, dummy.matrix); });
  medium.forEach((p, i) => { dummy.position.copy(p); dummy.scale.setScalar(1); dummy.updateMatrix(); spheresMed.setMatrixAt(i, dummy.matrix); });
  large.forEach((p, i) => { dummy.position.copy(p); dummy.scale.setScalar(1); dummy.updateMatrix(); spheresBig.setMatrixAt(i, dummy.matrix); });
  group.add(spheresSmall);
  group.add(spheresMed);
  group.add(spheresBig);

  // Accent spheres (reactive sites)
  const accentCount = 14;
  const accents = new THREE.InstancedMesh(medGeo, accentMat, accentCount);
  for (let i = 0; i < accentCount; i++) {
    const idx = Math.floor((i / accentCount) * points.length);
    dummy.position.copy(points[idx]);
    dummy.scale.setScalar(1.10);
    dummy.updateMatrix();
    accents.setMatrixAt(i, dummy.matrix);
  }
  group.add(accents);

  // Connections (local network)
  const segs = [];
  const thresh = 0.62;
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const d = points[i].distanceTo(points[j]);
      if (d > thresh) continue;
      // keep it minimal
      if ((i + j) % 4 !== 0) continue;
      segs.push(points[i].x, points[i].y, points[i].z);
      segs.push(points[j].x, points[j].y, points[j].z);
    }
  }
  const lineGeo = new THREE.BufferGeometry();
  lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(segs, 3));
  const lines = new THREE.LineSegments(lineGeo, lineMat);
  group.add(lines);

  // Labels (canvas sprites) + leader lines
  function makeLabel(text) {
    const c = document.createElement('canvas');
    const ctx = c.getContext('2d');
    const padX = 14;
    const padY = 9;
    ctx.font = '600 22px Inter, system-ui, -apple-system, Arial';
    const w = Math.ceil(ctx.measureText(text).width + padX * 2);
    const h = 44;
    c.width = w * 2;
    c.height = h * 2;
    ctx.scale(2, 2);
    ctx.font = '600 22px Inter, system-ui, -apple-system, Arial';
    ctx.fillStyle = 'rgba(255,255,255,0.92)';
    ctx.strokeStyle = 'rgba(0,0,0,0.06)';
    ctx.lineWidth = 1;
    roundRect(ctx, 0.5, 0.5, w-1, h-1, 999);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#111827';
    ctx.fillText(text, padX, 30);
    const tex = new THREE.CanvasTexture(c);
    tex.minFilter = THREE.LinearFilter;
    const mat = new THREE.SpriteMaterial({ map: tex, transparent: true });
    const spr = new THREE.Sprite(mat);
    spr.scale.set(w/90, h/90, 1);
    return spr;
  }

  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  const labelItems = [
    { text: 'GGBFS', p: new THREE.Vector3(1.10, 0.85, 0.15), a: new THREE.Vector3(0.35, 0.25, 0.10) },
    { text: 'Cement', p: new THREE.Vector3(-1.15, 0.35, 0.25), a: new THREE.Vector3(-0.40, 0.12, 0.10) },
    { text: 'Sand', p: new THREE.Vector3(1.05, -0.55, 0.10), a: new THREE.Vector3(0.42, -0.18, 0.05) },
    { text: 'Calcium Hydroxide', p: new THREE.Vector3(-1.25, -0.55, 0.20), a: new THREE.Vector3(-0.45, -0.22, 0.05) },
    { text: 'Admixture', p: new THREE.Vector3(0.10, 1.15, -0.35), a: new THREE.Vector3(0.05, 0.40, -0.12) },
    { text: 'Hydration Product', p: new THREE.Vector3(0.05, -1.18, -0.25), a: new THREE.Vector3(0.02, -0.40, -0.10) }
  ];

  const leaderMat = new THREE.LineBasicMaterial({ color: 0x9aa6bb, transparent: true, opacity: 0.75 });
  const leaders = [];
  labelItems.forEach(item => {
    const spr = makeLabel(item.text);
    spr.position.copy(item.p);
    spr.center.set(0, 0.5);
    group.add(spr);
    const g = new THREE.BufferGeometry().setFromPoints([item.p.clone().add(new THREE.Vector3(-0.2, 0, 0)), item.a]);
    const ln = new THREE.Line(g, leaderMat);
    group.add(ln);
    leaders.push({ line: ln, from: item.p, to: item.a });
  });

  // Controls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.06;
  controls.enablePan = false;
  controls.minDistance = 4.8;
  controls.maxDistance = 10.0;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 0.6;
  controls.rotateSpeed = 0.55;

  // Resize
  function resize() {
    const w = container.clientWidth || 1;
    const h = container.clientHeight || 1;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
  }
  const ro = new ResizeObserver(resize);
  ro.observe(container);
  resize();

  // Animation loop
  let raf = 0;
  const clock = new THREE.Clock();
  function tick() {
    const t = clock.getElapsedTime();
    // subtle breathing
    group.rotation.x = Math.sin(t * 0.35) * 0.06;
    controls.update();
    renderer.render(scene, camera);
    raf = requestAnimationFrame(tick);
  }
  tick();

  // Cleanup
  return () => {
    cancelAnimationFrame(raf);
    ro.disconnect();
    controls.dispose();
    renderer.dispose();
    container.innerHTML = '';
  };
}
