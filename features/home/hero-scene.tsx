import { useMousePosition } from '@/hooks/useMousePosition';
import { useGLTF, Environment, useEnvironment } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import gsap from 'gsap';
import { useRef, useMemo, useEffect } from 'react';
import {
  type Group,
  Box3,
  Color,
  Mesh,
  MeshPhysicalMaterial,
  Vector3,
  ACESFilmicToneMapping,
} from 'three';

const ROTATION_SCALE = Math.PI * 0.4;
const POSITION_SCALE = 0.4;
const SMOOTH_DURATION = 0.5;
const GRADIENT = 'linear-gradient(to bottom, #01021b 0%, #000040 100%)';

function LogoModel() {
  const groupRef = useRef<Group>(null);
  const { x: mouseX, y: mouseY } = useMousePosition();
  const proxy = useRef({
    rotationX: 0,
    rotationY: 0,
    positionX: 0,
    positionY: 0,
  });

  const { scene } = useGLTF('/3d/obj/logo-m.glb', true);
  const envMap = useEnvironment({ files: '/3d/hdri/env.hdr' });

  const material = useMemo(
    (): MeshPhysicalMaterial =>
      new MeshPhysicalMaterial({
        color: 0x1b17ee,
        metalness: 0.85,
        roughness: 0.25,
        envMap: envMap ?? undefined,
        envMapIntensity: envMap ? 1.4 : 0.5,
        clearcoat: 0.35,
        clearcoatRoughness: 0.4,
        reflectivity: 0.8,
        emissive: new Color(0x1b17ee).multiplyScalar(0.15),
        emissiveIntensity: 0.2,
      }),
    [envMap],
  );

  const preparedScene = useMemo(() => {
    const clone = scene.clone();
    const box = new Box3().setFromObject(clone);
    const c = new Vector3();
    const s = new Vector3();
    box.getCenter(c);
    box.getSize(s);
    clone.position.sub(c);
    clone.scale.setScalar(1.4 / Math.max(s.x, s.y, s.z));
    clone.traverse((child) => {
      if (child instanceof Mesh && child.geometry) {
        const old = child.material;
        if (old) {
          if (Array.isArray(old)) {
            old.forEach((m) => m.dispose());
          } else {
            old.dispose();
          }
        }
        child.material = material;
      }
    });
    return clone;
  }, [scene, material]);

  useEffect(() => () => material.dispose(), [material]);

  useFrame(() => {
    if (!groupRef.current || typeof window === 'undefined') return;
    const w = window.innerWidth || 1;
    const h = window.innerHeight || 1;
    const nx = mouseX / w - 0.5;
    const ny = mouseY / h - 0.5;
    gsap.to(proxy.current, {
      rotationX: ny * ROTATION_SCALE,
      rotationY: nx * ROTATION_SCALE,
      positionX: -nx * POSITION_SCALE,
      positionY: ny * POSITION_SCALE,
      duration: SMOOTH_DURATION,
      ease: 'power2.out',
    });
    const p = proxy.current;
    groupRef.current.rotation.x = p.rotationX;
    groupRef.current.rotation.y = p.rotationY;
    groupRef.current.position.x = p.positionX;
    groupRef.current.position.y = p.positionY;
  });

  return (
    <group ref={groupRef}>
      <primitive object={preparedScene} />
    </group>
  );
}

function HeroScene() {
  return (
    <div className="h-full w-full" aria-hidden>
      <div className="absolute inset-0 z-0" style={{ background: GRADIENT }} aria-hidden />
      <div className="absolute inset-0 z-[1]">
        <Canvas
          camera={{ fov: 50, position: [0, 0, 4.5] }}
          dpr={[1, 2]}
          gl={{ alpha: true, antialias: true }}
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0);
            Object.assign(gl, {
              toneMapping: ACESFilmicToneMapping,
              toneMappingExposure: 1.25,
            });
          }}
        >
          <Environment files="/3d/hdri/env.hdr" />
          <hemisphereLight args={[0xb8d4f0, 0x2a4a6e, 1.5]} />
          <directionalLight color={0xffffff} intensity={1.6} position={[-3, 4, 5]} />
          <directionalLight color={0x93c5fd} intensity={0.8} position={[2, -1, 3]} />
          <directionalLight color={0x60a5fa} intensity={1} position={[2, 2, -2]} />
          <pointLight color={0xa5b8ff} distance={10} intensity={1.2} position={[0, 0, 3]} />
          <LogoModel />
        </Canvas>
      </div>
    </div>
  );
}

export default HeroScene;
