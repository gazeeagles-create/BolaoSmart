// src/controllers/bolao.controller.ts
import { Request, Response } from 'express'
import supabase from '../lib/supabase'

export const criarBolao = async (req: Request, res: Response) => {
  const { nome, criado_por, total_cotas, valor_total } = req.body

  const { data, error } = await supabase.from('boloes').insert([
    {
      nome,
      criado_por,
      total_cotas,
      valor_total
    }
  ])

  if (error) return res.status(400).json({ error: error.message })
  return res.status(201).json({ bolao: data[0] })
}
