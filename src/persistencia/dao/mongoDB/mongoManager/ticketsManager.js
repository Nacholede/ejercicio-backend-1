import { ticketsModel } from "../../mongoDB/models/tickets.model.js"


export default class TicketMongo {

    async generateTicket(objTicket) {
        try {
            const ticket = await ticketsModel.create(objTicket)
            return ticket
        } catch (error) {
            console.log(error)
        }
    }
}

