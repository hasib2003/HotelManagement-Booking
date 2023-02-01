const Customer = require("../models/cutomerModel")
const Apartment = require("../models/apartmentModel")


const authen = async (req, res) => {
    const credientials = req.body.customer

    try {
        const tarCustomer = await Customer.getCustomerByUserName(credientials["userName"])
        if (tarCustomer[0]){
            const response = await Customer.authen(credientials)


            if (response === true) {

               
                    req.session.customer = tarCustomer[0];


 
                res.status(200).json({ "status": "Allowed" })
            }
            else {
                res.status(404).json({ "status": "Not Allowed" })
            }
        }
    }

    catch (err) {
        res.status(400).json({ "status": "Error" })

    }

}


const authenSession = async (req, res) => {
    console.log("session user is ", req.session.customer)
    if (req.session.customer) {

        console.log("->", req.session.customer)

        res.status(200).json(

            { "status": "accepted", "userName": true, "password": true, "session": req.session.customer }


        )
    }
    else {
        res.status(200).json({ "status": "rejected", "userName": false, "password": false, "session": req.session.customer })

    }

}

const deleteSession =async (req,res)=>{
    req.session.customer= null;
    res.status(200).json({"status":"logged out"})
}


const register = async (req, res) => {

    try {
        console.log(req.body.customer)
        const customer = req.body.customer
        const response = await Customer.register(customer)


        if (response) {
            res.status(200).json(
                {
                    "status": "Registered Successfully"
                }
            )
        }
        else {
            res.status(400).json(
                {
                    "status": "Error while registering"
                }
            )
        }

    }
    catch (err) {
        res.status(400).json(
            {
                "status": "Error while registering"
            }
        )

    }
}

const registerTemp = async (req,res)=>{

    try {

    
        console.log(req.body.customer)
        const customer = req.body.customer
        const response = await Customer.save(customer)
        const id = await Customer.getCustomerByCnic(customer["cnic"])


        console.log("id returned for new temp customer ",id[0]["customerId"])

        if (response) {
            res.status(200).json(
                {
                    "status": "Registered Successfully","id":id[0]["customerId"]
                }
            )
        }
        else {
            res.status(400).json(
                {
                    "status": "Error while registering"
                }
            )
        }

    }
    catch (err) {
        res.status(400).json(
            {
                "status": "Error while registering"
            }
        )

    }
}

const makeBooking = async (req,res)=>{


    const booking = req.body.booking;
    console.log("booking ->",booking)

    const custVerf = await Customer.getCustomerById(booking["customerId"])
    const apartVerf = await Apartment.getApartmentbyId(booking["appartmentId"])

    if (custVerf[0] && apartVerf[0])
    {


    const response = await Customer.book(booking)

    res.status(200).json({status:"Successfully Booked"})
    return;
    
    }
    res.status(200).json({status:"Invalid Customer or Apartment "})

}


const getApartToReview = async (req,res)=>{
    console.log("review ->",req.body)

    const customerId = req.body["customerId"];

    try{
    const response = await Customer.getApartToReview(customerId);

    res.status(200).json(response)

    }
    catch(err)
    {
        res.status(400).json(err)

        
    }


}

const addReview = async (req,res)=>{

    const review = req.body["review"];
    const customerId = req.body["customerId"]
    const appartmentId = req.body["appartmentId"]
    // const obj = {re}

    try{
    const response = await Customer.addReview({customerId,appartmentId,review})
        res.status(200).json(response);

    }
    catch(err)
    {
        console.log(err);
        res.status(400).json(err)
    }




}

module.exports = { register, authen, authenSession,registerTemp,makeBooking,deleteSession,getApartToReview,addReview}