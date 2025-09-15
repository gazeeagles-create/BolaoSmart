import { supabase } from '../lib/supabase';

export interface Jogo {
  id?: string;
  bolaoId: string;       // ID do bolão ao qual o jogo pertence
  numeros: number[];     // Array com os números da Mega-Sena
  dataCriacao?: string;
}

export const createJogo = async (jogo: Jogo) => {
  const { data, error } = await supabase
    .from('jogos')
    .insert([{
      bolao_id: jogo.bolaoId,
      numeros: jogo.numeros,
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getJogosByBolaoId = async (bolaoId: string) => {
  const { data, error } = await supabase
    .from('jogos')
    .select('*')
    .eq('bolao_id', bolaoId);

  if (error) throw error;
  return data;
};
