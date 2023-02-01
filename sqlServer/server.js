require("dotenv").config();

const express = require("express");
const cors = require("cors");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");


const ownerRoutes = require("./routes/ownerRoutes")
const hotelRoutes = require("./routes/hotelRoute")
const managerRoutes = require("./routes/managerRoute");
const cityRoute = require("./routes/cityRoute");
const apartmentRoute = require("./routes/apartmentRoute")
const customerRoute = require("./routes/customerRoute")
const app = express();



app.use(cors(
    {

    origin:["http://localhost:3000"],
    methods:["GET","POST","PATCH","DELETE"],
    credentials:true
    }
))

app.use(cookieParser());
app.use (bodyParser.urlencoded({extended:true}));

app.use(session
    (
        {
        key:"userId",
        secret:process.env.SESSION_SECRET,
        resave:false,
        saveUninitialized:false,
        cookie:{
            expires: 15*60*364,
        },

        }
    )
)

app.use(
    (req,res,next)=>{
        console.log(req.path,req.method)
        next();
    }
)

app.use(express.json())

app.use("/",ownerRoutes)
app.use("/",hotelRoutes)
app.use("/",managerRoutes)
app.use("/",apartmentRoute)
app.use("/",cityRoute)
app.use("/",customerRoute)

app.listen
(process.env.SERVER_PORT,
    ()=>
    {
        console.log(`server runnning at port ${process.env.SERVER_PORT}`)
    }    

)