import { Router } from "express";

const router = Router()

router.get ('/current', (req,res) => {
    console.log(req.session.passport)
    if(req.session.passport) {
        const auth = req.session.auth
        res.send(`Usuario autenticado mediante ${auth}`)

    }else {
        res.send ('No se ha iniciado sesion')
    }
})

export default router; 