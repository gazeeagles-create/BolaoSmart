export interface Bolao {
  id?: string;           // UUID (gerado pelo banco)
  nome: string;
  descricao?: string;
  dataCriacao?: string;  // Timestamp em formato ISO
  criadoPor: string;     // ID do usuário que criou o bolão
}
