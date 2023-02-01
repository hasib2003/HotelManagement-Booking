const ownerPool = require("../config/ownerConn")
const Account = require("./accountModel")

class Manager extends Account
{
    constructor()
    {

        super();
        this.firstName = "";
        this.lastName = "";
        this.userName = "";
        this.contactNo = "";


    }


    async register({firstName,lastName, userName,contactNo,password },ownerId)
    {
   


    let next = await super.register({userName,password})
    
       

        if (next)
        {
        
        //to save the data into the class
        let ManagerTable = "Manager";
        this.firstName = firstName;
        this.lastName = lastName;
        this.contactNo = contactNo;

            // executing the query 

        
        
  

        let sql = `insert into ${ManagerTable}
        (firstName, lastName,userName,contactNo,ownerId) values
            ('${this.firstName}','${this.lastName}', '${userName}', '${this.contactNo}',${ownerId})`


        let [owner,_] = await ownerPool.execute(sql)

        return owner;   

        }

        return -1;


    }
    

    static async updateMangerInHotel(credientials)
    {

        // console.log("inside the update manager ")
        // console.log(tarHotelId, managerUserName)
        // const [tarmanagerId,_] = await ownerPool.execute(sql)

        console.log(credientials)
        // console.log("tarmanagerId-> ",tarmanagerId)
        // console.log("tarHotelId-> ",tarHotelId)
        const tarHotelId = credientials["hotelId"]
        const tarmanagerId = credientials["managerId"]
        const tarOwnerUser = credientials["ownerUserName"]

        // checking if given owner is credible of doing so


        let sql = `select *  from Owner,Hotel where Owner.userName = '${tarOwnerUser}' and Hotel.hotelId = ${tarHotelId} and Hotel.ownerId = Owner.ownerId`

        const [check,p] = await ownerPool.execute(sql);
        if(check[0])
        {
            let sql3 = `update Hotel set managerId = null where Hotel.managerId = ${tarmanagerId}`

            const [_,__] = await ownerPool.execute(sql3)
            
            let sql1 = 
            `
            update Hotel set managerId = ${tarmanagerId} where Hotel.hotelId = ${tarHotelId}
            `
    
            const [res,p] = await ownerPool.execute(sql1);
            
            console.log("update query executed")
            return res
        }
        else
        {
            return -1;
        }





        
    }
    static async authen({userName,password})
    {
        return await super.authen({userName,password})
    }

    static async getManager(userName)
    {
        let sql =  `select * from Manager where userName = '${userName}'`
        const [authenResult,dummy] = await ownerPool.execute(sql)
        return authenResult;
    }

    static async getManagerById(managerId)
    {
        let sql =  `select * from Manager where managerId = '${managerId}'`
        const [authenResult,dummy] = await ownerPool.execute(sql)
        return authenResult;   
    }

    static async allManager(userName)
    {
        console.log("userName->",userName)
       let sql = `select  Manager.firstName,Manager.userName,Hotel.hotelName,Manager.lastName, Manager.managerId from

       Owner inner join (
                               Manager left outer join Hotel on Manager.managerId  = Hotel.managerId
                               )      
                               on Owner.ownerId = Manager.ownerId where Owner.userName =  "${userName}";`
    //    ` select  Manager.firstName,Manager.lastName, Manager.userName, Manager.managerId,Hotel.hotelName from

    //    Manager left outer join (Hotel inner join Owner on Owner.ownerId = Hotel.ownerId and Owner.userName = '${userName}')
    //    on Manager.managerId = Hotel.managerId;
    //     `
        try{
       const [managerList,_] = await ownerPool.execute(sql);
       
       return managerList;

        }
        catch(err) 
        {
            console.log("managerList ",err)

        }

    }

    static async updateNull(credentials)
    {
        
        const tarmanagerId = credentials["managerId"]
        const tarOwnerUser = credentials["ownerUserName"]

        // checking if given owner is credible of doing so


console.log()
    
        let sql = `select *  from Owner,Hotel,Manager where Owner.ownerId = Manager.ownerId and Owner.userName = '${tarOwnerUser}'`

        const [check,p] = await ownerPool.execute(sql);

        if(check[0])
        {
            let sql3 = `update Hotel set managerId = null where Hotel.managerId = ${tarmanagerId}`

            const [_,__] = await ownerPool.execute(sql3)   
            return _;
        }
        return -1;







}
    static async delete(credentials)
    {
        
        const tarmanagerId = credentials["managerId"]
        const tarOwnerUser = credentials["ownerUserName"]

        // checking if given owner is credible of doing so


console.log()
    
        let sql = `select *  from Owner,Hotel,Manager where Owner.ownerId = Manager.ownerId and Owner.userName = '${tarOwnerUser}'`

        const [check,p] = await ownerPool.execute(sql);

        if(check[0])
        {
            let sql3 = `delete from Manager where managerId = ${tarmanagerId}`

            const [_,__] = await ownerPool.execute(sql3)   
            return _;
        }
        return -1;







}

}
module.exports = Manager