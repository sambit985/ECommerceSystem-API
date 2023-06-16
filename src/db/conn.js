const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/ecommerce", { useNewUrlParser: true,  useUnifiedTopology: true })
    .then(() => {
        console.log("Connection with db is Successfull");
    }).catch((err) => {
        console.log("Connection error:", err);
    })