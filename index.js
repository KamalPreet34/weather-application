const express = require("express");
const connection = require("./config/db");
const { userRouter } = require("./routes/user.route");
const cityRouter = require("./routes/city.route");
const redisClient = require("./helpers/redis");

const logger = require("./middlewares/logger");

require("dotenv").config()

const PORT = process.env.PORT || 8080;
const app = express();
app.use(express.json());


app.get("/", async(req,res)=>{
    res.send(await redisClient.get("name"));
})z

app.use("/api/user",userRouter)

app.use("/api/weather",cityRouter);


app.listen(PORT, async ()=>{
      try{
       await connection();
       console.log("connected to db")
       logger.log("info","Database connected")
      } catch(err) {
        console.log(err.message)
        logger.log("error","Database connection fail")
      }
console.log("server is running",PORT)
})