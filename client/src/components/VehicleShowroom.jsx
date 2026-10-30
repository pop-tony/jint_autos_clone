import React, { Suspense, useMemo, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { ContactShadows, OrbitControls, useGLTF } from '@react-three/drei';
import { Rotate3D } from 'lucide-react';
import { Box3, Vector3 } from 'three';
import { ProceduralVehicle } from './ProceduralVehicle';

const MODEL_BY_CAR_ID = {
  'lexus-suv': '/3dmodels/lexus_xanadu.glb',
  'toyota-pickup': '/3dmodels/toyota_tundra.glb',
  'toyota-van': '/3dmodels/toyota_hiace.glb',
  'chevrolet-corvette': '/3dmodels/corvette_c8.glb',
  'performance-sedan': '/3dmodels/audi_rs7.glb',
};

function GlbVehicle({ modelUrl }) {
  const { scene } = useGLTF(modelUrl);
  const transform = useMemo(() => {
    const bounds = new Box3().setFromObject(scene);
    const size = bounds.getSize(new Vector3());
    const center = bounds.getCenter(new Vector3());
    const scale = 4.2 / Math.max(size.x, size.y, size.z);

    return {
      scale,
      position: [
        -center.x * scale,
        0.18 - bounds.min.y * scale,
        -center.z * scale,
      ],
    };
  }, [scene]);

  return (
    <group position={transform.position} scale={transform.scale}>
      <primitive object={scene} />
    </group>
  );
}

class ModelLoadBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.error('Unable to load showroom GLB; using procedural model.', error);
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}

function ShowroomVehicle({ car }) {
  const modelUrl = MODEL_BY_CAR_ID[car.id];
  if (!modelUrl) return <ProceduralVehicle car={car} />;

  const fallback = <ProceduralVehicle car={car} />;
  return (
    <ModelLoadBoundary key={modelUrl} fallback={fallback}>
      <Suspense fallback={fallback}>
        <GlbVehicle modelUrl={modelUrl} />
      </Suspense>
    </ModelLoadBoundary>
  );
}

function ModelCanvas({ car, autoRotate }) {
  return (
    <Canvas camera={{ position: [4.5, 2.6, 5.5], fov: 38 }} dpr={[1, 1.5]}>
      <color attach="background" args={['#111519']} />
      <ambientLight intensity={1.1} />
      <directionalLight position={[5, 7, 6]} intensity={3.2} />
      <directionalLight position={[-5, 4, -4]} intensity={2} color="#b9d8ff" />
      <pointLight position={[0, 3, 0]} intensity={1.3} color="#ffc45c" />
      <ShowroomVehicle car={car} />
      <ContactShadows position={[0, 0.18, 0]} opacity={0.45} scale={6} blur={2.5} far={3} />
      <OrbitControls
        makeDefault
        enableDamping
        enablePan={false}
        minDistance={3.5}
        maxDistance={9}
        target={[0, 0.9, 0]}
        autoRotate={autoRotate}
        autoRotateSpeed={0.65}
      />
    </Canvas>
  );
}

export function VehicleShowroom({ car }) {
  const [autoRotate, setAutoRotate] = useState(true);

  return (
    <div
      className="relative aspect-[16/11] overflow-hidden rounded-[24px] bg-[#111]"
      onPointerEnter={() => setAutoRotate(true)}
      onPointerLeave={() => setAutoRotate(false)}
      onTouchStart={() => setAutoRotate(false)}
      onTouchEnd={() => setAutoRotate(true)}
      aria-label={`Interactive 360 degree showroom for ${car.name}`}
    >
      <ModelCanvas car={car} autoRotate={autoRotate} />
      <div className="pointer-events-none absolute left-4 top-4 flex items-center gap-2 rounded-full bg-black/55 px-3 py-2 text-[10px] font-semibold tracking-wide text-white backdrop-blur">
        <Rotate3D className="h-4 w-4 text-[#FFB400]" />
        {MODEL_BY_CAR_ID[car.id] ? '3D MODEL PREVIEW' : 'STYLIZED 3D CONCEPT'}
      </div>
      <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/65 px-4 py-2 text-center text-[11px] text-white backdrop-blur">
        Drag or swipe to rotate • pinch or scroll to zoom
      </div>
    </div>
  );
}
