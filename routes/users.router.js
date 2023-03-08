import { Router } from "express";
import UserManager from "../src/dao/mongoManager/usersManager.js";

const router = Router()
const usersManager = new UserManager()

router.post('/registro', async (req,res) => {
    const {email, password} = req.body 
    const user = await UserManager.register ({email, password})
    if (user.lenght !==0){
        res.redirect ('/errorRegistro')

    } else {
        await usersManager.createUser(req.body)
        res.redirect ('/login')
    }

})

router.post('/login', async (req, res) => {
    const {email, password} = req.body
    const user = await userManager.register({email, password})
    if(user.length !== 0) {
        for (const key in req.body) {
            req.session[key] = req.body[key]
        }
        req.session.logged = true

        if(email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
            req.session.isAdmin = true
        } else {
            req.session.isAdmin = false
        }

        res.redirect('/products')
    } else {
        res.redirect('/errorLogin')
    }

})

router.get ('/logout', (req,res) => {
    req.session.destroy((error)=> {
        if(error) {
            return error
        } else {
            res.redirect ('/login')
        }
    }) 
}) 

export default router