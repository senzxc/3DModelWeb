import * as THREE from "three";

// Setup
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 50;

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;

// cincin
const cincinGeometry = new THREE.TorusGeometry(5, 1.5, 16, 100);
const cincinMaterial = new THREE.MeshStandardMaterial({ color: 0xff6347 });
const cincin = new THREE.Mesh(cincinGeometry, cincinMaterial);
cincin.castShadow = true;
cincin.position.set(0, 0, 25)
scene.add(cincin);

// lighting
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(50, 50, 50);
pointLight.castShadow = true;
scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
scene.add(ambientLight);

// Bintang
function addStar() {
  const starGeometry = new THREE.SphereGeometry(0.2, 24, 24);
  const starMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(starGeometry, starMaterial);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(400));

  star.position.set(x, y, z);

  scene.add(star);
}
Array(200).fill().forEach(addStar);

//camera
let scrollOffset = 0;
function cameraMovement() {
  const t = document.body.getBoundingClientRect().top;

  scrollOffset = THREE.MathUtils.lerp(scrollOffset, t * 0.01, 0.1);

  camera.position.z = Math.max(10, 50 + scrollOffset);

  hutao.rotation.y = t * 0.01;
  cincin.rotation.y = t * 0.01;
}
window.addEventListener("scroll", cameraMovement);

// Ikon
const hutaoGeometry = new THREE.BoxGeometry(5, 5, 5);
const hutaoTexture = new THREE.TextureLoader().load("hutao.jpeg");
const hutaoMaterial = new THREE.MeshStandardMaterial({ map: hutaoTexture });
const hutao = new THREE.Mesh(hutaoGeometry, hutaoMaterial);
hutao.position.set(5, 0, 5);
hutao.castShadow = true;
scene.add(hutao);

// Mars
const marsMap = new THREE.TextureLoader().load("serizawa.jpg");

const marsGeometry = new THREE.SphereGeometry(3, 32, 32);
const marsMaterial = new THREE.MeshStandardMaterial({
  map: marsMap,
});

const mars = new THREE.Mesh(marsGeometry, marsMaterial);
mars.position.set(-5, 0, 5)
scene.add(mars);

// Animasi
function animate() {
  requestAnimationFrame(animate);

  mars.rotation.y += 0.01;

  hutao.rotation.x += 0.01;

  cincin.rotation.x += 0.01;
  cincin.rotation.y += 0.02;

  renderer.render(scene, camera);
}

animate();
