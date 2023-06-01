import express from 'express'
import handlebars from 'express-handlebars'
import session from 'express-session'
import {__dirname} from './utils.js'
import cookieParser from 'cookie-parser'
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'
import viewsRouter from './routes/views.router.js'
import usersRouter from './routes/users.router.js'
import sessionsRouter from './routes/sessions.router.js'
import passport from 'passport'
import config from './config.js'
import './passport/passportStrategies.js'
import cors from 'cors'
import {errorMiddleware} from './middlewares/errors/errores.js'
import FileStore from 'session-file-store'
import mongoStore from 'connect-mongo'
import mockingRouter from './routes/mocking.router.js'
import swaggerUi from 'swagger-ui-express'
import { swaggerSetup } from './swaggerSpecs.js'


const app = express()

const fileStore = FileStore(session)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname+'/public'))
app.use(cookieParser())
app.use(cors({origin:'http://127.0.0.1:5500', methods:['GET', 'POST', 'PUT', 'DELETE']}))

//routes 
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/api/sessions', sessionsRouter)
app.use('/', viewsRouter)
app.use('/users', usersRouter)
app.use('/api/mockingproducts', mockingRouter)
app.use('/logger', logger)
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSetup))

//handlebar
app.engine ('handlebars', handlebars.engine())
app.set ('view engine', 'handlebars')
app.set ('views', __dirname + '/views')

//passport 
app.use(passport.initialize())
app.use(passport.session())

//middleware
app.use(errorMiddleware)


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

export default socketServer;
