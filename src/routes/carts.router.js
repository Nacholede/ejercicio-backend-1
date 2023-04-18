import { Router } from 'express'
import {CartManager} from '../src/dao/mongoManager/cartManager.js'
import { cartsModel } from '../src/dao/models/carts.model.js'


const cartRouter = Router()
 
const cartManager = new CartManager() 

cartRouter.get('/', async(req,res) => {
    const carts = await cartManager.getCarts();
    res.json({carts});  
});

cartRouter.get('/:cartId', async(req,res) => {
    const {cartId} = req.params
    const cart = await cartManager.getCartById(cartId);
    if(!cart){
        res.json({message: 'Carrito no encontrado'})
    }else{
        res.json({cart});
    }
});

cartRouter.post('/', async(req, res) => {
    const products = await req.body
    const quantity = await req.body
    const newCart = await cartManager.addCart(products, quantity);
    if(!newCart){
        res.json({message:"error al crear carrito"});
    }else{
        res.json({message:"Carrito creado con éxito",newCart});
    }
})

cartRouter.put('/:cartId', async(req, res)=>{
    const {cartId} = req.params
    const products = await req.body
    const cartMod = await cartManager.addProdToCart(cartId, products)
    res.json({message: 'Producto agregado correctamente', newCart: cartMod})
})

cartRouter.put('/:cartId/products/:prodId', async(req, res)=>{
    const {cartId} = req.params
    const {prodId} = req.params
    const quantity = await req.body
    const quantityMod = await cartsModel.findOneAndReplace(prodId, quantity, {new: true})
    res.json({message: "Cantidad de productos modificada correctamente", quantityMod})
})

cartRouter.delete('/:cartId/product/:prodId',async(req,res) => {
    const {cartId, prodId} = req.params
    const cart = await cartManager.delProdFromCart(cartId, prodId)
    res.json({message:"Producto borrado correctamente",cart});
});


cartRouter.delete('/:cartId', async(req, res)=>{
const {cartId} = req.params
const cartEmpty = await cartManager.emptyCart(cartId)
res.json({message: 'Carrito vaciado correctamente', cartEmpty: cartEmpty})
})



export default cartRouter