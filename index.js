"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var THREE = require("three");
// Cria a cena em 3D
var scene = new THREE.Scene();
// Cria uma câmera esférica para visualização em 360 graus
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1100);
camera.target = new THREE.Vector3(0, 0, 0);
scene.add(camera);
// Carrega a imagem panorama
var loader = new THREE.TextureLoader();
loader.load('https://thumbs.dreamstime.com/z/%C3%A1rvore-na-paisagem-do-panorama-da-natureza-56294586.jpg', function (texture) {
    // Cria uma esfera para mapear a textura do panorama
    var geometry = new THREE.SphereGeometry(500, 60, 40);
    var material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
    var sphere = new THREE.Mesh(geometry, material);
    sphere.scale.x = -1;
    scene.add(sphere);
});
// Cria um renderizador WebGL
var renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
// Adiciona eventos para controlar a câmera
document.addEventListener('mousedown', onDocumentMouseDown);
document.addEventListener('touchstart', onDocumentTouchStart);
document.addEventListener('touchmove', onDocumentTouchMove);
function onDocumentMouseDown(event) {
    event.preventDefault();
    document.addEventListener('mousemove', onDocumentMouseMove);
    document.addEventListener('mouseup', onDocumentMouseUp);
}
function onDocumentMouseMove(event) {
    var movementX = event.movementX || 0;
    var movementY = event.movementY || 0;
    var rotationSpeed = 0.005;
    camera.rotation.y -= movementX * rotationSpeed;
    camera.rotation.x -= movementY * rotationSpeed;
}
function onDocumentMouseUp(event) {
    document.removeEventListener('mousemove', onDocumentMouseMove);
    document.removeEventListener('mouseup', onDocumentMouseUp);
}
function onDocumentTouchStart(event) {
    if (event.touches.length === 1) {
        event.preventDefault();
        var touch = event.touches[0];
        touchX = touch.screenX;
        touchY = touch.screenY;
    }
}
function onDocumentTouchMove(event) {
    if (event.touches.length === 1) {
        event.preventDefault();
        var touch = event.touches[0];
        var movementX = touch.screenX - touchX || 0;
        var movementY = touch.screenY - touchY || 0;
        var rotationSpeed = 0.005;
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
