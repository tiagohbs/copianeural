// Simplex noise implementation (https://github.com/jwagner/simplex-noise.js)
// Pequena versão para uso procedural
// (pode ser substituído por pacote npm se desejar mais qualidade)

class SimplexNoise {
  constructor(seed = 0) {
    this.p = new Uint8Array(256);
    for (let i = 0; i < 256; i++) this.p[i] = i;
    let n, q;
    for (let i = 255; i > 0; i--) {
      n = Math.floor((seed = (seed * 9301 + 49297) % 233280) / 233280 * (i + 1));
      q = this.p[i];
      this.p[i] = this.p[n];
      this.p[n] = q;
    }
  }
  noise2D(x, y) {
    // Simples ruído 2D (não é simplex real, mas serve para exemplo procedural)
    return Math.sin(x * 0.15 + y * 0.21 + this.p[(Math.abs(Math.floor(x + y)) % 256)]) * 0.5 + 0.5;
  }
}

export default SimplexNoise;
