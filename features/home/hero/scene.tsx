import { useMousePosition } from '@/hooks/useMousePosition';
import { Environment, useEnvironment, useGLTF } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import gsap from 'gsap';
import { useEffect, useMemo, useRef } from 'react';
import {
  type Group,
  ACESFilmicToneMapping,
  Box3,
  Color,
  Mesh,
  MeshPhysicalMaterial,
  Vector3,
} from 'three';

const ROTATION_SCALE = Math.PI * 0.4;
const POSITION_SCALE = 0.4;

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
        color: 0x1e3a8a,
        metalness: 0.15,
        roughness: 0.92,
        envMap: envMap ?? undefined,
        envMapIntensity: envMap ? 0.08 : 0,
        clearcoat: 0,
        clearcoatRoughness: 1,
        reflectivity: 0.1,
        emissive: new Color(0x1e40af),
        emissiveIntensity: 0.08,
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
      duration: 3,
      ease: 'power4.out',
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

function Scene() {
  return (
    <div className="absolute top-0 left-0 z-0 h-full w-screen" aria-hidden>
      <div className="sticky top-0 h-screen w-screen" aria-hidden>
        <div
          className="absolute inset-0 z-0"
          style={{ background: 'linear-gradient(to bottom, #01021b 0%, #040148 100%)' }}
          aria-hidden
        />
        <div className="absolute inset-0 z-1">
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
            <hemisphereLight args={[0x93c5fd, 0x1e3a8a, 1.2]} />
            <directionalLight color={0x818cf8} intensity={1.2} position={[-3, 4, 5]} />
            <directionalLight color={0x6366f1} intensity={0.9} position={[2, -1, 3]} />
            <directionalLight color={0xa78bfa} intensity={0.7} position={[2, 2, -2]} />
            <pointLight color={0x60a5fa} distance={10} intensity={1} position={[0, 0, 3]} />
            <pointLight color={0xc4b5fd} distance={8} intensity={0.5} position={[-2, 1, 2]} />
            <LogoModel />
          </Canvas>
        </div>
      </div>
    </div>
  );
}

export default Scene;
