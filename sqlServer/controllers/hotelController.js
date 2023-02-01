const { count } = require("console");
const Hotel = require("../models/hotelModel")
// const Manager = require("../models/managerModel")
const Owner = require("../models/ownerModel")


const registerHotel = async (req, res) => {
    const userName = req.body["wrap"]["userName"];
    console.log("req->", req.body)
    console.log("userName->", userName)
    const status = await Owner.getOwnerByUserName(userName)

    console.log("status->", status)

    if (status[0]) {
        console.log("inside if stat")

        console.log("inside try")

        const hotel = req.body.wrap.Hotel;

        const next = await Hotel.getHotel(hotel["hotelName"])
        console.log("got hotl try", next)

        if (!next[0]) {


            let owner_id = status[0]["ownerId"];
            console.log("owner_id->",owner_id)
            const newHotel = new Hotel(owner_id);

            await newHotel.register(hotel)
            console.log("register hotel called")

            res.status(200).json({
                "status": "Hotel Registered"
            })
            // res.json({"status":"registered successfully","hotel":hotel,status:2400})

            // res.sendStatus(200).json()

            return;
        }
        // catch (err) {

        //     res.sendStatus(200).json({ "Error": err })
        //     return;

        // }


        else {

            res.status(200).json({
                "status": "Not Registered",
                "Reason": "Already Present"

            })
            return;

        }
    }

    else {
        res.status(404).json({
            "status": "Request Declined",
            "Reason": "No such Owner"
        })

    }



}

const deleteHotel = async (req,res) => {


    console.log("req,",req.body)
    const hotelId = req.body["hotelId"];
    const ownerEmail = req.body["ownerEmail"];


    let ownerId = await Owner.getOwnerByUserName(ownerEmail)
    console.log("fetcehed ower id->",ownerId)

    ownerId = ownerId[0]["ownerId"]
    console.log("fetcehed ower id->",ownerId)




    const tarHotel = await Hotel.getHotelById(hotelId)
    
    console.log("inside t",tarHotel)

    const tarOwner = await Hotel.getHotelOwnerId(hotelId);

    console.log("tarOwner->",tarOwner)
    
    if (tarHotel[0] && tarOwner[0] && tarOwner[0]["ownerId"] === ownerId )

    {
        console.log("owner is authorized to delete")

        try
        {
        const response = await Hotel.delete(hotelId);
        res.status(200).json({"status":"Hotel deleted successfully"})
        }
        catch(err)
        {
            res.status(400).json(err)
        }

    }
    else
    {
        res.status(404).json({"status":"Owner not authorized tto delete"})
    }



}


const getAllHotelsOfOwner = async (req,res) => {
    console.log(req.body)
    const tarOwner = req.body["userName"];

    try{
    const tarHotels = await Hotel.getHotelsByOwnerEmail(tarOwner);
    res.status(200).json(tarHotels)
    }
    catch(err){
        res.status(400).json(err)

    }




}

const getHotelWithNOManagers = async (req,res)=>
{
const ownerEmail = req.body["userName"];
try{
const response = await Hotel.getHotelsByOwnerEmailNoManager(ownerEmail);

res.status(200).json(response)
}
catch(err)
{
    res.status(400).json(err)

}
}

const registerAddress = async (req,res)=>
{

    console.log(req.body)
    
    const cityId = req.body["cityId"];
    const countryId = req.body["countryId"];
    const address = req.body["address"];


    const wrap = {"cityId":cityId,"countryId":countryId,"address":address}
    try{
    const response = await Hotel.registerAddress(wrap);

    console.log("address id",response)
    if(response === -1){
    res.status(200).json({"error":response});
    }
    else
    {    res.status(200).json({"addressId":response});


    }
    }
    catch(err)
    {
        res.status(400).json(err)
    }

}


module.exports = { registerHotel, getAllHotelsOfOwner,getHotelWithNOManagers, deleteHotel,registerAddress};