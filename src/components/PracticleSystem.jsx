import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

import "../components/PracticleSystem.css";

const PARTICLE_COUNT = 25000;
const TEXT_STRING = "Satyas_FX";
const UNIFORM_COLOR_HEX = 0x00ffff;

export default function ParticleSystem() {
  const canvasRef = useRef(null);
  const videoRef = useRef(null);

  const [isMobile] = useState(window.innerWidth < 600);
  const SCALE_FACTOR = isMobile ? 0.25 : 1;
  const AUTO_ROTATION_SPEED = isMobile ? 0.0025 : 0.002;

  useEffect(() => {
    if (!canvasRef.current) return;

    let scene, camera, renderer, particles, material;
    let shapeSaturn, shapeText;
    let isTextMode = false;
    let animationId;

    /* ---------------- Scene Setup ---------------- */
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.02);

    camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.z = isMobile ? 2.5 : 6;

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    canvasRef.current.appendChild(renderer.domElement);

    /* ---------------- Helpers ---------------- */
    const getParticleSize = () => (isMobile ? 0.03 : 0.05);

    function sampleGeometry(geometry, count) {
      const pos = geometry.attributes.position;
      const a = new THREE.Vector3();
      const b = new THREE.Vector3();
      const c = new THREE.Vector3();
      const cross = new THREE.Vector3();

      const areas = [];
      let totalArea = 0;

      for (let i = 0; i < pos.count; i += 3) {
        a.fromBufferAttribute(pos, i);
        b.fromBufferAttribute(pos, i + 1);
        c.fromBufferAttribute(pos, i + 2);
        cross.subVectors(b, a).cross(c.clone().sub(a));
        const area = cross.length() * 0.5;
        areas.push(area);
        totalArea += area;
      }

      const points = [];
      for (let i = 0; i < count; i++) {
        let r = Math.random() * totalArea;
        let idx = 0;
        while (r > areas[idx]) r -= areas[idx++];

        a.fromBufferAttribute(pos, idx * 3);
        b.fromBufferAttribute(pos, idx * 3 + 1);
        c.fromBufferAttribute(pos, idx * 3 + 2);

        const r1 = Math.random();
        const r2 = Math.random();
        const sqrt = Math.sqrt(r1);

        points.push(
          (1 - sqrt) * a.x + sqrt * (1 - r2) * b.x + sqrt * r2 * c.x,
          (1 - sqrt) * a.y + sqrt * (1 - r2) * b.y + sqrt * r2 * c.y,
          (1 - sqrt) * a.z + sqrt * (1 - r2) * b.z + sqrt * r2 * c.z
        );
      }
      return new Float32Array(points);
    }

    function getSaturnPoints(count) {
      const arr = [];
      for (let i = 0; i < count; i++) {
        if (i < count * 0.5) {
          const u = Math.random();
          const v = Math.random();
          const theta = 2 * Math.PI * u;
          const phi = Math.acos(2 * v - 1);
          const r = 1.4 * SCALE_FACTOR;
          arr.push(
            r * Math.sin(phi) * Math.cos(theta),
            r * Math.sin(phi) * Math.sin(theta),
            r * Math.cos(phi)
          );
        } else {
          const angle = Math.random() * Math.PI * 2;
          const dist = (1.8 + Math.random() * 1.8) * SCALE_FACTOR;
          arr.push(
            dist * Math.cos(angle),
            (Math.random() - 0.5) * 0.15 * SCALE_FACTOR,
            dist * Math.sin(angle)
          );
        }
      }
      return new Float32Array(arr);
    }

    /* ---------------- Load Font ---------------- */
    const loader = new FontLoader();
    loader.load("/fonts/helvetiker_bold.typeface.json", (font) => {
      const size = (isMobile ? 0.8 : 1.2) * SCALE_FACTOR;

      const textGeo = new TextGeometry(TEXT_STRING, {
        font,
        size,
        height: 0.1,
        curveSegments: 12,
      });
      textGeo.center();

      shapeText = sampleGeometry(textGeo, PARTICLE_COUNT);
      shapeSaturn = getSaturnPoints(PARTICLE_COUNT);

      initParticles();
    });

    /* ---------------- Init Particles ---------------- */
    function initParticles() {
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(new Float32Array(shapeSaturn), 3)
      );
      geometry.setAttribute(
        "targetPosition",
        new THREE.BufferAttribute(new Float32Array(shapeSaturn), 3)
      );

      material = new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uColor: { value: new THREE.Color(UNIFORM_COLOR_HEX) },
          uMix: { value: 0 },
          uSize: { value: getParticleSize() },
        },
        vertexShader: `
          uniform float uMix;
          uniform float uTime;
          uniform float uSize;
          attribute vec3 targetPosition;
          void main() {
            vec3 pos = mix(position, targetPosition, uMix);
            pos.x += sin(pos.y * 5.0 + uTime) * 0.02;
            vec4 mv = modelViewMatrix * vec4(pos, 1.0);
            gl_Position = projectionMatrix * mv;
            gl_PointSize = uSize * (350.0 / -mv.z);
          }
        `,
        fragmentShader: `
          uniform vec3 uColor;
          void main() {
            vec2 c = gl_PointCoord - 0.5;
            if (length(c) > 0.5) discard;
            gl_FragColor = vec4(uColor, 1.0);
          }
        `,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });

      particles = new THREE.Points(geometry, material);
      scene.add(particles);
      animate();
    }

    /* ---------------- Animate ---------------- */
    function animate() {
      if (!material || !particles) return;

      material.uniforms.uTime.value += 0.01;
      if (!isTextMode) {
        particles.rotation.y += AUTO_ROTATION_SPEED;
        particles.rotation.z += AUTO_ROTATION_SPEED;
      }

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    }

    /* ---------------- Cleanup (SAFE) ---------------- */
    return () => {
      cancelAnimationFrame(animationId);

      if (renderer) renderer.dispose();
      if (particles) particles.geometry.dispose();
      if (material) material.dispose();
    };
  }, [isMobile]);

  return (
    <>
      <div id="ui-layer">
        <h1>Satyas_FX Particle System</h1>
        <div className="status">Saturn 🪐 | Pinch / Rotate</div>
      </div>

      <div id="video-container">
        <video ref={videoRef} playsInline />
      </div>

      <div id="canvas-container" ref={canvasRef} />
    </>
  );
}
