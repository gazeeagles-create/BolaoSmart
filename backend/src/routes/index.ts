import { Router } from 'express'
import bolaoRoutes from './bolao.routes'

const router = Router()

router.use('/bolao', bolaoRoutes)

export default router
