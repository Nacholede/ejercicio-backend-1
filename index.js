class ProductManager{
    constructor (){
        this.products = []
    }

    addProducts (titulo, descripcion, precio, thumbnail, stock, codigo ) {
        if(!titulo || !descripcion || !precio || !thumbnail || !codigo || !stock) {
            return console.log('Error, producto incompleto');
          } else {
            const Code = this.getCode(codigo)
              if(Code){
                console.log('Ese codigo ya existe, intente nuevamente')
              } else {
                const producto = {
                id: this.#idGenerator(), 
                codigo,
                titulo,
                descripcion,
                precio,
                thumbnail,
                stock,
              }
              this.products.push(producto)
            }
          }
      
        }
      
    
    #idGenerator () {
        const id = this.products.length ===0 
        ? 1 
        : this.products[this.products.lenght-1].id+1
        return id 

    }

    getProducts () {
        console.log (this.products)
    }
    
    getProductbyId (id) {
        const idProducto = this.products.find (producto => producto.id === id )
        idProducto ? console.log (idProducto) : console.log ('no encontrado')

    }

    getCode(codigo) {
        return this.products.find (producto => producto.codigo == codigo)

    }


}

const productManager = new ProductManager 
productManager.getProducts()
productManager.addProducts('PC', 'PC gamer',' $150.000', 'imgPC', 10, 'pcgamer1'  )
productManager.getProductbyId (1)

