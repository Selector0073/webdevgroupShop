const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(innerWidth, innerHeight);
document.body.insertBefore(renderer.domElement, document.body.firstChild);
renderer.domElement.style.position = 'fixed';
renderer.domElement.style.top = 0;
renderer.domElement.style.left = 0;
renderer.domElement.style.width = '100%';
renderer.domElement.style.height = '100%';
renderer.domElement.style.zIndex = '-1';

const geometry = new THREE.PlaneGeometry(2, 2);

const uniforms = {
    mouse: { value: new THREE.Vector2(0, 0) },
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

        vec3 hexToRgb(int hex) {
            float r = float((hex >> 16) & 255) / 255.0;
            float g = float((hex >> 8) & 255) / 255.0;
            float b = float(hex & 255) / 255.0;
            return vec3(r, g, b);
        }

        void main() {
            vec3 color1 = vec3(0.114, 0.165, 0.208); // #1d2a35
            vec3 color2 = vec3(0.176, 0.215, 0.282); // #2d3748

            vec3 base = mix(color1, color2, vUv.y);
            float dist = distance(vUv, mouse);
            float warp = sin(dist * 20.0 - time * 5.0) * 0.05;
            base += warp * 0.3;

            gl_FragColor = vec4(base, 1.0);
        }
    `
});

const plane = new THREE.Mesh(geometry, material);
scene.add(plane);
camera.position.z = 1;

addEventListener("mousemove", e => {
    uniforms.mouse.value.x = e.clientX / innerWidth;
    uniforms.mouse.value.y = 1.0 - e.clientY / innerHeight;
});

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
