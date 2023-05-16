import { Router } from "express"
import logger from '../utils/logger.js'

const router = Router()

router.get('/', (req,res) => {
    logger.fatal('Se ha producido un error de nivel fatal')
    logger.error('Se ha producido un error de nivel error')
    logger.warning('Se ha producido un error de nivel warning')
    logger.info('Se ha producido un error de nivel info')
    logger.http('Se ha producido un error de nivel http')
    logger.debug('Se ha producido un error a nivel debug')
    res.send('Prueba de loggers')
})

export default router