const mysql = require("mysql");

//Create a conecction
const cn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "api_alumno",
});

cn.connect(function(err){
    if(err){
        console.error(err);
        return;
    }else{
        console.log("database is connected");
    }
});

module.exports = cn;