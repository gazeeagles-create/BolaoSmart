import { supabase } from '../lib/supabase';

export interface Bolao {
  id?: string;           // UUID gerado pelo Supabase
  nome: string;
  descricao?: string;
  dataCriacao?: string;  // Timestamp ISO string
  criadoPor: string;     // ID do usuário que criou o bolão
}

export const createBolao = async (bolao: Bolao) => {
  const { data, error } = await supabase
    .from('boloes')
    .insert([{ 
      nome: bolao.nome, 
      descricao: bolao.descricao, 
      criado_por: bolao.criadoPor
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getBolaoById = async (id: string) => {
  const { data, error } = await supabase
    .from('boloes')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
};

// Outros métodos como update, delete, listar bolões podem ser adicionados aqui
