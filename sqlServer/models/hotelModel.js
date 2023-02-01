
const { count } = require("console");
const e = require("express");
const { wrap } = require("module");
const ownerPool = require("../config/ownerConn")
class Hotel {
    constructor(ownerId) {

        this.ownerId = ownerId;
        console.log("ownerId is ", this.ownerId)
        this.hotelName = "";

        this.hotelEmail = "";
        this.hotelLandline = "";
        this.managerId = "";
    }

    async register({
        hotelName, addressId, hotelEmail, hotelLandline
        // ,managerId
    }) {


        this.hotelName = hotelName;
        this.addressId = addressId;
        //  this.hotelCountry = hotelCountry;
        //  this.hotelState  = hotelState;
        //  this.hotelCity = hotelCity;
        this.hotelEmail = hotelEmail;
        this.hotelLandline = hotelLandline;
        // this.managerId  = managerId;

        const hotelTable = "Hotel";


        let sql = `insert into ${hotelTable}(hotelName, hotelEmail, hotelLandline , addressId, ownerId) 
                   values ('${this.hotelName}','${this.hotelEmail}','${this.hotelLandline}',${this.addressId},${this.ownerId}) `
        console.log("sql  no executed")

        const [hotel, _] = await ownerPool.execute(sql);
        console.log("sql executed")
        return hotel;




        // }


    }

    static async delete(hotelID) {

        console.log("inside the delete")


        // i think we would have to set hotelId to null for various cases in other tables

        let sql = `delete from Hotel where hotelId = ${hotelID}`

        const [res, _] = await ownerPool.execute(sql)
        console.log(res)
        return res;



    }





    static async getHotel(hotelName) {
        let sql = `select hotelName from Hotel where hotelName='${hotelName}'`


        const [hotel, _] = await ownerPool.execute(sql)

        return hotel;


    }
    static async getHotelById(hotelId) {
        let sql = `select hotelId from Hotel where hotelId='${hotelId}'`


        const [hotel, _] = await ownerPool.execute(sql)

        return hotel;


    }

    static async getHotelOwnerId(hotelId) {
        let sql = `select * from Hotel where hotelId='${hotelId}'`


        const [ownerId, _] = await ownerPool.execute(sql)
        console.log("sql owne tarr ", ownerId)
        return ownerId;
    }
    static async getHotelManagerId(hotelId) {
        let sql = `select * from Hotel where hotelId='${hotelId}'`


        const [managerId, _] = await ownerPool.execute(sql)

        return managerId;
    }

    static async getHotelsByOwnerEmail(ownerEmail) {


        console.log(ownerEmail)
        let sql = `select hotelName, hotelEmail, hotelLandline,hotelId from 
        Owner,Hotel where Owner.userName = "${ownerEmail}" and Owner.ownerId = Hotel.ownerId`



        // let sql = `select ownerId from Owner where userName='${ownerEmail}'`


        // const [owner_id,_] = await ownerPool.execute(sql)


        // let sql2 = `select * from Hotel where ownerId ='${}'`


        const [allHotels, _] = await ownerPool.execute(sql)
        console.log("Hotl ", allHotels)
        return allHotels;
    }

    static async getHotelsByOwnerEmailNoManager(ownerEmail) {


        console.log("required functionc alled")
        let sql = `select Hotel.hotelName as Vacant_Hotels, Hotel.hotelId from Hotel,Owner where Owner.userName ="${ownerEmail}" and Hotel.ownerId = Owner.ownerId and Hotel.managerId is null ;`




        const [hot, _] = await ownerPool.execute(sql)
        console.log("Hotl ", hot)
        return hot;
    }


    static async registerAddress(wrap) {

        const cityId = wrap["cityId"];
        const address = wrap["address"]
        try {

            let sql = `insert into Address(cityId,  address) values(${cityId},'${address}');
            `
        const res = await ownerPool.execute(sql)

                        
        const [add,_] = await ownerPool.execute(
            `select max(addressId) as addressId from Address;
            `)
        

        console.log("address from sqk ",add)
        

        return add

            
           

           
        }

        catch (errr) {
            console.log(errr)
            return -1;
        }
    }
}

module.exports = Hotel;