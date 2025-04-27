import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

//app config
const app = express();
const port = process.env.PORT || 4000;

//middleware
app.use(express.json()); // use for parse request from frontend
app.use(cors());// access backend from frontend

//db connection
connectDB();

//api endpoint
app.use("/api/food",foodRouter);
app.use("/images",express.static('uploads')); // this end point is used to show images on browser
app.use('/api/user',userRouter);
app.use("/api/cart",cartRouter);
app.use("/api/order",orderRouter);

app.get("/",(req,res) =>{
  res.send("API Working...");
})

app.listen(port,()=>{// run the express server
  console.log(`Server started on http://localhost:${port}`);
})

