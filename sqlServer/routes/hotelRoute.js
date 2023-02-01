const express = require("express")
// const {findHotel,postHotel, findAllHotels} = require("../controllers/hotelController")

const {registerHotel, getAllHotelsOfOwner,getHotelWithNOManagers, deleteHotel,registerAddress} = require("../controllers/hotelController")
const Router = express.Router();


// Router.get("/allhotel",findAllHotels)
// Router.get("/hotel",findHotel)
// Router.post("/hotel",postHotel)

Router.post("/register/hotel",registerHotel)
Router.post("/register/address",registerAddress)
Router.post("/get/allHotel",getAllHotelsOfOwner)
Router.post("/get/hotel/no/manager",getHotelWithNOManagers)
Router.delete("/delete/hotel",deleteHotel)

module.exports = Router