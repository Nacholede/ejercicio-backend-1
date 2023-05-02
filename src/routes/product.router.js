import {Router} from "express";
import { getAllTheProducts, getAProductById, addAProduct, updateAProduct, deleteAProduct } from "../controllers/products.controller.js";
import { isAdmin } from "../middlewares/auth.middlewares.js"

const router = Router()

router.get('/', getAllTheProducts)

router.get('/:pid', getAProductById)

router.post('/', isAdmin, addAProduct)

router.put('/:pid', isAdmin, updateAProduct)

router.delete('/:pid', isAdmin, deleteAProduct)

export default router