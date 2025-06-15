// Perlin noise implementation (adapted for terrain generation)
// Fonte: https://github.com/joeiddon/perlin/blob/master/perlin.js
// Pequena versão para uso procedural

const PERLIN_YWRAPB = 4;
const PERLIN_YWRAP = 1 << PERLIN_YWRAPB;
const PERLIN_ZWRAPB = 8;
const PERLIN_ZWRAP = 1 << PERLIN_ZWRAPB;
const PERLIN_SIZE = 4095;

let perlin: number[] | null = null;
let perlin_octaves = 4;
let perlin_amp_falloff = 0.5;

function noise(x: number, y: number = 0, z: number = 0): number {
  if (perlin == null) {
    perlin = new Array(PERLIN_SIZE + 1);
    for (let i = 0; i < PERLIN_SIZE + 1; i++) {
      perlin[i] = Math.random();
    }
  }
  if (x < 0) x = -x;
  if (y < 0) y = -y;
  if (z < 0) z = -z;

  let xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z);
  let xf = x - xi;
  let yf = y - yi;
  let zf = z - zi;
  let rxf: number, ryf: number;
  let r = 0;
  let ampl = 0.5;

  let n1: number, n2: number, n3: number;

  for (let o = 0; o < perlin_octaves; o++) {
    let of = xi + (yi << PERLIN_YWRAPB) + (zi << PERLIN_ZWRAPB);

    rxf = fade(xf);
    ryf = fade(yf);

    n1 = lerp(perlin[of & PERLIN_SIZE], perlin[(of + 1) & PERLIN_SIZE], rxf);
    n2 = lerp(perlin[(of + PERLIN_YWRAP) & PERLIN_SIZE], perlin[(of + PERLIN_YWRAP + 1) & PERLIN_SIZE], rxf);
    n1 = lerp(n1, n2, ryf);

    of += PERLIN_ZWRAP;
    n2 = lerp(perlin[of & PERLIN_SIZE], perlin[(of + 1) & PERLIN_SIZE], rxf);
    n3 = lerp(perlin[(of + PERLIN_YWRAP) & PERLIN_SIZE], perlin[(of + PERLIN_YWRAP + 1) & PERLIN_SIZE], rxf);
    n2 = lerp(n2, n3, fade(zf));

    n1 = lerp(n1, n2, fade(zf));

    r += n1 * ampl;
    ampl *= perlin_amp_falloff;
    xi <<= 1;
    xf *= 2;
    yi <<= 1;
    yf *= 2;
    zi <<= 1;
    zf *= 2;

    if (xf >= 1.0) { xi++; xf--; }
    if (yf >= 1.0) { yi++; yf--; }
    if (zf >= 1.0) { zi++; zf--; }
  }
  return r;
}

function fade(t: number): number {
  return t * t * t * (t * (t * 6 - 15) + 10);
}

function lerp(a: number, b: number, t: number): number {
  return a + t * (b - a);
}

export function setNoiseSeed(seed: number): void {
  perlin = new Array(PERLIN_SIZE + 1);
  let s = seed;
  for (let i = 0; i < PERLIN_SIZE + 1; i++) {
    s = (s * 9301 + 49297) % 233280;
    perlin[i] = s / 233280;
  }
}

export function setNoiseDetail(lod: number, falloff: number): void {
  if (lod > 0) perlin_octaves = lod;
  if (falloff > 0) perlin_amp_falloff = falloff;
}

export default noise; 