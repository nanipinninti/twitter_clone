const app = require("./intialsetup")
const db = require("./connection")
const token_verify = require("./0_middle_ware")


app.get("/user/tweets/feed/",token_verify,async (req,res)=>{
    const {user_id} = req.user
    const LIMIT = 4
    const query = `select u.username,t.tweet,t.date_time from 
                    "Follower" f,
                    "Tweet" t,
                    "User" u
                    where f.follower_user_id = $1 and f.following_user_id = t.user_id and t.user_id = u.user_id
                        order by t.date_time desc
                        limit $2`
    try{
        const result = await db.query(query,[user_id,LIMIT])
        return res.status(200).json(result.rows)
    }catch(error){
        console.error("Servor error! ",error)
        return res.status(401).json({message : "Servor error"})
    }
})