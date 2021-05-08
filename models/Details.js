const mongoose = require('mongoose');

const DetailSchema = new mongoose.Schema({
    firstname: {
        type: String,        
        required: [true, "Please provide a first name"]
    },
    lastname: {
        type: String,
        required: [true, "Please provide a last ame"]
    },
    email: {
        type: String,
        required: [true, "Please provide a email"],
        unique: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide a valid email",
        ]
    }
});

const Detail = mongoose.model("Detail", DetailSchema);

module.exports = Detail;