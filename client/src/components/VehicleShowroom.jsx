import React, { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Bounds, Center, OrbitControls, useGLTF } from '@react-three/drei';
import { Rotate3D } from 'lucide-react';

function VehicleModel({ src }) {
  const { scene } = useGLTF(src);

  return (
    <Bounds fit clip observe margin={1.25}>
      <Center>
        <primitive object={scene} />
      </Center>
    </Bounds>
  );
}

function ModelCanvas({ src, autoRotate }) {
  return (
    <Canvas camera={{ position: [4, 2.4, 5], fov: 40 }} dpr={[1, 1.5]}>
      <color attach="background" args={['#111111']} />
      <ambientLight intensity={1.5} />
      <directionalLight position={[5, 6, 5]} intensity={3} />
      <directionalLight position={[-5, 2, -4]} intensity={1.5} />
      <Suspense fallback={null}>
        <VehicleModel src={src} />
        <OrbitControls
          makeDefault
          enableDamping
          enablePan={false}
          minDistance={2}
          maxDistance={10}
          autoRotate={autoRotate}
          autoRotateSpeed={0.65}
        />
      </Suspense>
    </Canvas>
  );
}

export function VehicleShowroom({ car, fallbackImage = car.mainImage }) {
  const [modelCheck, setModelCheck] = useState({ carId: car.id, result: 'checking' });
  const [autoRotate, setAutoRotate] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const modelPath = `${car.modelUrl}?check=${encodeURIComponent(car.id)}`;

    fetch(modelPath, { method: 'HEAD', signal: controller.signal })
      .then((response) => {
        const contentType = response.headers.get('content-type') || '';
        if (response.status === 404 || (response.ok && contentType.includes('text/html'))) {
          setModelCheck({ carId: car.id, result: 'missing' });
          return;
        }
        if (!response.ok) {
          setModelCheck({ carId: car.id, result: 'error' });
          return;
        }
        setModelCheck({ carId: car.id, result: 'available' });
      })
      .catch((error) => {
        if (error.name !== 'AbortError') setModelCheck({ carId: car.id, result: 'error' });
      });

    return () => controller.abort();
  }, [car.id, car.modelUrl]);

  const currentModelResult = modelCheck.carId === car.id ? modelCheck.result : 'checking';
  const modelAvailable = currentModelResult === 'available';
  const modelCheckError = currentModelResult === 'error';

  return (
    <div
      className="relative aspect-[16/11] overflow-hidden rounded-[24px] bg-[#111]"
      onPointerEnter={() => setAutoRotate(true)}
      onPointerLeave={() => setAutoRotate(false)}
      onTouchStart={() => setAutoRotate(false)}
      onTouchEnd={() => setAutoRotate(true)}
      aria-label={`Interactive 360 degree showroom for ${car.name}`}
    >
      {modelAvailable ? (
        <ModelCanvas src={car.modelUrl} autoRotate={autoRotate} />
      ) : (
        <>
          <img
            src={fallbackImage}
            alt={`${car.name} from Acceleren Motors Instagram`}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-white">
            <div>
              <div className="flex items-center gap-2 text-sm font-bold">
                <Rotate3D className="h-5 w-5 text-[#FFB400]" />
                360° 3D showroom
              </div>
              <p className="mt-1 max-w-[42ch] text-xs leading-5 text-white/75">
                {modelCheckError
                  ? 'The 3D model could not be checked. Please reload the page or contact the dealership.'
                  : 'This vehicle’s 3D model is not installed yet. Add its GLB file to enable mouse and touch rotation.'}
              </p>
            </div>
            <span className="shrink-0 rounded-full border border-white/30 px-3 py-1 text-[10px] tracking-wide">
              {modelCheckError ? 'MODEL CHECK FAILED' : 'MODEL PENDING'}
            </span>
          </div>
        </>
      )}
      {modelAvailable && (
        <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/65 px-4 py-2 text-center text-[11px] text-white backdrop-blur">
          Drag or swipe to rotate • pinch or scroll to zoom
        </div>
      )}
    </div>
  );
}
