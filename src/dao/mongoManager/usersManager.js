import {usersModel} from '../models/users.model.js'

export default class UserManager {

    async register(email, password) {
        const user = await usersModel.find(email, password)
        return user
    }

    async createUser(infoUser) {
        const createUser = await usersModel.create(infoUser)
        return createUser
    }
}