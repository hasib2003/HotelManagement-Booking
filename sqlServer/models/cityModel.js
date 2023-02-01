
const ownerPool = require("../config/ownerConn")

class City
{
    static async getCity(country)
    {

        // console.log("country->",country)
        let sql = `select City.cityName, City.cityId from City, Country where Country.countryId = City.countryId and Country.countryName = "${country}"`

        const [res,_] = await ownerPool.execute(sql);

        // console.log("model->",res)

        return res;
    }

    static async getCountry()
    {
        let sql = `select countryName,countryId from Country`

        const [res,_] = await ownerPool.execute(sql);

        return res;
    }
}

module.exports = City;