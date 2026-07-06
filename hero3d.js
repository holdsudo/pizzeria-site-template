import * as THREE from './assets/vendor-three.module.min.js';

const stage = document.querySelector('[data-hero-stage]');
const canvas = document.querySelector('#hero-scene');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function emberTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const g = c.getContext('2d');
  const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, 'rgba(255, 214, 140, 1)');
  grad.addColorStop(.4, 'rgba(224, 163, 59, .55)');
  grad.addColorStop(1, 'rgba(224, 163, 59, 0)');
  g.fillStyle = grad;
  g.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(c);
}

function start() {
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, .1, 20);
  camera.position.z = 4.4;

  const group = new THREE.Group();
  scene.add(group);

  const loader = new THREE.TextureLoader();
  const posterTex = loader.load((window.SITE && window.SITE.hero.poster) || 'assets/promo-worldcup.jpg', () => {
    stage.classList.add('is-3d');
    renderer.render(scene, camera);
  });
  posterTex.colorSpace = THREE.SRGBColorSpace;

  // poster plane (1080x1440 source -> 3:4)
  const poster = new THREE.Mesh(
    new THREE.PlaneGeometry(1.86, 2.48),
    new THREE.MeshBasicMaterial({ map: posterTex })
  );
  group.add(poster);

  // warm glow behind the poster
  const glow = new THREE.Sprite(new THREE.SpriteMaterial({
    map: emberTexture(),
    color: 0xe0a33b,
    transparent: true,
    opacity: .5,
    depthWrite: false
  }));
  glow.scale.set(4.4, 4.4, 1);
  glow.position.z = -.6;
  scene.add(glow);

  // drifting embers
  const COUNT = 130;
  const positions = new Float32Array(COUNT * 3);
  const speeds = new Float32Array(COUNT);
  for (let i = 0; i < COUNT; i += 1) {
    positions[i * 3] = (Math.random() - .5) * 4.4;
    positions[i * 3 + 1] = (Math.random() - .5) * 5;
    positions[i * 3 + 2] = -1 + Math.random() * 2.2;
    speeds[i] = .0015 + Math.random() * .004;
  }
  const emberGeo = new THREE.BufferGeometry();
  emberGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const embers = new THREE.Points(emberGeo, new THREE.PointsMaterial({
    map: emberTexture(),
    color: 0xf5c433,
    size: .085,
    transparent: true,
    opacity: .75,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  }));
  scene.add(embers);

  const targetRot = { x: -.04, y: -.14 };
  const rot = { x: -.04, y: -.14 };

  function onPointer(event) {
    const rect = stage.getBoundingClientRect();
    const nx = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((event.clientY - rect.top) / rect.height) * 2 - 1;
    targetRot.y = nx * .3;
    targetRot.x = ny * -.22;
  }
  function onLeave() {
    targetRot.x = -.04;
    targetRot.y = -.14;
  }
  if (window.matchMedia('(hover: hover)').matches) {
    stage.addEventListener('pointermove', onPointer);
    stage.addEventListener('pointerleave', onLeave);
  }

  function resize() {
    const w = canvas.clientWidth || 1;
    const h = canvas.clientHeight || 1;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener('resize', () => { resize(); if (reduceMotion) renderer.render(scene, camera); });

  let t = 0;
  function frame() {
    t += 1;
    rot.x += (targetRot.x - rot.x) * .06;
    rot.y += (targetRot.y - rot.y) * .06;
    group.rotation.x = rot.x;
    group.rotation.y = rot.y;
    group.position.y = Math.sin(t / 90) * .045;
    const pos = emberGeo.attributes.position;
    for (let i = 0; i < COUNT; i += 1) {
      let y = pos.getY(i) + speeds[i];
      if (y > 2.6) y = -2.6;
      pos.setY(i, y);
    }
    pos.needsUpdate = true;
    renderer.render(scene, camera);
    requestAnimationFrame(frame);
  }

  if (reduceMotion) {
    group.rotation.x = -.04;
    group.rotation.y = -.14;
    renderer.render(scene, camera);
  } else {
    frame();
  }
}

try {
  if (stage && canvas && window.WebGLRenderingContext) start();
} catch (err) {
  // WebGL unavailable — the static poster fallback stays visible
}
