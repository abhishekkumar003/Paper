import mongoose, { Schema } from "mongoose";

const docSchema = new mongoose.Schema({
    _id:{
        type : String,
        require : true
    },

    data : {
        type : Object,
        require : true
    }

})

const docModel = mongoose.model('document', docSchema);

export default docModel;

