import mongoose from "mongoose";

const RentCarShema = new mongoose.Schema({
    startLocation:{

        type: String,
        required: true,

    },
    endLocation:{
        
        type: String,
        required: false,

    },
    startDate:{
        
        type: Date,
        required: true,

    },
    startTime:{
        
        type: String,
        required: true,

    },
    endDate:{
        
        type: Date,
        required: true,

    },
    endTime: {
        
        type: String,
        required: true,

    },



})


export const Bookcars = mongoose.model("Bookingcar", RentCarShema);
