import { Router } from "express"
import { getAllProducts } from "../controllers/products.controller.js"
import { getACartById } from "../controllers/cart.controller.js"
import { viewsUsers, createOneUser, logOut } from "../controllers/users.controller.js"
import {auth, isLogged} from "../middlewares/auth.middlewares.js"
import passport from 'passport'


const router = Router()

router.get('/', async(req, res) => {
    res.render('index', index)
})

router.post('/login', viewsUsers)

router.post('/registro', createOneUser)

router.get('/logout', logOut)

router.get('/products', auth, getAllProducts)

router.get('/carts/:cid', getACartById)

router.get('/registro', isLogged, (req, res) => {
    res.render('registro')
})

router.get('/errorRegistro', (req, res) => {
    res.render('errorRegistro')
})

router.get('/login', isLogged, (req, res) => {
    res.render('login')
})

router.get('/errorLogin', (req, res) => {
    res.render('errorLogin')
})
  

//Registro y login con Discord 
app.get('/auth/discord', passport.authenticate('discord'));
app.get('/auth/discord/callback', passport.authenticate('discord', {
    failureRedirect: '/views/errorRegistro'
}), function(req, res) {
    req.session.email = req.user.email
    res.redirect('/views/perfil') 
});
  export default viewsRouter

