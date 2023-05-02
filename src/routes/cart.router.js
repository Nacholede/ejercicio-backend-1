import { Router } from "express"
import { addACart, getOneCart, addAProductToCart, updateACart, updateQuantityFromCart, deleteAProductFromCart, deleteACart } from "../controllers/cart.controller.js"
import { isUser } from "../middlewares/auth.middlewares.js"
import { generateATicket } from "../controllers/ticket.controller.js"

const router = Router()

router.post('/', addACart)

router.get('/:cid', getOneCart)

router.post('/:cid/purchase', generateATicket)

router.post('/:cid/product/:pid', isUser, addAProductToCart)

router.put('/:cid', isUser, updateACart)

router.put('/:cid/product/:_id', isUser, updateQuantityFromCart)

router.delete('/:cid/product/:pid', isUser, deleteAProductFromCart)

router.delete('/:cid', isUser, deleteACart)

export default router