import express  from 'express';
const connectDB = require("./db/connecttoDB");
import routes from './routes';
const app=express();
connectDB();
app.use(express.json())

app.use('/api',routes);

app.listen(3000,()=>{
  console.log("listening on 3000");
});