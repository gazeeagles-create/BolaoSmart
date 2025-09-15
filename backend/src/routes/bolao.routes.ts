import { Router } from 'express'
import {
  criarBolao,
  gerarJogos,
  adicionarParticipante,
  uploadComprovante
} from '../controllers/bolao.controller'

const router = Router()

router.post('/criar', criarBolao)
router.post('/gerar-jogos', gerarJogos)
router.post('/:id/adicionar', adicionarParticipante)
router.post('/:id/comprovante', uploadComprovante)

export default router
