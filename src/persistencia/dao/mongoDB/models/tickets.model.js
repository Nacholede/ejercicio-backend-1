import mongoose from "mongoose";

const ticketsSchema = new mongoose.Schema ({

    code: {
        type: String,
        unique: true
    },
    purchase_datetime: {
        type: String
    },
    amount: {
        type: String
    },
    purchaser: {
        type: String
    }




})