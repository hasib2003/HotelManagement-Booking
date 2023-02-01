const Owner  = require("../models/ownerModel")

const getAllOwners = async (req,res)=>

{
    const ownersList = await Owner.allOwners();
    if (ownersList)
    {
        res.status(200).json(ownersList);
    }
    else
    {
        res.status(400).json("Error fetching data")
    }

}


const getOwnerByUserName = async (req,res)=>

{
    console.log("inside the signin func")
    let tarUser = req.body.user_name;
    tarUser = await ownerModel.getOwner(tarUser,"_")
    // console.log(tarUser)
    
    if (tarUser.length>0)
    {
        req.session.user = tarUser;

        console.log("the session is",req.session.user)
        res.status(400).json({
            "requestedUser":tarUser[0],
            'status':true,
        })
    }
    else
    {
        res.status(404).json({
            "error":`${req.body.firstName} not found`
        })
    }

    console.log("at end of auth we have session-> ",req.session.user)

}


const authenSession = async (req,res)=>{

    if(req.session.user)
    {

        res.status(200).json(
 
              {"status":"accepted","userName":true,"password":true,"session":req.session.user}

            
        )
    }
    else
    {
        res.status(200).json({"status":"rejected","userName":false,"password":false,"session":req.session.user})

    }

}

const registerOwner = async (req,res)=>

{


    let newOwner = new Owner();
    // let {firstName,lastName, userName, contactNo,password} 
    let ownerInfo = req.body.Owner

    const status =  await newOwner.register(ownerInfo);
        try{
        if(status !==-1)
            {
            res.status(200).json({"status":"registered successfully"})
            }
        else
        {
            res.status(200).json({"status":"user already present"})

        }
    }

    
    catch(err)
    {
        res.status(400).json({"status":err.body})

    }
    
    
    
}

const authenOwner = async (req,res)=>{

    const credientials = req.body.credientials
    try{
    const postAuthen = await Owner.getOwner(credientials["userName"])
    
    if(postAuthen[0])
    {

        const authen = await Owner.authen(credientials)

        if (authen === true)
        {
            req.session.user = postAuthen[0]
            res.status(200).json({"status":"accepted","userName":true,"password":true,"session":postAuthen})
        }
        else if (authen === false)
        {
            res.status(200).json({"status":"rejected","userName":true,"password":false,"session":postAuthen})
        }
        else
        {
            res.status(200).json({"status":"rejected","userName":false,"password":false,"session":postAuthen})
    
        }

    }

    else
    {
        res.status(200).json({"status":"rejected","userName":false,"password":false})

    }
    
    }
    catch(err)
    {
        res.status(200).json({"status":err})
    }

}

const deleteSession = async (req,res)=>{
    req.session.user = null;
    res.status(200).json({
        "status":"logged out"
    })
}


const getRecords = async (req,res)=>{


const ownerEmail = req.body["owner"];

try{
const response = await Owner.getRecords(ownerEmail);

console.log(response)


res.status(200).json({"records":response})


}

catch(err){
    console.log(err)
    res.status(400).json(err)

}







}

module.exports = {registerOwner,authenOwner,authenSession, getAllOwners,deleteSession,getRecords}