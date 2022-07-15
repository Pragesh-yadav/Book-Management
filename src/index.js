const express = require('express');
const mongoose = require('mongoose');
const app = express();
const multer=require("multer")
app.use(multer().any())

app.use(express.json());

mongoose.connect("mongodb+srv://TarunRajput3201:B07QeYy2JnV33rgz@cluster0.7eei6gq.mongodb.net/group48Database", {
    useNewUrlParser: true
})
    .then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err))

app.use(require('./routes/route.js'));

app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});
