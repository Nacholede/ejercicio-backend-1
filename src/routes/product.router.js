import { Router } from 'express'
import {ProductManager} from '../src/dao/mongoManager/productManager.js'
import { productsModel } from '../src/dao/models/products.model.js'


const productRouter = Router()
const productManager = new ProductManager('./src/productos.json') 


productRouter.get('/',async(req,res)=>{
    try {
        const {limit} = req.query
        const products = await productManager.getProducts(limit || 'max')
        res.json({products})
    } catch (error) {
        res.send(error)
    }
    
})

productRouter.get('/',async(req,res)=>{
    try {
        const {limit=10, page=1, category} = req.query 
        const getProds = await productManager.getProducts()
        const productsInfo = await productsModel.paginate({category}, {limit, page})
        if(!limit || !page || !category){
            res.json(getProds)
        }else{
            if(productsInfo.hasPrevPage === false){
            if(productsInfo.hasNextPage === false){
                res.json({
                status:'success', 
                payload:productsInfo.docs, 
                totalPages: productsInfo.totalPages, 
                prevPage: productsInfo.prevPage, 
                nextPage: productsInfo.nextPage, 
                page: productsInfo.page, 
                hasPrevPage: productsInfo.hasPrevPage, 
                hasNextPage: productsInfo.hasNextPage,
                prevLink:null,
                nextLink: null})
            }else{
                res.json({
                status:'success', 
                payload:productsInfo.docs, 
                totalPages: productsInfo.totalPages, 
                prevPage: productsInfo.prevPage, 
                nextPage: productsInfo.nextPage, 
                page: productsInfo.page, 
                hasPrevPage: productsInfo.hasPrevPage, 
                hasNextPage: productsInfo.hasNextPage,
                prevLink:null,
                nextLink: `localhost:8080/api/products/?page=${productsInfo.nextPage}`})
            }
        }else{
            if(productsInfo.hasNextPage === false){
                res.json({
                status:'success', 
                payload:productsInfo.docs, 
                totalPages: productsInfo.totalPages, 
                prevPage: productsInfo.prevPage, 
                nextPage: productsInfo.nextPage, 
                page: productsInfo.page, 
                hasPrevPage: productsInfo.hasPrevPage, 
                hasNextPage: productsInfo.hasNextPage,
                prevLink: `localhost:8080/api/products/?page=${productsInfo.prevPage}`,
                nextLink: null})
            }else{
                res.json({
                status:'success', 
                payload:productsInfo.docs, 
                totalPages: productsInfo.totalPages, 
                prevPage: productsInfo.prevPage, 
                nextPage: productsInfo.nextPage, 
                page: productsInfo.page, 
                hasPrevPage: productsInfo.hasPrevPage, 
                hasNextPage: productsInfo.hasNextPage,
                prevLink: `localhost:8080/api/products/?page=${productsInfo.prevPage}`,
                nextLink: `localhost:8080/api/products/?page=${productsInfo.nextPage}`})
            }
        }
        }
        
    } catch (error) {
        res.json({error, status: 'error'})
    }
})


productRouter.post('/', async(req, res) => {
    const product = req.body
    console.log(product)
    const addNewProduct = await productManager.addProduct(product)
    console.log(addNewProduct)
    res.json({ message: 'Producto agregado con exito', addNewProduct })
})


productRouter.put('/:idProduct', async(req, res) => {
    const {idProduct} = req.params
    const product = req.body
    try {
        const updateProduct = await productManager.updateProduct(idProduct, ...product)
        console.log(updateProduct)
        res.json({ message: 'Producto modificado con exito'})
    } catch (error) {
        console.log('error')
        return error
    }
})


productRouter.delete('/:idProduct', async(req, res) => {
    const {idProduct} = req.params
    try {
        const deleteProduct = await productManager.deleteProduct(idProduct)
        console.log(deleteProduct)
        res.json({ message: 'Producto eliminado con exito'})
    } catch (error) {
        console.log('error')
        return error
    }
})




export default productRouter
