import React, { useMemo } from 'react';
import { DoubleSide, Shape } from 'three';

const profiles = {
  suv: {
    body: [[-1.82, 0.46], [1.82, 0.46], [1.82, 1.02], [1.18, 1.12], [0.82, 1.65], [-0.72, 1.65], [-1.12, 1.14], [-1.82, 1.08]],
    windows: [[-0.98, 1.2], [-0.62, 1.55], [0.7, 1.55], [1.02, 1.15]],
  },
  pickup: {
    body: [[-1.82, 0.46], [1.82, 0.46], [1.82, 1.0], [0.34, 1.0], [0.18, 1.55], [-0.82, 1.55], [-1.12, 1.12], [-1.82, 1.08]],
    windows: [[-0.98, 1.18], [-0.72, 1.46], [0.06, 1.46], [0.08, 1.05]],
  },
  van: {
    body: [[-1.82, 0.46], [1.82, 0.46], [1.82, 1.32], [1.55, 1.72], [-1.18, 1.72], [-1.62, 1.42], [-1.82, 1.18]],
    windows: [[-1.48, 1.26], [-1.12, 1.61], [-0.35, 1.61], [-0.35, 1.24]],
  },
  sedan: {
    body: [[-1.82, 0.46], [1.82, 0.46], [1.82, 0.92], [1.16, 1.06], [0.68, 1.46], [0.35, 1.51], [-0.58, 1.48], [-1.05, 1.08], [-1.72, 1.0]],
    windows: [[-0.94, 1.12], [-0.52, 1.4], [0.3, 1.42], [0.67, 1.1]],
  },
  sports: {
    body: [[-1.82, 0.44], [1.82, 0.44], [1.82, 0.78], [1.12, 0.9], [0.52, 1.22], [-0.36, 1.23], [-0.88, 0.94], [-1.72, 0.86]],
    windows: [[-0.78, 0.98], [-0.3, 1.17], [0.42, 1.16], [0.94, 0.9]],
  },
};

const paintByCategory = {
  SUV: ['#33a89b', '#607f9c'],
  Pickup: ['#dc914b', '#748b58'],
  Van: ['#e2d5b9'],
  Luxury: ['#b9c3cf'],
  Performance: ['#e45c4f', '#7584c1'],
};

function createShape(points) {
  const shape = new Shape();
  shape.moveTo(points[0][0], points[0][1]);
  points.slice(1).forEach(([x, y]) => shape.lineTo(x, y));
  shape.closePath();
  return shape;
}

function VehicleBody({ car }) {
  const profile = useMemo(() => {
    const category = car.category.toLowerCase();
    const type = category === 'performance'
      ? (car.name.toLowerCase().includes('corvette') ? 'sports' : 'sedan')
      : category === 'luxury'
        ? 'sedan'
        : profiles[category] ? category : 'suv';
    const colors = paintByCategory[car.category] || ['#d3a54c'];
    const colorIndex = Math.abs([...car.id].reduce((sum, character) => sum + character.charCodeAt(0), 0)) % colors.length;
    return { ...profiles[type], paint: colors[colorIndex], type };
  }, [car.category, car.id, car.name]);
  const bodyShape = useMemo(() => createShape(profile.body), [profile]);
  const windowShape = useMemo(() => createShape(profile.windows), [profile]);
  const wheels = profile.type === 'van'
    ? [-1.22, 1.22]
    : [-1.25, 1.25];

  return (
    <group>
      <mesh position={[0, 0, -0.78]} castShadow receiveShadow>
        <extrudeGeometry args={[bodyShape, { depth: 1.56, bevelEnabled: true, bevelThickness: 0.045, bevelSize: 0.035, bevelSegments: 2 }]} />
        <meshStandardMaterial color={profile.paint} metalness={0.45} roughness={0.32} />
      </mesh>

      {[-1, 1].map((side) => (
        <React.Fragment key={side}>
          <mesh position={[0, 0, side * 0.8]}>
            <shapeGeometry args={[windowShape]} />
            <meshStandardMaterial color="#172832" metalness={0.35} roughness={0.2} side={DoubleSide} />
          </mesh>
          <mesh position={[-0.05, 0.83, side * 0.83]}>
            <boxGeometry args={[0.045, 0.24, 0.035]} />
            <meshStandardMaterial color="#6e8790" metalness={0.75} roughness={0.25} />
          </mesh>
          <mesh position={[0, 0.68, side * 0.79]}>
            <boxGeometry args={[0.22, 0.055, 0.035]} />
            <meshStandardMaterial color="#dbe1e3" metalness={0.8} roughness={0.24} />
          </mesh>
          {wheels.map((x) => (
            <group key={`${side}-${x}`} position={[x, 0.52, side * 0.78]}>
              <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
                <cylinderGeometry args={[0.42, 0.42, 0.25, 32]} />
                <meshStandardMaterial color="#17191c" roughness={0.83} />
              </mesh>
              <mesh position={[0, 0, side * 0.135]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.245, 0.245, 0.035, 24]} />
                <meshStandardMaterial color="#bdc7ce" metalness={0.85} roughness={0.22} />
              </mesh>
              <mesh position={[0, 0, side * 0.158]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.085, 0.085, 0.04, 16]} />
                <meshStandardMaterial color="#515d64" metalness={0.65} roughness={0.28} />
              </mesh>
            </group>
          ))}
        </React.Fragment>
      ))}

      <mesh position={[1.83, 0.78, 0]}>
        <boxGeometry args={[0.06, 0.23, 0.56]} />
        <meshStandardMaterial color="#242a2e" metalness={0.55} roughness={0.35} />
      </mesh>
      <mesh position={[1.87, 0.86, 0]}>
        <boxGeometry args={[0.035, 0.13, 0.48]} />
        <meshStandardMaterial color="#84939a" metalness={0.65} roughness={0.28} />
      </mesh>
      {[-1, 1].map((side) => (
        <React.Fragment key={`lights-${side}`}>
          <mesh position={[1.81, 0.91, side * 0.56]}>
            <boxGeometry args={[0.08, 0.13, 0.2]} />
            <meshStandardMaterial color="#fff4cc" emissive="#ffc95c" emissiveIntensity={0.55} />
          </mesh>
          <mesh position={[-1.81, 0.84, side * 0.58]}>
            <boxGeometry args={[0.07, 0.17, 0.18]} />
            <meshStandardMaterial color="#b93632" emissive="#67120f" emissiveIntensity={0.35} />
          </mesh>
        </React.Fragment>
      ))}
    </group>
  );
}

export function ProceduralVehicle({ car }) {
  return (
    <group rotation={[0, -Math.PI / 2, 0]}>
      <mesh position={[0, 0.09, 0]} receiveShadow>
        <cylinderGeometry args={[2.35, 2.35, 0.16, 64]} />
        <meshStandardMaterial color="#22272b" metalness={0.55} roughness={0.48} />
      </mesh>
      <mesh position={[0, 0.18, 0]}>
        <cylinderGeometry args={[1.9, 1.9, 0.025, 64]} />
        <meshStandardMaterial color="#343a3e" metalness={0.25} roughness={0.62} />
      </mesh>
      <VehicleBody car={car} />
    </group>
  );
}
