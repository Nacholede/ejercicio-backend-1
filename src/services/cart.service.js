const cartManager = new CartMongo()

export async function getCart(_id) {
    try {
        const cart = await cartManager.getCart(_id)
        return cart
    } catch (error) {
        return error
    }
}

export async function getCartById(_id) {
    try {
        const cart = await cartManager.getCartById(_id)
        return cart
    } catch (error) {
        return error
    }
}

export async function addCart(objCart) {
    try {
        const cart = await cartManager.addCart(objCart)
        return cart
    } catch (error) {
        return error
    }
}

export async function addProductToCart(cid, pid) {
    try {
        const cart = await cartManager.addProductToCart(cid, pid)
        return cart
    } catch (error) {
        return error
    }
}

export async function updateCart(cid, _id, infoProduct) {
    try {
        const cart = await cartManager.updateCart(cid, _id, infoProduct)
        return cart
    } catch (error) {
        return error
    }
}

export async function updateQuantity(cid, _id, quantity) {
    try {
        const cart = await cartManager.updateQuantity(cid, _id, quantity)
        return cart
    } catch (error) {
        return error
    }
}

export async function deleteProductFromCart(cid, pid) {
    try {
        const cart = await cartManager.deleteProductFromCart(cid, pid)
        return cart
    } catch (error) {
        return error
    }
}

export async function deleteCart(cid) {
    try {
        const cart = await cartManager.deleteCart(cid)
        return cart
    } catch (error) {
        return error
    }
}
