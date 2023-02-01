const City = require("../models/cityModel")


const getCity = async (req,res)=>{

    // console.log("request for citi")
    // // console.log("req.params,",req.params)
    // console.log("req.body",req.body)
    const country = req.body["country"][0]["countryName"]

    try{
    const city = await City.getCity(country);


    // console.log(city)

    res.status(200).json(city);
    }
    catch(err){
        console.log(err)

        res.status(404).json(err.body);
    }
}

const getCountries = async (req,res)=>{
    // console.log("req.params,",req.params)
    // console.log("req.body",req.body)

    try{
    const country = await City.getCountry();


    // console.log(country)

    res.status(200).json(country);
    }
    catch(err){
        // console.log(err)

        res.status(404).json(err.body);
    }

}

module.exports = {getCity, getCountries}