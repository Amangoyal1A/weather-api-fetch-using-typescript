import axios from "axios";
require('dotenv').config();
import express, {Request, RequestHandler, Response} from 'express';
const city = require("../model/citydata");
const temp= require("../model/tempdata");
const wind=require("../model/winddata");
const weather = require("../model/weatherdata");


export const apiData:RequestHandler= async (req: Request, res: Response)=>{
    const cityname=req.query.city;
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${process.env.API_KEY}`)        
    const checkData = await city.findOne({cityname:cityname});
    console.log();
    if(!checkData){
    const list=response.data;
            const weatherData=new weather({
                cityname: cityname,
                date: new Date(),
                main: list.weather.main,
                desc: list.description,
                lon: list.coord.lon,
                lat: list.coord.lat,
                icon: list.weather.icon,
                base: list.base,
                pressure: list.main.pressure,
                humidity: list.main.humidity,
                sea_level: list.main.sea_level,
                grnd_level: list.main.grnd_level,
                visibility: list.visibility
            })
            const cityData=new city({
                id: list.id,
                cityname: cityname,
                country: list.sys.country,
                sunrise: list.sys.sunrise,
                sunset: list.sys.sunset,
                type: list.sys.type,
                timezone: list.timezone
            })
            
            const tempData=new temp({
                cityname: cityname,
                temp: list.main.temp,
                feels_like: list.main.feels_like,
                min_temp: list.main.temp_min,
                max_temp: list.main.temp_max,
            })
            const windData=new wind({
                cityname: cityname,
                speed: list.wind.speed,
                deg: list.wind.deg,
                gust: list.wind.gust,
                cloudsall: list.clouds.all,
                dt: list.dt
            })
        res.send(list);
        await weatherData.save();
        await cityData.save();
        await tempData.save();
        await windData.save();
    }
    else{
        const cityFound=await city.find({cityname:cityname});
        const weatherFound=await weather.find({cityname:cityname});
        const tempFound=await temp.find({cityname:cityname});
        const windFound=await wind.find({cityname:cityname});
        let dataFound={
            cityFound,
            weatherFound,
            tempFound,
            windFound
        }
        res.send(dataFound);
    }
};
