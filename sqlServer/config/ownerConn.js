require("dotenv").config({path:"../.env"})


// we shall create separate connections for owner, managers and users

const mysql = require("mysql2");

const ownerPool =  mysql.createPool
(
    {
        host: process.env.DB_HOST,
        user: process.env.DB_OWNER,
        database: process.env.DB_NAME,
        password: process.env.OWNER_PASS,


    }
);


module.exports = ownerPool.promise();

