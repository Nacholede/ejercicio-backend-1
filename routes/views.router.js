import { Router } from 'express'
import ProductManager from '../src/productManager'
import socketServer from "../src/app"


const viewsRouter = Router()
const productManager = new ProductManager ('./src/productos.json')


viewsRouter.get('/',async(req,res)=>{
    const productos = await productManager.getProducts()
      res.render('home', {productos})
  })
  
  
  viewsRouter.get('/realtimeproducts',async (req,res)=>{
    const productos = await productManager.getProducts()
    socketServer.on('connection', (socket)=>{
      socket.emit('productos', productos)
    })
      res.render('realTimeProducts', {productos})
  })
  
  
  viewsRouter.post('/realtimeproducts', async(req, res)=>{
    try {
      const product = await req.body
      console.log('producto:',producto)
      await productManager.addProduct(producto)
      const products = await productManager.getProducts()
      socketServer.sockets.emit('products', products)
    } catch (error) {
      return error
    }
  })
  
  
  export default viewsRouter

