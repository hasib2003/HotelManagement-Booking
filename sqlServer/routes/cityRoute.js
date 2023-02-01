const { Router } = require("express")
const express = require("express")

const {getCity,getCountries} = require("../controllers/cityController")


const router = express.Router();


router.post("/get/cities", getCity);
router.get("/get/countries", getCountries);

// Router.post("/authen/manager",);



module.exports  = router;