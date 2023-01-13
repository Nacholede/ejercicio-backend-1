import express from 'express' 
import ProductManager from '../productManager'
const productManager = new ProductManager ('./productManager.js')
const app = express ()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

PORT = 8080

app.get('/products' , async(req,res) => {
    try {
        const {limit} = req.query 
        console.log (limit)
        const productos = await ProductManager.getProducts ()
        res.json ({productos})

    } catch (error) {
        res.send (error)
    }
})

app.get ('/products/:pid', async (req,res) => {
    const {idProduct} = req.params 
    const product = await ProductManager.getProductById(parseInt(idProduct))
    if (product) {
        res.status (200).json ({message: 'Producto encontrado con exito' , product})
    } else {
        res.status (400).json ({error: 'Producto no encontrado'})
    }
} )