
import { Router } from 'express'
import {findAllUsers, createAUser} from '../controllers/users.controller.js'

const router = Router()

router.post('/login', findAllUsers)

router.post('/registro', createAUser)



export default router