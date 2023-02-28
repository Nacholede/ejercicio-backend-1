import {cartsModel} from '../models/cart.model.js'

export class CartManager {

    async getCarts(){
        try {
            const carts = await cartsModel.find()
            return carts
        } catch (error) {
            console.log(error)
        }
    }

    async addCart(objCart){
        try {
            const newCart = await cartsModel.create(objCart)
            return newCart
        } catch (error) {
            console.log(error)
        }
    }

    async getCartById(cartId){
        try {
            const cart = await cartsModel.find({_id:cartId})
            if(cart){
                console.log(cart)
                return cart;
            } else{
                return 'Carrito no encontrado'
            }
        } catch (error) {
            console.log(error)
            return error
        }
    }


    async addProdToCart(cartId, body) {
        try {
            const cart = await cartsModel.findById(cartId);
            const products = body.products;
            cart.products = [...cart.products, ...products];
            await cart.save();
            const updatedCart = await cartsModel.findByIdAndUpdate(cartId, cart);
            console.log("Carrito actualizado:",updatedCart)
            return updatedCart;
        } catch (error) {
            throw new Error(error);
        }
    }


    async emptyCart(cartId){
        try {
            const cart = await cartsModel.findById(cartId)
            cart.products = []
            await cart.save()
            return cart
        } catch (error) {
            throw new Error(error);
        }
    }

    async delProdFromCart(cartId, prodId){
        try {
            const cart = await cartsModel.findById(cartId)
            cart.products = cart.products.filter((x) => x.product != prodId)
            await cart.save()
            return cart
        } catch (error) {
            throw new Error(error);
        }
    }



}