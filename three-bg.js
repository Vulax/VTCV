import * as THREE from 'https://unpkg.com/three@0.158.0/build/three.module.js';

const canvas = document.getElementById('bg-canvas');

if (canvas) {
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 10, 28);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  /* === GRID PARAMS === */
  const sizeX = 60;
  const sizeY = 40;
  const step = 2;
  const lines = [];

  const material = new THREE.LineBasicMaterial({
    color: 0x7c3aed, // deep purple
    transparent: true,
    opacity: 0.35
  });

  const glowMaterial = new THREE.LineBasicMaterial({
  color: 0x8b5cf6, // soft violet
  transparent: true,
  opacity: 0.12,
});


  /* === GENERATE LINES === */
  for (let x = -sizeX / 2; x <= sizeX / 2; x += step) {
    const points = [
      new THREE.Vector3(x, 0, -sizeY / 2),
      new THREE.Vector3(x, 0, sizeY / 2)
    ];
    const geo = new THREE.BufferGeometry().setFromPoints(points);
 const core = new THREE.Line(geo, material.clone());
core.visible = false;
scene.add(core);

// glow linija (ispod)
const glow = new THREE.Line(geo, glowMaterial.clone());
glow.visible = false;
glow.scale.set(1.01, 1, 1.01); // malo šira
scene.add(glow);

lines.push({
  core,
  glow,
  axis: 'x',
  pos: x
});

  }

  for (let y = -sizeY / 2; y <= sizeY / 2; y += step) {
    const points = [
      new THREE.Vector3(-sizeX / 2, 0, y),
      new THREE.Vector3(sizeX / 2, 0, y)
    ];
    const geo = new THREE.BufferGeometry().setFromPoints(points);
const core = new THREE.Line(geo, material.clone());
core.visible = false;
scene.add(core);

// glow linija (ispod)
const glow = new THREE.Line(geo, glowMaterial.clone());
glow.visible = false;
glow.scale.set(1.01, 1, 1.01); // malo šira
scene.add(glow);

lines.push({
  core,
  glow,
  axis: 'y',
  pos: y
});

  }

  /* === SORT BY DISTANCE FROM CENTER (TESLA FLOW) === */
  lines.sort((a, b) => Math.abs(a.pos) - Math.abs(b.pos));

  /* === ORIENTATION === */
  scene.rotation.x = -Math.PI / 2.8;

  let revealIndex = 0;
  const revealSpeed = 0.05; // slower = more elegant

  function animate() {
    if (revealIndex < lines.length) {
      const l = lines[Math.floor(revealIndex)];
     l.core.visible = true;
l.glow.visible = true;

l.core.material.opacity =
  0.15 + Math.abs(l.pos) / (sizeX / 2) * 0.35;

l.glow.material.opacity =
  0.05 + Math.abs(l.pos) / (sizeX / 2) * 0.15;

      revealIndex += revealSpeed;
    }

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }

  animate();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}
