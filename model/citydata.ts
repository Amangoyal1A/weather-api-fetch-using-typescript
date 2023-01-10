import mongoose from 'mongoose';
const weatherSchema = new mongoose.Schema({
    id: Number,
    cityname: String,
    country: String,
    sunrise: Number,
    sunset: Number,
    type: Number,
    timezone: Number

});
module.exports = mongoose.model("city",weatherSchema);