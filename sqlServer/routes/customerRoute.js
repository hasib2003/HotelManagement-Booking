const express = require("express")
// const {findHotel,postHotel, findAllHotels} = require("../controllers/hotelController")
const {Router} = require("express")
const {register,authen,authenSession, registerTemp,makeBooking,deleteSession,getApartToReview, addReview} = require("../controllers/customerController")
const router = express.Router();



router.post("/register/customer",register)
router.post("/register/temp_customer",registerTemp)
router.post("/authen/customer",authen)
router.delete("/authen/customer",deleteSession)
router.get("/authen/customer",authenSession)


router.post("/review/apartment",getApartToReview)
router.post("/register/review", addReview);

router.post("/book",makeBooking)



module.exports = router