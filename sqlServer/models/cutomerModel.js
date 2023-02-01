const { response } = require("express");
const ownerPool = require("../config/ownerConn")
const Account = require("./accountModel")

class 
Customer extends Account {


    static async save(customer) {

        const firstName = customer["firstName"];
        const lastName = customer["lastName"];
        const cnic = customer["cnic"]

        console.log("inside save", cnic)
        try {
            const [savedIntoCustomer, _] = await ownerPool.execute
                (

                    `
            insert into Customer(firstName,lastName,cnic) values ('${firstName}','${lastName}','${cnic}')

            `
                )
            console.log("savedIntoCustomer")
            return true;

        }

        catch (err) {
            console.log(err)
            return false
        }



    }

    static async register(customer) {

        const userName = customer["userName"];
        const password = customer["password"];
        const cnic = customer["cnic"]

        const credientials = { userName, password }

        const initial = await super.register({ userName, password })

        console.log("insertion into account ,", initial)

        if (initial) {

            console.log("inserted into the accouont")
            let savedIntoCustomer = await this.save(customer)

            if (savedIntoCustomer) {

                const [customerId, _] = await ownerPool.execute(
                    `
                    select customerId from Customer where cnic = '${cnic}'
                    `
                )

                console.log(customerId)

                const [insertIntoRegistered, __] = await ownerPool.execute
                    (
                        `
                    insert into RegisteredCustomer(userName,contactNo,customerId) values ('${userName}','${customer["contactNo"]}','${customerId[0]["customerId"]}')

                    `
                    )

                console.log("saved into the registeredcustomer")
                return true;
            }

        }
        else {
            return false;
        }

        // const initial = await this.save(customer)
        // if (initial)
        // {

        // }

        // else
        // {
        //     return false;
        // }



    }

    static async getCustomerByUserName(userName) {
        try {
            const [response, _] = await ownerPool.execute(
                `
            select Customer.firstName , Customer.lastName,RegisteredCustomer.userName, Customer.cnic,Customer.customerId from Customer , 
            RegisteredCustomer where Customer.customerId = RegisteredCustomer.customerId and 
            RegisteredCustomer.userName = "${userName}"

            `
            )
            return response;
        }
        catch (err) {
            console.log(err)

        }
    }
    static async getCustomerByCnic(cnic) {
        try {
            const [response, _] = await ownerPool.execute(
                `
            select customerId from Customer where cnic = '${cnic}' and customerId = (select max(customerId) from Customer);

            `
            )
            return response;
        }
        catch (err) {
            console.log(err)

        }
    }
    static async getCustomerById(Id) {
        try {
            const [response, _] = await ownerPool.execute(
                `
            select * from Customer where Customer.customerId = "${Id}"
            `
            )
            return response;
        }
        catch (err) {
            console.log(err)

        }
    }

    static async authen(credientials) {
        const response = await Account.authen(credientials)


        return response;

    }


    static async book(booking) {
        const bookingEmail = booking["BookingEmail"];
        const customerId = booking["customerId"]
        const appartmentId = booking["appartmentId"]
        const noOfAppartments = booking["noOfAppartments"]
        const totalPrice = booking["totalPrice"]
        const discount = booking["discount"]
        const checkIn = booking["checkIn"]
        const checkOut = booking["checkOut"]
     

        console.log("booking",booking)
        try {
            let sql = `
                    INSERT INTO Booking (bookingEmail,customerId , appartmentId , noOfAppartments , totalPrice , discount, checkIn, checkOut, bookingTime)
                    VALUES ('${bookingEmail}',
                        ${customerId},${appartmentId},${noOfAppartments},${totalPrice},${discount},'${checkIn}','${checkOut}',now())
                    `
            const [res, _] = await ownerPool.execute(sql)
            console.log("res by sql",res)
            return res

        }
        catch (err) {
            console.log(err)
            return -1;
        }
    }


    static async getApartToReview(customerId)
    {
        let sql = 
        `
        select Appartment.appartmentTitle ,Appartment.appartmentId,group_concat(bookingTime) as bookingTime, Address.address, City.cityName from Appartment, Booking,Address,City,Hotel where Appartment.appartmentId = Booking.appartmentId and Booking.customerId = ${customerId} 
        and Hotel.addressId = Address.addressId and City.cityId = Address.cityId and Appartment.hotelId = Hotel.hotelId and
        Appartment.appartmentId not in (select appartmentId from Review where customerId = 15 )
        group by Appartment.appartmentId;
        `
try{
        const [res,_] = await ownerPool.execute(sql);
        return res;
}
catch(err)
{
    console.log(err)
    return -1;
}
    }

    static async addReview(obj)
    {
        const {customerId,appartmentId,review} = obj;

        let sql = `insert into Review(customerId, appartmentId, review) values
        (${customerId}, ${appartmentId},"${review}")
        `
        try{
        const [res,_] = ownerPool.execute(sql);
        console.log("review res ",res)

        return res;
        }
        catch(err)
        {
            console.log(err)
            return -1;
        }


    }
}

module.exports = Customer