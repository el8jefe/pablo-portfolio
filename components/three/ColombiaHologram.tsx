"use client";
import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// Real Colombia border coordinates from Natural Earth GeoJSON [lng, lat]
const COLOMBIA_COORDS: [number, number][] = [
  [-75.373223,-0.152032],[-75.801466,0.084801],[-76.292314,0.416047],
  [-76.57638,0.256936],[-77.424984,0.395687],[-77.668613,0.825893],
  [-77.855061,0.809925],[-78.855259,1.380924],[-78.990935,1.69137],
  [-78.617831,1.766404],[-78.662118,2.267355],[-78.42761,2.629556],
  [-77.931543,2.696606],[-77.510431,3.325017],[-77.12769,3.849636],
  [-77.496272,4.087606],[-77.307601,4.667984],[-77.533221,5.582812],
  [-77.318815,5.845354],[-77.476661,6.691116],[-77.881571,7.223771],
  [-77.753414,7.70984],[-77.431108,7.638061],[-77.242566,7.935278],
  [-77.474723,8.524286],[-77.353361,8.670505],[-76.836674,8.638749],
  [-76.086384,9.336821],[-75.6746,9.443248],[-75.664704,9.774003],
  [-75.480426,10.61899],[-74.906895,11.083045],[-74.276753,11.102036],
  [-74.197223,11.310473],[-73.414764,11.227015],[-72.627835,11.731972],
  [-72.238195,11.95555],[-71.75409,12.437303],[-71.399822,12.376041],
  [-71.137461,12.112982],[-71.331584,11.776284],[-71.973922,11.608672],
  [-72.227575,11.108702],[-72.614658,10.821975],[-72.905286,10.450344],
  [-73.027604,9.73677],[-73.304952,9.152],[-72.78873,9.085027],
  [-72.660495,8.625288],[-72.439862,8.405275],[-72.360901,8.002638],
  [-72.479679,7.632506],[-72.444487,7.423785],[-72.198352,7.340431],
  [-71.960176,6.991615],[-70.674234,7.087785],[-70.093313,6.960376],
  [-69.38948,6.099861],[-68.985319,6.206805],[-68.265052,6.153268],
  [-67.695087,6.267318],[-67.34144,6.095468],[-67.521532,5.55687],
  [-67.744697,5.221129],[-67.823012,4.503937],[-67.621836,3.839482],
  [-67.337564,3.542342],[-67.303173,3.318454],[-67.809938,2.820655],
  [-67.447092,2.600281],[-67.181294,2.250638],[-66.876326,1.253361],
  [-67.065048,1.130112],[-67.259998,1.719999],[-67.53781,2.037163],
  [-67.868565,1.692455],[-69.816973,1.714805],[-69.804597,1.089081],
  [-69.218638,0.985677],[-69.252434,0.602651],[-69.452396,0.706159],
  [-70.015566,0.541414],[-70.020656,-0.185156],[-69.577065,-0.549992],
  [-69.420486,-1.122619],[-69.444102,-1.556287],[-69.893635,-4.298187],
  [-70.394044,-3.766591],[-70.692682,-3.742872],[-70.047709,-2.725156],
  [-70.813476,-2.256865],[-71.413646,-2.342802],[-71.774761,-2.16979],
  [-72.325787,-2.434218],[-73.070392,-2.308954],[-73.659504,-1.260491],
  [-74.122395,-1.002833],[-74.441601,-0.53082],[-75.106625,-0.057205],
  [-75.373223,-0.152032],
];

// Smaller scale = bigger map on screen
const CENTER_LNG = -72.95;
const CENTER_LAT = 4.07;
const SCALE = 6;

function normalize([lng, lat]: [number, number]): [number, number] {
  return [(lng - CENTER_LNG) / SCALE, (lat - CENTER_LAT) / SCALE];
}

function ColombiaShape() {
  const groupRef = useRef<THREE.Group>(null);
  const fillMaterial = useRef<THREE.MeshStandardMaterial>(null);
  const { mouse } = useThree();

  const { shape, borderPoints } = useMemo(() => {
    const pts = COLOMBIA_COORDS.map(normalize);
    const s = new THREE.Shape();
    s.moveTo(pts[0][0], pts[0][1]);
    pts.slice(1).forEach(([x, y]) => s.lineTo(x, y));
    s.closePath();
    const borderPts: number[] = [];
    pts.forEach(([x, y]) => borderPts.push(x, y, 0.08));
    return { shape: s, borderPoints: new Float32Array(borderPts) };
  }, []);

  const geometry = useMemo(
    () => new THREE.ExtrudeGeometry(shape, { depth: 0.05, bevelEnabled: false }),
    [shape]
  );

  const mat = useMemo(() => {
    const m = new THREE.MeshStandardMaterial({
      color: "#FF3D00",
      emissive: "#FF3D00",
      emissiveIntensity: 1.2,
      transparent: true,
      opacity: 0.5,
      side: THREE.DoubleSide,
    });
    (fillMaterial as React.MutableRefObject<THREE.MeshStandardMaterial>).current = m;
    return m;
  }, []);

  const wireMat = useMemo(
    () => new THREE.MeshStandardMaterial({
      color: "#FF3D00", emissive: "#FF3D00", emissiveIntensity: 0.4,
      transparent: true, opacity: 0.12, wireframe: true,
    }), []
  );

  const edgeGeo = useMemo(() => {
    const pts2d = COLOMBIA_COORDS.map(normalize);
    const pts3d = pts2d.map(([x, y]) => new THREE.Vector3(x, y, 0.06));
    pts3d.push(pts3d[0]);
    return new THREE.BufferGeometry().setFromPoints(pts3d);
  }, []);

  const edgeMat = useMemo(
    () => new THREE.LineBasicMaterial({ color: "#FF6B35", transparent: true, opacity: 1 }),
    []
  );

  const particlesGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(borderPoints, 3));
    return geo;
  }, [borderPoints]);

  const particlesMat = useMemo(
    () => new THREE.PointsMaterial({ color: "#FF3D00", size: 0.028, transparent: true, opacity: 1 }),
    []
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (!groupRef.current) return;
    // Full continuous 360 Y rotation
    groupRef.current.rotation.y = t * 0.35;
    // Subtle tilt with mouse
    groupRef.current.rotation.x = mouse.y * 0.08;
    groupRef.current.rotation.z = mouse.x * 0.04;
    // Pulse glow
    if (fillMaterial.current) {
      fillMaterial.current.emissiveIntensity = 1.0 + Math.sin(t * 1.5) * 0.4;
      fillMaterial.current.opacity = 0.45 + Math.sin(t * 0.9) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh geometry={geometry} material={mat} />
      <mesh geometry={geometry} material={wireMat} />
      <lineLoop geometry={edgeGeo} material={edgeMat} />
      <points geometry={particlesGeo} material={particlesMat} />
    </group>
  );
}

export default function ColombiaHologram() {
  return (
    <>
      <ambientLight intensity={0.1} />
      <pointLight position={[0, 0, 3]} color="#FF3D00" intensity={3} />
      <pointLight position={[-2, 2, 1]} color="#FF6B35" intensity={1.5} />
      <ColombiaShape />
    </>
  );
}
