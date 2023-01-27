import { Router } from 'express'
import ProductManager from '../src/productManager'
import socketServer from "../src/app"


const viewsRouter = Router()


viewsRouter.get ('/realtimeproducts' , async (req,res) => {
    try {
        const producManager = new ProductManager ()
        const productos = await producManager.getProducts()
        res.render ("home", {productos, titulo: "Productos"})
    } catch (error) {
        console.log('Error al obtener productos')
    }


})

