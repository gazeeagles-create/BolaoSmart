// src/utils/gerarJogo.ts
export function gerarNumeros(): number[] {
  const numeros = new Set<number>()
  while (numeros.size < 6) {
    numeros.add(Math.floor(Math.random() * 60) + 1)
  }
  return Array.from(numeros).sort((a, b) => a - b)
}
