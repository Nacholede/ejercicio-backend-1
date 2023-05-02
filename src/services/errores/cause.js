
export const generateUserErrorInfo = (user) => {
    return `Una o mas propiedades estan incompletas o no son válidas first_name: Se esperaba un string, se recibió un ${typeof user.first_name},
    last_name: Se esperaba un string, se recibió un ${typeof user.last_name}
    email: Se esperaba un string, se recibió un ${typeof user.email}
    age: Se esperaba un number, se recibió un ${typeof user.age}
    password: Se esperaba un string, se recibió un ${typeof user.password}`
}

export const generateProductErrorInfo = (product) => {
    return ` Una o mas propiedades estan incompletas o no son válidas: title: Se esperaba un string, se recibió un ${typeof product.title}
             description: Se esperaba un string, se recibió un ${typeof product.description}
        code: Se esperaba un string, se recibió un ${typeof product.code}
             price: Se esperaba un number, se recibió un ${typeof product.price}
             status: Se esperaba un boolean, se recibio un ${typeof product.status}
             stock: Se esperaba un number, se recibió un ${typeof product.stock}
             category: Se esperaba un string, se recibió un ${typeof product.category}
             image: Se esperaba un string, se recibió un ${typeof product.image}
             size: Se esperaba un string, se recibió un ${typeof product.size}`
}

export const generateCartErrorInfo = () => {
    return `El ID del carrito o del producto no existe`
}