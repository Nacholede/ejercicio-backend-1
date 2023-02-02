import express from 'express'
import productsRouter from '../routes/products.router.js'
import cartRouter from '../routes/cart.router.js'
import { __dirname } from '../src/utils'
import handlebars from 'express-handlebars'
import { Server } from 'socket.io'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname+'/public'))

app.use ('/', viewsRouter)
app.use('/api/products', productsRouter)
app.use('/api/cart', cartRouter)

app.engine ('handlebars', handlebars.engine())
app.set ('view engine', 'handlebars')
app.set ('views', __dirname + '/views')


app.get ('/' , (req,res) => {
    res.render ('socket')
})

app.get('/',(req,res)=>{
    res.send('Ruta raiz')
})

const httpServer = app.listen (8080 , () => {
  console.log ('Escuchando al puerto 8080')
})

const socketServer = new Server (httpServer)
