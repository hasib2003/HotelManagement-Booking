const rootPool = require("../config/ownerConn")   
//  this pool will not be on root level on the highest grants available,
//  sudo root
const bcyrpt = require("bcrypt")

require("dotenv").config({path:"../.env"})
class Account{


    constructor()
    {
        this.userName = "";
        this.password = null;
    }



static async authen({userName, password})
{


    const accTable = "Account";
    const username = "userName";

    let sql = `select * from ${accTable} where ${username} = '${userName}' `;

    let [users,_] = await rootPool.execute(sql)


    if (!users[0])

    {
        console.log("user does not exist")
        return -1;
    }
    else
    {
        const match = await bcyrpt.compare(password,users[0]["password"])
        console.log("match->",match);

        return match;
    }







}


static async register({userName, password})
{

    const saltRounds = "secret";
    this.password = await bcyrpt.hash(password,10)

    this.userName = userName;
    const accTable = "Account";
    const username = "userName";

    let sql = `select * from ${accTable} where ${username} = '${userName}' `;

    let [users,_] = await rootPool.execute(sql)

    // console.log("users-> ",users)

    if (!users[0])

    {

        let sql = `insert into ${accTable} values ('${this.userName}','${this.password}') `
        await rootPool.execute(sql)

        return true;

        

    }
    else
    {
    return false;
    }








    
}
async register({userName, password})
{

    const saltRounds = "secret";
    this.password = await bcyrpt.hash(password,10)

    this.userName = userName;
    const accTable = "Account";
    const username = "userName";

    let sql = `select * from ${accTable} where ${username} = '${userName}' `;

    let [users,_] = await rootPool.execute(sql)

    // console.log("users-> ",users)

    if (!users[0])

    {

        let sql = `insert into ${accTable} values ('${this.userName}','${this.password}') `
        await rootPool.execute(sql)

        return true;

        

    }
    else
    {
    return false;
    }








    
}


static async allAccount()
{
    const accTable = "Account";
    const username = "userName";

    let sql = `select ${username} from ${accTable} `;

    let [users,_] = await rootPool.execute(sql)


    return users;



}


static async findAccount({userName})

{
    const accTable = "Account";
    const username = "userName";

    let sql = `select * from ${accTable} where ${username} = '${userName}' `;

    let [users,_] = await rootPool.execute(sql)

    return users;

}


}


module.exports = Account;