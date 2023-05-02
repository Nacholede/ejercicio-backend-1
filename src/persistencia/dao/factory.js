
import config from '../../config.js'
import ProductsFile from './productsDao/productsFile.js'
import ProductsMongo from './productsDao/productsMongo.js'



export let productsDao
switch (config.persistencia) {
    case 'MONGO':
        await import ('../mongoDB/dbConfig.js')
        productsDao = new ProductsMongo()
        break;

    case 'FILE':
        productsDao= new ProductsFile()
        break;
}




export let UsersDao
switch (config.persistencia) {
    case 'MONGO':
        await import ('../mongoDB/dbConfig.js')
        const {default:UsersMongo} = await import ('./usersDao/usersMongo.js')
        UsersDao = UsersMongo
        break;

}