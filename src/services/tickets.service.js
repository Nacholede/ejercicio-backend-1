import TicketMongo from "../persistencia/DAOs/ticketsDao/ticketsMongo.js"
import { findOneUser } from "./users.service.js"
import { getCart, updateQuantity, deleteProductFromCart } from "./cart.service.js"
import { updateProduct } from "./products.service.js"

const ticketsManager = new TicketMongo()


export default class TicketManager {

    async generateCode(long){
            const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
            let code = ""
            for (let i = 0; i < long; i++) {
                code += characters.charAt(Math.floor(Math.random() * characters.length));
            }
            return code
    }

    async purchaseDateTime() {
        const purchase_datetime = new Date().toLocaleString("es-AR", { timeZone: "America/Argentina/Buenos_Aires" })
        return purchase_datetime
    }

    async purchaser(userId) {
        const purchaser = await findOneUser(userId)
        const purchaserEmail = purchaser.email
        return purchaserEmail
    }


    async amount(cid) {
        const cart = await getCart(cid)

        let totalCartValue = 0
        let unprocessableProductsId = []

    
        for (const item of cart) {
            for (const product of item.products) {
                const productId = product.product.id
                const stock = product.product.stock
                const quantity = product.quantity
    
                if (quantity > stock) {
                   
                    await deleteProductFromCart(cid, productId)
                    unprocessableProductsId.push(productId)
                    console.log(unprocessableProductsId) 
                } else {
                    
                    const updatedProduct = await updateProduct(productId, { stock: stock - quantity })
                    await deleteProductFromCart(cid, productId)
                    
                    totalCartValue += updatedProduct.price * quantity
                }
            }
        }
        return totalCartValue
    }

    async generateTicket(userId, cid) {
        try {
            const objTicket = {
                code: await this.generateCode(10),
                purchase_datetime: await this.purchaseDateTime(),
                amount:`$${await this.amount(cid)}`,
                purchaser: await this.purchaser(userId)
            }
            const ticket = await ticketsManager.generateTicket(objTicket)
            return ticket
        } catch (error) {
            console.log(error)
        }
    }
}