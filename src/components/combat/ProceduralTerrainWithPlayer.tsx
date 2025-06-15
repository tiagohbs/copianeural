import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Função simples para gerar altura (pode ser substituída por Perlin/Simplex)
function getHeight(x: number, y: number) {
  return Math.sin(x * 0.3) * Math.cos(y * 0.3) * 2;
}

const Terrain: React.FC = () => {
  const mesh = useRef<THREE.Mesh>(null);
  const size = 32;
  const geometry = new THREE.PlaneGeometry(16, 16, size, size);
  for (let i = 0; i < geometry.attributes.position.count; i++) {
    const x = geometry.attributes.position.getX(i);
    const y = geometry.attributes.position.getY(i);
    geometry.attributes.position.setZ(i, getHeight(x, y));
  }
  geometry.computeVertexNormals();
  return (
    <mesh ref={mesh} geometry={geometry} rotation-x={-Math.PI / 2} receiveShadow>
      <meshStandardMaterial color="#2ecc40" />
    </mesh>
  );
};

const Player: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  return (
    <mesh position={position} castShadow>
      <sphereGeometry args={[0.4, 32, 32]} />
      <meshStandardMaterial color="#00bfff" />
    </mesh>
  );
};

// PlayerController precisa ser filho de Canvas para usar hooks do R3F
const PlayerController: React.FC = () => {
  const [playerPos, setPlayerPos] = useState<[number, number, number]>([0, 0.5, 0]);
  const keys = useRef<{ [key: string]: boolean }>({});

  useFrame(() => {
    let [x, y, z] = playerPos;
    let moved = false;
    if (keys.current["ArrowUp"] || keys.current["w"]) {
      z -= 0.1;
      moved = true;
    }
    if (keys.current["ArrowDown"] || keys.current["s"]) {
      z += 0.1;
      moved = true;
    }
    if (keys.current["ArrowLeft"] || keys.current["a"]) {
      x -= 0.1;
      moved = true;
    }
    if (keys.current["ArrowRight"] || keys.current["d"]) {
      x += 0.1;
      moved = true;
    }
    if (moved) {
      const yTerrain = getHeight(x, z) + 0.5;
      setPlayerPos([x, yTerrain, z]);
    }
  });

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keys.current[e.key] = true;
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      keys.current[e.key] = false;
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return <Player position={playerPos} />;
};

const ProceduralTerrainWithPlayer: React.FC = () => {
  return (
    <div style={{ width: "100%", height: 300, borderRadius: 12, overflow: "hidden" }}>
      <Canvas camera={{ position: [0, 12, 12], fov: 50 }} shadows>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 10, 7]} intensity={1.2} castShadow />
        <Terrain />
        <PlayerController />
      </Canvas>
    </div>
  );
};

export default ProceduralTerrainWithPlayer;
