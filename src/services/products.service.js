import {productsDao} from "../persistencia/DAOs/factory.js"

export async function getProducts(limit, page, category, status, price) {
    try {
        const products = await productsDao.getProducts(limit, page, category, status, price)
        return products
    } catch (error) {
        return error
    }
}

export async function addProducts(objProduct) {
    try {
        const product = await productsDao.addProducts(objProduct)
        return product
    } catch (error) {
        return error
    }
}


export async function getProductById(pid) {
    try {
        const product = await productsDao.getProductById(pid)
        return product
    } catch (error) {
        return error
    }
}

export async function updateProduct(pid, change) {
    try {
        const product = await productsDao.updateProduct(pid, change)
        return product
    } catch (error) {
        return error
    }
}

export async function deleteProduct(pid) {
    try {
        const product = await productsDao.deleteProduct(pid)
        return product
    } catch (error) {
        return error
    }
}