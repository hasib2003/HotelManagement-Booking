const e = require("express");
const { rmSync } = require("fs");
const Apartment = require("../models/apartmentModel");
const Hotel = require("../models/hotelModel");
const Manager = require("../models/managerModel")
const Owner = require("../models/ownerModel")


const register = async (req, res) => {

    
    const hotelId = req.body.HotelId;

    const apartmentTitle = req.body.Apartment["apartmentTitle"]

    const status = await Apartment.getApartment(apartmentTitle);

    const sameHotel = await Apartment.getHotelId(apartmentTitle);



    const mangerVerf = await Hotel.getHotelManagerId(req.body.HotelId);


    const ownerVerf = await Hotel.getHotelOwnerId(req.body.HotelId)


if ((!sameHotel[0] || sameHotel[0]["hotelId"]!==req.body.HotelId || !status[0]) && (mangerVerf[0] || ownerVerf[0]))
{


    if ( ( ownerVerf[0]["ownerId"] === req.body.OwnerId || mangerVerf[0]["managerId"] === req.body.OwnerId)  || (mangerVerf[0]["managerId"] === req.body.OwnerId || ownerVerf[0]["ownerId"] === req.body.OwnerId)) 
    {
        // if (!status[0] || sameHotel !== hotelId) 
    const newApart = new Apartment(hotelId);
    try 
    {
        const response = await newApart.register(req.body.Apartment)

        res.status(200).json(
            {
                "status": "registered successfully"
            }
        )
    }
    catch (err) 
    {
        res.status(400).json(
            {
                "status": "Encountered Error",
                "Error": err.body
            }
        )
    }
}


    else {
    res.status(200).json(
        {
            "status": "not registered",
            "Reason": "Apartment with same title already exist"
        }
    )
        }
    }
    else{
        res.status(404).json(
            {
                "status": "unable to add apartment",
                "reason":"Apartment with same name exists or check hotel name or your credientials"
            }
        )
    }
    
}

const allApartments = async (req,res)=>
{


    console.log("req is ",req.body["HotelId"])
    const mangerVerf = await Hotel.getHotelManagerId(req.body.HotelId);

    console.log("mangerVerf->",mangerVerf);

    const ownerVerf = await Hotel.getHotelOwnerId(req.body.HotelId)
    console.log("ownerVerf->",ownerVerf);


    if ((mangerVerf[0] || ownerVerf[0]) && mangerVerf[0]["managerId"] === req.body.ManagerId || ownerVerf[0]["ownerId"] === req.body.OwnerId )
    {
        try
        {
        const allApartments =  await Apartment.getAllApartmentId(req.body["HotelId"])

        console.log("fetched apart->",allApartments)
        res.status(200).json(allApartments)

        }
        catch (err){

        console.log("err->",err)
        res.status(400).json(err)

        }



    }
else
{
    res.status(404).json(
        {
            "status": "unable to fetch apartment",
            "reason":"check hotel name or your credientials"
        }
    )
}

}

const Delete = async (req,res)=>{
    console.log("req is ",req.body)

    const apartId = req.body.apartmentId;
    const managerId = req.body.MangerId;
    const ownerId = req.body.ownerId;



    

    const tarHotel = await Apartment.getHotelIdById(apartId)

    const mangerVerf = await Hotel.getHotelManagerId(tarHotel[0]["hotelId"]);

    const ownerVerf = await Hotel.getHotelById(tarHotel[0]["hotelId"])

    if ( ( ownerVerf[0]["ownerId"] === ownerId || mangerVerf[0]["managerId"] === managerId)  || (mangerVerf[0]["managerId"] === managerId || ownerVerf[0]["ownerId"] === ownerId)) 
    {
        const response = await Apartment.delete(apartId);
        if(response!==-1)
        {
            res.status(200).json({
                "status":"Apartment deleted successfully"
            })


        }
        else
        {
            res.status(404).json({
                "status":"Apartment does not exist, could not delete"
            })
        }
    }
    else
    {
        res.status(404).json(
            {
                "status": "unable to delete apartment",
                "reason":"check your credientials"
            }
        )
    }





}

const allApartmentNoHotel = async (req,res)=>{

try
{
    const response = await Apartment.getAllApartment();

    res.status(200).json(response)
}
catch(err){
    res.status(400).json(err.body)

}

}

const reqdApartments = async (req,res)=>{

    const city = req.body.cityName

    console.log("city->",city)
    try{
const response = await Apartment.getOnCityBasis(city)

console.log(response);

res.status(200).json(
    response
)
    }
catch(err){
res.status(400).json({"error":err})
}

}

const getApartmentById = async (req,res)=>{
    try{
        console.log(req.body)
        console.log(req.body.apartId)
    const apart = await Apartment.getApartmentbyId(req.body.apartId)
    res.status(200).json(apart)
    }
    catch(err)
    {
        console.log(err)
        res.status(400).json(err)
    }


}

const getReview = async (req,res)=>{

    const apartId = req.body["appartmentId"];

    try{
    const resposne = await Apartment.getReview(apartId)
        
    res.status(200).json(resposne)
    }
    catch(err)
    {
        res.status(400).json(err)
    }
}
module.exports = { register ,allApartments, Delete,allApartmentNoHotel,reqdApartments, getApartmentById,getReview}