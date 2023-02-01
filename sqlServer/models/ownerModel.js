const ownerPool = require("../config/ownerConn")
const Account = require("./accountModel")

class Owner extends Account
{
    constructor()
    {

        super();
        this.firstName = "";
        this.lastName = "";
        this.userName = "";
        this.cnic = "";
        this.contactNo = "";


    }

    static async getRecords(onwerEmail)
    {
        console.log("records for owner with email",onwerEmail);

        let sql = `select Customer.firstName,Booking.bookingEmail, Customer.cnic,Hotel.hotelName, Appartment.AppartmentTitle,Booking.bookingId
        ,Booking.bookingTime, totalPrice
        from Customer,Booking,Appartment,Hotel,Owner
        
        where Hotel.ownerId = Owner.ownerId and Appartment.hotelId = Hotel.hotelId and Booking.appartmentId = Appartment.appartmentId and Booking.customerId = 
        Customer.customerId and Owner.userName = '${onwerEmail}';
        `
        try{
        const [res,_] = await ownerPool.execute(sql)
        console.log("response for records ",res)
        return res
        }
        catch(err){
            console.log(err)
            return -1;
        }
    }

    async register({firstName,lastName, userName,contactNo,password})
    {
   


    let next = await super.register({userName,password})
    
       

        if (next)
        {
        
        //to save the data into the class
        let OwnerTable = "Owner";
        this.firstName = firstName;
        this.lastName = lastName;
        this.contactNo = contactNo;

            // executing the query 

        
        
  

        let sql = `insert into ${OwnerTable}
        (firstName, lastName,userName,contactNo) values
            ('${this.firstName}','${this.lastName}', '${userName}', '${this.contactNo}')`


        let [owner,_] = await ownerPool.execute(sql)

        return owner;   

        }

        return -1;


    }

    static async authen({userName,password})
    {
        return await super.authen({userName,password})
    }
    
    static async getOwner(userName)
    {
        let sql =  `select * from Owner where userName = '${userName}'`
        const [authenResult,dummy] = await ownerPool.execute(sql)
        return authenResult;
    }
    static async getOwnerById(ownerId)
    {
        let sql =  `select * from Owner where ownerId = '${ownerId}'`
        const [authenResult,dummy] = await ownerPool.execute(sql)
        return authenResult;
    }
    static async getOwnerByUserName(userName)
    {
        let sql =  `select ownerId from Owner where userName = '${userName}'`
        const [authenResult,dummy] = await ownerPool.execute(sql)
        return authenResult;
    }

    static async allOwners()
    {
       let sql = `select * from Owner`
       const [ownerList,_] = await ownerPool.execute(sql); 
       return ownerList;

    }




}
module.exports = Owner