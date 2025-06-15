import React, { useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Html } from "@react-three/drei";

// 1. Estrutura dos elementos do mapa
export type MapElementType = 'tree' | 'rock' | 'water' | 'enemy';
export interface MapElement {
  type: MapElementType;
  x: number;
  z: number;
}

// Função de altura com caminho suave e terreno mais plano
function getHeight(x: number, y: number): number {
  // Altura procedural suavizada e menos intensa
  const roughHeight = Math.sin(x * 0.08) * Math.cos(y * 0.08) * 0.7;

  // Caminho central suave (faixa vertical em x=0)
  const pathCenter = 0;
  const pathWidth = 8; // Largura do caminho
  const distToPath = Math.abs(x - pathCenter);
  const t = Math.max(0, 1 - distToPath / pathWidth); // 1 no centro, 0 fora
  const smoothHeight = roughHeight * (1 - t) + 0 * t; // 0 = altura plana

  return smoothHeight;
}

function generateElements(count: number, size: number, pathWidth: number) {
  const elements = [];
  while (elements.length < count) {
    const x = (Math.random() - 0.5) * size;
    const z = (Math.random() - 0.5) * size;
    // Só adiciona se estiver fora do caminho central
    if (Math.abs(x) > pathWidth * 0.7) {
      elements.push({ x, z });
    }
  }
  return elements;
}

// 2. Função procedural para gerar elementos próximos ao personagem
function pseudoRandom(x: number, z: number, seed = 42) {
  return Math.abs(Math.sin(x * 12.9898 + z * 78.233 + seed) * 43758.5453) % 1;
}

function generateProceduralElements(centerX: number, centerZ: number, radius: number, pathWidth: number): MapElement[] {
  const elements: MapElement[] = [];
  for (let x = Math.floor(centerX - radius); x < centerX + radius; x += 3) {
    for (let z = Math.floor(centerZ - radius); z < centerZ + radius; z += 3) {
      // Não gerar elementos no caminho central
      if (Math.abs(x) < pathWidth * 0.7) continue;
      const r = pseudoRandom(x, z);
      if (r < 0.07) elements.push({ type: 'tree', x, z });
      else if (r < 0.12) elements.push({ type: 'rock', x, z });
      else if (r < 0.15) elements.push({ type: 'water', x, z });
      else if (r > 0.98) elements.push({ type: 'enemy', x, z });
    }
  }
  return elements;
}

// 3. Componentes para renderização dos elementos
function Tree({ x, y, z }: { x: number; y: number; z: number }) {
  return (
    <group position={[x, y, z]}>
      <mesh position={[0, 0.5, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 1, 8]} />
        <meshStandardMaterial color="#8B5A2B" />
      </mesh>
      <mesh position={[0, 1.1, 0]} castShadow>
        <coneGeometry args={[0.5, 1, 8]} />
        <meshStandardMaterial color="#228B22" />
      </mesh>
    </group>
  );
}

function Rock({ x, y, z }: { x: number; y: number; z: number }) {
  return (
    <mesh position={[x, y, z]} castShadow>
      <sphereGeometry args={[0.5, 8, 8]} />
      <meshStandardMaterial color="#888888" />
    </mesh>
  );
}

function Water({ x, y, z }: { x: number; y: number; z: number }) {
  return (
    <mesh position={[x, y + 0.05, z]} receiveShadow>
      <cylinderGeometry args={[0.7, 0.7, 0.1, 16]} />
      <meshStandardMaterial color="#3ec6ff" transparent opacity={0.7} />
    </mesh>
  );
}

function Enemy({ x, y, z }: { x: number; y: number; z: number }) {
  return (
    <mesh position={[x, y + 0.5, z]} castShadow>
      <boxGeometry args={[0.5, 1, 0.5]} />
      <meshStandardMaterial color="#ff3333" />
    </mesh>
  );
}

