const mongoose = require('mongoose')
const env = require('dotenv').config();

const connectToDB = ()=>{
  return   mongoose
    .connect(
        `mongodb+srv://${process.env.DBUSERNAME}:${process.env.DBPASSWORD}@amitedri-rgqmv.gcp.mongodb.net/ServerDB?retryWrites=true&w=majority`,
        {
            //Basic settings
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        }
    )
    .then((connection) => {
        console.log("connected to DB");
        //POSSIBLE TO GET MORE INFO FROM CONNECTION ARG
    });
}

module.exports = connectToDB;