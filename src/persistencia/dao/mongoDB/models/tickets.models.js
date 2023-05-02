import mongoose from "mongoose";

const ticketsSchema = new mongoose.Schema({
         
    code: {
      type:String,
      unique: true 
    },
    purchase_datatime: {
        type: Date,
        default: Date.now
    },
    number: {
        type: Number,
        required: true,

    },
    purchaser: {
        type: String,
        required: true,
    }

})


export const TicketsModel = mongoose.model("Tickets", ticketsSchema)

