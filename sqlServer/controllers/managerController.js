const Manager = require("../models/managerModel")
const Owner = require("../models/ownerModel")
const Hotel = require("../models/hotelModel");


const registerManager = async (req, res) => {
    console.log(req.body)
    const userName = req.body["userName"];

    const status = await Owner.getOwnerByUserName(userName);

    console.log("status->", status)

    if (status[0]) {
        

            let newManager = new Manager();
            // let {firstName,lastName, userName, contactNo,password} 
            let managerInfo = req.body["Manager"]
            managerInfo["ownerId"] = status["ownerId"]
            console.log("manager info", managerInfo)

            const y = status[0]["ownerId"]
            console.log("id ->",y)
        // managerInfo["ownerId"] = y;
            


            // let firstName = req.body.firstName;
            try {

                const status = await newManager.register(managerInfo,y);
                if (status !== -1) {
                    console.log("all good")
                    res.status(200).json({ "status": "registered successfully" })
                }
                else {

                    res.status(200).json({ "status": "user already present" })

                }
            }

            catch (err) {
                console.log("not good",err.body)

                res.status(400).json({ "status": err.body })

            }



            delete newManager;
        }

        else {
            res.status(404).json(
                {
                    "status": "Manager not Assigned",
                    "Reason": "Invalid OwnerId or HotelId"
                }
            )
        }
    }




const addMangertoHotel = async (req,res)=>{
    const hotelId = req.body["wrap"]["HotelId"];
    const managerId = req.body["wrap"]["Manager"];
    const ownerUserName = req.body["wrap"][ "OwnerUserName"]
    const credientials = {hotelId,managerId,ownerUserName}
    console.log(credientials)
try{
    const response = await Manager.updateMangerInHotel(credientials)
    if (response!==-1)
    {
        res.status(200).json(
            {
                "status":"Manager added to hotel"
            }
        )
    }
    else
    {
        res.status(200).json(
            {
                "status":"Invalid Credientials"
            }
        )
    }
    

}
catch (err)
{
    res.status(400).json(
        {
            "err":err.body
        }
    )
}

}

const authenSession = async (req,res)=>{
    if(req.session.user)
    {

       console.log("->",req.session.user)
        res.status(200).json(
 
              {"status":"accepted","userName":true,"password":true,"session":req.session.user}

            
        )
    }
    else
    {
        res.status(200).json({"status":"rejected","userName":false,"password":false,"session":req.session.user})

    }

}

const authenManager = async (req, res) => {
    const credientials = req.body.credientials

    try {
        const postAuthen = await Manager.getManager(credientials["userName"])
        if (postAuthen[0]) {

            const authen = await Manager.authen(credientials)

            if (authen === true) {
                req.session.user = postAuthen[0]
                console.log("Session ->,",req.session.user)
                res.status(200).json({ "status": "accepted", "userName": true, "password": true })
            }
            else if (authen === false) {
                res.status(404).json({ "status": "rejected", "userName": true, "password": false })
            }
            else {
                res.status(200).json({ "status": "rejected", "userName": false, "password": false })

            }

        }

        else {
            res.status(404).json({ "status": "rejected", "userName": true, "password": false })

        }

    }
    catch (err) {
        res.status(400).json({ "status": err })
    }

}

const getManagers = async (req,res)=>
{
    const userName = req.body["userName"]
    console.log(req.body)

    try{
    const tarMangers = await Manager.allManager(userName);
    console.log("tarMangers ",tarMangers)
    res.json(tarMangers)
    }
    catch(err){
        res.json(err)
    }
}

const updateToNull = async (req,res)=>{

    // const hotelId = req.body["wrap"]["HotelId"];
    const managerId = req.body["wrap"]["Manager"];
    const ownerUserName = req.body["wrap"][ "OwnerUserName"]
    const credientials = {managerId,ownerUserName}
    console.log(credientials)
try{
    const response = await Manager.updateNull(credientials)
    if (response!==-1)
    {
        res.status(200).json(
            {
                "status":"Manager removed successfully"
            }
        )
    }
    else
    {
        res.status(200).json(
            {
                "status":"Error while removing the Manager"
            }
        )
    }
    

}
catch (err)
{
    console.log(err);
    res.status(400).json(
        {

            "err":err.body
        }
    )
}}

const deleteManager = async (req,res)=>{
    console.log("body->r,",req.body)


    const managerId = req.body["Manager"];
    const ownerUserName = req.body[ "OwnerUserName"]
    const credientials = {managerId,ownerUserName}
    console.log(credientials)
try{
    const response = await Manager.delete(credientials)
    if (response!==-1)
    {
        res.status(200).json(
            {
                "status":"Manager removed successfully"
            }
        )
    }
    else
    {
        res.status(200).json(
            {
                "status":"Error while removing the Manager"
            }
        )
    }
    

}
catch (err)
{
    console.log(err);
    res.status(400).json(
        {

            "err":err.body
        }
    )
}

}




module.exports = { registerManager, authenManager, addMangertoHotel,getManagers,updateToNull,deleteManager,authenSession}