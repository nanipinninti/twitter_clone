const app = require("./intialsetup")
const db = require("./connection")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const SECRET_KEY = "Nani_pinninti"
app.post("/login",async (req,res)=>{
    const {username,password} = req.body;

    const query = `select * from "User" where username = $1`
    const values = [username]    
    try{
        const {rows} = await db.query(query,values)
        if (rows.length == 1){
            const isMatch = await bcrypt.compare(password,rows[0].password)
            if (isMatch){
                const user_id = rows[0].user_id
                const jwt_token = jwt.sign(
                    {user_id,username},
                    SECRET_KEY,
                    {expiresIn : "1h"}
                )
                return res.status(200).json({jwt_token})
            }
            else{
                return res.status(400).json({message : "Invalid password"})
            }
        }else{
            return res.status(400).json({message : "Invalid user"})
        }
    }catch(error){
        console.error("Servor error! ",error)
        return res.status(401).json({message : "Servor error"})
    }
})