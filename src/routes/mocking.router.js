import { Router } from "express";
import { generateProduct } from "../utils/mocks";

const router = Router()


router.get ('/', (req,res) => {
    const product = []
    for (let i=0; i<5; i++) {
        const product = generateProduct
        product.push(product)
    }
    res.json ({message: 'Producto generado correctamente', product})
})

