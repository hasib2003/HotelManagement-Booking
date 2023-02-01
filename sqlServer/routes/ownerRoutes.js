const { Router } = require("express")
const express = require("express")

const {registerOwner,authenOwner,authenSession, getAllOwners,deleteSession,getRecords} = require("../controllers/ownerController")

const router = express.Router();


// router.post("/owner",getOwnerByUserName);
// router.get("/owner",OwnerSession);

// router.get("/allOwner",getAllOwners)

router.post("/register/owner",registerOwner);
router.post("/authen/owner",authenOwner);
router.delete("/authen/owner",deleteSession);
router.get("/authen/owner",authenSession);

router.get("/get/allOwner",getAllOwners);
router.post("/records/owner",getRecords);

module.exports = router;