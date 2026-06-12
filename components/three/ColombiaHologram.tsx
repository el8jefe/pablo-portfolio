"use client";
import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// Simplified Colombia border coordinates [lng, lat]
const COLOMBIA_COORDS: [number, number][] = [
  [-76.57, 8.67], [-77.35, 8.37], [-77.49, 7.70], [-77.72, 7.71],
  [-77.81, 8.00], [-77.49, 8.35], [-77.36, 8.67], [-76.99, 8.87],
  [-76.57, 9.45], [-75.66, 10.20], [-74.87, 11.10], [-74.20, 11.30],
  [-73.61, 11.10], [-72.69, 11.44], [-72.24, 11.87], [-71.98, 11.43],
  [-71.32, 11.78], [-71.25, 11.75], [-71.31, 10.44], [-72.40, 9.44],
  [-72.66, 7.49], [-72.44, 7.46], [-72.08, 6.96], [-72.09, 6.44],
  [-71.75, 6.17], [-70.98, 6.48], [-70.09, 6.52], [-69.44, 6.14],
  [-68.48, 6.15], [-67.87, 6.47], [-67.44, 6.02], [-67.64, 4.70],
  [-67.82, 4.23], [-67.39, 3.37], [-67.85, 2.86], [-67.30, 2.09],
  [-66.87, 1.22], [-67.07, 1.17], [-67.26, 1.73], [-68.27, 1.95],
  [-68.47, 0.95], [-70.02, 0.55], [-70.09, -0.19], [-70.63, -0.73],
  [-70.10, -1.08], [-70.29, -2.24], [-70.47, -2.47], [-71.25, -2.33],
  [-72.10, -2.21], [-72.89, -2.40], [-73.67, -1.26], [-74.29, -0.53],
  [-74.56, 0.51], [-75.26, 0.12], [-75.82, -0.07], [-76.29, 0.42],
  [-76.84, 0.55], [-77.26, 0.84], [-77.42, 1.13], [-77.99, 1.33],
  [-78.60, 1.31], [-78.73, 2.00], [-78.22, 2.67], [-77.90, 3.45],
  [-77.50, 4.19], [-77.27, 4.69], [-77.38, 5.57], [-77.22, 6.02],
  [-77.50, 6.80], [-77.35, 7.70],
];

// Convert [lng, lat] to normalized [x, y] centered on Colombia
const CENTER_LNG = -73.5;
const CENTER_LAT = 4.0;
const SCALE = 9;

function normalize([lng, lat]: [number, number]): [number, number] {
  return [(lng - CENTER_LNG) / SCALE, (lat - CENTER_LAT) / SCALE];
}

function ColombiaShape() {
  const meshRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const { mouse } = useThree();

  const { shape, borderPoints } = useMemo(() => {
    const pts = COLOMBIA_COORDS.map(normalize);
    const s = new THREE.Shape();
    s.moveTo(pts[0][0], pts[0][1]);
    pts.slice(1).forEach(([x, y]) => s.lineTo(x, y));
    s.closePath();

    // Points along border for particle trail
    const borderPts: number[] = [];
    pts.forEach(([x, y]) => {
      borderPts.push(x, y, 0.08);
    });

    return { shape: s, borderPoints: new Float32Array(borderPts) };
  }, []);

  const extrudeSettings = useMemo<THREE.ExtrudeGeometryOptions>(
    () => ({ depth: 0.04, bevelEnabled: false }),
    []
  );

  const geometry = useMemo(
    () => new THREE.ExtrudeGeometry(shape, extrudeSettings),
    [shape, extrudeSettings]
  );

  const hologramMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#FF3D00",
        emissive: "#FF3D00",
        emissiveIntensity: 0.8,
        transparent: true,
        opacity: 0.35,
        side: THREE.DoubleSide,
        wireframe: false,
      }),
    []
  );

  const edgeMaterial = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: "#FF6B35",
        transparent: true,
        opacity: 0.9,
        linewidth: 1,
      }),
    []
  );

  const edgeGeometry = useMemo(() => {
    const pts2d = COLOMBIA_COORDS.map(normalize);
    const points3d = pts2d.map(([x, y]) => new THREE.Vector3(x, y, 0.06));
    points3d.push(points3d[0]); // close path
    return new THREE.BufferGeometry().setFromPoints(points3d);
  }, []);

  const particlesMaterial = useMemo(
    () =>
      new THREE.PointsMaterial({
        color: "#FF3D00",
        size: 0.025,
        transparent: true,
        opacity: 0.9,
      }),
    []
  );

  const particlesGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute(
      "position",
      new THREE.BufferAttribute(borderPoints, 3)
    );
    return geo;
  }, [borderPoints]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(t * 0.3) * 0.15;
      meshRef.current.rotation.x = Math.sin(t * 0.2) * 0.06 + mouse.y * 0.05;
      meshRef.current.rotation.z = Math.cos(t * 0.25) * 0.04 + mouse.x * 0.04;
      // Pulse opacity
      (hologramMaterial as THREE.MeshStandardMaterial).emissiveIntensity =
        0.7 + Math.sin(t * 1.5) * 0.3;
      (hologramMaterial as THREE.MeshStandardMaterial).opacity =
        0.28 + Math.sin(t * 0.8) * 0.08;
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.copy(meshRef.current!.rotation);
    }
  });

  return (
    <group>
      <mesh ref={meshRef} geometry={geometry} material={hologramMaterial} />
      <mesh geometry={geometry}>
        <meshStandardMaterial
          color="#FF3D00"
          emissive="#FF3D00"
          emissiveIntensity={0.4}
          transparent
          opacity={0.12}
          wireframe
        />
      </mesh>
      <lineLoop geometry={edgeGeometry} material={edgeMaterial} />
      <points
        ref={particlesRef}
        geometry={particlesGeo}
        material={particlesMaterial}
      />
    </group>
  );
}

export default function ColombiaHologram() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 0, 3]} color="#FF3D00" intensity={2} />
      <pointLight position={[-2, 2, 1]} color="#FF6B35" intensity={1} />
      <ColombiaShape />
    </>
  );
}