// Componente para elementos do terreno
function TerrainElements({ getHeight, size, pathWidth }: { getHeight: (x: number, z: number) => number, size: number, pathWidth: number }) {
  const rocks = useMemo(() => generateElements(18, size, pathWidth), [size, pathWidth]);
  const trees = useMemo(() => generateElements(14, size, pathWidth), [size, pathWidth]);

  return (
    <>
      {/* Rochas */}
      {rocks.map((pos, i) => (
        <mesh key={`rock-${i}`} position={[pos.x, getHeight(pos.x, pos.z), pos.z]} castShadow>
          <sphereGeometry args={[0.7, 8, 8]} />
          <meshStandardMaterial color="#888888" />
        </mesh>
      ))}
      {/* Árvores */}
      {trees.map((pos, i) => (
        <group key={`tree-${i}`} position={[pos.x, getHeight(pos.x, pos.z), pos.z]}>
          {/* Tronco */}
          <mesh position={[0, 0.5, 0]} castShadow>
            <cylinderGeometry args={[0.15, 0.15, 1, 8]} />
            <meshStandardMaterial color="#8B5A2B" />
          </mesh>
          {/* Copa */}
          <mesh position={[0, 1.1, 0]} castShadow>
            <coneGeometry args={[0.5, 1, 8]} />
            <meshStandardMaterial color="#228B22" />
          </mesh>
        </group>
      ))}
    </>
  );
}

const Terrain: React.FC<{ offset: { x: number; y: number }; elements: MapElement[] }> = ({ offset, elements }) => {
  const mesh = useRef<THREE.Mesh>(null);
  const size = 256;
  const planeSize = 256;
  const pathWidth = 8;

  // Elementos próximos ao personagem
  const elementsProc = useMemo(() =>
    generateProceduralElements(offset.x, offset.y, 32, pathWidth),
    [offset.x, offset.y, pathWidth]
  );

  // Textura de ladrilhos para o caminho central
  const tileTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = '#bcbcbc';
    ctx.fillRect(0, 0, 64, 64);
    ctx.strokeStyle = '#888';
    ctx.lineWidth = 4;
    ctx.strokeRect(0, 0, 64, 64);
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(32, 0); ctx.lineTo(32, 64);
    ctx.moveTo(0, 32); ctx.lineTo(64, 32);
    ctx.stroke();
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(pathWidth / 2, planeSize / 8);
    return texture;
  }, []);

  useFrame(() => {
    if (mesh.current) {
      const geometry = mesh.current.geometry as THREE.PlaneGeometry;
      for (let i = 0; i < geometry.attributes.position.count; i++) {
        const x = geometry.attributes.position.getX(i) + offset.x;
        const y = geometry.attributes.position.getY(i) + offset.y;
        geometry.attributes.position.setZ(i, getHeight(x, y));
      }
      geometry.computeVertexNormals();
      geometry.attributes.position.needsUpdate = true;
    }
  });

  // Cria a geometria apenas uma vez
  const geometry = React.useMemo(() => {
    return new THREE.PlaneGeometry(planeSize, planeSize, size, size);
  }, []);

  // Caminho central como mesh plano acima do terreno
  const pathGeometry = useMemo(() => {
    return new THREE.PlaneGeometry(pathWidth, planeSize, 2, size);
  }, []);

  return (
    <group>
      {/* Terreno base verde */}
      <mesh ref={mesh} geometry={geometry} rotation-x={-Math.PI / 2} receiveShadow position={[0, 0, 0]}>
        <meshStandardMaterial color="#2ecc40" />
        {/* Renderização dos elementos procedurais */}
        {elementsProc.map((el, i) => {
          const y = getHeight(el.x - offset.x, el.z - offset.y);
          if (el.type === 'tree') return <Tree key={i} x={el.x} y={y} z={el.z} />;
          if (el.type === 'rock') return <Rock key={i} x={el.x} y={y} z={el.z} />;
          if (el.type === 'water') return <Water key={i} x={el.x} y={y} z={el.z} />;
          if (el.type === 'enemy') return <Enemy key={i} x={el.x} y={y} z={el.z} />;
          return null;
        })}
      </mesh>
      {/* Caminho central com textura de ladrilhos */}
      <mesh geometry={pathGeometry} rotation-x={-Math.PI / 2} position={[0, 0.01, 0]}>
        <meshStandardMaterial map={tileTexture} transparent={false} />
      </mesh>
    </group>
  );
};

