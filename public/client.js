
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 500);
camera.position.z = 50;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

//Ambient light (for now illuminates the stars)
const light = new THREE.AmbientLight(0xffffff, 1); //(color, intensity)
scene.add(light);

//Star generation logic
function addStar(){
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial({color: 0xffffff});
    const star = new THREE.Mesh(geometry, material);
  
    const[x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(500));
    star.position.set(x, y, z);
    scene.add(star);
  }
  Array(200).fill().forEach(addStar);

//Sun
const sunGeometry = new THREE.SphereGeometry(15);
const sunMaterial = new THREE.MeshBasicMaterial({
    color:0xFFD500,
    wireframe: true
});

const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);
sun.position.x = -40;

//planet1
const p1geometry = new THREE.SphereGeometry(0.6);
const p1material = new THREE.MeshBasicMaterial({
    color:0x9D9880,
    wireframe: true
});

const planet1 = new THREE.Mesh(p1geometry, p1material);
scene.add(planet1);
planet1.position.x = -16;

//planet2
const p2geometry = new THREE.SphereGeometry();
const p2material = new THREE.MeshBasicMaterial({
    color:0xff0000,
    wireframe: true
});

const planet2 = new THREE.Mesh(p2geometry, p2material);
scene.add(planet2);
planet2.position.x = -8;

//planet3
const p3geometry = new THREE.SphereGeometry();
const p3material = new THREE.MeshBasicMaterial({
    color:0x0000FF,
    wireframe: true
});

const planet3 = new THREE.Mesh(p3geometry, p3material);
scene.add(planet3);
planet3.position.x = 0;

//planet4
const p4geometry = new THREE.SphereGeometry(0.85);
const p4material = new THREE.MeshBasicMaterial({
    color:0xFF8900,
    wireframe: true
});

const planet4 = new THREE.Mesh(p4geometry, p4material);
scene.add(planet4);
planet4.position.x = 8;

//planet5
const p5geometry = new THREE.SphereGeometry(2);
const p5material = new THREE.MeshBasicMaterial({
    color:0xBE996D,
    wireframe: true
});

const planet5 = new THREE.Mesh(p5geometry, p5material);
scene.add(planet5);
planet5.position.x = 16;

//planet6
const p6geometry = new THREE.SphereGeometry(1.7);
const p6material = new THREE.MeshBasicMaterial({
    color:0xDDBC51,
    wireframe: true
});

const planet6 = new THREE.Mesh(p6geometry, p6material);
scene.add(planet6);
planet6.position.x = 24;

//planet7
const p7geometry = new THREE.SphereGeometry(1.4);
const p7material = new THREE.MeshBasicMaterial({
    color:0xB5F9FB,
    wireframe: true
});

const planet7 = new THREE.Mesh(p7geometry, p7material);
scene.add(planet7);
planet7.position.x = 32;

//planet8
const p8geometry = new THREE.SphereGeometry(0.4);
const p8material = new THREE.MeshBasicMaterial({
    color:0x6700FF,
    wireframe: true
});

const planet8 = new THREE.Mesh(p8geometry, p8material);
scene.add(planet8);
planet8.position.x = 40;


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
    planet1.rotation.y += 0.01;
    planet2.rotation.y += 0.01;
    planet3.rotation.y += 0.01;
    planet4.rotation.y += 0.01;
    planet5.rotation.y += 0.01;
    planet6.rotation.y += 0.01;
    planet7.rotation.y += 0.01;
    planet8.rotation.y += 0.01;
    controls.update();
    render();
    stats.update();
};

function render() {
    renderer.render(scene, camera);
};

animate();