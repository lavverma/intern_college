require("dotenv").config()
const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route.js');
const { default: mongoose } = require('mongoose');
const app = express();
const {PORT, DATABASE_CLUSTER_LINK} = process.env
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect(DATABASE_CLUSTER_LINK, { 
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected successfully"))
.catch ( err => console.log(err) )

app.use('/', route);



app.listen(PORT , function () {
    console.log('Express app running on port ' + (PORT ))
});