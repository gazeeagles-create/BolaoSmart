// Gera uma combinação aleatória de números da Mega-Sena
// Números entre 1 e 60, 6 números únicos

export const gerarNumerosMegaSena = (): number[] => {
  const numeros: Set<number> = new Set();

  while (numeros.size < 6) {
    const numeroAleatorio = Math.floor(Math.random() * 60) + 1;
    numeros.add(numeroAleatorio);
  }

  return Array.from(numeros).sort((a, b) => a - b);
};

