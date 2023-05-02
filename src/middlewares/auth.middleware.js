export function auth(req,res,next){
    if(req.session.logged){
        next()
    } else {
        res.redirect('/')
    }
}

export function isLogged(req,res,next){
    if(req.session.logged){
        res.redirect('/views/perfil')
    } else{
        next()
    }
}

export function isAdmin(req,res,next){
    if(req.session.role === "Admin"){
        next()
    } else {
        res.redirect('/products')
    }
}

export function isLogged(req,res,next){
    if(req.session.role === "User"){
       next ()
    } else{
        res.redirect('/admin')
    }
}