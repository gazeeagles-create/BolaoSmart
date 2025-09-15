import { supabase } from '../lib/supabase';

export interface Usuario {
  id?: string;
  email: string;
  senha: string; // Só para registro (não salvar senha em texto puro no banco)
}

export const registrarUsuario = async (email: string, senha: string) => {
  const { user, error } = await supabase.auth.signUp({
    email,
    password: senha,
  });

  if (error) throw error;
  return user;
};

export const loginUsuario = async (email: string, senha: string) => {
  const { session, error } = await supabase.auth.signInWithPassword({
    email,
    password: senha,
  });

  if (error) throw error;
  return session;
};

export const logoutUsuario = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};
