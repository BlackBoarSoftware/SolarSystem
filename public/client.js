
import * as THREE from 'three'
import { Texture } from 'three';
import { RGB_ETC1_Format } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 500);
camera.position.z = 50;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


const controls = new OrbitControls(camera, renderer.domElement);

//Ambient Light
const ambLight = new THREE.AmbientLight(0xffffff, 0.5); //(color, intensity)
scene.add(ambLight);
//Sunlight
const ptLight = new THREE.PointLight(0xffa733, 1);
scene.add(ptLight);
ptLight.position.x = -40;

//Star generation logic
function addStar(){
    const geometry = new THREE.SphereGeometry(0.2, 24, 24);
    const material = new THREE.MeshStandardMaterial({color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 0.9});
    const star = new THREE.Mesh(geometry, material);
  
    const[x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(500));
    star.position.set(x, y, z);
    scene.add(star);
  }
  Array(200).fill().forEach(addStar);

//BG
const spaceTexture = new THREE.TextureLoader().load('images/backgrounds/2k_stars.jpg');
scene.background = spaceTexture;

//Sun
const sunTexture = new THREE.TextureLoader().load('images/textures/8k_sun.jpg');
sunTexture.anisotropy = 16;
const sun = new THREE.Mesh(
  new THREE.SphereGeometry(15, 50, 32),
  new THREE.MeshStandardMaterial({
    map: sunTexture,
    emissive: 0xff8b3d,
    emissiveIntensity: 0.6, 
  })
);

scene.add(sun);
sun.position.x = -40;

//Mercury
const mercuryTexture = new THREE.TextureLoader().load('images/textures/2k_mercury.jpg');
const mercury = new THREE.Mesh(
  new THREE.SphereGeometry(0.6),
  new THREE.MeshStandardMaterial({
    map: mercuryTexture, 
  })
);

scene.add(mercury);
mercury.position.x = -16;

//Venus
const venusTexture = new THREE.TextureLoader().load('images/textures/2k_venus_atmosphere.jpg');
const venus = new THREE.Mesh(
  new THREE.SphereGeometry(1),
  new THREE.MeshStandardMaterial({
    map: venusTexture, 
  })
);

scene.add(venus);
venus.position.x = -8;

//Earth
const earthTexture = new THREE.TextureLoader().load('images/textures/2k_earth_daymap.jpg');
const earth = new THREE.Mesh(
  new THREE.SphereGeometry(1),
  new THREE.MeshStandardMaterial({
    map: earthTexture, 
  })
);

scene.add(earth);
earth.position.x = 0;

//Mars
const marsTexture = new THREE.TextureLoader().load('images/textures/2k_mars.jpg');
const mars = new THREE.Mesh(
  new THREE.SphereGeometry(0.85),
  new THREE.MeshStandardMaterial({
    map: marsTexture, 
  })
);

scene.add(mars);
mars.position.x = 8;

//Jupiter
const jupiterTexture = new THREE.TextureLoader().load('images/textures/2k_jupiter.jpg');
const jupiter = new THREE.Mesh(
  new THREE.SphereGeometry(2),
  new THREE.MeshStandardMaterial({
    map: jupiterTexture, 
  })
);

scene.add(jupiter);
jupiter.position.x = 16;

//Saturn
const saturnTexture = new THREE.TextureLoader().load('images/textures/2k_saturn.jpg');
const saturn = new THREE.Mesh(
  new THREE.SphereGeometry(1.7),
  new THREE.MeshStandardMaterial({
    map: saturnTexture, 
  })
);

scene.add(saturn);
saturn.position.x = 24;

//Uranus
const uranusTexture = new THREE.TextureLoader().load('images/textures/2k_uranus.jpg');
const uranus = new THREE.Mesh(
  new THREE.SphereGeometry(1.4),
  new THREE.MeshStandardMaterial({
    map: uranusTexture, 
  })
);

scene.add(uranus);
uranus.position.x = 32;

//Neptune
const neptuneTexture = new THREE.TextureLoader().load('images/textures/2k_neptune.jpg');
const neptune = new THREE.Mesh(
  new THREE.SphereGeometry(0.4),
  new THREE.MeshStandardMaterial({
    map: neptuneTexture, 
  })
);

scene.add(neptune);
neptune.position.x = 40;


//----------------------------------

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    render();
}, false);

const stats = Stats();
document.body.appendChild(stats.dom);

var animate = function () {
    requestAnimationFrame(animate);
    sun.rotation.y += 0.001;
    mercury.rotation.y += 0.01;
    venus.rotation.y += 0.01;
    earth.rotation.y += 0.01;
    mars.rotation.y += 0.01;
    jupiter.rotation.y += 0.01;
    saturn.rotation.y += 0.01;
    uranus.rotation.y += 0.01;
    neptune.rotation.y += 0.01;
    controls.update();
    render();
    stats.update();
};

function render() {
    renderer.render(scene, camera);
};

animate();