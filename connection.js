const {Client} = require('pg')
const db = new Client({
    user: "postgres",
    host: "localhost",
    database: "twitter_clone",
    password: "Nani@123",
    port: 5432,
});

db.connect((error)=>{
    if (error){
        console.error("Failed to connect Database")
    }
    else {
        console.log("Succesfully connected to Database")
    }
})

module.exports = db;