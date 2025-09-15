import { supabase } from '../lib/supabase';

export interface Participante {
  id?: string;
  bolaoId: string;
  usuarioId: string;
  status?: string; // Ex: 'ativo', 'pendente', 'expulso', etc.
}

export const addParticipante = async (participante: Participante) => {
  const { data, error } = await supabase
    .from('participantes')
    .insert([{
      bolao_id: participante.bolaoId,
      usuario_id: participante.usuarioId,
      status: participante.status || 'ativo',
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getParticipantesByBolaoId = async (bolaoId: string) => {
  const { data, error } = await supabase
    .from('participantes')
    .select('*')
    .eq('bolao_id', bolaoId);

  if (error) throw error;
  return data;
};
