require("dotenv").config();
const mongoose = require("mongoose");
const mongoURI = "mongodb+srv://reshma2000:aryareshma2000@cluster0.p4qor3v.mongodb.net/otpDB?retryWrites=true&w=majority";

const connectToMongo = () => {
  mongoose
    .connect(mongoURI, { useNewUrlParser: true })
    .then(() => {
      console.log("Connected to MongoDB Successfully");
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB", error);
    });
};

module.exports = connectToMongo;
