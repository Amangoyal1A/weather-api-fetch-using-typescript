import express from "express";
import {apiData} from '../controller/api'
import middleware from '../middleware/Middleware'
const router = express.Router();

router.use(middleware.isPrime);

router.get('/',apiData);

export default router;