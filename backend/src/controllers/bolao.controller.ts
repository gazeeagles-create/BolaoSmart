// src/controllers/bolao.controller.ts
export const gerarJogos = async (req: Request, res: Response) => {
  const { bolao_id, quantidade } = req.body

  const jogos = Array.from({ length: quantidade }, () => ({
    bolao_id,
    numeros: gerarNumeros()
  }))

  const { data, error } = await supabase.from('jogos').insert(jogos)

  if (error) return res.status(400).json({ error: error.message })
  return res.status(201).json({ jogos: data })
}
