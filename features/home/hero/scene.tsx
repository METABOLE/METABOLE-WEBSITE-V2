import { useMousePosition } from '@/hooks/useMousePosition';
import { useGLTF } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import gsap from 'gsap';
import { useEffect, useMemo, useRef } from 'react';
import {
  type DirectionalLight,
  type Group,
  type PointLight,
  Box3,
  Color,
  Mesh,
  MeshStandardMaterial,
  Vector3,
} from 'three';

const ROTATION = Math.PI * 0.35;
const POSITION = 0.3;

const RAMP = `
  float t = clamp((vWorldPos.z + 0.7) / 1.4, 0.0, 1.0);
  vec3 c0 = vec3(1.000, 1.000, 1.000);
  vec3 c1 = vec3(0.298, 0.518, 1.000);
  vec3 c2 = vec3(0.106, 0.071, 1.000);
  vec3 c3 = vec3(0.616, 0.000, 1.000);
  vec3 rampColor;
  if (t < 0.333) {
    rampColor = mix(c0, c1, t / 0.333);
  } else if (t < 0.667) {
    rampColor = mix(c1, c2, (t - 0.333) / 0.334);
  } else {
    rampColor = mix(c2, c3, (t - 0.667) / 0.333);
  }
  outgoingLight *= rampColor;
`;

function LogoModel() {
  const ref = useRef<Group>(null);
  const { mousePosition } = useMousePosition();
  const { scene } = useGLTF('/3d/obj/logo.glb', true);

  const material = useMemo(() => {
    const mat = new MeshStandardMaterial({
      color: new Color(0xffffff),
      metalness: 0.0,
      roughness: 0.1,
    });
    mat.customProgramCacheKey = () => 'logo-depth-ramp';

    mat.onBeforeCompile = (shader) => {
      shader.vertexShader = shader.vertexShader
        .replace(
          '#include <normal_pars_vertex>',
          '#include <normal_pars_vertex>\nvarying vec3 vWorldPos;',
        )
        .replace(
          '#include <begin_vertex>',
          '#include <begin_vertex>\nvWorldPos = (modelMatrix * vec4(transformed, 1.0)).xyz;',
        );

      shader.fragmentShader = `varying vec3 vWorldPos;\n${shader.fragmentShader}`;

      shader.fragmentShader = shader.fragmentShader.replace(
        '#include <opaque_fragment>',
        `${RAMP}\n  #include <opaque_fragment>`,
      );
    };

    return mat;
  }, []);

  const model = useMemo(() => {
    const clone = scene.clone();

    const box1 = new Box3().setFromObject(clone);
    const size = new Vector3();
    box1.getSize(size);
    clone.scale.setScalar(1.4 / Math.max(size.x, size.y, size.z));

    const box2 = new Box3().setFromObject(clone);
    const center = new Vector3();
    box2.getCenter(center);
    clone.position.sub(center);
    clone.scale.setScalar(1.4 / Math.max(size.x, size.y, size.z));
    clone.traverse((child) => {
      if (child instanceof Mesh && child.geometry) {
        if (child.material) {
          Array.isArray(child.material)
            ? child.material.forEach((m) => m.dispose())
            : child.material.dispose();
        }
        child.material = material;
      }
    });
    return clone;
  }, [scene]);

  useEffect(() => () => material.dispose(), [material]);

  useFrame(() => {
    if (!ref.current) return;
    const nx = mousePosition.x / window.innerWidth - 0.5;
    const ny = mousePosition.y / window.innerHeight - 0.5;
    const group = ref.current;
    gsap.to(group.rotation, {
      x: ny * ROTATION,
      y: nx * ROTATION,
      duration: 0.5,
      ease: 'power2.out',
      overwrite: true,
    });
    gsap.to(group.position, {
      x: -nx * POSITION,
      y: ny * POSITION,
      duration: 0.5,
      ease: 'power2.out',
      overwrite: true,
    });
  });

  return (
    <group ref={ref}>
      <primitive object={model} />
    </group>
  );
}

export default function Scene() {
  const dirRef = useRef<DirectionalLight>(null);
  const pointRef = useRef<PointLight>(null);

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
            onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
          >
            <ambientLight color={0x1b17ee} intensity={1} />
            <directionalLight ref={dirRef} color={0xbdbcff} intensity={5.2} position={[-2, 2, 3]} />
            <pointLight ref={pointRef} color={0xffffff} intensity={0.2} position={[1, 1, 1]} />
            <LogoModel />
          </Canvas>
        </div>
      </div>
    </div>
  );
}
