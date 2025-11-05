const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(innerWidth, innerHeight);
document.body.insertBefore(renderer.domElement, document.body.firstChild);
const container = document.getElementById("bg");
container.appendChild(renderer.domElement);
renderer.domElement.style.position = "fixed";
renderer.domElement.style.top = 0;
renderer.domElement.style.left = 0;
renderer.domElement.style.width = "100%";
renderer.domElement.style.height = "100%";
renderer.domElement.style.zIndex = "-1";


const geometry = new THREE.PlaneGeometry(2, 2);

const uniforms = {
    mouse: { value: new THREE.Vector2(0.5, 0.5) },
    time: { value: 0.0 }
};

const material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        uniform vec2 mouse;
        uniform float time;
        varying vec2 vUv;

        void main() {
            vec3 color1 = vec3(0.2, 0.65, 0.40);
            vec3 color2 = vec3(0.2, 0.55, 0.40);


            vec3 base = mix(color1, color2, vUv.y);
            float dist = distance(vUv, mouse);
            float warp = sin(dist * 20.0 - time * 5.0) * 0.35;
            base += warp * 0.1;

            gl_FragColor = vec4(base, 1.0);
        }
    `
});

const plane = new THREE.Mesh(geometry, material);
scene.add(plane);
camera.position.z = 1;

function animate(t) {
    uniforms.time.value = t * 0.001;
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}
animate();

addEventListener("resize", () => {
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
});
