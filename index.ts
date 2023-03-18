import * as THREE from 'three';

// Cria a cena em 3D
const scene = new THREE.Scene();

// Cria uma câmera esférica para visualização em 360 graus
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1100);
camera.target = new THREE.Vector3(0, 0, 0);
scene.add(camera);

// Carrega a imagem panorama
const loader = new THREE.TextureLoader();
loader.load('path/to/panorama.jpg', function (texture) {
  // Cria uma esfera para mapear a textura do panorama
  const geometry = new THREE.SphereGeometry(500, 60, 40);
  const material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
  const sphere = new THREE.Mesh(geometry, material);
  sphere.scale.x = -1;
  scene.add(sphere);
});

// Cria um renderizador WebGL
const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Adiciona eventos para controlar a câmera
document.addEventListener('mousedown', onDocumentMouseDown);
document.addEventListener('touchstart', onDocumentTouchStart);
document.addEventListener('touchmove', onDocumentTouchMove);

function onDocumentMouseDown(event: MouseEvent) {
  event.preventDefault();
  document.addEventListener('mousemove', onDocumentMouseMove);
  document.addEventListener('mouseup', onDocumentMouseUp);
}

function onDocumentMouseMove(event: MouseEvent) {
  const movementX = event.movementX || 0;
  const movementY = event.movementY || 0;
  const rotationSpeed = 0.005;
  camera.rotation.y -= movementX * rotationSpeed;
  camera.rotation.x -= movementY * rotationSpeed;
}

function onDocumentMouseUp(event: MouseEvent) {
  document.removeEventListener('mousemove', onDocumentMouseMove);
  document.removeEventListener('mouseup', onDocumentMouseUp);
}

function onDocumentTouchStart(event: TouchEvent) {
  if (event.touches.length === 1) {
    event.preventDefault();
    const touch = event.touches[0];
    touchX = touch.screenX;
    touchY = touch.screenY;
  }
}

function onDocumentTouchMove(event: TouchEvent) {
  if (event.touches.length === 1) {
    event.preventDefault();
    const touch = event.touches[0];
    const movementX = touch.screenX - touchX || 0;
    const movementY = touch.screenY - touchY || 0;
    const rotationSpeed = 0.005;
    camera.rotation.y -= movementX * rotationSpeed;
    camera.rotation.x -= movementY * rotationSpeed;
    touchX = touch.screenX;
    touchY = touch.screenY;
  }
}

// Renderiza a cena em loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();