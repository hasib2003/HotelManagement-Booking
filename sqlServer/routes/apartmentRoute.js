const { Router } = require("express")
const express = require("express")

const {register,allApartments,Delete, allApartmentNoHotel, reqdApartments,getApartmentById,getReview} = require("../controllers/apartmentController")


const router = express.Router();

router.post("/register/apartment", register);
router.post("/get/apartment", allApartments);
router.post("/get/apartmentbyId", getApartmentById);
router.post("/get/reqd/apartments", reqdApartments);
router.get("/get/apartment", allApartmentNoHotel);
router.delete("/delete/apartment", Delete);
router.post("/get/reviews", getReview);


// router.post("/authen/manager", authenManager);
// Router.post("/authen/manager",);



module.exports  = router;