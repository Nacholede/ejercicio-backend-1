import { findAll, createOne } from "../services/users.services.js";


export async function findAllUsers(req,res) {
    try {
        const users = await findAll()
    if (users.lenght === 0) {
        res.status (200).json ({message: 'Usuarios no encontrados'})
       
    } else {
        res.status(200).json ({message: 'Usuarios encontrados', users})
    }
    } catch (error) {
        res.status(500).json ({error})
    }
}

export async function createOneUser(req, res) {
    const { first_name, last_name, email, age, password } = req.body
    if (!first_name || !last_name || !email || !password || !age) {
      res.status(400).json({ error: 'Datos faltantes' })
    }
    try {
      const newUser = await createOne(req.body)
      res.status(200).json({ message: 'Usuario creado con exito', user: newUser })
    } catch (error) {
      res.status(500).json({ error })
    }
  }



  