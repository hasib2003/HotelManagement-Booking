const Account = require("../models/accountModel")


const registerAccount = async (req,res)=>
{
const crediential = req.body.credientials

const newAccount = new Account();

let _ = await newAccount.register(crediential);


}

const authenticate = async (req,res)=>
{

const crediential = req.body.credientials;

const response = await Account.authen(crediential);


if(response === true)
{
    res.status(200).json({"Status":"Allowed"})
}
else if (response === false)
{
    res.status(404).json({"Status":"Wrong Password"})
}

else if (response === -1)
{
    res.status(404).json({"Status":"No such User"})

}
}

const allUsers = async (req,res)=>{
    const users = await Account.allAccount()
    res.status(200).json(
        {"Users":users}
    )
}


module.exports = {registerAccount,authenticate,allUsers};