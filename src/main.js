import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import './style.css';
import * as dat from 'dat.gui';

import hutao from './img/hutao.jpeg';
import serizawa from './img/serizawa.jpg';
import miku1 from './img/haha.jpg';
import miku2 from './img/hi.jpg';
import miku3 from './img/peace.jpg';
import miku4 from './img/shorthair.jpg';
import miku5 from './img/stare.jpg';
import miku6 from './img/blush.jpg';

const renderer = new THREE.WebGLRenderer();

renderer.shadowMap.enabled = true;

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const orbit = new OrbitControls(camera, renderer.domElement);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

camera.position.set(-10, 30, 30);
orbit.update();

const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshBasicMaterial({color: 0x00ff00});
const box = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box);

const planeGeometry = new THREE.PlaneGeometry(30, 30);
const planeMaterial = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  side: THREE.DoubleSide
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);
plane.rotation.x = -0.5 * Math.PI;
plane.receiveShadow = true;

const gridHelper = new THREE.GridHelper(30);
scene.add(gridHelper);

const sphereGeomery = new THREE.SphereGeometry(4);
const sphereMaterial = new THREE.MeshStandardMaterial({color: 0x00000ff});
const sphere = new THREE.Mesh(sphereGeomery, sphereMaterial);
scene.add(sphere);
sphere.position.set(-10, 10, 0);
sphere.castShadow = true;

const ambient = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(ambient);

// const directional = new THREE.DirectionalLight(0xffffff, 2);
// scene.add(directional);
// directional.position.set(-30, 50, 0);
// directional.castShadow = true;
// directional.shadow.camera.bottom = -12;

// const dLightHelper = new THREE.DirectionalLightHelper(directional, 5);
// scene.add(dLightHelper);

// const dLightShadowHelper = new THREE.CameraHelper(directional.shadow.camera);
// scene.add(dLightShadowHelper);

const spotLight = new THREE.SpotLight(0xffffff, 50000);
scene.add(spotLight);
spotLight.position.set(-100, 100, 0);
spotLight.castShadow = true;
spotLight.angle = 0.2;

const sLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(sLightHelper);  

const textureLoader = new THREE.TextureLoader();
// scene.background = textureLoader.load(serizawa);
const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
  miku6,
  miku5,
  miku1,
  miku2,
  miku3,
  miku4
])

const gui = new dat.GUI();

const options = {
  sphereColor: '#ffea00',
  wireframe: false,
  speed: 0.01,
  angle: 0.2,
  penumbra: 0,
  intensity: 1
};

gui.addColor(options, 'sphereColor').onChange(function(e){
  sphere.material.color.set(e);
});

gui.add(options, 'wireframe').onChange(function(e){
  sphere.material.wireframe = e;
});

gui.add(options, 'speed', 0, 0.1);

gui.add(options, 'angle', 0, 1);
gui.add(options, 'penumbra', 0, 1);
gui.add(options, 'intensity', 0, 100000);

let step = 0;

function animate() {
  box.rotation.x += 0.01;
  box.rotation.y += 0.01;

  step += options.speed;
  sphere.position.y = 10 * Math.abs(Math.sin(step))

  spotLight.angle = options.angle;
  spotLight.penumbra = options.penumbra;
  spotLight.intensity = options.intensity;
  sLightHelper.update();

  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);