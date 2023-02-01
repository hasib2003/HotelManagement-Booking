const { Router } = require("express")
const express = require("express")

const {registerManager,authenManager,addMangertoHotel, getManagers, updateToNull,deleteManager,authenSession} = require("../controllers/managerController")


const router = express.Router();

router.post("/register/manager", registerManager);
router.post("/authen/manager", authenManager);
router.get("/authen/manager", authenSession);
router.post("/link/manager", addMangertoHotel);
router.post("/get/managers", getManagers);
router.patch("/update/manager", updateToNull);
router.delete("/delete/manager",deleteManager);
router.delete("/delete/manager",deleteManager);
// Router.post("/authen/manager",);



module.exports  = router;