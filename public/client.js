
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
const ambLight = new THREE.AmbientLight(0xffffff, 0.3); //(color, intensity)
scene.add(ambLight);
//Sunlight
const ptLight = new THREE.PointLight(0xffa733, 1.5);
scene.add(ptLight);

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
    emissiveIntensity: 0.7, 
  })
);

scene.add(sun);

//Each planet is the child of an empty three object referred to as "pivot". This pivot is rotated in the
//animate function in order to make the planet orbit 
//Mercury
const mercuryTexture = new THREE.TextureLoader().load('images/textures/2k_mercury.jpg');
const mercuryPivot = new THREE.Object3D();
const mercury = new THREE.Mesh(
  new THREE.SphereGeometry(0.6),
  new THREE.MeshStandardMaterial({
    map: mercuryTexture, 
  })
);

scene.add(mercuryPivot);
mercuryPivot.add(mercury);
mercury.position.x = 30;

//Venus
const venusTexture = new THREE.TextureLoader().load('images/textures/2k_venus_atmosphere.jpg');
const venusPivot = new THREE.Object3D();
const venus = new THREE.Mesh(
  new THREE.SphereGeometry(1),
  new THREE.MeshStandardMaterial({
    map: venusTexture, 
  })
);

scene.add(venusPivot);
venusPivot.add(venus);
venus.position.x = 38;

//Earth
const earthTexture = new THREE.TextureLoader().load('images/textures/2k_earth_daymap.jpg');
const earthPivot = new THREE.Object3D();
const earth = new THREE.Mesh(
  new THREE.SphereGeometry(1),
  new THREE.MeshStandardMaterial({
    map: earthTexture, 
  })
);

scene.add(earthPivot);
earthPivot.add(earth);
earth.position.x = 46;

//Mars
const marsTexture = new THREE.TextureLoader().load('images/textures/2k_mars.jpg');
const marsPivot = new THREE.Object3D();
const mars = new THREE.Mesh(
  new THREE.SphereGeometry(0.85),
  new THREE.MeshStandardMaterial({
    map: marsTexture, 
  })
);

scene.add(marsPivot);
marsPivot.add(mars);
mars.position.x = 54;

//Jupiter
const jupiterTexture = new THREE.TextureLoader().load('images/textures/2k_jupiter.jpg');
const jupiterPivot = new THREE.Object3D();
const jupiter = new THREE.Mesh(
  new THREE.SphereGeometry(2),
  new THREE.MeshStandardMaterial({
    map: jupiterTexture, 
  })
);

scene.add(jupiterPivot);
jupiterPivot.add(jupiter);
jupiter.position.x = 62;

//Saturn
const saturnTexture = new THREE.TextureLoader().load('images/textures/2k_saturn.jpg');
const saturnPivot = new THREE.Object3D();
const saturn = new THREE.Mesh(
  new THREE.SphereGeometry(1.7),
  new THREE.MeshStandardMaterial({
    map: saturnTexture, 
  })
);

scene.add(saturnPivot);
saturnPivot.add(saturn);
saturn.position.x = 70;

//Uranus
const uranusTexture = new THREE.TextureLoader().load('images/textures/2k_uranus.jpg');
const uranusPivot = new THREE.Object3D();
const uranus = new THREE.Mesh(
  new THREE.SphereGeometry(1.4),
  new THREE.MeshStandardMaterial({
    map: uranusTexture, 
  })
);

scene.add(uranusPivot);
uranusPivot.add(uranus);
uranus.position.x = 78;

//Neptune
const neptuneTexture = new THREE.TextureLoader().load('images/textures/2k_neptune.jpg');
const neptunePivot = new THREE.Object3D();
const neptune = new THREE.Mesh(
  new THREE.SphereGeometry(0.4),
  new THREE.MeshStandardMaterial({
    map: neptuneTexture, 
  })
);

scene.add(neptunePivot);
neptunePivot.add(neptune);
neptune.position.x = 86;


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
    mercuryPivot.rotateY(0.004);
    venus.rotation.y += 0.01;
    venusPivot.rotateY(0.0035);
    earth.rotation.y += 0.01;
    earthPivot.rotateY(0.003);
    mars.rotation.y += 0.01;
    marsPivot.rotateY(0.0025);
    jupiter.rotation.y += 0.01;
    jupiterPivot.rotateY(0.002);
    saturn.rotation.y += 0.01;
    saturnPivot.rotateY(0.0015);
    uranus.rotation.y += 0.01;
    uranusPivot.rotateY(0.001);
    neptune.rotation.y += 0.01;
    neptunePivot.rotateY(0.0005);
    controls.update();
    render();
    stats.update();
};

function render() {
    renderer.render(scene, camera);
};

animate();