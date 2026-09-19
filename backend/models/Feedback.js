import mongoose from "mongoose";

const FeedbackSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },

    rating:{
        type:Number,
        required:true
    },

    comment:{
        type:String,
        required:true
    }

});

const Feedback=mongoose.model("Feedback",FeedbackSchema);

export default Feedback;