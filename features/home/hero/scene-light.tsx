import { useMousePosition } from '@/hooks/useMousePosition';
import { useLanguage } from '@/providers/language.provider';
import { Environment, MeshTransmissionMaterial, Text3D, useGLTF } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import gsap from 'gsap';
import type { RefObject } from 'react';
import { useMemo, useRef } from 'react';
import type { BufferGeometry, Group } from 'three';
import { ACESFilmicToneMapping, Box3, Color, FrontSide, Matrix4, Mesh, Vector3 } from 'three';

const ROTATION_SCALE = Math.PI * 0.4;
const WHITE_ENV = new Color(0xd0d3fb);
const PARALLAX_X = [1, 0.2, -0.4, 0.1] as const;

const ALIGN: ('left' | 'center' | 'right')[] = ['left', 'left', 'right', 'center'];

/** Marge en unités monde entre le texte et les bords de l’écran. */
const MARGIN = 0.25;
const VIEWPORT_REF = 10;
const TEXT_SIZE = 0.5;
const TEXT_SIZE_CLAMP = [0.25, 0.9] as const;

const GLASS_MAT = {
  background: WHITE_ENV,
  backside: true,
  backsideThickness: 0.05,
  chromaticAberration: 0.03,
  distortion: 0.1,
  distortionScale: 0.2,
  ior: 1.1,
  roughness: 0.01,
  samples: 10,
  thickness: 0.1,
  transmission: 1,
};

type MeshData = { geometry: BufferGeometry; matrix: Matrix4 };

function FlatText({ scrollProgressRef }: { scrollProgressRef: RefObject<number> }) {
  const { isFrench } = useLanguage();
  const { viewport } = useThree();
  const words: [string, string, string, string] = isFrench
    ? ['Transformez', 'votre', 'entreprise', "aujourd'hui"]
    : ['Transform', 'your', 'company', 'today'];
  const lineRefs = [
    useRef<Group>(null),
    useRef<Group>(null),
    useRef<Group>(null),
    useRef<Group>(null),
  ];

  const leftOffset = -viewport.width / 2 + MARGIN;
  const w = viewport.width - 2 * MARGIN;
  const textSize = Math.min(
    TEXT_SIZE_CLAMP[1],
    Math.max(TEXT_SIZE_CLAMP[0], (viewport.width / VIEWPORT_REF) * TEXT_SIZE),
  );
  const lineHeight = textSize * 1.2;
  const baseY = (lineHeight * 3) / 2;

  useFrame(() => {
    const progress = scrollProgressRef?.current ?? 0;
    const scale = viewport.width / VIEWPORT_REF;
    lineRefs.forEach((ref, i) => {
      const group = ref.current;
      if (!group) return;
      group.position.x = progress * PARALLAX_X[i] * scale;
      const mesh = group.children[0] as Mesh | undefined;
      if (!mesh?.geometry) return;
      if (!mesh.geometry.boundingBox) mesh.geometry.computeBoundingBox();
      const box = mesh.geometry.boundingBox!;
      const centerX = (box.min.x + box.max.x) / 2;
      let x: number;
      if (ALIGN[i] === 'left') x = -box.min.x;
      else if (ALIGN[i] === 'right') x = w - box.max.x;
      else x = w / 2 - centerX;
      mesh.position.x = x;
    });
  });

  return (
    <group position={[leftOffset, 0, -1.4]}>
      {words.map((word, i) => (
        <group key={word} ref={lineRefs[i]} position={[0, baseY - i * lineHeight, 0]}>
          <Text3D
            bevelEnabled={false}
            font="/fonts/Safiro-Regular.json"
            height={0.001}
            letterSpacing={-0.01}
            lineHeight={1}
            size={textSize}
            onUpdate={(self) => {
              const m = self.material as unknown as {
                color: { setHex: (n: number) => void };
                side: number;
              };
              m.side = FrontSide;
              m.color.setHex(0x141418);
            }}
          >
            <meshStandardMaterial color="#141418" />
            {word}
          </Text3D>
        </group>
      ))}
    </group>
  );
}

function LogoModel() {
  const groupRef = useRef<Group>(null);
  const { mousePosition } = useMousePosition({ options: { listenTouch: true } });
  const mouseX = mousePosition.x;
  const mouseY = mousePosition.y;
  const proxy = useRef({ rotationX: 0, rotationY: 0 });

  const { scene } = useGLTF('/3d/obj/logo-m.glb', true);

  const meshes = useMemo((): MeshData[] => {
    const clone = scene.clone();
    const box = new Box3().setFromObject(clone);
    const c = new Vector3();
    const s = new Vector3();
    box.getCenter(c);
    box.getSize(s);
    clone.position.sub(c);
    clone.scale.setScalar(1.4 / Math.max(s.x, s.y, s.z));
    clone.updateMatrixWorld(true);
    const result: MeshData[] = [];
    clone.traverse((child) => {
      if (child instanceof Mesh && child.geometry) {
        result.push({ geometry: child.geometry, matrix: child.matrixWorld.clone() });
      }
    });
    return result;
  }, [scene]);

  useFrame(() => {
    if (!groupRef.current || typeof window === 'undefined') return;
    const w = window.innerWidth || 1;
    const h = window.innerHeight || 1;
    const nx = mouseX / w - 0.5;
    const ny = mouseY / h - 0.5;
    gsap.to(proxy.current, {
      rotationX: ny * ROTATION_SCALE,
      rotationY: nx * ROTATION_SCALE,
      duration: 3,
      ease: 'power4.out',
    });
    const { rotationX, rotationY } = proxy.current;
    groupRef.current.rotation.x = rotationX;
    groupRef.current.rotation.y = rotationY;
  });

  return (
    <group ref={groupRef}>
      {meshes.map(({ geometry, matrix }, i) => (
        <mesh key={i} geometry={geometry} matrix={matrix} matrixAutoUpdate={false}>
          <MeshTransmissionMaterial {...GLASS_MAT} />
        </mesh>
      ))}
    </group>
  );
}

function SceneLight({ scrollProgressRef }: { scrollProgressRef?: RefObject<number> } = {}) {
  const defaultProgressRef = useRef(0);
  const progressRef = scrollProgressRef ?? defaultProgressRef;

  return (
    <div className="absolute top-0 left-0 z-0 h-screen w-screen" aria-hidden>
      <Canvas
        camera={{ fov: 50, position: [0, 0, 4.5] }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
          Object.assign(gl, {
            toneMapping: ACESFilmicToneMapping,
            toneMappingExposure: 1.2,
          });
        }}
      >
        <Environment preset="studio" />
        <FlatText scrollProgressRef={progressRef} />
        <LogoModel />
      </Canvas>
    </div>
  );
}

export default SceneLight;
