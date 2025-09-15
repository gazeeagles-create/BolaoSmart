export interface Jogo {
  id?: string;
  bolaoId: string;      // ID do bolão relacionado
  numeros: number[];    // Array com os números da Mega-Sena (6 números)
  dataCriacao?: string; // Timestamp em formato ISO
}