const Player: React.FC<{ offset?: { x: number; y: number } }> = ({ offset }) => {
  // Garante valores padrão seguros
  const x = (offset && typeof offset.x === 'number') ? offset.x : 0;
  const y = (offset && typeof offset.y === 'number') ? offset.y : 0;
  const altura = getHeight(x, y) + 0.5;
  return (
    <mesh position={[0, altura, 0]} castShadow>
      <sphereGeometry args={[0.4, 32, 32]} />
      <meshStandardMaterial color="#00bfff" />
    </mesh>
  );
};

// Componente principal que renderiza o Canvas
const ProceduralTerrainWithPlayer: React.FC = () => {
  const [offset, setOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(true);
  const [inBattle, setInBattle] = useState(false);
  const [defeatedEnemies, setDefeatedEnemies] = useState<Set<string>>(new Set());
  const speed = 0.08;

  // Parâmetros do cenário
  const pathWidth = 8;
  const viewRadius = 32;

  // Elementos próximos ao personagem (mantêm posição lateral ao caminho)
  const elements = useMemo(() => {
    const arr: MapElement[] = [];
    for (let dx = -viewRadius; dx < viewRadius; dx += 3) {
      for (let dz = 0; dz < viewRadius; dz += 3) {
        // Lateral ao caminho
        const lateral = (Math.random() > 0.5 ? 1 : -1) * (pathWidth / 2 + 2 + Math.floor(Math.random() * 10));
        const x = lateral;
        const z = offset.y + dz;
        const r = pseudoRandom(x, z);
        if (Math.abs(x) < pathWidth * 0.7) continue;
        if (r < 0.07) arr.push({ type: 'tree', x, z });
        else if (r < 0.12) arr.push({ type: 'rock', x, z });
        else if (r < 0.15) arr.push({ type: 'water', x, z });
        else if (r > 0.98) arr.push({ type: 'enemy', x, z });
      }
    }
    return arr;
  }, [offset.y]);

  // Remove elementos fora da área de visualização (exceto inimigos ativos)
  const visibleElements = elements.filter(el => {
    if (el.type === 'enemy') {
      // Identificador único para cada inimigo
      const id = `${el.x.toFixed(2)}_${el.z.toFixed(2)}`;
      return !defeatedEnemies.has(id) && el.z > offset.y - 2 && el.z < offset.y + viewRadius;
    }
    return el.z > offset.y - 2 && el.z < offset.y + viewRadius;
  });

  // Controla o offset dentro do Canvas
  const OffsetController = () => {
    useFrame(() => {
      if (isMoving) {
        setOffset((prev) => ({ x: prev.x, y: prev.y + speed }));
      }
    });
    return null;
  };

  // Detecta proximidade com inimigo e pausa movimento
  useEffect(() => {
    if (inBattle) return;
    const enemy = visibleElements.find(
      (el) => el.type === 'enemy' && Math.abs(el.x - offset.x) < 1.2 && Math.abs(el.z - offset.y) < 1.2
    );
    if (enemy) {
      setIsMoving(false);
      setInBattle(true);
      // Marca inimigo como derrotado após "batalha"
      const id = `${enemy.x.toFixed(2)}_${enemy.z.toFixed(2)}`;
      setTimeout(() => {
        setDefeatedEnemies(prev => new Set(prev).add(id));
        setInBattle(false);
        setIsMoving(true);
      }, 2000);
    }
  }, [visibleElements, offset, inBattle]);

  return (
    <div style={{ width: "100%", height: 500, borderRadius: 12, overflow: "hidden", background: '#222' }}>
      <Canvas 
        camera={{ position: [0, 12, 12], fov: 50 }} 
        shadows
        gl={{ antialias: true }}
        style={{ background: '#222' }}
      >
        <color attach="background" args={["#222"]} />
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 10, 7]} intensity={2} castShadow />
        <OffsetController />
        <Terrain offset={offset} elements={visibleElements} />
        <Player offset={offset} />
        {inBattle && (
          <Html center style={{ pointerEvents: 'none', color: 'white', fontSize: 32 }}>
            Batalha!
          </Html>
        )}
      </Canvas>
    </div>
  );
};

export default ProceduralTerrainWithPlayer;
