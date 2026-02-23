import { OrbitControls, useHelper } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import {
  createContext,
  ReactNode,
  RefObject,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {
  CameraHelper,
  DirectionalLight,
  DirectionalLightHelper,
  Object3D,
  PerspectiveCamera,
  PointLight,
  PointLightHelper,
} from 'three';

const HELPER_SIZE = 0.8;

const DebugContext = createContext(false);

/**
 * Composant rendu après les lumières dans l'arbre pour que dirRef/pointRef
 * soient déjà remplis quand useHelper s'exécute (sinon ref.current est null).
 */
function SceneHelpers({
  showHelpers,
  dirRef,
  pointRef,
  cameraRef,
}: {
  showHelpers: boolean;
  dirRef: RefObject<DirectionalLight | null>;
  pointRef: RefObject<PointLight | null>;
  cameraRef: RefObject<PerspectiveCamera | null>;
}) {
  const dirHelperRef = useHelper(
    dirRef as RefObject<Object3D>,
    DirectionalLightHelper,
    HELPER_SIZE,
    0xff8080,
  );
  const pointHelperRef = useHelper(
    pointRef as RefObject<Object3D>,
    PointLightHelper,
    HELPER_SIZE,
    0x80ffff,
  );
  const cameraHelperRef = useHelper(cameraRef as RefObject<Object3D>, CameraHelper);

  useLayoutEffect(() => {
    const visible = showHelpers;
    if (dirHelperRef.current) dirHelperRef.current.visible = visible;
    if (pointHelperRef.current) pointHelperRef.current.visible = visible;
    if (cameraHelperRef.current) cameraHelperRef.current.visible = visible;
  }, [showHelpers, dirHelperRef, pointHelperRef, cameraHelperRef]);

  return null;
}

const Helpers = ({
  dirRef,
  pointRef,
  children,
}: {
  dirRef: RefObject<DirectionalLight | null>;
  pointRef: RefObject<PointLight | null>;
  children: ReactNode;
}) => {
  const [showHelpers, setShowHelpers] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = window.location.search
      .slice(1)
      .split('&')
      .find((s) => s.startsWith('scene='));
    setShowHelpers(params?.split('=')[1] === 'debug');
  }, []);

  const { camera } = useThree();
  const cameraRef = useRef<PerspectiveCamera | null>(camera as PerspectiveCamera);
  useLayoutEffect(() => {
    cameraRef.current = camera as PerspectiveCamera;
  }, [camera]);

  return (
    <DebugContext.Provider value={showHelpers}>
      {showHelpers && <OrbitControls />}
      {children}
      <SceneHelpers
        cameraRef={cameraRef}
        dirRef={dirRef}
        pointRef={pointRef}
        showHelpers={showHelpers}
      />
    </DebugContext.Provider>
  );
};

export default Helpers;
