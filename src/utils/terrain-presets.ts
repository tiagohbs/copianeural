// Presets centralizados para terrenos por modo de jogo
// Edite este arquivo para personalizar facilmente os biomas, cores e parâmetros de cada modo

/**
 * Funções utilitárias para biomas e cores
 * Você pode criar funções de cor reutilizáveis para diferentes biomas
 */
export const biomeColors = {
  agua: '#3ec6ff',
  areia: '#e3d7a3',
  floresta: '#228B22',
  grama: '#7ec850',
  colina: '#bdb76b',
  montanha: '#cccccc',
  abismo: '#22223b',
  pedra: '#444466',
  rocha: '#6c757d',
  caverna: '#bdbdbd',
  lago: '#b3e6ff',
  campo: '#e3e3a3',
  florestaDensa: '#4caf50',
  colinaSeca: '#c2b280',
  pico: '#f5f5f5',
  arenaDourada: '#d4af37',
  areiaTorneio: '#e5c07b',
  platoRoxo: '#c678dd',
};

/**
 * Funções de bioma para cada modo
 * Recebem altura (h) e umidade (m) e retornam uma cor
 */
export function huntBiome(h: number, m: number): string {
  if (h < -1.5) return biomeColors.agua;
  if (h < -0.5) return biomeColors.areia;
  if (h < 1.5 && m > 0.6) return biomeColors.floresta;
  if (h < 1.5) return biomeColors.grama;
  if (h < 3) return biomeColors.colina;
  return biomeColors.montanha;
}

export function dungeonBiome(h: number, m: number): string {
  if (h < -1.2) return biomeColors.abismo;
  if (h < 0.5) return biomeColors.pedra;
  if (h < 2) return biomeColors.rocha;
  return biomeColors.caverna;
}

export function exploreBiome(h: number, m: number): string {
  if (h < -1.2) return biomeColors.lago;
  if (h < 0.2) return biomeColors.campo;
  if (h < 1.5 && m > 0.5) return biomeColors.florestaDensa;
  if (h < 2.5) return biomeColors.colinaSeca;
  return biomeColors.pico;
}

export function tournamentBiome(h: number, m: number): string {
  if (h < -0.8) return biomeColors.arenaDourada;
  if (h < 1.2) return biomeColors.areiaTorneio;
  return biomeColors.platoRoxo;
}

/**
 * Presets de terreno por modo de jogo
 * Altere os valores para personalizar cada ambiente
 */
export interface TerrainPreset {
  seed: number;
  scale: number;
  octaves: number;
  persistence: number;
  lacunarity: number;
  biomes: (h: number, m: number) => string;
  heightMult?: number;
}

export const TERRAIN_PRESETS: Record<string, TerrainPreset> = {
  hunt: {
    seed: 12345,
    scale: 0.045,
    octaves: 4,
    persistence: 0.7,
    lacunarity: 2.0,
    heightMult: 1.5,
    biomes: huntBiome
  },
  dungeon: {
    seed: 54321,
    scale: 0.12,
    octaves: 4,
    persistence: 0.6,
    lacunarity: 2.5,
    biomes: dungeonBiome
  },
  explore: {
    seed: 67890,
    scale: 0.06,
    octaves: 6,
    persistence: 0.45,
    lacunarity: 2.1,
    biomes: exploreBiome
  },
  tournament: {
    seed: 24680,
    scale: 0.09,
    octaves: 3,
    persistence: 0.7,
    lacunarity: 1.8,
    biomes: tournamentBiome
  }
};
