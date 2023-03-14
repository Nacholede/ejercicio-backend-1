import { Router } from "express";
import UserManager from "../src/dao/mongoManager/usersManager.js";
import passport from "passport";
import { hashPassword, comparePasswords } from "../src/utils.js";


const router = Router()
const usersManager = new UserManager()

router.post(
    '/registro',
    passport.authenticate('registro', {
        failureRedirect: '/views/errorRegistro',
        passReqToCallback: true,
    }, (req, res) => {
        res.redirect('/views/perfil')
    })
)


router.post('/login', async (req, res) => {
    const { email, password } = req.body
    const usuario = await usersModel.find({ email })
    if (usuario.length !== 0) {

        const isPassword = await comparePasswords(password, usuario[0].password)
        if (isPassword) {
            for (const key in req.body) {
                req.session[key] = req.body[key]
            }
            req.session.logged = true

            return res.redirect('/views/perfil')
        }
    }

    return res.redirect('/views/errorLogin')
})

router.get('/logout', (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            return error
        } else {
            res.redirect('/login')
        }
    })
})

router.put('/changePassword', async (req, res) => {
    const { email, oldPassword, newPassword } = req.body
    const usuario = await usersModel.find({ email })
    if (usuario.length !== 0) {
        const isPassword = await comparePasswords(oldPassword, usuario[0].password)
        if (isPassword) {
            const user = usuario[0]
            user.password = await hashPassword(newPassword)
            await user.save()
            return res.send('Contrasena actualizada')
        }
    }
    res.send('Error al actualizar la contraseña')
})

//Registro y login con Discord 
app.get('/auth/discord', passport.authenticate('discord'));
app.get('/auth/discord/callback', passport.authenticate('discord', {
    failureRedirect: '/views/errorRegistro'
}), function(req, res) {
    req.session.email = req.user.email
    res.redirect('/views/perfil') 
});

export default router