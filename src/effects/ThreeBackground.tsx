import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    const canvas2d = document.createElement('canvas');
    canvas2d.width = 64;
    canvas2d.height = 64;
    const ctx = canvas2d.getContext('2d');
    if (!ctx) return;
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(255, 223, 80, 1)');
    grad.addColorStop(0.4, 'rgba(212, 175, 55, 0.6)');
    grad.addColorStop(1, 'rgba(212, 175, 55, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);
    const particleTexture = new THREE.CanvasTexture(canvas2d);

    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 1500;
    const posArray = new Float32Array(particleCount * 3);
    for (let i = 0; i < posArray.length; i += 1) {
      posArray[i] = (Math.random() - 0.5) * 10;
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.06,
      map: particleTexture,
      color: '#d4af37',
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    const shapeColors = ['#d4af37', '#e8c547', '#f0d060'];
    const shapes: THREE.Mesh[] = [];

    for (let i = 0; i < 20; i += 1) {
      const geometry = new THREE.IcosahedronGeometry(Math.random() * 0.2, 0);
      const material = new THREE.MeshPhongMaterial({
        color: shapeColors[Math.floor(Math.random() * shapeColors.length)],
        wireframe: true,
        transparent: true,
        opacity: 0.3,
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set((Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10);
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      scene.add(mesh);
      shapes.push(mesh);
    }

    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(2, 3, 4);
    scene.add(pointLight);
    camera.position.z = 3;

    let mouseX = 0;
    let mouseY = 0;
    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX / window.innerWidth - 0.5;
      mouseY = e.clientY / window.innerHeight - 0.5;
    };
    document.addEventListener('mousemove', onMouseMove, { passive: true });

    let animId = 0;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      particlesMesh.rotation.y += 0.001;
      particlesMesh.rotation.x += 0.0005;

      if (mouseX !== 0 || mouseY !== 0) {
        particlesMesh.rotation.y += mouseX * 0.005;
        particlesMesh.rotation.x += -mouseY * 0.005;
      }

      const t = Date.now() * 0.001;
      shapes.forEach((shape) => {
        shape.rotation.x += 0.01;
        shape.rotation.y += 0.01;
        shape.position.y += Math.sin(t + shape.position.x) * 0.002;
      });

      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      document.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      particleTexture.dispose();
      shapes.forEach((s) => {
        s.geometry.dispose();
        if (Array.isArray(s.material)) {
          s.material.forEach((m) => m.dispose());
        } else {
          s.material.dispose();
        }
      });
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div id="threejs-container" ref={containerRef} aria-hidden="true" />;
}
