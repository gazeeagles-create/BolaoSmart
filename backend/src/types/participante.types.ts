export interface Participante {
  id?: string;
  bolaoId: string;
  usuarioId: string;
  status?: 'ativo' | 'pendente' | 'expulso';  // Status do participante no bolão
}
