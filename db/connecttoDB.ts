import mongoose from 'mongoose'
const connectDatabase = () => {
  mongoose.connect("mongodb://127.0.0.1", {

    })
};
module.exports = connectDatabase;
