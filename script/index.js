const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('bg').appendChild(renderer.domElement);

scene.background = new THREE.Color(0x1d2a35);

const shapes = [];
const shapeCount = 30;

const geometryTypes = [
    new THREE.BoxGeometry(0.5, 0.5, 0.5),
    new THREE.SphereGeometry(0.3, 16, 16),
    new THREE.ConeGeometry(0.3, 0.6, 8)
];

const materialColors = [0x3e4f61, 0x2a3a45, 0x1f3a50, 0x4a6a80, 0x6b8c99, 0xa3b1b8, 0xf2f2f2, 0x0f1b23];

for (let i = 0; i < shapeCount; i++) {
    const geometry = geometryTypes[Math.floor(Math.random() * geometryTypes.length)];
    const material = new THREE.MeshStandardMaterial({
        color: materialColors[Math.floor(Math.random() * materialColors.length)],
        roughness: 0.5,
        metalness: 0.5
    });
    const mesh = new THREE.Mesh(geometry, material);

    mesh.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 20
    );

    mesh.userData.velocity = new THREE.Vector3(
        (Math.random() - 0.5) * 0.05,
        (Math.random() - 0.5) * 0.05,
        (Math.random() - 0.5) * 0.05
    );

    scene.add(mesh);
    shapes.push(mesh);
}

const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);

camera.position.z = 15;

function animate() {
    requestAnimationFrame(animate);

    shapes.forEach(shape => {
        shape.position.add(shape.userData.velocity);

        ['x', 'y', 'z'].forEach(axis => {
            if (shape.position[axis] > 10 || shape.position[axis] < -10) {
                shape.userData.velocity[axis] *= -1;
            }
        });

        shape.rotation.x += 0.01;
        shape.rotation.y += 0.01;
    });

    renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});