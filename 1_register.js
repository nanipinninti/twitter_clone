const app = require("./intialsetup")
const db = require("./connection")
const bcrypt = require('bcrypt')


app.post("/register",async (req,res)=>{
    const {username,password,name,gender} = req.body;
    if (password.length < 6){
        return res.status(400).json({message : "Password is too short"})
    }
    const query = `select * from "User" where username = $1`
    const values = [username]    
    try{
        const {rows} = await db.query(query,values)
        if (rows.length ==0){
            const hashedPassword = await bcrypt.hash(password,10)
            const main_query = `insert into "User"(name,username,password,gender) values ($1,$2,$3,$4)`
            const main_values = [name,username,hashedPassword,gender]
            const result = await db.query(main_query,main_values)
            return res.status(200).json({message : "User created successfully"})
        }else{
            return res.status(400).json({message : "User already exists"})
        }
    }catch(error){
        console.error("Servor error! ",error)
        return res.status(401).json({message : "Servor error"})
    }
})