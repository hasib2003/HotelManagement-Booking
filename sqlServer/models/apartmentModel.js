const ownerConn = require("../config/ownerConn");
const ownerPool = require("../config/ownerConn");
class Apartment {
    constructor(hotelId) {
        this.hotelId = hotelId;

    }



    async register({ apartmentTitle, apartmentDesc, totalApartments,
        availableApartments, bedroom, kitchen, washroom, tvLounge,
        livingRoom, diningRoom, balcony, star, priceOfRoom
    }) {

        this.apartmentTitle = apartmentTitle;
        this.apartmentDesc = apartmentDesc;
        this.totalApartments = totalApartments;
        this.availableApartments = availableApartments;
        this.bedroom = bedroom;
        this.kitchen = kitchen;
        this.washroom = washroom;
        this.tvLounge = tvLounge;
        this.livingRoom = livingRoom;
        this.diningRoom = diningRoom;
        this.balcony = balcony;
        this.star = star;
        this.rent = priceOfRoom;


        let sql = `
        
        insert into Appartment(appartmentTitle, appartmentDesc, totalAppartments,
            availableAppartments,bedroom, kitchen,
            washroom,tvLounge,livingRoom,diningRoom,
            balcony, rStar,hotelId,
            priceOfRoom)

            values ('${this.apartmentTitle}', '${this.apartmentDesc}', ${this.totalApartments},
                ${this.availableApartments},${this.bedroom}, ${this.kitchen},
                ${this.washroom},'${this.tvLounge}',${this.livingRoom},
                '${this.diningRoom}','${this.balcony}', '${this.star}',
                ${this.hotelId},${this.rent})
        
        `
        console.log("sql  not executed->")
        try {


            let [ret, _] = await ownerPool.execute(sql)
            console.log("sql executed->", ret)
            return ret;
        }
        catch (err) {
            console.log("err->", err)
        }



    }

    static async getApartmentbyId(apartId) {
        let sql = `select appartmentTitle, appartmentDesc, totalAppartments,
        availableAppartments,bedroom, kitchen,
        washroom,tvLounge,livingRoom,diningRoom,
        balcony, rStar,
        priceOfRoom, Hotel.hotelName , Hotel.hotelEmail, Hotel.hotelLandline
        from Appartment,Hotel where appartmentId = ${apartId} and Appartment.hotelId = Hotel.hotelId; `

        let [ret, _] = await ownerPool.execute(sql)

        return ret;
    }
    static async getApartment(apartmentTitle) {
        let sql = `select * from Appartment where appartmentTitle = '${apartmentTitle}' `

        let [ret, _] = await ownerPool.execute(sql)

        return ret;
    }


    static async getAllApartmentId(hotelId) {
        let sql = `select * from Appartment where hotelId = ${hotelId} `

        let [ret, _] = await ownerPool.execute(sql)

        console.log("hotel Id ->", hotelId)
        console.log("ret", ret)

        return ret;
    }
    static async getAllApartment() {
        let sql = `select * from Appartment`

        let [ret, _] = await ownerPool.execute(sql)

        return ret;
    }

    static async getHotelId(appartmentTitle) {
        let sql = `select * from Appartment where appartmentTitle = '${appartmentTitle}' `

        let [ret, _] = await ownerPool.execute(sql)

        return ret;
    }



    static async getHotelIdById(apartId) {
        let sql = `select hotelId from Appartment where appartmentId = '${apartId}' `

        let [ret, _] = await ownerPool.execute(sql)

        return ret;
    }


    static async getManagerId(apartId) {
        let sql = `select managerId from Appartment where appartmentId = '${apartId}' `

        let [ret, _] = await ownerPool.execute(sql)

        return ret;
    }


    static async delete(apartId) {
        const [stat, __] = await ownerPool.execute(
            `
            select * from Appartment where appartmentId = ${apartId}
            `
        )
        if (stat[0]) {
            const [res, _] = await ownerPool.execute(`
            delete from Appartment where appartmentId = ${apartId};
            `)
            console.log(res)
            return res;
        }
        else {

            return -1;
        }
    }


    static async getOnCityBasis(cityName) {
        let sql =
            `
    select Appartment.appartmentId, Appartment.appartmentTitle ,Appartment.appartmentDesc,
    Appartment.totalAppartments,Appartment.availableAppartments,Appartment.bedroom,
    Appartment.kitchen,Appartment.washroom,Appartment.tvLounge,Appartment.livingRoom
    ,Appartment.diningRoom,Appartment.balcony,Appartment.rStar,Appartment.priceOfRoom
    
    from Appartment,Hotel,Address where Appartment.hotelId = Hotel.hotelId and Hotel.addressId = Address.addressId and Address.cityId = ${cityName};
    `
        try {
            const [res, _] = await ownerPool.execute(sql);

            return res;
        }
        catch (err) {

            console.log(err)
            return -1;

        }


    }

    static async getReview(apartId) {

        try {
            const [res, _] = await ownerPool.execute(
                `  select Customer.firstName, Review.review 
                from Customer, Review where Review.customerId = Customer.customerId and Review.appartmentId = ${apartId};
        `

            )
            console.log(res)
            return res;
        }
        catch (err) {
            console.log(err)
            return -1;
        }
    }
}


module.exports = Apartment;