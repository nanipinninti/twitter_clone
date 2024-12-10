const app = require("./intialsetup")
const db = require("./connection")
const token_verify = require("./0_middle_ware")


app.get("/tweets/:tweet_id/likes/",token_verify,async (req,res)=>{
    const {tweet_id} = req.params
    const {user_id,username} = req.user
    try{
        const query = `select  u.username as likes from 
            "Follower" f
            INNER JOIN "Tweet" t on f.following_user_id = t.user_id
            LEFT JOIN "Like" l on l.tweet_id = t.tweet_id
			INNER JOIN "User" u on u.user_id = l.user_id			
                where f.follower_user_id = $1 and t.tweet_id = $2;`
        const values = [user_id,tweet_id]
        const result = await db.query(query,values)
        if (result.rowCount>0)
            return res.status(200).json({"likes" : result.rows.map(obj=>(obj.likes))})
        else
            return res.status(401).json({message : "Invalid request"})
    }catch(error){
        console.error("Servor error! ",error)
        return res.status(401).json({message : "Servor error"})
    }
})