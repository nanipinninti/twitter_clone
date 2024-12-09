const app = require("./intialsetup")
const db = require("./connection")
const token_verify = require("./0_middle_ware")


app.get("/user/following/",token_verify,async (req,res)=>{
    const {user_id} = req.user    
    try{
        const query = `select u.name from "Follower" f,"User" u 
                where f.follower_user_id = $1 and f.following_user_id = u.user_id`
        const value = [user_id]
        const result = await db.query(query,value)
        const following_list = [...result.rows]
        return res.status(200).json(following_list)
    }catch(error){
        console.error("Servor error! ",error)
        return res.status(401).json({message : "Servor error"})
    }
})