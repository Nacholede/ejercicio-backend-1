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
  
  viewsRouter.get('/products',async(req,res)=>{
    try {
        
        const {limit=10, page=1, category} = req.query 
        let products 
        if(!category){
          products = await productsModel.find().limit(limit).skip(page-1).lean()
        }else{
          products = await productsModel.find({category}).limit(limit).skip(page-1).lean()
        }
        console.log(products)
          res.render('products', {products})
    } catch (error) {
        console.log(error)
    }
})

viewsRouter.get('/carts/:cartId', async(req,res) => {
  const {cartId} = req.params
  const cart = await cartsModel.find({_id:cartId}).lean()
  if(!cart){
      res.json({message: 'Carrito no encontrado'})
  }else{
      res.render('cart', {cart});
  }
});
  
  
  viewsRouter.post('/realtimeproducts', async(req, res)=>{
    try {
      const product = await req.body
      console.log('producto:',producto)
      await productManager.addProduct(producto)
      const productos = await productManager.getProducts()
      socketServer.sockets.emit('productos', productos)
    } catch (error) {
      return error
    }
  })
  
router.get('/registro', (req, res) => {
    res.render('registro')
})

router.get('/errorRegistro', (req, res) => {
    res.render('errorRegistro')
})

router.get('/login', (req, res) => {
    res.render('login')
})

router.get('/errorLogin', (req, res) => {
    res.render('errorLogin')
})

  
  export default viewsRouter

