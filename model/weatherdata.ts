import mongoose from 'mongoose';
const weatherSchema = new mongoose.Schema({
    cityname: String,
    date: Date,
    main: String,
    desc: String,
    lon: Number,
    lat: Number,
    icon: String,
    base: String,
    pressure: Number,
    humidity: Number,
    sea_level: Number,
    grnd_level: Number,
    visibility: Number
});

module.exports = mongoose.model("weather",weatherSchema);